const navbarHTML = `
<style>
    :root { 
        --bg-nav: rgba(15, 23, 42, 0.85); 
        --text-nav: #F8FAFC; 
        --brand-nav: #3B82F6; 
        --border-nav: rgba(255, 255, 255, 0.08);
        --accent-nav: #E11D48; /* Carmesí */
    }
    
    body { margin: 0; padding: 0; overflow-x: hidden; }
    
    #toast-container { position: fixed; top: 20px; right: 20px; z-index: 100000; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
    .toast-msg { background: rgba(17, 24, 39, 0.95); color: white; padding: 16px 24px; border-radius: 8px; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.3); backdrop-filter: blur(10px); border-left: 4px solid var(--brand-nav); transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 12px; pointer-events: auto; min-width: 300px; }
    .toast-msg.show { transform: translateX(0); }
    .toast-msg.error { border-left-color: #EF4444; }
    .toast-msg.success { border-left-color: #10B981; }

    .header-core { background: var(--bg-nav); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-nav); padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 9999; font-family: system-ui, sans-serif; width: 100%; box-sizing: border-box; }
    .header-core .logo-container { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--text-nav); flex-shrink: 0; }
    .header-core .logo-container img { width: 38px; height: 38px; object-fit: contain; }
    .header-core .logo-text { font-weight: 900; font-size: 22px; letter-spacing: -0.5px; }
    
    .nav-right { display: flex; align-items: center; gap: 24px; }
    .nav-link { display: flex; align-items: center; gap: 6px; color: #94A3B8; text-decoration: none; font-size: 14.5px; font-weight: 600; transition: color 0.2s; letter-spacing: 0.3px; white-space: nowrap; }
    .nav-link:hover { color: #FFFFFF; }

    /* MEGA MENÚ DE SOLUCIONES */
    .dropdown { position: relative; display: inline-block; }
    .dropdown-toggle { color: #94A3B8; text-decoration: none; font-weight: 600; font-size: 14.5px; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 10px 0; transition: color 0.2s; white-space: nowrap; }
    .dropdown:hover .dropdown-toggle { color: #FFFFFF; }
    
    /* CORRECCIÓN DE CORTE: Anclado a la derecha (-60px para no estorbar al botón Mi Cuenta) */
    .mega-menu { display: none; position: absolute; top: 100%; right: -60px; left: auto; background: #1E293B; width: 980px; max-width: 92vw; box-shadow: 0 20px 40px rgba(0,0,0,0.5); border-radius: 12px; padding: 30px; z-index: 1000; border: 1px solid rgba(255,255,255,0.1); grid-template-columns: repeat(4, 1fr); gap: 25px; box-sizing: border-box; margin-top: 8px;}
    
    /* PUENTE INVISIBLE MEGA MENÚ */
    .mega-menu::before { content: ''; position: absolute; top: -15px; left: 0; width: 100%; height: 15px; background: transparent; }

    .dropdown:hover .mega-menu { display: grid; animation: dropFade 0.2s ease-out; }
    @keyframes dropFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .menu-category { font-size: 11px; text-transform: uppercase; color: var(--brand-nav); font-weight: 900; margin-bottom: 15px; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;}
    .dropdown-column a { color: #E2E8F0; text-decoration: none; display: block; font-size: 13.5px; font-weight: 600; margin-bottom: 12px; transition: 0.2s; padding-left: 8px; border-left: 2px solid transparent; line-height: 1.4;}
    .dropdown-column a:hover:not(.link-pdf-pro) { color: #FFFFFF; border-left-color: var(--brand-nav); background: rgba(255,255,255,0.02); }

    .link-pdf-pro { color: #FCA5A5 !important; background: rgba(220, 38, 38, 0.1) !important; border: 1px solid #DC2626 !important; border-radius: 6px; padding: 6px 8px !important; font-weight: 900 !important; animation: pulseNav 2s infinite; margin-top: 4px; margin-bottom: 12px; }
    .link-pdf-pro:hover { color: #FFFFFF !important; background: rgba(220, 38, 38, 0.25) !important; }
    
    @keyframes pulseNav { 0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); } 70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); } 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } }

    /* MENÚ "MI CUENTA" (ESTADO LOGUEADO) */
    .user-dropdown { position: relative; display: inline-block; }
    .user-btn { display: flex; align-items: center; gap: 8px; background: rgba(225, 29, 72, 0.1); border: 1px solid rgba(225, 29, 72, 0.3); color: white; padding: 8px 18px; border-radius: 30px; font-weight: 800; font-size: 13.5px; cursor: pointer; transition: 0.3s; }
    .user-btn:hover { background: rgba(225, 29, 72, 0.2); border-color: rgba(225, 29, 72, 0.5); }
    
    .live-dot { width: 8px; height: 8px; background: var(--accent-nav); border-radius: 50%; box-shadow: 0 0 8px var(--accent-nav); animation: pulseDot 2s infinite; }
    @keyframes pulseDot { 0% { transform: scale(0.95); opacity: 0.7; box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.6); } 70% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 0 6px rgba(225, 29, 72, 0); } 100% { transform: scale(0.95); opacity: 0.7; box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); } }

    .user-menu { display: none; position: absolute; top: 100%; right: 0; background: #1E293B; width: 220px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border-radius: 12px; padding: 12px; z-index: 1000; border: 1px solid rgba(255,255,255,0.1); flex-direction: column; gap: 4px; margin-top: 8px;}
    
    /* PUENTE INVISIBLE MI CUENTA */
    .user-menu::before { content: ''; position: absolute; top: -15px; left: 0; width: 100%; height: 15px; background: transparent; }

    .user-dropdown:hover .user-menu { display: flex; animation: dropFade 0.2s ease-out; }
    
    .user-menu a { color: #E2E8F0; text-decoration: none; font-size: 13.5px; font-weight: 600; padding: 10px 12px; border-radius: 8px; transition: 0.2s; display: flex; align-items: center; gap: 10px; }
    .user-menu a:hover { background: rgba(255,255,255,0.05); color: white; }
    .user-menu hr { border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 6px 0; }
    .logout-btn { color: #FCA5A5 !important; }
    .logout-btn:hover { background: rgba(239, 68, 68, 0.1) !important; color: #EF4444 !important; }

    /* BOTONES ESTADO DESLOGUEADO */
    .nav-auth-group { display: flex; align-items: center; gap: 24px; }
    .btn-pro-nav { background: var(--brand-nav); color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 800; font-size: 13px; transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); white-space: nowrap;}
    .btn-pro-nav:hover { background: #2563EB; transform: translateY(-1px); box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4); }

    @media (max-width: 1024px) {
        .header-core { flex-wrap: wrap; padding: 15px 20px; gap: 15px; justify-content: center;}
        .nav-right { flex-wrap: wrap; justify-content: center; gap: 15px; width: 100%;}
        .dropdown { position: static; width: 100%; text-align: center; }
        .dropdown-toggle { justify-content: center; width: 100%; border-bottom: 1px solid var(--border-nav);}
        /* CORRECCIÓN MÓVIL */
        .mega-menu { width: 100%; left: 0; right: auto; transform: none; grid-template-columns: 1fr; max-height: 60vh; overflow-y: auto; padding: 15px; gap: 15px; position: relative;}
        .dropdown:hover .mega-menu { display: grid; animation: none; }
        
        .user-dropdown { position: relative; width: auto; }
        .user-menu { right: 50%; transform: translateX(50%); }
    }
</style>

<div id="toast-container"></div>

<header class="header-core">
    <a href="index.html" class="logo-container">
        <img src="logo-oficial.png" alt="AuditorIA Logo">
        <span class="logo-text">AuditorIA</span>
    </a>
    
    <div class="nav-right">
        
        <a href="index.html" class="nav-link">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Inicio
        </a>

        <a href="como-funciona.html" class="nav-link">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Cómo Funciona
        </a>

        <div class="dropdown">
            <div class="dropdown-toggle">
                Ecosistema de Soluciones
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div class="mega-menu">
                <div class="dropdown-column">
                    <div class="menu-category">Auditoría SAT y Riesgo</div>
                    <a href="auditoria-masiva.html">Auditoría Masiva de Datos</a>
                    <a href="validador-efos.html">Validador EFOS (Art. 69-B)</a>
                    <a href="tasa-efectiva.html">Auditoría de Tasa Efectiva (ISR)</a>
                    <a href="risk-score.html">Auditoría de Riesgo SAT (Risk Score)</a>
                    <a href="calculadora-recargos.html">Calculadora de Recargos SAT</a>
                    <a href="defensa-legal.html">Generador de Defensa Legal</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Materialidad y Cumplimiento</div>
                    <a href="auditor-materialidad.html">Auditor de Razón de Negocios</a>
                    <a href="auditoria-activos.html">Auditoría de Activos Fijos</a>
                    <a href="prueba-servicio.html">Expediente de Materialidad</a>
                    <a href="validador-csf-32d.html">Auditor de Constancias (CSF / 32-D)</a>
                    <a href="auditoria-viaticos.html">Escáner de Viáticos y Viajes</a>
                    <a href="precios-aduana.html">Simulador de Costos Aduanales</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Operación e Inteligencia XML</div>
                    <a href="generador-diot.html">Generador DIOT SAT (Carga Batch)</a>
                    <a href="visor-xml.html">Visor y Decodificador XML</a>
                    <a href="dashboard-xml.html">Dashboard Financiero XML</a>
                    <a href="proyector-iva.html">Proyector Forense de IVA</a>
                    <a href="analisis-proveedores.html">Estrategia de Proveedores</a>
                    <a href="auditor-nomina.html">Auditoría de Nómina y Riesgos</a>
                    <a href="buscador-conceptos.html">Auditoría de Compras y Conceptos</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Automatización y PDF</div>
                    <a href="editor-pdf.html" class="link-pdf-pro">AuditorIA PDF Studio PRO</a>
                    <a href="conversor-xml-pdf.html">Conversor Masivo XML a PDF</a>
                    <a href="escaner-ocr-fiscal.html">Escáner OCR de Tickets</a>
                    <a href="conversor-bancario.html">Bancos PDF a Excel</a>
                    <a href="conciliacion-ia.html">Conciliación Bancaria IA</a>
                    <a href="conciliador-pagos.html">Conciliador PPD vs REP</a>
                    <a href="generador-polizas.html">Generador Layout Pólizas</a>
                </div>
            </div>
        </div>

        <div id="nav-auth-section">
            <div class="nav-auth-group" id="auth-logged-out">
                <a href="login.html" class="nav-link">Acceso Cliente</a>
                <a href="planes.html" class="btn-pro-nav">Licencia Corporativa</a>
            </div>

            <div class="user-dropdown" id="auth-logged-in" style="display: none;">
                <div class="user-btn">
                    <span class="live-dot"></span> Mi Cuenta
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <div class="user-menu">
                    <a href="dashboard-xml.html">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> 
                        Mi Dashboard
                    </a>
                    <a href="planes.html" style="color: #93C5FD;">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> 
                        Mejorar a PRO
                    </a>
                    <a href="privacidad.html">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> 
                        Privacidad
                    </a>
                    <hr>
                    <a href="#" onclick="cerrarSesionGlobal(event)" class="logout-btn">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> 
                        Cerrar Sesión
                    </a>
                </div>
            </div>
        </div>

    </div>
</header>
`;

