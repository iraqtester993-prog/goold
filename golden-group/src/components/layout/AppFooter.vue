<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <div class="footer-logo">
            <svg viewBox="0 0 40 40" width="32" height="32">
              <rect x="4" y="4" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.8"/>
              <rect x="22" y="4" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.6"/>
              <rect x="4" y="22" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.6"/>
              <rect x="22" y="22" width="14" height="14" rx="2" fill="var(--color-gold)" opacity="0.4"/>
              <rect x="13" y="13" width="14" height="14" rx="2" fill="var(--color-gold)"/>
            </svg>
            <span class="footer-brand">العصر الذهبي</span>
          </div>
          <p class="footer-desc">متجر الأجهزة الإلكترونية - تسوق بالقسط والحاضر بالدينار العراقي</p>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">روابط سريعة</h4>
          <ul class="footer-links">
            <li><router-link to="/">الرئيسية</router-link></li>
            <li><router-link to="/products">المنتجات</router-link></li>
            <li><router-link to="/cart">سلة المشتريات</router-link></li>
            <li><router-link to="/orders">طلباتي</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">الأقسام</h4>
          <ul class="footer-links">
            <li><router-link to="/category/phones">هواتف</router-link></li>
            <li><router-link to="/category/laptops">لابتوب</router-link></li>
            <li><router-link to="/category/tablets">لوحات</router-link></li>
            <li><router-link to="/category/audio">سماعات</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">تواصل معنا</h4>
          <div class="contact-info">
            <p>📞 07XX XXX XXXX</p>
            <p>📧 info@goldenage.iq</p>
            <p>📍 بغداد، العراق</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ currentYear }} العصر الذهبي. جميع الحقوق محفوظة</p>
        <div class="payment-methods">
          <span class="payment-badge">💳 دفع إلكتروني</span>
          <span class="payment-badge">🏦 تحويل بنكي</span>
          <span class="payment-badge">💵 الدفع عند الاستلام</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  padding: 48px 0 24px;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .app-footer {
    display: none;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.footer-brand {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-gold);
}

.footer-desc {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.7;
}

.footer-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: var(--text-secondary);
  font-size: 0.85rem;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-gold);
}

.contact-info p {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid var(--border-light);
}

.footer-bottom p {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.payment-methods {
  display: flex;
  gap: 12px;
}

.payment-badge {
  padding: 4px 12px;
  background: var(--bg-card);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-secondary);
}
</style>
