<template>
  
  <form class="flex flex-col place-items-center justify-center bg-gray-400">
    
    <div class="flex flex-col justify-between rounded-xl bg-white py-5">
      <p class="text-xl font-semibold text-center">Welcome back!</p>
      <p class="mt-2 mb-3 text-sm">Sign in to continue enjoying Haverly!</p>
      
      <input
        class="py-1 px-3 rounded mb-5 border border-gray-400 outline-none"
        type="email"
        placeholder="Email address"
        aria-describedby="emailHelp"
        v-model="email"
      />
      
      <input
        class="py-1 px-3 rounded mb-1 border border-gray-400 outline-none"
        type="password"
        placeholder="Password"
        id="exampleInputPassword1"
        v-model="password"
      />
      <router-link to="/password-reset" class="mb-5 text-sm font-medium text-blue-500">Forgot password?</router-link>

      <p class="text-sm text-red-800 mb-2" v-if="errMsg" role="alert">
        {{ errMsg }}
      </p>

      <button
        class="font-medium py-2 px-4 bg-blue-500 text-white rounded"
        type="submit"
        :disabled="isLoading"
        @click="login"
      >
        Login
      </button>

      <hr>

      <p class="my-3 text-center text-sm font-medium">or Sign in with Google</p>
      
      <button
        class="flex justify-center py-2 px-4 rounded bg-gray-300 border"
        type="button"
        @click="loginGoogle"
      >
        <img src="@/assets/google-icon.png" alt="google icon" class="google-icon">
      </button>


      <p class="my-3 text-sm text-center">Don't have an account? <router-link
        to="/register" class="text-blue-500">Sign up here</router-link>
      </p>
      
    </div>
    
  </form>

</template>



<script setup> //setup was here
import { auth } from "@/database"

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  connectAuthEmulator,
} from "firebase/auth";

// import {
//   connectAuthEmulator,
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword, signOut,
//   onAuthStateChanged
// } from 'firebase/auth'

const router = useRouter();
const isLoading = ref(false);
const email = ref("");
const password = ref("");
const errMsg = ref("");


const login = async () => {
  isLoading.value = true;
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      isLoading.value = false;
      console.log(user)
      router.push("/");
    })
    .catch((error) => {
      isLoading.value = false;
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
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
          errMsg.value = "There was a problem logging in";
          break;
      }
    });
};

// connectAuthEmulator(auth, "http://localhost:2001")

// onMounted(() => {
//   connectAuthEmulator(auth, "http://localhost:2001")
//   console.log("hello emulator")
// })




// export default {
  
//   mounted() {
//     const auth = getAuth()
//     connectAuthEmulator(auth, "http://localhost:2001")

//   },
  
//   methods: {
//     login() {

//       const userCred = await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
//     },
    


</script>

<style lang="scss" scoped>

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