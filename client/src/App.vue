<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
      <div>
        <hr>
      </div>
            <Errors v-if="error || postErrors || commentErrors"  :msg="error || postErrors || commentErrors"  />

    </div>
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Navbar from "@/components/Navbar";
import Errors from "@/components/Errors"
export default {
  components: {
    Navbar,
    Errors
  },
  computed: {
    ...mapGetters(["error","postErrors","commentErrors"])
  }
}
</script>
<style>

</style>
