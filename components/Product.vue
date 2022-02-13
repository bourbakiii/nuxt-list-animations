<template>
  <div class="product">
      <img src="@/assets/images/product.jpg" class="image">
      <p class="name">{{product.name}}</p>
      <span class="prices">
          <p class="price">{{price.toFixed(2) }}<IconsRouble scale='0.6'/></p>
          <p v-if='full_price' class="full-price">{{full_price.toFixed(2) }}<IconsRouble scale='0.6'/></p>
      </span>
      <transition-group tag='div' appear name='buttons' mode="in-out" class="buttons">
          <button v-if='!inCart' class="add" @click='crease'>+</button>
          <div v-else  class="crease-buttons">
          <button class="crease decrease" @click='decrease'>-</button>
          <span class="count">{{count}}</span>
          <button class="crease" @click='crease'>+</button>
          </div>
      </transition-group>
  </div>
</template>

<script>
export default {
    props:{
        product:{
            required: true
        }
    },
    computed:{
        price(){
            return this.product.discount_price??this.product.price;
        },
        full_price(){
            return this.product.price;
        },
        count(){
            return this.product.pivot.count??1;
        },
        inCart(){
            return !this.product.pivot?.count?true:false;
        }
    }
}
</script>

<style lang='scss' scoped>
    .product{
        width:100%;
        height:100%;
        border-radius: 15px;
        border:0.1px solid rgba(black,0.1);
        padding: 7px;
        overflow: hidden;
        display: flex;align-items: center;justify-content: flex-start;flex-direction:column;
        .image{
            border-radius: 15px;
            width:100%;
            object-fit: contain;
        }
        .name{
            max-width:100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: center;
            height:60%;
            margin:10px;
            @media screen and (max-width:425px) {
                font-size: 16px;
            }
        }
        .prices{
            width:100%;
            display: flex;align-items: flex-start; justify-content: flex-start;flex-direction: column;
        }
        .buttons{
            width:20px;
            height:20px;
            position: absolute;bottom:7px;right:7px;
            background-color: red;
        }
    }
</style>