<template>
  <div class="alert alert-danger">{{msg}}</div>
</template>

<script>
export default {
    props: ["msg"]
}
</script>

<style scoped>
.alert {
    border-radius:1px;
}


</style>