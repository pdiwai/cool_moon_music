<template>
  <div style="position: absolute; top: 0; left: 0">
    <MenuBar></MenuBar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import MenuBar from "./components/MenuBar.vue";
</script>

<style></style>
