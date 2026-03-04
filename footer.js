// footer.js
const footerHTML = `
<style>
    .site-footer { text-align: left; padding: 60px 20px 40px; background-color: #0F172A; color: #9CA3AF; font-size: 13px; margin-top: 60px; border-top: 1px solid #1E293B; font-family: system-ui, -apple-system, sans-serif;}
    .site-footer a { color: #CBD5E1; text-decoration: none; transition: 0.2s; display: block; margin-bottom: 10px; }
    .site-footer a:hover { color: #ffffff; }

    /* WIDGET CHAT CSS */
    .advisor-widget { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: system-ui, -apple-system, sans-serif; }
    .advisor-btn { background: #2563EB; color: white; border: none; padding: 12px 20px; border-radius: 30px; font-weight: 600; font-size: 14px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px; transition: transform 0.2s; }
    .advisor-btn:hover { transform: scale(1.05); }
    .advisor-chat { display: none; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 1px solid #E5E7EB; flex-direction: column; overflow: hidden; position: absolute; bottom: 60px; right: 0; }
    .advisor-header { background: #111827; color: white; padding: 15px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
    .advisor-close { background: none; border: none; color: white; font-size: 20px; cursor: pointer; line-height: 1; padding: 0; }
    .advisor-body { flex: 1; padding: 15px; overflow-y: auto; background: #F9FAFB; display: flex; flex-direction: column; gap: 10px; font-size: 13px; }
    .msg-bot { background: white; border: 1px solid #E5E7EB; padding: 10px 15px; border-radius: 12px 12px 12px 0; align-self: flex-start; max-width: 85%; color: #374151; line-height: 1.5; }
    .msg-user { background: #2563EB; color: white; padding: 10px 15px; border-radius: 12px 12px 0 12px; align-self: flex-end; max-width: 85%; line-height: 1.5; }
    .advisor-footer { padding: 10px; background: white; border-top: 1px solid #E5E7EB; display: flex; gap: 8px; }
    .advisor-input { flex: 1; padding: 10px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 13px; outline: none; }
    .advisor-input:focus { border-color: #2563EB; }
    .advisor-send { background: #2563EB; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .typing-indicator { font-size: 12px; color: #6B7280; font-style: italic; align-self: flex-start; display: none; }
    @media (max-width: 768px) { .advisor-chat { width: calc(100vw - 40px); height: calc(100vh - 100px); bottom: 60px; right: 0; } }
</style>

<footer class="site-footer">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 30px;">
        <div>
            <h4 style="color: #F8FAFC; margin-bottom: 20px; font-size: 16px;">Plataforma</h4>
            <a href="index.html">Auditoría Masiva XML</a>
            <a href="despachos-contables.html">Para Despachos</a>
            <a href="empresas.html">Para Empresas</a>
            <h4 style="color: #F8FAFC; margin-bottom: 20px; font-size: 16px; margin-top: 30px;">Legal y Contacto</h4>
            <a href="privacidad.html">Aviso de Privacidad</a>
            <a href="terminos.html">Términos de Servicio</a>
            <a href="mailto:contacto@auditoriaxml.mx" style="color: #3B82F6; font-weight: 600;">contacto@auditoriaxml.mx</a>
        </div>
        <div>
            <h4 style="color: #F8FAFC; margin-bottom: 20px; font-size: 16px;">Auditoría y Riesgo</h4>
            <a href="index.html">Auditoría Masiva (Art. 30-B)</a>
            <a href="risk-score.html">RiskScore (Semáforo SAT)</a>
            <a href="validador-efos.html">Validador EFOS (Art. 69-B)</a>
            <a href="tasa-efectiva.html">Tasa Efectiva de ISR</a>
            <a href="auditor-nomina.html">Auditor de Nómina (CFDI 1.2)</a>
            <a href="calculadora-recargos.html">Calculadora de Recargos</a>
        </div>
        <div>
            <h4 style="color: #F8FAFC; margin-bottom: 20px; font-size: 16px;">Materialidad y Defensa</h4>
            <a href="auditor-materialidad.html">Materialidad (Contratos vs XML)</a>
            <a href="prueba-servicio.html">Prueba de Servicio (Intangibles)</a>
            <a href="auditoria-activos.html">Auditoría Visual de Activos Fijos</a>
            <a href="precios-aduana.html">Riesgo Aduanero (Subvaluación)</a>
            <a href="auditoria-viaticos.html">Auditoría Geoespacial Viáticos</a>
            <a href="defensa-legal.html">Generador de Defensa Legal</a>
        </div>
        <div>
            <h4 style="color: #F8FAFC; margin-bottom: 20px; font-size: 16px;">Inteligencia y Bancos</h4>
            <a href="analisis-proveedores.html">Análisis de Proveedores</a>
            <a href="proyector-iva.html">Proyector IVA Mensual</a>
            <a href="dashboard-xml.html">Dashboard Financiero</a>
            <a href="conciliacion-ia.html">Conciliación Bancaria IA</a>
            <a href="conversor-bancario.html">Conversor PDF a CSV Bancario</a>
            <a href="validador-csf-32d.html">Analista Idoneidad (CSF/32-D)</a>
        </div>
        <div>
            <h4 style="color: #F8FAFC; margin-bottom: 20px; font-size: 16px;">Operación Diaria</h4>
            <a href="escaner-ocr-fiscal.html">Escáner OCR (Foto a Datos)</a>
            <a href="visor-xml.html">Visor y Decodificador XML</a>
            <a href="generador-polizas.html">Generador de Pólizas (Layout)</a>
            <a href="conciliador-pagos.html">Conciliador PPD vs REP</a>
            <a href="buscador-conceptos.html">Buscador Forense en XML</a>
            <a href="conversor-xml-pdf.html">Conversor Masivo XML a PDF</a>
        </div>
    </div>
    <div style="border-top: 1px solid #1E293B; padding-top: 20px; font-size: 12px; margin-top: 40px; color: #9CA3AF; text-align: center;">
        <p>&copy; 2026 AuditorIA. Herramienta diseñada para el cumplimiento fiscal en México.</p>
        <p>No somos una entidad gubernamental ni estamos afiliados al Servicio de Administración Tributaria (SAT).</p>
    </div>
</footer>

<div id="advisorWidget" class="advisor-widget">
    <button id="advisorBtn" class="advisor-btn">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        Asesor Fiscal IA
    </button>
    <div id="advisorChat" class="advisor-chat">
        <div class="advisor-header">
            <span>Paula - Asesora Fiscal</span>
            <button id="closeAdvisor" class="advisor-close">×</button>
        </div>
        <div id="advisorBody" class="advisor-body">
            <div class="msg-bot">Hola, soy la analista fiscal en línea. Ingresa tu consulta o tus dudas sobre el SAT y CFDI, con gusto te ayudaré.</div>
            <div id="typingIndicator" class="typing-indicator">Paula está escribiendo...</div>
        </div>
        <div class="advisor-footer">
            <input type="text" id="advisorInput" class="advisor-input" placeholder="Escribe tu consulta..." autocomplete="off">
            <button id="sendAdvisor" class="advisor-send">Enviar</button>
        </div>
    </div>
</div>
`;
document.write(footerHTML);

