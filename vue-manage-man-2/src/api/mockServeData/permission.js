import Mock from 'mockjs'

export default {
    getMenu: config => {
        const {username, password} = JSON.parse(config.body)

        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: 'home',
                            label: "首页",
                            icon: "s-home",
                            url: "HomeView"
                        },
                        {
                            path: "/mall",
                            name: 'mall',
                            label: "商品管理",
                            icon: "video-play",
                            url: "MallView"
                        },
                        {
                            path: "/user",
                            name: 'user',
                            label: "用户管理",
                            icon: "user",
                            url: "UserView"
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: 'page1',
                                    label: "页面1",
                                    icon: "setting",
                                    url: "PageView"
                                },
                                {
                                    path: "/page2",
                                    name: 'page2',
                                    label: "页面2",
                                    icon: "setting",
                                    url: "PageView"
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
                            icon: "s-home",
                            url: "HomeView"
                        },
                        {
                            path: "/mall",
                            name: 'mall',
                            label: "商品管理",
                            icon: "video-play",
                            url: "MallView"
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