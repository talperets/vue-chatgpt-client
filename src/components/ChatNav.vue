<template>
  <nav
    class="bg-slate-700 w-[250px] h-[100vh] hidden md:absolute left-0 opacity-65 md:flex flex-col"
  >
    <button v-on:click="newChat" class="bg-slate-900 h-10">New Chat</button>
    <template v-for="(conversation, idx) in chat.allConversations">
      <button
        v-on:click="() => setConvo(idx)"
        :class="chat.currentConversationIndex == idx && 'bg-black'"
        >{{
          conversation.length
            ? conversation[0].content[0].text.substring(0, 30)
            : ""
        }}</button
      >
    </template>
  </nav>
</template>
<script setup>
import { useChatStore } from "@/store";
const chat = useChatStore();
function setConvo(idx) {
  chat.currentConversationIndex = idx;
}

function newChat() {
  chat.allConversations.push([]);
  chat.currentConversationIndex = chat.allConversations.length - 1;
  localStorage.setItem("messages", JSON.stringify(this.allConversations));
}
</script>
