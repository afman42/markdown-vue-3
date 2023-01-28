<script setup lang="ts">
import HeadingMenu from "./HeadingMenu.vue";
import BoldMenu from "./BoldMenu.vue";
import ItalicMenu from "./ItalicMenu.vue";
import CodeSpanMenu from "./CodeSpanMenu.vue";
import UnderlineMenu from "./UnderlineMenu.vue";
const props = defineProps({
  selectionSliceTextarea: Function,
});
</script>
<template>
  <div class="flex flex-row space-x-2">
    <HeadingMenu :selectionSliceTextarea="selectionSliceTextarea" />
    <BoldMenu :selectionSliceTextarea="selectionSliceTextarea" />
    <ItalicMenu :selectionSliceTextarea="selectionSliceTextarea" />
    <CodeSpanMenu :selectionSliceTextarea="selectionSliceTextarea" />
    <UnderlineMenu :selectionSliceTextarea="selectionSliceTextarea" />
  </div>
</template>
