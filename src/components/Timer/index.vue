<template>
	<div class="timer">
		<div class="time-display">{{ formattedTime }}</div>
		<div class="controls">
			<button 
				class="control-btn" 
				:class="{ active: isRunning }"
				@click="toggleTimer"
			>
				{{ isRunning ? '暂停' : '开始' }}
			</button>
			<button 
				class="control-btn reset"
				@click="reset" 
				:disabled="elapsedTime === 0"
			>
				重置
			</button>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue';

	const startTime = ref(null);
	const elapsedTime = ref(0);
	const isRunning = ref(false);
	let intervalId = null;

	const formattedTime = computed(() => {
		const hours = Math.floor(elapsedTime.value / 3600)
			.toString()
			.padStart(2, '0');
		const minutes = Math.floor((elapsedTime.value % 3600) / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (elapsedTime.value % 60)
			.toString()
			.padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	});

	const toggleTimer = () => {
		if (isRunning.value) {
			stop();
		} else {
			start();
		}
	};

	const start = () => {
		if (!isRunning.value) {
			startTime.value = Date.now() - (elapsedTime.value * 1000);
			isRunning.value = true;
			intervalId = setInterval(updateElapsedTime, 1000);
		}
	};

	const stop = () => {
		clearInterval(intervalId);
		isRunning.value = false;
	};

	const reset = () => {
		stop();
		startTime.value = null;
		elapsedTime.value = 0;
	};

	const updateElapsedTime = () => {
		elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000);
	};
</script>

<style scoped>
	.timer {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.time-display {
		font-size: 48px;
		font-weight: bold;
		color: white;
		text-align: center;
		font-family: monospace;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.control-btn {
		padding: 8px 20px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.control-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-1px);
	}

	.control-btn:active:not(:disabled) {
		transform: translateY(1px);
	}

	.control-btn.active {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.control-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.control-btn.reset {
		background: rgba(255, 100, 100, 0.1);
		border-color: rgba(255, 100, 100, 0.2);
	}

	.control-btn.reset:hover:not(:disabled) {
		background: rgba(255, 100, 100, 0.15);
	}
</style>
