import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appMask: false,
    loggedIn: false,
    token: null,
    user: null,
    openSidebar: false
  },

  getters: {
    authorizationHeader: state => {
      return `Bearer ${state.token}`;
    },

    lists: state => {
      return state.user ? state.user.lists : [];
    },

    sharedLists: state => {
      return state.user ? state.user.shared_lists : [];
    }
  },

  mutations: {
    ADD_LIST(state, list) {
      state.user.lists.push(list);
    },

    REMOVE_LIST(state, list) {
      for (var index in state.user.lists) {
        if (state.user.lists[index].token === list.token) {
          state.user.lists.splice(index, 1);
        }
      }
    },

    UPDATE_LIST(state, list) {
      state.user.lists.forEach((l, index) => {
        if (l.token === list.token) {
          Vue.set(state.user.lists, index, list);
        }
      });
    },

    UPDATE_USER(state, user) {
      const newUser = { ...state.user, ...user };
      state.user = newUser;
    },

    SET_APP_MASK(state, appMask) {
      state.appMask = appMask;
    },

    SET_LISTS(state, lists) {
      state.user.lists = lists;
    },

    SET_LIST_EDIT_DATA(state, editData) {
      state.listEditData = editData;
    },

    SET_LIST_CRUD_ASIN(state, asin) {
      this.listCrudAsin = asin;
    },

    SET_LIST_CRUD_EDITING(state, editing) {
      this.listCrudEditing = editing;
    },

    SET_LIST_CRUD_MODAL_VISIBLE(state, visible) {
      state.listCrudModalVisible = visible;
    },

    SET_REGISTER_STEP_ONE(state, data) {
      state.registerStepOneCompleted = true;
      state.signupData.email = data.email;
      state.signupData.password = data.password;
    },

    SET_REGISTER_STEP_TWO(state, data) {
      state.signupData.first_name = data.first_name;
      state.signupData.last_name = data.last_name;
      state.signupData.username = data.username;
    },

    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, user) {
      state.user = user;
    },

    SET_LOGGED_IN(state, loggedIn) {
      state.loggedIn = loggedIn;
    }
  },

  actions: {
    appInit(store) {
      let jwt = localStorage.getItem("id_token");
      if (jwt) {
        store.commit("SET_TOKEN", jwt);
        store.dispatch("login");
      }
    },

    addList(store, list) {
      store.commit("ADD_LIST", list);
    },

    removeList(store, list) {
      store.commit("REMOVE_LIST", list);
    },

    hideAppMask(store) {
      store.commit("SET_APP_MASK", false);
    },

    getUser(store) {
      AuthService.user()
        .then(({ data: result }) => {
          store.dispatch("setUser", result.data);
        })
        .catch(error => {});
    },

    login(store, user) {
      store.commit("SET_LOGGED_IN", true);
      if (user) {
        store.dispatch("setUser", user);
      } else {
        store.dispatch("getUser");
      }
    },

    logout(store) {
      store.commit("SET_LOGGED_IN", false);
      store.commit("SET_USER", null);
    },

    saveToken(store, token) {
      if (token) {
        store.commit("SET_TOKEN", token);
        localStorage.setItem("id_token", token);
      }
    },

    setUser(store, user) {
      store.commit("SET_USER", user);
      localStorage.setItem("user", user);
    },

    updateUser(store, user) {
      store.commit("UPDATE_USER", user);
    },

    hideListCrudModal(store) {
      store.commit("SET_LIST_EDIT_DATA", null);
      store.commit("SET_LIST_CRUD_EDITING", false);
      store.commit("SET_LIST_CRUD_MODAL_VISIBLE", false);
    },

    showAndAddListCrudModal(store, asin) {
      store.commit("SET_LIST_CRUD_ASIN", asin);
      store.commit("SET_LIST_CRUD_MODAL_VISIBLE", true);
    },

    showListCrudModal(store, editData) {
      store.commit("SET_LIST_CRUD_EDITING", editData ? true : false);
      store.commit("SET_LIST_EDIT_DATA", editData ? editData : null);
      store.commit("SET_LIST_CRUD_MODAL_VISIBLE", true);
    },

    showAppMask(store) {
      store.commit("SET_APP_MASK", true);
    },

    submitRegisterStepOne(store, data) {
      store.commit("SET_REGISTER_STEP_ONE", data);
    },

    submitRegisterStepTwo(store, data) {
      store.commit("SET_REGISTER_STEP_TWO", data);
    },

    updateListCrudModal(store, value) {
      store.commit("SET_LIST_CRUD_MODAL_VISIBLE", value);
    },

    updateList(store, list) {
      store.commit("UPDATE_LIST", list);
    },

    updateLists(store, lists) {
      store.commit("SET_LISTS", lists);
    }
  }
});
