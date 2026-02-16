/* Supabase Config */
const supabaseUrl = 'https://llhwagdvbyurvfwaugvn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaHdhZ2R2Ynl1cnZmd2F1Z3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjAxODgsImV4cCI6MjA4NjczNjE4OH0.so7_QeppDxNzUQfcvNEuTo02sAwfwk0M9ITHem07tqQ';
let supabase;

/* Global State (Initial Local Data) */
let PROJECTS_DATA = [
    {
        id: 1,
        title: "PERFORMANCE",
        subtitle: "E-commerce de Elite",
        category: "websites",
        description: "Desenvolvimento de plataforma de vendas de alta conversão. Otimização extrema de Core Web Vitals e checkout simplificado.",
        challenge: "O cliente perdia 40% das vendas no carrinho por lentidão.",
        solution: "Reconstrução total em Next.js com carregamento em 0.8s.",
        tags: ["Next.js", "Stripe", "Performance"],
        image_url: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "AUTOMAÇÃO",
        subtitle: "Bot de Atendimento IA",
        category: "automacoes",
        description: "Sistema de triagem automática de leads via WhatsApp utilizando inteligência artificial para agendamento.",
        challenge: "Time de vendas perdia 6 horas/dia qualificando leads frios.",
        solution: "Bot IA que qualifica e agenda apenas leads quentes.",
        tags: ["Python", "OpenAI", "WhatsApp API"],
        image_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "SISTEMA",
        subtitle: "Dashboard Financeiro",
        category: "sistemas",
        description: "Painel de controle administrativo para gestão de múltiplos filiais em tempo real.",
        challenge: "Dados descentralizados em planilhas causavam erros de caixa.",
        solution: "Dashboard centralizado com relatórios em tempo real.",
        tags: ["React", "Node.js", "Dashboard"],
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
];
let currentProjectIndex = 0;
let isModalOpen = false;
let touchStart = null;
let touchEnd = null;
const minSwipeDistance = 50;

/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init UI components immediately
    initHeader();
    initProblem();
    initVideo();
    initScrollUp();
    initPortfolio();
    initModal();
    initContactForm();

    // 2. Try Supabase First, Fallback to Local on Error/Timeout
    loadProjectsWithFallback();
});

/* --- Data Loading Logic --- */
async function loadProjectsWithFallback() {
    const grid = document.getElementById('projects-grid');
    if (grid) grid.innerHTML = '<div class="col-span-3 text-center py-10 animate-pulse text-white/50">Carregando projetos...</div>';

    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000)
    );

    const fetchSupabase = async () => {
        if (!window.supabase) throw new Error("Supabase lib not ready");
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    };

    try {
        // Race: Supabase vs 3s Timeout
        const data = await Promise.race([fetchSupabase(), timeout]);

        if (data && data.length > 0) {
            console.log("Supabase loaded successfully.");
            PROJECTS_DATA = data;
            renderProjectsGrid(PROJECTS_DATA);
        } else {
            throw new Error("No data returned");
        }

    } catch (error) {
        console.warn("Supabase unstable/error, activating Hybrid Fallback:", error);
        // Fallback to Local Data
        renderProjectsGrid(PROJECTS_DATA); // PROJECTS_DATA has the local initial state

        // Visual indicator of offline mode (Optional, user might prefer seamless)
        if (grid) {
            const warning = document.createElement('div');
            warning.className = "col-span-3 text-center text-xs text-white/20 mt-2";
            warning.innerText = "Modo Offline Ativado";
            grid.appendChild(warning);
        }
    }
}

/* --- Data Fetching (Disabled - Using Local) --- */
// async function fetchProjects() {
//     const { data, error } = await supabase
//         .from('projects')
//         .select('*')
//         .order('created_at', { ascending: false });
//
//     if (error) {
//         console.error('Error fetching projects:', error);
//         document.getElementById('projects-grid').innerHTML = '<p class="text-red-500 text-center col-span-3">Erro ao carregar projetos.</p>';
//         return;
//     }
//
//     PROJECTS_DATA = data;
// }

