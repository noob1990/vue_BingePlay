<!-- <template>
  <div id="app">
    <router-view></router-view>
  </div>
</template> -->

<!-- <script>
export default {
  name: 'App',
};
</script> -->

<!-- <style>
/* Add any global styles for your app here */
</style> -->



<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
