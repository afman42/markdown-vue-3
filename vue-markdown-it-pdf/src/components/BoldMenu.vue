<script setup lang="ts">
const props = defineProps({
  selectionSliceTextarea: Function,
});
</script>
<template>
  <button
    type="button"
    @click="selectionSliceTextarea('B')"
    class="bg-gray-300 text-gray-700 font-semibold px-2 rounded"
  >
    B
  </button>
</template>
