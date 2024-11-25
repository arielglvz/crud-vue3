<template>
  <div class="todolist">
    <h1>Todo List</h1>
    <div class="form">
      <div class="searchbar">
        <input class="search-text" v-model="keyname" type="text" placeholder="Search note..." />
        <Icon 
          class="search-icon"
          icon="mdi:magnify" 
          width="auto" 
          :inline="true"
          color="#6C63FF"
          @click="handleKeyword"
        />
      </div>
      <select class="filter" v-model="selectVal" @change="handleSelectFilter">
        <option value="all">all</option>
        <option value="complete">complete</option>
        <option value="incomplete">incomplete</option>
      </select>

      <div class="nightmode-toggle">
        <Icon 
          class="nightmode-icon" 
          icon="mdi:moon-waning-crescent" 
          width="auto" 
          :inline="true" 
        />
      </div>
    </div>
    <div class="list-container">
      <ul class="tasklist">
        <li v-for="(task, index) in filteredTask" :key="task.id" class="list-item">
          <div class="left-content">
            <input type="checkbox" @click="toggleStatus(task)" :checked="task.completed" />
            <p 
            :class="['list-title', task.completed ? 'done' : '']" 
            :contenteditable="task.editable"
             @blur="saveTitle(task)" 
             @keypress.enter="finishEdit(task)"
            >{{task.todo}}</p>
            <p class="list-id">#{{index + 1}}</p>
          </div>
          <div class="list-controller">
            <Icon
              ref="editIcon"
              class="edit-icon"
              icon="mdi:pencil"
              width="auto"  
              :inline="true"
              @click="enableEdit(task)"
            />
            <Icon
              ref="deleteIcon"
              class="delete-icon"
              icon="mdi:delete"
              width="auto"
              :inline="true"
              :horizontalFlip="true"
              @click="deleteTask(task.id)"
            />
          </div>
        </li>
      </ul>
    </div>
    <teleport to="#modals" v-if="showModal">
      <Modal @close="toggleModal">
        <template v-slot:addTaskModal>
          <h1>Add Task</h1>
          <div class='modal-border'>
            <input type="text" v-model="newTask" placeholder="Add task..."/>
          </div>
          <p v-if="emptyText">Please add task</p>
          <button @click="handleSubmit">Add Task</button>
        </template>
      </Modal>
    </teleport>
    <Icon
      ref="addIcon"
      class="add-icon"
      icon="mdi:plus"
      width="auto"
      :inline="true"
      :horizontalFlip="true"
      @click="toggleModal"
      />
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';

