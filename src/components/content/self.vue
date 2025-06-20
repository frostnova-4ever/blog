<!-- 主页左上角的个人组件 -->

<template>
    <div class="user-profile">
      <div class="avatar-container">
        <img :src="avatar" :alt="userName" class="avatar" />
      </div>
      <div class="user-info">
        <h2 class="name">{{ userName }}</h2>
        <p class="description">{{ userDescription }}</p>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">文章</span>
            <span class="stat-value">{{ articleCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">标签</span>
            <span class="stat-value">{{ tagCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">分类</span>
            <span class="stat-value">{{ categoryCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import avatar from '@/assets/avatar.jpg';  // 导入头像图片
  
  // 不再需要 avatarUrl prop
  const props = defineProps({
    userName: {
      type: String,
      default: '霜印繁星', // 设置默认用户名
      required: true
    },
    userDescription: {
      type: String,
      default: ''
    },
    articleCount: {
      type: Number,
      default: 0
    },
    tagCount: {
      type: Number,
      default: 0
    },
    categoryCount: {
      type: Number,
      default: 0
    }
  });
  </script>
  
  <style scoped>
  .user-profile {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .avatar-container {
    margin-bottom: 10px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-info {
    width: 100%;
  }
  .name {
    margin-bottom: 5px;
  }
  .description {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  .stats {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stat-label {
    font-size: 12px;
    color: #999;
    margin-bottom: 3px;
  }
  .stat-value {
    font-size: 16px;
    font-weight: bold;
  }
  </style>