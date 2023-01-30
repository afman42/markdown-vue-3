<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { RightMenu } from "./components";
import { marked } from "./marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
let source = ref<string>("# your markdown content");
let activeReset = ref<boolean>(false);
let textareaReset = ref<boolean>(false);
let toggleButton = ref<boolean>(false);
let refTextarea = ref(null);
let refMarked = ref(null);
function selectionSliceTextarea(
  tagHtml: string,
  level?: 1 | 2 | 3 | 4 | 5 | 6
): void {
  if (refTextarea.value.selectionStart == refTextarea.value.selectionEnd) {
    return; // nothing is selected
  }
  let selected = refTextarea.value.value.slice(
    refTextarea.value.selectionStart,
    refTextarea.value.selectionEnd
  );
  let selectedHtml = THtml(tagHtml, level, selected);
  refTextarea.value.setRangeText(selectedHtml);
}
function THtml(
  tagHtml: string,
  level?: 1 | 2 | 3 | 4 | 5 | 6,
  selected: string
): string {
  if (tagHtml === "H") {
    if (level === 1) {
      return `# ${selected} `;
    } else if (level === 2) {
      return `## ${selected}`;
    } else if (level === 3) {
      return `### ${selected}`;
    } else if (level === 4) {
      return `#### ${selected}`;
    } else if (level === 5) {
      return `##### ${selected}`;
    } else if (level === 6) {
      return `###### ${selected}`;
    }
  } else if (tagHtml === "B") {
    return `__${selected}__`;
  } else if (tagHtml === "I") {
    return `*${selected}*`;
  } else if (tagHtml === "CodeSpan") {
    return "`" + selected + "`";
  } else if (tagHtml === "U") {
    return "\n <ins>" + selected + "</ins>";
  }
}
function submitHandler(e: Event) {
  textareaReset.value = true;
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
      textareaReset.value = false;
    });
}
function clickActiveReset() {
  activeReset.value = false;
  textareaReset.value = false;
}
watch(source, (newVal) => {
  if (refMarked.value.outerHTML.includes("<pre>")) {
    refMarked.value.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }
  console.log(refMarked.value);
});
</script>

<template>
  <div class="h-screen p-4 flex flex-row space-x-2">
    <div :class="[toggleButton ? 'w-full' : ' w-1/2']">
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
          <button
            v-else
            type="submit"
            class="flex flex-row bg-red-400 text-white w-24 h-8 justify-center items-center"
          >
            <div
              class="w-6 h-6 rounded-full animate-spin border-4 border-solid border-white border-t-transparent shadow-md"
              v-if="textareaReset"
            ></div>
            <div v-else>SAVE</div>
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
          <button
            type="button"
            @click="toggleButton = !toggleButton"
            class="bg-yellow-400 text-white w-24 h-8"
          >
            Toggle
          </button>
        </div>
        <textarea
          class="w-full p-2 h-full"
          v-model="source"
          :placeholder="source"
          :disabled="textareaReset"
          ref="refTextarea"
        ></textarea>
      </form>
    </div>
    <transition name="fade">
      <div class="w-1/2 h-full" v-if="!toggleButton">
        <RightMenu :selectionSliceTextarea="selectionSliceTextarea" />
        <div
          class="marked mt-2 px-2 py-1 font-serif bg-white h-full rounded-lg"
          v-html="DOMPurify.sanitize(marked.parse(source))"
          ref="refMarked"
        ></div>
        <!-- <div>{{ marked.parse(source) }}</div> -->
      </div>
    </transition>
  </div>
</template>
