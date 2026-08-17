<template>
  <div class="cs-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <h1 class="page-title">خدمة العملاء</h1>
    </div>

    <div class="container">
      <div class="quick-actions">
        <div class="action-card" @click="placeholder('محادثة مباشرة قادمة قريباً')">
          <div class="action-icon chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span class="action-label">محادثة مباشرة</span>
        </div>

        <div class="action-card" @click="placeholder('نظام التذاكر قادم قريباً')">
          <div class="action-icon ticket">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <span class="action-label">فتح تذكرة دعم</span>
        </div>

        <a href="tel:+9647801234567" class="action-card">
          <div class="action-icon phone">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <span class="action-label">الاتصال بنا</span>
        </a>

        <a href="https://wa.me/9647801234567" target="_blank" rel="noopener" class="action-card">
          <div class="action-icon whatsapp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span class="action-label">واتساب</span>
        </a>
      </div>

      <div class="faq-section">
        <h2 class="section-title">الأسئلة الشائعة</h2>
        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq-item"
            :class="{ open: openFaq === i }"
          >
            <button class="faq-question" @click="toggleFaq(i)">
              <span>{{ faq.q }}</span>
              <svg
                class="faq-chevron"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="faq-answer">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toastMsg" class="toast" @click="toastMsg = ''">
      {{ toastMsg }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openFaq = ref(null)
const toastMsg = ref('')

function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? null : i
}

function placeholder(msg) {
  toastMsg.value = msg
  setTimeout(() => { toastMsg.value = '' }, 2500)
}

const faqs = [
  {
    q: 'كيف أقدم طلب تقسيط؟',
    a: 'اختر المنتج المطلوب، ثم اختر خيار التقسيط المناسب من خيارات الدفع. ستحتاج لتقديم بيانات جهة العمل للموافقة على الطلب.'
  },
  {
    q: 'كيف يتم استقطاع الأقساط؟',
    a: 'يتم استقطاع القسط الشهري تلقائياً من راتبك عبر جهة العمل كل شهر. سيتم إشعارك قبل موعد الاستقطاع بيومين.'
  },
  {
    q: 'هل يمكن سداد القسط المبكر؟',
    a: 'نعم، يمكنك سداد كامل المبلغ المتبقي في أي وقت من خلال صفحة العقود. لن يتم فرض أي غرامات على السداد المبكر.'
  },
  {
    q: 'ماذا أفعل في حال تأخر الاستقطاع؟',
    a: 'في حال تأخر الاستقطاع، يرجى التواصل مع خدمة العملاء فوراً. يمكننا إعادة جدولة الدفع أو ترتيب بديل مناسب.'
  },
  {
    q: 'كيف أتابع حالة طلبي؟',
    a: 'يمكنك متابعة حالة طلبك من صفحة "طلباتي" في الملف الشخصي. ستتلقى إشعارات عند كل تحديث.'
  },
  {
    q: 'ما هي سياسة الإرجاع؟',
    a: 'يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام بشرط أن يكون بحالته الأصلية. يُرجى التواصل مع خدمة العملاء.'
  }
]
</script>

<style scoped>
.cs-page {
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.back-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color);
}

.page-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
}

.container {
  padding: 20px 16px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 32px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.action-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.action-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon.chat {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}

.action-icon.ticket {
  background: rgba(168, 85, 247, 0.12);
  color: #a855f7;
}

.action-icon.phone {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
}

.action-icon.whatsapp {
  background: rgba(37, 211, 102, 0.12);
  color: #25d366;
}

.action-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.faq-item.open {
  border-color: var(--border-color);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 16px 18px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.88rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  text-align: right;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.faq-question:hover {
  color: var(--color-gold);
}

.faq-chevron {
  flex-shrink: 0;
  transition: transform var(--transition-normal);
  color: var(--text-muted);
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  color: var(--color-gold);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-normal), padding var(--transition-normal);
}

.faq-item.open .faq-answer {
  max-height: 300px;
}

.faq-answer p {
  padding: 0 18px 16px;
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  z-index: 200;
  animation: toastIn 0.3s ease;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
