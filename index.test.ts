/** @license 0BSD OR CC0-1.0
 *
 * Copyright(C) 2024 8 Hobbies, LLC < hong@8hobbies.com >
 *
 * Permission to use, copy, modify, and / or distribute this software for anypurpose with or without fee
 * is hereby granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIESWITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OFMERCHANTABILITY AND FITNESS.IN NO EVENT SHALL THE AUTHOR BE
 * LIABLE FORANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGESWHATSOEVER RESULTING
 * FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN ANACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OFOR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * OR
 *
 * This work is marked with CC0 1.0 Universal.
 * Visit https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt for the full text of the license.
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
