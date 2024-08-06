<script setup>
import ChatNav from "./components/ChatNav.vue";
import ChatList from "./components/ChatList.vue";
import ChatForm from "./components/ChatForm.vue";
import PrePromptInput from "./components/PrePromptInput.vue";
</script>

<template>
  <ChatNav />
  <main class="flex flex-col justify-between min-w-[55vw]">
    <div class="h-[85vh] overflow-y-scroll no-scrollbar mt-2">
      <PrePromptInput />
      <ChatList />
    </div>
    <ChatForm />
  </main>
</template>
