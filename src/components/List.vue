<template>
  <div class="list">
    <h3>List</h3>
    <ul>
      <li class="task" v-for="task in arr" :key="task">
        <div class="content">
          <input type="checkbox" />
          <p class="title">{{task.title}}</p>
          <p class="id">#{{task.id}}</p>
        </div>
        <div>
          <Icon
          ref="editIcon"
          class="icon"
          icon="mdi:pencil"
          width="auto"
          :inline="true"
          :horizontalFlip="true"
          color= "grey"
          />
          <Icon
            ref="deleteIcon"
            class="icon"
            icon="mdi:delete"
            width="auto"
            :inline="true"
            :horizontalFlip="true"
            color= "grey"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import fetchData from '@/composables/fetchData';
import { Icon } from '@iconify/vue';
export default {
  components: { Icon },
  setup() {
    const { arr, error, load } = fetchData('http://localhost:5000/tasklist')
    
    load()
    // console.log('arr', arr)
    return { arr, error}
  }
}
</script>

<style>
  .list {
    margin: auto;
  }
  
  .list ul {
    padding: 0;
  }

  .list ul li{
    padding: 15px;
    margin: auto;
    width: 100%;
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .list ul li:not(:last-child) {
    border-bottom: 2px solid #6b63ff4f;
  }

  .list ul li .content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .list ul li .content p {
    color: #252525;
    font-weight: 600;
    text-transform: uppercase;
  }

  .icon,
  input[type="checkbox"] {
    /* opacity: 0.5; */
    cursor: pointer;
  }
</style>