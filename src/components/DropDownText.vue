<template>
  <div
    class="faq py-2"
  >
    <div
      class="d-flex faq-question-container "
      @click="show = !show"
    >
      <v-icon
        class="px-2"

        :color="show ? 'rgba(31, 121, 179)' : '#000'"
      >
        {{ show ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline' }}
      </v-icon>
      <h3
        class="faq-question d-inline"
        :style="{color: show ? 'rgba(31, 121, 179)': '#000'}"
      >
        <slot name="question" />
      </h3>
    </div>
    <div class="d-flex faq-answer my-1">
      <span
        v-show="show"
        class="ml-10 "
      >
        <slot name="answer" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: null
    }
  },
  created () {
    this.show = false
  }
}
</script>

<style scoped>

.faq-question-container:hover {
  cursor: pointer;
}

.faq-question-container:hover .faq-question{
  text-decoration: underline;
}

.faq-answer {
  background: linear-gradient(to right,#fff 16px,rgba(31, 121, 179, 0.1) 20px, #fff 25px);
}

</style>
