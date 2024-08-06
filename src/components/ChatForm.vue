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
    <label for="logo_upload" :class="imageUrl.length ? uploaded : notUploaded">
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
const notUploaded =
  "bg-slate-700 p-2 w-11 h-11 rounded-xl fill-slate-400 cursor-pointer hover:shadow-md active:shadow-none disabled:bg-slate-600 disabled:shadow-none";
const uploaded =
  "bg-green-400 p-2 w-11 h-11 rounded-xl fill-slate-100 cursor-pointer hover:shadow-md active:shadow-none disabled:bg-slate-600 disabled:shadow-none";

function chatSubmit() {
  chat.chatCompletion(text.value, imageUrl.value);
  text.value = "";
  imageUrl.value = "";
}

function uploadImage(event) {
  const file = event.target.files[0];
  const img = new Image();

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    img.src = e.target.result;

    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;

      // Desired maximum dimensions
      const maxWidth = 800; // Set your maximum width
      const maxHeight = 600; // Set your maximum height

      let width = originalWidth;
      let height = originalHeight;

      // Calculate new dimensions maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      // Create canvas and set dimensions
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Draw the resized image on the canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to a Blob for uploading
      canvas.toBlob(
        (blob) => {
          const formData = new FormData();
          formData.append("image", blob, file.name);

          // Upload the resized image
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
        },
        "image/jpeg",
        0.8
      ); // Set desired format and quality
    };
  };
}
function appendNewLine(event) {
  event.preventDefault();
  text.value += "\n";
}
</script>
