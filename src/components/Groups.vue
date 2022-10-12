<template>

    <div>
        <section class="card inline-block p-4 rounded-xl">
            <div class="flex justify-between">
                <p class="font-semibold text-lg">Groups</p>
                <img src="@/assets/menu.svg" alt="menu icon">
            </div>
            <ul>
                <li v-for="group in groups" :key="group" class="flex gap-4 items-center">
                    <div class="image my-2"></div>
                    <div>
                        <p class="font-semibold text-sm">{{group.groupName}}</p>
                        <p class="last-message font-medium text-xs text-gray-500">{{group.lastMessage}}</p>
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
            groups: [ 
                {id: 1, groupName: "Christian Twitter", lastMessage: "Okay, I'll tell her"},
                {id: 2, groupName: "Nigerian friends", lastMessage: "Very well then"},
                {id: 3, groupName: "American buddies", lastMessage: "Hangout on Saturday, who's down?👀"},
                {id: 4, groupName: "Haverim", lastMessage: "John! stopitt!😭😭😂"},

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