document.write(navbarHTML);

// ----------------------------------------------------
// LÓGICA DE INTERFAZ Y AUTENTICACIÓN
// ----------------------------------------------------

window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    let icon = type === 'error' ? '<svg width="20" height="20" fill="none" stroke="#EF4444" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' : (type === 'success' ? '<svg width="20" height="20" fill="none" stroke="#10B981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : '<svg width="20" height="20" fill="none" stroke="#3B82F6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>');
    toast.innerHTML = `${icon} <div>${message}</div>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 5000);
};

// Evaluamos silenciosamente si existe la sesión de Supabase en el LocalStorage
setTimeout(() => {
    const sessionKey = 'sb-qhuctouhkxyqhdfwcctl-auth-token';
    const userSession = localStorage.getItem(sessionKey);
    
    if (userSession) {
        document.getElementById('auth-logged-out').style.display = 'none';
        document.getElementById('auth-logged-in').style.display = 'inline-block';
    }
}, 50);

// Función para desconectar y limpiar la bóveda del navegador
window.cerrarSesionGlobal = function(e) {
    e.preventDefault();
    localStorage.removeItem('sb-qhuctouhkxyqhdfwcctl-auth-token');
    localStorage.removeItem('auditoria_creditos');
    
    window.showToast("Sesión cerrada de forma segura.", "success");
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
};
