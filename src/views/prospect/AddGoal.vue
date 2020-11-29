<template>
  <div class="content">
    <div class="xenadu-view-header">
      <ul class="xenadu-menu menu align-center">
        <li>
          <router-link :to="{name: 'Goals'}">
            Zurück zu meinen Zielen
          </router-link>
        </li>
      </ul>
    </div>
    <div class="xenadu-view-content">
      <AddGoalDialog></AddGoalDialog>
    </div>
  </div>
</template>

<script>
import AddGoalDialog from '@/components/goalComponents/AddGoalDialog.vue';

export default {
  name: 'AddGoal',
  components: {
    AddGoalDialog,
  },
};
</script>
