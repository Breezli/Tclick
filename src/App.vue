<template>
	<div id="app" class="hide-scrollbar">
		<Main />
	</div>
</template>

<script setup>
	import Main from './components/index.vue'
</script>

<style scoped>
	/* 根据之前提供的CSS */
	.hide-scrollbar {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 和 Edge */
	}

	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
