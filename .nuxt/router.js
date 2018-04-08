import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4a0277bc = () => import('..\\pages\\error.vue' /* webpackChunkName: "pages_error" */).then(m => m.default || m)
const _ebde25cc = () => import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */).then(m => m.default || m)
const _3beabbd8 = () => import('..\\pages\\user\\profile.vue' /* webpackChunkName: "pages_user_profile" */).then(m => m.default || m)
const _3fc14127 = () => import('..\\pages\\user\\myBookings.vue' /* webpackChunkName: "pages_user_myBookings" */).then(m => m.default || m)
const _c06b781e = () => import('..\\pages\\activity\\payment.vue' /* webpackChunkName: "pages_activity_payment" */).then(m => m.default || m)
const _41837833 = () => import('..\\pages\\guide\\booking.vue' /* webpackChunkName: "pages_guide_booking" */).then(m => m.default || m)
const _234c1184 = () => import('..\\pages\\activity\\booking\\index.vue' /* webpackChunkName: "pages_activity_booking_index" */).then(m => m.default || m)
const _e60875bc = () => import('..\\pages\\guide\\payment\\index.vue' /* webpackChunkName: "pages_guide_payment_index" */).then(m => m.default || m)
const _6fc65c93 = () => import('..\\pages\\payment\\success.vue' /* webpackChunkName: "pages_payment_success" */).then(m => m.default || m)
const _6b976fef = () => import('..\\pages\\info\\contact-us.vue' /* webpackChunkName: "pages_info_contact-us" */).then(m => m.default || m)
const _6aded23c = () => import('..\\pages\\info\\about-us.vue' /* webpackChunkName: "pages_info_about-us" */).then(m => m.default || m)
const _31db5733 = () => import('..\\pages\\travel\\customize\\step2.vue' /* webpackChunkName: "pages_travel_customize_step2" */).then(m => m.default || m)
const _3c6cdddc = () => import('..\\pages\\activity\\booking\\mobile\\index.vue' /* webpackChunkName: "pages_activity_booking_mobile_index" */).then(m => m.default || m)
const _31cd3fb2 = () => import('..\\pages\\travel\\customize\\step1.vue' /* webpackChunkName: "pages_travel_customize_step1" */).then(m => m.default || m)
const _31e96eb4 = () => import('..\\pages\\travel\\customize\\step3.vue' /* webpackChunkName: "pages_travel_customize_step3" */).then(m => m.default || m)
const _3db2b476 = () => import('..\\pages\\travel\\customize\\done.vue' /* webpackChunkName: "pages_travel_customize_done" */).then(m => m.default || m)
const _4041c62e = () => import('..\\pages\\activity\\details\\mobile\\bookDetail.vue' /* webpackChunkName: "pages_activity_details_mobile_bookDetail" */).then(m => m.default || m)
const _1e48ac7b = () => import('..\\pages\\activity\\details\\mobile\\_id.vue' /* webpackChunkName: "pages_activity_details_mobile__id" */).then(m => m.default || m)
const _0a933717 = () => import('..\\pages\\activity\\list\\_slug.vue' /* webpackChunkName: "pages_activity_list__slug" */).then(m => m.default || m)
const _2c7ba706 = () => import('..\\pages\\guide\\list\\_slug.vue' /* webpackChunkName: "pages_guide_list__slug" */).then(m => m.default || m)
const _30534f63 = () => import('..\\pages\\guide\\detail\\_id.vue' /* webpackChunkName: "pages_guide_detail__id" */).then(m => m.default || m)
const _7448dd5d = () => import('..\\pages\\activity\\details\\_id.vue' /* webpackChunkName: "pages_activity_details__id" */).then(m => m.default || m)
const _8b3da430 = () => import('..\\pages\\travel\\article\\_articleId.vue' /* webpackChunkName: "pages_travel_article__articleId" */).then(m => m.default || m)
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
			path: "/error",
			component: _4a0277bc,
			name: "error"
		},
		{
			path: "/test",
			component: _ebde25cc,
			name: "test"
		},
		{
			path: "/user/profile",
			component: _3beabbd8,
			name: "user-profile"
		},
		{
			path: "/user/myBookings",
			component: _3fc14127,
			name: "user-myBookings"
		},
		{
			path: "/activity/payment",
			component: _c06b781e,
			name: "activity-payment"
		},
		{
			path: "/guide/booking",
			component: _41837833,
			name: "guide-booking"
		},
		{
			path: "/activity/booking",
			component: _234c1184,
			name: "activity-booking"
		},
		{
			path: "/guide/payment",
			component: _e60875bc,
			name: "guide-payment"
		},
		{
			path: "/payment/success",
			component: _6fc65c93,
			name: "payment-success"
		},
		{
			path: "/info/contact-us",
			component: _6b976fef,
			name: "info-contact-us"
		},
		{
			path: "/info/about-us",
			component: _6aded23c,
			name: "info-about-us"
		},
		{
			path: "/travel/customize/step2",
			component: _31db5733,
			name: "travel-customize-step2"
		},
		{
			path: "/activity/booking/mobile",
			component: _3c6cdddc,
			name: "activity-booking-mobile"
		},
		{
			path: "/travel/customize/step1",
			component: _31cd3fb2,
			name: "travel-customize-step1"
		},
		{
			path: "/travel/customize/step3",
			component: _31e96eb4,
			name: "travel-customize-step3"
		},
		{
			path: "/travel/customize/done",
			component: _3db2b476,
			name: "travel-customize-done"
		},
		{
			path: "/activity/details/mobile/bookDetail",
			component: _4041c62e,
			name: "activity-details-mobile-bookDetail"
		},
		{
			path: "/activity/details/mobile/:id?",
			component: _1e48ac7b,
			name: "activity-details-mobile-id"
		},
		{
			path: "/activity/list/:slug?",
			component: _0a933717,
			name: "activity-list-slug"
		},
		{
			path: "/guide/list/:slug?",
			component: _2c7ba706,
			name: "guide-list-slug"
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
			path: "/travel/article/:articleId?",
			component: _8b3da430,
			name: "travel-article-articleId"
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
