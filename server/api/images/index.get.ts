export default eventHandler(async () => {
  const { blobs } = await blob.list({
    limit: 1000
  })

  return blobs
})
