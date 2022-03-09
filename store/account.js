export const state = () => ({
  email: null,
  father_name: null,
  image: null,
  name: null,
  permission: "guest",
  surname: null,
  token: null,
  verification: false,
  _id: null,
});
export const mutations = {
  set_user(state, data) {
    console.log("ало блять");
    Object.assign(state, data);
  },
};

export const actions = {
  action(state, { action, ...props }) {
    action(state, props);
  },
};
