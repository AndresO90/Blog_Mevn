<template>
    <div>
    <div class="row">
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Register</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="registerUser">
                        <div class="form-group">
                            <label for="userName">Username</label>
                            <input id="userName" type="text" placeholder="Username" v-model="userName" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input id="name" type="text" placeholder="Name" v-model="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input id="email" type="email" placeholder="Email" v-model="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" placeholder="Password" v-model="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input id="confirm_password" type="password" placeholder="Confirm Password" v-model="confirm_password" class="form-control">
                        </div>
                        <button class="btn btn-primary">Register</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/login" class="card-link" id="alreadyAccount">Already have an Account??</router-link>
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
            password:"",
            confirm_password:"",
            name:"",
            email:""
        };
    },
    methods: {
        ...mapActions(['register']),
        async registerUser() {
            let user = {
                userName: this.userName,
                password: this.password,
                confirm_password: this.confirm_password,
                email: this.email,
                name: this.name
            }
            try {
              const res = await this.register(user)
                if(res.data.success) {
                    this.$router.push("login")
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
</script>
<style scoped>
.card {
    width: 60%;
    border-radius: 1;
    margin-top: 15%;
}
.btn {
      border-radius: 1;
}
.form-control {
        border-radius: 1;
}
#alreadyAccount {
        color: #5fd2b3;

}
</style>