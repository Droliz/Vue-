import { getMall } from '@/api'

export default {
    namespaced: true,
    state: {
        mallList: []
    },
    actions: {
        getData(context) {
            getMall().then(({ data }) => {
                context.state.mallList = data.data
            })
        }
    }
}