'use strict'

import * as $net from 'popsicle'
import { Promise as $promise } from 'bluebird'
import * as $x from 'xml2js'
import constants from './constants'
import queryResult from './query_result'
const $parseXML = new $x.Parser().parseString

function generateQuery(input, options) {
  var q = Object.assign({}, this.__requestOptions)
  if (!!input && input.length) {
    q.query.input = input
  }
  Object.keys(options || {}).forEach(function(key) {
    if (options.hasOwnProperty(key) && options[key]) {
      let qKey = constants.queryMap[key] || key
      q.query[qKey] = options[key]
    }
  })
  return q
}

function processQueryResponse(y, n, res) {
  if (res.status >= 200 && res.status < 400) {
    $parseXML(res.body, function(err, xml) {
      if (err) {
        n(err)
      }
      y(new queryResult(xml, res.body))
    })
  }
}

function query(input, queryOptions) {
  return new $promise(function(y, n) {
    var prefix = input || ''
    var opts = queryOptions || {}
    $net.request(generateQuery.call(this, prefix, opts))
    .then(processQueryResponse.bind(this, y, n))
    .catch(n)
  }.bind(this))
}

export default query
