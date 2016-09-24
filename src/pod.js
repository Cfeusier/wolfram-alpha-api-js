'use strict'

const $ = require('cheerio')

function pod(data, parent) {
  Object.assign(this, data)
  if (!!parent) {
    this.__parent = parent
  }
  this.__data = data
}

pod.prototype = {
  constructor: pod,
  failed: failed,
  succeeded: succeeded,
  numSubPods: numSubPods,
  getTitle: title,
  getScanner: scanner,
  getPosition: position,
  asyncEndpoint: asyncUrl,
  subPods: subPods,
  getStates: states,
  getInfos: infos,
  rawXml: rawXml
}

module.exports = pod

function failed() {
  return this.error === 'true'
}

function succeeded() {
  return !podFailed.call(this)
}

function numSubPods() {
  return Number(this.numsubpods || 0)
}

function title() {
  return this.title || ''
}

function scanner() {
  return this.scanner || ''
}

function position() {
  return Number(this.position || 0)
}

function asyncUrl() {
  return this.asynchurl || ''
}

function subPods(xmlFormat) {
  if (!!xmlFormat) {
    return childXml.call(this, 'subpod')
  }
  return (this.subpod || []).map(function(subpod) {
    return new subPod(subpod)
  })
}

function states(xmlFormat) {
  if (!!xmlFormat) {
    return childXml.call(this, 'states')
  }
  return this.states || []
}

function infos(xmlFormat) {
  if (!!xmlFormat) {
    return childXml.call(this, 'infos')
  }
  return this.infos || []
}

function childXml(key) {
  var __xml = $.load(this.rawXml.call(this), xmlOptions())
  var __podXml = $.load(__xml.root().get(0).children[0], xmlOptions())
  var items = []
  __podXml(key).each(function(i, el) {
    var x = $.load($(el).get(0), xmlOptions()).xml() || ''
    items.push(x)
  })
  return items
}

function rawXml() {
  return rootXml.call(this, 'pod')
}

function xmlOptions() {
  return { xmlMode: true }
}

function rootXml(key) {
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
