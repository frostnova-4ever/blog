<template>
  <div>
    <!-- 显示当前页码 -->
    <h2>Page {{ pageNumber }}</h2>
    <!-- 循环渲染内容卡片 -->
    <Contents v-for="(content, index) in currentPageContents" :key="index" :content="content" />
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[8, 16, 24]"
      :page-size="itemsPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalContents"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Contents from './Contents.vue';

// 存储 html 文件的数量
const totalContents = ref(0);
const itemsPerPage = ref(8);
const pageNumber = ref(1);
const currentPageContents = ref([]);

const router = useRouter();
const route = useRoute();

const updatePageContents = () => {
  const startIndex = (pageNumber.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  // 将每个元素转换为包含 id 和 image 属性的对象
  currentPageContents.value = Array.from({ length: totalContents.value }, (_, index) => ({
    id: index + 1,
    image: `/images/image-${index + 1}.jpg`
  })).slice(startIndex, endIndex);
};

const handleSizeChange = (newSize) => {
  itemsPerPage.value = newSize;
  router.push(`/page/1?itemsPerPage=${newSize}`);
  pageNumber.value = 1;
};

const handleCurrentChange = (newPage) => {
  pageNumber.value = newPage;
  router.push(`/page/${newPage}?itemsPerPage=${itemsPerPage.value}`);
};

onMounted(() => {
  try {
    // 使用 import.meta.glob 获取 src/md 目录下的 HTML 文件
    const htmlFilesGlob = import.meta.glob('/src/md/*.html', { eager: false });
    const htmlFiles = Object.keys(htmlFilesGlob).map(key => key.split('/').pop());
    totalContents.value = htmlFiles.length;
    console.log('✅ 成功获取 HTML 文件列表:', htmlFiles);
  } catch (error) {
    console.error('❌ 获取 HTML 文件列表失败:', error);
    // 处理请求失败的情况（如显示错误信息）
  }
});

watchEffect(() => {
  pageNumber.value = parseInt(route.params.page);
  itemsPerPage.value = parseInt(route.query.itemsPerPage) || 8;
  updatePageContents();
});
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
</style>