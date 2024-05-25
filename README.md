<!-- insert

---
title: "cpi-us: US CPI Data in JSON Format"
type: "_default"
layout: "single"
---

end_insert -->

<!-- Powered by https://cj.rs/riss -->
<!-- remove -->

# cpi-us: US CPI Data in JSON Format

<!-- end_remove -->

[![npm version](https://badge.fury.io/js/cpi-us.svg)](https://badge.fury.io/js/cpi-us)
[![Pipeline](https://github.com/8hobbies/cpi-us/actions/workflows/runtime.yml/badge.svg)](https://github.com/8hobbies/cpi-us/actions/workflows/runtime.yml)
[![](https://img.shields.io/badge/powered%20by-riss-lightgrey)](https://cj.rs/riss)

[Homepage](https://cpi-us.8credits.com) | [GitHub](https://github.com/8hobbies/cpi-us) | [GitLab](https://gitlab.com/8hobbies/cpi-us)

US CPI Data in JSON format. It is the same as the [Consumer Price Index for All Urban Consumers
(CPI-U) provided by US Bureau of Labor Statistics](https://data.bls.gov/timeseries/CUUR0000SA0).

There are two ways to use the data:

## Direct Download

You can download the data directly through [this link](https://cpi-us.8credits.com/data.json).

### Format

The root of the JSON file is a dictionary that contains two properties: `"firstYear"` and `"cpi"`.
The value of `"firstYear"` indicates the earliest year of the data available. The value of `"cpi"`
is an array, in which each element contains the CPI values of a single year. We refer to each
element as a _year data_. The first element of `"cpi"` is a year data corresponding to the year
specified in `"firstYear"`, the second element of `"cpi"` corresponds to the year after that in
`"firstYear"`, etc.

Each year data is an array of size no larger than 12. Each element in a year data is the CPI values
of a month in a chronic order. For example, the first element is the CPI value of January, and the
fifth element is the CPI value of May.

For example, assuming the value of `"firstYear"` is `1913`, and we intend to look up the CPI value
of March, 2023.

- First, we locate the year. That would be the `2023-1913+1=101`'th element of the value of `"cpi"`.
- Then, March is the third month of a year. Therefore, the CPI value of interest is the 3rd value of
  the 101th element of the value of `"cpi"`.

## Via Npm

If you use [npm][], you can download the data by running:

```
npm install cpi-us
```

### Usage

The npm package provides two functions:

#### `getCPI(year, month)`

Returns the CPI value of the specified `year` and `month`. Both parameters are numbers. For example,
`year` may be `1913`, `2000`. `month` indicates the month of the year. `month=1` refers to the first
month of a year (January), and `month=12` refers to the last month of a year (December).

#### `getAllCPIs()`

Returns all CPI values by returning the JavaScript object that results from directly loading the
JSON file. See the "Direct Download > Format" subsection above for the data format.

#### `getDateRange()`

Returns the range of date of the data. Example return value:

```js
[
  { year: 1913, month: 1 },
  { year: 2024, month: 4 },
];
```

meaning the data ranges from January 1913 to April 2024.

## Contributing

Source code is available on [GitHub][].

To report a bug, visit the [issue tracker][].

To run test, run `npm run test-all`. To display test coverage, run `npm run coverage`. To build for
production, run `npm pack`. To build the documentation, run `npm run doc`.

To send your contribution, open a [pull request][].

## License

This package is licensed under [0BSD][] or [CC0-1.0][]. You may choose to comply with either when
using this package or dataset.

    Copyright (C) 2024 8 Hobbies, LLC <hong@8hobbies.com>

    Permission to use, copy, modify, and/or distribute this software for anypurpose with or without fee
    is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIESWITH REGARD TO THIS SOFTWARE
    INCLUDING ALL IMPLIED WARRANTIES OFMERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE
    LIABLE FORANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGESWHATSOEVER RESULTING
    FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN ANACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
    ACTION, ARISING OUT OFOR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

OR

    This work is marked with CC0 1.0 Universal.
    Visit https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt for the full text of the license.

[0BSD]: https://spdx.org/licenses/0BSD.html
[CC0-1.0]: https://spdx.org/licenses/CC0-1.0
[GitHub]: https://github.com/8hobbies/cpi-us
[issue tracker]: https://github.com/8hobbies/cpu-us/issues
[pull request]: https://github.com/8hobbies/cpi-us/pulls
[npm]: https://www.npmjs.com/
