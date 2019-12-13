import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { constantRoutes,asyncRoutes } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

//最好看一下完整的代码，这个是基础搭建，好多功能都没
//路由拦截写在这里
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          //获取动态路由
          await store.dispatch('user/getInfo')
          // //后期才启用
          // await store.dispatch('user/getInfo').then(()=>{
          //   router.addRoutes([ {
          //     path: '/form',
          //     component: Layout,
          //     children: [
          //       {
          //         path: 'index',
          //         name: 'Form',
          //         component: () => import('@/views/form/index'),
          //         meta: { title: 'Form', icon: 'form' }
          //       }
          //     ]
          //   }]);// 动态添加可访问路由表
          // })

          //这个设置是可以访问，但不会添加到左侧栏
          router.addRoutes(asyncRoutes);
          let rout=constantRoutes.concat(asyncRoutes)
          router.options.routes=rout
          console.log(rout);
          console.log(router.options.routes);
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
