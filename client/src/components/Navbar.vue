<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link  class="navbar-brand" to="/">    <img id="logo" :src="require('/home/andreskairos/Documentos/blog_mevn/client/src/assets/logo_blog_mevn.png')" alt="">
</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
            <router-link to="/" class="nav-link">HOME <span class="sr-only">(current)</span></router-link>
      </li>
       <li class="nav-item active">
            <router-link to="/mypost" class="nav-link" v-if="isLoggedIn">MY POST/ NEW POST <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item active">
            <router-link to="/about" class="nav-link">ABOUT </router-link> 
      </li>
      <li class="nav-item active" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link">LOGIN</router-link> 
      </li>
      <li class="nav-item active" v-if="!isLoggedIn">
            <router-link to="/register" class="nav-link">REGISTER </router-link> 
      </li>
      <li class="nav-item active" v-if="isLoggedIn">
            <router-link to="/profile" class="nav-link">PROFILE </router-link> 
      </li>
      <li class="nav-item active" v-if="isLoggedIn">
            <a href="/logout" class="nav-link" @click.prevent="logoutUser">LOGOUT</a> 
      </li>

    </ul>

  </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
          ...mapGetters(["isLoggedIn"])
    },
    methods: {
          ...mapActions(['logout']),
          logoutUser() {
                this.logout();
          }
    }
}
</script>

<style scoped>
#logo {
    height: 55px;
}
</style>