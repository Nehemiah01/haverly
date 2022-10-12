<template>

  <!-- <nav>
    <router-link to="/">Home</router-link> |
  </nav> -->
  <!-- <Nav /> -->
  <router-view/>

  <!-- <p>Hello Folksss</p> -->
  <!-- <Nav /> -->
  <!-- <Search /> -->
  <!-- <Groups/> -->
  <!-- <Recents/> -->
  <!-- <Friends/> -->
  <!-- <Calls/> -->
  <!-- <Chat/> -->

  <!-- <MessageBox :currentUser="currentUser"/> -->

  <!-- <NewChat /> -->
  <!-- <Test/> -->
  <!-- <ChatContainer/> -->
  
</template>

<script>
import Nav from '@/components/Nav'
import Search from './components/Search.vue';
import Groups from './components/Groups.vue';
import Recents from './components/Recents.vue';
import Friends from './components/Friends.vue';
import Calls from './components/Calls.vue';
import Chat from './components/Chat.vue';
import MessageBox from './components/MessageBox.vue';
import NewChat from './components/NewChat.vue';
import Test from './components/Test.vue';

import ChatContainer from './ChatContainer.vue'

export default {
  data() {
    return {
      currentUser: {
        id: 1,
        name: "King Daps",
        email: "olaolatunjioladapo1@gmail.com",
      }
    }
  },
  components: {
    Nav,
    Search,
    Groups,
    Recents,
    Friends,
    Calls,
    Chat,
    MessageBox,
    NewChat,
    Test,

    ChatContainer
}

}
</script>

<style lang="scss">
  
* {
  font-family: "Poppins";
}

body {
  background-color: #eee;
}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


</style>
