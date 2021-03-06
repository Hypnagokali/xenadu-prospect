<template>
<transition name="modal">
  <XenaduModal @close="$emit('close')">
    <template v-slot:header>
      <h5>Ziel-Parameter ändern</h5>
    </template>
    <template v-slot:body>
      <div v-if="isInputInvalid" class="callout warning">
        <h5>{{ validationError }}</h5>
      </div>
      <div v-if="isSuccess" class="callout success">
        <h5>{{ onSuccess }}</h5>
      </div>
      <div class="grid-container">
        <div class="grid-x grid-padding-x">
          <div class="medium-12 small-12 cell">
            <label>
              Name
              <input required type="text" v-model="form.name">
            </label>
          </div>
          <div class="medium-12 small-12 cell">
            <label>
              Beschreibung
              <input required type="text" v-model="form.description">
            </label>
          </div>
        </div>
      </div>
      <div class="grid-container">
        <div class="grid-x grid-padding-x">
          <div class="medium-2 medium-offset-2 small-12 cell">
            <label>
              Kalenderwoche
              <span data-tooltip tabindex="1" title="Ziel aufschieben benutzen, um KW zu ändern">
                <input type="number" v-model="form.cw" readonly>
              </span>

            </label>
          </div>
          <div class="medium-6 small-12 cell">
            <label>
              Belastung / Arbeitsaufwand
              <select v-model="form.workloadLevel">
                <option value="1">Kaum Belastung</option>
                <option value="2">Mittelmäßige Belastung</option>
                <option value="3">Schwer oder hohes Arbeitspensum</option>
                <option value="4">Kostet sehr viel Energie und Zeit</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="isLoading">Wird geändert ...</div>
      <button :disabled="isLoading" class="button" @click="updateGoal">Ändern</button>
    </template>
  </XenaduModal>
</transition>
</template>

<script>
import Goal from '@/classes/Goal';
import XenaduModal from '@/components/templates/XenaduModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditGoalDialog',
  components: {
    XenaduModal,
  },
  props: {
    goal: {
      Goal,
      default: {
        id: -1,
        name: '',
        description: '',
        week: {
          cw: 0,
          year: 2020,
        },
        workloadPoints: {
          level: 0,
          pointsPerHour: 0,
        },
      },
    },
  },
  computed: {
    ...mapGetters([
      'isInputInvalid',
    ]),
    validationError() {
      if (this.isInputInvalid) {
        return 'Bitte Eingaben überprüfen';
      }
      return '';
    },
    isLoading() {
      return this.loading;
    },
    onSuccess() {
      if (this.isSuccess) {
        return 'Ziel geändert';
      }
      return '';
    },
    currentGoal() {
      return this.goal;
    },
  },
  data() {
    return {
      form: {
        id: this.goal.id,
        name: this.goal.name,
        description: this.goal.description,
        cw: this.goal.week.cw,
        workloadLevel: this.goal.workloadPoints.level,
      },
      loading: false,
      isSuccess: false,
    };
  },
  methods: {
    ...mapActions([
      'update',
    ]),
    updateGoal() {
      this.isSuccess = false;
      this.loading = true;
      this.update(this.form)
        .then(() => {
          if (!this.isInputInvalid) {
            this.isSuccess = true;
            this.$emit('update-goals');
          }
        })
        .catch()
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.dialog-input-form {
  z-index: 9998;
  width: 50%;
}

.modal-enter,
  .modal-leave-active {
    opacity: 0;
  }

.modal-enter-active,
  .modal-leave-active {
    transition: opacity .5s ease
  }
</style>
