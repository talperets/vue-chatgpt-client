<template>
  <form
    @submit.prevent="chatSubmit"
    class="flex gap-2 justify-center mt-5 items-center opacity-85"
  >
    <textarea
      rows="1"
      v-model="text"
      placeholder="Prompt"
      class="bg-gray-700 outline-none resize-none rounded-2xl p-3 no-scrollbar w-full"
      @keydown.enter.exact.prevent="chatSubmit"
      @keydown.enter.shift.exact.prevent="appendNewLine"
    />
    <label
      for="logo_upload"
      class="bg-slate-700 p-2 w-11 h-11 rounded-xl fill-slate-400 cursor-pointer hover:shadow-md active:shadow-none disabled:bg-slate-600 disabled:shadow-none"
    >
      <UploadIcon />
      <input
        type="file"
        id="logo_upload"
        accept="image/*"
        @change="uploadImage"
        class="hidden"
      />
    </label>

    <button
      :disabled="!text.length"
      type="submit"
      class="fill-slate-300 bg-slate-700 w-11 h-11 p-2 rounded-xl shadow-xl hover:shadow-md active:shadow-none disabled:bg-slate-600 disabled:shadow-none"
      ><SendIcon
    /></button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { useChatStore } from "../store";
import SendIcon from "../assets/icons/SendIcon.vue";
import UploadIcon from "../assets/icons/UploadIcon.vue";
import axios from "axios";
const chat = useChatStore();
const text = ref("");
const imageUrl = ref("");

function chatSubmit() {
  chat.chatCompletion(text.value, imageUrl.value);
  text.value = "";
}

function uploadImage(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  axios
    .post(
      `https://api.imgbb.com/1/upload?key=${process.env["VUE_APP_IMGBB_API_KEY"]}`,
      formData
    )
    .then((response) => {
      imageUrl.value = response.data.data.url;
      console.log(imageUrl.value);
    })
    .catch((error) => {
      console.error(error);
    });
}
function appendNewLine(event) {
  event.preventDefault();
  text.value += "\n";
}
</script>
