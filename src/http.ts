import { Response } from 'got'
import { ExpectResult } from './types'

// TODO@PI: Handle not.to
export function toHaveHTTPStatus(res: Response<string | object>, expected: number): ExpectResult {
  const received = res.statusCode

  if (received === expected) {
    return {
      message: () => `expected response not to have HTTP status ${expected}`,
      pass: true
    }
  } else {
    return {
      message: () => `expected response to have HTTP status ${expected} but it has HTTP status ${received}`,
      pass: false
    }
  }
}

// TODO@PI: Handle not.to
export function toBeJSON(res: Response<string | object>): ExpectResult {
  const received = res.headers['content-type']

  if (received && received.startsWith('application/json')) {
    return {
      message: () => 'expected response not to be JSON',
      pass: true
    }
  } else {
    return {
      message: () => `expected response to be JSON, but got ${JSON.stringify(received)} type instead`,
      pass: false
    }
  }
}

// TODO@PI: Handle not.to
export function toBeText(res: Response<string | object>): ExpectResult {
  const received = res.headers['content-type']

  if (received && received.startsWith('text/plain')) {
    return {
      message: () => 'expected response not to be text',
      pass: true
    }
  } else {
    return {
      message: () => `expected response to be text, but got ${JSON.stringify(received)} type instead`,
      pass: false
    }
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveHTTPStatus(expected: number): R
      toBeJSON(): R
      toBeText(): R
    }
  }
}