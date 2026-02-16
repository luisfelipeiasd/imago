// --- Configuration ---
const supabaseUrl = 'https://llhwagdvbyurvfwaugvn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaHdhZ2R2Ynl1cnZmd2F1Z3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjAxODgsImV4cCI6MjA4NjczNjE4OH0.so7_QeppDxNzUQfcvNEuTo02sAwfwk0M9ITHem07tqQ';
let supabase;

// --- State ---
let currentSession = null;
let projectsCache = [];
let deleteTargetId = null;

// --- DOM References ---
const els = {
    loginSection: document.getElementById('login-section'),
    dashboardSection: document.getElementById('dashboard-section'),
    projectsGrid: document.getElementById('admin-projects-grid'),
    modal: document.getElementById('project-modal'),
    modalSheet: document.getElementById('modal-sheet'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalLoader: document.getElementById('modal-loader'),
    form: document.getElementById('project-form'),
    deleteModal: document.getElementById('delete-modal'),
    emailDisplay: document.getElementById('user-email')
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
    try {
        if (!window.supabase) throw new Error("Biblioteca Supabase não encontrada");
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        setupAuthListener();
        setupEventListeners();
        await checkSession();
    } catch (e) {
        console.error("Init Error:", e);
        alert("Erro no Sistema: Não foi possível conectar ao backend.");
    }
}

function setupEventListeners() {
    // Auth & Navigation
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('password')?.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleLogin();
    });

    // Modal Actions
    document.getElementById('add-project-btn')?.addEventListener('click', () => openModal());
    document.getElementById('cancel-delete')?.addEventListener('click', closeDeleteModal);
    document.getElementById('confirm-delete')?.addEventListener('click', confirmDelete);

    // Image Upload
    const fileInput = document.getElementById('image-upload');
    const removeBtn = document.getElementById('remove-image');
    if (fileInput) fileInput.addEventListener('change', handleImageSelect);
    if (removeBtn) removeBtn.addEventListener('click', clearImage);

    // Custom Dropdown
    setupCustomDropdown();
}

function setupCustomDropdown() {
    const trigger = document.getElementById('custom-select-trigger');
    const options = document.getElementById('custom-options');
    const hiddenInput = document.getElementById('p-category');
    const selectedText = document.getElementById('selected-option-text');
    const selectedIcon = document.getElementById('selected-icon');

    if (!trigger || !options) return;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = trigger.getBoundingClientRect();
        options.style.top = `${rect.bottom + 8}px`;
        options.style.left = `${rect.left}px`;
        options.style.width = `${rect.width}px`;
        options.classList.toggle('hidden');

        // Rotate arrow
        const arrow = trigger.querySelector('.fa-chevron-down');
        if (arrow) arrow.style.transform = options.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    document.querySelectorAll('.custom-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = opt.dataset.value;
            const icon = opt.dataset.icon;

            hiddenInput.value = val;
            selectedText.textContent = opt.querySelector('span').textContent;

            // Icon handling simplified
            trigger.querySelector('#selected-icon').className = `fa ${icon} text-xs`;

            options.classList.add('hidden');
            const arrow = trigger.querySelector('.fa-chevron-down');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    });

    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !options.contains(e.target)) {
            options.classList.add('hidden');
            const arrow = trigger.querySelector('.fa-chevron-down');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        }
    });

    // Hide on scroll/resize interactions
    window.addEventListener('resize', () => options.classList.add('hidden'));
    els.modalSheet?.querySelector('.overflow-y-auto')?.addEventListener('scroll', () => options.classList.add('hidden'));
}

// --- Auth ---
function setupAuthListener() {
    supabase.auth.onAuthStateChange((_, session) => {
        currentSession = session;
        toggleView(!!session);
    });
}

async function checkSession() {
    const { data } = await supabase.auth.getSession();
    currentSession = data.session;
    toggleView(!!currentSession);
}

window.handleLogin = async function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errBox = document.getElementById('login-error');

    if (!email || !password) return alert("Preencha todos os campos.");

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    } catch (e) {
        console.error("Login Failed:", e);
        errBox.textContent = "Acesso Negado: Credenciais Inválidas";
        errBox.classList.remove('hidden');
    }
};

