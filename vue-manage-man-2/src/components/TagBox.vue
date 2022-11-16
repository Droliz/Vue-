<template>
  <div class="tags">
    <el-tag
        v-for="(item, index) in tags"
        :closable="item.name !== 'home'"
        :key="item.path"
        size="small"
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
        :effect="$route.name === item.name ? 'dark' : 'plain'">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: "TagBox",
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations("tab", ["closeTag"]),
    changeMenu(item) {
      if (item.name === this.$route.name) return
      this.$router.push(item.path)
    },
    handleClose(item, index) {
      this.closeTag(item)
      const length = this.tags.length - 1
      if (item.name !== this.$route.name) return
      if (index === length + 1) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.tags {
  padding: 20px;

  .el-tag {
    cursor: pointer;
    margin-right: 15px;
  }
}
</style>