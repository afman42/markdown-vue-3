<script setup lang="ts">
const props = defineProps({
  selectionSliceTextarea: Function,
});
</script>
<template>
  <button
    type="button"
    @click="selectionSliceTextarea('CodeSpan')"
    class="bg-gray-300 text-gray-700 font-semibold px-2 rounded"
  >
    `code`
  </button>
</template>
