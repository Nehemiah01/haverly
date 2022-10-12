<template>
  <nav class="flex flex-col justify-between items-center">
    <div class="image"></div>

    <div role="navigation" class="flex flex-col gap-10">
        <img src="@/assets/house.svg" alt="home icon">
        
        <img src="@/assets/chat.svg" alt="chat icon">
        
        <img src="@/assets/notification.svg" alt="notification icon">
        
        <img src="@/assets/setting.svg" alt="setting icon">
    </div>

    <img src="@/assets/login-2.svg" alt="login icon">
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

nav {
  background-color: #1A66FF;
  height: 100vh;
  position: fixed;
  padding: 1.5rem 3rem;
}

img {
  width: 1.3rem;
}

.image {
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  background-color: #e4e0e0;
}

</style>