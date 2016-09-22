'use strict'

const wajs = require('../src/index')

let id = '2A6TE7-RAG7A8Y526'

let wa = new wajs(id)

wa.query('weather')
.then(function(res) {
  // console.log(res.toJson())
  // res.rawXml()
  // res.succeeded()
  // res.failed()
  // res.numPods()
  // res.dataTypes()
  // res.error()
  // console.log(res.pods())
  // console.log(res.pods(true))
  // console.log(res.pods()[0].succeeded())
  // console.log(res.pods()[0].failed())
  console.log(res.pods()[0])
  console.log(res.pods()[0].numSubPods())
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
