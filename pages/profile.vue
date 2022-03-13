<template>
  <div class="page">
    <button @click="sign_out" class="logout">Выход</button>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  methods: {
    sign_out() {
      if(!this.token) return console.log("%cНе удалось выйти, токен пуст","background-color:red;color:white;font-size:16px;");
      this.$axios.put("/user/logout", { token: this.token }).then(({data})=>{
        console.log("logout result");
        console.log(data);
      }).catch((error)=>{
        console.log('logout error:');
        console.log(error);
      });
    },
  },
  computed: {
    token() {
      return this.$store.state.account.token;
    },
  },
};
</script>

<style lang="scss" scoped>
.logout {
  background-color: $red;
  color: $white;
  border-radius: 15px;
  padding: 10px;
  border: none;
  outline: none;
}
</style>
