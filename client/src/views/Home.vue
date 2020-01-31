<template>
<div class="container">
<div class="row">
 <div class="col-md-9 home">
        <div class="card mt-2">
            <div class="card-header bg-primary text-white">
                <h3> <i class="fas fa-fire-alt"></i> RECENT POSTS UPLOADS</h3>
            </div>
            <div class="card-body">
                <div class="row ">
                    <div v-for="post in posts" :key="post._id" class="col-md-4 jumbotron">
                        <p>{{post.title}}</p>
                        <router-link :to="'/post/' + post._id">
                        <img class="img-thumbnail" :src="'http://localhost:3000/uploads/' + post.image">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3 text-center">
<div class="card mb-2">
    <div class="card-header bg-primary text-white">
        <h5><i class="far fa-chart-bar"></i>  WEB STATISTICS</h5>
    </div>
    <div class="card-body">
        <p> <i class="fas fa-images"></i> Posts: {{postStatistics.postNumber}} </p>
        <p> <i class="fas fa-comments"></i> Comments: {{postStatistics.commentsNumber}}  </p>
        <p> <i class="fas fa-eye"></i> Views: {{postStatistics.viewCount}}  </p>
        <p> <i class="fas fa-heart"></i> Likes: {{postStatistics.likesCount}}  </p>
    </div>
</div>


<div class="card mb-2">
    <div class="card-header bg-primary text-white">
        <h5> <i class="fas fa-comment-dots"></i> MOST POPULAR POSTS</h5>
    </div>
    <div class="card-body">
        <div class="row">
 
                <div v-for="popular in popularPost" :key="popular._id" class="col-md-12">
                    <div class="card">
                         <p>{{popular.title}}</p>
                    <router-link :to="'/post/' + popular._id">
                        <img :src="'http://localhost:3000/uploads/' + popular.image" class="popImg w-100 img-thumbnail">
                    </router-link>
                    </div>
                   
                </div>
  
        </div>
    </div>
</div>
    </div>
</div>
</div>
   
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        computed: mapGetters(['posts','postStatistics','popularPost']),
        methods: {
            ...mapActions(['getAllPosts','getPostStatistics','getMostPopularPosts']),
        },
        async created() {
            await this.getAllPosts();
            await this.getPostStatistics();
            await this.getMostPopularPosts();
              /* eslint-disable no-console */
     console.log("HOME LOGIN",this);
     /* eslint-enable no-console */
        }
    }
</script>
<style scoped>
    .jumbotron {

        padding: 1rem 0rem;
    }
    .home {
        margin-top: 2%;
    }
    .img-thumbnail{
        width: 100%;
        height: 200px;
    }
h3{
    text-align: center;
}
p {
    text-align: center; 
}
.card {
    margin-top: 13%;
}
.row {
    margin-right: -21px;
    margin-left: -20px;
    padding-left: 10px;
    padding-right: 10px;
}
i {
    color: #5fd2b3;
}


@media (min-width: 1200px){
.container {
    min-width: 1400px;
    margin-left: -12%;
}
}


</style>