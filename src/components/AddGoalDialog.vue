<template>
  <div>
    <div class="goal-header">
      <h3>Ziel hinzufügen</h3>
    </div>
    <div class="goal-input">
      <div v-if="isInputInvalid" class="callout warning">
        <h5>{{ validationError }}</h5>
      </div>
      <div v-if="isSuccess" class="callout success">
        <h5>{{ onSuccess }}</h5>
      </div>
      <div v-if="isLoading">
        <img src="@/assets/loadring.gif">
      </div>
        <div v-if="isLoading === false" class="input-form">
          <input v-model="form.name" type="text" name="name" placeholder="Name des Ziels ...">
          <input
            v-model="form.description"
            type="text"
            name="description"
            placeholder="Kurze Beschreibung ..."
          >
          <select v-model="form.workloadLevel" name="workload_level">
            <option value="1">Einfaches Ziel</option>
            <option value="2">Mittelschweres Ziel</option>
            <option value="3">Anstrengendes Ziel</option>
            <option value="4">Kostet sehr viel Überwindung</option>
          </select>
          <XenaduWeekPicker v-model="form.cw"></XenaduWeekPicker>
          <button :disabled="isLoading" @click="createGoal" type="button" class="success button">
            Hinzufügen
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import XenaduWeekPicker from './utilities/XenaduWeekPicker.vue';


export default {
  name: 'AddGoalDialog',
  components: {
    XenaduWeekPicker,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        cw: 0,
        workloadLevel: 1,
      },
      isLoading: false,
      isSuccess: false,
    };
  },
  computed: {
    ...mapGetters([
      'isInputInvalid',
    ]),
    onSuccess() {
      if (this.isSuccess) {
        return 'Ziel hinzugefügt';
      }
      return '';
    },
    validationError() {
      if (this.isInputInvalid) {
        return 'Bitte Eingaben überprüfen';
      }
      return '';
    },
  },
  methods: {
    ...mapActions([
      'create',
    ]),
    createGoal() {
      this.isLoading = true;
      this.isSuccess = false;
      // this.$store.dispatch('create', this.form);
      this.create(this.form).then(() => {
        console.log(this.isInputInvalid);
        if (!this.isInputInvalid) {
          this.clearForm();
          this.isSuccess = true;
        }
      })
        .catch()
        .finally(() => {
          this.isLoading = false;
        });
    },
    changeCW(cw) {
      // console.log('changed!');
      this.form.cw = cw;
    },
    clearForm() {
      console.log('clear form ...');
      const clearedForm = {
        name: '',
        description: '',
        cw: 0,
        workloadLevel: 1,
      };
      this.form = clearedForm;
    },
  },
};
</script>

<style scoped lang="scss">
.goal-input {
  width: 50vh;
  margin: 0 auto;
}
</style>
