<template>
  <div class="html-preview-page">
    <button @click="$router.back()">返回</button>
    <div v-if="htmlContent" class="html-preview" v-html="htmlContent"></div>
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const htmlContent = ref('');

onMounted(async () => {
  const file = route.params.file;
  const res = await fetch(`/md/content/${file}`);
  htmlContent.value = await res.text();
});
</script>

<style scoped>
.html-preview-page {
  padding: 24px;
}
.html-preview {
  border: 1px solid #ccc;
  padding: 16px;
  background: #fafafa;
  margin-top: 16px;
  max-width: 900px;
  overflow: auto;
}
</style>