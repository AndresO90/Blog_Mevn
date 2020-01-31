<template>
    <div class="container">
        <div class="card" v-if="user">
            <ul class="list-group">
                <li class="list-group-item">Email: {{user.email}}</li>
                <li class="list-group-item">Username: {{user.userName}}</li>
                <li class="list-group-item">Name: {{user.name}}</li>
            </ul>
        </div>

        <div class="card mb-2">
    <div class="card-header bg-primary text-white">
        <h5><i class="far fa-chart-bar"></i>  YOUR STATISTICS</h5>
    </div>
    <div class="card-body">
        <p> <i class="fas fa-images"></i> Total Posts Created: {{userStatistics.Posts}} </p>
        <p> <i class="fas fa-comments"></i> Total Comments Writted: {{userStatistics.Comments}}  </p>
        <p> <i class="fas fa-eye"></i> Total Views in your Posts: {{userStatistics.Views}}  </p>
        <p> <i class="fas fa-heart"></i> Total Likes in your Posts: {{userStatistics.Likes}}  </p>
    </div>
</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: mapGetters(['user','userStatistics']),
    methods: {
        ...mapActions(['getProfile','getUserStatistics'])
    },
    async created() {
        await this.getProfile();
        await this.getUserStatistics();
    }
}
</script>



<style scoped>
.card {
    width: 60%;
    border-radius: 1;
}
.btn {
      border-radius: 1;
}
.form-control {
        border-radius: 1;
}
i {
    color: #5fd2b3
}
.container {
    text-align: center;
    width: 75%;
    margin-top: 5%;
}
.mb-2 {
    margin-top: 2%; 
}
</style>