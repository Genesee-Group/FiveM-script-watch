<template>
  <div class="absolute top-0 left-0 w-full h-full flex flex-col p-[10px_10px_20px_10px] z-[2] animate-fade-in">
    <div class="flex justify-between items-center mb-[5px] px-[5px]">
      <div class="text-[11px] font-bold text-white/50 uppercase tracking-[0.5px]">Meus Dados</div>
      <div class="text-[11px] font-bold text-white/50">{{ watchState.time.hour }}:{{ watchState.time.minute }}</div>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-[10px]">
      <ul class="flex flex-col gap-1 px-0.5 list-none">

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95">
            <i class="fas fa-user w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ watchState.player.name }} {{ watchState.player.firstname }}</span>
        </li>

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95">
            <i class="fas fa-id-card-alt w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">ID: {{ watchState.player.userId }}</span>
        </li>

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95">
            <i class="far fa-id-card w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ watchState.player.registration }}</span>
        </li>

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95">
            <i class="fas fa-briefcase w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ watchState.player.job }}</span>
        </li>

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95">
            <i class="fas fa-car w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ watchState.player.cnh }}</span>
        </li>

        <li class="flex items-center bg-glass backdrop-blur-[5px] border border-glassBorder p-[6px_8px] rounded-lg text-[11px] text-white transition-transform duration-100 cursor-pointer active:scale-95">
            <i class="fas fa-mobile-alt w-[14px] text-center mr-[6px] text-white/50"></i>
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ watchState.player.phone }}</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script setup>
import { watchState } from '@/composables/useNui'
</script>
