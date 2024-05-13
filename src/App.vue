<template>
  <div style="width: 98vw;">
    <n-message-provider><MenuBar></MenuBar></n-message-provider>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { NMessageProvider } from "naive-ui";
import MenuBar from "./components/MenuBar.vue";
</script>

<style></style>
