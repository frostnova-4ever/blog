<!-- 累计观看数量 -->

<template>
  <div class="article-item">
    <div class="article-title">本站访问统计</div>
    <div class="article-date">
      总访问量：<span id="busuanzi_value_site_pv">-</span><br>
      访客人数：<span id="busuanzi_value_site_uv">-</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 动态加载 busuanzi 脚本
  if (!window.BUSUANZI_LOADED) {
    const script = document.createElement('script');
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;
    document.body.appendChild(script);
    window.BUSUANZI_LOADED = true;
  }
});
</script>

<style scoped>
.article-item {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 10px;
  background-color: #fff;
}
.article-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
}
.article-date {
  font-size: 14px;
  color: #666;
}
</style>