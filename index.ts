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

/** Get the CPI from a given year and month. The month starts from 1. Returns undefined if
 *  unavailable. */
export function getCPI(year: number, month: number): string | undefined {
  return data.cpi.at(year - data.firstYear)?.at(month - 1);
}

/** Get All CPI data. */
export function getAllCPIs(): typeof data {
  return data;
}

interface Month {
  year: number;
  month: number;
}

/** Get the earliest and latest dates of the available data. The month starts from 1. */
export function getDateRange(): [Month, Month] {
  return [
    {
      year: data.firstYear,
      month: 1,
    },
    {
      year: data.firstYear + data.cpi.length - 1,
      month: data.cpi[data.cpi.length - 1].length,
    },
  ];
}
