<template>
  <div class="wrapper alerts">
      <AlertsItem v-for='(item, index) in items' :key='index' :item='item'/>
  </div>
</template>

<script>
export default {
    computed:{
        items(){
            return this.$store.state.alerts.items;
        }
    }
}
</script>

<style lang="scss" scoped>
    .alerts{
        position: fixed; bottom:0px; right:0px;
        height:400px; width: 600px;
        border-radius: 15px 0px 0px 0px;
        background-color: rgba(100,100,100,0.2);
        backdrop-filter: blur(3px);
        z-index: $modalsZIndex;
        display: flex;align-items: center;justify-content: flex-end;flex-direction: column;    }
</style>