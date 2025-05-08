<template>
  <div class="content-card" @click="goToContentPage">
    <img :src="content.image" alt="Content Image" class="content-image" loading="lazy">
    <h3>Content {{ content.id }}</h3>
    <p>This is content item {{ content.id }}.</p>
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

const goToContentPage = () => {
  router.push(`/content/${props.content.id}`);
};
</script>

<style scoped>
.content-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.content-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h3 {
  margin-top: 0;
  color: #333;
}

p {
  color: #666;
}

.content-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>