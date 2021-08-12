<template>
  <div
    class="modal-no-script"
    role="dialog"
    style="z-index: 1050; opacity: 1; visibility: visible"
  >
    <div class="modal-bg-YM">
      <div class="general-content-YM">
        <div
          class="
            header-YM
            display-flex
            justify-content-space-between
            align-items-center
            background-primary-light
          "
        >
          <span class="text-uppercase text-M"> Modifier une tâche</span>
          <button class="modal__close" @click="cancel"></button>
        </div>
        <div class="content-YM with-padding-all-20 background-cwhite">
          <div class="body-YM">
            <form
              class="display-flex flex-direction-column"
              @submit.prevent="saveTask"
            >
              <input
                class="border-all border-width-1 with-margin-bottom"
                type="text"
                v-model="taskToEdit.name"
                placeholder="Nom de la tâche"
              /><br />
              <textarea
                class="border-all border-width-1 with-margin-bottom"
                v-model="taskToEdit.description"
                placeholder="Description de la tâche"
              ></textarea
              ><br />
              <select
                class="border-all-primary border-width-1 with-margin-bottom"
                v-model="taskToEdit.temporality"
              >
                <option
                  v-for="tempo in temporalityTypes"
                  :value="tempo.value"
                  :key="tempo.id"
                  :selected="tempo.value === taskToEdit.temporality"
                >
                  {{ tempo.name }}
                </option></select
              ><br />
              <button
                class="button background-cblue with-margin-bottom"
                :disabled="!isFormValid"
              >
                sauvegarder
              </button>
              <button class="button background-cred" @click="cancel">
                annuler
              </button>
            </form>
          </div>
          <div
            class="
              footer-YM
              border-top-primary border-width-1
              with-margin-top-20
              display-flex
              justify-content-space-between
              align-items-center
            "
          >
            <a
              class="button background-primary"
              target="_blank"
              href="mailto:younes.manjal@gmail.com"
              aria-label="Contactez-nous"
              ><i class="fas fa-envelope"></i>Contactez-moi</a
            >
            <a
              class="
                button
                with-icon-left
                without-padding-all
                with-margin-left-20
              "
              href="tel:0613521838"
              ><i class="fa fa-mobile fa-2x"></i>06 13 52 18 38</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "Modal",
  emit: ["updatetask", "cancel"],
  props: {
    task: {
      required: true,
    },
  },
  setup(props, context) {
    let taskToEdit = ref({ ...props.task });
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "moyen terme",
        value: "medium-term",
      },
      {
        id: 3,
        name: "long terme",
        value: "long-term",
      },
    ]);
    let temporality = ref("");
    function saveTask() {
      const taskUpdated = {
        id: taskToEdit.value.id,
        name: taskToEdit.value.name,
        description: taskToEdit.value.description,
        temporality: taskToEdit.value.temporality,
      };
      console.log("taskUpdated", taskUpdated);
      context.emit("updatetask", taskUpdated);
    }
    function cancel() {
      context.emit("cancel");
    }
    const isFormValid = computed(() => {
      if (
        taskToEdit.value.name !== "" &&
        taskToEdit.value.description !== "" &&
        taskToEdit.value.temporality !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    return {
      temporalityTypes,
      temporality,
      taskToEdit,
      saveTask,
      cancel,
      isFormValid,
    };
  },
};
</script>

<style>
.modal-no-script .general-content-YM {
  max-width: 600px;
}
@media screen and (max-width: 640px) {
  .modal-no-script .general-content-YM {
    margin: 0 20px;
  }
}
</style>