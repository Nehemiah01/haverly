<template>

    <div>
        <section class="card inline-block p-4 rounded-xl">
            <div class="flex justify-between">
                <p class="font-semibold text-lg">Calls</p>
                <img src="@/assets/menu.svg" alt="menu icon">
            </div>
            <ul>
                <li v-for="friend in friends" :key="friend" class="flex gap-4 items-center" :class="{borderr: !friends.lastItem}">
                    <div class="image my-2"></div>
                    <div>
                        <p class="font-semibold text-sm">{{friend.friendName}}</p>
                        <p class="last-message font-medium text-xs text-gray-500">{{friend.lastMessage}}</p>
                    </div>
                </li>
            </ul>
        </section>
    </div>

</template>

<script>
export default {
    data() {
        return {
            friends: [ 
                {id: 1, friendName: "John", lastMessage: "Okay, I'll tell her"},
                {id: 2, friendName: "Big man Gen🙌", lastMessage: "Very well then"},
                {id: 3, friendName: "Jamie", lastMessage: "Hangout on Saturday, who's down?👀"},
                {id: 4, friendName: "Tunde", lastMessage: "John! stopitt!😭😭😂"},
                {id: 4, friendName: "Mantayy", lastMessage: "John! stopitt!😭😭😂"},
                {id: 4, friendName: "Favour", lastMessage: "John! stopitt!😭😭😂"},
                {id: 4, friendName: "Inyii", lastMessage: "John! stopitt!😭😭😂"},
                {id: 4, friendName: "E A", lastMessage: "John! stopitt!😭😭😂"},
                {id: 4, friendName: "Bamzz", lastMessage: "John! stopitt!😭😭😂"},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

// .card {
//     display: flex;
//     place-items: center;
// }

</style>