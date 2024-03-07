'use strict'

module.exports = (result) => {
  if (result.error) {
    return {
      status: 'error',
      code: result.code ?? 1002,
      message: result.error,
      data: null
    }
  } else {
    return {
      status: 'success',
      code: 1001,
      message: result.message ?? null,
      data: result.data ?? null,
      meta: result.meta ?? undefined
    }
  }
}

// Response codes:
// 1001 - 'Success'
// 1002 - 'Error'
// 1401 - 'Access token expired or invalid required to get new access token'
// 1402 - 'Session expired or invalid required to re-login'
// 1403 - 'Have problem with your account like unverfied email, unverified otp, blocked, suspended, etc.'
// 1405 - 'KYC not verified'
// 1411 - 'Outdated version'
// 1412 - 'Maintenance mode'
