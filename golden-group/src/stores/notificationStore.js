import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref([
    {
      id: 1,
      type: 'order',
      title: 'تأكيد الطلب',
      message: 'تم استلام طلبك رقم #ORD-2026-003 بنجاح',
      icon: '📦',
      read: false,
      createdAt: '2026-07-20T10:30:00Z'
    },
    {
      id: 2,
      type: 'installment',
      title: 'موعد القسط القادم',
      message: 'قسطك الشهري القادم بتاريخ 01/08/2026 بقيمة 91,667 د.ع',
      icon: '📅',
      read: false,
      createdAt: '2026-07-19T08:00:00Z'
    },
    {
      id: 3,
      type: 'deduction',
      title: 'تم تنفيذ الاستقطاع',
      message: 'تم استقطاع قسط شهر يوليو بنجاح من راتبك',
      icon: '✅',
      read: false,
      createdAt: '2026-07-15T14:20:00Z'
    },
    {
      id: 4,
      type: 'offer',
      title: 'عرض خاص',
      message: 'خصم 20% على جميع لوحات آيباد - العرض ساري لفترة محدودة',
      icon: '🎉',
      read: true,
      createdAt: '2026-07-18T09:00:00Z'
    },
    {
      id: 5,
      type: 'contract',
      title: 'إنشاء العقد',
      message: 'تم إنشاء عقد التقسيط رقم CON-2026-001 بنجاح',
      icon: '📋',
      read: true,
      createdAt: '2026-07-10T11:45:00Z'
    },
    {
      id: 6,
      type: 'approval',
      title: 'الموافقة النهائية',
      message: 'تمت الموافقة على طلب التقسيط الخاص بك - يمكنك الآن استلام المنتج',
      icon: '🎉',
      read: true,
      createdAt: '2026-07-08T16:30:00Z'
    },
    {
      id: 7,
      type: 'message',
      message: 'رسالة من الإدارة: يرجى تحديث بيانات جهة العمل',
      title: 'رسالة من الإدارة',
      icon: '💬',
      read: true,
      createdAt: '2026-07-05T12:00:00Z'
    }
  ])

  const loading = ref(false)

  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  function markAsRead(id) {
    const notif = notifications.value.find(n => n.id === id)
    if (notif) notif.read = true
  }

  function markAllRead() {
    notifications.value.forEach(n => { n.read = true })
  }

  function addNotification(notif) {
    notifications.value.unshift({
      id: Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
      ...notif
    })
  }

  async function fetchNotifications() {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 300))
    } finally {
      loading.value = false
    }
  }

  return { notifications, loading, unreadCount, markAsRead, markAllRead, addNotification, fetchNotifications }
})
