<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
  body,html{
    height: 100%;
  }
  #app{
    height: 100%;
    background: #f2f2f2;
  }
  *{
    margin: 0;
    padding: 0;
  }
</style>
