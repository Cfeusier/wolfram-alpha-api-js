'use strict'

function assumption(data, parent) {
  Object.assign(this, data)
  if (!!parent) {
    this.__parent = parent
  }
  this.__data = data
}

assumption.prototype = {
  constructor: assumption,
  getType: type,
  getCount: count,
  getTemplate: template,
  getWord: word,
  getValue: value
}

module.exports = assumption

function type() {
  return this.type || ''
}

function count() {
  return this.count || '0'
}

function template() {
  return this.template || ''
}

function word() {
  return this.word || ''
}

function value() {
  return this.value || []
}
