import { defineStore } from "pinia";
import OpenAI from "openai";
const messagesArr = () => {
  const existingMessages = localStorage.getItem("messages");
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
      this.allConversations[this.currentConversationIndex].push({
        role: "user",
        content: imageUrl
          ? [
              { type: "text", text: text },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ]
          : text,
      });
      this.loading = true;
      const hasImage = this.allConversations[
        this.currentConversationIndex
      ].some(
        (message) =>
          Array.isArray(message.content) &&
          message.content.some((item) => item.type === "image_url")
      );
      const res = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: this.prePrompt },
          ...this.allConversations[this.currentConversationIndex],
        ],
        model: hasImage ? "gpt-4o-mini" : "gpt-3.5-turbo",
      });
      this.allConversations[this.currentConversationIndex].push(
        res.choices[0].message
      );
      localStorage.setItem("messages", JSON.stringify(this.allConversations));
      this.loading = false;
    },
  },
});
