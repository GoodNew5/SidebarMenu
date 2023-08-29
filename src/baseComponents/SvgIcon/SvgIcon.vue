<script lang="ts" setup>
import { computed } from 'vue'

export interface Props {
  name: string
}

const props = defineProps<Props>()
const symbolId = computed(() => `icon-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="`#${symbolId}`" />
  </svg>
</template>
<style scoped src="./SvgIcon.scss" />
