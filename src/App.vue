<template>
  <div style="position: absolute; top: 0; left: 0">
    <MenuBar></MenuBar>
    <SecMenuBar></SecMenuBar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import MenuBar from "./components/MenuBar.vue";
import SecMenuBar from "./components/SecMenuBar.vue";
</script>

<style></style>
