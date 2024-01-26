<template>
  <div style="position: absolute; top: 0; left: 0">
    <MenuBar></MenuBar>
  </div>
  <div
    style="
      min-height: 100vh;
      width: 100vw;
      position: absolute;
      top: 42px;
      left: 0;
    "
  >
    <SecMenuBar></SecMenuBar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import MenuBar from "./components/menuBar.vue";
import SecMenuBar from "./components/SecMenuBar.vue";
</script>

<style></style>