/* --- Render Logic --- */
function renderProjectsGrid(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (projects.length === 0) {
        grid.innerHTML = '<p class="text-text-muted text-center col-span-3 py-10">Nenhum projeto encontrado.</p>';
        return;
    }

    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item group relative bg-[#0B1121] border border-white/5 hover:border-accent-glow/30 rounded-2xl overflow-hidden h-64 md:h-80 transition-all duration-500 md:hover:-translate-y-2 cursor-pointer';
        item.setAttribute('data-category', project.category);

        // Attach event listener directly
        item.addEventListener('click', () => {
            openProjectModal(project.id);
        });

        item.innerHTML = `
            <img src="${project.image_url}" alt="${project.subtitle}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <h3 class="text-white/80 font-medium text-xs md:text-sm mb-2 tracking-[0.2em] uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">${project.title}</h3>
                <h4 class="text-white font-bold text-lg md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">${project.subtitle}</h4>
                <div class="w-10 h-1 bg-primary rounded-full mt-4 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
            </div>
        `;
        grid.appendChild(item);
    });
}

/* --- Header Logic --- */
function initHeader() {
    const header = document.getElementById('header'); // Fixed selector
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    let isMobileMenuOpen = false;

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-[#030712]/95', 'py-4', 'shadow-lg');
            header.classList.remove('bg-transparent', 'py-6');
        } else {
            header.classList.remove('bg-[#030712]/95', 'py-4', 'shadow-lg');
            header.classList.add('bg-transparent', 'py-6');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;
            const icon = mobileMenuBtn.querySelector('i');

            if (isMobileMenuOpen) {
                mobileMenu.classList.remove('max-h-0');
                mobileMenu.classList.add('max-h-96');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                mobileMenu.classList.remove('max-h-96');
                mobileMenu.classList.add('max-h-0');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            if (mobileMenu) {
                mobileMenu.classList.remove('max-h-96');
                mobileMenu.classList.add('max-h-0');
            }
            const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth Scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --- Problem Logic (Word Rotator) --- */
function initProblem() {
    const words = [
        "+ Clientes",
        "+ Tecnologia",
        "+ Otimização",
        "+ Tempo",
        "+ Faturamento",
        "+ Posicionamento",
        "+ Vantagem"
    ];
    let currentIndex = 0;
    const wordElement = document.getElementById('problem-word');

    if (wordElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length;
            wordElement.textContent = words[currentIndex];
            wordElement.classList.remove('animate-title-entrance');
            void wordElement.offsetWidth; // trigger reflow
            wordElement.classList.add('animate-title-entrance');
        }, 2500);
    }
}

/* --- Portfolio Filter Logic --- */
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active button state
            filterBtns.forEach(b => {
                b.classList.remove('bg-bg-card', 'border-primary', 'text-white', 'shadow-[0_0_15px_rgba(59,130,246,0.2)]');
                b.classList.add('text-text-muted', 'hover:text-white', 'hover:bg-white/5');
            });
            btn.classList.remove('text-text-muted', 'hover:text-white', 'hover:bg-white/5');
            btn.classList.add('bg-bg-card', 'border-primary', 'text-white', 'shadow-[0_0_15px_rgba(59,130,246,0.2)]');

            // Filter items logic handled via re-render or CSS toggle
            // For simplicity with dynamic data, let's re-render
            if (filterValue === 'all') {
                renderProjectsGrid(PROJECTS_DATA);
            } else {
                const filtered = PROJECTS_DATA.filter(p => p.category === filterValue);
                renderProjectsGrid(filtered);
            }
        });
    });
}

