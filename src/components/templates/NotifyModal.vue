<template>
<div class="notification-wrapper">
  <button
      @click="$emit('close')"
      class="close-button"
      aria-label="Close alert"
      type="button"
      data-close
    >
    <span aria-hidden="true">X</span>
  </button>
  <div class="grid-x notify-title">
    <div class="cell">
      <slot name="title">
        <h4>Titel</h4>
      </slot>
    </div>
  </div>
  <div class="grid-x notify-body">
    <div class="cell">
      <slot name="body">
        <p>Nachricht an den User</p>
      </slot>
    </div>
  </div>
  <div class="grid-x notify-footer">
    <div class="cell">
      <slot name="footer">
        <button @click="$emit('close')" class="button quaternary">Close</button>
      </slot>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import '@/style/_settings.scss';

  .notification-wrapper {
    position: fixed;
    z-index: 100;
    background-color: $light-gray;
    width: 450px;
    min-height: 200px;
    top: 5%;
    left: calc(45% - 225px);
    border: 1px solid;
  }

  .notify-title {
    padding: 5px;
    border-bottom: 1px solid #333;
    background-color: get-color(success);
  }

  .notify-body {
    padding-top: 5%;
  }

  .notify-footer {
    padding-top: 5%;
  }

</style>
