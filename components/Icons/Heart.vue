


<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="16*scale" :height="16*scale" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
</template>

<script>
export default {
    props:{
        scale: {
            default:1
        }
    }
}
</script>
