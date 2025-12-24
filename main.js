// === ملف JavaScript لنواة طبيب ===
// فلسفة: تفاعلات ذكية، غير مزعجة، تعزز التجربة

class NawaatTabib {
    constructor() {
        this.init();
    }

    init() {
        // تهيئة جميع المكونات
        this.setupNav();
        this.setupAnimations();
        this.setupQuoteRotator();
        this.setupLazyLoading();
        this.setupCopyProtection();
        this.setupLanguageToggle();
        this.setupBackToTop();
    }

    // === إدارة التنقل ===
    setupNav() {
        const nav = document.querySelector('.main-nav');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        menuToggle.setAttribute('aria-label', 'فتح/إغلاق القائمة');
        
        const header = document.querySelector('.site-header');
        header.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // === التحريك عند التمرير ===
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // تأثيرات خاصة
                    if (entry.target.classList.contains('stagger-children')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            child.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
                        });
                    }
                    
                    // توقف المتابعة بعد الظهور
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // مراقبة العناصر المراد تحريكها
        document.querySelectorAll('.fade-in-up, .stagger-children').forEach(el => {
            observer.observe(el);
        });

        // خط تحت العناوين عند التمرير
        const underlineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('in-view', entry.isIntersecting);
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.scroll-underline').forEach(el => {
            underlineObserver.observe(el);
        });
    }

    // === تدوير الاقتباسات ===
    setupQuoteRotator() {
        const quotes = [
            {
                text: "السنّ ليس مجرد عظم، بل هو شاهد على تاريخ الإنسان وحارِسٌ لكرامته في المضغ والكلام والابتسام.",
                source: "مقال: سوسنة الأسنان"
            },
            {
                text: "أعظم أدوات طبيب الأسنان ليست المثقاب، بل القدرة على الاستماع لفهم قصة الألم قبل محوه.",
                source: "مقال: فلسفة الألم"
            },
            {
                text: "في عيادة الأسنان، نتعامل مع أكثر المناطق حميمية في الجسد البشري؛ لذلك يجب أن تكون يدنا خفيفة كالريح وقلبنا حاضرًا كالشمس.",
                source: "من يوميات العيادة"
            }
        ];

        const quoteElement = document.querySelector('.quote-text');
        const sourceElement = document.querySelector('.quote-source');
        
        if (!quoteElement) return;

        let currentIndex = 0;

        const rotateQuote = () => {
            // تأثير التلاشي
            quoteElement.style.opacity = '0';
            sourceElement.style.opacity = '0';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % quotes.length;
                const quote = quotes[currentIndex];
                
                quoteElement.textContent = `"${quote.text}"`;
                sourceElement.textContent = `- ${quote.source}`;
                
                // الظهور التدريجي
                quoteElement.style.opacity = '1';
                sourceElement.style.opacity = '1';
            }, 500);
        };

        // تدوير كل 30 ثانية
        setInterval(rotateQuote, 30000);
    }

    // === التحميل الكسول للصور ===
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.classList.add('loaded');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.lazy-image').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // === حماية المحتوى الذكية ===
    setupCopyProtection() {
        // منع النسخ العام (لكن مع استثناءات ذكية)
        document.addEventListener('copy', (e) => {
            const selection = window.getSelection();
            const selectedText = selection.toString();
            
            // إذا كان النص المحدد يحتوي على أكثر من 100 حرف
            if (selectedText.length > 100) {
                e.preventDefault();
                
                // عرض رسالة بديلة
                this.showToast('لحماية المحتوى الفكري، يرجى استخدام زر "اقتبس" المخصص في نهاية المقالة', 'info');
                return false;
            }
        });

        // منع النقر الأيمن على الصور
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                this.showToast('الصور محمية لحفظ حقوق المؤلف', 'info');
            }
        }, false);
    }

    // === تبديل اللغة ===
    setupLanguageToggle() {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'language-toggle';
        toggleBtn.setAttribute('aria-label', 'تبديل اللغة');
        toggleBtn.innerHTML = 'EN / AR';
        
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(toggleBtn);
        }

        toggleBtn.addEventListener('click', () => {
            document.documentElement.lang = 
                document.documentElement.lang === 'ar' ? 'en' : 'ar';
            
            document.documentElement.dir = 
                document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
            
            toggleBtn.textContent = 
                document.documentElement.lang === 'ar' ? 'EN / AR' : 'AR / EN';
            
            this.showToast('تم تبديل اللغة', 'success');
        });
    }

    // === زر العودة للأعلى ===
    setupBackToTop() {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-top';
        backBtn.setAttribute('aria-label', 'العودة إلى الأعلى');
        backBtn.innerHTML = '↑';
        document.body.appendChild(backBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        });

        backBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === عرض الرسائل ===
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // === إحصائيات الزيارات ===
    trackVisit() {
        const visits = localStorage.getItem('nawaat_visits') || 0;
        localStorage.setItem('nawaat_visits', parseInt(visits) + 1);
        
        if (parseInt(visits) === 0) {
            this.showToast('مرحباً بك في نواة طبيب!', 'welcome');
        }
    }
}

// === تهيئة التطبيق عند تحميل الصفحة ===
document.addEventListener('DOMContentLoaded', () => {
    const app = new NawaatTabib();
    app.trackVisit();
});

// === دعم Service Worker للتطبيق التقدمي ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
