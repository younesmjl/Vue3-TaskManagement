<template>
  <div v-for="task in tasks" :key="task.id">
    <div class="border-all-secondary with-margin-all-20">
      <h3>Titre : {{ task.name }}</h3>
      <p>Description : {{ task.description }}</p>
      <p>Echéance: {{ task.temporality }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  name: "Tasks",
  setup() {
    const tasks = ref("");
    tasks.value = tasksService.read();
    return { tasks };
  },
};
</script>