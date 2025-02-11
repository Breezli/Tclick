<template>
	<div>
		<h1>{{ formattedTime }}</h1>
		<button @click="start" :disabled="isRunning">开始</button>
		<button @click="stop" :disabled="!isRunning">停止</button>
		<button @click="reset" :disabled="elapsedTime === 0">重置</button>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, onUnmounted } from 'vue'

	const startTime = ref(null)
	const elapsedTime = ref(0)
	const isRunning = ref(false)

	const formattedTime = computed(() => {
		const hours = Math.floor(elapsedTime.value / 3600)
			.toString()
			.padStart(2, '0')
		const minutes = Math.floor((elapsedTime.value % 3600) / 60)
			.toString()
			.padStart(2, '0')
		const seconds = (elapsedTime.value % 60).toString().padStart(2, '0')
		return `${hours}:${minutes}:${seconds}`
	})

	let intervalId = null

	function start() {
		if (!isRunning.value) {
			startTime.value = Date.now() - (startTime.value ? startTime.value : 0)
			isRunning.value = true
			intervalId = setInterval(updateElapsedTime, 1000)
		}
	}

	function stop() {
		clearInterval(intervalId)
		isRunning.value = false
	}

	function reset() {
		clearInterval(intervalId)
		startTime.value = null
		elapsedTime.value = 0
		isRunning.value = false
	}

	function updateElapsedTime() {
		elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
	}

	onMounted(() => {
		document.addEventListener('visibilitychange', handleVisibilityChange)
	})

	onUnmounted(() => {
		document.removeEventListener('visibilitychange', handleVisibilityChange)
		clearInterval(intervalId)
	})

	function handleVisibilityChange() {
		if (document.visibilityState === 'hidden') {
			if (isRunning.value) {
				stop()
			}
		} else if (document.visibilityState === 'visible') {
			if (isRunning.value) {
				start()
			}
		}
	}
	const colours = ["#FF9999", "#FFFFFF", "#FFCC99", "#FFCC00", "#FAF15D"];
</script>

<style>
</style>