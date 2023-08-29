<script lang="ts" setup>
import SvgIcon from '@/baseComponents/SvgIcon/SvgIcon.vue'
</script>

<template>
  <div class="social-links">
    <a target="_blank" href="https://codepen.io/GoodNew5" class="social-link">
      <SvgIcon class="social-icon" name="codepen" />
    </a>
    <a target="_blank" href="https://github.com/GoodNew5" class="social-link">
      <SvgIcon class="social-icon social-icon-github" name="github" />
    </a>
    <a
      target="_blank"
      href="https://linkedin.com/in/aleksandr-veselov-11240a158"
      class="social-link"
    >
      <SvgIcon class="social-icon" name="linkedin" />
    </a>
    <a href="mailto:online1hourago@gmail.com" class="social-link">
      <SvgIcon class="social-icon" name="email" />
    </a>
  </div>
</template>
<style scoped src="./SocialLinks.scss" />
