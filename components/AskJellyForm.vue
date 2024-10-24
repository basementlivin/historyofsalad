<script lang="ts" setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
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
      form.value.name = ''
      form.value.email = ''
      form.value.message = ''
      setTimeout(() => {
        showAlert.value = false
      }, 3000)
    })
    .catch((error) => console.error("Form submission error:", error))
}
</script>

<template>
  <div class="ask-jelly-form">
    <form
      name="ask-jelly"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <input
        type="hidden"
        name="form-name"
        value="ask-jelly"
      >
      <input
        type="hidden"
        name="bot-field"
      >

      <div class="form-group">
        <label for="name">Name</label>
        <input  
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="NAME"
          required
        >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="EMAIL"
          required
        >
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          placeholder="MESSAGE"
          required
        />
      </div>
      <button
        type="submit"
        class="link"
      >
        send
      </button>
      <span
        v-if="showAlert"
        class="success-message"
      >
        Got it, thanks!
      </span>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/components/_form--ask-jelly.scss';
</style>
