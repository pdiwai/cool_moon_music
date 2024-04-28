<template>
  <div style="position: absolute; top: 0; left: 0">
    <n-message-provider><MenuBar></MenuBar></n-message-provider>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { NMessageProvider } from "naive-ui";
import MenuBar from "./components/MenuBar.vue";
</script>

<style></style>