// Lógica Compartida de Paula
document.addEventListener("DOMContentLoaded", () => {
    const advisorBtn = document.getElementById('advisorBtn');
    const advisorChat = document.getElementById('advisorChat');
    const closeAdvisor = document.getElementById('closeAdvisor');
    const sendAdvisor = document.getElementById('sendAdvisor');
    const advisorInput = document.getElementById('advisorInput');
    const advisorBody = document.getElementById('advisorBody');
    const typingIndicator = document.getElementById('typingIndicator');
    let chatHistory = [];

    advisorBtn.onclick = () => { advisorChat.style.display = 'flex'; advisorBtn.style.display = 'none'; };
    closeAdvisor.onclick = () => { advisorChat.style.display = 'none'; advisorBtn.style.display = 'flex'; };

    function renderMessage(text, type) {
        const div = document.createElement('div');
        div.className = type === 'user' ? 'msg-user' : 'msg-bot';
        div.innerText = text;
        advisorBody.insertBefore(div, typingIndicator);
        advisorBody.scrollTop = advisorBody.scrollHeight;
    }

    async function handleSend() {
        const text = advisorInput.value.trim();
        if (!text) return;
        renderMessage(text, 'user');
        advisorInput.value = '';
        typingIndicator.style.display = 'block';
        advisorBody.scrollTop = advisorBody.scrollHeight;

        const currentHistory = [...chatHistory];
        chatHistory.push({ rol: "usuario", texto: text });

        try {
            const res = await fetch("https://fastapi-susu.onrender.com/api/chat", {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensaje: text, historial: currentHistory })
            });
            if (!res.ok) throw new Error('Error API');
            const data = await res.json();
            renderMessage(data.respuesta, 'bot');
            chatHistory.push({ rol: "modelo", texto: data.respuesta });
        } catch (err) {
            renderMessage("Hubo un error de conexión, pero estoy aquí para ayudarte. Por favor, intenta enviar tu mensaje nuevamente.", 'bot');
            chatHistory.pop();
        } finally {
            typingIndicator.style.display = 'none';
        }
    }
    sendAdvisor.onclick = handleSend;
    advisorInput.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
});
