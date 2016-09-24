'use strict'

function subPod(data) {
  return Object.assign(this, data)
}

subPod.prototype = {
  constructor: subPod,
  getTitle: title,
  getPlainText: plainText,
  getImg: img
}

export default subPod

function plainText() {
  return this.plaintext || ''
}

function img() {
  return this.img || ''
}

function title() {
  return this.title || ''
}