<template>

	<div>
		<div
			class="app-container app-mobile"
			:class="{ 'app-mobile': isDevice, 'app-mobile-dark': theme === 'dark' }"
		>
			<!-- <div>
				<button @click="resetData">
					Clear Data
				</button>
				<button :disabled="updatingData" @click="addData">
					Add Data
			 	</button>
			</div> -->
			<!-- <span class>

			</span> -->
			
			<!-- <span
				v-if="showOptions"
				class="w-12 h-12 bg-red"
				>
				
			</span> -->
			<header class="flex justify-between place-items-center py-2 px-4" :class="theme !== 'light' ? 'text-white': 'app-mobile-dark' ">
				<span
					v-if="showOptions"
					class="user-logged flex items-center gap-2 m-0 font-semibold text-sm"
					
					>
					<!-- :class="{ 'user-logged-dark': theme === 'dark' }" -->
					<img :src="yusers.photoURL" class="w-12 h-12 inline-block  rounded-full profile-avatar">
					{{ yusers.displayName }}
				</span>
				<!-- <select v-if="showOptions" v-model="currentUserId" class="text-xs">
					<option v-for="user in users" :key="user._id" :value="user._id">
						{{ user.username }}
					</option>
				</select> -->

				<!-- <button class="button-light" @click="theme = 'light'">
					Light
				</button>
				<button class="button-dark" @click="theme = 'dark'">
					Dark
				</button> -->
				<div v-if="showOptions" class="button-theme">
					<button @click="logout" class="button-light mr-3">
						Sign out
					</button>

					<img v-show="theme == 'light'" @click="theme = 'dark', resetData" src="@/assets/icon-moon.svg" class="cursor-pointer" alt="" >
					<img v-show="theme == 'dark'" @click="theme = 'light' " src="@/assets/icon-sun.svg" class="cursor-pointer" alt="">
				</div>

			</header>

			
			<chat-container
				class="w-full bg-red"
				v-if="showChat"
				:current-user-id="ycurrentUserId"
				:theme="theme"
				:is-device="isDevice"
				@show-demo-options="showDemoOptions = $event"
			/>

			<!-- <div class="version-container">
				v1.0.0
			</div> -->
		</div>
	</div>
</template>

<script>
import * as firestoreService from '@/database/firestore'
import * as storageService from '@/database/storage'

import { auth } from '@/database'
import { signOut } from 'firebase/auth'

import ChatContainer from '../ChatContainer'

