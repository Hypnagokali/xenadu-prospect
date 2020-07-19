<template>
  <div>
    <h2>xenadu - prospect</h2>
    <div>
      <AddGoalDialog></AddGoalDialog>
    </div>
  </div>
</template>

<script>
import AddGoalDialog from '@/components/AddGoalDialog.vue';

export default {
  name: 'AddGoal',
  components: {
    AddGoalDialog,
  },
};
</script>
