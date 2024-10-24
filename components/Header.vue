<script setup lang="ts">
const navigation = useNavigation()

import Logo from '@/assets/svg/logo--header.svg'
import MenuHamburger from '@/assets/svg/menu--hamburger.svg'
import MenuX from '@/assets/svg/menu--x.svg'

import { ref, onBeforeUnmount, watch } from 'vue'
import Search from '@/components/Search.vue'

const isMenuOpen = ref(false)
const isSearchModalOpen = ref(false) // State for controlling the search modal

const searchModalRef = ref<HTMLDivElement | null>(null) // Ref for the modal element
const navMenuRef = ref<HTMLDivElement | null>(null) // Ref for the nav menu
const menuToggleRef = ref<HTMLButtonElement | null>(null) // Ref for the menu toggle button

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleSearchModal = () => {
  isSearchModalOpen.value = !isSearchModalOpen.value
  isMenuOpen.value = false // Ensure the menu closes when the search modal is opened
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Focus trap logic for the search modal
const trapFocusModal = (event: KeyboardEvent) => {
  if (!isSearchModalOpen.value || !searchModalRef.value) return

  const focusableElements = searchModalRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  if (event.key === 'Tab') {
    if (event.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
}

// Focus trap logic for the navigation menu
const trapFocusMenu = (event: KeyboardEvent) => {
  if (!isMenuOpen.value || !navMenuRef.value || !menuToggleRef.value) return

  const focusableElements = [
    menuToggleRef.value,
    ...navMenuRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ] as HTMLElement[]

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.key === 'Tab') {
    if (event.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
}

watch(isSearchModalOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', trapFocusModal)
  } else {
    document.removeEventListener('keydown', trapFocusModal)
  }
})

watch(isMenuOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', trapFocusMenu)
  } else {
    document.removeEventListener('keydown', trapFocusMenu)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', trapFocusModal)
  document.removeEventListener('keydown', trapFocusMenu)
})
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink
        to="/"
        class="logo"
        aria-label="Navigate to homepage"
        @click="closeMenu"
      >
        <Logo />
      </NuxtLink>
      <button 
        ref="menuToggleRef"
        class="menu-toggle" 
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <component :is="isMenuOpen ? MenuX : MenuHamburger" />
      </button>
    </div>
    <nav
      ref="navMenuRef"
      :class="{ 'menu-open': isMenuOpen }"
      class="slide-in-menu"
    >
      <div class="slide-in-menu__inner">
        <ul>
          <li
            v-for="item in navigation?.data.links"
            :key="$prismic.asText(item.label) || ''"
            class="menu-item h4"
          >
            <PrismicLink
              :field="item.link"
              @click="closeMenu"
            >
              {{ $prismic.asText(item.label) }}
            </PrismicLink>
          </li>
          <li class="menu-item h4">
            <a
              href="#"
              aria-label="Open search dialog"
              tabindex="0"
              @click.prevent="toggleSearchModal"
            >
              Search
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div
      v-if="isSearchModalOpen"
      ref="searchModalRef"
      class="search-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      @click.self="toggleSearchModal"
    >
      <div class="search-modal__content">
        <span
          id="search-dialog-title"
          class="sr-only"
        >
          Search Dialog
        </span>
        <button
          class="close-button"
          aria-label="Close search dialog"
          @click="toggleSearchModal"
        >
          <MenuX />
        </button>
        <Search
          @close-search-modal="toggleSearchModal"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/components/_header.scss';
  @import '@/assets/scss/components/_search.scss';
</style>
