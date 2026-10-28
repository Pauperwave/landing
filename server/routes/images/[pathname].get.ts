import * as v from 'valibot'

export default eventHandler(async (event) => {
  const { pathname } = await getValidatedRouterParams(event, v.parser(v.object({
    pathname: v.pipe(v.string(), v.minLength(1))
  })))

  return blob.serve(event, pathname)
})
