<template>
	<div class="layouts">
		<div class="add-timer" @click="addTimer">
			<i class="add-icon">+</i>
			<span>添加新计时器</span>
		</div>
		<div class="timer-grid">
			<div v-for="(timer, index) in timers" :key="timer.id" class="layout">
				<div class="layout-top">
					<div class="top">
						<input
							v-if="timer.isEditing"
							v-model="timer.title"
							@blur="finishEdit(index)"
							@keyup.enter="finishEdit(index)"
							ref="titleInputs"
							class="title-input" />
						<div v-else class="title" @dblclick="startEdit(index)">
							{{ timer.title }}
						</div>
						<div class="actions">
							<button class="action-btn edit" @click="startEdit(index)">
								<i class="icon">✎</i>
							</button>
							<button class="action-btn delete" @click="removeTimer(index)">
								<i class="icon">×</i>
							</button>
						</div>
					</div>
				</div>
				<Flip ref="flipRefs[index]" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, nextTick } from 'vue'
	import Flip from './Flip/index.vue'

	const timers = ref([{ id: 1, title: '自定义计时器', isEditing: false }])

	const titleInputs = ref([])
	const flipRefs = ref([])

	const addTimer = () => {
		const newId = timers.value.length
			? Math.max(...timers.value.map((t) => t.id)) + 1
			: 1
		timers.value.push({
			id: newId,
			title: `自定义计时器 ${newId}`,
			isEditing: false,
		})
	}

	const startEdit = async (index) => {
		timers.value[index].isEditing = true
		await nextTick()
		titleInputs.value[index]?.focus()
	}

	const finishEdit = (index) => {
		timers.value[index].isEditing = false
		if (!timers.value[index].title.trim()) {
			timers.value[index].title = `计时器 ${timers.value[index].id}`
		}
	}

	const removeTimer = (index) => {
		if (confirm('确定要删除这个计时器吗？')) {
			timers.value.splice(index, 1)
		}
	}
</script>

<style scoped>
	.layouts {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.add-timer {
		border: 2px solid rgb(255, 255, 255);
		background: rgba(109, 115, 141, 0.1);
		border-radius: 15px;
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.add-timer:hover {
		border: 2px solid rgba(148, 148, 148, 0.2);
		background: rgba(245, 245, 245, 0.2);
	}

	.add-icon {
		font-size: 24px;
		color: rgb(0, 0, 0);
	}

	.timer-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 20px;
	}

	.layout {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		animation: fadeIn 0.3s ease;
	}

	.layout-top {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 380px;
	}

	.title {
		font-size: 20px;
		font-weight: 700;
		color: rgb(68, 68, 68);
		cursor: pointer;
	}

	.title-input {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		font-size: 20px;
		font-weight: 700;
		color: rgb(111, 113, 115);
		width: 200px;
		outline: none;
		font-family: 'CustomFont', sans-serif !important;
	}

	.actions {
		display: flex;
		gap: 5px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		background: rgba(46, 75, 88, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #465268;
		cursor: pointer;
		padding: 5px;
		border-radius: 5px;
		transition: all 0.3s ease;
	}

	.action-btn:hover {
		border: 1px solid rgba(59, 82, 101, 0.1);
		background: rgba(255, 255, 255, 0.1);
	}

	.icon {
		color: #132b5a;
		font-style: normal;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
