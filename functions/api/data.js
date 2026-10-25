/**
 * BRF KORAT STUDIO - Cloudflare Pages Function (`/api/data`)
 * Database: Cloudflare KV Binding named `BRF_STUDIO_KV`
 * Optional Environment Variable: `ADMIN_PIN` (default: "1234")
 */

const KV_KEY = "studio_master_data_v1";

const DEFAULT_STUDIO_DATA = {
    settings: {
        studioName: "BRF KORAT STUDIO",
        subtitle: "สถาบันสอนดนตรีและการแสดง (Music & Performing Arts Academy)",
        announcement: "ยินดีต้อนรับสู่ BRF KORAT STUDIO สถาบันสอนดนตรีและการแสดง | กรุณาเช็คชื่อที่เคาน์เตอร์ก่อนเข้าห้องเรียนทุกครั้ง | สอบถามคอร์สเรียนเปียโน ร้องเพลง กีตาร์ กลอง เต้น และการแสดง ได้ที่ฝ่ายประชาสัมพันธ์ 🎵✨",
        autoFilterDay: true
    },
    rooms: [
        "Studio 1 (Piano & Vocal)",
        "Studio 2 (Guitar & Bass)",
        "Studio 3 (Drums & Percussion)",
        "Studio 4 (Violin & Strings)",
        "Dance & Acting Hall A",
        "Band Room (Grand Stage)"
    ],
    subjects: [
        { name: "ขับร้องสากล (Pop Vocal)", category: "vocal", color: "#f43f5e" },
        { name: "เปียโนคลาสสิก & ป๊อป (Piano)", category: "piano", color: "#8b5cf6" },
        { name: "กีตาร์โปร่ง & ไฟฟ้า (Guitar)", category: "guitar", color: "#f59e0b" },
        { name: "กลองชุด (Drums)", category: "drums", color: "#10b981" },
        { name: "ไวโอลิน (Violin)", category: "strings", color: "#06b6d4" },
        { name: "เต้น K-Pop & Street Dance", category: "dance", color: "#ec4899" },
        { name: "การแสดง (Acting & Drama)", category: "acting", color: "#eab308" },
        { name: "รวมวงดนตรี (Band Ensemble)", category: "band", color: "#3b82f6" }
    ],
    teachers: [
        "ครูแพทตี้ (Kru Patty)",
        "ครูเจมส์ (Kru James)",
        "ครูมาร์ค (Kru Mark)",
        "ครูเบลล์ (Kru Bell)",
        "ครูต้น (Kru Ton)",
        "ครูแพรว (Kru Praew)"
    ],
    schedules: [
        {
            id: "sch-101",
            day: 0,
            specificDate: "",
            startTime: "09:00",
            endTime: "10:00",
            subject: "เปียโนคลาสสิก & ป๊อป (Piano)",
            category: "piano",
            teacher: "ครูเบลล์ (Kru Bell)",
            student: "น้องอันดา (Anda)",
            room: "Studio 1 (Piano & Vocal)",
            level: "Grade 2",
            note: "Private 1-on-1"
        },
        {
            id: "sch-102",
            day: 0,
            specificDate: "",
            startTime: "10:00",
            endTime: "11:30",
            subject: "ขับร้องสากล (Pop Vocal)",
            category: "vocal",
            teacher: "ครูแพทตี้ (Kru Patty)",
            student: "น้องมิลิน, น้องพราว",
            room: "Studio 1 (Piano & Vocal)",
            level: "Intermediate",
            note: "Duo Vocal Class"
        },
        {
            id: "sch-103",
            day: 0,
            specificDate: "",
            startTime: "11:00",
            endTime: "12:00",
            subject: "กลองชุด (Drums)",
            category: "drums",
            teacher: "ครูมาร์ค (Kru Mark)",
            student: "น้องภูผา (Phupha)",
            room: "Studio 3 (Drums & Percussion)",
            step: "",
            level: "Beginner",
            note: "พื้นฐานจังหวะ Rock"
        },
        {
            id: "sch-104",
            day: 0,
            specificDate: "",
            startTime: "13:00",
            endTime: "14:30",
            subject: "เต้น K-Pop & Street Dance",
            category: "dance",
            teacher: "ครูแพรว (Kru Praew)",
            student: "คลาส K-Pop Junior (6 คน)",
            room: "Dance & Acting Hall A",
            level: "Group Class",
            note: "ซ้อมเพลงโชว์งานประจำปี"
        },
        {
            id: "sch-105",
            day: 0,
            specificDate: "",
            startTime: "14:00",
            endTime: "15:30",
            subject: "กีตาร์โปร่ง & ไฟฟ้า (Guitar)",
            category: "guitar",
            teacher: "ครูเจมส์ (Kru James)",
            student: "น้องภีม (Peem)",
            room: "Studio 2 (Guitar & Bass)",
            level: "Intermediate",
            note: "Solo & Improvisation"
        },
        {
            id: "sch-106",
            day: 0,
            specificDate: "",
            startTime: "15:00",
            endTime: "16:30",
            subject: "ขับร้องสากล (Pop Vocal)",
            category: "vocal",
            teacher: "ครูแพทตี้ (Kru Patty)",
            student: "น้องเกรซ (Grace)",
            room: "Studio 1 (Piano & Vocal)",
            level: "Audition Prep",
            note: "ติวเข้มเตรียมออดิชั่น"
        },
        {
            id: "sch-107",
            day: 0,
            specificDate: "",
            startTime: "15:00",
            endTime: "16:00",
            subject: "การแสดง (Acting & Drama)",
            category: "acting",
            teacher: "ครูแพรว (Kru Praew)",
            student: "น้องทอฝัน, น้องแทนคุณ, น้องวิน",
            room: "Dance & Acting Hall A",
            level: "Youth Acting",
            note: "Character & Storytelling"
        },
        {
            id: "sch-108",
            day: 0,
            specificDate: "",
            startTime: "16:00",
            endTime: "17:00",
            subject: "ไวโอลิน (Violin)",
            category: "strings",
            teacher: "ครูเบลล์ (Kru Bell)",
            student: "น้องซีน่อน (Xenon)",
            room: "Studio 4 (Violin & Strings)",
            level: "Grade 3",
            note: "Classical Piece"
        },
        {
            id: "sch-109",
            day: 0,
            specificDate: "",
            startTime: "16:30",
            endTime: "18:00",
            subject: "รวมวงดนตรี (Band Ensemble)",
            category: "band",
            teacher: "ครูต้น (Kru Ton)",
            student: "วง BRF Rookie Band (5 คน)",
            room: "Band Room (Grand Stage)",
            level: "Band",
            note: "ซ้อมใหญ่ Concert Stage"
        },
        {
            id: "sch-110",
            day: 0,
            specificDate: "",
            startTime: "17:30",
            endTime: "18:30",
            subject: "กลองชุด (Drums)",
            category: "drums",
            teacher: "ครูมาร์ค (Kru Mark)",
            student: "น้องอชิ (Achi)",
            room: "Studio 3 (Drums & Percussion)",
            level: "Advanced",
            note: "Double Pedal Technique"
        },
        {
            id: "sch-111",
            day: 0,
            specificDate: "",
            startTime: "18:30",
            endTime: "19:30",
            subject: "เปียโนคลาสสิก & ป๊อป (Piano)",
            category: "piano",
            teacher: "ครูเบลล์ (Kru Bell)",
            student: "คุณพลอย (K. Ploy)",
            room: "Studio 1 (Piano & Vocal)",
            level: "Adult Pop Piano",
            note: "คอร์สผู้ใหญ่"
        }
    ]
};

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Pin",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Type": "application/json; charset=utf-8"
};

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
    const { env } = context;
    try {
        if (env.BRF_STUDIO_KV) {
            const stored = await env.BRF_STUDIO_KV.get(KV_KEY, { type: "json" });
            if (stored) {
                // Never expose custom Admin PIN in public GET
                const safeCopy = { ...stored };
                delete safeCopy.adminPin;
                return new Response(JSON.stringify(safeCopy), { status: 200, headers: CORS_HEADERS });
            }
            // Seed initial data into KV on first access
            await env.BRF_STUDIO_KV.put(KV_KEY, JSON.stringify(DEFAULT_STUDIO_DATA));
        }
        return new Response(JSON.stringify(DEFAULT_STUDIO_DATA), { status: 200, headers: CORS_HEADERS });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const providedPin = request.headers.get("X-Admin-Pin") || "";
        let currentData = DEFAULT_STUDIO_DATA;

        if (env.BRF_STUDIO_KV) {
            const existing = await env.BRF_STUDIO_KV.get(KV_KEY, { type: "json" });
            if (existing) currentData = existing;
        }

        const expectedPin = currentData.adminPin || env.ADMIN_PIN || "1234";
        if (providedPin !== String(expectedPin)) {
            return new Response(
                JSON.stringify({ status: "error", message: "รหัสผ่านผู้ดูแลระบบ (Admin PIN) ไม่ถูกต้อง" }),
                { status: 401, headers: CORS_HEADERS }
            );
        }

        const incoming = await request.json();

        // Allow updating adminPin if newAdminPin is explicitly passed
        const nextPin = incoming.newAdminPin ? String(incoming.newAdminPin).trim() : expectedPin;
        const dataToSave = {
            settings: incoming.settings || currentData.settings,
            rooms: Array.isArray(incoming.rooms) ? incoming.rooms : currentData.rooms,
            subjects: Array.isArray(incoming.subjects) ? incoming.subjects : currentData.subjects,
            teachers: Array.isArray(incoming.teachers) ? incoming.teachers : currentData.teachers,
            schedules: Array.isArray(incoming.schedules) ? incoming.schedules : currentData.schedules,
            adminPin: nextPin,
            updatedAt: new Date().toISOString()
        };

        if (env.BRF_STUDIO_KV) {
            await env.BRF_STUDIO_KV.put(KV_KEY, JSON.stringify(dataToSave));
        }

        return new Response(
            JSON.stringify({ status: "ok", updatedAt: dataToSave.updatedAt }),
            { status: 200, headers: CORS_HEADERS }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ status: "error", message: err.message }),
            { status: 400, headers: CORS_HEADERS }
        );
    }
}
