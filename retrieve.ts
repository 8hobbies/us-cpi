/** @license Apache-2.0
 *
 * Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import data from "./data.json";
import { writeFileSync } from "fs";

const firstYear = 1913; // the first year that data is available
const apiKey = process.argv[2];
const curYear = new Date().getFullYear();
const endpoint = new URL("https://api.bls.gov/publicAPI/v2/timeseries/data/");
const seriesId = "CUUR0000SA0" as const;

// Get the CPI data of a particular year.
async function getYearData(year: number): Promise<unknown> {
  const yearString = year.toString();
  const postData = JSON.stringify({
    seriesid: [seriesId],
    startyear: yearString,
    endyear: yearString,
    registrationkey: apiKey,
  });

  const rawResponse = await fetch(endpoint, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: postData,
  });

  const response = await rawResponse.json();
  if (typeof response !== "object" || response === null) {
    throw new Error("Request Failed.");
  } else if (
    !("status" in response) ||
    response.status !== "REQUEST_SUCCEEDED" ||
    !("Results" in response) ||
    typeof response.Results !== "object" ||
    response.Results === null ||
    !("series" in response.Results) ||
    !Array.isArray(response.Results.series)
  ) {
    throw new Error(`Request failed: ${JSON.stringify(response)}`);
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return response.Results.series[0] as unknown;
}

function getFirstMissingYear(): number {
  if (data.firstYear !== firstYear) {
    throw new Error(`Unexpected first year in data: ${data.firstYear}`);
  }

  if (data.cpi.length === 0) {
    return firstYear;
  } else {
    // This also includes the last year. This is to prevent the last year from being incomplete.
    // Duplicate work may happen here if the last year is complete, but it doesn't hurt.
    return data.cpi.length + firstYear - 1;
  }
}

function stripUndefinedinYearData(yearData: (string | undefined)[]): string[] {
  const firstUndefined = yearData.indexOf(undefined);
  if (firstUndefined !== -1) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return yearData.slice(0, firstUndefined) as string[];
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return yearData as string[];
}

const earliestYearMissing = getFirstMissingYear();
data.cpi = data.cpi.slice(0, data.cpi.length - 1);

for (let year = earliestYearMissing; year <= curYear; ++year) {
  console.log(`Processing year ${year}`);
  const yearRawData = await getYearData(year);
  if (
    typeof yearRawData !== "object" ||
    yearRawData === null ||
    !("data" in yearRawData) ||
    !Array.isArray(yearRawData.data)
  ) {
    throw new Error(
      `Unknown data from year ${year}: ${JSON.stringify(yearRawData)}`,
    );
  }
  if (!("seriesID" in yearRawData) || yearRawData.seriesID !== seriesId) {
    throw new Error(`Unknown series ID: ${JSON.stringify(yearRawData)}`);
  }

  const rawData: unknown[] = yearRawData.data;
  const yearData = Array<string | undefined>(12).fill(undefined);
  for (const entry of rawData) {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("period" in entry) ||
      typeof entry.period !== "string" ||
      !entry.period.match(/M\d\d/) ||
      !("value" in entry) ||
      typeof entry.value !== "string"
    ) {
      throw new Error(`Unexpected data ${JSON.stringify(entry)}`);
    }
    yearData[Number(entry.period.slice(1))] = entry.value;
  }

  data.cpi.push(stripUndefinedinYearData(yearData));
}

writeFileSync("./new-data.json", JSON.stringify(data, null, 2));