async function handleLogout() {
    await supabase.auth.signOut();
}

function toggleView(isAuthenticated) {
    if (isAuthenticated) {
        els.loginSection.classList.add('hidden');
        els.dashboardSection.classList.remove('hidden');
        if (els.emailDisplay && currentSession) els.emailDisplay.textContent = currentSession.user.email;
        loadProjects();
    } else {
        els.loginSection.classList.remove('hidden');
        els.dashboardSection.classList.add('hidden');
    }
}

// --- Projects CRUD ---
async function loadProjects() {
    els.projectsGrid.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 text-text-muted opacity-60">
            <i class="fa fa-circle-o-notch fa-spin text-primary text-3xl mb-3"></i>
            <span class="text-xs font-mono">Carregando projetos...</span>
        </div>`;

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fetch Error:", error);
        els.projectsGrid.innerHTML = `<div class="col-span-full text-center text-red-400 text-xs bg-red-500/10 py-4 rounded-xl border border-red-500/20">Erro ao carregar projetos.</div>`;
        return;
    }

    projectsCache = data;
    renderProjects(data);
}

function renderProjects(projects) {
    els.projectsGrid.innerHTML = '';

    if (projects.length === 0) {
        els.projectsGrid.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 text-text-muted opacity-40">
            <i class="fa fa-folder-open text-4xl mb-3"></i>
            <span class="text-sm font-bold">Nenhum projeto encontrado</span>
            <span class="text-xs">Clique em "Novo Projeto" para começar</span>
        </div>`;
        return;
    }

    projects.forEach(p => {
        const div = document.createElement('div');
        // Updated Card Design: rounded-2xl, glassmorphism border
        div.className = 'group relative bg-bg-card border border-white/5 rounded-2xl overflow-hidden h-[340px] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300';
        div.innerHTML = `
            <div class="h-48 relative overflow-hidden bg-[#0F172A] group-hover:h-44 transition-all duration-300">
                <img src="${p.image_url || ''}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" onerror="this.style.display='none'">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0B1121] to-transparent opacity-60"></div>
                
                <!-- Floating Actions -->
                <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                    <button class="w-8 h-8 bg-white/10 backdrop-blur-md text-white rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 shadow-lg border border-white/10 transition-all" onclick="editProject(${p.id})" title="Editar">
                        <i class="fa fa-pencil text-xs"></i>
                    </button>
                    <button class="w-8 h-8 bg-white/10 backdrop-blur-md text-white rounded-lg flex items-center justify-center hover:bg-red-500 hover:scale-105 shadow-lg border border-white/10 transition-all" onclick="askDelete(${p.id})" title="Excluir">
                        <i class="fa fa-trash text-xs"></i>
                    </button>
                </div>
            </div>
            <div class="p-5 flex flex-col h-[148px] justify-between">
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-accent-glow bg-accent-glow/10 px-2 py-0.5 rounded-md border border-accent-glow/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]">${p.category}</span>
                        <span class="text-[10px] text-text-muted font-mono opacity-50">${new Date(p.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-tight mb-1 truncate font-heading group-hover:text-primary transition-colors">${p.subtitle}</h3>
                    <p class="text-[11px] text-text-muted line-clamp-2 leading-relaxed opacity-80">${p.description}</p>
                </div>
                <!-- Status Bar -->
                <div class="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div class="h-full bg-gradient-primary w-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
            </div>
        `;
        els.projectsGrid.appendChild(div);
    });
}

// --- Image Handling ---
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert("Imagem muito grande (Max 5MB)");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = document.getElementById('image-preview');
            img.src = ev.target.result;
            img.classList.remove('hidden');
            document.getElementById('upload-placeholder').classList.add('hidden');
            document.getElementById('remove-image').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function clearImage() {
    document.getElementById('image-upload').value = '';
    const img = document.getElementById('image-preview');
    img.src = '';
    img.classList.add('hidden');
    document.getElementById('upload-placeholder').classList.remove('hidden');
    document.getElementById('remove-image').classList.add('hidden');
}

