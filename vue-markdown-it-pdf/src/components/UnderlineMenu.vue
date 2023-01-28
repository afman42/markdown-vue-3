<script setup lang="ts">
const props = defineProps({
  selectionSliceTextarea: Function,
});
</script>
<template>
  <button
    type="button"
    @click="selectionSliceTextarea('U')"
    class="bg-gray-300 text-gray-700 underline font-semibold px-2 rounded"
  >
    U
  </button>
</template>
