import { IUser } from "@/interfaces/users";

export default {
  namespaced: true,
  state: {
    username: "",
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    token: "",
    password: "",
    usersList: [],
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    setUsername(state: any, newUsername: string) {
      state.username = newUsername;
    },
    setPhoneNumber(state: any, newPhoneNumber: string) {
      state.phoneNumber = newPhoneNumber;
    },
    setFirstName(state: any, newFirstName: string) {
      state.firstName = newFirstName;
    },
    setLastName(state: any, newLastName: string) {
      state.lastName = newLastName;
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
      state.firstName = newUser.firstName;
      state.lastName = newUser.lastName;
      state.image = newUser.image;
      state.token = newUser.token;
    },

    logoutUser(state: any) {
      state.id = "";
      state.username = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.image = "";
      state.token = "";
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
