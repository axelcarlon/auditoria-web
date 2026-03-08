import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Inicializamos Stripe y Supabase usando Variables de Entorno de Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
    process.env.VITE_SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY // Clave maestra para saltarse reglas de seguridad
);

// Vercel: Desactivar body parser por defecto para poder leer la firma de Stripe
export const config = {
    api: { bodyParser: false },
};

// Función para leer el body crudo (necesario para Stripe)
async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Si el pago fue exitoso
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details.email;

        if (customerEmail) {
            // Actualizamos al usuario en tu tabla de Supabase (asumiendo que tu tabla se llama 'usuarios' o 'profiles')
            const { error } = await supabase
                .from('usuarios') // <-- Cambia esto por el nombre real de tu tabla
                .update({ plan: 'PRO', creditos: 9999 }) // <-- Cambia los campos que uses
                .eq('email', customerEmail);

            if (error) {
                console.error("Error al actualizar Supabase:", error);
                return res.status(500).json({ error: 'Fallo al actualizar BD' });
            }
        }
    }

    res.json({ received: true });
}
