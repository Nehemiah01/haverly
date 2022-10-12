<template>

    <form class="flex flex-col place-items-center justify-center bg-gray-400">

        <div class="flex flex-col justify-between rounded-xl bg-white  w-1/2 py-5 px-10">

            <h5 class="text-xl font-semibold text-center">Reset password</h5>
            <p class="mt-2 mb-3 text-sm">Please enter your email address if you want to reset your password</p>

            
            <input 
                class="py-1 px-3 rounded mb-5 border border-gray-400 outline-none"
                type="email" 
                placeholder="Email address"
                aria-describedby="emailHelp"
                v-model="email"
            >

            <div class="text-sm text-red-800 mb-2" v-if="errMsg" role="alert">
                {{errMsg}}
            </div>
            
            <button 
                class="font-medium py-2 px-4 bg-blue-500 text-white rounded"
                type="submit" 
                :disabled="isLoading"
                @click="login">Reset Password</button>
                
        </div>
    </form>
</template>

<script setup>
    import { auth } from "@/database"
    
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { sendPasswordResetEmail } from 'firebase/auth'

    const router = useRouter()
    const isLoading = ref(false)
    const email = ref('')
    const errMsg = ref('')
    const login = async () => {
            isLoading.value = true
            await sendPasswordResetEmail(auth, email.value)
                .then(() => {
                    isLoading.value = false;
                    alert("PasswordReset Send")
                 //   router.push('/')
                })
                .catch((error) => {
                    isLoading.value = false
                    switch (error.code) {
                        case 'auth/invalid-email':
                            errMsg.value = 'Invalid email'
                            break
                        case 'auth/user-not-found':
                            errMsg.value = 'No account with that email was found'
                            break
                        case 'auth/wrong-password':
                            errMsg.value = 'Incorrect password'
                            break
                        default:
                            errMsg.value = 'Email or password was incorrect'
                            break
                    }
                })
       
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