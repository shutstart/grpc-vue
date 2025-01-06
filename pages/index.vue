<template>
  <div>
    <h1>Message: {{ data?.message || "Loading..." }}</h1>
    <h2>Echo: {{ data?.echo }}</h2>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch("/api/echo");

// Log data, pending, and error for debugging
console.log("Data:", data.value);
console.log("Pending:", pending.value);
console.log("Error:", error.value);
</script>
