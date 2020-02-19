module.exports = {
  ci: {
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "max-potential-fid": "off",
        "uses-long-cache-ttl": "off",
        "uses-http2": "off",
        "redirects-http": "off",
        "meta-description": "off",
        "color-contrast": "off"
      }
    },
    upload: {
      target: "temporary-public-storage"
    },
    collect: {
      startServerCommand: "yarn start:prod",
      url: [
        "http://localhost:3000/"
      ]
    }
  }
}
