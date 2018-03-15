import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _ebde25cc = () => import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */).then(m => m.default || m)
const _4eeee41d = () => import('..\\pages\\success.vue' /* webpackChunkName: "pages_success" */).then(m => m.default || m)
const _e5ca5b28 = () => import('..\\pages\\falsePage.vue' /* webpackChunkName: "pages_falsePage" */).then(m => m.default || m)
const _53399e15 = () => import('..\\pages\\activity\\payForActivity.vue' /* webpackChunkName: "pages_activity_payForActivity" */).then(m => m.default || m)
const _41837833 = () => import('..\\pages\\guide\\booking.vue' /* webpackChunkName: "pages_guide_booking" */).then(m => m.default || m)
const _0718e96a = () => import('..\\pages\\activity\\fillYourInfoMobile.vue' /* webpackChunkName: "pages_activity_fillYourInfoMobile" */).then(m => m.default || m)
const _18d90849 = () => import('..\\pages\\activity\\fillYourInfo.vue' /* webpackChunkName: "pages_activity_fillYourInfo" */).then(m => m.default || m)
const _5a79dc40 = () => import('..\\pages\\guide\\pay\\index.vue' /* webpackChunkName: "pages_guide_pay_index" */).then(m => m.default || m)
const _30534f63 = () => import('..\\pages\\guide\\detail\\_id.vue' /* webpackChunkName: "pages_guide_detail__id" */).then(m => m.default || m)
const _7448dd5d = () => import('..\\pages\\activity\\details\\_id.vue' /* webpackChunkName: "pages_activity_details__id" */).then(m => m.default || m)
const _2c7ba706 = () => import('..\\pages\\guide\\list\\_slug.vue' /* webpackChunkName: "pages_guide_list__slug" */).then(m => m.default || m)
const _0a933717 = () => import('..\\pages\\activity\\list\\_slug.vue' /* webpackChunkName: "pages_activity_list__slug" */).then(m => m.default || m)
const _7c98fc36 = () => import('..\\pages\\guide\\activity\\_id.vue' /* webpackChunkName: "pages_guide_activity__id" */).then(m => m.default || m)
const _f06231de = () => import('..\\pages\\activity\\recommend\\_loc\\_keywords.vue' /* webpackChunkName: "pages_activity_recommend__loc__keywords" */).then(m => m.default || m)
const _d18eb428 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			path: "/test",
			component: _ebde25cc,
			name: "test"
		},
		{
			path: "/success",
			component: _4eeee41d,
			name: "success"
		},
		{
			path: "/falsePage",
			component: _e5ca5b28,
			name: "falsePage"
		},
		{
			path: "/activity/payForActivity",
			component: _53399e15,
			name: "activity-payForActivity"
		},
		{
			path: "/guide/booking",
			component: _41837833,
			name: "guide-booking"
		},
		{
			path: "/activity/fillYourInfoMobile",
			component: _0718e96a,
			name: "activity-fillYourInfoMobile"
		},
		{
			path: "/activity/fillYourInfo",
			component: _18d90849,
			name: "activity-fillYourInfo"
		},
		{
			path: "/guide/pay",
			component: _5a79dc40,
			name: "guide-pay"
		},
		{
			path: "/guide/detail/:id?",
			component: _30534f63,
			name: "guide-detail-id"
		},
		{
			path: "/activity/details/:id?",
			component: _7448dd5d,
			name: "activity-details-id"
		},
		{
			path: "/guide/list/:slug?",
			component: _2c7ba706,
			name: "guide-list-slug"
		},
		{
			path: "/activity/list/:slug?",
			component: _0a933717,
			name: "activity-list-slug"
		},
		{
			path: "/guide/activity/:id?",
			component: _7c98fc36,
			name: "guide-activity-id"
		},
		{
			path: "/activity/recommend/:loc?/:keywords?",
			component: _f06231de,
			name: "activity-recommend-loc-keywords"
		},
		{
			path: "/",
			component: _d18eb428,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
