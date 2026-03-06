<template>
  <div class="absolute top-0 left-0 w-full h-full flex flex-col p-[10px_10px_20px_10px] z-[2] animate-fade-in">
    <div class="flex justify-between items-center mb-[5px] px-[5px]">
      <div class="text-[11px] font-bold text-white/50 uppercase tracking-[0.5px]">Configurações</div>
      <div class="text-[11px] font-bold text-white/50">{{ watchState.time.hour }}:{{ watchState.time.minute }}</div>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-[10px]">
      <ul class="flex flex-col gap-1 px-0.5 list-none">

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95" @click="notify">
            <i class="fas fa-bell w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">Notificação</span>
        </li>

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95" @click="$emit('change-bg')">
            <i class="fas fa-palette w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">Capa</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script setup>
import { watchState } from '@/composables/useNui'

defineEmits(['change-bg'])

const notify = () => {
    // Notify placeholder
}
</script>
