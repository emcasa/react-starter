import {SERVICE_WORKER} from '@/config'

if (SERVICE_WORKER && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('SW registered: ', registration)
    })
    .catch((registrationError) => {
      console.log('SW registration failed: ', registrationError)
    })
}
