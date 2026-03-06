<template>
  <div class="absolute top-0 left-0 w-full h-full flex flex-col p-[10px_10px_20px_10px] z-[2] animate-fade-in">

    <!-- List / Search View -->
    <template v-if="isList">
      <div class="flex justify-between items-center mb-[5px] px-[5px]">
          <div class="text-[11px] font-bold text-white/50 uppercase tracking-[0.5px]">Spotify</div>
          <div class="text-[11px] font-bold text-white/50">{{ watchState.time.hour }}:{{ watchState.time.minute }}</div>
          <div class="bg-white/10 p-[2px_6px] rounded-[4px] cursor-pointer text-white text-[10px] hover:bg-white/30" @click="$emit('change-app', 'music')"><i class="fas fa-chevron-left"></i></div>
      </div>

      <div class="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-[10px]">
          <div class="w-full h-full overflow-y-auto overflow-x-hidden">
              <div class="relative w-full">

                <div v-for="item in searchResults" :key="item.id.videoId" class="relative w-full aspect-video mb-[8px] rounded-[8px] overflow-hidden cursor-pointer group" @click="playVideo(item.id.videoId)">
                    <img class="w-full h-full object-cover opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105" :src="item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url">
                    <div class="absolute bottom-0 left-0 w-full bg-black/70 text-brand text-[10px] p-[4px] backdrop-blur-[2px]">
                        <div class="marquee-text">{{ item.snippet.title }}</div>
                    </div>
                </div>

                <div v-if="searchResults.length === 0" class="text-center text-white/50 text-[10px] mt-[20px]">
                  Nenhum resultado
                </div>

              </div>
          </div>
      </div>
    </template>

    <!-- Player View -->
    <template v-else>
      <div class="absolute top-[25px] left-[5px] right-[5px] flex items-center bg-black/60 rounded-[10px] p-[2px_5px] z-10 transition-all duration-300 pointer-events-none opacity-0 -translate-y-[10px]"
           :class="[searchActive ? 'opacity-100 pointer-events-auto translate-y-0' : '', searchError ? 'bg-red-600/60' : '']">
          <input class="bg-transparent border-none text-white text-[10px] w-full p-[4px] outline-none" type="text" placeholder="Buscar música..." v-model="searchQuery" @keyup.enter="searchYt">
          <i id="searchyt" @click="searchYt" class="text-white text-[12px] ml-[5px] cursor-pointer opacity-70 fas fa-arrow-circle-right"></i>
      </div>

      <i id="opensearch" v-show="!searchActive" @click="openSearch" class="absolute bottom-[40px] right-[15px] text-[14px] text-white bg-black/50 p-[6px] rounded-full cursor-pointer z-10 fas fa-search"></i>

      <div class="flex justify-between items-center mb-[5px] px-[5px]">
          <div class="text-[11px] font-bold text-white/50 uppercase tracking-[0.5px]">Música</div>
          <div class="text-[11px] font-bold text-white/50">{{ watchState.time.hour }}:{{ watchState.time.minute }}</div>
      </div>

      <div class="flex-1 flex flex-col justify-center items-center gap-[15px] pb-[10px]">
          <div class="flex gap-[25px] items-center justify-center">
              <div class="flex items-center justify-center bg-transparent border-none cursor-pointer opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-110" @click="pause" @dblclick="stopMusic">
                  <i class="fas fa-pause text-white text-[24px]"></i>
              </div>
              <div class="flex items-center justify-center bg-transparent border-none cursor-pointer opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-110" @click="play">
                  <i class="fas fa-play text-white text-[42px]"></i>
              </div>
          </div>
          <div class="flex items-center justify-between w-[90%] bg-white/10 p-[4px_10px] rounded-[10px] backdrop-blur-[5px]">
              <div class="text-white text-[16px] cursor-pointer opacity-70 font-bold hover:opacity-100 vol-btn less" @click="volDown"><b>-</b></div>
              <div id="timeplay" class="text-[10px] text-white">{{ formattedTime }}</div>
              <div class="text-white text-[16px] cursor-pointer opacity-70 font-bold hover:opacity-100 vol-btn plus" @click="volUp"><b>+</b></div>
          </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { watchState, sendNui } from '@/composables/useNui'

const props = defineProps({
  isList: Boolean
})

const emit = defineEmits(['change-app'])

const searchActive = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const searchError = ref(false)

let searchTimeout1 = null
let searchTimeout2 = null

const play = () => sendNui('action', { action: 'play' })
const pause = () => sendNui('action', { action: 'pause' })
const stopMusic = () => sendNui('action', { action: 'stop' })
const volDown = () => sendNui('action', { action: 'volume-' })
const volUp = () => sendNui('action', { action: 'volume+' })

const playVideo = (videoId) => {
    sendNui('action', {
        action: 'play',
        link: 'https://www.youtube.com/watch?v=' + videoId
    })
}

const searchYtClose = () => {
    searchActive.value = false
}

const searchYt = async () => {
    if (!searchQuery.value) {
        searchError.value = true
        setTimeout(() => searchError.value = false, 300)
        return
    }

    emit('change-app', 'listmusic')
    searchYtClose()
    clearTimeout(searchTimeout1)
    clearTimeout(searchTimeout2)

    try {
      const API_KEY = watchState.apiNumber
      const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchQuery.value}&maxResults=10&type=video`

      const response = await fetch(url)
      const data = await response.json()

      if (data.items) {
        searchResults.value = data.items
      }
    } catch (e) {
      console.error('Failed to search YT', e)
    }
}

const openSearch = () => {
    searchActive.value = true

    searchTimeout1 = setTimeout(() => {
        searchQuery.value = ''
    }, 25000)

    searchTimeout2 = setTimeout(() => {
        searchYtClose()
    }, 50000)
}

const formatSeconds = (d) => {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)

    const hDisplay = h > 0 ? h + ':' : ''
    const mDisplay = m > 0 ? m + ':' : '0:'
    const sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : '00'
    return hDisplay + mDisplay + sDisplay
}

const formattedTime = computed(() => {
    const total = watchState.music.totalTime
    let played = watchState.music.playedTime

    if (total > 0 && played > 0) {
        if (played > total) played = total
        return formatSeconds(played) + ' / ' + formatSeconds(total)
    }
    return '0:00 / 0:00'
})
</script>
