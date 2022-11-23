<template>
    <div class="tags">
        <el-tag v-for="(item, index) in tags" :closable="item.name !== 'home'" :key="item.path" size="small"
            @click="changeMenu(item)" @close="handleClose(item, index)"
            :effect="$route.name === item.name ? 'dark' : 'plain'">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';

const route = useRoute()
const router = useRouter()
const store = useStore()

const tags = ref(store.state.tab.tagsList)


function changeMenu(item) {
    if (item.name === route.name) return
    router.push(item.path)
}

function handleClose(item, index) {
    store.commit('tab/closeTag', item)
    const length = tags.value.length - 1
    if (item.name !== route.name) return

    if (index === length + 1) {
        router.push({
            name: tags.value[index - 1].name
        })
    } else {
        router.push({
            name: tags.value[index].name
        })
    }
}
</script>

<style scope lang='less'>
.tags {
    padding: 20px;

    .el-tag {
        cursor: pointer;
        margin-right: 15px;
    }
}
</style>