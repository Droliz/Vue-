<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup


// 数据持久化，但是vue中已经快要渲染，所以此时添加动态路由晚了，在main.js中调用添加

// import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
// const router = useRouter()
// const store = useStore()   

// store.commit('menu/addMenu', router)

</script>

<template>
  <!-- <suspense> -->
  <!-- <template #default> -->
  <router-view />
  <!-- </template>

  </suspense> -->
</template>

<style>
#app {
  height: 100%
}
</style>
