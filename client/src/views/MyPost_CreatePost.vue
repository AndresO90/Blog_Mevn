<template>
<div>
     <div class="card">
    <div class="card-header bg-primary">
        <h3 class="card-title text-white">
            <i class="fas fa-comment-dots green"></i> CREATE A NEW POST
        </h3>
    </div>
    <div class="card-body">
        <form  @submit.prevent="newPost"  method="POST" enctype="multipart/form-data">
           <div class="form-group">
                <input type="text" v-model="title" name="title" class="form-control" placeholder="Title for the Post" required>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" @change="selectImage"  name="image" class="custom-file-input" 
                          required>
                        <label class="custom-file-label" for="inputGroupFile">Choose image</label>
                    </div>        
                </div>
            </div>
            <div class="form-group">
                <textarea name="description" v-model="text" rows="2" class="form-control" placeholder="Text for your new Post"
                    required></textarea>
            </div>
            <div class="form-group">
                <button @click="uploadImage" type="submit" class="btn btn-outline-success">
                    <i class="fa fa-upload"></i>
                    Upload Post
                </button>
    </div>
    </form>
</div>
</div>


<!-- EDIT FORM-->
     <div v-if="editBtnPush" class="card">
    <div class="card-header bg-primary">
        <h3 class="card-title text-white">
            <i class="fas fa-edit green"></i> EDIT YOUR POST !!
        </h3>
    </div>
    <div class="card-body">
        <form  @submit.prevent="edit"  method="POST" enctype="multipart/form-data">
           <div class="form-group">
                <input type="text" v-model="editTitle" name="title" class="form-control" placeholder="Edit the title..." required>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" @change="selectEditImage"  name="editImage" class="custom-file-input" 
                          required>
                        <label class="custom-file-label" for="inputGroupFile">Choose a new Image</label>
                    </div>        
                </div>
            </div>
            <div class="form-group">
                <textarea name="description" v-model="editText" rows="2" class="form-control" placeholder="Edit the text..."
                    required></textarea>
            </div>
            <div class="form-group">
                <button @click="uploadEditImage" type="submit" class="btn btn-outline-success editButton">
                    <i class="fa fa-upload editIcon"></i>
                    Edit Post
                </button>
    </div>
    </form>
</div>
</div>


<!-- EDIT/DELETE-->
    <div class="card edit_delete" >
    <div class="card-header bg-primary">
        <h3 class="card-title text-white">
            <i class="far fa-edit green"></i> EDIT OR DELETE YOUR POST
        </h3>
    </div>
    <div class="card-body">
     <div>
  <b-carousel    style="text-shadow: 0px 0px 2px #000" label-prev no-animation  
  id="carousel-1"
      :interval="4000"
      controls
      indicators
      img-width="1024"
      img-height="480"
   >
    <b-carousel-slide v-for="post in posts" :key="post._id"  :img-src="require('/home/andreskairos/Documentos/blog_mevn/client/src/assets/fondo_nocolor.png')">
    <div class="card-body" :id="post._id"> 
    <p id="title">{{post.title}}</p>
    <img class="img-thumbnail" :src="require(`/home/andreskairos/Documentos/blog_mevn/src/public/uploads/${post.image}`)">
    <button type="button" class="btn btn-outline-success button" @click="showEdit"><i class="far fa-edit"></i> Edit Post</button>
    <button type="button" class="btn btn-outline-danger button" @click="removePost"><i class="fas fa-trash-alt"></i> Delete Post</button>
    </div>
                           
</b-carousel-slide>
   
  </b-carousel>
</div>
</div>
</div>







</div>
 

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'

export default {
    computed: mapGetters(['posts','user']),
data() {
        return {
            title:"",
            text:"",
            selectedFile: null,
            image:"",
            onSlideStart:null,
            onSlideEnd:null,
            prev:null,
            editBtnPush: false,
            editTitle:"",
            editText:"",
            editImage:"",
            editPostId:"",
            editSelectedFile:""
        };
    },
     methods: {
        ...mapActions(['createPost', 'getAllUserPosts', 'getProfile', 'deletePost', 'editPost']),
        async newPost() {
            let post = {
                title: this.title,
                text: this.text,
                image: this.image
            };
            try {
                const res = await this.createPost(post)
                if(res.data.success) {
                    location.reload();
                }
            }
            catch {
                 const errors = document.querySelector(".alert")
                 const divEditPost = document.querySelector(".edit_delete")
                    divEditPost.style.display="none";
                    if(errors.style.display=="none") {
                        errors.style.display="block"
                    }
                    setTimeout(()=> {
                    errors.style.display="none"
                    divEditPost.style.display="block";
                    },2500);
                            }
           
        },
      async removePost(event) {
        const idPost = event.target.parentElement.id;
        const res = confirm("Are you sure you want to delete this post?")
             if(res) {
                await this.deletePost(idPost); 
                location.reload();
             }
      },
        selectImage(event) {
            this.selectedFile = event.target.files[0];
            this.image = this.selectedFile.name;
        },
        selectEditImage(event) {
            this.editSelectedFile = event.target.files[0];
            this.editImage = this.editSelectedFile.name;
        },
        async uploadImage() {
            const fd = new FormData();
            fd.append('image',this.selectedFile, this.selectedFile.name);
            const res= await axios.post('http://localhost:3000/upload',fd)
                /* eslint-disable no-console */
                console.log("res",res);
                /* eslint-enable no-console */  
        },
        async uploadEditImage() {
            const fd = new FormData();
            fd.append('image',this.editSelectedFile, this.editSelectedFile.name);
            await axios.post('http://localhost:3000/upload',fd)

        },
        async edit() {
               let editPost = {
                title: this.editTitle,
                text: this.editText,
                image: this.editImage
            };

            try {
                const editPostId = this.editPostId;
                const res = await this.editPost({editPostId:editPostId,editPost:editPost})
                    if(res.data.success) {
                         location.reload();
                     }
            } catch {
                    const errors = document.querySelector(".alert")
                    const divEditPost = document.querySelector(".edit_delete")
                    divEditPost.style.display="none";
                    if(errors.style.display=="none") {
                        errors.style.display="block"
                    }
                    setTimeout(()=> {
                    errors.style.display="none"
                    divEditPost.style.display="block";
                    },3000);     
            }
        },
        showEdit(event) {
            if(!this.editBtnPush) {
                this.editBtnPush = true
            } else {
                this.editBtnPush = false;
            }
            const idPost = event.target.parentElement.id;
            this.editPostId = idPost
        }
    },
      async created(){
          const profile = await this.getProfile();
          await this.getAllUserPosts(profile);
        },    
}
</script>

<style >
.card { 
    margin-top: 2%;
}
#title {
    color:black;
    font-size: 1.8em;
}
.carousel-indicators li {
    background-color: black;
}
.img-thumbnail {
    height: 430px;
}
.button {
    margin-top: 2%;
    margin-left: 2%
}
h3{
    text-align: center;
}

.carousel-control-next-icon{
    background-color: black;
}
.carousel-control-prev-icon{
   background-color: black;
}
.aria-describedby{
    height: 10px;
}

.carousel-indicators li {
    width: 40px;
    height: 4px;
}
.green {
    color: #5fd2b3
}

.editIcon {
    color: #5fd2b3;
    border-color: #5fd2b3;
}
.editButton{
     color: #5fd2b3;
    border-color: #5fd2b3;
}

</style>