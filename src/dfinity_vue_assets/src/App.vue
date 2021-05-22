<template>
  <div id="app">
    <div>{{ internetComputerGreeting || 'Loading message from Internet Computer...' }}</div>
  </div>
</template>

<script>
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as dfinity_vue_idl, canisterId as dfinity_vue_id } from 'dfx-generated/dfinity_vue';

export default {
  data: () => {
    return {
      internetComputerGreeting: ''
    };
  },
  created() {
    const agent = new HttpAgent();
    const dfinity_vue = Actor.createActor(dfinity_vue_idl, { agent, canisterId: dfinity_vue_id });

    dfinity_vue.greet(window.prompt("Enter your name:")).then(greeting => {
      this.internetComputerGreeting = greeting
    });
  }
}
</script>
