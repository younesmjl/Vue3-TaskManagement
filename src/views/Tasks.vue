<template>
  <input
    class="border-all-primary border-width-1"
    type="text"
    placeholder="Filtrer"
    v-model="letters"
    @keyup="filter"
  />
  <div v-for="task in tasks" :key="task.id">
    <div class="border-all-secondary with-margin-all-20">
      <h3>Titre : {{ task.name }}</h3>
      <p>Description : {{ task.description }}</p>
      <p>Echéance: {{ tasksService.convertCase(task.temporality) }}</p>
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
    const letters = ref("");
    tasks.value = tasksService.read();

    function filter() {
      console.log(letters.value);
    }

    return { tasks, tasksService, letters, filter };
  },
};
</script>