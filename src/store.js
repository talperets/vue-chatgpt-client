import { defineStore } from "pinia";
import OpenAI from "openai";

const messagesArr = () => {
  const existingMessages = localStorage.getItem("messages_vision");
  if (!existingMessages) {
    return [[]];
  } else {
    return JSON.parse(existingMessages);
  }
};

export const useChatStore = defineStore("chat", {
  state: () => ({
    client: new OpenAI({
      apiKey: process.env["VUE_APP_OPEN_AI_API_KEY"],
      dangerouslyAllowBrowser: true,
    }),
    prePrompt: "",
    allConversations: [...messagesArr()],
    currentConversationIndex: 0,
    loading: false,
  }),
  actions: {
    async chatCompletion(text, imageUrl) {
      const userMessage = {
        role: "user",
        content: [{ type: "text", text: text }],
      };

      if (imageUrl) {
        userMessage.content.push({
          type: "image_url",
          image_url: {
            url: imageUrl,
          },
        });
      }

      this.allConversations[this.currentConversationIndex].push(userMessage);
      this.loading = true;

      const res = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: this.prePrompt },
          ...this.allConversations[this.currentConversationIndex].map(
            (msg) => ({
              role: msg.role,
              content: msg.content,
            })
          ),
        ],
        model: "gpt-4o-mini",
      });

      this.allConversations[this.currentConversationIndex].push(
        res.choices[0].message
      );

      localStorage.setItem(
        "messages_vision",
        JSON.stringify(this.allConversations)
      );
      this.loading = false;
    },
  },
});
