export const useFooterLinks = () => {
  const prismic = usePrismic()
  return useAsyncData('$footer_links', () => prismic.client.getSingle('footer_links')).data
}