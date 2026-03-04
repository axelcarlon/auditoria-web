// navbar.js
const navbarHTML = `
<style>
    /* Estilos del Menú unificados */
    .header { background: #111827; color: white; padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1000; }
    .header .logo-container { display: flex; align-items: center; gap: 12px; text-decoration: none; color: white; }
    .header .logo-container img { width: 40px; height: 40px; object-fit: contain; }
    .header .logo-text { font-weight: 800; font-size: 24px; letter-spacing: -0.5px; }
    
    .nav-right { display: flex; align-items: center; gap: 20px; }
    .nav-link { color: #D1D5DB; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .nav-link:hover { color: #ffffff; }

    .dropdown { position: relative; display: inline-block; }
    .dropdown-toggle { color: #D1D5DB; text-decoration: none; font-weight: 500; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 10px 0; transition: color 0.2s; }
    .dropdown-toggle:hover { color: #ffffff; }
    .dropdown-content { display: none; position: absolute; right: 0; top: 100%; background-color: #ffffff; min-width: 900px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); z-index: 100; border-radius: 12px; border: 1px solid #E5E7EB; margin-top: 10px; grid-template-columns: repeat(4, 1fr); padding: 20px; gap: 15px; text-align: left; }
    .dropdown::after { content: ""; position: absolute; top: 100%; left: 0; width: 100%; height: 20px; }
    .dropdown-column { display: flex; flex-direction: column; }
    .dropdown-content a { color: #111827; padding: 8px 10px; text-decoration: none; display: block; font-size: 12px; border-radius: 6px; transition: all 0.2s; font-weight: 500; }
    .dropdown-content a:hover { background-color: #F9FAFB; color: #2563EB; transform: translateX(3px); }
    .dropdown:hover .dropdown-content { display: grid; }
    .menu-category { padding: 10px 10px 4px; font-size: 11px; text-transform: uppercase; color: #2563EB; font-weight: 800; letter-spacing: 0.5px; border-bottom: 1px solid #E5E7EB; margin-bottom: 5px; }

    .btn-pro-nav { background: #2563EB; color: white !important; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 13px; text-decoration: none; transition: background 0.2s; }
    .btn-pro-nav:hover { background: #1E40AF; }
    
    /* Menú Hamburguesa Móvil */
    .mobile-menu-btn { display: none; background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
    
    @media (max-width: 900px) {
        .header { padding: 15px 20px; }
        .nav-right { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background: #111827; padding: 20px; border-top: 1px solid #374151; }
        .nav-right.active { display: flex; align-items: flex-start; gap: 15px; }
        .mobile-menu-btn { display: block; }
        .dropdown-content { position: static; min-width: 100%; grid-template-columns: 1fr; box-shadow: none; border: none; padding: 0; margin-top: 10px; display: none; }
        .dropdown.active .dropdown-content { display: grid; }
    }
</style>

<header class="header">
    <a href="index.html" class="logo-container">
        <img src="candado.png" alt="AuditorIA Logo">
        <span class="logo-text">AuditorIA</span>
    </a>
    <button class="mobile-menu-btn" onclick="document.getElementById('mainNav').classList.toggle('active')">☰</button>
    <div class="nav-right" id="mainNav">
        <a href="como-funciona.html" class="nav-link" style="color: #60A5FA; font-weight: bold;">Cómo Funciona</a>
        <a href="index.html" class="nav-link">Auditoría Masiva</a>
        <div class="dropdown" onclick="this.classList.toggle('active')">
            <div class="dropdown-toggle">Suite de Herramientas ▾</div>
            <div class="dropdown-content">
                <div class="dropdown-column">
                    <div class="menu-category">Auditoría y Riesgo</div>
                    <a href="index.html">Auditoría Masiva (Art. 30-B)</a>
                    <a href="risk-score.html">RiskScore (Semáforo SAT)</a>
                    <a href="validador-efos.html">Validador EFOS (Art. 69-B)</a>
                    <a href="tasa-efectiva.html">Tasa Efectiva de ISR</a>
                    <a href="auditor-nomina.html">Auditor de Nómina (CFDI 1.2)</a>
                    <a href="calculadora-recargos.html">Calculadora de Recargos</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Materialidad y Defensa</div>
                    <a href="auditor-materialidad.html">Materialidad (Contratos vs XML)</a>
                    <a href="prueba-servicio.html">Prueba de Servicio (Intangibles)</a>
                    <a href="auditoria-activos.html">Auditoría Visual de Activos Fijos</a>
                    <a href="precios-aduana.html">Riesgo Aduanero (Subvaluación)</a>
                    <a href="auditoria-viaticos.html">Auditoría Geoespacial Viáticos</a>
                    <a href="defensa-legal.html">Generador de Defensa Legal</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Inteligencia y Bancos</div>
                    <a href="analisis-proveedores.html">Análisis de Proveedores</a>
                    <a href="proyector-iva.html">Proyector IVA Mensual</a>
                    <a href="dashboard-xml.html">Dashboard Financiero</a>
                    <a href="conciliacion-ia.html">Conciliación Bancaria IA</a>
                    <a href="conversor-bancario.html">Conversor PDF a CSV Bancario</a>
                    <a href="validador-csf-32d.html">Analista Idoneidad (CSF/32-D)</a>
                </div>
                <div class="dropdown-column">
                    <div class="menu-category">Operación Diaria</div>
                    <a href="escaner-ocr-fiscal.html">Escáner OCR (Foto a Datos)</a>
                    <a href="visor-xml.html">Visor y Decodificador XML</a>
                    <a href="generador-polizas.html">Generador de Pólizas (Layout)</a>
                    <a href="conciliador-pagos.html">Conciliador PPD vs REP</a>
                    <a href="buscador-conceptos.html">Buscador Forense en XML</a>
                    <a href="conversor-xml-pdf.html">Conversor Masivo XML a PDF</a>
                </div>
            </div>
        </div>
        <a href="login.html" class="nav-link">Mi Cuenta</a>
        <a href="planes.html" class="btn-pro-nav">Actualizar a PRO</a>
    </div>
</header>
`;
document.write(navbarHTML);
