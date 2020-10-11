<template>
  <XenaduModal @close="$emit('close')">
    <template v-slot:header>
      <h5>Ziel verschieben / umplanen</h5>
    </template>
    <template v-slot:body>
      <div class="modal-form-section">
        <h4>{{goal.name}}</h4>
        Eingeplant für Kalenderwoche <span>{{goal.week.cw}}</span>
        <div class="grid-x grid-padding-x">
          <fieldset class="medium-12 cell">
            <legend>Ziel verschieben</legend>
              <input v-model="postponeValue"
                value="1"
                type="radio"
                name="postpone"
                id="radio-input_next"
              >
              <label for="radio-input_next">Um eine Woche</label>
              <input v-model="postponeValue"
                value="2"
                type="radio"
                name="postpone"
                id="radio-input_next-after-next"
              >
              <label for="radio-input_next-after-next">Um 2 Wochen</label>
              <input v-model="postponeValue"
                value="3"
                type="radio"
                name="postpone"
                id="radio-input_in-three-weeks"
              >
              <label for="radio-input_in-three-weeks">Um 3 Wochen</label>
              <input disabled v-model="postponeValue"
                value="9"
                type="radio"
                name="postpone"
                id="radio-input_later"
              >
              <label for="radio-input_later">später</label>
          </fieldset>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="isLoading">Wird verschoben ...</div>
      <button :disabled="isLoading"
        @click.prevent="postponeGoal"
        class="button"
      >verschieben
      </button>
    </template>
  </XenaduModal>
</template>

<script>
import XenaduModal from '@/components/templates/XenaduModal.vue';
import Goal from '@/classes/Goal';

import { mapActions } from 'vuex';

export default {
  name: 'PostponeGoalDialog',
  components: {
    XenaduModal,
  },
  props: {
    goal: Goal,
  },
  data() {
    return {
      isLoading: false,
      postponeValue: 1,
      form: {
        id: this.goal.id,
        name: this.goal.name,
        description: this.goal.description,
        cw: this.goal.week.cw,
        workloadLevel: this.goal.workloadPoints.level,
      },
    };
  },
  methods: {
    ...mapActions([
      'postpone',
    ]),
    some() {
      console.log('Hallo von some');
    },
    postponeGoal() {
      this.isLoading = true;
      console.log('KW vorher: ', this.goal.week.cw);

      if (this.postponeValue > 0 && this.postponeValue <= 4) {
        this.goal.week.cw += this.postponeValue;
      } else if (this.postponeValue === 9) {
        this.goal.state = 'postponed';
      }
      this.postpone(this.goal).then(() => {
        console.log('Ziel verschoben');
      }).finally(() => {
        this.isLoading = false;
        this.$emit('close');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
fieldset {
  border: solid 1px grey;
}
.modal-form-section {
  width: 75%;
  margin: 0 auto;
  margin-bottom: 2%;
}
</style>
