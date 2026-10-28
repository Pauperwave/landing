import * as v from 'valibot'

// Photos per request are capped so one call cannot ask the bucket for an unbounded delete
const MAX_PATHNAMES_PER_REQUEST = 1000

export default eventHandler(async (event) => {
  await requireUserSession(event)

  const { pathnames } = await readValidatedBody(event, v.parser(v.object({
    pathnames: v.pipe(
      v.array(v.pipe(v.string(), v.minLength(1))),
      v.minLength(1),
      v.maxLength(MAX_PATHNAMES_PER_REQUEST)
    )
  })))

  await blob.del(pathnames)

  return { deleted: pathnames.length }
})
