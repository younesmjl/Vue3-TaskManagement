<template>
  <div class="home">
    <GeneralTitle msg="Gestionnaire de tâches" />
    <Form v-on:createtaskParent="addTask" />
  </div>
</template>

<script>
// @ is an alias to /src
import GeneralTitle from "@/components/GeneralTitle.vue";
import Form from "@/components/Form.vue";

import tasksService from "@/services/tasks.js";

export default {
  name: "Home",
  components: {
    GeneralTitle,
    Form,
  },
  setup() {
    function addTask(data) {
      console.log("Home.vue | addTask() | data", data);
      tasksService.create(data);
    }
    return { addTask };
  },
};
</script>
