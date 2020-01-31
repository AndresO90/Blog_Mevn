<template>
  <div class="container">
      <div class="card mb-2">
    <div class="card-header bg-primary text-white">
        <h5> <i class="fas fa-radiation-alt highlighted"></i> OFFENSIVE WORDS IN DB</h5>
    </div>
    <div class="card-body">
        <div class="row">
                <div v-for="offWord in offWords.msg" :key="offWord._id" class="col-md-12">
                    <div class="card" :id="offWord._id">
                         <p :id="offWord._id">Offensive Word :  <span class="highlighted">{{offWord.word}}</span> ||  Level :  <span class="highlighted">{{offWord.level}} </span>
                          <button type="button" class="btn btn-outline-success editButton" @click="showEdit"><i class="far fa-edit"></i></button>
                          <button type="button" class="btn btn-outline-danger deleteButton" @click="removeOffWord"><i class="fas fa-trash-alt"></i></button>
                           </p>
                    </div>
                </div>  
        </div>
    </div>
</div>

<!-- EDIT FORM-->
     <div v-if="editBtnPush" class="card editForm">
    <div class="card-header bg-primary">
        <h3 class="card-title text-white">
            <i class="fas fa-edit highlighted"></i> EDIT SELECTED OFFENSIVEWORD !!
        </h3>
    </div>
    <div class="card-body">
        <form @submit.prevent="editOffWord">
                        <div class="form-group">
                            <label for="word">OffensiveWord </label>
                            <input id="word" type="text" placeholder="Edit OffensiveWord" name="word" v-model="word" >
                        </div>
                         <div class="form-group">
                            <label for="level">Level </label>
                            <input id="level" type="text" placeholder="Edit Level" name="level" v-model="level" >
                        </div>
                        <input  type="submit" class="btn btn-primary highlighted" value="Edit" />
                    </form>
</div>
</div>



<div class="card mb-2 card_create">
<div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
       <h3 class="titleComments"> <i class="far fa-plus-square highlighted"></i> CREATE OFFENSIVEWORD</h3> 
    </div>
<div class="card-body">
                    <form @submit.prevent="createOffWord">
                        <div class="form-group">
                            <label for="word">OffensiveWord </label>
                            <input id="word" type="text" placeholder="OffensiveWord" name="word" v-model="word" >
                        </div>
                         <div class="form-group">
                            <label for="level">Level </label>
                            <input id="level" type="text" placeholder="Level" name="level" v-model="level" >
                        </div>
                        <input  type="submit" class="btn btn-primary highlighted" value="Create" />
                    </form>
                </div>
</div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: mapGetters(['offWords']),
  data() {
        return {
            word:"",
            level:0,
            editBtnPush: false,
            editOffWordId:"",
        };
    },
  methods: {
    ...mapActions(['getOffWords','getAdminProfile','createOffensiveWord','deleteOffensiveWord','editOffensiveWord']),
     async createOffWord() {
    let offWord = {
      word: this.word,
      level: this.level
    };
    let res = await this.createOffensiveWord(offWord)
                if(res.data.success) {
                    location.reload();
                } 
  },
  async removeOffWord(e) {
    const idOffWord = e.target.parentElement.id;

     const res = confirm("Are you sure you want to delete this post?")
             if(res) {
                await this.deleteOffensiveWord(idOffWord); 
                 location.reload();
             }
  },
    async editOffWord() {
    /* eslint-disable no-console */
    
      console.log("EDIT THIS",this.editOffWordId);
     /* eslint-enable no-console */
               let editOffWord = {
                word: this.word,
                level: this.level,
            };
            
               const editOffWordId = this.editOffWordId;
                 /* eslint-disable no-console */
      console.log("editOffWord!!!!!!!",editOffWord);
      console.log("editOffWordId",editOffWordId);
     /* eslint-enable no-console */
                const res = await this.editOffensiveWord({editOffWordId:editOffWordId,editOffWord:editOffWord})
                    if(res.data.success) {
                        //sthis.$router.push('/')
                    }
        },
  showEdit(e) {
            if(!this.editBtnPush) {
                this.editBtnPush = true
            } else {
                this.editBtnPush = false;
            }
            const editOffWordId = e.target.parentElement.id;
            /* eslint-disable no-console */
            console.log("editOffWordId in SHOW",e.target.parentElement.id);
     console.log("editOffWordId in SHOW",editOffWordId);
     /* eslint-enable no-console */
            this.editOffWordId = editOffWordId
        }
  },


  async created() {
    await this.getAdminProfile();
    await this.getOffWords();
      /* eslint-disable no-console */
     console.log("HOME LOGIN",this);
     /* eslint-enable no-console */
  },
 
}
</script>

<style scoped>
.highlighted {
  color: #5fd2b3;
}
.mb-2 {
  width: 50%;
  margin-left: 15%;
  margin-top: 4%;
}
input {
  margin-left: 2%;
}
.card_create {
  width: 50%;
  margin-left: 15%;
  margin-top: 4%;
}
.editButton {
  margin-left:35%;
}
.editForm {
  width: 50%;
  margin-left: 15%;
}

</style>