/* --- Video Logic (Google Drive Direct) --- */
function initVideo() {
    const playBtn = document.getElementById('video-play-btn');
    const container = document.getElementById('youtube-player-container');
    const cover = document.getElementById('video-cover');

    // Google Drive Direct Download Link (for video tag)
    // ID: 1OKhs7SvIVltdpbQO5ElxaSj0A9RUsgLc
    const videoSrc = "https://drive.google.com/uc?export=download&id=1OKhs7SvIVltdpbQO5ElxaSj0A9RUsgLc";

    // Static Cover Image (Placeholder for Video Frame)
    // Using Drive Thumbnail API to get the actual frame
    const coverImage = "https://drive.google.com/thumbnail?id=1OKhs7SvIVltdpbQO5ElxaSj0A9RUsgLc&sz=w1200";

    if (cover) {
        cover.src = coverImage;
        cover.style.opacity = '0.7'; // Fixed opacity
        cover.style.transition = 'opacity 0.6s ease-in-out';
    }

    if (playBtn && container) {
        playBtn.addEventListener('click', () => {
            // Hide cover and play button
            if (cover) cover.style.display = 'none';
            playBtn.style.display = 'none';

            // Create Video Tag - Immediate Autoplay
            container.innerHTML = `
                <video 
                    src="${videoSrc}" 
                    width="100%" 
                    height="100%" 
                    controls 
                    autoplay
                    playsinline
                    class="w-full h-full object-cover">
                    Your browser does not support the video tag.
                </video>
            `;
        });
    }
}

/* --- Project Modal Logic --- */
function initModal() {
    const modal = document.getElementById('project-modal');

    const closeBtns = document.querySelectorAll('.close-modal-btn');
    const nextBtns = document.querySelectorAll('.next-project-btn');
    const prevBtns = document.querySelectorAll('.prev-project-btn');
    const backdrop = document.querySelector('.modal-backdrop');

    if (!modal) return;



    if (closeBtns) closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (nextBtns) nextBtns.forEach(btn => btn.addEventListener('click', nextProject));
    if (prevBtns) prevBtns.forEach(btn => btn.addEventListener('click', prevProject));

    // Swipe
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
        modalContent.addEventListener('touchstart', (e) => {
            touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        }, { passive: true });

        modalContent.addEventListener('touchend', (e) => {
            touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            handleSwipe();
        }, { passive: true });
    }
}

// Ensure these are global so onclick="..." in HTML works if used,
// though we adding listeners in JS mostly.
window.openProjectModal = function (id) {
    const index = PROJECTS_DATA.findIndex(p => p.id === id);
    if (index !== -1) {
        currentProjectIndex = index;
        openModal();
    }
};

function openModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        modal.classList.add('flex', 'opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
        renderModalContent();
    }
}

window.closeModal = function () {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
        modal.classList.remove('flex', 'opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'unset';
    }
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % PROJECTS_DATA.length;
    renderModalContent();
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    renderModalContent();
}

function handleSwipe() {
    if (!touchStart || !touchEnd) return;

    const xDiff = touchStart.x - touchEnd.x;
    const yDiff = touchStart.y - touchEnd.y;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (Math.abs(xDiff) > minSwipeDistance) {
            if (xDiff > 0) nextProject(); // Swipe Left -> Next
            else prevProject(); // Swipe Right -> Prev
        }
    }

    touchStart = null;
    touchEnd = null;
}

