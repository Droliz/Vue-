<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <component :is="ComponentAsideVue"></component>
      </el-aside>
      <el-container>
        <el-header>
          <component :is='ComponentHeader'></component>
        </el-header>
        <tag-box />
        <el-main>
          <Suspense>
            <template #default>
              <router-view></router-view>
            </template>
            <template #fallback>
              加载中
            </template>
          </Suspense>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import ComponentAsideVue from '@/components/ComponentAside.vue';
import ComponentHeader from '@/components/ComponentHeader.vue';
import TagBox from '@/components/TagBox.vue';


</script>

<style scoped lang='less'>
.common-layout {
  height: 100%;

  .el-aside {
    min-height: 100vh;
    background-color: #545c64;
  }
}
</style>