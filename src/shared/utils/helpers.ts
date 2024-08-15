export const removeTrailingSlash = (url: string) => {
  if (url.endsWith("/")) {
    return url.replace(/\/+$/, "")
  }

  return url
}
