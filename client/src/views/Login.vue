<template>
    <div>
        <div class="row">
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="loginUser">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input id="username" type="text" placeholder="Username" name="userName" v-model="userName" class="form-control">
                        </div>
                         <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" placeholder="Password" name="password" v-model="password" class="form-control">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Login" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/register" class="card-link" id="needAccount" >Need an Account??</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            userName:"",
            password:""
        }
    },
    methods: {
        ...mapActions(["login","loginAdmin"]),
        async loginUser() {
            let user = {
                userName:this.userName,
                password:this.password
            };
            try {
                let res = await this.login(user);
                if(res.data.success) {
                    this.$router.push('/')
                }
            }
            catch {
                let admin = {
                      userName:this.userName,
                password:this.password
                }
                 try {
                let res = await this.loginAdmin(admin);
                if(res.data.success) {
                    this.$router.push('/')
                     const errors = document.querySelector(".alert")
                if(errors.style.display=="none") {
                    errors.style.display="block"
                }
                setTimeout(()=> {
                    errors.style.display="none"
                },3000); 
                }
            }catch {
                const errors = document.querySelector(".alert")
                if(errors.style.display=="none") {
                    errors.style.display="block"
                }
                setTimeout(()=> {
                    errors.style.display="none"
                },3000); 
            }
                
            }
        }
    }
};
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
.row {
    margin-top: 15%;
}
#needAccount {
        color: #5fd2b3;

}
</style>