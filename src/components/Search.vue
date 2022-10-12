<template>
  
  <span class="flex">
    <img class="absolute search py-2" src="@/assets/search.svg" alt="">
    <input class="py-2 pl-12 pr-10 outline-none rounded-xl" type="text" name="" id="" placeholder="Search">
    <img class="absolute menu r-0 py-2" src="@/assets/menu.svg" alt="">
  </span>
  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    
span {
  margin-top: 1rem;
  position: absolute;
  left: 10rem;
}

.search {
  left: 20px;
  width: 15px;
  top: 4.5px;
}
.menu {
  right: 20px;
  top: 3px;
}

</style>