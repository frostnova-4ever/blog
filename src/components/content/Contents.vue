<template>
  <div class="content-card" @click="goPreview">
    <img :src="content.image" alt="Content Image" class="content-image" loading="lazy">
    <div class="content-info">
      <h3>{{ content.file }}</h3>
      <p>点击查看 HTML 内容</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});
const router = useRouter();
function goPreview() {
  router.push(`/preview/${props.content.file}`);
}
</script>

<style scoped>
.content-card {
  display: flex;
  align-items: stretch;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 4px;
  margin: 4px 4px 4px 4px; /* 下边距加大为16px */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  min-height: 140px;
}

.content-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content-image {
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
  max-width: 160px;

  margin: 0;
  padding: 0;
}

.content-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h3 {
  margin-top: 0;
  color: #333;
}

p {
  color: #666;
}

.html-preview {
  margin-top: 16px;
  border: 1px solid #ccc;
  padding: 12px;
  background: #fafafa;
  max-height: 500px;
  overflow: auto;
}
</style>