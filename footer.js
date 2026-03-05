const footerHTML = `
<style>
    .site-footer { text-align: left; padding: 60px 40px 40px; background-color: #0F172A; color: #94A3B8; font-size: 13px; margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.05); font-family: system-ui, sans-serif;}
    .site-footer a { color: #CBD5E1; text-decoration: none; transition: 0.2s; display: block; margin-bottom: 10px; }
    .site-footer a:hover { color: #FFFFFF; }

    /* WIDGET CHAT IA FORENSE */
    .advisor-widget { position: fixed; bottom: 25px; right: 25px; z-index: 99999; font-family: system-ui, sans-serif; }
    .advisor-btn { background: #2563EB; color: white; border: 1px solid rgba(255,255,255,0.1); padding: 14px 24px; border-radius: 30px; font-weight: 800; font-size: 14px; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 8px; transition: transform 0.2s; letter-spacing: 0.5px; }
    .advisor-btn:hover { transform: translateY(-2px); background: #1D4ED8; }
    
    .advisor-chat { display: none; width: 360px; height: 500px; background: rgba(17, 24, 39, 0.95); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); flex-direction: column; overflow: hidden; position: absolute; bottom: 60px; right: 0; }
    .advisor-chat.active { display: flex; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    
    .advisor-header { background: #1E293B; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .advisor-header-title { color: white; font-weight: 800; font-size: 15px; display: flex; align-items: center; gap: 8px; }
    .advisor-close { background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 20px; transition: 0.2s; }
    .advisor-close:hover { color: white; }
    
    .advisor-body { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; scrollbar-width: thin; scrollbar-color: #4B5563 transparent; }
    .advisor-body::-webkit-scrollbar { width: 6px; }
    .advisor-body::-webkit-scrollbar-thumb { background-color: #4B5563; border-radius: 10px; }
    
    .msg-bot { background: #1E293B; color: #E2E8F0; padding: 12px 16px; border-radius: 12px 12px 12px 0; max-width: 85%; font-size: 13px; line-height: 1.6; border: 1px solid rgba(255,255,255,0.05); align-self: flex-start; }
    .msg-user { background: #2563EB; color: white; padding: 12px 16px; border-radius: 12px 12px 0 12px; max-width: 85%; font-size: 13px; line-height: 1.5; align-self: flex-end; box-shadow: 0 4px 10px rgba(37,99,235,0.2); }
    
    .advisor-footer { padding: 15px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 10px; background: #0F172A; }
    .advisor-input { flex: 1; padding: 12px 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 13px; background: #1E293B; color: white; outline: none; transition: 0.2s; }
    .advisor-input:focus { border-color: #3B82F6; }
    .advisor-send { background: #3B82F6; color: white; border: none; width: 42px; height: 42px; border-radius: 8px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.2s; }
    .advisor-send:hover { background: #2563EB; }
    
    .typing-indicator { display: none; padding: 12px 16px; background: #1E293B; border-radius: 12px 12px 12px 0; max-width: 60px; border: 1px solid rgba(255,255,255,0.05); align-self: flex-start; }
    .dot { display: inline-block; width: 6px; height: 6px; background-color: #94A3B8; border-radius: 50%; margin: 0 2px; animation: bounce 1.4s infinite ease-in-out both; }
    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
</style>

<div class="advisor-widget">
    <div class="advisor-chat" id="advisorChat">
        <div class="advisor-header">
            <div class="advisor-header-title">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Terminal Legal IA
            </div>
            <button class="advisor-close" id="closeAdvisor">&times;</button>
        </div>
        <div class="advisor-body" id="advisorBody">
            <div class="msg-bot">Base de datos legislativa conectada. Indique el fundamento o requerimiento a consultar.</div>
            <div class="typing-indicator" id="typingIndicator"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        </div>
        <div class="advisor-footer">
            <input type="text" class="advisor-input" id="advisorInput" placeholder="Ej: Multa Art. 83 fracción IV...">
            <button class="advisor-send" id="sendAdvisor">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
        </div>
    </div>
    <button class="advisor-btn" id="openAdvisor">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        Consulta Ley IA
    </button>
</div>

<footer class="site-footer">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;">
        <div>
            <strong style="color: white; font-size: 16px; display: block; margin-bottom: 15px;">AuditorIA Core</strong>
            <p style="margin: 0 0 15px 0;">Plataforma de Ingeniería Forense Tributaria. Análisis preventivo masivo sin bases de datos retentivas.</p>
        </div>
        <div>
            <strong style="color: white; display: block; margin-bottom: 15px; font-size: 14px;">Herramientas Críticas</strong>
            <a href="validador-efos.html">Detección EFOS (Art. 69-B)</a>
            <a href="visor-xml.html">Motor Decodificador XML</a>
            <a href="tasa-efectiva.html">Benchmarking Tasa Efectiva</a>
        </div>
        <div>
            <strong style="color: white; display: block; margin-bottom: 15px; font-size: 14px;">Corporativo</strong>
            <a href="como-funciona.html">Arquitectura Zero-Retention</a>
            <a href="despachos-contables.html">Soluciones Despachos</a>
            <a href="planes.html">Licenciamiento Pro</a>
        </div>
    </div>
    <div style="max-width: 1200px; margin: 40px auto 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
        &copy; ${new Date().getFullYear()} AuditorIA.mx. Todos los derechos reservados.
    </div>
</footer>
`;

document.write(footerHTML);

// Lógica del Chat IA
setTimeout(() => {
    const openBtn = document.getElementById('openAdvisor');
    const closeBtn = document.getElementById('closeAdvisor');
    const chatWin = document.getElementById('advisorChat');
    const advisorInput = document.getElementById('advisorInput');
    const advisorBody = document.getElementById('advisorBody');
    const sendAdvisor = document.getElementById('sendAdvisor');
    const typingIndicator = document.getElementById('typingIndicator');

    let chatHistory = [];

    openBtn.onclick = () => { chatWin.classList.add('active'); openBtn.style.display = 'none'; };
    closeBtn.onclick = () => { chatWin.classList.remove('active'); openBtn.style.display = 'flex'; };

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
            if (!res.ok) throw new Error('Fallo de motor');
            const data = await res.json();
            renderMessage(data.respuesta, 'bot');
            chatHistory.push({ rol: "modelo", texto: data.respuesta });
        } catch (err) {
            renderMessage("Excepción de red. Verifique conexión a puerto seguro.", 'bot');
            chatHistory.pop();
        } finally {
            typingIndicator.style.display = 'none';
        }
    }
    sendAdvisor.onclick = handleSend;
    advisorInput.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
}, 100);
