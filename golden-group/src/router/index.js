import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: () => import('../views/SplashScreen.vue'),
    meta: { title: 'البداية' }
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/WelcomePage.vue'),
    meta: { title: 'مرحباً' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
    meta: { title: 'تسجيل الدخول', guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { title: 'إنشاء حساب', guest: true }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
    meta: { title: 'الرئيسية' }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsPage.vue'),
    meta: { title: 'المنتجات' }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetailPage.vue'),
    meta: { title: 'تفاصيل المنتج' }
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: () => import('../views/ProductsPage.vue'),
    meta: { title: 'القسم' }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesPage.vue'),
    meta: { title: 'الأقسام' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartPage.vue'),
    meta: { title: 'سلة المشتريات' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutPage.vue'),
    meta: { title: 'إتمام الطلب' }
  },
  {
    path: '/installment-request',
    name: 'installment-request',
    component: () => import('../views/InstallmentRequestPage.vue'),
    meta: { title: 'طلب تقسيط' }
  },
  {
    path: '/installment-requests',
    name: 'installment-requests',
    component: () => import('../views/InstallmentRequestsPage.vue'),
    meta: { title: 'طلبات التقسيط' }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersPage.vue'),
    meta: { title: 'الطلبات' }
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: () => import('../views/OrderDetailPage.vue'),
    meta: { title: 'تفاصيل الطلب' }
  },
  {
    path: '/contracts',
    name: 'contracts',
    component: () => import('../views/ContractsPage.vue'),
    meta: { title: 'العقود' }
  },
  {
    path: '/contracts/:id',
    name: 'contract-detail',
    component: () => import('../views/ContractDetailPage.vue'),
    meta: { title: 'تفاصيل العقد' }
  },
  {
    path: '/deductions',
    name: 'deductions',
    component: () => import('../views/DeductionsPage.vue'),
    meta: { title: 'سجل الاستقطاعات' }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('../views/NotificationsPage.vue'),
    meta: { title: 'الإشعارات' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesPage.vue'),
    meta: { title: 'المفضلة' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: { title: 'حسابي' }
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: () => import('../views/ProfileEditPage.vue'),
    meta: { title: 'تعديل الملف' }
  },
  {
    path: '/customer-service',
    name: 'customer-service',
    component: () => import('../views/CustomerServicePage.vue'),
    meta: { title: 'خدمة العملاء' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsPage.vue'),
    meta: { title: 'الإعدادات' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'الرئيسية'} | العصر الذهبي`
  next()
})

export default router
