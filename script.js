/* ═══════════════════════════════════════════════════════
   HASSAM PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   SOLAR SYSTEM SKILLS CONFIG
   ─────────────────────────────────────────────────────
   HOW TO ADD A PLANET / SKILL:
   Copy one object from the array below, paste it inside
   the array, then edit:
     name    – skill label shown on hover
     pct     – proficiency 0–100 (also sets planet size)
     color   – planet color (any CSS hex color)
     orbitR  – distance from center in pixels (increase
               for each new planet you add)
     speed   – how fast it orbits (smaller = slower)
     icon    – short text drawn on the planet (≤3 chars)
   ═══════════════════════════════════════════════════════ */
const solarSkills = [
    /* name            pct  color      orbitR  speed   icon */
    { name: 'Python',         pct: 90, color: '#3776ab', orbitR: 100, speed: 0.022, icon: 'PY'  },
    { name: 'C#',             pct: 85, color: '#68217a', orbitR: 148, speed: 0.016, icon: 'C#'  },
    { name: 'C++',            pct: 80, color: '#00599c', orbitR: 196, speed: 0.012, icon: 'C++' },
    { name: 'C',              pct: 75, color: '#a8b9cc', orbitR: 244, speed: 0.009, icon: 'C'   },
    { name: 'HTML5',          pct: 95, color: '#e34c26', orbitR: 296, speed: 0.007, icon: 'HTM' },
    { name: 'CSS3',           pct: 90, color: '#264de4', orbitR: 348, speed: 0.006, icon: 'CSS' },
    { name: 'JavaScript',     pct: 85, color: '#f7df1e', orbitR: 400, speed: 0.005, icon: 'JS'  },
    { name: 'MySQL',          pct: 80, color: '#00758f', orbitR: 452, speed: 0.004, icon: 'SQL' },
    { name: 'Machine\nLearn', pct: 82, color: '#10ffb0', orbitR: 504, speed: 0.003, icon: 'ML'  },
];
/* ── END SOLAR SKILLS CONFIG ── */


/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════════ */
(function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    function animateRing() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .proj-card, .social-card, .skill-cat').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
})();


/* ═══════════════════════════════════════════════════════
   ANIMATED STAR FIELD
   ═══════════════════════════════════════════════════════ */
