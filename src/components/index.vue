<template>
	<div class="layouts">
		<div v-for="(title, index) in titles" :key="index" class="layout">
			<div></div>
			<div class="top">
				<div class="title">{{ title }}</div>
				<div class="btn" @click="start(index)" :disabled="timers[index].isRunning">开始</div>
				<div class="btn" @click="stop(index)" :disabled="!timers[index].isRunning">停止</div>
				<div class="btn" @click="reset(index)" :disabled="timers[index].elapsedTime === 0">重置</div>
			</div>
			<!-- <Flip
				:hours="timers[index].formattedTime.hours"
				:minutes="timers[index].formattedTime.minutes"
				:seconds="timers[index].formattedTime.seconds" /> -->
			<Timer />
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import Flip from './Flip/index.vue'
	import Timer from './Timer/index.vue'

	const titles = ['学习时长', '英语时长', '看书时长', '博客时长']
	const timers = ref([])

	for (let i = 0; i < 4; i++) {
		timers.value.push({
			startTime: null,
			elapsedTime: 0,
			isRunning: false,
			formattedTime: { hours: '00', minutes: '00', seconds: '00' }
		})
	}

	const start = (index) => {
		if (!timers.value[index].isRunning) {
			timers.value[index].startTime = Date.now() - (timers.value[index].startTime ? timers.value[index].startTime : 0)
			timers.value[index].isRunning = true
			updateElapsedTime(index)
		}
	}

	const stop = (index) => {
		timers.value[index].isRunning = false
	}

	const reset = (index) => {
		timers.value[index].startTime = null
		timers.value[index].elapsedTime = 0
		timers.value[index].isRunning = false
	}

	const updateElapsedTime = (index) => {
		if (timers.value[index].isRunning) {
			timers.value[index].elapsedTime = Math.floor((Date.now() - timers.value[index].startTime) / 1000)
			updateFormattedTime(index)
			setTimeout(() => updateElapsedTime(index), 1000)
		}
	}

	const updateFormattedTime = (index) => {
		const hours = Math.floor(timers.value[index].elapsedTime / 3600).toString().padStart(2, '0')
		const minutes = Math.floor((timers.value[index].elapsedTime % 3600) / 60).toString().padStart(2, '0')
		const seconds = (timers.value[index].elapsedTime % 60).toString().padStart(2, '0')
		timers.value[index].formattedTime = { hours, minutes, seconds }
	}
</script>

<style scoped>
	.layouts {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
	}

	.layout .top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background: #fff;
		border-radius: 20px;
		padding: 10px;
		box-sizing: border-box;
	}

	.layout .top .title {
		font-size: 20px;
		font-weight: 700;
		color: #333;
		margin-right: auto;
	}

	.layout .top .btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 24px;
		border-radius: 10px;
		border: 1px solid #333;
		font-size: 14px;
		font-weight: 700;
		color: #333;
		padding: 0px 3px;
		cursor: pointer;
	}

	.layout .top .btn:hover {
		background: #333;
		color: #fff;
	}
</style>