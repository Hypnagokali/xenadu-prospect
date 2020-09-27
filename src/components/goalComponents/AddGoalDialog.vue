<template>
  <div class="xenadu-form-content">
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
          <div class="xenadu-load-animation" v-if="isLoading">
            <img src="@/assets/loadring.gif">
          </div>
        <div v-if="isLoading === false" class="input-form">
          <div class="grid-container align-center">
            <div class="grid-x align-center">
              <div class="medium-9 cell">
                <label>Ziel
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    placeholder="Name des Ziels ..."
                  >
                </label>
              </div>
            </div>
            <div class="grid-x align-center">
              <div class="medium-9 cell">
                <label>Beschreibung
                  <input
                    v-model="form.description"
                    type="text"
                    name="description"
                    placeholder="Kurze Beschreibung ..."
                  >
                </label>
              </div>
            </div>
            <div class="grid-x align-center">
              <div class="medium-9 cell">
                <label>Schwere des Ziels
                <select v-model="form.workloadLevel" name="workload_level">
                  <option value="1">Einfaches Ziel</option>
                  <option value="2">Mittelschweres Ziel</option>
                  <option value="3">Anstrengendes Ziel</option>
                  <option value="4">Kostet sehr viel Überwindung</option>
                </select>
                </label>
              </div>
            </div>
            <div class="grid-x align-center">
              <div class="medium-9 cell">
                <label>Einplanen für:
                <XenaduWeekPicker v-model="form.cw"></XenaduWeekPicker>
                </label>
              </div>
            </div>
            <div class="grid-x grid-padding-x align-center">
              <div class="medium-9 cell">
                <button
                  :disabled="isLoading" @click="createGoal" type="button" class="success button"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </div>
          <!--
          <input v-model="form.name" type="text" name="name" placeholder="Name des Ziels ...">
          <input
            v-model="form.description"
            type="text"
            name="description"
            placeholder="Kurze Beschreibung ..."
          >-->
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import XenaduWeekPicker from '@/components/utilities/XenaduWeekPicker.vue';


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
@import '@/style/goals.scss';
// .goal-input {
//  width: 50vh;
//  margin: 0 auto;
//}
</style>
