<template>
  <div :style="{ backgroundColor: bgColor }" class="toggle" @click="toggleNightMode">
    <Icon 
      ref="night" 
      class="icon" 
      :icon="currIcon" 
      width="auto" 
      :inline="true" 
      :horizontalFlip="true"
      color="#ffffff" 
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'; 
import { computed, ref } from 'vue';

export default {  
  components: { Icon },
  emits: ['update:isNight'], // Declare the emitted event 
  setup(props, {emit}) {
    let isNight = ref(false)
    const currIcon = computed(() => isNight.value ? "mdi:white-balance-sunny": "mdi:moon-waning-crescent");
    const iconColor = computed(() => isNight.value ? "#000000" : "#ffffff" ); 
    const bgColor = computed(() => isNight.value ? "#2c3e50" : "#6C63FF" );

    const toggleNightMode = () => { 
      isNight.value = !isNight.value; 
      emit('update:isNight', isNight.value); // Emitting the value of the ref
    }

    return { currIcon, bgColor, iconColor, toggleNightMode };
  }
}
</script>

<style>
  .toggle {
    background: #6C63FF;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }
  .toggle .icon {
    transform: rotate(144deg);
  }
</style>