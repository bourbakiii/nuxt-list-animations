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
function save_at_local({
  name = null,
  value = null }) {
  if (!name || !value) return alert(`Переданы не все параметры - name:${name ?? 'ПУСТО'}, value:${value ?? 'ПУСТО'}`);
  if (typeof localStorage != undefined) localStorage.setItem(name, value);
  else alert('LocalStorage не прогружен');
}
export const mutations = {
  set_account(state, data) {
    Object.assign(state, { ...data });
    save_at_local({ name: 'token', value:data.token });
  },
};

export const actions = {
  action(state, { action, ...props }) {
    action(state, props);
  },
  getByToken(state, token){
    if(!token) return;
    this.$axios.get(`/api/user?token=${token}`,{
      
    }).then(({data})=>{
      console.log("the data is");
      console.log(data);
      state.commit('set_account', data.user);
    }).catch((error)=>{
      console.log('Error is:');
      console.log(console.log(error));
    })
  }
};