export default {
	components: {
		ChatContainer
	},

	data() {
		return {
			theme: 'light',
			showChat: true,
			yusers: auth.currentUser,
			users: [
				{
					_id: '6R0MijpK6M4AIrwaaCY2',
					username: 'Luke',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj'
				},
				{
					_id: 'SGmFnBZB4xxMv9V4CVlW',
					username: 'Leia',
					avatar: 'https://avatarfiles.alphacoders.com/184/thumb-184913.jpg'
				},
				{
					_id: '6jMsIXUrBHBj7o2cRlau',
					username: 'Yoda',
					avatar:
						'https://vignette.wikia.nocookie.net/teamavatarone/images/4/45/Yoda.jpg/revision/latest?cb=20130224160049'
				}
			],
			ycurrentUserId: auth.currentUser.uid,
			currentUserId: auth.currentUser.uid,
			isDevice: false,
			showDemoOptions: true,
			updatingData: false
		}
	},

	computed: {
		showOptions() {
			return !this.isDevice || this.showDemoOptions
		}
	},

	watch: {
		ycurrentUserId() {
			this.showChat = false
			setTimeout(() => (this.showChat = true), 150)
		}
	},

	mounted() {
		console.log(this.yusers)
		// addToGroups()
		// let totess = async firestoreService.getAllUsers() ( user => await user)

		console.log(firestoreService.getAllUsers().then(user =>  user))
		// console.log(auth.listUsers(100, nextPageToken))
		
		this.isDevice = window.innerWidth < 500
		window.addEventListener('resize', ev => {
			if (ev.isTrusted) this.isDevice = window.innerWidth < 500
		})
	},

	methods: {
		addToGroups() {
			if(this.yusers.emailVerified) {
				console.log('Add to groups 0y57gCj4VEeAJ6YbrIOO')
			}
		},
		
		resetData() {
			firestoreService.getAllRooms().then(({ data }) => {
				data.forEach(async room => {
					await firestoreService.getMessages(room.id).then(({ data }) => {
						data.forEach(message => {
							firestoreService.deleteMessage(room.id, message.id)
							if (message.files) {
								message.files.forEach(file => {
									storageService.deleteFile(
										this.ycurrentUserId,
										message.id,
										file
									)
								})
							}
						})
					})

					firestoreService.deleteRoom(room.id)
				})
			})

			firestoreService.getAllUsers().then(({ data }) => {
				data.forEach(user => {
					firestoreService.deleteUser(user.id)
				})
			})
		},
		async addData() {
			this.updatingData = true

			const user1 = this.yusers
			await firestoreService.addIdentifiedUser(user1.uid, user1)

			// const user2 = this.users[1]
			// await firestoreService.addIdentifiedUser(user2._id, user2)

			// const user3 = this.users[2]
			// await firestoreService.addIdentifiedUser(user3._id, user3)

			await firestoreService.addRoom({
				users: [user1.uid ],
				lastUpdated: new Date()
			})

			// await firestoreService.addRoom({
			// 	users: [user1._id, user2._id],
			// 	lastUpdated: new Date()
			// })
			// await firestoreService.addRoom({
			// 	users: [user1._id, user3._id],
			// 	lastUpdated: new Date()
			// })
			// await firestoreService.addRoom({
			// 	users: [user2._id, user3._id],
			// 	lastUpdated: new Date()
			// })
			// await firestoreService.addRoom({
			// 	users: [user1._id, user2._id, user3._id],
			// 	lastUpdated: new Date()
			// })

			this.updatingData = false
			location.reload()
		},
		logout() {
			signOut(auth)
				.then(() => {
				console.log('user signed out')
				})
				.catch(err => {
				console.log(err.message)
				})
			this.$router.push('/login')
		}
			// .then(() => {
			// 	console.log('user signed out')
			// })
			// .catch(err => {
			// 	console.log(err.message)
			// })					
	}
}
</script>

<style lang="scss">
body {
	background: #fafafa;
	margin: 0;
}

input {
	-webkit-appearance: none;
}

.app-container {
	font-family: 'Quicksand', sans-serif;
	// padding: 20px 30px 30px;
}

.app-mobile {
	padding: 0;

	&.app-mobile-dark {
		background: #131415;
	}

	select {
		margin: 10px 0;
	}
}

.user-logged {
	font-size: 12px;
	// margin-right: 5px;
	// margin-top: 10px;

	&.user-logged-dark {
		color: #fff;
	}
}

select {
	height: 20px;
	outline: none;
	border: 1px solid #e0e2e4;
	border-radius: 4px;
	background: #fff;
	margin-bottom: 20px;
}

.button-theme {
	display: flex;
	align-items: center;

	.button-light {
		background: #fff;
		border: 1px solid #46484e;
		color: #46484e;
	}

	.button-dark {
		background: #1c1d21;
		border: 1px solid #1c1d21;
	}

	button {
		color: #fff;
		outline: none;
		cursor: pointer;
		border-radius: 4px;
		padding: 6px 12px;
		margin-left: 10px;
		border: none;
		font-size: 14px;
		transition: 0.3s;
		vertical-align: middle;

		&:hover {
			opacity: 0.8;
		}

		&:active {
			opacity: 0.6;
		}

		@media only screen and (max-width: 768px) {
			padding: 3px 6px;
			font-size: 13px;
		}
	}
}

.version-container {
	padding-top: 20px;
	text-align: right;
	font-size: 14px;
	color: grey;
}

.hamburger-menu {
    cursor: pointer;

    .bar {
        display: block;
        width: 25px;
        height: 3px;
        border-radius: 5rem;
        margin: 4px 0.2rem;
        transition: transform 0.3s ease-out;
    }

    &.cancel .bar:first-of-type {
        transform: translateY(7px) rotate(45deg);
    }
    &.cancel .bar:nth-of-type(2) {
        opacity: 0;
    }
    &.cancel .bar:last-child {
        transform: translateY(-7px) rotate(-45deg);
    }

}
</style>
