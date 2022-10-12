<template>

    <div class="flex justify-center">
        <section class="card inline-block p-4 rounded-xl">
            <div class="flex justify-between">
                <p class="font-semibold text-lg">Friends</p>
                <img src="@/assets/menu.svg" alt="menu icon">
            </div>
            <ul>
                <li v-for="(friend, index) in friends" :key="friend" class="flex gap-4 items-center" :class="{ 'borderr': index != friends.length -1 }">
                    <!-- <div class="image my-2"> -->
                    <img class="my-2 b-radius" :src="friend.photoUrl" alt="">
                    <!-- </div> -->
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
                {id: 1, friendName: "John", lastMessage: "Okay, I'll tell her", photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`},
                {id: 2, friendName: "Big man Gen🙌", lastMessage: "Very well then",photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`},
                {id: 3, friendName: "Jamie", lastMessage: "Hangout on Saturday, who's down?👀", photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`},
                {id: 4, friendName: "Tunde", lastMessage: "John! stopitt!😭😭😂", photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`},
                {id: 4, friendName: "Mantayy", lastMessage: "John! stopitt!😭😭😂", photoUrl: `https://randomuser.me/api/portraits/thumb/women/${Math.floor(Math.random()*100)}.jpg`},
                {id: 4, friendName: "Favour", lastMessage: "John! stopitt!😭😭😂", photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`},
                {id: 4, friendName: "Inyii", lastMessage: "John! stopitt!😭😭😂", photoUrl: `https://randomuser.me/api/portraits/thumb/women/${Math.floor(Math.random()*100)}.jpg`},
                {id: 4, friendName: "E A", lastMessage: "John! stopitt!😭😭😂", photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`},
                {id: 4, friendName: "Bamzz", lastMessage: "John! stopitt!😭😭😂", photoUrl: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random()*100)}.jpg`}
            ]                
        }
    },
    mounted() {
        this.friends.forEach(person => {
            person.photoUrl
        });
    }
}
</script>

<style lang="scss" scoped>

// .card {
//     display: flex;
//     place-items: center;
// }

.b-radius {
    border-radius: 50%;
}

</style>