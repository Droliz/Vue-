import Mock from 'mockjs'

function paramObj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|28-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    /**
     * 获取参数列表
     * 需要 name, page, limit
     * @param config {name, page, limit}
     * @return {{code: number, count: number, data: *[]}}
     */
    getUserList: config => {
        const { keyword, page = 1, limit = 20 } = paramObj(config.url)
        const mockList = List.filter(user => {
            return !(keyword &&
                (user.name.indexOf(keyword) === -1 &&
                    user.addr.indexOf(keyword) === -1 &&
                    user.birth.indexOf(keyword) === -1));
        })
        const pageList = mockList.filter((item, index) =>
            index < limit * page && index >= limit * (page - 1)
        )
        return {
            code: 200,
            count: mockList.length,
            list: pageList
        }
    },
    /**
     * 新增用户
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    createUser: config => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body)
        List.unshift({
            id: Mock.Random.guid(),
            name,
            addr,
            age,
            birth,
            sex
        })
        return {
            code: 200,
            data: {
                message: "添加成功"
            }
        }
    },
    /**
     * 删除单个用户
     * @param config
     * @returns {{code: number, message: string}}
     */
    deleteUser: config => {
        const { id } = JSON.parse(config.body)
        if (!id) {
            return {
                code: -999,
                message: '参数错误'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 200,
                message: '删除成功'
            }
        }
    },
    /**
     * 批量删除
     * @param config
     * @returns {{code: number, data: {message: string}}}
     */
    batchRemove: config => {
        let { ids } = paramObj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 200,
            data: {
                message: '批量删除成功'
            }
        }
    },
    /**
     * 更新数据
     * @param config
     * @returns {{code: number, data: {message: string}}}
     */
    updateUser: config => {
        const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
        // console.log(name, addr, age, birth, sex)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.age = age
                u.addr = addr
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })

        return {
            code: 200,
            data: {
                message: '更改成功'
            }
        }
    }

}