export default eventHandler(async (event) => {
  await requireUserSession(event)

  // https://hub.nuxt.com/docs/blob/upload
  return blob.handleUpload(event, {
    multiple: false,
    put: {
      addRandomSuffix: true
    },
    ensure: {
      maxSize: '8MB',
      types: ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/webp']
    }
  })
})
