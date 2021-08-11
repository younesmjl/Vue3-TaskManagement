<template>
  <div class="home">
    <HelloWorld msg="Gestionnaire de tâches" />
    <Form v-on:createtaskParent="addTask" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";
import tasksService from "@/services/tasks.js";

export default {
  name: "Home",
  components: {
    HelloWorld,
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
