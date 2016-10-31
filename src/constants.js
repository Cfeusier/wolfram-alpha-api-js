'use strict'

const queryMap = {
  podTitle: 'podtitle',
  podIndex: 'podindex',
  includePodId: 'includepodid',
  excludePodId: 'excludepodid',
  coordinates: 'latlong',
  podState: 'podstate',
  maxWidth: 'maxwidth',
  plotWidth: 'plotWidth',
  magnitude: 'mag',
  scanTimeout: 'scantimeout',
  podTimeout: 'podtimeout',
  parseTimeout: 'parsetimeout',
  formatTimeout: 'formattimeout',
  ignoreCase: 'ignorecase'
}

const defaultQueryOptions = {
  method: 'GET',
  url: 'http://api.wolframalpha.com/v2/query',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
}

const setAppIdCmd = 'export WA_APP_ID="<YOUR KEY HERE>"'

const setAppIdError = 'The Wolfram|Alpha API will not work without your APP_ID'

const noAppIdError = setAppIdError + '. Before reinitializing wajs, run ' + setAppIdCmd + '.'

let constants = {
  queryMap: queryMap,
  defaultQueryOptions: defaultQueryOptions,
  noAppIdError: noAppIdError
}

export default constants
