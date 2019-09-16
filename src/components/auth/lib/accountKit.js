import {FACEBOOK_APP_ID, ACCOUNT_KIT_APP_SECRET} from '@/config'

const AK_VERSION = 'v1.3'

export function loadSdk(onload) {
  const tag = document.createElement('script')
  tag.setAttribute('src', 'https://sdk.accountkit.com/pt_BR/sdk.js')
  tag.setAttribute('id', 'account-kit')
  tag.setAttribute('type', 'text/javascript')
  tag.onload = onload
  document.head.appendChild(tag)
}

export function configure() {
  window.AccountKit.init({
    appId: FACEBOOK_APP_ID,
    state: new Date() * 1,
    version: AK_VERSION,
    fbAppEventsEnabled: true,
    display: 'modal'
  })

  window.AccountKit.ready = true
}

export async function init() {
  if (!window.AccountKit)
    return new Promise((resolve) =>
      loadSdk(() => {
        window.AccountKit_OnInteractive = () => {
          configure()
          resolve()
        }
      })
    )
  else if (!window.AccountKit.ready) configure()
}

export async function login(type, options) {
  return new Promise((resolve) =>
    window.AccountKit.login(type, options, resolve)
  ).then(getAccessToken)
}

export async function getAccessToken({code}) {
  if (!code) return
  try {
    const response = await fetch(
      `https://graph.accountkit.com/${AK_VERSION}/access_token?grant_type=authorization_code&code=${code}&
      access_token=AA%7C${FACEBOOK_APP_ID}%7C${ACCOUNT_KIT_APP_SECRET}`
    )
    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error(error)
  }
}
