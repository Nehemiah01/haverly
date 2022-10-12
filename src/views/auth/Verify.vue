<template>

    <form class="flex flex-col place-items-center justify-center bg-gray-400">

        <div class="flex flex-col justify-between rounded-xl bg-white  w-1/2 py-5 px-10 text-center font-medium">

    
            <h5 class="card-title">Your email needs to be verified</h5>

            <p class="my-3">
                Please check your mailbox, We have sent you a verification email
                <br><br>
                Please ensure to check your spam folder if you don't see the mail
            </p>

            <p class="text-sm text-red-800 mt-5 mb-2" v-if="errMsg" role="alert">
                {{errMsg}}
            </p>
            
            <button 
                class="font-medium py-2 px-4 rounded border "
                :class="compCounter == 0 ? 'bg-blue-500 text-white' : 'text-gray-400 cursor-not-allowed'"
                :disabled="isReady" 
                type="button" 
                @click="resend">Resend Verification {{compCounter}}
            </button>

            
        </div>
    </form>
</template>

<script setup>
    import { auth } from "@/database"
    
    import { computed, ref, onMounted, onUnmounted } from 'vue';
    import { sendEmailVerification } from 'firebase/auth'

    const resendDisabled = ref('true');
    const counter = ref(60);
    var int = null;
    var compCounter = computed(() =>{ 
        if(resendDisabled.value == false) return ""; 
        else return "(" + counter.value + ")"
    });
    const errMsg = ref('');
    const isLoading = ref(false);
    const isReady = resendDisabled || isLoading;
    
    onMounted(() => {
        const counterValue = compCounter.value
        console.log(counterValue)
        disableButton();
    })
    onUnmounted(() => {
        clearInterval(int);
        int = null;
    })

    let disableButton = () => {
        if(int != null)
            clearInterval(int);
        counter.value = 60;
        resendDisabled.value = true; 
        int = setInterval(()=>
        { 
            if (counter.value <= 0) {
                resendDisabled.value = false; 
                clearInterval(int);
            }
            else  
            {
                counter.value--;
            }
        },1000)
    }
    const resend = async () => {
        isLoading.value = true

            await sendEmailVerification(auth.currentUser)
                .then((user) => {
                    console.log("test1")
                    console.log(user);
                    isLoading.value = false
                })
                .catch((error) => {
                    console.log(error)
                    switch (error.code) {
                        case 'auth/too-many-requests':
                            errMsg.value = 'You made to many requests please wait some time...'
                            break
                        default:
                            errMsg.value = "Resending verification failed..."
                            break
                    }  
                    isLoading.value = false
                
                   // console.log(this.errMsg)
                })
        disableButton();
    }

</script>

<style lang="scss" scoped>
    
    form {
        height: 100vh;
        width: 100vw;
        
        & > div {
            // min-width: 300px;
            padding-left: 2.5rem;
            padding-right: 2.5rem;
            width: 50%;
        }
    }

    @media screen and (max-width:768px) {
        form > div {
            width: 60%;
        }
    }

    @media screen and (max-width:500px) {
        form > div {
            width: 75%;
        }
    }

    @media screen and (max-width:420px) {
        form > div {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            width: 90%;
        }
    }

</style>