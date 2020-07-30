<template>
  <div>
    <h2>Missionen, Ziele, Aufgaben</h2>
    <div>
      <router-link :to="{name: 'Goals'}">
        Zu den Wochenzielen
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Missions',
};
</script>
