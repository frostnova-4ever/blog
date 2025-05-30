<template>
  <div class="markdown-preview">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="markdown-body" v-html="renderedContent" v-highlight></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'


// 配置 Markdown 解析器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用额外的默认转义
  }
})

const props = defineProps({
  filePath: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const error = ref(null)
const renderedContent = ref('')

onMounted(async () => {
  try {
    const response = await fetch(`/md/${props.filePath}`)
    if (!response.ok) {
      throw new Error(`文件读取失败: ${response.status}`)
    }
    
    const markdown = await response.text()
    renderedContent.value = md.render(markdown)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>

</style>