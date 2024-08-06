<template>
  <Transition name="fade-enter">
    <template v-if="role == 'user'">
      <div
        class="bg-slate-700 rounded-xl shadow-lg my-1 py-5 px-2 self-end flex items-center gap-3 max-w-[50vw] opacity-85"
      >
        <div>
          <p class="ml-3 max-w-[50vw] mb-2">{{ content[0].text }}</p>
          <img
            v-if="content[1]"
            :src="content[1].image_url.url"
            alt=""
            width="500"
          />
        </div>

        <div
          class="h-10 w-10 fill-white bg-slate-600 p-2 rounded-full flex items-center"
        >
          <BabyIcon />
        </div>
      </div>
    </template>
    <template v-else-if="role == 'assistant'">
      <div
        class="bg-slate-600 rounded-xl shadow-xl my-1 py-5 px-2 self-start flex items-start gap-3 opacity-85"
      >
        <div class="h-10 w-10 fill-white bg-slate-700 p-2 rounded-full ml-1">
          <RobotIcon />
        </div>
        <div class="max-w-[50vw] rounded-md mr-2">
          <VueMarkdown :source="content" :plugins="plugins" />
        </div>
      </div>
    </template>
  </Transition>
</template>
<script setup>
import { onMounted } from "vue";
import RobotIcon from "../assets/icons/RobotIcon.vue";
import BabyIcon from "../assets/icons/BabyIcon.vue";
import VueMarkdown from "vue-markdown-render";
import MarkdownItAnchor from "markdown-it-anchor";
import hljs from "highlight.js";
import "../assets/atom-one-dark.css";
import ClipboardJS from "clipboard";

const plugins = [MarkdownItAnchor];
const { role, content } = defineProps({ role: String, content: String });

onMounted(() => {
  document.querySelectorAll("pre code").forEach((block) => {
    // Highlight the code block
    hljs.highlightElement(block);

    // Check if the button already exists
    if (!block.parentNode.querySelector("button.copy-button")) {
      const button = document.createElement("button");
      const clipboard = new ClipboardJS(button, {
        target: () => block,
      });

      clipboard.on("success", () => {
        button.innerText = "Copied!";
        setTimeout(() => {
          button.innerText = "Copy";
        }, 2000);
      });

      clipboard.on("error", () => {
        button.innerText = "Failed";
      });

      button.className =
        "copy-button bg-[#282c34] text-slate-100 mt-2 p-2 rounded shadow-2xl hover:shadow-md active:shadow-none transition-shadow";
      button.innerText = "Copy";
      block.parentNode.appendChild(button);
    }
  });
});
</script>
