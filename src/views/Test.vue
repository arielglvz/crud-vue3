<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label>Name</label>
      <input 
        v-model="form.name" 
        class="form-control" 
        type="text" 
        required
      />
    </div>

    <div class="form-group">
    <label>Email</label>
    <input 
      v-model="form.email" 
      class="form-control" 
      type="email" required 
    />
  </div>
  
  <button type="submit">Create User</button>
  </form>
</template>

<script>
import { createUser } from '@/firebase';
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({ name: '', email: ''})

    const onSubmit = async () => {
      await createUser({...form})
      form.name = ''
      form.email = ''
    }

    return { form, onSubmit}
  }
}
</script>

<style>

</style>