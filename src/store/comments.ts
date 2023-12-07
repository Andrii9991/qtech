export default {
  namespaced: true,
  state: {
    allComments: [],
  },

  mutations: {
    setAllComments(state: any, newComments: []) {
      state.allComments = [...newComments];
    },
  },
};