// --- Modal Logic ---
function openModal(project = null) {
    els.form.reset();
    document.getElementById('project-id').value = '';
    clearImage(); // Reset UI state for image

    // Set Title
    document.getElementById('modal-title').textContent = project ? 'Editar Projeto' : 'Novo Projeto';

    if (project) {
        // Populate Fields
        document.getElementById('project-id').value = project.id;
        document.getElementById('p-title').value = project.title;
        document.getElementById('p-subtitle').value = project.subtitle;
        document.getElementById('p-category').value = project.category;
        document.getElementById('p-description').value = project.description;
        document.getElementById('p-challenge').value = project.challenge;
        document.getElementById('p-solution').value = project.solution;
        document.getElementById('p-tags').value = (project.tags || []).join(', ');

        const catData = {
            'websites': { t: 'Websites', i: 'fa-desktop' },
            'automacoes': { t: 'Automações', i: 'fa-cogs' },
            'sistemas': { t: 'Sistemas', i: 'fa-database' }
        }[project.category] || { t: 'Websites', i: 'fa-desktop' };

        document.getElementById('selected-option-text').textContent = catData.t;
        // document.getElementById('selected-icon').className = `fa ${catData.i} text-xs`;

        if (project.image_url) {
            const img = document.getElementById('image-preview');
            img.src = project.image_url;
            img.classList.remove('hidden');
            document.getElementById('upload-placeholder').classList.add('hidden');
            document.getElementById('remove-image').classList.remove('hidden');
        }
    }

    els.modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        els.modalBackdrop.classList.remove('opacity-0');
        els.modalSheet.classList.remove('translate-x-full');
    });
}

window.closeModal = function () {
    els.modalSheet.classList.add('translate-x-full');
    els.modalBackdrop.classList.add('opacity-0');
    setTimeout(() => els.modal.classList.add('hidden'), 300);
};

window.saveProject = async function (e) {
    e.preventDefault();
    els.modalLoader.classList.remove('hidden');

    try {
        const id = document.getElementById('project-id').value;
        const file = document.getElementById('image-upload').files[0];
        let imageUrl = document.getElementById('image-preview').src;

        // Upload if new file
        if (file) {
            const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`; // Sanitize filename
            const { error: upErr } = await supabase.storage.from('portfolio').upload(fileName, file);
            if (upErr) throw upErr;
            const { data } = supabase.storage.from('portfolio').getPublicUrl(fileName);
            imageUrl = data.publicUrl;
        } else if (document.getElementById('image-preview').classList.contains('hidden')) {
            imageUrl = null;
        }

        const payload = {
            title: document.getElementById('p-title').value,
            subtitle: document.getElementById('p-subtitle').value,
            category: document.getElementById('p-category').value,
            description: document.getElementById('p-description').value,
            challenge: document.getElementById('p-challenge').value,
            solution: document.getElementById('p-solution').value,
            tags: document.getElementById('p-tags').value.split(',').map(s => s.trim()).filter(s => s),
            image_url: imageUrl
        };

        if (id) {
            const { error } = await supabase.from('projects').update(payload).eq('id', id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('projects').insert([payload]);
            if (error) throw error;
        }

        closeModal();
        loadProjects();

    } catch (e) {
        alert("Falha na operação: " + (e.message || "Erro desconhecido"));
    } finally {
        els.modalLoader.classList.add('hidden');
    }
};

window.editProject = (id) => openModal(projectsCache.find(p => p.id === id));

// --- Deletion ---
window.askDelete = (id) => {
    deleteTargetId = id;
    els.deleteModal.classList.remove('hidden');
    els.deleteModal.classList.add('flex');
};

function closeDeleteModal() {
    els.deleteModal.classList.add('hidden');
    els.deleteModal.classList.remove('flex');
}

async function confirmDelete() {
    if (!deleteTargetId) return;
    const { error } = await supabase.from('projects').delete().eq('id', deleteTargetId);
    if (!error) {
        closeDeleteModal();
        loadProjects();
    } else {
        alert("Falha ao excluir o projeto.");
    }
}
