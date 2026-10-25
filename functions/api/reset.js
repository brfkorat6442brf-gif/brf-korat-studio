/**
 * BRF KORAT STUDIO - Cloudflare Pages Function (`/api/reset`)
 * Resets KV Database to default sample schedule (Protected by Admin PIN)
 */

const KV_KEY = "studio_master_data_v1";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Pin",
    "Content-Type": "application/json; charset=utf-8"
};

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const providedPin = request.headers.get("X-Admin-Pin") || "";
        let expectedPin = env.ADMIN_PIN || "1234";

        if (env.BRF_STUDIO_KV) {
            const existing = await env.BRF_STUDIO_KV.get(KV_KEY, { type: "json" });
            if (existing && existing.adminPin) {
                expectedPin = String(existing.adminPin);
            }
        }

        if (providedPin !== String(expectedPin)) {
            return new Response(
                JSON.stringify({ status: "error", message: "รหัสผ่านผู้ดูแลระบบ (Admin PIN) ไม่ถูกต้อง" }),
                { status: 401, headers: CORS_HEADERS }
            );
        }

        if (env.BRF_STUDIO_KV) {
            await env.BRF_STUDIO_KV.delete(KV_KEY);
        }

        return new Response(JSON.stringify({ status: "ok" }), {
            status: 200,
            headers: CORS_HEADERS
        });
    } catch (err) {
        return new Response(JSON.stringify({ status: "error", message: err.message }), {
            status: 400,
            headers: CORS_HEADERS
        });
    }
}
