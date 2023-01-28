<script setup lang="ts">
const props = defineProps({
  selectionSliceTextarea: Function,
});
</script>
<template>
  <button
    type="button"
    @click="selectionSliceTextarea('I')"
    class="bg-gray-300 text-gray-700 italic font-semibold px-2 rounded"
  >
    i
  </button>
</template>
