<template>
  <div>
    <h2>Content Detail: {{ contentId }}</h2>
    <!-- 使用 iframe 加载 HTML 文件 -->
    <iframe
      v-if="iframeSrc"
      :src="iframeSrc"
      frameborder="0"
      style="width: 100%; min-height: 500px;"
    ></iframe>
    <!-- 若加载出错，显示错误信息 -->
    <p v-else>{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const contentId = route.params.contentId;
// 存储 iframe 的 src 属性值
const iframeSrc = ref('');
// 存储错误信息
const errorMessage = ref('');

onMounted(async () => {
  try {
    // 使用 import.meta.glob 动态导入 HTML 文件
    const htmlFiles = import.meta.glob('/src/md/*.html', { eager: false });
    const targetFile = `/src/md/${contentId}.html`;
    if (htmlFiles[targetFile]) {
      // 若文件存在，设置 iframe 的 src 属性
      iframeSrc.value = targetFile;
    } else {
      throw new Error(`File ${targetFile} not found.`);
    }
  } catch (error) {
    console.error('Error loading html file:', error);
    // 若加载出错，设置错误信息
    errorMessage.value = 'Error loading content.';
  }
});
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
</style>