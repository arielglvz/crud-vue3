<template>
  <div class="search">  
    <input type="text" v-model="search" @input="updateText" placeholder="Search note..."/>
    <Icon 
      class="icon"
      icon="mdi:magnify" 
      width="auto" 
      :inline="true"
      color="#6C63FF"
      @click = "updateSearchHandle  "
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

export default {
  components: { Icon },
  emits: ['update:searchText'], // Declare emitted event
  setup(props, { emit }) {
    const search = ref('')

    const updateText = (value) => {
      search.value
    }

    const updateSearchHandle = () => {
      return emit('update:searchText', search.value);
    }
    return { search, updateText, updateSearchHandle }
  }
}
</script>

<style>
  .search {
    padding: 6px;
    display: flex;
    align-content: center;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #6C63FF;
  }
  .search input[type="text"] {
    width: 100%;
    border: none;
    font-size: 16px;
    color: #6C63FF;
    background-color: transparent;
  }
  .search input[type="text"]:focus {
    border: none;
    outline: none;
  }
  .search input[type="text"]::placeholder {
    color: #e0e0ee;
  }
</style>