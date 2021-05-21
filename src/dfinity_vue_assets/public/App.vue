<template>
  <div id="app">
    <div>{{ internetComputerGreeting || 'Loading message from Internet Computer...' }}</div>
  </div>
</template>

<script>
import dfinity_vue from 'ic:canisters/dfinity_vue';

export default {
  data: () => {
    return {
      internetComputerGreeting: ''
    };
  },
  created() {
    dfinity_vue.greet(window.prompt("Enter your name:")).then(greeting => {
      this.internetComputerGreeting = greeting
    });
  }
}
</script>
