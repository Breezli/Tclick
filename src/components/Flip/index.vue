<template>
  <div class="flip-clock">
    <div class="clock-display">
      <!-- 翻牌时钟显示 -->
      <div class="clock">
        <FlipUnit :value="hours" label="时" />
        <em class="divider">:</em>
        <FlipUnit :value="minutes" label="分" />
        <em class="divider">:</em>
        <FlipUnit :value="seconds" label="秒" />
      </div>
    </div>
    
    <!-- 控制按钮 -->
    <div class="controls">
      <button @click="start" :disabled="isRunning" class="control-btn">开始</button>
      <button @click="stop" :disabled="!isRunning" class="control-btn">停止</button>
      <button @click="reset" :disabled="elapsedTime === 0" class="control-btn">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import FlipUnit from './FlipUnit.vue';

const startTime = ref(null);
const elapsedTime = ref(0);
const isRunning = ref(false);

const hours = computed(() => Math.floor(elapsedTime.value / 3600).toString().padStart(2, '0'));
const minutes = computed(() => Math.floor((elapsedTime.value % 3600) / 60).toString().padStart(2, '0'));
const seconds = computed(() => (elapsedTime.value % 60).toString().padStart(2, '0'));

let intervalId = null;

// Timer 控制逻辑
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

// 页面可见性处理
const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    if (isRunning.value) stop();
  } else if (document.visibilityState === 'visible') {
    if (isRunning.value) start();
  }
};

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  clearInterval(intervalId);
});
</script>

<style scoped>
.flip-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.clock-display {
  background: rgba(46, 45, 45, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.clock {
  display: flex;
  align-items: center;
  gap: 5px;
}

.divider {
  font-size: 30px;
  color: white;
  font-style: normal;
}

.controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: #465268;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'CustomFont', sans-serif !important;
}

.control-btn:hover:not(:disabled) {
  background: #29364b;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>