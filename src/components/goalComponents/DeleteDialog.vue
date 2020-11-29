<template>
  <XenaduModal @close="$emit('close')">
    <template v-slot:header>
      <h5>Ziel löschen</h5>
    </template>
    <template v-slot:body>
      <div class="modal-form-section">
          <h4>{{goal.name}}</h4>
        <p>Es werden auch alle Aufgaben, die diesem Ziel zugeordnet sind gelöscht.</p>
        <p class="callout warning">
          Soll das Ziel gelöscht werden?
        </p>
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="isLoading">Wird gelöscht ...</div>
      <button :disabled="isLoading" @click="deleteGoal" class="button alert">Löschen!</button>
    </template>
  </XenaduModal>
</template>

<script>
import Goal from '@/classes/Goal';
import XenaduModal from '@/components/templates/XenaduModal.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    XenaduModal,
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    goal: {
      Goal,
      required: true,
    },
  },
  computed: {
    isLoading() {
      return this.loading;
    },
  },
  methods: {
    ...mapActions([
      'delete',
    ]),
    deleteGoal() {
      this.loading = true;

      this.delete(this.goal)
        .then(() => {
          // this.$emit('delete-goal');
          this.$emit('closeWithMsg', 'Ziel gelöscht');
        })
        .catch()
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@import '../../../node_modules/foundation-sites/scss/_global.scss';
.delete-warning {
  background-color: map-get($foundation-palette, "warning" )
}

.modal-form-section {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2%;
}
</style>
