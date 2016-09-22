'use strict'

const wajs = require('../src/index')

let id = process.env.WA_APP_ID || ''

let wa = new wajs(id)

wa.query('weather')
.then(function(res) {
  // console.log(res.toJson())
  // res.rawXml()
  res.succeeded()
  // res.failed()
  // res.numPods()
  // res.dataTypes()
  // res.error()
  console.log(res.pods()[0].rawXml())
  console.log(res.pods()[1].subPods(true))
  // console.log(res.pods()[0].subPods())
  // res.pods()[1].subPods(true)
  // console.log(res.pods(true))
  // console.log(res.pods()[0].succeeded())
  // console.log(res.pods()[0].failed())
  // console.log(res.pods()[0].getTitle())
  // console.log(res.pods()[0].getScanner())
  // console.log(res.pods()[0].getPosition())
  // console.log(res.pods()[0].asyncEndpoint())
  // res.pods()[0].subPods()
  // res.pods()[0].subPods(true)
  // console.log(res.assumptions())
  // console.log(res.assumptions(true))
  // console.log(res.rawXml())
  // console.log(res.sources())
  // console.log(res.sources(true))
  // console.log(res.warnings())
  // console.log(res.warnings(true))

})
.catch(function(err) {
  console.error(err)
})
