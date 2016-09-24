# `wajs` &mdash; Wolfram|Alpha via JS

**wajs** provides JavaScript bindings for the [Wolfram|Alpha web-service API](http://products.wolframalpha.com/api/).

[ ![Current Stable Release Version](https://img.shields.io/badge/version-0.0.6-blue.svg)](https://github.com/cfeusier/wolfram-alpha-api-js/releases)
[ ![Current Stable npm Release](https://img.shields.io/badge/npm-install%20wajs-lightgrey.svg)](https://www.npmjs.com/package/wajs)

> <sub>__Created by [Clark Feusier](http://clarkfeusier.com/pages/about)__</sub>

<sub>_All other language bindings for Wolfram|Alpha can be found [here](http://products.wolframalpha.com/api/libraries.html)._</sub>

---

1. [Overview](#overview)
1. [Dependencies](#dependencies)

<!--
1. [Installation](#installation)
1. [Documentation](#documentation)
    1. [API Reference](#api-reference)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing-to-jkif-parser)
1. [Development Requirements](#development-requirements)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running Tests](#running-tests)
1. [License](#license)
1. [Appendix](#appendix) -->

---
## Overview

...

#### Dependencies

- [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) &mdash; parses XML to JavaScript objects
- [bluebird](https://github.com/petkaantonov/bluebird) &mdash; creates a Promise-interface for query methods
- [cheerio](https://github.com/cheeriojs/cheerio) &mdash; simple server-side DOM utility library
- [popsicle](https://github.com/blakeembrey/popsicle) &mdash; utility for making server and browser HTTP requests
- [traverse](https://github.com/substack/js-traverse) &mdash; utility for traversing JavaScript objects

---

<!--

## Installation

**jKif Parser** is available as an npm package.

***Install module from command-line***

```sh
npm install jkif-parser
```

***Require module for use in desired file***

```js
var jkParser = require('jkif-parser');
```

---

## Documentation

### *jKif Parser*

This object provides an object-oriented API for parsing SUO-KIF into JavaScript, as well as utility methods for handling the parsed output.

```js
var Parser = require('jkif-parser');
```

### API Reference

- [**`parse`**](#parse)
- [**`parseFile`**](#parseFile)
- [**`parseFileP`**](#parseFileP)
- [**`writeParsedToFile`**](#writeParsedToFile)
- [**`writeParsedToFileP`**](#writeParsedToFileP)

#### parse

#### `parse(suoKif: string): KIFNode<T>`

Synchronously parses string of SUO-KIF into an Abstract Syntax Tree represented by a JavaScript `KIFNode`.

```js
Parser.parse('(instance ?FIDDLE Dog)');

// Output JavaScript AST
{
  type: 'KIFNode',
  locationData: {
    first_line: 1,
    last_line: 1,
    first_column: 0,
    last_column: 22
  },
  expressions: [
    {
      type: 'RelSentNode',
      locationData: { ... },
      constant: {
        type: 'WordNode',
        locationData: { ... },
        word: 'instance'
      },
      argumentList: [
        {
          type: 'VariableNode',
          locationData: { ... },
          variableType: 'IND',
          variableName: 'FIDDLE'
        },
        {
          type: 'WordNode',
          locationData: { ... },
          word: 'Dog'
        }
      ]
    }
  ]
}
```

#### parseFile

#### `parseFile(filePath: string, cb: function): void`

Asynchronously parses a file of SUO-KIF into an Abstract Syntax Tree represented by a JavaScript `KIFNode`, which is then passed to the callback function on invocation.

The callback function will receive two arguments &mdash; an `error` and a `KIFNode` (an AST of the parsed file). The `error` will be null if the parsing was successful.

```js
Parser.parseFile('filePathToSomeSUOKIF', function(error, kifNode) {
  if (!error) {
    // do something with the kifNode AST
  }
});
```

**N.B.** &mdash; this is a side-effect function, which returns `undefined`.

#### parseFileP

#### `parseFileP(filePath: string): Promise<T>`

Asynchronously parses a file of SUO-KIF into an Abstract Syntax Tree represented by a JavaScript `KIFNode`, which is then used as the resolution of the `parseFileP` promise.

To access the output of the parsing, register a `then` handler on the promise.

If the parsing fails, the error can be handled by registering a `catch` handler on the promise.

```js
Parser.parseFileP('filePathToSomeSUOKIF').then(function(kifNode) {
  // do something with the kifNode AST
}).catch(function(error) {
  // do something with the error if the parsing fails
});
```

#### writeParsedToFile

#### `writeParsedToFile(filePath: string, parsed: KIFNode, cb: function): void`

Asynchronously writes *parsed* SUO-KIF to a file, invoking the supplied callback function with the results of the write operation.

The callback function will receive one argument &mdash; an `error`. The `error` will be null if the parsing was successful.

```js
var kifString = '(exists (?FIDDLE ?CLARK)
                    (and
                      (instance ?FIDDLE Dog)
                      (loves ?FIDDLE ?CLARK)))';
var parsed = Parser.parse(kifString);

Parser.writeParsedToFile('filePath', parsed, function(error) {
  if (!error) {
    // your file should now have the AST in JSON format
  }
});
```

**N.B.** &mdash; this is a side-effect function, which returns `undefined`.

#### writeParsedToFileP

#### `writeParsedToFileP(filePath: string, parsed: KIFNode): Promise<T>`

Asynchronously writes *parsed* SUO-KIF to a file, returning a promise.

If the write operation is successful, then the promise value will resolve as `null`. If the write operation fails, you can register a `catch` handler function to receive the `error` from the promise resolution.

```js
var kifString = '(exists (?FIDDLE ?CLARK)
                    (and
                      (instance ?FIDDLE Dog)
                      (loves ?FIDDLE ?CLARK)))';
var parsed = Parser.parse(kifString);

Parser.writeParsedToFileP('filePath', parsed).catch(function(error) {
  // handle the error
  // if this is not run, the parsed was written to the file successfully
});
```

---

## Roadmap

The future of jKif Parser is managed through this repository's **Issues** &mdash; [view the roadmap here](https://github.com/jkif/parser/issues).

## Contributing to jKif Parser

We welcome contributions, but please read our [contribution guidelines](CONTRIBUTING.md) before submitting your work. The development requirements and instructions are below.

## Development Requirements

- Node 0.10.x
- npm 2.x.x
- Mocha
- Chai
- Jison
- Bluebird
- JSONFile

### Installing Dependencies

Install Node (bundled with npm) using [Homebrew](http://brew.sh/):

```sh
brew install node
```

Install project and development dependencies using npm:

```sh
npm install
```

### Running Tests

After installing the above dependencies, tests can be run using the following command:

```sh
npm test
```

## License

jKif Parser - Lexical Analysis and Parsing of SUO-KIF into JavaScript Objects

Copyright (C) 2015 Clark Feusier <cfeusier@gmail.com> - All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Appendix

#### SUO-KIF

[SUO-KIF] [1] was derived from [KIF] [2] by [Adam Pease] [3] and [Ian Niles] [4] for the construction of [SUMO] [5]. KIF, the Knowledge Interchange Format, is an Erlang-based language used for the formal representation and interchange of knowledge. KIF and SUO-KIF have **declarative semantics** and are **logically complete**, contra languages like *Prolog* and *SQL*. SUO-KIF was designed primarily for the ***authoring*** of knowledge, which makes it more amenable to ontology design than vanilla KIF.

[1]: http://sigmakee.cvs.sourceforge.net/viewvc/sigmakee/sigma/suo-kif.pdf "SUO-KIF"
[2]: https://www.cs.auckland.ac.nz/courses/compsci367s2c/resources/kif.pdf "KIF"
[3]: http://www.adampease.org/professional/ "Adam Pease"
[4]: https://www.linkedin.com/pub/ian-niles/2/1b6/a69 "Ian Niles"
[5]: http://www.adampease.org/OP/ "SUMO"

#### Ontologies and SUMO

The market-wide move, from the *informal* taxonomies of the 'semantic web' to the *formal* ontologies of the new 'cognitive web', is a strong indicator &mdash; even small sets of axiomatized knowledge are more powerful than large bodies of informally structured data.

**Why?** Formal knowledge can be used to generate new knowledge; informal specifications can do no such thing because there is a possibility for inconsistency in the specifications. If we can provide a consistent semantics to our concepts and data, then meanings are not dependent on a particular inference implementation &mdash; enter **maching learning**.

If formal knowledge is good, than open formal knowledge is better, and more open formal knowledge is best. This is the reasoning that led me to choose SUO-KIF as the origin language for the **jKif Parser**.

The largest formal public ontology in existence today, the **Suggested Upper Merged Ontology** (SUMO), is written in SUO-KIF. SUMO is the *only* formal ontology to be mapped to the complete WordNet lexicon. SUMO, and its domain-specific ontologies, consists of over 25,000 terms and more than 80,000 axioms. SUMO has been merged with millions of instance facts from YAGO (Wikipedia). Finally, SUMO is free and owned by the IEEE.

I want to get SUMO into the hands of the world's engineers &mdash; JavaScript seemed like a logical choice for a target language on top of which to expose an API for querying and manipulating SUO-KIF (the next library jKif will release).

#### Jison and Parser Generators

[**Jison**](http://zaach.github.io/jison/docs/) is a JavaScript parser generator, based closely on the famous Yacc and Bison. Jison also includes a lexical analyzer that is very similar to Lex/Flex. Jison is probably most well-known for its use in generation of the parsers used in the CoffeeScript and handlebars.js compilers.

Jison, like most parser generators, takes a lexical scanner and [**context-free grammar**](http://en.wikipedia.org/wiki/Context-free_grammar) as input, and spits out a parser that can be used to parse the langauge described by the input grammar.

The generated parser algorithm is an LALR(1) **shift-reduce** algorithm &mdash; shifting tokens onto a parse stack until a rule is recognized, at which point the matching tokens are reduced to the result of a combination action described by the matched rule. This is a **bottom-up** approach to parsing, keeping a single look-ahead token, as described [here](http://dinosaur.compilertools.net/bison/bison_8.html#SEC68).

#### [Back to Top](#) -->