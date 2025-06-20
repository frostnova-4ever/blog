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
import { ref, watchEffect, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Contents from './Contents.vue';

// 存储 html 文件的数量
const totalContents = ref(0);
const itemsPerPage = ref(8);
const pageNumber = ref(1);
const currentPageContents = ref([]);
const htmlMap = ref({});
const htmlKeys = ref([]);

const router = useRouter();
const route = useRoute();

const updatePageContents = async () => {
  const startIndex = (pageNumber.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  const contents = await Promise.all(
    htmlKeys.value.slice(startIndex, endIndex).map(async (key) => {
      const file = htmlMap.value[key];
      const response = await fetch(`/md/${file}`);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const title = doc.querySelector('title')?.textContent || file;
      return {
        id: Number(key),
        file,
        image: `/md/image/${file.replace('.html', '.jpg')}`,
        title
      };
    })
  );
  currentPageContents.value = contents;
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

onMounted(async () => {
  try {
    const res = await fetch('/md/list.json');
    htmlMap.value = await res.json();
    htmlKeys.value = Object.keys(htmlMap.value).sort((a, b) => Number(a) - Number(b));
    totalContents.value = htmlKeys.value.length;
    await updatePageContents();
    console.log('✅ 成功获取 HTML 文件列表:', htmlMap.value);
  } catch (error) {
    console.error('❌ 获取 HTML 文件列表失败:', error);
  }
});

watchEffect(() => {
  // 如果没有 page 参数，默认 1
  const page = parseInt(route.params.page);
  pageNumber.value = isNaN(page) ? 1 : page;
  itemsPerPage.value = parseInt(route.query.itemsPerPage) || 8;
  updatePageContents();
});

// 如果 props 里有 page，则优先用 props，否则用路由参数，否则默认 1
const page = computed(() => {
  return Number(route.params.page) || Number(route?.props?.page) || 1
})
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
</style>