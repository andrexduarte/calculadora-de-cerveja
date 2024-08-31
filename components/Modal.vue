<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  padding: 30px;
  box-sizing: border-box;
}

.modal-content {
  background-color: var(--primary-color);
  padding: 15px;
  border-radius: 2px;
  position: relative;
  font-family: var(--title-font);

  p {
    font-family: var(--title-font);
  }
  mark {
    background-color: #FFF;
  }
  li {
    color: var(--dark);
  }
}

.close {
  background-color: var(--primary-color);
  color: var(--dark);
  height: 23px;
  position: absolute;
  border-radius: 50%;
  top: -8px;
  right: -8px;
  cursor: pointer;
  border: 0 none;
  margin: 0;
  padding: 0 4px;
  font-size: 22px;
  font-family: var(--font-base);
}
</style>
