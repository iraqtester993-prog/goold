<template>
  <div class="installment-page">
    <div class="container">
      <div class="page-header">
        <button class="back-btn" @click="$router.back()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <h1 class="page-title">طلب تقسيط</h1>
      </div>

      <div v-if="cartStore.items.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <h2>لا توجد منتجات في السلة</h2>
        <p>أضف منتجات إلى السلة أولاً ثم قدم طلب التقسيط</p>
        <router-link to="/products" class="btn btn-gold">تصفح المنتجات</router-link>
      </div>

      <template v-else>
        <div class="progress-wrapper">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: ((currentStep / totalSteps) * 100) + '%' }"></div>
          </div>
          <div class="progress-steps">
            <div
              v-for="(step, i) in steps"
              :key="i"
              class="progress-step"
              :class="{ active: currentStep === i + 1, completed: currentStep > i + 1 }"
              @click="goToStep(i + 1)"
            >
              <div class="step-circle">
                <svg v-if="currentStep > i + 1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="step-label">{{ step }}</span>
            </div>
          </div>
        </div>

        <div class="form-card">
          <transition name="slide-fade" mode="out-in">
            <div :key="currentStep">
              <template v-if="currentStep === 1">
                <div class="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h2>المعلومات الشخصية</h2>
                <div class="form-row">
                  <div class="form-group">
                    <label>الاسم الكامل <span class="required">*</span></label>
                    <input v-model="form.fullName" type="text" class="form-input" placeholder="الاسم كما في الهوية" />
                  </div>
                  <div class="form-group">
                    <label>رقم الهاتف <span class="required">*</span></label>
                    <input v-model="form.phone" type="tel" class="form-input" placeholder="07XX XXX XXXX" dir="ltr" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>البريد الإلكتروني</label>
                    <input v-model="form.email" type="email" class="form-input" placeholder="example@email.com" dir="ltr" />
                  </div>
                  <div class="form-group">
                    <label>رقم الهوية الوطنية <span class="required">*</span></label>
                    <input v-model="form.nationalId" type="text" class="form-input" placeholder="رقم الهوية" dir="ltr" />
                  </div>
                </div>
                <div class="form-group">
                  <label>تاريخ الميلاد <span class="required">*</span></label>
                  <input v-model="form.birthDate" type="date" class="form-input" />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>أقساط سابقة؟ <span class="required">*</span></label>
                    <div class="toggle-group">
                      <button type="button" class="toggle-btn" :class="{ active: form.previousInstallments === true }" @click="form.previousInstallments = true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        نعم
                      </button>
                      <button type="button" class="toggle-btn" :class="{ active: form.previousInstallments === false }" @click="form.previousInstallments = false">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        لا
                      </button>
                    </div>
                  </div>
                  <div class="form-group" v-if="form.previousInstallments">
                    <label>عدد الأقساط السابقة</label>
                    <input v-model="form.previousInstallmentCount" type="number" class="form-input" placeholder="العدد" dir="ltr" />
                  </div>
                </div>
              </template>

              <template v-if="currentStep === 2">
                <div class="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h2>معلومات العمل</h2>
                <div class="form-row">
                  <div class="form-group">
                    <label>اسم جهة العمل <span class="required">*</span></label>
                    <input v-model="form.employerName" type="text" class="form-input" placeholder="اسم الجهة أو الشركة" />
                  </div>
                  <div class="form-group">
                    <label>رمز جهة العمل</label>
                    <input v-model="form.employerCode" type="text" class="form-input" placeholder="الرمز الوظيفي" dir="ltr" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>الراتب الشهري <span class="required">*</span></label>
                    <input v-model="form.salary" type="number" class="form-input" placeholder="بالمبلغ العراقي" dir="ltr" />
                  </div>
                  <div class="form-group">
                    <label>المسمى الوظيفي <span class="required">*</span></label>
                    <input v-model="form.jobTitle" type="text" class="form-input" placeholder="المسمى الوظيفي الحالي" />
                  </div>
                </div>
              </template>

              <template v-if="currentStep === 3">
                <div class="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h2>معلومات العنوان</h2>
                <div class="form-row">
                  <div class="form-group">
                    <label>المدينة <span class="required">*</span></label>
                    <div class="select-wrapper">
                      <select v-model="form.city" class="form-input">
                        <option value="">اختر المدينة</option>
                        <option value="بغداد">بغداد</option>
                        <option value="البصرة">البصرة</option>
                        <option value="أربيل">أربيل</option>
                        <option value="السليمانية">السليمانية</option>
                        <option value="النجف">النجف</option>
                        <option value="كربلاء">كربلاء</option>
                        <option value="الموصل">الموصل</option>
                        <option value="ديالى">ديالى</option>
                        <option value="نينوى">نينوى</option>
                        <option value="كركوك">كركوك</option>
                        <option value="ذي قار">ذي قار</option>
                        <option value="ميسان">ميسان</option>
                        <option value="القادسية">القادسية</option>
                        <option value="الأنبار">الأنبار</option>
                        <option value="صلاح الدين">صلاح الدين</option>
                        <option value="دهوك">دهوك</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>القضاء / المنطقة <span class="required">*</span></label>
                    <input v-model="form.district" type="text" class="form-input" placeholder="القضاء أو المنطقة" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>الشارع <span class="required">*</span></label>
                    <input v-model="form.street" type="text" class="form-input" placeholder="رقم واسم الشارع" />
                  </div>
                  <div class="form-group">
                    <label>رقم المنزل</label>
                    <input v-model="form.houseNumber" type="text" class="form-input" placeholder="رقم المنزل" dir="ltr" />
                  </div>
                </div>
              </template>

              <template v-if="currentStep === 4">
                <div class="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h2>معلومات الكفيل</h2>
                <div class="form-row">
                  <div class="form-group">
                    <label>اسم الكفيل <span class="required">*</span></label>
                    <input v-model="form.guarantorName" type="text" class="form-input" placeholder="الاسم الكامل للكفيل" />
                  </div>
                  <div class="form-group">
                    <label>رقم هاتف الكفيل <span class="required">*</span></label>
                    <input v-model="form.guarantorPhone" type="tel" class="form-input" placeholder="07XX XXX XXXX" dir="ltr" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>صلة القرابة <span class="required">*</span></label>
                    <div class="select-wrapper">
                      <select v-model="form.guarantorRelationship" class="form-input">
                        <option value="">اختر صلة القرابة</option>
                        <option value="أب">أب</option>
                        <option value="أم">أم</option>
                        <option value="أخ">أخ</option>
                        <option value="أخت">أخت</option>
                        <option value="زوج">زوج</option>
                        <option value="زوجة">زوجة</option>
                        <option value="ابن">ابن</option>
                        <option value="ابنة">ابنة</option>
                        <option value="عم">عم</option>
                        <option value="خال">خال</option>
                        <option value="صديق">صديق</option>
                        <option value="آخر">آخر</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>رقم هوية الكفيل <span class="required">*</span></label>
                    <input v-model="form.guarantorNationalId" type="text" class="form-input" placeholder="رقم الهوية" dir="ltr" />
                  </div>
                </div>
              </template>

              <template v-if="currentStep === 5">
                <div class="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <h2>رفع المستندات</h2>
                <div class="uploads-grid">
                  <div class="upload-card" @click="triggerUpload('idFront')">
                    <input :ref="el => uploadRefs.idFront = el" type="file" accept="image/*" class="hidden-input" @change="handleFile($event, 'idFront')" />
                    <div v-if="uploads.idFront" class="upload-preview">
                      <img :src="uploads.idFront" alt="الهوية الأمامية" />
                      <button class="remove-upload" @click.stop="uploads.idFront = null">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div v-else class="upload-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>الهوية الوطنية (الوجه الأمامي)</span>
                    </div>
                  </div>

                  <div class="upload-card" @click="triggerUpload('idBack')">
                    <input :ref="el => uploadRefs.idBack = el" type="file" accept="image/*" class="hidden-input" @change="handleFile($event, 'idBack')" />
                    <div v-if="uploads.idBack" class="upload-preview">
                      <img :src="uploads.idBack" alt="الهوية الخلفية" />
                      <button class="remove-upload" @click.stop="uploads.idBack = null">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div v-else class="upload-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>الهوية الوطنية (الوجه الخلفي)</span>
                    </div>
                  </div>

                  <div class="upload-card" @click="triggerUpload('personalPhoto')">
                    <input :ref="el => uploadRefs.personalPhoto = el" type="file" accept="image/*" class="hidden-input" @change="handleFile($event, 'personalPhoto')" />
                    <div v-if="uploads.personalPhoto" class="upload-preview">
                      <img :src="uploads.personalPhoto" alt="الصورة الشخصية" />
                      <button class="remove-upload" @click.stop="uploads.personalPhoto = null">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div v-else class="upload-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      <span>الصورة الشخصية</span>
                    </div>
                  </div>

                  <div class="upload-card" @click="triggerUpload('signature')">
                    <input :ref="el => uploadRefs.signature = el" type="file" accept="image/*" class="hidden-input" @change="handleFile($event, 'signature')" />
                    <div v-if="uploads.signature" class="upload-preview">
                      <img :src="uploads.signature" alt="التوقيع" />
                      <button class="remove-upload" @click.stop="uploads.signature = null">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div v-else class="upload-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                      </svg>
                      <span>التوقيع</span>
                    </div>
                  </div>

                  <div class="upload-card" @click="triggerUpload('departmentId')">
                    <input :ref="el => uploadRefs.departmentId = el" type="file" accept="image/*" class="hidden-input" @change="handleFile($event, 'departmentId')" />
                    <div v-if="uploads.departmentId" class="upload-preview">
                      <img :src="uploads.departmentId" alt="هوية الدائرة" />
                      <button class="remove-upload" @click.stop="uploads.departmentId = null">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                    <div v-else class="upload-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                      <span>هوية الدائرة</span>
                    </div>
                  </div>

                  <div class="upload-card" @click="triggerUpload('residenceCard')">
                    <input :ref="el => uploadRefs.residenceCard = el" type="file" accept="image/*" class="hidden-input" @change="handleFile($event, 'residenceCard')" />
                    <div v-if="uploads.residenceCard" class="upload-preview">
                      <img :src="uploads.residenceCard" alt="بطاقة السكن" />
                      <button class="remove-upload" @click.stop="uploads.residenceCard = null">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                    <div v-else class="upload-placeholder">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <span>بطاقة السكن</span>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="currentStep === 6">
                <div class="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <h2>مراجعة الطلب</h2>

                <div class="review-section">
                  <h3>المعلومات الشخصية</h3>
                  <div class="review-grid">
                    <div class="review-item">
                      <span class="review-label">الاسم</span>
                      <span class="review-value">{{ form.fullName || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">الهاتف</span>
                      <span class="review-value" dir="ltr">{{ form.phone || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">البريد</span>
                      <span class="review-value" dir="ltr">{{ form.email || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">رقم الهوية</span>
                      <span class="review-value" dir="ltr">{{ form.nationalId || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">أقساط سابقة</span>
                      <span class="review-value">{{ form.previousInstallments ? 'نعم' : 'لا' }}{{ form.previousInstallments && form.previousInstallmentCount ? ` (${form.previousInstallmentCount} قسط)` : '' }}</span>
                    </div>
                  </div>
                </div>

                <div class="review-section">
                  <h3>معلومات العمل</h3>
                  <div class="review-grid">
                    <div class="review-item">
                      <span class="review-label">جهة العمل</span>
                      <span class="review-value">{{ form.employerName || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">الرمز</span>
                      <span class="review-value" dir="ltr">{{ form.employerCode || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">الراتب</span>
                      <span class="review-value">{{ form.salary ? formatCurrency(form.salary) : '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">المسمى</span>
                      <span class="review-value">{{ form.jobTitle || '—' }}</span>
                    </div>
                  </div>
                </div>

                <div class="review-section">
                  <h3>العنوان</h3>
                  <div class="review-grid">
                    <div class="review-item">
                      <span class="review-label">المدينة</span>
                      <span class="review-value">{{ form.city || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">القضاء</span>
                      <span class="review-value">{{ form.district || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">الشارع</span>
                      <span class="review-value">{{ form.street || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">رقم المنزل</span>
                      <span class="review-value" dir="ltr">{{ form.houseNumber || '—' }}</span>
                    </div>
                  </div>
                </div>

                <div class="review-section">
                  <h3>الكفيل</h3>
                  <div class="review-grid">
                    <div class="review-item">
                      <span class="review-label">الاسم</span>
                      <span class="review-value">{{ form.guarantorName || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">الهاتف</span>
                      <span class="review-value" dir="ltr">{{ form.guarantorPhone || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">صلة القرابة</span>
                      <span class="review-value">{{ form.guarantorRelationship || '—' }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">رقم الهوية</span>
                      <span class="review-value" dir="ltr">{{ form.guarantorNationalId || '—' }}</span>
                    </div>
                  </div>
                </div>

                <div class="review-section">
                  <h3>المنتجات المطلوبة</h3>
                  <div class="review-items">
                    <div v-for="item in cartStore.items" :key="item.id" class="review-product">
                      <img :src="item.image" :alt="item.name" />
                      <div class="product-info">
                        <span class="product-name">{{ item.name }}</span>
                        <span class="product-qty">الكمية: {{ item.quantity }}</span>
                      </div>
                      <span class="product-price">{{ formatCurrency(item.price * item.quantity) }}</span>
                    </div>
                  </div>
                </div>

                <div class="installment-summary">
                  <div class="summary-row">
                    <span>المنتجات ({{ cartStore.totalItems }})</span>
                    <span>{{ formatCurrency(cartStore.totalPrice) }}</span>
                  </div>
                  <div class="summary-row">
                    <span>التوصيل</span>
                    <span class="free-delivery">مجاني</span>
                  </div>
                  <div class="summary-row total">
                    <span>الإجمالي</span>
                    <span class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</span>
                  </div>
                </div>

                <div class="agreement-check">
                  <label class="check-label">
                    <input type="checkbox" v-model="agreed" />
                    <span class="checkmark"></span>
                    <span>أوافق على شروط وأحكام التقسيط ومسؤولية السداد في الموعد المحدد</span>
                  </label>
                </div>
              </template>
            </div>
          </transition>
        </div>

        <div class="navigation-buttons">
          <button v-if="currentStep > 1" class="btn btn-outline" @click="prevStep">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            السابق
          </button>
          <div v-else></div>

          <button v-if="currentStep < totalSteps" class="btn btn-gold" @click="nextStep">
            التالي
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button v-else class="btn btn-gold btn-lg" @click="submitRequest" :disabled="!agreed || submitting">
            <template v-if="submitting">
              <span class="spinner"></span>
              جاري الإرسال...
            </template>
            <template v-else>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              إرسال الطلب
            </template>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

const steps = ['الشخصية', 'العمل', 'العنوان', 'الكفيل', 'المستندات', 'المراجعة']
const totalSteps = steps.length
const currentStep = ref(1)
const agreed = ref(false)
const submitting = ref(false)

const uploadRefs = reactive({
  idFront: null,
  idBack: null,
  personalPhoto: null,
  signature: null,
  departmentId: null,
  residenceCard: null
})

const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  nationalId: '',
  birthDate: '',
  previousInstallments: false,
  previousInstallmentCount: '',
  employerName: '',
  employerCode: '',
  salary: '',
  jobTitle: '',
  city: '',
  district: '',
  street: '',
  houseNumber: '',
  guarantorName: '',
  guarantorPhone: '',
  guarantorRelationship: '',
  guarantorNationalId: ''
})

const uploads = reactive({
  idFront: null,
  idBack: null,
  personalPhoto: null,
  signature: null,
  departmentId: null,
  residenceCard: null
})

function triggerUpload(key) {
  uploadRefs[key]?.click()
}

function handleFile(event, key) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploads[key] = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function goToStep(step) {
  if (step < currentStep.value) {
    currentStep.value = step
  }
}

function submitRequest() {
  if (!agreed.value) return

  submitting.value = true

  setTimeout(() => {
    const order = orderStore.createOrder({
      ...form,
      items: cartStore.items,
      total: cartStore.totalPrice,
      paymentMethod: 'installment',
      type: 'installment'
    })

    cartStore.clearCart()
    router.push(`/orders/${order.id}`)
    submitting.value = false
  }, 1200)
}
</script>

<style scoped>
.installment-page {
  padding: 24px 0 100px;
  min-height: 70vh;
}

.container {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.back-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  font-family: 'Cairo', sans-serif;
  color: var(--text-primary);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 50%;
}

.empty-state h2 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 24px;
  font-size: 0.9rem;
}

/* Progress Bar */
.progress-wrapper {
  margin-bottom: 32px;
}

.progress-bar {
  height: 4px;
  background: var(--bg-input);
  border-radius: var(--radius-full);
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold-gradient);
  border-radius: var(--radius-full);
  transition: width 0.4s ease;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: default;
}

.step-circle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  background: var(--bg-input);
  color: var(--text-muted);
  border: 2px solid var(--border-light);
  transition: all var(--transition-normal);
}

.progress-step.active .step-circle {
  background: var(--color-gold-gradient);
  color: #fff;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 4px rgba(212, 168, 67, 0.15);
}

.progress-step.completed .step-circle {
  background: #22c55e;
  color: #fff;
  border-color: #22c55e;
}

.step-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
  max-width: 60px;
}

.progress-step.active .step-label {
  color: var(--color-gold);
}

.progress-step.completed .step-label {
  color: #22c55e;
}

/* Form Card */
.form-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 32px;
  margin-bottom: 24px;
}

.section-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 168, 67, 0.1);
  color: var(--color-gold);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.form-card h2 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-family: 'Cairo', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: all var(--transition-fast);
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--color-gold);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

select.form-input {
  appearance: none;
  cursor: pointer;
}

.select-wrapper {
  position: relative;
}

.toggle-group { display: flex; gap: 10px; }
.toggle-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 16px; background: var(--bg-input); border: 2px solid transparent; border-radius: var(--radius-md); font-family: 'Cairo', sans-serif; font-size: 0.9rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
.toggle-btn:hover { border-color: var(--border-color); }
.toggle-btn.active { border-color: var(--color-gold); background: rgba(212, 168, 67, 0.08); color: var(--color-gold); }

/* Upload Grid */
.uploads-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.upload-card {
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  overflow: hidden;
}

.upload-card:hover {
  border-color: var(--color-gold);
}

.hidden-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 16px;
  text-align: center;
}

.upload-placeholder span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  line-height: 1.4;
}

.upload-preview {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-upload {
  position: absolute;
  top: 6px;
  left: 6px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
  border-radius: 50%;
  transition: background var(--transition-fast);
}

.remove-upload:hover {
  background: #ef4444;
}

/* Review Sections */
.review-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
}

.review-section:last-of-type {
  border-bottom: none;
  margin-bottom: 20px;
  padding-bottom: 0;
}

.review-section h3 {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--color-gold);
  margin-bottom: 14px;
  font-family: 'Cairo', sans-serif;
}

.review-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.review-item {
  padding: 10px 14px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.review-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 3px;
}

.review-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}

.review-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.review-product {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.review-product img {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.product-info {
  flex: 1;
}

.product-name {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
}

.product-qty {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.product-price {
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--color-gold);
  white-space: nowrap;
}

/* Installment Summary */
.installment-summary {
  background: var(--bg-input);
  border-radius: var(--radius-lg);
  padding: 18px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.free-delivery {
  color: #22c55e;
  font-weight: 600;
}

.summary-row.total {
  padding-top: 12px;
  border-top: 2px solid var(--border-light);
  margin-top: 4px;
  font-weight: 800;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.2rem;
  font-weight: 900;
}

/* Agreement */
.agreement-check {
  margin-top: 8px;
}

.check-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.check-label input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  transition: all var(--transition-fast);
  position: relative;
  margin-top: 2px;
}

.check-label input:checked + .checkmark {
  background: var(--color-gold);
  border-color: var(--color-gold);
}

.check-label input:checked + .checkmark::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  width: 6px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-lg);
  font-family: 'Cairo', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: all var(--transition-normal);
  cursor: pointer;
  border: none;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1rem;
}

.btn-gold {
  background: var(--color-gold-gradient);
  color: #fff;
  box-shadow: var(--shadow-gold);
}

.btn-gold:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(212, 168, 67, 0.35);
}

.btn-gold:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
}

.btn-outline:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.15s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive */
@media (max-width: 600px) {
  .installment-page {
    padding: 16px 0 120px;
  }

  .page-title {
    font-size: 1.3rem;
  }

  .form-card {
    padding: 22px 18px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .uploads-grid {
    grid-template-columns: 1fr;
  }

  .review-grid {
    grid-template-columns: 1fr;
  }

  .progress-steps {
    gap: 4px;
  }

  .step-label {
    font-size: 0.6rem;
    max-width: 44px;
  }

  .step-circle {
    width: 28px;
    height: 28px;
    font-size: 0.72rem;
  }
}
</style>
