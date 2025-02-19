<template>
	<div class="flip-unit">
		<div class="flip">
			<div class="left">{{ currentValue[0] }}</div>
			<div class="right">{{ currentValue[1] }}</div>
		</div>
		<span class="label">{{ label }}</span>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'

	const props = defineProps({
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
	})

	const currentValue = ref([props.value[0], props.value[1]])

	watch(
		() => props.value,
		(newVal) => {
			// 直接更新当前值，无需动画
			currentValue.value = [newVal[0], newVal[1]]
		}
	)
</script>

<style scoped>
	.flip-unit {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.flip {
		position: relative;
		width: 80px; /* 调整宽度以适应两个水平排列的元素 */
		height: 60px; /* 调整高度 */
		margin: 2px;
		background: rgb(46, 45, 45);
		border-radius: 10px;
		display: flex; /* 使用flexbox布局 */
	}

	.left,
	.right {
		position: relative; /* 更改为相对定位 */
		width: 50%; /* 每个元素占据一半的宽度 */
		height: 100%; /* 高度为父容器的高度 */
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 48px;
		font-weight: 700;
		color: white;
	}

	.left {
		background: rgb(46, 45, 45);
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		border-right: 1px solid rgba(0, 0, 0, 0.1); /* 添加右侧边框 */
	}

	.right {
		background: rgb(36, 35, 35);
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.label {
		font-size: 14px;
		color: white;
		margin-left: 4px;
	}
</style>
