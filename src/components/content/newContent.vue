主页左侧的最新文章组件

<template>
  <div class="article-list">
    <h2 class="article-list__title">
      <svg class="article-list__icon" aria-hidden="true">
        <use xlink:href="#icon-clock"></use>
      </svg>
      最新文章
    </h2>
    <ul class="article-list__items">
      <li class="article-list__item" v-for="(article, index) in articles" :key="index">
        <h3 class="article-list__item-title">{{ article.title }}</h3>
        <p class="article-list__item-date">{{ article.date }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
const articles = [
  {
    title: 'initx v0.1.0 发布',
    date: '2025-04-08'
  },
  {
    title: '在个人简介同步正在玩的 Steam 游戏',
    date: '2025-03-13'
  },
  {
    title: '写了个饥荒食谱速查工具',
    date: '2025-02-06'
  },
  {
    title: '写了个不错的匹配器 matchinit x',
    date: '2025-01-16'
  },
  {
    title: '2024 年度总结',
    date: '2024-12-31'
  }
];
</script>
<style scoped>
.article-list {
  background-color: rgba(255,255,255,0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-list__title {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
}

.article-list__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.article-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-list__item {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.article-list__item:last-child {
  border-bottom: none;
}

.article-list__item-title {
  font-size: 14px;
  margin-bottom: 5px;
  color: black;
}

.article-list__item-date {
  height: auto;
  font-size: 10px;
  color: #666;
}
</style>


    