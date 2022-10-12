import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'


// const config =
// 	import.meta.env.MODE === 'development'
// 		? JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG)
// 		: JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG_PUBLIC)

const firebaseConfig = {
    apiKey: "AIzaSyAjZHuJTydLRwqKuSme6QpG8xd0sIYY0-0",
    authDomain: "haver-app-a54cd.firebaseapp.com",
    projectId: "haver-app-a54cd",
    storageBucket: "haver-app-a54cd.appspot.com",
    messagingSenderId: "375924742264",
    appId: "1:375924742264:web:fff9b67d52072e3a36f58d",
    measurementId: "G-YBRB4CT1TZ"
}

initializeApp(firebaseConfig)

export const firestoreDb = getFirestore()
export const realtimeDb = getDatabase()
export const storage = getStorage()
export const auth = getAuth()
