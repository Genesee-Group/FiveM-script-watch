<template>
  <div v-show="watchState.isVisible" id="watch"
       class="absolute bottom-[20px] right-[10px] w-[195px] h-[303px] z-[999] rounded-[35px] transition-all duration-300"
       :style="{ background: selectedBg }">

    <!-- Outer Glass Cover -->
    <div id="glass" class="absolute top-0 left-0 w-full h-full z-[1000] pointer-events-none bg-[url('/img/case/glass.png')] bg-center bg-cover bg-no-repeat"></div>

    <!-- Inner Watch Screen -->
    <div class="absolute w-[143px] h-[163px] left-[20px] top-[70px] rounded-[24px] overflow-hidden bg-black text-white selection:bg-transparent">

      <!-- Animated Background plate -->
      <div id="backanimated" class="absolute top-0 left-0 w-full h-full opacity-40 z-0 bg-[url('/img/background/black_plate.gif')] bg-center bg-cover bg-no-repeat"></div>

      <!-- Home Screen Clock -->
      <div v-show="!activeApp"
           class="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 cursor-pointer transition-transform duration-200 hover:scale-105"
           @click="openApp('activity')">
        <div class="text-time leading-[0.95] tracking-[-0.05em] font-light text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          {{ watchState.time.hour }}<br>{{ watchState.time.minute }}
        </div>
      </div>

      <!-- Application Content Area -->
      <div v-show="activeApp" id="content" class="absolute top-0 left-0 w-full h-full z-10 flex flex-col">
        <component
          v-if="currentAppComponent"
          :is="currentAppComponent.component"
          :is-list="activeApp === 'listmusic'"
          @change-app="openApp"
          @change-bg="changeBg"
        />

        <!-- Navigation Dots -->
        <div class="absolute bottom-[8px] left-0 w-full flex justify-center gap-1.5 z-20">
          <div v-for="app in rootApps" :key="app.id"
               class="w-[5px] h-[5px] rounded-full cursor-pointer transition-all duration-300 bg-[#c4c4c466]"
               :class="{ 'bg-white scale-[1.3]': activeApp === app.id || (activeApp === 'listmusic' && app.id === 'music') }"
               @click="openApp(app.id)">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { watchState, useNuiListener } from '@/composables/useNui'

import ActivityApp from './components/ActivityApp.vue'
import PassaportApp from './components/PassaportApp.vue'
import MusicApp from './components/MusicApp.vue'
import GpsApp from './components/GpsApp.vue'
import SettingsApp from './components/SettingsApp.vue'

useNuiListener()

const appsList = [
  { id: 'activity', component: ActivityApp, isRoot: true },
  { id: 'passaport', component: PassaportApp, isRoot: true },
  { id: 'music', component: MusicApp, isRoot: true },
  { id: 'listmusic', component: MusicApp, isRoot: false },
  { id: 'gps', component: GpsApp, isRoot: true },
  { id: 'settings', component: SettingsApp, isRoot: true }
]

const rootApps = appsList.filter(app => app.isRoot)

const activeApp = ref(null)

const currentAppComponent = computed(() => {
  return appsList.find(app => app.id === activeApp.value)
})

const openApp = (appId) => {
  activeApp.value = appId
}

const backgrounds = [
  'url(img/case/watch_red.png)',
  'url(img/case/watch_green.png)',
  'url(img/case/watch_blue.png)',
  'url(img/case/watch_white.png)',
  'url(img/case/watch_gold.png)',
  'url(img/case/watch.png)'
]

const colorIndex = ref(5)
const selectedBg = ref(backgrounds[5] + ' center/cover no-repeat')

const changeBg = () => {
    colorIndex.value++
    if (colorIndex.value >= backgrounds.length) {
        colorIndex.value = 0
    }
    selectedBg.value = backgrounds[colorIndex.value] + ' center/cover no-repeat'
}
</script>

<style>
@import './assets/style.css';
</style>
