<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="actions">
        <slot name="addTaskModal"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, {emit}) {
    const closeModal = () => {
      emit('close')
    }

    return { closeModal }
  }
}
</script>

<style lang="scss">
  @import '~@/assets/styles/global.scss';

  .backdrop {
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
 
    .modal {
      height: 170px;
      width: max-content;
      padding: 20px;
      background: white;
      border-radius: 10px;
      text-align: center;

      h1 {
        color: $theme-color;
        border: none;
        padding: 0;
        margin-bottom: 1rem;
      }

      .actions {
        .modal-border {
          margin-bottom: 10px;
          border: 2px solid $border-light;
          border-radius: 4px;
          overflow: hidden;

          > input[type="text"] {
            padding: 10px;
            border: none;
            outline: none;
            font-size: 1rem;

            &:focus {
              border: none;
              outline: none;
            }
            &::placeholder {
              color: $placeholder;
            }
          }
        }

        > button {
          padding: 10px;
          cursor: pointer;
          background-color: $theme-color;
          color: #ffffff;
          border: none;
          border-radius: 4px;
        }

        p {
          margin-bottom: 10px;
          color: red;
        }
      }
    }
  }
</style>