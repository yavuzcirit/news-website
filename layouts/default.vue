<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <NuxtLink to="/" external class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors flex items-center gap-2">
          <span class="text-3xl">📰</span>
          <span>News Website</span>
        </NuxtLink>
      </div>
    </nav>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 dark:text-gray-400">
        <p class="font-medium">&copy; {{ currentYear }} News Website. All rights reserved.</p>
        <p class="text-sm mt-2">Powered by NewsData.io</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

