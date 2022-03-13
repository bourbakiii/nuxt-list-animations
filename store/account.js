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
  if (!name || !value) console.log(`%cПереданы не все параметры - name:${name ?? 'ПУСТО'}, value:${value ?? 'ПУСТО'}`,'background-color:orange;color:white;font-size:15px;');
  if (typeof localStorage != undefined) {
    if(!value && name) return localStorage.removeItem(name);
    else if(value && name) localStorage.setItem(name, value);
  }
  else alert('LocalStorage не прогружен');
}
export const mutations = {
  set_account(state, data) {
    Object.assign(state, { ...data });
    save_at_local({ name: 'token', value:state.token });
  },
  clear_account(state){
    state = {
      email: null,
      father_name: null,
      image: null,
      name: null,
      permission: "guest",
      surname: null,
      token: null,
      verification: false,
      _id: null,
    }
    console.log('УОУ БЛЯ');
    console.log(state);
    save_at_local({ name: 'token', value:state.token });
  }
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
      state.commit('clear_account')
    })
  }
};
