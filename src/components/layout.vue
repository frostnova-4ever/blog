<template>
    <div ref="blogHomeContainer" class="blog-home-container">
      <div class="layout-container tech-select-bgc">
        <div>
          <!-- 假设这里是技术选择组件 -->
          <TechSelect :text="techOptions"/>
        </div>
        <div class="search">
          <!-- 列表和搜索组件 -->
          <List/>
          <Search/>
        </div>
      </div>
      <div class="layout-container">
        <div class="left-panel">
          <!-- 左侧面板内容 -->
          <Self/>
          <!-- <newContent/> -->
          <p>左侧屏内容示例</p>
        </div>
            <div class="middle-panel">
            <!-- 中间部分渲染 Page 组件 -->
                <div>
                <!-- 显示获取到的 HTML 文件数量 -->
                <!-- <p>Total HTML files: {{ totalContents }}</p> -->
                <router-view :total-contents="totalContents"></router-view>
                </div>
            </div>
        <div class="right-panel">
          <!-- 右侧面板内容 -->
          <datetime/>
          <views/>
          <p>右侧屏内容</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import TechSelect from './button/select.vue';
  import Search from './search.vue';
  import List from './list.vue';
  import Self from './content/self.vue';
  import newContent from './content/newContent.vue';
  import datetime from './content/datetime.vue';
  import views from './content/views.vue';
  import { useRouter } from 'vue-router';

  
  // 定义存储后端数据的响应式变量
  const techOptions = ref([]);
  const router = useRouter();
  const totalContents = ref(0);
  onMounted(async () => {
    try {
        const response = await axios.get('src\\json\\components.json'); // 访问 public 文件夹中的 JSON 文件
        techOptions.value = response.data.options;
    } catch (error) {
        console.error('获取数据失败:', error);
    }
});

  </script>
  
  <style scoped>
  .blog-home-container {
    margin-top: 10px;
  }
  
  .layout-container {
    padding: 0.5rem;
    display: flex;
    width: 97%;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    border-radius: 0.25rem;
    justify-content: space-between;
  }
  
  .tech-select-bgc {
    background-color: rgba(255, 255, 255, 0);
  }
  
  .search {
    display: flex;
    gap: 10px;
  }
  
  .left-panel {
    flex: 1;
    background-color: rgba(0, 0, 0, 0);
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .middle-panel {
    flex: 3; 
    background-color: white;
    color: black;
    padding: 10px;
  }
  
  .right-panel {
    flex: 1; 
    background-color: rgba(0, 0, 0, 0);
    padding: 10px;
  }
  </style>