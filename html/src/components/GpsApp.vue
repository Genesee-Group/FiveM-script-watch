<template>
  <div class="absolute top-0 left-0 w-full h-full flex flex-col p-[10px_10px_20px_10px] z-[2] animate-fade-in">
    <div class="flex justify-between items-center mb-[5px] px-[5px]">
      <div class="text-[11px] font-bold text-white/50 uppercase tracking-[0.5px]">GPS</div>
      <div class="text-[11px] font-bold text-white/50">{{ watchState.time.hour }}:{{ watchState.time.minute }}</div>
    </div>

    <div class="flex-1 relative flex flex-col items-center justify-center gap-[10px] pb-[10px]">

      <div id="map" class="absolute w-[100px] h-[80px] bg-[url('/img/app/GPS/map.jpg')] bg-center bg-cover rounded-[12px] opacity-20 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"></div>
      <div id="iconmap" class="absolute text-white text-[20px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-[2]"><i class="fas fa-map-marker-alt"></i></div>

      <div class="mt-auto z-[3] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[10px] border border-white/10 text-white p-[6px_15px] rounded-[15px] text-[11px] font-bold cursor-pointer text-center transition-colors duration-200 hover:bg-white/20" @click="gpsshow">
        <span>ACESSAR</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { watchState, sendNui } from '@/composables/useNui'

const gpsshow = () => {
    sendNui('GPS', { action: 'acessar' })
}
</script>
