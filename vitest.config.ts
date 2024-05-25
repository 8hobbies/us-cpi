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

import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "dist/*"],
    globals: true,
  },
});
