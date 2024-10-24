export const useNewsletterPopupForm = () => {
  const prismic = usePrismic()
  return useAsyncData('$newsletter_popup_form', () => prismic.client.getSingle('newsletter_popup_form')).data
}