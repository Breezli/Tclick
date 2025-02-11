<template>
	<div class="clock">
		<!-- 小时 -->
		<div class="flip">
			<div class="digital" :data-number="hoursFirstChar">{{ hoursFirstChar }}</div>
		</div>
		<div class="flip">
			<div class="digital" :data-number="hoursSecondChar">{{ hoursSecondChar }}</div>
		</div>
		<em class="divider">:</em>

		<!-- 分钟 -->
		<div class="flip">
			<div class="digital" :data-number="minutesFirstChar">{{ minutesFirstChar }}</div>
		</div>
		<div class="flip">
			<div class="digital" :data-number="minutesSecondChar">{{ minutesSecondChar }}</div>
		</div>
		<em class="divider">:</em>

		<!-- 秒 -->
		<div class="flip">
			<div class="digital" :data-number="secondsFirstChar">{{ secondsFirstChar }}</div>
		</div>
		<div class="flip">
			<div class="digital" :data-number="secondsSecondChar">{{ secondsSecondChar }}</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import { getFormattedTime } from '../../utils/timeUtils'; // 确保路径正确

	const hoursFirstChar = ref('');
	const hoursSecondChar = ref('');
	const minutesFirstChar = ref('');
	const minutesSecondChar = ref('');
	const secondsFirstChar = ref('');
	const secondsSecondChar = ref('');

	const updateTime = () => {
		const time = getFormattedTime();
		hoursFirstChar.value = time.hoursFirstChar;
		hoursSecondChar.value = time.hoursSecondChar;
		minutesFirstChar.value = time.minutesFirstChar;
		minutesSecondChar.value = time.minutesSecondChar;
		secondsFirstChar.value = time.secondsFirstChar;
		secondsSecondChar.value = time.secondsSecondChar;
	};

	onMounted(() => {
		updateTime(); // 初始化时更新时间
		setInterval(updateTime, 1000); // 每秒更新一次时间
	});
</script>

<style scoped>
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: #2c3e50; /* 添加背景色以便于查看 */
	}

	.clock {
		display: flex;
	}

	/* 时钟的分隔 */
	.clock .divider {
		font-size: 30px;
		line-height: 60px;
		font-style: normal;
		color: rgb(255, 255, 255); /* 更改为白色以便于查看 */
		margin: 0 5px;
	}

	/* 时钟的卡片 */
	.clock .flip {
		position: relative;
		width: 40px; /* 稍微增加宽度以确保数字完全显示 */
		height: 60px; /* 增加高度以确保数字完全显示 */
		margin: 2px;
		font-size: 48px; /* 增加字体大小以便于查看 */
		font-weight: 700;
		line-height: 60px; /* 确保文本垂直居中 */
		text-align: center;
		background: rgb(46, 45, 45);
		border: 1px solid rgb(34, 33, 33);
		border-radius: 10px;
		box-shadow: 0 0 6px rgba(54, 54, 54, 0.5);
	}

	/* 时钟上的数字 */
	.clock .flip .digital {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		color: white; /* 数字颜色为白色 */
		background: transparent; /* 背景透明 */
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>