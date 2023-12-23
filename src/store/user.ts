import { IUser } from "@/interfaces/users";

export default {
  namespaced: true,
  state: {
    username: "",
    email: "",
    password: "",
    usersList: [],
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    setUsername(state: any, newUsername: string) {
      state.username = newUsername;
    },

    setEmail(state: any, newEmail: string) {
      state.email = newEmail;
    },
    setPassword(state: any, newPassword: string) {
      state.password = newPassword;
    },

    setUser(state: any, newUser: IUser) {
      state.id = newUser.id;
      state.username = newUser.username;
      state.email = newUser.email;
    },

    logoutUser(state: any) {
      state.username = "";
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
    },

    setUserData(state: any, newUsersList: IUser[]) {
      state.usersList = [...newUsersList];
    },
    authUser(state: any) {
      state.isAuthenticated = true;
    },
  },
};
