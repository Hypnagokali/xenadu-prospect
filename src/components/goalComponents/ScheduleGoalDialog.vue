<template>
  <XenaduModal @close="$emit('close')">
    <template v-slot:header>
      <h5>Ziel neu einplanen</h5>
    </template>
    <template v-slot:body>
      <div class="modal-form-section">
        <h4>{{goal.name}}</h4>
        Ursprünglich für KW <strong>{{goal.week.cw}}</strong> eingeplant
        <div class="grid-x grid-padding-x">
          <div class="cell">
            <label>Ziel wieder einplanen
            <XenaduWeekPicker v-model="form.cw"></XenaduWeekPicker>
            </label>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="isLoading">Wird eingeplant ...</div>
      <button :disabled="isLoading"
        @click.prevent="rescheduleGoal"
        class="button"
      >einplanen
      </button>
    </template>
  </XenaduModal>
</template>

<script>
import XenaduWeekPicker from '@/components/utilities/XenaduWeekPicker.vue';
import XenaduModal from '@/components/templates/XenaduModal.vue';
import Goal from '@/classes/Goal';

import { mapActions } from 'vuex';

export default {
  name: 'ScheduleGoalDialog',
  components: {
    XenaduModal,
    XenaduWeekPicker,
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
        cw: 0,
        workloadLevel: this.goal.workloadPoints.level,
        reschedule: true,
      },
    };
  },
  methods: {
    ...mapActions([
      'reschedule',
    ]),
    rescheduleGoal() {
      this.isLoading = true;

      this.reschedule(this.form).then(() => {

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
