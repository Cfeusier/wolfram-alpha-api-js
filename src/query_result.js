'use strict'

import $ from 'cheerio'
import $walk from 'traverse'
import pod from './pod'
import assumption from './assumption'

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

export default queryResult

function liftAttributes(obj) {
  return lift(Object.assign({}, obj))
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
  return (this.__root.assumptions || []).map(function(_assumption) {
    return new assumption(_assumption.assumption[0], this)
  }.bind(this))
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

function getNodes(key, xml) {
  var __stack = []
  var __xml = !!xml ? xml : $.load(this.__raw, xmlOptions())
  traverse(__stack, __xml.root(), collect.bind(this, key))
  return __stack.map(function(_node) {
    return $.load(_node, xmlOptions()).xml()
  })
}

function xmlOptions() {
  return { xmlMode: true }
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
