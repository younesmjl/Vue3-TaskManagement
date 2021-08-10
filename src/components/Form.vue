<template>
  <h3>Créer une tâche</h3>
  <!-- plutot que v-on:submit on pourrait simplifier par @submit -->
  <form v-on:submit.prevent="createTask">
    <input
      class="with-border-all border-width-1"
      type="text"
      placeholder="Nom de la tâche"
      v-model="name"
    />
    <br />
    <textarea
      class="with-border-all border-width-1"
      cols="30"
      rows="10"
      v-model="description"
      placeholder="Description de la tâche"
    >
    </textarea>
    <br />
    <select class="border-all-primary" v-model="temporality">
      <option
        v-for="tempo in temporalityTypes"
        v-bind:value="tempo.value"
        v-bind:key="tempo.id"
      >
        {{ tempo.name }}
      </option>
    </select>
    <br />
    <button class="button background-primary">créer</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Form",
  emits: ["createtaskParent"],
  setup(props, context) {
    const name = ref("");
    const description = ref("");
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "Moyen terme",
        value: "medium-term",
      },
      {
        id: 3,
        name: "long terme",
        value: "long-term",
      },
    ]);
    const temporality = ref("short-term");

    function createTask() {
      const task = {
        id: Date.now(),
        name: name.value,
        description: description.value,
        temporality: temporality.value,
      };
      console.log("Form.vue | createTask() | task", task);

      //emit permet de créer un evenement que le parent peut ecouté et donc utilisé
      context.emit("createtaskParent", task);
      resetForm();
    }

    function resetForm() {
      name.value = "";
      description.value = "";
      temporality.value = "";
    }

    return {
      name,
      description,
      temporalityTypes,
      temporality,
      createTask,
    };
  },
};
</script>

<style scoped>
input,
textarea,
select,
button {
  width: 90%;
  margin: 5px 10px;
}
</style>