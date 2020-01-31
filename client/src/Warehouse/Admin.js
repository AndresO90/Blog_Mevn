import axios from 'axios';
import router from '../router/index'

const state = {
    adminToken: localStorage.getItem('Admintoken') || '',
    admin:{},
    adminStatus: '',
    adminError: null,
    postAdminErrors:null,
    commentAdminErrors:null,
    offWords:[]
};

const getters = {
    isAdmin: state => !!state.adminToken,  
    admin: state => state.admin,
    adminError: state => state.adminError,
    authAdminState: state => state.adminStatus,
    postAdminErrors:state => state.postAdminErrors,
    offWords: state => state.offWords
};

const actions = {
  //Login Admin Action
  async loginAdmin({commit}, admin) {
    commit('authAdmin_request');
    try {
    const res = await axios.post("http://localhost:3000/admin/login", admin);
          
    if (res.data.success) {
    const adminToken = res.data.Admintoken;
    const admin = res.data.admin;
    localStorage.setItem('Admintoken',adminToken);
    axios.defaults.headers.common['Authorization'] = adminToken;
    commit('authAdmin_success', adminToken, admin);
    }
    return res;
    } catch (err) {
        commit('authAdmin_error',err);
    }
},
 // Get the admin Profile
 async getAdminProfile({commit}) {
    commit('adminProfile_request');
    let res = await axios.get('http://localhost:3000/admin/profile');
    commit('admin_profile', res.data.admin)
    return res;
},
  // Logout the Admin
  async adminLogout({commit}) {
    await localStorage.removeItem('token');
    commit('adminLogout');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
    return
},
  //  Create new Post
    async createAdminPost({ commit }, postData) {
        try {
            /* eslint-disable no-console */
            console.log("THIS NEW POST",this);
          /* eslint-enable no-console */
            let res = await axios.post("http://localhost:3000/admin/"+this.getters.admin._id+"/post", postData);
            commit('createAdminPost_request'); 
        if (res.data.success !== undefined) {
            commit('createAdminPost_success');
        }
        return res;
        } catch (err) {
            commit('createAdminPost_error',err);
        }
    },
  // Edit Post
       async editAdminPost({commit},data) {
        const idAdmin = this.getters.admin._id
        try {   
            commit('editAdminPost_request');
            let res = await axios.put("http://localhost:3000/admin/"+idAdmin+"/post/"+data.editPostId, data.editPost);
        if (res.data.success) {
            commit('editAdminPost_success');
        }
        return res;
        } catch (err) {
            commit('editAdminPost_error',err);
        }
    },
    // Delete a Post
    async deleteAdminPost({commit},idPost) {
        const idAdmin = this.getters.admin._id;
        try {   
            commit('deleteAdminPost_request');
            let res = await axios.delete("http://localhost:3000/admin/"+idAdmin+"/post/"+idPost);
        if (res.data.success) {
            commit('deleteAdminPost_success');
        }
        return res;
        } catch (err) {
            commit('deleteAdminPost_error',err);
        }
    },
      // Create a Comment
  async createAdminComment({ commit }, commentData) {
    const idAdmin = this.getters.admin._id;
    try {
          /* eslint-disable no-console */
     console.log("THIS COMMENT",this);
     /* eslint-enable no-console */
        commit('createAdminComment_request');
        let res = await axios.post("http://localhost:3000/admin/"+idAdmin+window.document.location.pathname+"/comment", commentData);

    if (res.data.success !== undefined) {
        commit('createAdminComment_success');
    }
    return res;
    } catch (err) {
        commit('createAdminComment_error',err);
    }
},
  // Edit Comment
  async editAdminComment({commit},data) {
    const idAdmin = this.getters.admin._id
    try {   
        commit('editAdminComment_request');
        let res = await axios.put("http://localhost:3000/admin/"+idAdmin+"/post/"+data.editPostId+"/comment/:id", data.editPost);
    if (res.data.success) {
        commit('editAdminPost_success');
    }
    return res;
    } catch (err) {
        commit('editAdminPost_error',err);
    }
},
 // Delete a Comment
 async deleteAdminComment({commit},idComment) {
    const idAdmin = this.getters.admin._id;
    
    try {   
        commit('deleteAdminComment_request');
        let res = await axios.delete("http://localhost:3000/admin/"+idAdmin+window.location.pathname+"/comment/"+idComment);
    if (res.data.success) {
        commit('deleteAdminComment_success');
    }
    return res;
    } catch (err) {
        commit('deleteAdminComment_error',err);
    }
},
// Get All Offensive Words
async getOffWords({commit}) {
    const idAdmin = this.getters.admin._id;
    commit('getOffWords_request');
    let res = await axios.get("http://localhost:3000/admin/"+idAdmin+"/offwords");
    /* eslint-disable no-console */
    console.log("RES OFF WORDS",res);
    /* eslint-enable no-console */
    commit('getOffWords', res.data)
    return res;
},
//  Create an OffensiveWord
async createOffensiveWord({ commit }, offWordData) {
    try {
        /* eslint-disable no-console */
        console.log("THIS NEW POST",this);
      /* eslint-enable no-console */
      const idAdmin = this.getters.admin._id;
        let res = await axios.post("http://localhost:3000/admin/"+idAdmin+"/offword", offWordData);
        commit('createOffWord_request'); 
    if (res.data.success !== undefined) {
        commit('createOffWord_success');
    }
    return res;
    } catch (err) {
        commit('createOffWord_error',err);
    }
},
 // Delete an OffensiveWord
 async deleteOffensiveWord({commit},idOffWord) {
    const idAdmin = this.getters.admin._id;
    try {   
        commit('deleteOffensiveWord_request');
        let res = await axios.delete("http://localhost:3000/admin/"+idAdmin+"/offword/"+idOffWord);
    if (res.data.success) {
        commit('deleteOffensiveWord_success');
    }
    return res;
    } catch (err) {
        commit('deleteOffensiveWord_error',err);
    }
},
// Edit OffensiveWord
async editOffensiveWord({commit},data) {
    const idAdmin = this.getters.admin._id
    /* eslint-disable no-console */
    
    // console.log("editOffWord!!!",editOffWord);
    /* eslint-enable no-console */
    try {   
        const idOffWord = data.editOffWordId;
        const editOffWord = data.editOffWord;
        commit('editOffensiveWord_request');
        let res = await axios.put("http://localhost:3000/admin/" + idAdmin + "/offword/" + idOffWord, editOffWord);
    if (res.data.success) {
        commit('editOffensiveWord_success');
    }
    return res;
    } catch (err) {
           /* eslint-disable no-console */
     console.log(err);
    /* eslint-enable no-console */
    }
},


};
const mutations = {
    authAdmin_request(state) {
        state.error = null
        state.adminStatus = 'loading'
    },
    authAdmin_success(state,adminToken,admin) {
        state.adminToken = adminToken
        state.admin = admin
        state.adminStatus = 'success'
        state.error = null
    },
    authAdmin_error(state,err) {
        state.adminError = err.response.data.msg
    },
    adminLogout(state) {
        state.adminError = null
        state.adminStatus = ''
        state.adminToken = ''
        state.admin = ''
    },
    createAdminPost_request(state) {
        state.adminError = null
        state.adminStatus = 'loading'
    },
    createAdminPost_success(state) {
        state.adminError = null
        state.adminStatus = 'success'
    },
    createAdminPost_error(state,err){
        state.postAdminErrors = err.response.data
    },
    adminProfile_request(state) {
        state.adminStatus = 'loading'
    },
    admin_profile(state, admin) {
        state.admin = admin
    }, 
    editAdminPost_request(state) {
        state.adminStatus = 'loading',
        state.postAdminErrors = null
    },
    editAdminPost_success(state) {
        state.adminStatus = 'success',
        state.postAdminErrors = null
    },
    editAdminPost_error(state,err) {
        state.postAdminErrors = err.response.data.message
    },
    
    createAdminComment_request(state) {
        state.commentAdminErrors = null
        state.adminStatus = 'loading'
    },
    createAdminComment_success(state) {
        state.commentAdminErrors = null
        state.adminStatus = 'success'
    },
    createAdminComment_error(state,err) {
        state.commentAdminErrors = err.response.data.message
    },
    editAdminComment_request(state) {
        state.adminStatus = 'loading',
        state.commentAdminErrors = null
    },
    editAdminComment_success(state) {
        state.adminStatus = 'success',
        state.commentAdminErrors = null
    },
    editAdminComment_error(state,err) {
        state.commentAdminErrors = err.response.data.message
    },
    deleteAdminComment_request(state) {
        state.adminStatus = 'loading'
    },
    deleteAdminComment_success(state) {
        state.adminStatus = 'success'
    },
    deleteAdminComment_error(state,err) {
        state.commentAdminErrors = err
    },
    getOffWords_request(state) {
        state.adminStatus = 'loading'
    },
    getOffWords(state, offWords) {
        state.offWords = offWords
    },
    createOffWord_request(state) {
        state.adminError = null
        state.adminStatus = 'loading'
    },
    createOffWord_success(state) {
        state.adminError = null
        state.adminStatus = 'success'
    },
    createOffWord_error(state,err){
        state.postAdminErrors = err.response.data
    },
    deleteOffensiveWord_request(state) {
        state.adminStatus = 'loading'
    },
    deleteOffensiveWord_success(state) {
        state.adminStatus = 'success'
    },
    editOffensiveWord_request(state) {
        state.adminStatus = 'loading'    },
    editOffensiveWord_success(state) {
        state.adminStatus = 'success'
    },
    
};

export default {
    state,
    actions,
    mutations,
    getters
};