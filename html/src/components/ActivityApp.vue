<template>
  <div class="absolute top-0 left-0 w-full h-full flex flex-col p-[10px_10px_20px_10px] z-[2] animate-fade-in">

    <div class="flex justify-between items-center mb-[5px] px-[5px]">
      <div class="text-[11px] font-bold text-white/50 uppercase tracking-[0.5px]">Atividades</div>
      <div class="text-[11px] font-bold text-white/50">{{ watchState.time.hour }}:{{ watchState.time.minute }}</div>
    </div>

    <div class="flex-1 relative flex flex-col justify-center items-center pb-[10px]">
      <div id="life" class="absolute rounded-full flex justify-center items-center w-[90px] h-[90px]" ref="lifeRing"></div>
      <div id="hunger" class="absolute rounded-full flex justify-center items-center w-[70px] h-[70px]" ref="hungerRing"></div>
      <div id="thirst" class="absolute rounded-full flex justify-center items-center w-[50px] h-[50px]" ref="thirstRing"></div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { watchState } from '@/composables/useNui'
import ProgressBar from 'progressbar.js'

const lifeRing = ref(null)
const hungerRing = ref(null)
const thirstRing = ref(null)

let lifeBar, hungerBar, thirstBar

onMounted(() => {
  lifeBar = new ProgressBar.Circle(lifeRing.value, {
    strokeWidth: 8, easing: 'easeInOut', duration: 1000,
    color: '#FD08AB', trailColor: '#340914', trailWidth: 2
  })
  hungerBar = new ProgressBar.Circle(hungerRing.value, {
    strokeWidth: 8, easing: 'easeInOut', duration: 1000,
    color: '#9BFF04', trailColor: '#2C4204', trailWidth: 2
  })
  thirstBar = new ProgressBar.Circle(thirstRing.value, {
    strokeWidth: 8, easing: 'easeInOut', duration: 1000,
    color: '#1AD5DE', trailColor: '#133D3C', trailWidth: 2
  })

  lifeBar.animate(watchState.status.life / 100)
  hungerBar.animate(watchState.status.hunger / 100)
  thirstBar.animate(watchState.status.thirst / 100)
})

watch(() => watchState.status.life, (val) => lifeBar?.animate(val / 100))
watch(() => watchState.status.hunger, (val) => hungerBar?.animate(val / 100))
watch(() => watchState.status.thirst, (val) => thirstBar?.animate(val / 100))
</script>
