<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link  class="navbar-brand" to="/">    <img id="logo" :src="'http://localhost:3000/uploads/logo_blog_mevn.png'" alt="">
</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
            <router-link to="/" class="nav-link"> <p class="onMouse">HOME</p>  <span class="sr-only">(current)</span></router-link>
      </li>
       <li class="nav-item active">
            <router-link to="/mypost" class="nav-link" v-if="isLoggedIn"><p class="onMouse">MY POST/ NEW POST</p> <span class="sr-only">(current)</span></router-link>
      </li>
       <li class="nav-item active">
            <router-link to="/manageposts" class="nav-link" v-if="isAdmin && !isLoggedIn"><p class="onMouse">MANAGE POST</p> <span class="sr-only">(current)</span></router-link>
      </li>
         <li class="nav-item active">
            <router-link to="/offensivewords" class="nav-link" v-if="isAdmin && !isLoggedIn"><p class="onMouse">OFFENSIVE WORDS</p> <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item active">
            <router-link to="/about" class="nav-link"><p class="onMouse">ABOUT</p></router-link> 
      </li>
      <li class="nav-item active" v-if="!isLoggedIn && !isAdmin">
            <router-link to="/login" class="nav-link"><p class="onMouse">LOGIN</p></router-link> 
      </li>
      <li class="nav-item active" v-if="!isLoggedIn && !isAdmin">
            <router-link to="/register" class="nav-link" ><p class="onMouse">REGISTER</p></router-link> 
      </li>
      <li class="nav-item active" v-if="isLoggedIn">
            <router-link to="/profile" class="nav-link "><p class="onMouse">PROFILE</p></router-link> 
      </li>
      <li class="nav-item active" v-if="isLoggedIn || isAdmin">
            <a href="/logout" class="nav-link " @click.prevent="logoutUser"><p class="onMouse">LOGOUT</p></a> 
      </li>

    </ul>

  </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
          ...mapGetters(["isLoggedIn","isAdmin"])
    },
    methods: {
          ...mapActions(['logout','adminLogout']),
          async logoutUser() {
               await this.logout();
               await this.adminLogout();
          }
    }
}
</script>

<style scoped>
#logo {
    height: 55px;
}
.onMouse:hover {
    color: #5fd2b3;
}


</style>