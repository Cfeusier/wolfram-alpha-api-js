'use strict'

const $net = require('popsicle')
const $promise = require('bluebird')
const $x = require('xml2js')
const $parseXML = new $x.Parser().parseString
const constants = require('./constants')
const queryResult = require('./query_result')

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

module.exports = query
