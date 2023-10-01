export default {
  namespaced: true,
  state: {
    name: "",
    email: "",
    password: "",
  },
  getters: {},
  mutations: {
    setName(state: any, newName: string) {
      state.name = newName;
    },
    setEmail(state: any, newEmail: string) {
      state.email = newEmail;
    },
    setPassword(state: any, newPassword: string) {
      state.password = newPassword;
    },
  },
};
