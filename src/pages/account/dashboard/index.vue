<script lang="ts" setup>
const {t} = useI18n()

useSeoMeta({
  title: t('page.dashboard.title'),
  description: t('page.dashboard.description'),
  ogImage: 'https://example.com/image.png',
  ogTitle: t('page.dashboard.title'),
  ogType: 'website',
})

useHead({
  htmlAttrs: {
    lang: 'vn'
  }
})

const stats = [
  {name: t('general.dashboard.total_orders'), value: '3658', icon: 'lucide:shopping-cart'},
  {name: t('general.dashboard.total_pending_orders'), value: '215', icon: 'lucide:clock'},
  {name: t('general.dashboard.total_cart_items'), value: '31576', icon: 'lucide:heart'},
]
</script>

<template>
  <div class="mx-auto px-4 py-12 lg:w-9/12 w-full flex flex-col md:flex-row">
    <!-- Sidebar -->
    <LayoutsClientProfileNavbar/>

    <!-- Main Content -->
    <main class="w-full md:w-3/4 top-2 mb-8 px-1 sm:px-6 lg:px-8">
      <div class="md:p-1">
        <!-- Stats Grid -->
        <div class="rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
              v-for="stat in stats"
              :key="stat.name"
              class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:bg-rose-500 logo"
          >
            <div class="flex items-center mb-4">
              <div
                  class="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center"
              >
                <Icon :name="stat.icon" class="w-6 h-6 text-rose-500 "/>
              </div>
            </div>
            <h3 class="text-gray-500 text-sm mb-2">{{ stat.name }}</h3>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo:hover {
  transition: ease-in 0.3s;
  h3, p {
    color: white;
  }
}
</style>
