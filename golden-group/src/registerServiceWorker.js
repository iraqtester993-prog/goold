import { registerSW } from 'virtual:pwa-register'

export const updateSW = registerSW({
  immediateNeeded: true,
  onOfflineReady() {
    console.log('التطبيق جاهز للعمل بدون إنترنت')
  },
  onNeedRefresh() {
    console.log('تحديث جديد متاح')
  }
})
