<script setup lang="ts">
import { ref } from "vue";
import { marked } from "./marked";
import DOMPurify from "dompurify";
let source = ref<string>("# your markdown content");
let activeReset = ref<boolean>(false);
let textareaReset = ref<boolean>(false);
function submitHandler(e: Event) {
  fetch("http://localhost:3000/save", {
    method: "POST",
    body: JSON.stringify({ text: source.value }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      activeReset.value = data.fileSave;
      console.log(data);
      textareaReset.value = true;
    });
}
function clickActiveReset() {
  activeReset.value = false;
  textareaReset.value = false;
}
</script>

<template>
  <div class="h-screen p-4 flex flex-row space-x-2">
    <div class="w-1/2">
      <form
        method="POST"
        @submit.prevent="submitHandler"
        class="flex flex-col h-full space-y-2"
      >
        <div class="flex flex-row space-x-2">
          <button
            v-if="activeReset"
            type="button"
            class="bg-orange-400 text-white w-24 h-8"
            @click="clickActiveReset"
          >
            RESET
          </button>
          <button v-else type="submit" class="bg-red-400 text-white w-24 h-8">
            SAVE
          </button>
          <a
            :disabled="!activeReset"
            class="bg-blue-400 text-white px-2 py-1"
            href="http://localhost:3000/hello.pdf"
            download
            target="_blank"
          >
            PDF
          </a>
        </div>
        <textarea
          class="w-full p-2 h-full"
          v-model="source"
          :placeholder="source"
          :disabled="textareaReset"
        ></textarea>
      </form>
    </div>
    <div class="w-1/2 px-4 py-1 bg-slate-100 h-full rounded-lg">
      <div
        class="marked font-serif"
        v-html="DOMPurify.sanitize(marked.parse(source))"
      ></div>
      <!-- <div>{{ marked.parse(source) }}</div> -->
    </div>
  </div>
</template>
