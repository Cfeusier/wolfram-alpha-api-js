'use strict'

import constants from './constants'
import query from './query'

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
  query: query
}

export default wajs
