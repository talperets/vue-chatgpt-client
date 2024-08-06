<template>
  <textarea
    v-model="chat.prePrompt"
    rows="1"
    placeholder="Pre Prompt (instruction for the entire conversation)"
    class="bg-gray-700 outline-none resize-none rounded-2xl opacity-80 p-3 no-scrollbar w-full"
  />
</template>

<script setup>
import { useChatStore } from "@/store";
const chat = useChatStore();
</script>
