<template>
  <div class="preview-outer">
    <iframe
      v-if="file"
      ref="iframeRef"
      :src="`/md/${file}`"
      frameborder="0"
      class="html-iframe"
      title="HTML 预览"
      @load="resizeIframe"
    ></iframe>
    <div v-else>未找到文件</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const file = route.params.file;
const iframeRef = ref(null);

function resizeIframe() {
  const iframe = iframeRef.value;
  if (iframe && iframe.contentWindow && iframe.contentDocument) {
    setTimeout(() => {
      // 动态设置高度为内容高度
      iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';

      // 注入CSS隐藏滚动条
      const style = iframe.contentDocument.createElement('style');
      style.innerHTML = `
        html, body { overflow: hidden !important; }
      `;
      iframe.contentDocument.head.appendChild(style);
    }, 100);
  }
}
</script>

<style scoped>
.preview-outer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 90vh;
}
.html-iframe {
  width: 100%;
  border: none;
  /* 不要设置固定高度 */
}
</style>