<template>
  <div class="flex flex-col">
    <template
      v-for="(message, idx) in chat.allConversations[
        chat.currentConversationIndex
      ]"
    >
      <ChatItem :content="message.content" :role="message.role" />
    </template>
    <ChatItemLoading />
  </div>
</template>
<script setup>
import { useChatStore } from "@/store";
import ChatItem from "./ChatItem.vue";
import ChatItemLoading from "./ChatItemLoading.vue";
const chat = useChatStore();
</script>
