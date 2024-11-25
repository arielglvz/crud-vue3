<template>
  <div class="filter-btn">
    <select>
      <option value="all">All</option>
      <option value="complete">Complete</option>
      <option value="incomplete">Incomplete</option>
    </select>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  select .filter-btn {
    padding: 10px;
    background-color: #6C63FF;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
  }
</style>