/**
 * BRF KORAT STUDIO - Shared Data, Cloudflare KV Sync, Audio Chime & Export/Import Layer
 * Supports Cloudflare Pages Functions (/api/data, /api/auth, /api/reset) + Local Fallback
 */

const STORAGE_KEY = 'brf_korat_studio_data_v1';
const PIN_SESSION_KEY = 'brf_korat_admin_pin';
const CHANNEL_NAME = 'brf_korat_studio_sync';

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

const THAI_DAYS = [
    { index: 0, name: "วันอาทิตย์", short: "อา.", en: "Sunday", color: "#ef4444" },
    { index: 1, name: "วันจันทร์", short: "จ.", en: "Monday", color: "#eab308" },
    { index: 2, name: "วันอังคาร", short: "อ.", en: "Tuesday", color: "#ec4899" },
    { index: 3, name: "วันพุธ", short: "พ.", en: "Wednesday", color: "#10b981" },
    { index: 4, name: "วันพฤหัสบดี", short: "พฤ.", en: "Thursday", color: "#f97316" },
    { index: 5, name: "วันศุกร์", short: "ศ.", en: "Friday", color: "#3b82f6" },
    { index: 6, name: "วันเสาร์", short: "ส.", en: "Saturday", color: "#8b5cf6" }
];

const CATEGORY_META = {
    vocal: { label: "Vocal / ขับร้อง", icon: "🎤", color: "#f43f5e", bg: "rgba(244, 63, 94, 0.16)" },
    piano: { label: "Piano / เปียโน", icon: "🎹", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.16)" },
    guitar: { label: "Guitar / กีตาร์", icon: "🎸", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.16)" },
    drums: { label: "Drums / กลองชุด", icon: "🥁", color: "#10b981", bg: "rgba(16, 185, 129, 0.16)" },
    strings: { label: "Strings / เครื่องสาย", icon: "🎻", color: "#06b6d4", bg: "rgba(6, 182, 212, 0.16)" },
    dance: { label: "Dance / เต้น", icon: "💃", color: "#ec4899", bg: "rgba(236, 72, 153, 0.16)" },
    acting: { label: "Acting / การแสดง", icon: "🎭", color: "#eab308", bg: "rgba(234, 179, 8, 0.16)" },
    band: { label: "Band / รวมวง", icon: "🎺", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.16)" }
};

class StudioDataStore {
    constructor() {
        this.data = this.loadLocal();
        this.listeners = [];
        this.channel = null;
        if ('BroadcastChannel' in window) {
            this.channel = new BroadcastChannel(CHANNEL_NAME);
            this.channel.onmessage = (event) => {
                if (event.data && event.data.type === 'DATA_UPDATED') {
                    this.data = event.data.payload;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
                    this.notify();
                }
            };
        }
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    this.data = JSON.parse(e.newValue);
                    this.notify();
                } catch (err) {}
            }
        });
    }

    getAdminPin() {
        return sessionStorage.getItem(PIN_SESSION_KEY) || '';
    }

    setAdminPin(pin) {
        sessionStorage.setItem(PIN_SESSION_KEY, String(pin || '').trim());
    }

    clearAdminPin() {
        sessionStorage.removeItem(PIN_SESSION_KEY);
    }

    async verifyPin(pin) {
        const cleanPin = String(pin || '').trim();
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: cleanPin })
            });
            if (res.ok) {
                this.setAdminPin(cleanPin);
                return { ok: true };
            }
            const err = await res.json().catch(() => ({}));
            return { ok: false, message: err.message || 'รหัส PIN ไม่ถูกต้อง' };
        } catch (e) {
            // Offline fallback check
            const localPin = localStorage.getItem('brf_local_admin_pin') || '1234';
            if (cleanPin === localPin) {
                this.setAdminPin(cleanPin);
                return { ok: true };
            }
            return { ok: false, message: 'รหัส PIN ไม่ถูกต้อง (ค่าเริ่มต้นคือ 1234)' };
        }
    }

    loadLocal() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (e) {}
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STUDIO_DATA));
        return JSON.parse(JSON.stringify(DEFAULT_STUDIO_DATA));
    }

    async fetchFromServer() {
        try {
            const res = await fetch('/api/data', { cache: 'no-store' });
            if (res.ok) {
                const serverData = await res.json();
                const currentStr = JSON.stringify(this.data);
                const serverStr = JSON.stringify(serverData);
                if (currentStr !== serverStr) {
                    this.data = serverData;
                    localStorage.setItem(STORAGE_KEY, serverStr);
                    this.notify();
                }
                return this.data;
            }
        } catch (e) {
            // Fallback to localStorage if running directly via file://
        }
        return this.data;
    }

    async save(newData, extraPayload = {}) {
        this.data = newData || this.data;
        const payloadObj = { ...this.data, ...extraPayload };
        const serialized = JSON.stringify(payloadObj);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        if (extraPayload.newAdminPin) {
            localStorage.setItem('brf_local_admin_pin', String(extraPayload.newAdminPin).trim());
            this.setAdminPin(String(extraPayload.newAdminPin).trim());
        }

        if (this.channel) {
            this.channel.postMessage({ type: 'DATA_UPDATED', payload: this.data });
        }
        this.notify();

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Pin': this.getAdminPin()
                },
                body: serialized
            });
            if (res.status === 401) {
                return { ok: false, unauthorized: true };
            }
            return { ok: res.ok };
        } catch (e) {
            return { ok: true, offline: true };
        }
    }

    async resetToDefault() {
        const fresh = JSON.parse(JSON.stringify(DEFAULT_STUDIO_DATA));
        await this.save(fresh);
        try {
            await fetch('/api/reset', {
                method: 'POST',
                headers: { 'X-Admin-Pin': this.getAdminPin() }
            });
        } catch (e) {}
        return fresh;
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(cb => cb(this.data));
    }
}

