import axios from 'axios';
// import router from '../router/index'

const state = {
    token: localStorage.getItem('token') || '',
    posts: [],
    status: '',
    post:[],
    postStatistics:{},
    popularPost:[],
    postErrors : null
};

const getters = {
    posts: state => state.posts,
    postStatistics: state => state.postStatistics,
    popularPost: state => state.popularPost,
    post: state => state.post,
    postErrors: state => state.postErrors
};

const actions = {
 
    // Get all Posts
    async getAllPosts({commit}) {
        commit('posts_request');
        let res = await axios.get('http://localhost:3000/posts');
        commit('posts_data', res.data.posts)
        return res;
    },
    // Get All Post Statistics
    async getPostStatistics({commit}) {
        commit('postStatistics_request');
        let res = await axios.get('http://localhost:3000/posts/statistics');
        commit('postStatistics_data', res.data)
        return res;
    },
     // Get Most Popular Post
     async getMostPopularPosts({commit}) {
        commit('MostPopularPosts_request');
        let res = await axios.get('http://localhost:3000/posts/popular');
        commit('MostPopularPosts_data', res.data.posts)
        return res;
    },  
    //  Get a specific Post
    async getSpecificPost({commit}) {
        commit('post_request');
        let res = await axios.get('http://localhost:3000'+window.document.location.pathname);
        commit('post_data', res.data.post)
        return res;
    },
    //  Create new Post
    async createPost({ commit }, postData) {
        try {
            let res = await axios.post("http://localhost:3000/users/createpost", postData);
            commit('createPost_request'); 
        if (res.data.success !== undefined) {
            commit('createPost_success');
        }
        return res;
        } catch (err) {
            commit('createPost_error',err);
        }
    },
    // Get All Post from User without comments
    async getAllUserPosts({commit},profile) {
        commit('getAllUserPosts_request');
        let res = await axios.get('http://localhost:3000/users/'+profile.data.user._id+'/post');
        commit('getAllUserPosts_data', res.data.posts)
        return res;
    },
    // Delete a Post
    async deletePost({commit},idPost) {
        const idUser = this.getters.user._id;
        try {   
            commit('deletePost_request');
            let res = await axios.delete("http://localhost:3000/users/"+idUser+"/post/"+idPost);
        if (res.data.success) {
            commit('deletePost_success');
        }
        return res;
        } catch (err) {
            commit('deletePost_error',err);
        }
    },
    // Edit Post
    async editPost({commit},data) {
        const idUser = this.getters.user._id
        try {   
            commit('editPost_request');
            let res = await axios.put("http://localhost:3000/users/"+idUser+"/post/"+data.editPostId, data.editPost);
        if (res.data.success) {
            commit('editPost_success');
        }
        return res;
        } catch (err) {
            commit('editPost_error',err);
        }
    },
    // Add Like's
    async addLike({commit}) {
        const postId = this.getters.post._id;
        try {   
            commit('addLike_request');
            let res = await axios.post("http://localhost:3000/users/post/"+postId+"/like");
        if (res.data.success) {
            commit('addLike_success');
        }
        return res;
        } catch (err) {
            commit('addLike_error',err);
        }
    }
};
const mutations = {
    posts_request(state) {
        state.status = 'loading'
    },
    posts_data(state,posts) {
        state.posts = posts
    },

    postStatistics_request(state) {
        state.status = 'loading'
    },
    postStatistics_data(state,statistics) {
        state.postStatistics = statistics;
    },

    MostPopularPosts_request(state) {
        state.status = 'loading'
    },
    MostPopularPosts_data(state,popularPost) {
        state.popularPost = popularPost;
    },

    post_request(state) {
        state.status = 'loading'
    },
    post_data(state,post) {
        state.post = post
    },

    createPost_request(state) {
        state.error = null
        state.status = 'loading'
    },
    createPost_success(state) {
        state.error = null
        state.status = 'success'
    },
    createPost_error(state,err){
        state.postErrors = err.response.data
    },

    getAllUserPosts_request(state) {
        state.status = 'loading'
    },
    getAllUserPosts_data(state,posts) {
        state.posts = posts
    },

    deletePost_request(state) {
        state.status = 'loading'
    },
    deletePost_success(state) {
        state.status = 'success'
    },
    deletePost_error(state,err) {
        state.error = err
    },

    editPost_request(state) {
        state.status = 'loading',
        state.error = null
    },
    editPost_success(state) {
        state.status = 'success',
        state.error = null
    },
    editPost_error(state,err) {
        state.postErrors = err.response.data.message
    },

    addLike_request(state) {
        state.error = null
        state.status = 'loading'
    },
    addLike_success(state) {
        state.error = null
        state.status = 'success'
    },
    addLike_error(state,err) {
        state.postErrors = err.response.data.message
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};