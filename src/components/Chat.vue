<template>

    <div class="flex justify-center">
        <section class="card big-card px-10 py-4">
            <div class="chat-header flex justify-between items-center pb-3 border-b">
                <div class="flex gap-4 items-center">
                    <div class="image"></div>
                    <div>
                        <p class="font-semibold">Bright</p>
                        <p class="last-message font-medium text-xs">Online</p>
                    </div>
                </div>

                <div class="flex gap-6 items-center">
                    <img src="@/assets/call.svg" alt="call icon">
                    <img src="@/assets/video-camera.svg" alt="video-camera icon">
                    <img src="@/assets/menu.svg" alt="menu icon">
                </div>
            </div>
        </section>
    </div>

</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

// .card {
//     display: flex;
//     place-items: center;
// }


.big-card {
    max-width: 40rem;
}

.unread {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: hsl(240, 31%, 55%);
    font-size: 0.6rem;
    justify-self: end;
}

</style>