function renderModalContent() {
    const project = PROJECTS_DATA[currentProjectIndex];
    if (!project) return;

    const imgEl = document.getElementById('modal-img');
    if (imgEl) imgEl.src = project.image_url;

    const titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = project.subtitle;

    const catEl = document.getElementById('modal-category');
    if (catEl) catEl.textContent = project.category;

    const descEl = document.getElementById('modal-desc');
    if (descEl) descEl.textContent = project.description;

    const chalEl = document.getElementById('modal-challenge');
    if (chalEl) {
        chalEl.textContent = project.challenge || '';
        chalEl.parentElement.style.display = project.challenge ? 'block' : 'none';
    }

    const solEl = document.getElementById('modal-solution');
    if (solEl) {
        solEl.textContent = project.solution || '';
        solEl.parentElement.style.display = project.solution ? 'block' : 'none';
    }

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (project.tags && Array.isArray(project.tags)) {
            project.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'text-[10px] md:text-xs text-white bg-blue-600/20 border border-blue-500/30 px-2 py-1 rounded-full';
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });
        }
    }

    // Dots
    const dotsContainer = document.getElementById('modal-dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        PROJECTS_DATA.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `h-1.5 rounded-full transition-all duration-300 ${idx === currentProjectIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`;
            dot.onclick = () => {
                currentProjectIndex = idx;
                renderModalContent();
            };
            dotsContainer.appendChild(dot);
        });
    }
}

/* --- Scroll Up Logic --- */
function initScrollUp() {
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    if (!scrollUpBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            scrollUpBtn.classList.remove('-bottom-16', 'opacity-0');
            scrollUpBtn.classList.add('bottom-24', 'opacity-100');
        } else {
            scrollUpBtn.classList.remove('bottom-24', 'opacity-100');
            scrollUpBtn.classList.add('-bottom-16', 'opacity-0');
        }
    });

    scrollUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- Contact Form Logic --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    // We need to re-query elements here or pass them in, but query is safer as DOM might change
    // simpler to just query inside the function

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent redirect

        const submitBtn = document.getElementById('submit-btn');
        const loadingIcon = document.getElementById('submit-loading');
        const btnText = submitBtn ? submitBtn.querySelector('span') : null;

        // 1. Validate (Native HTML5 validation)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 2. Set Loading State
        if (submitBtn) {
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            if (btnText) btnText.textContent = 'Enviando...';
            if (loadingIcon) loadingIcon.classList.remove('hidden');
        }

        // 3. Prepare Data
        const formData = new FormData(form);

        try {
            // 4. Send Request (FormSubmit.co AJAX)
            const response = await fetch("https://formsubmit.co/ajax/luisfelipeiasd@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok) {
                // Success
                showSuccessPopup();
                form.reset();
            } else {
                // Error from Service
                throw new Error(result.message || 'Erro ao enviar mensagem.');
            }

        } catch (error) {
            console.error('Form Error:', error);
            // Fallback: If AJAX fails (e.g. CORS), try standard submission
            // form.submit(); // Optional: Uncomment if we want to force redirect on error
            alert('Ops! Ocorreu um erro. Tente novamente ou chame no WhatsApp.');
        } finally {
            // 5. Reset Loading State
            if (submitBtn) {
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                if (btnText) btnText.textContent = 'Agendar Consultoria Gratuita';
                if (loadingIcon) loadingIcon.classList.add('hidden');
            }
        }
    });

    // Close Popup Logic
    const closePopupBtn = document.getElementById('close-popup-btn');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hideSuccessPopup);
    }
}

function showSuccessPopup() {
    const popupContainer = document.getElementById('success-popup');
    if (!popupContainer) return;

    const popupContent = popupContainer.querySelector('div');

    popupContainer.classList.remove('hidden');
    // Small delay to allow display:block to apply before transition
    setTimeout(() => {
        popupContent.classList.remove('-translate-y-full');
        popupContent.classList.add('translate-y-4');
    }, 10);

    // Auto hide after 5 seconds
    setTimeout(hideSuccessPopup, 5000);
}

function hideSuccessPopup() {
    const popupContainer = document.getElementById('success-popup');
    if (!popupContainer) return;

    const popupContent = popupContainer.querySelector('div');

    popupContent.classList.remove('translate-y-4');
    popupContent.classList.add('-translate-y-full');

    // Wait for transition to finish before hiding container
    setTimeout(() => {
        popupContainer.classList.add('hidden');
    }, 500);
}
