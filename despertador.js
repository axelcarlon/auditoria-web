// despertador.js - Core System: Wake-up Call & Paywall Manager

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MOTOR DESPERTADOR (Mantiene viva la IA)
    // ==========================================
    fetch("https://fastapi-susu.onrender.com/ping", { method: "GET", mode: "no-cors" })
        .then(() => console.log("Motor IA activado y en espera."))
        .catch(() => console.log("Iniciando motor IA..."));

    // ==========================================
    // 2. INYECCIÓN DEL MURO DE PAGO (PAYWALL)
    // ==========================================
    inyectarPaywallGlobal();
    
    // Inicialización segura de variables
    if (localStorage.getItem('auditoria_creditos') === null) {
        localStorage.setItem('auditoria_creditos', '3');
    }
    if (localStorage.getItem('auditoria_pro') === null) {
        localStorage.setItem('auditoria_pro', 'false');
    }
});

function inyectarPaywallGlobal() {
    // Si ya existe, no lo duplicamos
    if (document.getElementById('paywallModal')) return;

    const paywallHTML = `
    <style>
        /* Fondo oscuro con desenfoque (Glassmorphism) */
        #paywallModal {
            display: none; 
            position: fixed; 
            top: 0; left: 0; width: 100vw; height: 100vh; 
            background: rgba(9, 9, 11, 0.85); 
            backdrop-filter: blur(10px); 
            -webkit-backdrop-filter: blur(10px); 
            z-index: 999999; 
            justify-content: center; 
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease-out;
        }
        
        #paywallModal.active {
            display: flex;
            opacity: 1;
        }

        /* Tarjeta Principal */
        .paywall-card {
            background: #18181B;
            border: 1px solid rgba(220, 38, 38, 0.3);
            border-radius: 20px;
            width: 480px;
            max-width: 90%;
            padding: 40px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0,0,0,0.8), inset 0 0 40px rgba(220, 38, 38, 0.05);
            transform: scale(0.95) translateY(20px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            font-family: 'Inter', system-ui, sans-serif;
        }

        #paywallModal.active .paywall-card {
            transform: scale(1) translateY(0);
        }

        /* Luz de fondo Carmesí */
        .paywall-card::before {
            content: ''; position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
            width: 200px; height: 100px; background: rgba(225, 29, 72, 0.4);
            filter: blur(50px); pointer-events: none;
        }

        .paywall-icon {
            width: 64px; height: 64px; background: rgba(220, 38, 38, 0.1); color: #EF4444;
            border-radius: 16px; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px; border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .paywall-title {
            font-size: 24px; font-weight: 900; color: white; margin: 0 0 10px; letter-spacing: -0.5px;
        }

        .paywall-desc {
            font-size: 15px; color: #A1A1AA; line-height: 1.6; margin: 0 0 30px;
        }

        /* BOTÓN CARMESÍ CON LATENCIA PROFUNDA */
        .btn-paywall-pro {
            background: #E11D48;
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px 30px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 1px solid #FDA4AF;
            cursor: pointer;
            width: 100%;
            animation: pulseCarmesí 2s infinite;
            transition: 0.3s;
        }

        .btn-paywall-pro:hover {
            background: #BE123C;
            transform: translateY(-2px);
            animation: none; /* Se pausa al poner el mouse para dar control */
            box-shadow: 0 10px 30px rgba(225, 29, 72, 0.5);
        }

        @keyframes pulseCarmesí { 
            0% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.6); } 
            70% { box-shadow: 0 0 0 15px rgba(225, 29, 72, 0); } 
            100% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); } 
        }

        .btn-paywall-close {
            background: transparent; border: none; color: #6B7280; font-size: 13px; font-weight: 600;
            margin-top: 20px; cursor: pointer; transition: 0.2s; text-decoration: underline;
        }
        .btn-paywall-close:hover { color: white; }

        .paywall-features {
            display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; text-align: left;
            background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid #27272A;
        }
        .paywall-feature-item {
            display: flex; align-items: center; gap: 10px; color: #E2E8F0; font-size: 13px; font-weight: 600;
        }
    </style>

    <div id="paywallModal">
        <div class="paywall-card">
            <div class="paywall-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 class="paywall-title">Límite Gratuito Alcanzado</h2>
            <p class="paywall-desc">Has consumido todas tus operaciones de prueba. Para seguir utilizando la infraestructura forense, necesitas una licencia corporativa.</p>
            
            <div class="paywall-features">
                <div class="paywall-feature-item">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    Procesamiento de Archivos Ilimitado
                </div>
                <div class="paywall-feature-item">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    Acceso Total a Ecosistema PDF
                </div>
                <div class="paywall-feature-item">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    Prioridad de Hardware (Zero-Latency)
                </div>
            </div>

            <a href="planes.html" class="btn-paywall-pro">
                OBTENER LICENCIA PRO 
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </a>
            
            <button class="btn-paywall-close" onclick="cerrarPaywall()">Quizá más tarde</button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', paywallHTML);
}

// ==========================================
// 3. FUNCIONES GLOBALES PARA CONTROLARLO
// ==========================================

window.mostrarPaywall = function() {
    const modal = document.getElementById('paywallModal');
    if(modal) modal.classList.add('active');
}

window.cerrarPaywall = function() {
    const modal = document.getElementById('paywallModal');
    if(modal) modal.classList.remove('active');
}

// FUNCIÓN INTELIGENTE: Gestor de Créditos Locales y Estatus PRO
window.consumirCredito = function(callbackFunction) {
    // 1. Verificación de Llave Maestra (Estatus PRO)
    const isPro = localStorage.getItem('auditoria_pro') === 'true';
    
    if (isPro) {
        // Usuario de pago: Pase libre absoluto.
        if (typeof callbackFunction === 'function') {
            callbackFunction();
        }
        return; 
    }

    // 2. Control de Usuarios Gratuitos
    let creditos = parseInt(localStorage.getItem('auditoria_creditos')) || 0;

    if (creditos > 0) {
        // Aún tiene crédito: Restamos uno y ejecutamos
        creditos--;
        localStorage.setItem('auditoria_creditos', creditos.toString());
        
        if(typeof window.showToast === 'function') {
            window.showToast(`Modo Prueba: Te quedan ${creditos} análisis gratuitos.`, 'info');
        }
        
        if (typeof callbackFunction === 'function') {
            callbackFunction();
        }
    } else {
        // Sin créditos: Bloqueo y Paywall Carmesí
        window.mostrarPaywall();
    }
}
