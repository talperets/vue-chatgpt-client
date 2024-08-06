<template>
  <div
    class="bg-slate-700 rounded-xl shadow-lg my-1 py-5 px-2 self-start flex items-center gap-3 w-96"
    v-if="chat.loading"
  >
    <div
      class="h-[38px] w-10 fill-slate-300 bg-slate-600 p-2 rounded-full flex items-center animate-spin"
    >
      <LoadingIcon />
    </div>
    <div class="flex flex-col w-full gap-2">
      <p
        class="ml-1 w-[80%] bg-slate-400 text-slate-400 animate-pulse text-sm rounded-xl"
        >loading</p
      >
      <p
        class="ml-1 w-[90%] bg-slate-400 text-slate-400 animate-pulse text-sm rounded-xl"
        style="animation-delay: 100ms"
        >loading</p
      >
    </div>
  </div>
</template>
<script setup>
import { useChatStore } from "@/store";
import LoadingIcon from "../assets/icons/LoadingIcon.vue";
const chat = useChatStore();
</script>
