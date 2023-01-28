<script setup lang="ts">
const props = defineProps({
  selectionSliceTextarea: Function,
});
</script>
<template>
  <div class="dropdown inline-block relative">
    <button
      class="bg-gray-300 text-gray-700 font-semibold py-2 px-2 rounded inline-flex items-center"
    >
      <span class="mr-1 text-xs font-bold">H</span>
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </button>
    <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
      <li v-for="index in 6" :key="index">
        <button
          type="button"
          @click="selectionSliceTextarea('H', index)"
          class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 inline-block whitespace-no-wrap"
        >
          H{{ index }}
        </button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
