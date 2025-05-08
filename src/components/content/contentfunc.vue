<template>
  <div>
    <!-- 显示获取到的 HTML 文件数量 -->
    <p>Total HTML files: {{ totalContents }}</p>
    <router-view :total-contents="totalContents"></router-view>
    <!-- 根据当前路由名称判断是否显示分页组件 -->
    <el-pagination
      v-if="currentRoute.name === 'Page'"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[8, 16, 24]"
      :page-size="itemsPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalContents"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// 存储 html 文件的数量
const totalContents = ref(0);
const contents = ref([]);

const itemsPerPage = ref(8);
const currentPage = ref(1);

const paginatedContents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return contents.value.slice(startIndex, endIndex);
});

const router = useRouter();
const route = useRoute();

const handleSizeChange = (newSize) => {
  itemsPerPage.value = newSize;
  router.push(`/page/1?itemsPerPage=${newSize}`);
  currentPage.value = 1;
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  router.push(`/page/${newPage}?itemsPerPage=${itemsPerPage.value}`);
};

const currentRoute = ref(route);

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
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
nav ul {
  list-style-type: none;
  padding: 0;
}
nav li {
  display: inline;
  margin-right: 10px;
}
</style>