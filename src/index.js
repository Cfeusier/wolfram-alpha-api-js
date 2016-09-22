'use strict'

// Hard dependencies
const $net = require('popsicle')
const $parseXML = (new require('xml2js').Parser()).parseString
const $ = require('cheerio')
const $promise = require('bluebird')
const $walk = require('traverse')

// Default Messages and Query Options
const setAppIdCmd = 'export WA_APP_ID="<YOUR KEY HERE>"'
const setAppIdError = 'The Wolfram|Alpha API will not work without your APP_ID'
const noAppIdError = setAppIdError + '. Before reinitializing wajs, run ' + setAppIdCmd + '.'
const defaultQueryOptions = {
  url: 'http://api.wolframalpha.com/v2/query',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
}

function generateQuery(input, options) {
  var q = Object.assign({}, this.__requestOptions)
  if (!!input && input.length) {
    q.query.input = input
  }
  if (options.async) {
    q.query.async = true
  }
  return q
}

function lift(tree) {
  $walk(tree).forEach(function() {
    if (this.key === '$') {
      var currentPath = this.path.slice(0, this.path.length - 1)
      this.delete()
      this.keys.forEach(function(key) {
        $walk(tree).set(currentPath.concat(key), this.node[key])
      }.bind(this))
    }
  })
  return tree
}

function liftAttributes(obj) {
  return lift(Object.assign({}, obj))
}

function podFailed() {
  return this.error === 'true'
}

function podSucceeded() {
  return !podFailed.call(this)
}

function numSubPods() {
  return Number(this.numsubpods || 0)
}

function podTitle() {
  return this.title || ''
}

function podScanner() {
  return this.scanner || ''
}

function podPosition() {
  return Number(this.position || 0)
}

function podAsyncUrl() {
  return this.asynchurl || ''
}

function podSubPods(xmlFormat) {
  if (!!xmlFormat) {
    return subPodRawXml.call(this)
  }
  return (this.subpod || []).map(function(subpod) {
    return new subPod(subpod)
  })
}

function getXmlCollection(key) {
  if (key === 'subpod') {
    var __xml = $.load(this.rawXml.call(this), xmlOptions())
    var __podXml = $.load(__xml.root().get(0).children[0], xmlOptions())
    var items = []
    __podXml(key).each(function(i, el) {
      var x = $.load($(el).get(0), xmlOptions()).xml() || ''
      items.push(x)
    })
    return items
  } else if (key === 'pod') {
    var __xml = $.load(this.__parent.rawXml.call(this.__parent), xmlOptions())
    var __id = this.id
    var __filtered = __xml(key).filter(function(i, el) {
      return $(el).attr('id') === __id
    })
    var items = []
    __filtered.each(function(i, el) {
      var x = $.load($(el).get(0), xmlOptions()).xml() || ''
      items.push(x)
    })
    return items
  }
}

function podRawXml() {
  return getXmlCollection.call(this, 'pod')
}

function subPodRawXml() {
  return getXmlCollection.call(this, 'subpod')
}

function toJson() {
  return JSON.stringify(this.__root)
}

function rawXml() {
  return this.__raw
}

function succeeded() {
  return this.__root.success === 'true'
}

function failed() {
  return this.__root.error === 'true'
}

function numPods() {
  return Number(this.__root.numpods || 0)
}

function dataTypes() {
  return (this.__root.datatypes || '').split(',')
}

function error() {
  return this.__xml.queryresult.error || null
}

function traverse(stack, parsedXML, action) {
  var __$root = $(parsedXML)
  var __root = __$root.get(0)
  action(stack, __root)
  var children = __$root.children()
  if (children.length) {
    children.each(function(i, el) {
      traverse(stack, el, action)
    })
  }
}

function collect(key, stack, __root) {
  if (__root.tagName === key) {
    stack.push(__root)
  }
}

function xmlOptions() {
  return { xmlMode: true }
}

function getNodes(key, xml) {
  var __stack = []
  var __xml = !!xml ? xml : $.load(this.__raw, xmlOptions())
  traverse(__stack, __xml.root(), collect.bind(this, key))
  return __stack.map(function(_node) {
    return $.load(_node, xmlOptions()).xml()
  })
}

function pods(xmlFormat) {
  if (!!xmlFormat) {
    return getNodes.call(this, 'pod')
  }
  return this.__pods
}

function assumptions(xmlFormat) {
  if (!!xmlFormat) {
    return getNodes.call(this, 'assumptions')
  }
  return this.__root.assumptions
}

function sources(xmlFormat) {
  if (!!xmlFormat) {
    return getNodes.call(this, 'sources')
  }
  return this.__root.sources
}

function warnings(xmlFormat) {
  if (!!xmlFormat) {
    return getNodes.call(this, 'warnings')
  }
  return this.__root.warnings
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
    $net.request(this.generateQuery.call(this, prefix, opts))
    .then(processQueryResponse.bind(this, y, n))
    .catch(n)
  }.bind(this))
}

// Constructors and prototypes
function subPod(data) {
  return Object.assign(this, data)
}

subPod.prototype = {
  constructor: subPod
}

function pod(data, parent) {
  Object.assign(this, data)
  if (!!parent) {
    this.__parent = parent
  }
  this.__data = data
}

pod.prototype = {
  constructor: pod,
  failed: podFailed,
  succeeded: podSucceeded,
  numSubPods: numSubPods,
  getTitle: podTitle,
  getScanner: podScanner,
  getPosition: podPosition,
  asyncEndpoint: podAsyncUrl,
  subPods: podSubPods,
  rawXml: podRawXml
}

function queryResult(xml, rawXml) {
  if (!xml || !xml.queryresult) {
    throw new Error('Invalid query result format')
  }
  this.__xml = xml
  this.__raw = rawXml || ''
  this.__root = liftAttributes(Object.assign({}, xml.queryresult))
  this.__pods = (this.__root.pod || []).map(function(_pod) {
    return new pod(_pod, this)
  }.bind(this))
}

queryResult.prototype = {
  constructor: queryResult,
  rawXml: rawXml,
  toJson: toJson,
  succeeded: succeeded,
  failed: failed,
  numPods: numPods,
  dataTypes: dataTypes,
  error: error,
  pods: pods,
  assumptions: assumptions,
  sources: sources,
  warnings: warnings
}

function wajs(appId) {
  if (!appId || !appId.length) {
    throw new Error(noAppIdError)
  }
  var q = {
    query: {
      appid: appId
    }
  }
  this.__requestOptions = Object.assign({}, defaultQueryOptions, q)
}

wajs.prototype = {
  constructor: wajs,
  generateQuery: generateQuery,
  query: query,
  queryResult: queryResult
}

module.exports = wajs
