<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isFilled } from '@prismicio/client';
import Cookies from 'universal-cookie'

const newsletter = useNewsletterPopupForm()
const isModalVisible = ref(false) // Controls modal visibility
const isFormSubmitted = ref(false) // Controls form submission state
const COOKIE_NAME = 'newsletter_signup'
const DAYS_TO_EXPIRE = 30 // Number of days before the modal is shown again
const cookies = new Cookies() // Initialize universal-cookie

onMounted(() => {
  if (!hasSeenModal()) {
    setTimeout(() => {
      isModalVisible.value = true
    }, 2850)
  }
})

const closeModal = () => {
  isModalVisible.value = false
}

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
      isFormSubmitted.value = true
      setCookie(COOKIE_NAME, 'true', DAYS_TO_EXPIRE)
      setTimeout(() => {
        closeModal()
      }, 2500)
    })
    .catch((error) => console.error("Form submission error:", error))
}

// Function to set a cookie with an expiration date
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  cookies.set(name, value, { path: '/', expires })
}

// Function to check if the user has already seen the modal
const hasSeenModal = (): boolean => {
  return cookies.get(COOKIE_NAME) !== undefined
}

const form = ref({
  email: ''
})
</script>

<template>
  <div
    v-if="isModalVisible"
    class="modal-overlay"
    @click.self="closeModal"
  >
    <div
      :class="{
        'modal-content': true,
        'newsletter-popup': true,
      }"
    >
      <button
        class="close-button sr-only"
        aria-label="Close signup modal"
        @click="closeModal"
      >
        X
      </button>

      <div
        v-if="isFormSubmitted"
        class="success-message"
      >
        <span
          v-if="isFilled.keyText(newsletter?.data.success_headline)"
          class="headline"
        >
          {{ newsletter?.data.success_headline || 'Got it, thanks!' }}
        </span>
        <span
          v-if="isFilled.keyText(newsletter?.data.success_subheadline)"
          class="subheadline"
        >
          {{ newsletter?.data.success_subheadline }}
        </span>
      </div>
      
      <form
        v-else
        name="newsletter-signup--popup"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit"
      >
        <input
          type="hidden"
          name="form-name"
          value="newsletter-signup--popup"
        >
        <input
          type="hidden"
          name="bot-field"
        >

        <div class="signup-form__intro">
          <span
            v-if="isFilled.keyText(newsletter?.data.headline)"
            class="headline"
          >
            {{ newsletter?.data.headline || 'Get Jelly' }}
          </span>
          <span
            v-if="isFilled.keyText(newsletter?.data.subheadline)"
            class="subheadline"
          >
            {{ newsletter?.data.subheadline || 'Sign up for the newsletter' }}
          </span>
        </div>

        <div class="signup-form__content">
          <label
            for="email"
            class="sr-only"
          >
            Email Address
          </label>
  
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Your email"
            required
          >
  
          <button
            v-if="isFilled.keyText(newsletter?.data.button_text)"
            type="submit"
            class="link"
          >
            {{ newsletter?.data.button_text || 'Join the club!' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  @import url('@/assets/scss/components/_newsletter-popup.scss');
</style>
