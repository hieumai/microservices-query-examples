import globalConstants from '../constants';

export const SERVICES_CONNECT_OPTIONS = {
  kitchenOptions: (uriSuffix) => {
    return {
      uri: `http://localhost:${globalConstants.SERVICE_LOCAL_PORT.kitchen}/api/${uriSuffix}`,
      json: true
    }
  },
  accountingOptions: (uriSuffix) => {
    return {
      uri: `http://localhost:${globalConstants.SERVICE_LOCAL_PORT.accounting}/api/${uriSuffix}`,
      json: true
    }
  },
  delivery: (uriSuffix) => {
    return {
      uri: `http://localhost:${globalConstants.SERVICE_LOCAL_PORT.delivery}/api/${uriSuffix}`,
      json: true
    }
  },
  order: (uriSuffix) => {
    return {
      uri: `http://localhost:${globalConstants.SERVICE_LOCAL_PORT.order}/api/${uriSuffix}`,
      json: true
    }
  }
}
