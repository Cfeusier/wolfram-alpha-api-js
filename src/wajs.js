'use strict'

require('babel-polyfill')

const constants = require('./constants')

function wajs(appId) {
  if (!appId || !appId.length) {
    throw new Error(constants.noAppIdError)
  }
  var q = {
    query: {
      appid: appId
    }
  }
  this.__requestOptions = Object.assign({}, constants.defaultQueryOptions, q)
}

wajs.prototype = {
  constructor: wajs,
  query: require('./query')
}

module.exports = wajs
