const { localStorage } = global.window;

const auth = {
  login(data) {
    localStorage.userId = data._id;
    localStorage.isProfileCompleted = data.isProfileCompleted;
    localStorage.me = JSON.stringify(data);
  },

  userId() {
    return localStorage.userId;
  },

  isLoginSuccess() {
    return !!localStorage.userId;
  },

  isProfileCompleted() {
    return localStorage.isProfileCompleted;
  },

  me() {
    return localStorage.me ? JSON.parse(localStorage.me) : {};
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