// Web Audio Synthesizer for Studio Class Chime (No external MP3 required)
function playStudioChime() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Warm 3-note arpeggio chime (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.14);

            gain.gain.setValueAtTime(0.0001, now + i * 0.14);
            gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.14 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.14 + 0.85);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + i * 0.14);
            osc.stop(now + i * 0.14 + 0.9);
        });
    } catch (e) {}
}

// Time & Date Helpers
function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
}

function getTodayISO(dateObj) {
    const d = dateObj || new Date();
    return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
}

function formatThaiShortDate(isoDateStr) {
    if (!isoDateStr) return '';
    const parts = isoDateStr.split('-');
    if (parts.length !== 3) return isoDateStr;
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const y = Number(parts[0]) + 543;
    const m = months[Number(parts[1]) - 1] || '';
    const d = Number(parts[2]);
    return `${d} ${m} ${y}`;
}

function isScheduleMatchingDay(schedule, targetDayOrAuto, nowDate) {
    const todayISO = getTodayISO(nowDate);
    const currentDayIndex = nowDate.getDay();

    if (targetDayOrAuto === 'ALL') return true;

    const targetDayIndex = targetDayOrAuto === 'AUTO' ? currentDayIndex : Number(targetDayOrAuto);

    // If schedule has a specificDate
    if (schedule.specificDate && schedule.specificDate.trim() !== '') {
        if (targetDayOrAuto === 'AUTO') {
            return schedule.specificDate === todayISO;
        }
        // If user clicked a specific day of week tab, match if specificDate falls on that day of week
        const specDay = new Date(schedule.specificDate + 'T00:00:00').getDay();
        return specDay === targetDayIndex;
    }

    return Number(schedule.day) === targetDayIndex;
}

function getScheduleStatus(schedule, nowDate) {
    const currentDay = nowDate.getDay();
    const todayISO = getTodayISO(nowDate);

    const isToday = (schedule.specificDate && schedule.specificDate.trim() !== '')
        ? schedule.specificDate === todayISO
        : Number(schedule.day) === currentDay;

    const nowMinutes = nowDate.getHours() * 60 + nowDate.getMinutes() + (nowDate.getSeconds() / 60);
    const startMin = timeToMinutes(schedule.startTime);
    const endMin = timeToMinutes(schedule.endTime);

    if (!isToday) {
        return {
            status: 'OTHER_DAY',
            label: schedule.specificDate ? `วันที่ ${formatThaiShortDate(schedule.specificDate)}` : 'วันอื่น',
            progress: 0,
            minutesLeft: 0,
            minutesUntil: 0
        };
    }

    if (nowMinutes >= startMin && nowMinutes < endMin) {
        const total = Math.max(1, endMin - startMin);
        const elapsed = nowMinutes - startMin;
        const progress = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
        const minutesLeft = Math.ceil(endMin - nowMinutes);
        return {
            status: 'LIVE',
            label: 'กำลังเรียน (ON AIR)',
            progress,
            minutesLeft,
            minutesUntil: 0
        };
    } else if (nowMinutes < startMin) {
        const minutesUntil = Math.ceil(startMin - nowMinutes);
        const isSoon = minutesUntil <= 60;
        return {
            status: isSoon ? 'UPCOMING_SOON' : 'UPCOMING',
            label: isSoon ? `เริ่มในอีก ${minutesUntil} นาที` : 'รอดำเนินการ',
            progress: 0,
            minutesLeft: 0,
            minutesUntil
        };
    } else {
        return {
            status: 'FINISHED',
            label: 'เสร็จสิ้นแล้ว',
            progress: 100,
            minutesLeft: 0,
            minutesUntil: 0
        };
    }
}

function detectCategory(subjectName, explicitCategory) {
    if (explicitCategory && CATEGORY_META[explicitCategory]) return explicitCategory;
    const s = (subjectName || '').toLowerCase();
    if (s.includes('ร้อง') || s.includes('vocal') || s.includes('sing')) return 'vocal';
    if (s.includes('เปียโน') || s.includes('piano') || s.includes('คีย์บอร์ด')) return 'piano';
    if (s.includes('กีตาร์') || s.includes('guitar') || s.includes('เบส') || s.includes('อูคูเลเล่')) return 'guitar';
    if (s.includes('กลอง') || s.includes('drum')) return 'drums';
    if (s.includes('ไวโอลิน') || s.includes('violin') || s.includes('cello')) return 'strings';
    if (s.includes('เต้น') || s.includes('dance') || s.includes('k-pop') || s.includes('ballet')) return 'dance';
    if (s.includes('การแสดง') || s.includes('acting') || s.includes('drama') || s.includes('ละคร')) return 'acting';
    if (s.includes('รวมวง') || s.includes('band')) return 'band';
    return 'vocal';
}

window.StudioStore = new StudioDataStore();
window.THAI_DAYS = THAI_DAYS;
window.CATEGORY_META = CATEGORY_META;
window.timeToMinutes = timeToMinutes;
window.getTodayISO = getTodayISO;
window.formatThaiShortDate = formatThaiShortDate;
window.isScheduleMatchingDay = isScheduleMatchingDay;
window.getScheduleStatus = getScheduleStatus;
window.detectCategory = detectCategory;
window.playStudioChime = playStudioChime;
