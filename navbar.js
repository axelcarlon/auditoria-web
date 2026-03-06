const navbarHTML = `
<style>
    :root { 
        --bg-nav: rgba(15, 23, 42, 0.85); 
        --text-nav: #F8FAFC; 
        --brand-nav: #3B82F6; 
        --border-nav: rgba(255, 255, 255, 0.08);
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

    .dropdown { position: relative; display: inline-block; }
    .dropdown-toggle { color: #94A3B8; text-decoration: none; font-weight: 600; font-size: 14.5px; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 10px 0; transition: color 0.2s; white-space: nowrap; }
    .dropdown:hover .dropdown-toggle { color: #FFFFFF; }
    
    /* Mega Menú de 4 Columnas */
    .dropdown-menu { display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: #1E293B; width: 980px; max-width: 95vw; box-shadow: 0 20px 40px rgba(0,0,0,0.5); border-radius: 12px; padding: 30px; z-index: 1000; border: 1px solid rgba(255,255,255,0.1); grid-template-columns: repeat(4, 1fr); gap: 25px; box-sizing: border-box;}
    .dropdown:hover .dropdown-menu { display: grid; animation: dropFade 0.2s ease-out; }
    @keyframes dropFade { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

    .menu-category { font-size: 11px; text-transform: uppercase; color: var(--brand-nav); font-weight: 900; margin-bottom: 15px; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;}
    .dropdown-column a { color: #E2E8F0; text-decoration: none; display: block; font-size: 13.5px; font-weight: 600; margin-bottom: 12px; transition: 0.2s; padding-left: 8px; border-left: 2px solid transparent; line-height: 1.4;}
    .dropdown-column a:hover:not(.link-pdf-pro) { color: #FFFFFF; border-left-color: var(--brand-nav); background: rgba(255,255,255,0.02); }

    /* ESTILO EXCLUSIVO LATENCIA ROJA PARA PDF STUDIO PRO */
    .link-pdf-pro {
        color: #FCA5A5 !important;
        background: rgba(220, 38, 38, 0.1) !important;
        border: 1px solid #DC2626 !important;
        border-radius: 6px;
        padding: 6px 8px !important;
        font-weight: 900 !important;
        animation: pulseNav 2s infinite;
        margin-top: 4px;
        margin-bottom: 12px;
    }
    .link-pdf-pro:hover {
        color: #FFFFFF !important;
        background: rgba(220, 38, 38, 0.25) !important;
    }
    @keyframes pulseNav { 
        0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); } 
        70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); } 
        100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } 
    }

    .btn-pro-nav { background: var(--brand-nav); color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 800; font-size: 13px; transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); white-space: nowrap;}
    .btn-pro-nav:hover { background: #2563EB; transform: translateY(-1px); box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4); }

    /* PARCHE MÓVIL CRÍTICO */
    @media (max-width: 1024px) {
        .header-core { flex-wrap: wrap; padding: 15px 20px; gap: 15px; justify-content: center;}
        .nav-right { flex-wrap: wrap; justify-content: center; gap: 15px; width: 100%;}
        .dropdown { position: static; width: 100%; text-align: center; }
        .dropdown-toggle { justify-content: center; width: 100%; border-bottom: 1px solid var(--border-nav);}
        .dropdown-menu { width: 100%; left: 0; transform: none; grid-template-columns: 1fr; max-height: 60vh; overflow-y: auto; padding: 15px; gap: 15px; position: relative;}
        .dropdown:hover .dropdown-menu { display: grid; animation: none; }
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

        <div class="dropdown">
            <div class="dropdown-toggle">
                Ecosistema de Soluciones
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div class="dropdown-menu">
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
                    <a href="auditoria-viaticos.html">Escáner de Viáticos y Gastos de Viaje</a>
                    <a href="precios-aduana.html">Simulador de Costos Aduanales</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Operación e Inteligencia XML</div>
                    <a href="generador-diot.html">Generador DIOT SAT (Carga Batch)</a>
                    <a href="visor-xml.html">Visor y Decodificador XML</a>
                    <a href="dashboard-xml.html">Dashboard Financiero XML</a>
                    <a href="proyector-iva.html">Proyector Forense de IVA</a>
                    <a href="analisis-proveedores.html">Análisis Estratégico de Proveedores</a>
                    <a href="auditor-nomina.html">Auditoría de Nómina y Riesgos</a>
                    <a href="buscador-conceptos.html">Auditoría de Compras y Conceptos</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Automatización y PDF</div>
                    <a href="editor-pdf.html" class="link-pdf-pro">AuditorIA PDF Studio PRO</a>
                    <a href="conversor-xml-pdf.html">Conversor Masivo XML a PDF</a>
                    <a href="escaner-ocr-fiscal.html">Escáner OCR de Tickets</a>
                    <a href="conversor-bancario.html">Conversor Bancario PDF a Excel</a>
                    <a href="conciliacion-ia.html">Conciliación Bancaria IA</a>
                    <a href="conciliador-pagos.html">Conciliador PPD vs REP</a>
                    <a href="generador-polizas.html">Generador Layout Pólizas</a>
                </div>
            </div>
        </div>
        <a href="login.html" class="nav-link">Acceso Cliente</a>
        <a href="planes.html" class="btn-pro-nav">Licencia Corporativa</a>
    </div>
</header>
`;

document.write(navbarHTML);

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
