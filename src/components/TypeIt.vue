<template>
  <p class="type-it margin-bottom"></p>
</template>

<script>
import TypeIt from "typeit";
export default {
  name: "TypeIt",

  mounted() {
    new TypeIt(this.$el, {
      speed: 50,
      waitUntilVisible: true,
    })
      .type("Cett app", { delay: 300 })
      .move(-3)
      .delete(1)
      .type("e ")
      .move(null, { to: "END" })
      .type(" vous permettt")
      .pause(300)
      .delete(2)
      .type(" de planfier")
      .move(-4)
      .type("i")
      .move(null, { to: "END" })
      .type("<span class='task' > vos tâches.</span>", { delay: 400 })
      .delete(".task", { delay: 800, instant: true })
      .type('<em><strong class="font-semibold"> vos tâches.</strong></em>', {
        speed: 100,
      })
      .go();
  },
};
</script>
