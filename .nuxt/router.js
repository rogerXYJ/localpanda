import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _75c1fb72 = () => import('../pages/error.vue' /* webpackChunkName: "pages/error" */).then(m => m.default || m)
const _c39154ca = () => import('../pages/test/index.vue' /* webpackChunkName: "pages/test/index" */).then(m => m.default || m)
const _7b9b046b = () => import('../pages/user/profile.vue' /* webpackChunkName: "pages/user/profile" */).then(m => m.default || m)
const _79e26898 = () => import('../pages/user/myBookings.vue' /* webpackChunkName: "pages/user/myBookings" */).then(m => m.default || m)
const _5d1d88a2 = () => import('../pages/activity/booking/index.vue' /* webpackChunkName: "pages/activity/booking/index" */).then(m => m.default || m)
const _4091a4a0 = () => import('../pages/guide/payment/index.vue' /* webpackChunkName: "pages/guide/payment/index" */).then(m => m.default || m)
const _3b595ee8 = () => import('../pages/activity/payment.vue' /* webpackChunkName: "pages/activity/payment" */).then(m => m.default || m)
const _3402a6a0 = () => import('../pages/guide/booking.vue' /* webpackChunkName: "pages/guide/booking" */).then(m => m.default || m)
const _08f7fdee = () => import('../pages/info/about-us.vue' /* webpackChunkName: "pages/info/about-us" */).then(m => m.default || m)
const _bce06a38 = () => import('../pages/payment/success.vue' /* webpackChunkName: "pages/payment/success" */).then(m => m.default || m)
const _e65659a6 = () => import('../pages/info/privacy.vue' /* webpackChunkName: "pages/info/privacy" */).then(m => m.default || m)
const _2d58ec56 = () => import('../pages/info/contact-us.vue' /* webpackChunkName: "pages/info/contact-us" */).then(m => m.default || m)
const _6221f12a = () => import('../pages/travel/customize/step1.vue' /* webpackChunkName: "pages/travel/customize/step1" */).then(m => m.default || m)
const _623008ab = () => import('../pages/travel/customize/step2.vue' /* webpackChunkName: "pages/travel/customize/step2" */).then(m => m.default || m)
const _198c3566 = () => import('../pages/travel/customize/done.vue' /* webpackChunkName: "pages/travel/customize/done" */).then(m => m.default || m)
const _623e202c = () => import('../pages/travel/customize/step3.vue' /* webpackChunkName: "pages/travel/customize/step3" */).then(m => m.default || m)
const _3c2b4005 = () => import('../pages/activity/booking/mobile/index.vue' /* webpackChunkName: "pages/activity/booking/mobile/index" */).then(m => m.default || m)
const _489952a0 = () => import('../pages/activity/details/mobile/bookDetail.vue' /* webpackChunkName: "pages/activity/details/mobile/bookDetail" */).then(m => m.default || m)
const _453966a4 = () => import('../pages/activity/details/mobile/_id.vue' /* webpackChunkName: "pages/activity/details/mobile/_id" */).then(m => m.default || m)
const _881c497a = () => import('../pages/activity/list/_slug.vue' /* webpackChunkName: "pages/activity/list/_slug" */).then(m => m.default || m)
const _a20d6e16 = () => import('../pages/guide/detail/_id.vue' /* webpackChunkName: "pages/guide/detail/_id" */).then(m => m.default || m)
const _b4b1871a = () => import('../pages/activity/details/_id.vue' /* webpackChunkName: "pages/activity/details/_id" */).then(m => m.default || m)
const _4f99b173 = () => import('../pages/guide/activity/_id.vue' /* webpackChunkName: "pages/guide/activity/_id" */).then(m => m.default || m)
const _0d79335c = () => import('../pages/guide/list/_slug.vue' /* webpackChunkName: "pages/guide/list/_slug" */).then(m => m.default || m)
const _5399f92c = () => import('../pages/travel/article/_articleId.vue' /* webpackChunkName: "pages/travel/article/_articleId" */).then(m => m.default || m)
const _564b2318 = () => import('../pages/activity/recommend/_loc/_keywords.vue' /* webpackChunkName: "pages/activity/recommend/_loc/_keywords" */).then(m => m.default || m)
const _31fbdd3c = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/error",
			component: _75c1fb72,
			name: "error"
		},
		{
			path: "/test",
			component: _c39154ca,
			name: "test"
		},
		{
			path: "/user/profile",
			component: _7b9b046b,
			name: "user-profile"
		},
		{
			path: "/user/myBookings",
			component: _79e26898,
			name: "user-myBookings"
		},
		{
			path: "/activity/booking",
			component: _5d1d88a2,
			name: "activity-booking"
		},
		{
			path: "/guide/payment",
			component: _4091a4a0,
			name: "guide-payment"
		},
		{
			path: "/activity/payment",
			component: _3b595ee8,
			name: "activity-payment"
		},
		{
			path: "/guide/booking",
			component: _3402a6a0,
			name: "guide-booking"
		},
		{
			path: "/info/about-us",
			component: _08f7fdee,
			name: "info-about-us"
		},
		{
			path: "/payment/success",
			component: _bce06a38,
			name: "payment-success"
		},
		{
			path: "/info/privacy",
			component: _e65659a6,
			name: "info-privacy"
		},
		{
			path: "/info/contact-us",
			component: _2d58ec56,
			name: "info-contact-us"
		},
		{
			path: "/travel/customize/step1",
			component: _6221f12a,
			name: "travel-customize-step1"
		},
		{
			path: "/travel/customize/step2",
			component: _623008ab,
			name: "travel-customize-step2"
		},
		{
			path: "/travel/customize/done",
			component: _198c3566,
			name: "travel-customize-done"
		},
		{
			path: "/travel/customize/step3",
			component: _623e202c,
			name: "travel-customize-step3"
		},
		{
			path: "/activity/booking/mobile",
			component: _3c2b4005,
			name: "activity-booking-mobile"
		},
		{
			path: "/activity/details/mobile/bookDetail",
			component: _489952a0,
			name: "activity-details-mobile-bookDetail"
		},
		{
			path: "/activity/details/mobile/:id?",
			component: _453966a4,
			name: "activity-details-mobile-id"
		},
		{
			path: "/activity/list/:slug?",
			component: _881c497a,
			name: "activity-list-slug"
		},
		{
			path: "/guide/detail/:id?",
			component: _a20d6e16,
			name: "guide-detail-id"
		},
		{
			path: "/activity/details/:id?",
			component: _b4b1871a,
			name: "activity-details-id"
		},
		{
			path: "/guide/activity/:id?",
			component: _4f99b173,
			name: "guide-activity-id"
		},
		{
			path: "/guide/list/:slug?",
			component: _0d79335c,
			name: "guide-list-slug"
		},
		{
			path: "/travel/article/:articleId?",
			component: _5399f92c,
			name: "travel-article-articleId"
		},
		{
			path: "/activity/recommend/:loc?/:keywords?",
			component: _564b2318,
			name: "activity-recommend-loc-keywords"
		},
		{
			path: "/",
			component: _31fbdd3c,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
