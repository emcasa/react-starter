export default (from, to) => ({
  cacheKeyWillBeUsed({request, mode}) {
    console.log(request.url)
    if (mode !== 'read' && from.test(request.url)) return
    return to
  }
})