export default {
  name: 'todolist',
  components: { Icon, Modal },
  setup() {
    const tasks = ref([])
    const isDone = ref(null)
    const keyname = ref('')
    const showModal = ref(false)
    const newTask = ref('')
    const emptyText = ref(false)
    const selectVal = ref('all')

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const fetchData = async () => {
      const URL = "https://dummyjson.com/todos"

      try {
        const response = await fetch(URL)
        if(!response.ok) {
            throw new Error(`Could not fetch resource: ${response.statusText}`)
        }
        const data = await response.json();
        tasks.value = data.todos;

      } catch(error) {
        console.log('Error fetching: ', error.message)
      }
    }

    const getNewId = () => { 
      const maxId = Math.max(...tasks.value.map(task => task.userId));
      return maxId + 1; 
    };

    const addTask = async (task) => {
      const URL = "https://dummyjson.com/todos/add"; // Ensure this is the correct endpoint for adding a new task
      
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });

        if (!response.ok) {
          throw new Error(`Could not add task: ${response.statusText}`)
        }

        const newTask = await response.json();
        tasks.value.push(newTask);

      } catch (error) {
        console.log('Error adding task: ', error.message)
      }
    };


    const toggleStatus = async (task) => {
      task.completed = !task.completed;
      const URL = `https://dummyjson.com/todos/${task.id}`;

      try {
        const response = await fetch(URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ complete: task.completed })
        });

        if (!response.ok) {
          throw new Error(`Could not update task: ${response.statusText}`)
        }
      } catch (error) {
        console.log('Error update task: ', error.message)
      }
    };

    const deleteTask = async (id) => { 
      const URL = `https://dummyjson.com/todos/${id}`; 
      try { 
        const response = await fetch(URL, { method: 'DELETE' }); 
        if (!response.ok) { 
          throw new Error(`Could not delete task: ${response.statusText}`); 
        } tasks.value = tasks.value.filter((task) => 
        task.id !== id); 
      } catch (error) { 
        console.log('Error deleting task:', error.message); 
      }
    };
    
    const handleKeyword = () => {
      return keyname.value
    }

    const handleSelectFilter = (value) => {
      let taskList = tasks.value; 
      console.log(taskList.filter(item => console.log(item)))
    }

    const filteredTask = computed(() => { 
      let taskList = tasks.value; 
      console.log('filter: ', selectVal.value)
      if (keyname.value) { 
        taskList = taskList.filter((task) => 
        task.todo.toLowerCase().includes(keyname.value.toLowerCase()));
      } 
    
      return taskList.sort((a, b) => a.completed - b.completed); 
    });

    const enableEdit = (task) => { 
      task.editable = true; 
    };

    const saveTitle = async (task) => { 
      task.editable = false; 
      const taskTitle = task.todo.trim();
      if (tasks.value.title === '') { 
        deleteTask(task.id); 
      } else { 
        const URL = `https://dummyjson.com/todos/${task.id}`; 
        try { 
          const response = await fetch(URL, { 
            method: 'PUT', 
            headers: { 
              'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify({ todo: taskTitle }) }); 
            if (!response.ok) { 
              throw new Error(`Could not update task: ${response.statusText}`); 
            } 
          } catch (error) { 
            console.log('Error updating task:', error.message); 
          } 
        } 
      };

      const finishEdit = (task) => { 
        saveTitle(task); 
      };

      const handleSubmit = async () => { 
        const newTaskData = { 
          userId: getNewId(), // Generates a new ID 
          todo: newTask.value, // Sets the task description 
          completed: false // Sets the completed status to false 
        }; 

        const { todo } = newTaskData

        if(!todo) {
          emptyText.value = true
          
          setTimeout(() => { 
            emptyText.value = false
          }, 5000);
        } else {
          await addTask(newTaskData); // Sends the new task data to the API 
          newTask.value = ''; // Clears the input field 
          toggleModal(); // Closes the modal
        }
        
      };

    onMounted(fetchData)

    return { 
      toggleStatus, 
      tasks, 
      newTask,
      isDone,
      keyname,
      handleKeyword,
      filteredTask,
      deleteTask,
      enableEdit,
      saveTitle,
      finishEdit,
      showModal,
      toggleModal,
      handleSubmit,
      addTask,
      getNewId,
      emptyText,
      selectVal,
      handleSelectFilter
     }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/global.scss';

.todolist {
  padding: 20px;

    h1 {
      margin-bottom: 1rem;
      color: $color-light;
      text-transform: uppercase;
    }
    
    .form {
      margin-bottom: 2rem;

      .searchbar {
        height: 38px;
        width: max-content;
        padding: 3px 10px;
        display: flex;
        align-items: center;
        gap: 16px;
        border: 2px solid $border-light ;
        border-radius: 5px;

        .search-text {
          font-size: 1rem;
          border: none;
          outline: none; 

          &:focus {
            border: none;
            outline: none;
          }
          &::placeholder {
            color: $placeholder;
          }
        }
      }

      .filter {
        height: 46px;
        background-color: $theme-color;
        padding: 8px;
        border-radius: 3px;
        border: none;
        outline: none;
        font-size: 18px;
        color: #ffffff;
      }

      .nightmode-toggle {
        height: 38px;
        width: 38px;
        padding: 3px;
        background-color: $theme-color;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;

        .nightmode-icon {
          transform: rotate(332deg);
          color: #ffffff;
        }
      }
    }

    .list-container {
      .tasklist {
        .list-item {
          margin: 0 auto;
          width: 70%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          
          .left-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            & > p {
              text-transform: uppercase;
              font-weight: 600;
            }

            .done {
              text-decoration: line-through;
            }

            > input[type="checkbox"] {
              border:  1px solid red;
              background-color: ref;
            }
          }

          .list-controller {
            display: flex;
            gap: 1rem;
            .edit-icon,
            .delete-icon {
              cursor: pointer;
              color: #CDCDCD;
            }

            .edit-icon:hover {
              color: rgb(15, 238, 15);
            }

            .delete-icon:hover {
              color: red;
            }
          }

          &:not(:last-child) {
            border-bottom: 1px solid $theme-color;
          }
        }
      }
    }

    .add-icon {
      margin: 20px;
      float: right;
      height: 50px;
      width: 50px;
      background-color: $theme-color;
      color: #ffffff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
</style>