<template>
    <div
        class="col-xs-4 flex justify-center"
        id="talkjs-container"
        ref="talkjs-container"
        style="width: 90%; margin-top: 10px; height: 500px"
    >

        <i>Loading chat...</i>

    </div>
</template>

<!-- <script>
import Talk from "talkjs"

export default {
    name: "MessageBox",
    data() {
        return {
            conversation: null,
            inbox: null,
        };
    },
    props: {
        currentUser: {
            type: Object,
            required: true,
        },
    },
    
    mounted() {
        console.log(this.currentUser)
        console.log(process.env.VUE_APP_APP_ID)

        Talk.ready.then(() => {
            // creating our user
            var me = new Talk.User({
                id: this.currentUser.id,
                name: this.currentUser.name,
                email: this.currentUser.email,
                photoUrl: "https://randomuser.me/api/portraits/men/83.jpg\\",
                role: "default",
            });

            // creating other users
            var other = new Talk.User({
                id: "654321",
                name: "Sebastian",
                email: "Sebastian@example.com",
                photoUrl: "https://randomuser.me/api/portraits/men/69.jpg",
                welcomeMessage: "Hey, how can I help?",
                role: "default",
            });

            // establishing a new session if one doesn\'t already exists*
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: process.env.VUE_APP_APP_ID,
                    me: me,
                });
            }

            // connecting to a new or already existing conversation
            this.conversation = window.talkSession.getOrCreateConversation("1001");
            this.conversation.setAttributes({ subject: "Computational Theory 101"});

            // adding participants

            this.conversation.setParticipant(me);
            this.conversation.setParticipant(other);

            // creating the actual inbox/chatbox
            this.inbox = window.talkSession.createInbox({
                selected: this.conversation,
            });

            this.$nextTick(() => {
                // console.log(this.show, this.$refs.content);
                this.inbox.mount('this.$refs.talkjs-container')
            });
        })

        
    }
}

</script> -->

<style lang="scss" scoped>

</style>