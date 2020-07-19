<template>
  <div class="modal-wrapper">
    <button
      @click="$emit('close')"
      class="close-button"
      aria-label="Close alert"
      type="button"
      data-close
    >
    <span aria-hidden="true">X</span>
  </button>
    <div class="modal-mask">
      <header>
        <button @click="$emit('close')" class="button tiny float-right">X</button>
        <slot name="header">
          <h5>default header</h5>
        </slot>
      </header>
      <section>
        <slot name="body">Inhalt
        </slot>
      </section>
      <footer>
        <slot name="footer">
          Buttons, etc ...
        </slot>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-mask {
  width: 60vh;
  min-height: 150px;
  background-color: rgb(186, 170, 255);
}
</style>
