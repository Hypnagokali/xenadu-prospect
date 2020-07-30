<template>
  <div>
    <div class="xenadu-view-header">
      <ul class="xenadu-menu menu align-center">
        <li><a href="#">Diese Woche</a></li>
        <li><a href="#">Nächste Woche</a></li>
        <li><a href="#">Gesamtüberblick</a></li>
        <li><a href="#">Routinen verwalten</a></li>
      </ul>
    </div>
    <div>
      <div class="cell medium-12">
        <div class="xenadu-view-subheader">
          <h3>Routine - Monitor</h3>
          <button class="button success">
            Nächste Routine anzeigen
          </button>
        </div>
      </div>
      <div class="cell medium-12">
        <div class="xenadu-view-content">
          Noch keine Routinen
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Routines',
  components: {
  },
};
</script>
