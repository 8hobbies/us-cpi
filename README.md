## <!-- insert

title: "cpi-us: US CPI Data in JSON Format"
type: "\_default"
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

[GitHub](https://github.com/8hobbies/cpi-us) | [GitLab](https://gitlab.com/8hobbies/cpi-us)

US CPI Data in JSON format. It is the same as [Consumer Price Index for All Urban Consumers (CPI-U)
provided by US Bureau of Labor Statistics](https://data.bls.gov/timeseries/CUUR0000SA0).

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

## Contributing

Source code is available on [GitHub][].

To report a bug, visit the [issue tracker][].

To run test, run `npm run test-all`. To display test coverage, run `npm run coverage`. To build for
production, run `npm pack`. To build the documentation, run `npm run doc`.

To send your contribution, open a [pull request][].

## License

```text
Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>

Licensed under the Apache License, Version 2.0(the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[GitHub]: https://github.com/8hobbies/cpi-us
[issue tracker]: https://github.com/8hobbies/cpu-us/issues
[pull request]: https://github.com/8hobbies/cpi-us/pulls
[npm]: https://www.npmjs.com/
