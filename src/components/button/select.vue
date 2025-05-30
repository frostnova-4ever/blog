<template>
  <div class="radio-container">
    <div
      v-if="radioOptions.length > 0"
      v-for="option in radioOptions"
      :key="option"
      class="select"
      :class="{ 'active': selected === option, 'disabled': selected === option }"
      @click="selected!== option && selectOption(option)"
    >
      <span>{{ option }}</span>
    </div>
    <!-- 空数组提示 -->
    <div v-else class="no-options">暂无选项</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import './Button.css'

// 直接定义一个 JS 对象作为选项数据
const options = ["技术", "待完善2", "待完善3", "待完善4", "待完善5", "待完善6"];

const radioOptions = computed(() => options);
const selected = ref(radioOptions.value.length > 0? radioOptions.value[0] : null);

const selectOption = (option) => {
  selected.value = option;
};

watch(radioOptions, (newOptions) => {
  if (newOptions.length > 0) {
    selected.value = newOptions[0];
  } else {
    selected.value = null;
  }
});
</script>

<style scoped>
input[type="radio"] {
  display: none;
}

.radio-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
  white-space: nowrap
}

.select {
  padding: 10px 10px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
  color: black;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.select.active::after {
  transform: scaleX(1);
}

.select::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 3px;
  background-color:  #007BFF;
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  
}

/* .select:hover::after {
  transform: scaleX(1);
} */

.select:hover {
  background: rgba(180, 180, 180, 0.7);
}

.select.disabled {
  cursor: not-allowed;
  pointer-events: none; 
  background: rgba(180, 180, 180, 0.7);
}
</style>