# vue-manage-man

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

### Lints and fixes files

```shell
npm run lint
```

## 项目结构

```text
├─public
└─src
    ├─api    // mock 模拟后端接口
    │  └─mockServeData   // 不同页面的数据
    ├─assets  // 静态资源
    │  └─image   // 图片
    ├─components   // 组件
    ├─router   // 路由
    ├─store    // vuex
    │  └─modules   // 模块化
    ├─utils   // 工具
    └─views   // 页面
```

## 登录验证

原理：在登陆时设置**token**，登出时清除**token**。在全局添加路由守卫，通过判断是否有**token**，来决定是否需要登录

**token**存放的位置一般

- 1、存储在localStorage中，每次调用接口的时候都把它当成一个字段传给后台
- 2、存储在cookie中，让它自动发送，不过缺点就是**不能跨域**
- 3、拿到之后存储在localStorage中，每次调用接口的时候放在HTTP请求头的Authorization字段里面。

### Token 放在 cookie、localStorage、sessionStorage中的不同点？


#### 将Token存储于localStorage或 sessionStorage

Web存储（localStorage/sessionStorage）可以通过同一域商Javascript访问。这意味着任何在你的网站上的运行的JavaScript都可以访问Web存储，所以容易受到XSS攻击。尤其是项目中用到了很多第三方JavaScript类库。

为了防止XSS，一般的处理是避开和编码所有不可信的数据。但这并不能百分百防止XSS。比如我们使用托管在CDN或者其它一些公共的JavaScript库，还有像npm这样的包管理器导入别人的代码到我们的应用程序中。

如果你使用的脚本中有一个被盗用了怎么办？恶意的JavaScript可以嵌入到页面上，并且Web存储被盗用。这些类型的XSS攻击可以得到每个人的Web存储来访问你的网站。

这也是为什么许多组织建议不要在Web存储中存储任何有价值或信任任何Web存储中的信息。 这包括会话标识符和令牌。作为一种存储机制，Web存储在传输过程中不强制执行任何安全标准。

XSS攻击：Cross-Site Scripting（跨站脚本攻击）简称XSS，是一种代码注入攻击。攻击者通过在目标网站注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可以获取用户的敏感信息如Cookie、SessionID等，进而危害数据安全。


#### 将Token存储与cookie

优点：可以制定httponly，来防止被JavaScript读取，也可以制定secure，来保证token只在HTTPS下传输。

缺点：不符合Restful 最佳实践。 容易遭受CSRF攻击（可以在服务器端检查Refer和Origin）

CSRF:跨站请求伪造，简单的说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如：发邮件、发信息、甚至财产操作如转账和购买商品）。
由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。这利用了web中用户身份验证的一个漏洞：简单的身份验证职能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出去的。CSRF并不能够拿到用户的任何信息，它只是欺骗用户浏览器，让其以用户的名义进行操作。


### 登录设置**token**

```js
// form表单校验通过 val => true
this.$refs.form.validate(val => {
    if (val) {
        getMenu(JSON.stringify(this.form)).then(({data}) => {
            if (data.code === 200) {
                const {token} = data.data   // 解构 token
                Cookie.set('token', token)  // 设置 token
                
                this.$router.push('/home')  // 跳转 home
            } else {
                this.$message.error(data.message)
            }
        })
    }
})
```

### 全局守卫配置

```js
// @/router/index.js
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {  // 如果没有token，而且to不是login就跳转login
        next({name: 'login'})
    } else if (token && to.name === 'login') {   // token已经存在，避免跳转到 login
        next({name: 'home'})
    } else {
        next()
    }
})
```

## 不同用户登录显示不同导航（权限）

原理：单独为用户配置不同的路由，在登录时动态添加路由

