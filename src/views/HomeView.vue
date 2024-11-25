<template>
  <div :class="['home', background]">
    <h1>TODO LIST</h1>
    <div class="form">
      <Search @update:searchText="handleSearchText" />
      <SelectButton />
      <NightModeToggle @update:isNight="handleIsNightUpdate" />
    </div>
    <list />
    <p>Night mode is {{ isNight ? 'ON' : 'OFF' }}</p>
    <AddButton @click="toggleModal"/>
    <p>Modal: {{ showModal }}</p>
    <teleport to="#modals" v-if="showModal">
      <Modal @close="toggleModal">
        <template v-slot:addTaskModal>
          <h1>Add Modal</h1>
        </template>
      </Modal>
    </teleport>
  </div>
</template>

<script>
import Search from '@/components/ui/Search.vue'
import SelectButton from '@/components/ui/SelectButton.vue';
import NightModeToggle from '@/components/ui/NightModeToggle.vue';
import List from '@/components/List.vue';
import { computed, ref } from 'vue';
import AddButton from '@/components/ui/AddButton.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'HomeView',
  components: { Search, SelectButton, NightModeToggle, List, AddButton, Modal },
  setup() {
    const searchText = ref('')
    const isNight = ref(false);
    const background = computed(() => isNight.value ? 'dark' : 'light')
    const showModal = ref(false)

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const handleSearchText = (value) => {
      searchText.value = value
      console.log(searchText.value)
    }

    const handleIsNightUpdate = (value) => { 
      isNight.value = value;
    };
    
    return { searchText, isNight, handleSearchText, handleIsNightUpdate, background, toggleModal, showModal };
  }
}
</script>

<style>
  .home {
    position: relative;
    margin: auto;
  }
  .form {
    margin: auto;
    width: max-content;
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>