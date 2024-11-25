<template>
  <div class="add-list">
    <Icon
      ref="editIcon"
      class="icon"
      icon="mdi:plus"
      width="auto"
      :inline="true"
      :horizontalFlip="true"
      color= "grey"
      />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  components: { Icon }
}
</script>

<style>

</style>