(function initStars() {
    const canvas = document.getElementById('star-canvas');
    const ctx    = canvas.getContext('2d');
    let stars    = [];

    function buildStars() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 6000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x:  Math.random() * canvas.width,
                y:  Math.random() * canvas.height,
                r:  Math.random() * 1.3 + 0.15,
                a:  Math.random(),
                da: (Math.random() * 0.3 + 0.08) * (Math.random() < 0.5 ? 1 : -1),
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.a += s.da * 0.007;
            if (s.a > 1 || s.a < 0) s.da *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(190, 200, 255, ${Math.max(0, Math.min(1, s.a))})`;
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    buildStars();
    drawStars();
    window.addEventListener('resize', buildStars);
})();


/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */
(function initNav() {
    const navbar   = document.getElementById('navbar');
    const toggle   = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const btt      = document.getElementById('btt');
    const allLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        btt.classList.toggle('show', window.scrollY > 500);

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
        });
        allLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('open');
    });

    allLinks.forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.classList.remove('open');
        });
    });

    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ═══════════════════════════════════════════════════════
   TYPING ANIMATION
   ═══════════════════════════════════════════════════════ */
(function initTyping() {
    /* EDIT: change the words array to update the typing text */
    const words = [
        'ML Engineer',
        'Full Stack Dev',
        'Problem Solver',
        'Code Craftsman',
        'Data Scientist',
    ];

    const el = document.getElementById('type-word');
    let wi   = 0;
    let ci   = 0;
    let del  = false;

    function tick() {
        const word = words[wi];
        el.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);

        let delay = del ? 42 : 95;

        if (!del && ci === word.length) {
            delay = 2200;
            del = true;
        } else if (del && ci === 0) {
            del = false;
            wi  = (wi + 1) % words.length;
            delay = 420;
        }

        setTimeout(tick, delay);
    }

    tick();
})();


/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL + SKILL BAR ANIMATIONS
   ═══════════════════════════════════════════════════════ */
(function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    const skillCats = document.querySelectorAll('.skill-cat');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.sk-fill').forEach(fill => {
                fill.style.width = fill.dataset.w + '%';
            });
            barObserver.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    skillCats.forEach(cat => barObserver.observe(cat));
})();


/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTERS
   ═══════════════════════════════════════════════════════ */
(function initCounters() {
    const counters = document.querySelectorAll('.stat-n[data-target]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = +el.dataset.target;
            let n        = 0;
            const step   = target / 45;
            const timer  = setInterval(() => {
                n = Math.min(n + step, target);
                el.textContent = Math.round(n) + '+';
                if (n >= target) clearInterval(timer);
            }, 35);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
})();


/* ═══════════════════════════════════════════════════════
   SOLAR SYSTEM ANIMATION
   ═══════════════════════════════════════════════════════ */
(function initSolar() {
    const canvas = document.getElementById('solar-canvas');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    const angles = solarSkills.map((_, i) => (i / solarSkills.length) * Math.PI * 2);
    let hovered  = null;
    let rafId;

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function draw(ts = 0) {
        const W  = canvas.width;
        const H  = canvas.height;
        const cx = W / 2;
        const cy = H / 2;

        const maxOrbit  = solarSkills[solarSkills.length - 1].orbitR;
        const available = Math.min(W, H) / 2 - 30;
        const scale     = available / maxOrbit;

        ctx.clearRect(0, 0, W, H);

        /* Nebula glow */
        const nebula = ctx.createRadialGradient(cx, cy, 0, cx, cy, available);
        nebula.addColorStop(0,   'rgba(0, 245, 255, 0.05)');
        nebula.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
        nebula.addColorStop(1,   'transparent');
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, W, H);

        /* Orbit rings */
        solarSkills.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(cx, cy, p.orbitR * scale, 0, Math.PI * 2);
            ctx.strokeStyle = hovered === i
                ? 'rgba(0, 245, 255, 0.22)'
                : 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 8]);
            ctx.stroke();
            ctx.setLineDash([]);
        });

        /* Sun */
        const sunR  = 28 * Math.min(scale * 2.5, 1.4);
        const pulse = 1 + 0.06 * Math.sin(ts * 0.0015);

        const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 3.5);
        sunGlow.addColorStop(0,   'rgba(255, 200, 40, 0.22)');
        sunGlow.addColorStop(0.5, 'rgba(255, 160, 0, 0.08)');
        sunGlow.addColorStop(1,   'transparent');
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, sunR * 3.5 * pulse, 0, Math.PI * 2);
        ctx.fill();

        const sunBody = ctx.createRadialGradient(cx - sunR * 0.3, cy - sunR * 0.3, 0, cx, cy, sunR);
        sunBody.addColorStop(0, '#fff8cc');
        sunBody.addColorStop(0.5, '#ffb700');
        sunBody.addColorStop(1, '#ff8800');
        ctx.beginPath();
        ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
        ctx.fillStyle = sunBody;
        ctx.fill();

        ctx.fillStyle    = 'rgba(0,0,0,0.7)';
        ctx.font         = `bold ${Math.max(8, 9 * scale)}px JetBrains Mono`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CORE', cx, cy);

        /* Planets */
        solarSkills.forEach((p, i) => {
            angles[i] += p.speed;

            const px  = cx + Math.cos(angles[i]) * p.orbitR * scale;
            const py  = cy + Math.sin(angles[i]) * p.orbitR * scale;
            const isH = hovered === i;
            const pr  = (10 + (p.pct / 100) * 10) * Math.min(scale * 2, 1) * (isH ? 1.35 : 1);

            const glow = ctx.createRadialGradient(px, py, 0, px, py, pr * 2.8);
            glow.addColorStop(0, p.color + '66');
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(px, py, pr * 2.8, 0, Math.PI * 2);
            ctx.fill();

            const body = ctx.createRadialGradient(px - pr * 0.35, py - pr * 0.35, 0, px, py, pr);
            body.addColorStop(0,   '#ffffff');
            body.addColorStop(0.3,  p.color);
            body.addColorStop(1,   p.color + 'bb');
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fillStyle = body;
            ctx.fill();

            if (isH) {
                ctx.beginPath();
                ctx.arc(px, py, pr + 4, 0, Math.PI * 2);
                ctx.strokeStyle = p.color;
                ctx.lineWidth   = 1.5;
                ctx.stroke();
            }

            ctx.fillStyle    = 'rgba(0,0,0,0.75)';
            ctx.font         = `bold ${Math.max(6, 7 * Math.min(scale * 2, 1))}px JetBrains Mono`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.icon, px, py);

            if (isH) {
                const ttW = 110;
                const ttH = 44;
                let ttX   = px + pr + 12;
                let ttY   = py - ttH / 2;

                if (ttX + ttW > W - 8) ttX = px - pr - ttW - 12;
                if (ttY < 4)           ttY = 4;
                if (ttY + ttH > H - 4) ttY = H - ttH - 4;

                ctx.fillStyle   = 'rgba(4, 4, 13, 0.92)';
                ctx.strokeStyle = p.color;
                ctx.lineWidth   = 1;
                roundRect(ctx, ttX, ttY, ttW, ttH, 8);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle    = '#f0f0ff';
                ctx.font         = `bold ${Math.max(8, 9 * Math.min(scale * 1.8, 1))}px JetBrains Mono`;
                ctx.textAlign    = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(p.name.replace('\n', ' '), ttX + 10, ttY + 8);

                ctx.fillStyle = p.color;
                ctx.font      = `${Math.max(7, 8 * Math.min(scale * 1.8, 1))}px JetBrains Mono`;
                ctx.fillText(p.pct + '% proficiency', ttX + 10, ttY + 24);
            }
        });

        rafId = requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', e => {
        const rect      = canvas.getBoundingClientRect();
        const mx        = e.clientX - rect.left;
        const my        = e.clientY - rect.top;
        const cx        = canvas.width  / 2;
        const cy        = canvas.height / 2;
        const maxOrbit  = solarSkills[solarSkills.length - 1].orbitR;
        const available = Math.min(canvas.width, canvas.height) / 2 - 30;
        const scale     = available / maxOrbit;

        let found = null;
        solarSkills.forEach((p, i) => {
            const px = cx + Math.cos(angles[i]) * p.orbitR * scale;
            const py = cy + Math.sin(angles[i]) * p.orbitR * scale;
            const pr = (10 + (p.pct / 100) * 10) * Math.min(scale * 2, 1);
            if (Math.hypot(mx - px, my - py) < pr * 1.8) found = i;
        });

        hovered = found;
        canvas.style.cursor = found !== null ? 'pointer' : 'default';
    });

    canvas.addEventListener('mouseleave', () => {
        hovered = null;
        canvas.style.cursor = 'default';
    });

    resize();
    draw();
    window.addEventListener('resize', () => {
        resize();
        cancelAnimationFrame(rafId);
        draw();
    });
})();


/* ═══════════════════════════════════════════════════════
   PROJECTS CAROUSEL
   ═══════════════════════════════════════════════════════ */
(function initProjCarousel() {
    const track = document.getElementById('proj-track');
    if (!track) return;

    const dots  = document.querySelectorAll('.proj-dot');
    const total = track.children.length;
    let cur     = 0;
    let startX  = 0;
    let isDrag  = false;

    function go(i) {
        cur = (i + total) % total;
        track.style.transform = `translateX(-${cur * 100}%)`;
        dots.forEach((d, j) => d.classList.toggle('active', j === cur));
    }

    document.getElementById('proj-prev').addEventListener('click', () => go(cur - 1));
    document.getElementById('proj-next').addEventListener('click', () => go(cur + 1));
    dots.forEach(d => d.addEventListener('click', () => go(+d.dataset.i)));

    /* Touch swipe */
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDrag = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        if (!isDrag) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(diff > 0 ? cur + 1 : cur - 1);
        isDrag = false;
    });

    /* Mouse drag on desktop */
    track.addEventListener('mousedown', e => {
        startX = e.clientX;
        isDrag = true;
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', e => {
        if (!isDrag) return;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 60) go(diff > 0 ? cur + 1 : cur - 1);
        isDrag = false;
        track.style.cursor = '';
    });

    /* Auto-advance every 6 s */
    let autoTimer = setInterval(() => go(cur + 1), 6000);

    /* Reset timer on manual interaction */
    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => go(cur + 1), 6000);
    }

    document.getElementById('proj-prev').addEventListener('click', resetTimer);
    document.getElementById('proj-next').addEventListener('click', resetTimer);
    dots.forEach(d => d.addEventListener('click', resetTimer));
})();


/* ═══════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════ */
(function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn  = form.querySelector('.btn-submit');
        const orig = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10ffb0, #00f5ff)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3200);
    });
})();


/* ═══════════════════════════════════════════════════════
   PARALLAX DEPTH ON SCROLL
   ═══════════════════════════════════════════════════════ */
(function initParallax() {
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        document.querySelectorAll('.about-deco-blob').forEach(el => {
            el.style.transform = `translateY(${sy * 0.07}px)`;
        });
    });
})();


/* ═══════════════════════════════════════════════════════
   CONSOLE EASTER EGG
   ═══════════════════════════════════════════════════════ */
console.log('%c👾 Hey, curious dev!', 'color:#00f5ff; font-size:20px; font-weight:bold;');
console.log('%cWelcome to Hassam\'s portfolio. The code is clean — just like the design.', 'color:#8b5cf6; font-size:13px;');
console.log('%c🚀 Built with passion by Muhammad Hassam Jamil', 'color:#10ffb0; font-size:13px;');
/* ═══════════════════════════════════════════════════════
   LIFE JOURNEY CAROUSEL — append to bottom of script.js
   ═══════════════════════════════════════════════════════ */

(function initJourney() {
    const track    = document.getElementById('journey-track');
    if (!track) return;

    const slides   = Array.from(track.querySelectorAll('.journey-slide'));
    const dotsWrap = document.getElementById('journey-dots');
    const progress = document.getElementById('journey-progress');
    const btnPrev  = document.getElementById('journey-prev');
    const btnNext  = document.getElementById('journey-next');

    const total      = slides.length;
    const slideWidth = 400; // slide width 360 + gap 40
    let   cur        = 0;

    /* ── Build dots ── */
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className   = 'journey-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Journey slide ${i + 1}`);
        d.addEventListener('click', () => go(i));
        dotsWrap.appendChild(d);
    });

    const dots = () => dotsWrap.querySelectorAll('.journey-dot');

    /* ── Update ── */
    function go(i) {
        cur = Math.max(0, Math.min(i, total - 1));

        /* Translate track so active slide centres in viewport */
        const wrapW  = track.parentElement.offsetWidth;
        const centre = wrapW / 2 - slideWidth / 2 + 40; // 40 = left padding offset
        const offset = Math.max(0, cur * slideWidth - centre + 80);
        track.style.transform = `translateX(-${offset}px)`;

        /* Active class on slides */
        slides.forEach((s, j) => s.classList.toggle('js-active', j === cur));

        /* Dots */
        dots().forEach((d, j) => d.classList.toggle('active', j === cur));

        /* Progress bar */
        progress.style.width = ((cur / (total - 1)) * 100) + '%';

        /* Buttons disabled state */
        btnPrev.disabled = cur === 0;
        btnNext.disabled = cur === total - 1;
    }

    /* ── Arrows ── */
    btnPrev.addEventListener('click', () => go(cur - 1));
    btnNext.addEventListener('click', () => go(cur + 1));

    /* ── Touch / drag swipe ── */
    let startX   = 0;
    let dragging = false;

    track.addEventListener('touchstart', e => {
        startX   = e.touches[0].clientX;
        dragging = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        if (!dragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(diff > 0 ? cur + 1 : cur - 1);
        dragging = false;
    });

    track.addEventListener('mousedown', e => {
        startX   = e.clientX;
        dragging = true;
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', e => {
        if (!dragging) return;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 60) go(diff > 0 ? cur + 1 : cur - 1);
        dragging = false;
        track.style.cursor = '';
    });

    /* ── Keyboard navigation ── */
    document.addEventListener('keydown', e => {
        const section = document.getElementById('journey');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(cur + 1);
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(cur - 1);
    });

    /* ── Auto-advance (slow — storytelling pace) ── */
    let autoTimer = setInterval(() => {
        if (cur < total - 1) {
            go(cur + 1);
        } else {
            clearInterval(autoTimer); // stop at last chapter
        }
    }, 5500);

    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (cur < total - 1) go(cur + 1);
            else clearInterval(autoTimer);
        }, 5500);
    }

    btnPrev.addEventListener('click', resetTimer);
    btnNext.addEventListener('click', resetTimer);
    dots().forEach(d => d.addEventListener('click', resetTimer));

    /* ── Recalculate on resize ── */
    window.addEventListener('resize', () => go(cur));

    /* ── Shooting star particles on timeline ── */
    (function spawnParticles() {
        const universe = document.querySelector('.journey-universe');
        if (!universe) return;

        // insert particle layer
        const layer = document.createElement('div');
        layer.className = 'journey-particles';
        universe.appendChild(layer);

        function shoot() {
            const p = document.createElement('div');
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const dur  = Math.random() * 1800 + 900;
            const color = Math.random() > 0.5 ? '#00f5ff' : '#8b5cf6';

            Object.assign(p.style, {
                position: 'absolute',
                left: left + '%',
                top: Math.random() * 100 + '%',
                width: size + 'px',
                height: size + 'px',
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 ${size * 3}px ${color}`,
                opacity: 0,
                transition: `opacity 0.3s, transform ${dur}ms linear`,
                transform: 'translateX(0px)',
            });

            layer.appendChild(p);
            requestAnimationFrame(() => {
                p.style.opacity = '0.7';
                p.style.transform = `translateX(${(Math.random() > 0.5 ? 1 : -1) * (Math.random() * 120 + 60)}px)`;
            });

            setTimeout(() => {
                p.style.opacity = '0';
                setTimeout(() => p.remove(), 400);
            }, dur - 400);
        }

        setInterval(shoot, 600);
    })();

    /* ── Initial state ── */
    go(0);
})();
/* ═══════════════════════════════════════════════════════
   LIFE JOURNEY CAROUSEL — append to bottom of script.js
   ═══════════════════════════════════════════════════════ */

(function initJourney() {
    const track    = document.getElementById('journey-track');
    if (!track) return;

    const slides   = Array.from(track.querySelectorAll('.journey-slide'));
    const dotsWrap = document.getElementById('journey-dots');
    const progress = document.getElementById('journey-progress');
    const btnPrev  = document.getElementById('journey-prev');
    const btnNext  = document.getElementById('journey-next');

    const total      = slides.length;
    const slideWidth = 400; // slide width 360 + gap 40
    let   cur        = 0;

    /* ── Build dots ── */
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className   = 'journey-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Journey slide ${i + 1}`);
        d.addEventListener('click', () => go(i));
        dotsWrap.appendChild(d);
    });

    const dots = () => dotsWrap.querySelectorAll('.journey-dot');

    /* ── Update ── */
    function go(i) {
        cur = Math.max(0, Math.min(i, total - 1));

        /* Translate track so active slide centres in viewport */
        const wrapW  = track.parentElement.offsetWidth;
        const centre = wrapW / 2 - slideWidth / 2 + 40; // 40 = left padding offset
        const offset = Math.max(0, cur * slideWidth - centre + 80);
        track.style.transform = `translateX(-${offset}px)`;

        /* Active class on slides */
        slides.forEach((s, j) => s.classList.toggle('js-active', j === cur));

        /* Dots */
        dots().forEach((d, j) => d.classList.toggle('active', j === cur));

        /* Progress bar */
        progress.style.width = ((cur / (total - 1)) * 100) + '%';

        /* Buttons disabled state */
        btnPrev.disabled = cur === 0;
        btnNext.disabled = cur === total - 1;
    }

    /* ── Arrows ── */
    btnPrev.addEventListener('click', () => go(cur - 1));
    btnNext.addEventListener('click', () => go(cur + 1));

    /* ── Touch / drag swipe ── */
    let startX   = 0;
    let dragging = false;

    track.addEventListener('touchstart', e => {
        startX   = e.touches[0].clientX;
        dragging = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        if (!dragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(diff > 0 ? cur + 1 : cur - 1);
        dragging = false;
    });

    track.addEventListener('mousedown', e => {
        startX   = e.clientX;
        dragging = true;
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', e => {
        if (!dragging) return;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 60) go(diff > 0 ? cur + 1 : cur - 1);
        dragging = false;
        track.style.cursor = '';
    });

    /* ── Keyboard navigation ── */
    document.addEventListener('keydown', e => {
        const section = document.getElementById('journey');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(cur + 1);
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(cur - 1);
    });

    /* ── Auto-advance (slow — storytelling pace) ── */
    let autoTimer = setInterval(() => {
        if (cur < total - 1) {
            go(cur + 1);
        } else {
            clearInterval(autoTimer); // stop at last chapter
        }
    }, 5500);

    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (cur < total - 1) go(cur + 1);
            else clearInterval(autoTimer);
        }, 5500);
    }

    btnPrev.addEventListener('click', resetTimer);
    btnNext.addEventListener('click', resetTimer);
    dots().forEach(d => d.addEventListener('click', resetTimer));

    /* ── Recalculate on resize ── */
    window.addEventListener('resize', () => go(cur));

    /* ── Shooting star particles on timeline ── */
    (function spawnParticles() {
        const universe = document.querySelector('.journey-universe');
        if (!universe) return;

        // insert particle layer
        const layer = document.createElement('div');
        layer.className = 'journey-particles';
        universe.appendChild(layer);

        function shoot() {
            const p = document.createElement('div');
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const dur  = Math.random() * 1800 + 900;
            const color = Math.random() > 0.5 ? '#00f5ff' : '#8b5cf6';

            Object.assign(p.style, {
                position: 'absolute',
                left: left + '%',
                top: Math.random() * 100 + '%',
                width: size + 'px',
                height: size + 'px',
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 ${size * 3}px ${color}`,
                opacity: 0,
                transition: `opacity 0.3s, transform ${dur}ms linear`,
                transform: 'translateX(0px)',
            });

            layer.appendChild(p);
            requestAnimationFrame(() => {
                p.style.opacity = '0.7';
                p.style.transform = `translateX(${(Math.random() > 0.5 ? 1 : -1) * (Math.random() * 120 + 60)}px)`;
            });

            setTimeout(() => {
                p.style.opacity = '0';
                setTimeout(() => p.remove(), 400);
            }, dur - 400);
        }

        setInterval(shoot, 600);
    })();

    /* ── Initial state ── */
    go(0);
})();
