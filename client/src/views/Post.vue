<template>
    <div>
        <!-- TARJETA PARA EL POST-->
        <div class="card">
            <div class="card-header">
                <h2 id="title">{{post.title}}</h2>
            </div>
            <div class="card-body">
                <div class="text-center">
            <img class="img-thumbnail" :src="require(`/home/andreskairos/Documentos/blog_mevn/src/public/uploads/${post.image}`)">
                </div>
                <div>
                    <p id="text">{{post.text}}</p>
                </div>
                <div class="card-footer d-flex justify-content-between aling-items-center">
                    <button @click="like" class="btn btn-success" :class = "(likeCount>0) ?'disabled':'btn btn-success'" id="btn-like">
                        <i class="fas fa-thumbs-up"></i> Like
                    </button>
                    <p>
                        <span class="likes-count">{{post.likes}} </span>
                        <i class="fas fa-heart"></i>
                    </p>
                    <p>
                        <i class="fas fa-eye"></i> {{post.views}}
                    </p>
                     <p>Writted by: {{post.userName}}</p>
                    <p><i class="far fa-clock clock"></i> {{moment(post.date).fromNow()}}</p> 
                        
                     
                    
                </div>
            </div>
        </div>
        
        <!-- TARJETA PARA AÑADIR COMENTARIOS-->
<div class="card card-comment">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="titleComments" >Comments</h3> 
    </div>
    <div class="card-body">
            <form  @submit.prevent="newComment" method="POST">
            <div class="form-group">
                <textarea v-model="text" name="comment" rows="2" class="form-control" placeholder="Your Comment"></textarea>
            </div>
            <div class="form-group">
            <button  class="btn btn-success" id="btn-comment">
                <i class="fa fa-comment"></i> Create a Comment
            </button>  
          </div>
            </form>
        <div>


            <div v-if="!isLoggedIn" class="alert alert-danger">You must been Login for create a comment</div>
<!-- COMENTARIOS -->
            <ul class="list-group p-4">
                <div v-for="comment in post.comments" :key="comment.date">
                    <div class="jumbotron">
                         <p class="lead"><img class="img-thumbnail avatar" :src="(`http://gravatar.com/avatar/${comment.gravatar}/?d=identicon`)" alt="">{{comment.userName}}</p>
                        <hr class="my-4">
                        <p>{{comment.comment}}</p> 
                    </div>
                </div>
            </ul>
        </div>
    </div>
 </div>
  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    const moment = require('moment');
    export default {
        computed: mapGetters(['post','isLoggedIn']),
        data() {
        return {
            moment:moment,
            text:"",
            likeCount:0
        };
    },
        methods: {
            ...mapActions(['getSpecificPost','createComment','addLike','hideErrors']),
            async newComment() {
            let comment = {
                text: this.text,
            };
            try {
                const res = await this.createComment(comment)
                if(res.data.success) {
                    location.reload();
                } 
            }
            catch {
             this.hideErrors();
            }   
        },
        async like() {
            this.addLike();
            this.likeCount+=1;
            location.reload();
        }
        },
        async created() {
             await this.getSpecificPost();
        }
        
    }
</script>

<style scoped>
    .card {
        margin-top: 2%;
        margin-bottom: 2%
    }
    .img-fluid {
        width: 100%;
        height: 300px;
    }
    #text {
        margin-top: 2%
    }
    #comments {
        margin-top: 2%;
        margin-bottom: 2%;
    }
    .jumbotron {
        background-color: white;
    }
    .img-thumbnail{
        width: 100%;
        height: 400px;
    }
    #title {
        font-size: 2.8em;
        font-size: bold;
        text-align: center;
    }
    .titleComments {
        margin-left: 38%;
    }
    .disabled {
        display: none;
    }
    .lead {
        font-size: 2em;
        
    }
    .avatar {
margin-right: 1%;
width: 10%;
height: 80px;
border-radius: 50px;
    }
 
</style>