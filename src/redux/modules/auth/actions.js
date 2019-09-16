export const INIT = '@components/auth/INIT'
export const EMAIL_LOGIN = '@components/auth/EMAIL_LOGIN'
export const SMS_LOGIN = '@components/auth/SMS_LOGIN'
export const LOGOUT = '@components/auth/LOGOUT'

/**
 * Download and initialize AccountKit sdk if needed.
 */
export const initAccountKit = () => ({type: INIT})
/**
 * Open AccountKit modal in email mode.
 * @param {Object} data
 * @param {String} data.email
 */
export const emailLogin = ({email}) => ({type: EMAIL_LOGIN, email})
/**
 * Open AccountKit modal in SMS/WhatsApp mode.
 * @param {Object} data
 * @param {String} data.countryCode
 * @param {String} data.phone
 */
export const smsLogin = ({countryCode, phone}) => ({
  type: SMS_LOGIN,
  countryCode,
  phone
})
/**
 * Log out
 */
export const logOut = () => ({type: LOGOUT})
