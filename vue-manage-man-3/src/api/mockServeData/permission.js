import Mock from 'mockjs'

export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)

        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: 'home',
                            label: "首页",
                            icon: "HomeFilled",
                            url: "Home/HomeView"
                        },
                        {
                            path: "/mall",
                            name: 'mall',
                            label: "商品管理",
                            icon: "Goods",
                            url: "Mall/MallView"
                        },
                        {
                            path: "/user",
                            name: 'user',
                            label: "用户管理",
                            icon: "User",
                            url: "User/UserView"
                        },
                        {
                            label: "其他",
                            icon: "location",
                            name: 'other',
                            children: [
                                {
                                    path: "/page1",
                                    name: 'page1',
                                    label: "页面1",
                                    icon: "Files",
                                    url: "Page/PageView"
                                },
                                {
                                    path: "/page2",
                                    name: 'page2',
                                    label: "页面2",
                                    icon: "Files",
                                    url: "Page/PageView"
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'qtw' && password === 'qtw') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: 'home',
                            label: "首页",
                            icon: "HomeFilled",
                            url: "Home/HomeView"
                        },
                        {
                            path: "/mall",
                            name: 'mall',
                            label: "商品管理",
                            icon: "Goods",
                            url: "Mall/MallView"
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                message: '用户名或密码错误'
            }
        }
    }
}