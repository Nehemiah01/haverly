import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'


const config =
	import.meta.env.MODE === 'development'
		? JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG)
		: JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG_PUBLIC)

console.log(import.meta.env.MODE)

initializeApp(config)

export const firestoreDb = getFirestore()
export const realtimeDb = getDatabase()
export const storage = getStorage()
export const auth = getAuth()
