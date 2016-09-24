'use strict'

const wajs = require('../src/index')

let id = process.env.WA_APP_ID || ''

let wa = new wajs(id)
let qOpts = {
  // podTitle: 'Decimal approximation,...,*'
  // podIndex: '1,...'
  // format: 'image,plaintext,minput,moutput,cell,mathml,imagemap,sound,wav'
  // includePodId: ['*'] || '*'
  // excludePodId: ['Number Line', '*n'] || '*'
  // scanner: ['MathematicalFunctionData', 'Numeric'] || '*'
  // async: true
  // ip: '73.223.60.171'
  // location: 'CA'
  // coordinates: '40.42,-3.71'

}
wa.query('pi', qOpts)
.then(function(res) {
  console.log(res)
  // console.log(res.toJson())
  // console.log(res.rawXml())
  // res.succeeded()
  // res.failed()
  // res.numPods()
  // res.dataTypes()
  // res.error()
  // console.log(res.rawXml())
  // console.log(res.pods()[0].rawXml())
  // console.log(res.pods()[1].getStates(true))
  // console.log(res.pods(true)[1] === res.pods()[1].rawXml()[0])
  // res.pods()[1].subPods(true)
  // console.log(res.pods()[1].subPods()[0].getImg())
  // console.log(res.pods()[0].succeeded())
  // console.log(res.pods()[0].failed())
  // console.log(res.pods()[0].getTitle())
  // console.log(res.pods()[0].getScanner())
  // console.log(res.pods()[0].getPosition())
  // console.log(res.pods()[0].asyncEndpoint())
  // res.pods()[0].subPods()
  // res.pods()[0].subPods(true)
  // console.log(res.assumptions()[0].getType())
  // console.log(res.assumptions()[0].getCount())
  // console.log(res.assumptions()[0].getWord())
  // console.log(res.assumptions()[0].getValue())
  // console.log(res.assumptions()[0].getTemplate())
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
