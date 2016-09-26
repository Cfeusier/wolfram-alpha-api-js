# `wajs` &mdash; Wolfram|Alpha via JS

**wajs** provides JavaScript bindings for the [Wolfram|Alpha web-service API](http://products.wolframalpha.com/api/).

[ ![Current Stable Release Version](https://img.shields.io/badge/version-0.0.13-blue.svg)](https://github.com/cfeusier/wolfram-alpha-api-js/releases)
[ ![Current Stable npm Release](https://img.shields.io/badge/npm-install%20wajs-lightgrey.svg)](https://www.npmjs.com/package/wajs)

> <sub>__Created by [Clark Feusier](http://clarkfeusier.com/pages/about)__</sub>

<sub>_All other language bindings for Wolfram|Alpha can be found [here](http://products.wolframalpha.com/api/libraries.html)._</sub>

---

1. [Overview](#overview)
1. [Installation](#installation)
1. [Documentation](#documentation)
    1. [Example Usage](#example-usage)
    1. [API Reference](#api-reference)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing-to-wajs)
1. [Development Requirements](#development-requirements)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running Tests](#running-tests)
    1. [Building](#building)
1. [License](#license)

---
## Overview

...

---

## Installation

**wajs** is available as an npm package.

<sub>* Note: Wolfram|Alpha does not support CORS for serving browser requests. <strong>wajs</strong> is only available in the Node environment until client-side requests are supported by the Wolfram|Alpha API.</sub>

***Install module from command-line***

```sh
npm install wajs
```

***Require or import module for use in desired file***

```js
// commonjs require
var wajs = require('wajs')
```

```js
// es2015 import
import wajs from 'wajs'
```

---

## Documentation

### Example Usage

```js
// require wajs module -- assuming commonjs/node environment
var wajs = require('wajs')

// the Wolfram|Alpha App Id -- generated in Wolfram|Alpha developer portal
// NOTE: copy your app id and set your WA_APP_ID environment variable
// from the command-line, as follows:
// `export WA_APP_ID='<YOUR APP ID GOES HERE>'`
var waAppId = process.env.WA_APP_ID

// create a client to query the Wolfram|Alpha web-service
// NOTE: you can create as many clients as you want, though you only need one
var waClient = new wajs(waAppId)

// the only required argument to `<wajs-client>.query` is a query string
var queryString = 'weather' // maybe this comes from user input

// if you want to customize the query further, provide query options
// for documentation on query options, please see
// the API Reference for `<wajs-client>.query`
// NOTE: this is an optional argument
var queryOptions = {
  format: 'image,plaintext,sound,wav',
  units: 'metric'
}

// use the client to send a query
waClient.query(queryString, queryOptions)
.then(function(resp) {
  // do something with the `<query-result>` response
  // for documentation on `<query-result>`, please see
  // the API reference for `<query-result>`
})
.catch(function(err) {
  // do something with the `<query-error>` response
})
```

### API Reference

- [**`wajs`**](#wajs)
- [**`<wajs-client>.query`**](#wajs-clientquery)
  - [**`options`**](#options)
- [**`<query-result>`**](#query-result)
  - [**`<query-result>.succeeded`**](#query-resultsucceeded)
  - [**`<query-result>.failed`**](#query-resultfailed)
  - [**`<query-result>.error`**](#query-resulterror)
  - [**`<query-result>.numPods`**](#query-resultnumpods)
  - [**`<query-result>.dataTypes`**](#query-resultdatatypes)
  - [**`<query-result>.toJson`**](#query-resulttojson)
  - [**`<query-result>.rawXml`**](#query-resultrawxml)
  - [**`<query-result>.pods`**](#query-resultpods)
  - [**`<query-result>.assumptions`**](#query-resultassumptions)
  - [**`<query-result>.sources`**](#query-resultsources)
  - [**`<query-result>.warnings`**](#query-resultwarnings)

#### wajs

#### `new wajs(appId: string): wajs-client<T>`

This is the constructor function for generating a `<wajs-client>`.

- `appId`:
  - *required*
  - type: string
  - [Obtain an appId from Wolfram|Alpha](http://products.wolframalpha.com/api/)

#### \<wajs-client>.query

#### `<wajs-client>.query(input: string, options: object): Promise<T>`

This method will query the Wolfram|Alpha web-service API with the provided query.

- `input`:
  - *required*
  - type: string
- `options`:
  - _optional_
  - type: object
  - [API Reference for options](#options)

```js
// query with string and default options
waClient.query('whatever')
.then(function(qr) {
  // qr === <query-result>
})
.catch(function(err) {})
```

```js
// query with string and custom options
waClient.query('pi', {
  format: 'image,plaintext,sound,wav',
  assumption: '*C.pi-_*Movie-',
  width: '900',
  maxWidth: '1200'
})
.then(function(qr) {
  // qr === <query-result>
})
.catch(function(err) {})
```

#### options

```js
var queryOptions = {
  // podTitle
  // repeatable, globable, comma-separated
  // default: all pod titles
  podTitle: '',

  // podIndex
  // repeatable, globable, comma-separated
  // default: all pod indices
  podIndex: '',

  // format
  // repeatable, comma-separated
  // default: 'image,plaintext'
  // possible options:
    // image
    // plaintext
    // minput
    // moutput
    // cell
    // mathml
    // imagemap
    // sound
    // wav
  format: '',

  // assumption
  // single string -- must match an assumption string from Wolfram|Alpha assumptions
  assumption: '',

  // includePodId
  // list of strings or single string, globable
  // default: all pod ids
  includePodId: [], // '',

  // excludePodId
  // list of strings or single string, globable
  // default: none are excluded
  excludePodId: [], // '',

  // scanner
  // list of strings or single string, globable
  // default: all scanners
  scanner: [], // ''

  // async
  // boolean -- if set to true, results will contain 'async' flags for the
  // properties that require another request to get content. If you want all the query
  // results in a single response, do not use the async flag
  // default: false
  async: true,

  // ip
  // string -- should represent the ip address to be used for restricting the query
  // default: the requesting ip address
  ip: '',

  // location
  // string -- should represent the location to be used for
  // restricting the query, e.g., 'CA'
  // default: none
  location: '',

  // coordinates
  // string -- should represent the latitude and longitude pair
  // to be used for restricting the query, e.g., '40.42,-3.71'
  // default: none
  coordinates: '',

  // podState
  // string -- should match a pod state string from a Wolfram|Alpha pod
  // default: none
  podState: '',

  // units
  // string
  // default: based on requesting location
  // possible options:
    // 'metric'
    // 'nonmetric'
  units: '',

  // width
  // string
  // default: '500'
  width: '',

  // maxWidth
  // string
  // default: '500'
  maxWidth: '',

  // plotWidth
  // string
  // default: '200'
  plotWidth: '',

  // magnitude
  // string
  // default: '1.0'
  magnitude: '',

}
```
<!--
// TODO:
scantimeout
The number of seconds to allow Wolfram|Alpha to compute results in the "scan" stage of processing. See the section "Timeouts and Asynchronous Behavior" for more details.

Optional; defaults to 3.0.

podtimeout
The number of seconds to allow Wolfram|Alpha to spend in the "format" stage for any one pod. See the section "Timeouts and Asynchronous Behavior" for more details.

Optional; defaults to 4.0.

formattimeout
The number of seconds to allow Wolfram|Alpha to spend in the "format" stage for the entire collection of pods. See the section "Timeouts and Asynchronous Behavior" for more details.

Optional; defaults to 8.0.

parsetimeout
The number of seconds to allow Wolfram|Alpha to spend in the "parsing" stage of processing. See the section "Timeouts and Asynchronous Behavior" for more details.

Optional; defaults to 5.0.

reinterpret
Whether to allow Wolfram|Alpha to reinterpret queries that would otherwise not be understood. See the section "Some Miscellaneous URL Parameters" for more details.

Optional; defaults to false.

translation
Whether to allow Wolfram|Alpha to try to translate simple queries into English. See the section "Some Miscellaneous URL Parameters" for more details.

Optional; defaults to true.

ignorecase
Whether to force Wolfram|Alpha to ignore case in queries. See the section "Some Miscellaneous URL Parameters" for more details.

Optional; defaults to false.

sig
A special signature that can be applied to guard against misuse of your AppID.

Optional.
-->


#### \<query-result>

When the promise, returned by `<wajs-client>.query`, _resolves_, the resolution handler function is provided a `<query-result>` instance, with the following API.

#### \<query-result>.succeeded

#### `<query-result>.succeeded(): boolean`

This method will return a boolean indicating the success of the query operation (not the success of the overall HTTP request, which is indicated by the query promise resolution).

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.succeeded())
})

// output
true
```

#### \<query-result>.failed

#### `<query-result>.failed(): boolean`

This method will return a boolean indicating the failure of the query operation (not the failure of the overall HTTP request, which is indicated by the query promise rejection).

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.failed())
})

// output
false
```

#### \<query-result>.error

#### `<query-result>.error(): { Error, null }`

This method will return an `Error` object if the query operation failed, and `null` otherwise.

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.error())
})

// output
null
```

#### \<query-result>.numPods

#### `<query-result>.numPods(): number`

This method will return the number of pods in the given query result.

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.numPods())
})

// output
8
```

#### \<query-result>.dataTypes

#### `<query-result>.dataTypes(): array<DataType>`

This method will return a list of `DataType` strings representing the categories and types of data represented in the query result.

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.dataTypes())
})

// output
['MathematicalFunctionIdentity']
```

#### \<query-result>.toJson

#### `<query-result>.toJson(): json-string`

This method will convert the entire query result to JSON.

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.toJson())
})

// output (truncated)
{
  "pod":[...],
  "assumptions":[...],
  "success":"true",
  "error":"false",
  "numpods":"8",
  "datatypes":"MathematicalFunctionIdentity",
  "timedout":"Numeric",
  "timedoutpods":"",
  "timing":"3.4170000000000003",
  "parsetiming":"0.14",
  "parsetimedout":"false",
  "recalculate":"http://www4b.wolframalpha.com/api/v2/recalc.jsp?id=...",
  "id":"...",
  "host":"http://www4b.wolframalpha.com",
  "server":"30",
  "related":"http://www4b.wolframalpha.com/api/v2/relatedQueries.jsp?id=...",
  "version":"2.6"
}
```

#### \<query-result>.rawXml

#### `<query-result>.rawXml(): xml-string`

This method will return the entire original xml query result.

```js
// e.g.,
waClient.query('pi').then(function(qr) {
  console.log(qr.rawXml())
})
```

```xml
<!-- output (truncated) -->
<?xml version='1.0' encoding='UTF-8'?>
<queryresult
  success='true'
  error='false'
  numpods='8'
  ...>
  <pod title='Input'>...</pod>
  <assumptions count='1'>...</assumptions>
</queryresult>
```

#### \<query-result>.pods

#### `<query-result>.pods(xmlFormat: boolean): array<pod>`

This method return a list of `pod` objects from the query result.

- `xmlFormat`:
  - type: boolean
  - _optional_
  - default: `false`
  - if `true`, the list of pods will be a list of xml string representations of the pods

```js
// e.g., default
waClient.query('pi').then(function(qr) {
  console.log(qr.pods())
})

// output (truncated)
[
  {
    subpod: [ [subpod1...] ],
    title: 'Input',
    scanner: 'Identity',
    id: 'Input',
    position: '100',
    error: 'false',
    numsubpods: '1',
    __parent: ...
  },
  ...
]

// e.g., xmlFormat is true
waClient.query('pi').then(function(qr) {
  console.log(qr.pods(true))
})

// output (truncated)
[
  '<pod title="Input" scanner="Identity" id="Input" position="100" error="false" numsubpods="1">...</pod>',
  ...
]
```

#### \<query-result>.assumptions

#### `<query-result>.assumptions(xmlFormat: boolean): array<assumption>`

This method return a list of `assumption` objects from the query result.

- `xmlFormat`:
  - type: boolean
  - _optional_
  - default: `false`
  - if `true`, the list of assumptions will be a list of xml string representations of the assumptions

```js
// e.g., default
waClient.query('pi').then(function(qr) {
  console.log(qr.assumptions())
})

// output (truncated)
[
  {
    value: [[...], [...], [...], [...], [...], [...]],
    type: 'Clash',
    word: 'pi',
    template: 'Assuming "${word}" is ${desc1}. Use as ${desc2} instead',
    count: '6',
    __parent: ...
  }
]

// e.g., xmlFormat is true
waClient.query('pi').then(function(qr) {
  console.log(qr.assumptions(true))
})

// output (truncated)
[
  '<assumption type="Clash" word="pi" template="Assuming &quot;${word}&quot; is ${desc1}. Use as ${desc2} instead" count="6">...</assumption>',
  ...
]
```

#### \<query-result>.sources

#### `<query-result>.sources(xmlFormat: boolean): array<source>`

This method return a list of `source` objects from the query result.

- `xmlFormat`:
  - type: boolean
  - _optional_
  - default: `false`
  - if `true`, the list of sources will be a list of xml string representations of each source object

```js
// e.g., default
waClient.query('weather').then(function(qr) {
  console.log(qr.sources())
})

// output (truncated)
[
  {
    source: [[...], [...], [...], [...]],
    count: '4'
  },
  ...
]

// e.g., xmlFormat is true
waClient.query('pi').then(function(qr) {
  console.log(qr.sources(true))
})

// output (truncated)
[
  '<sources count="4">...</sources>',
  ...
]
```

#### \<query-result>.warnings

#### `<query-result>.warnings(xmlFormat: boolean): array<warning>`

This method return a list of `warning` objects from the query result.

- `xmlFormat`:
  - type: boolean
  - _optional_
  - default: `false`
  - if `true`, the list of warnings will be a list of xml string representations of each warning object

```js
// e.g., default
waClient.query('pi').then(function(qr) {
  console.log(qr.warnings())
})

// output (truncated)
undefined // (there are no warnings for this query result)

// e.g., xmlFormat is true
waClient.query('pi').then(function(qr) {
  console.log(qr.warnings(true))
})

// output (truncated)
undefined // (there are no warnings for this query result)
```

---

## Roadmap

The future of **wajs** is managed through this repository's **Issues** &mdash; [view the roadmap here](https://github.com/cfeusier/wolfram-alpha-api-js/issues).

## Contributing to **wajs**

I welcome contributions, but please submit an issue before beginning so that I don't duplicate your work. The development requirements and instructions are below.

## Development Requirements

**JavaScript Engine**:
- node > 0.10.x

**Package Manager**:
- npm > 2.x.x

**Global Packages**:
- webpack

**Project Package Dependencies**:
- bluebird
- cheerio
- popsicle
- traverse
- xml2js

**Development Package Dependencies**:
- babel-core
- babel-loader
- babel-plugin-transform-runtime
- babel-polyfill
- babel-preset-es2015
- babel-preset-stage-0
- babel-runtime
- watch
- webpack-node-externals

### Installing Dependencies

Install Node (bundled with npm) using [Homebrew](http://brew.sh/):

```sh
brew install node
```

Install global project dependencies using npm:

```sh
npm install -g webpack
```

Install all local project dependencies using npm:

```sh
npm install
```

### Running Tests

After installing the above dependencies, tests can be run using the following command:

```sh
npm run test
```

### Building

For a one-off build, run the following command:

```sh
npm run build
```

For a continuous build on changes during development, run the following command:

```sh
npm run build:watch
```

---

## License

MIT LICENSE

**wajs** -- JavaScript bindings for the Wolfram|Alpha web-service API

Copyright (C) 2016 Clark Feusier <cfeusier@gmail.com> - All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

#### [Back to Top](#)