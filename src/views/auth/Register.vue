<template>
    
    <form class="flex flex-col place-items-center justify-center">

        <div class="flex flex-col justify-between rounded-xl text-gray-200  w-1/2 py-5 px-10">

            <p class="text-xl font-medium text-center ">Sign up</p>
            <p class="mt-2 mb-3 text-sm">Sign up to start enjoying Haverly!</p>

            <input 
                class="py-1 px-3 rounded mb-4 outline-none text-black"
                type="text"
                placeholder="Name"
                aria-describedby="emailHelp"
                v-model="name"
                required
            >

            <input 
                class="py-1 px-3 rounded mb-4  outline-none text-black"
                type="email" 
                placeholder="Email address"
                aria-describedby="emailHelp"
                v-model="email"
                required
            >

            <!-- <div id="emailHelp" class="text-sm">We'll never share your email with anyone.</div> -->
                
            <input 
                class="py-1 px-3 rounded mb-6 outline-none text-black"
                type="password" 
                placeholder="Password"
                id="exampleInputPassword1" 
                v-model="password"
                required
            >

            
            <div class="text-sm text-red-500 mb-2" v-if="errMsg" role="alert">
                {{errMsg}}
            </div>
            
            <button 
                class="font-medium py-2 px-4 text-white rounded"
                type="button" 
                :disabled="isLoading"
                @click="register">Submit
            </button>

            <p class="my-3 text-center text-sm">or Sign up with Google</p>
            
            <button
                class="flex justify-center py-2 px-4 rounded"
                type="button"
                @click="loginGoogle"
            >
                <img src="@/assets/google-icon.png" alt="google icon" class="google-icon">
            </button>

            <p class="my-3 font-light text-sm text-center">Already a Haver?    
                <router-link to="/login" class="text-blue-500">Login here</router-link>
            </p>
            
        </div>

    </form>

</template>

<script setup>
import { auth } from "@/database"

import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
    GoogleAuthProvider,
    signInWithPopup,

    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    updateProfile 
} from 'firebase/auth'
const router = useRouter();
// const auth = getAuth();
const isLoading = ref(false);

const name = ref('');

const email = ref('');
const password = ref('');
const errMsg = ref('')
const debug = process.env.NODE_ENV !== 'production'
if(!debug){
    router.push('/login')
}


const register = async () => {
        isLoading.value = true
        
        await createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((user) => {
                if (user) {
                    updateProfile(auth.currentUser, {
                        displayName: name.value,
                        photoURL: 'https://joeschmoe.io/api/v1/male/random'
                    })
                    sendEmailVerification(auth.currentUser)

                    isLoading.value = false

                    console.log(user)
                    console.log(auth.currentUser) 
                    
                    router.push('/verify')
                }
                
                else if (user.emailVerified == true) {
                    console.log("Mail is verified!")
                }
            })
            .catch((error) => {
                console.log(error);
                isLoading.value = false
                    switch (error.code) {
                    case 'auth/invalid-email':
                        errMsg.value = 'The email address is badly formatted.'
                        break
                    case 'auth/email-already-exists':
                        errMsg.value = 'The email address is already in use by another account.'
                        break
                    case 'auth/weak-password':
                        errMsg.value = 'The password must be 6 characters long or more.'
                        break
                    default:
                        errMsg.value = 'There was a problem creating the account.'
                        break
                }
            })
}

const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(() => {
    console.log("User signed in");
    router.push("/");
  }).catch((error) => {
      isLoading.value = false;
      console.log(error);
      switch (error.code) {
        default:
          errMsg.value = "There was a problem signing up";
          break;
      }
    });
};

</script>

<style lang="scss" scoped>
    ::placeholder {
        color: #6b6b6b;
    }

    button {
        background-color: rgb(45, 45, 45);
    }
    
    .google-icon {
        width: 1.3rem;
    }
    
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

    form {
        height: 100vh;
        width: 100vw;
        background-color: rgb(22, 22, 22);
        
        & > div {
        background-color: rgb(30, 30, 30);
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