const navbarHTML = `
<style>
    :root { 
        --bg-nav: rgba(15, 23, 42, 0.85); 
        --text-nav: #F8FAFC; 
        --brand-nav: #3B82F6; 
        --border-nav: rgba(255, 255, 255, 0.08);
    }
    
    body { margin: 0; padding: 0; }
    
    /* Sistema Global Toast (Reemplazo de alert) */
    #toast-container { position: fixed; top: 20px; right: 20px; z-index: 100000; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
    .toast-msg { background: rgba(17, 24, 39, 0.95); color: white; padding: 16px 24px; border-radius: 8px; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.3); backdrop-filter: blur(10px); border-left: 4px solid var(--brand-nav); transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 12px; pointer-events: auto; min-width: 300px; }
    .toast-msg.show { transform: translateX(0); }
    .toast-msg.error { border-left-color: #EF4444; }
    .toast-msg.success { border-left-color: #10B981; }

    /* Header Glassmorphism */
    .header-core { background: var(--bg-nav); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-nav); padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 9999; font-family: system-ui, sans-serif; }
    .header-core .logo-container { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--text-nav); }
    .header-core .logo-container img { width: 38px; height: 38px; object-fit: contain; }
    .header-core .logo-text { font-weight: 900; font-size: 22px; letter-spacing: -0.5px; }
    
    .nav-right { display: flex; align-items: center; gap: 24px; }
    .nav-link { color: #94A3B8; text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s; letter-spacing: 0.3px; }
    .nav-link:hover { color: #FFFFFF; }

    .dropdown { position: relative; display: inline-block; }
    .dropdown-toggle { color: #94A3B8; text-decoration: none; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 10px 0; transition: color 0.2s; }
    .dropdown:hover .dropdown-toggle { color: #FFFFFF; }
    
    .dropdown-menu { display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: #1E293B; min-width: 600px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-radius: 12px; padding: 25px; z-index: 1000; border: 1px solid rgba(255,255,255,0.1); grid-template-columns: 1fr 1fr; gap: 30px; }
    .dropdown:hover .dropdown-menu { display: grid; animation: dropFade 0.2s ease-out; }
    @keyframes dropFade { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

    .menu-category { font-size: 11px; text-transform: uppercase; color: var(--brand-nav); font-weight: 900; margin-bottom: 15px; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;}
    .dropdown-column a { color: #E2E8F0; text-decoration: none; display: block; font-size: 13px; font-weight: 500; margin-bottom: 12px; transition: 0.2s; padding-left: 10px; border-left: 2px solid transparent; }
    .dropdown-column a:hover { color: #FFFFFF; border-left-color: var(--brand-nav); background: rgba(255,255,255,0.02); }

    .btn-pro-nav { background: var(--brand-nav); color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 800; font-size: 13px; transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    .btn-pro-nav:hover { background: #2563EB; transform: translateY(-1px); box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4); }

    @media (max-width: 900px) {
        .header-core { padding: 15px 20px; }
        .dropdown-menu { min-width: 250px; grid-template-columns: 1fr; left: auto; right: 0; transform: none; }
        .dropdown:hover .dropdown-menu { animation: dropFadeMobile 0.2s ease-out; }
        @keyframes dropFadeMobile { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    }
</style>

<div id="toast-container"></div>

<header class="header-core">
    <a href="index.html" class="logo-container">
        <img src="logo-oficial.png" alt="AuditorIA Logo">
        <span class="logo-text">AuditorIA</span>
    </a>
    
    <div class="nav-right">
        <div class="dropdown">
            <div class="dropdown-toggle">
                Soluciones Forenses
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div class="dropdown-menu">
                <div class="dropdown-column">
                    <div class="menu-category">Inteligencia y Bancos</div>
                    <a href="analisis-proveedores.html">Análisis de Proveedores (EFOS)</a>
                    <a href="proyector-iva.html">Proyección de IVA Mensual</a>
                    <a href="dashboard-xml.html">Dashboard Financiero XML</a>
                    <a href="conciliacion-ia.html">Conciliación Bancaria Semántica</a>
                    <a href="conversor-bancario.html">Extracción PDF a CSV Bancario</a>
                    <a href="validador-csf-32d.html">Análisis de Idoneidad (CSF/32-D)</a>
                    <a href="tasa-efectiva.html">Auditoría Tasa Efectiva ISR</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Operación y Materialidad</div>
                    <a href="escaner-ocr-fiscal.html">Escáner OCR (Tickets/PDF)</a>
                    <a href="visor-xml.html">Decodificador Masivo XML</a>
                    <a href="generador-polizas.html">Generador Layout Pólizas</a>
                    <a href="conciliador-pagos.html">Conciliador PPD vs REP</a>
                    <a href="auditor-materialidad.html">Materialidad (Contrato vs XML)</a>
                    <a href="auditoria-activos.html">Auditoría Activos Fijos (Visión)</a>
                    <a href="defensa-legal.html">Generador Defensa Legal SAT</a>
                </div>
            </div>
        </div>
        <a href="login.html" class="nav-link">Acceso Cliente</a>
        <a href="planes.html" class="btn-pro-nav">Licencia Corporativa</a>
    </div>
</header>
`;

document.write(navbarHTML);

// Motor de Notificaciones Global (Reemplazo de alert)
window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    
    let icon = '';
    if (type === 'error') {
        icon = '<svg width="20" height="20" fill="none" stroke="#EF4444" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    } else if (type === 'success') {
        icon = '<svg width="20" height="20" fill="none" stroke="#10B981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else {
        icon = '<svg width="20" height="20" fill="none" stroke="#3B82F6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }
    
    toast.innerHTML = `${icon} <div>${message}</div>`;
    container.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
};
