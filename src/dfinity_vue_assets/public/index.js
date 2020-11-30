import dfinity_vue from 'ic:canisters/dfinity_vue';

dfinity_vue.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
