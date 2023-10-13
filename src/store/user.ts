import { IUser } from "@/interfaces/users";

export default {
  namespaced: true,
  state: {
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
    password: "",
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

    setUsers(state: any, newUser: IUser) {
      state.id = newUser.id;
      state.username = newUser.username;
      state.email = newUser.email;
      state.firstName = newUser.firstName;
      state.lastName = newUser.lastName;
      state.gender = newUser.gender;
      state.image = newUser.image;
      state.token = newUser.token;
    },
  },
};
