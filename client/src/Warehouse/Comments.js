import axios from 'axios';


const state = {
    token: localStorage.getItem('token') || '',
    comments: [],
    status: '',
    commentErrors : null
};

const getters = {
    comments: state => state.comments,
    commentErrors: state => state.commentErrors
};

const actions = {
  // Create a Comment
  async createComment({ commit }, commentData) {
    try {
          /* eslint-disable no-console */
     console.log("THIS COMMENT",this);
     /* eslint-enable no-console */
        commit('createComment_request');
        let res = await axios.post("http://localhost:3000/users"+window.document.location.pathname+"/comment", commentData);

    if (res.data.success !== undefined) {
        commit('createComment_success');
    }
    return res;
    } catch (err) {
        commit('createComment_error',err);
    }
}
};
const mutations = {
    createComment_request(state) {
        state.error = null
        state.status = 'loading'
    },
    createComment_success(state) {
        state.error = null
        state.status = 'success'
    },
    createComment_error(state,err) {
        state.commentErrors = err.response.data.message
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};