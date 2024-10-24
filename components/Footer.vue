<script setup lang="ts">
import { ref } from 'vue'

import FooterMask from '@/assets/svg/mask--footer.svg'
import FooterLogo from '@/assets/svg/logo--footer.svg'
import FacebookIcon from '@/assets/svg/social--facebook.svg'
import InstagramIcon from '@/assets/svg/social--instagram.svg'
import TikTokIcon from '@/assets/svg/social--tiktok.svg'
import YouTubeIcon from '@/assets/svg/social--youtube.svg'
import { isFilled } from '@prismicio/client'

const footerLinks = useFooterLinks()

const form = ref({
  email: ''
})

const showAlert = ref(false)

const handleSubmit = (event: Event) => {
  event.preventDefault()

  const formElement = event.target as HTMLFormElement
  const formData = new FormData(formElement)

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData as any).toString(),
  })
    .then(() => {
      showAlert.value = true
      form.value.email = ''
      setTimeout(() => {
        showAlert.value = false
      }, 3000)
    })
    .catch((error) => console.error("Form submission error:", error))
}
</script>

<template>
  <div class="footer__mask">
    <FooterMask class="mask" />
  </div>
  <footer class="footer">
    <div class="footer__logo">
      <FooterLogo class="logo" />
    </div>
    <div class="footer__links">
      <ul class="links">
        <li
          v-for="item in footerLinks?.data?.links"
          :key="item?.label?.[0]|| ''"
          class="link--footer"
        >
          <PrismicLink :field="item.link">
            {{ item?.label || '' }}
          </PrismicLink>
        </li>
      </ul>
    </div>
    <div class="footer__newsletter-signup">
      <span class="form-header">Hear the news</span>
      <form
        name="newsletter-signup--footer"
        method="POST"
        class="newsletter-signup"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit"
      >
        <!-- Hidden input for form name and honeypot field -->
        <input
          type="hidden"
          name="form-name"
          value="newsletter-signup--footer"
        >
        <input
          type="hidden"
          name="bot-field"
        >

        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="Your email"
          class="input"
          required
        >
        <button
          type="submit"
          class="button link"
        >
          subscribe
        </button>
        <span
          v-if="showAlert"
          class="success-message"
        >
          Got it, thanks!
        </span>
      </form>
    </div>
    <div class="footer__social">
      <div class="social-links">
        <PrismicLink
          v-if="footerLinks?.data?.facebook_url && isFilled.link(footerLinks?.data?.facebook_url)"
          :field="footerLinks?.data?.facebook_url"
          aria-label="Visit Spread the Jelly on Facebook"
        >
          <FacebookIcon />
        </PrismicLink>
        <PrismicLink
          v-if="footerLinks?.data?.instagram_url && isFilled.link(footerLinks?.data?.instagram_url)"
          :field="footerLinks?.data?.instagram_url"
          aria-label="Visit Spread the Jelly on Instagram"
        >
          <InstagramIcon />
        </PrismicLink>
        <PrismicLink
          v-if="footerLinks?.data?.tiktok_url && isFilled.link(footerLinks?.data?.tiktok_url)"
          :field="footerLinks?.data?.tiktok_url"
          aria-label="Visit Spread the Jelly on TikTok"
        >
          <TikTokIcon />
        </PrismicLink>
        <PrismicLink
          v-if="footerLinks?.data?.youtube_url && isFilled.link(footerLinks?.data?.youtube_url)"
          :field="footerLinks?.data?.youtube_url"
          aria-label="Visit Spread the Jelly on YouTube"
        >
          <YouTubeIcon />
        </PrismicLink>
      </div>
    </div>
    <div class="footer__credits">
      <p>
        &copy; {{ new Date().getFullYear() }} Spread the Jelly.
        Site development by 
        <a
          href="https://historyofsalad.com"
          target="_blank"
          aria-label="Visit the website of History of Salad, the developers behind this site."
        >
          History of Salad.
        </a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/components/_footer.scss';
</style>
