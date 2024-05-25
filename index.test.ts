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

import { getAllCPIs, getCPI, getDateRange } from "./index.js";

test("getCPI returns a string that represent a floating point number", () => {
  expect(getCPI(2022, 1)).toMatch(/^\d+(\.\d+)?$/);
});

test("getAllCPIs returns all CPIs", () => {
  const data = getAllCPIs();
  expect(data.firstYear).toBe(1913);
  expect(data.cpi.length).toBeGreaterThan(0);
  expect(data.cpi[0].length).toBeGreaterThan(0);
  expect(data.cpi[0][0]).toBe(getCPI(1913, 1));
});

test("getDateRange returns the range of date", () => {
  const data = getAllCPIs();
  const [earliest, latest] = getDateRange();
  expect(earliest.year).toBe(1913);
  expect(earliest.month).toBe(1);
  expect(latest.year).toBe(data.cpi.length + earliest.year - 1);
  expect(latest.month).toBe(data.cpi[data.cpi.length - 1].length);
});
