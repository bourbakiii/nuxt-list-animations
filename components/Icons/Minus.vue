

<template>

<svg :width="12*scale" :height="2*scale" viewBox="0 0 12 2" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5312 0.708984H0.46875C0.209859 0.708984 0 0.918844 0 1.17773C0 1.43663 0.209859 1.64648 0.46875 1.64648H11.5312C11.7901 1.64648 12 1.43663 12 1.17773C12 0.918844 11.7901 0.708984 11.5312 0.708984Z"/>
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
