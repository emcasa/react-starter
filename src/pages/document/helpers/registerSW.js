export default function registerServiceWorker(shouldRegister) {
  if (shouldRegister && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
    })
  }
}
