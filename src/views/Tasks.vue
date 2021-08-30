<template>
  <Modal
    v-if="isInEditMode"
    :task="taskToEdit"
    @updatetask="updateTask($event)"
    @cancel="cancelEdit"
  />
  <input
    class="border-all-primary border-width-1"
    type="text"
    placeholder="Filtrer"
    v-model="letters"
    @keyup="filter"
  />
  <div
    class="
      radio-filters
      margin-top
      display-flex
      align-items-center
      justify-content-center
    "
  >
    <label for="all">
      <input type="radio" id="all" value="" v-model="selectedTemporality" />
      toutes
    </label>
    <label for="short-term">
      <input
        type="radio"
        id="short-term"
        value="short-term"
        v-model="selectedTemporality"
      />
      court terme
    </label>
    <label for="medium-term">
      <input
        type="radio"
        id="medium-term"
        value="medium-term"
        v-model="selectedTemporality"
      />
      moyen terme
    </label>
    <label for="long-term">
      <input
        type="radio"
        id="long-term"
        value="long-term"
        v-model="selectedTemporality"
      />
      long terme
    </label>
  </div>
  <div v-for="task in tasksFiltered" :key="task.id">
    <div class="border-all-secondary margin-all-20">
      <h3>Titre : {{ task.name }}</h3>
      <p>Description : {{ task.description }}</p>
      <p>Echéance: {{ tasksService.convertCase(task.temporality) }}</p>
      <div class="margin-top">
        <button class="button background-cred" v-on:click="deleteTask(task.id)">
          Supprimer
        </button>
        <button
          class="button background-secondary margin-left"
          @click="() => toggle(task)"
        >
          modifier
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
import Modal from "@/components/Modal.vue";

export default {
  name: "Tasks",
  components: {
    Modal,
  },
  setup() {
    const tasks = ref("");
    const letters = ref("");
    const selectedTemporality = ref("");
    tasks.value = tasksService.read();
    const tasksFiltered = ref("");
    let isInEditMode = ref(false);
    let taskToEdit = ref(null);
    filter();

    function filter() {
      if (letters.value.length == 0) {
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
      if (selectedTemporality.value != "") {
        tasksFiltered.value = tasks.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }
    }

    function toggle(task) {
      taskToEdit.value = task;
      isInEditMode.value = true;
    }

    function updateTask(task) {
      tasksService.updateTask(task);
      tasks.value = tasksService.read();
      filter();
      cancelEdit();
    }

    function deleteTask(id) {
      tasksService.deleteTask(id);
      tasks.value = tasksService.read();
      filter();
    }

    function cancelEdit() {
      isInEditMode.value = false;
      taskToEdit.value = null;
    }

    watch(selectedTemporality, (newValue, oldValue) => {
      console.log(
        "Tasks.vue | watch | newvalue :",
        newValue,
        "oldValue :",
        oldValue
      );
      if (newValue != "") {
        filter();
      } else {
        tasksFiltered.value = tasks.value;
        filter();
      }
    });

    return {
      tasks,
      tasksService,
      letters,
      filter,
      tasksFiltered,
      selectedTemporality,
      deleteTask,
      isInEditMode,
      taskToEdit,
      toggle,
      updateTask,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
label {
  margin: 5px;
}
</style>