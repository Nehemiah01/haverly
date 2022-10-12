<template>

    <div>
        <section class="card inline-block p-4 rounded-xl">
            <div class="flex justify-between">
                <p class="font-semibold text-lg">Recents</p>
                <img src="@/assets/menu.svg" alt="menu icon">
            </div>
            <ul>
                <li v-for="group in groups" :key="group" class="flex justify-between items-center">
                    <div class="flex items-center">
                        <div class="image my-2 mr-4"></div>
                        <div>
                            <p class="font-semibold text-sm">{{group.groupName}}</p>
                            <p class="last-message font-medium text-xs text-gray-500">{{group.lastMessage}}
                            </p>
                        </div>
                    </div>

                    <div v-if="group.unread > 99" class="unread text-white flex items-center justify-center">{{ displayUnread }}</div>
                    <div v-else class="unread text-white flex items-center justify-center">{{ group.unread }}</div>

                </li>
            </ul>
        </section>
    </div>

</template>

<script>
export default {
    data() {
        return {
            groups: [ 
                {id: 1, groupName: "Christian Twitter", lastMessage: "Okay, I'll tell her", unread:1},
                {id: 2, groupName: "Nigerian friends", lastMessage: "Very well then", unread:3},
                {id: 3, groupName: "American buddies", lastMessage: "Hangout on Saturday, who's down?👀", unread:34},
                {id: 4, groupName: "Haverim", lastMessage: "John! stopitt!😭😭😂", unread:19},
                {id: 4, groupName: "The Good Gate", lastMessage: "Children of God! It's time to pray", unread:192}
            ],
            displayUnread: '99+'
        }
    }
}
</script>

<style lang="scss" scoped>

// .card {
//     display: flex;
//     place-items: center;
// }

.unread {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: hsl(240, 31%, 55%);
    font-size: 0.6rem;
    justify-self: end;
}

</style>