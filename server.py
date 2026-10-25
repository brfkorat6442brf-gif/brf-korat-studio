import http.server
import socketserver
import json
import os
from urllib.parse import urlparse

PORT = 8080
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')

DEFAULT_DATA = {
    "settings": {
        "studioName": "BRF KORAT STUDIO",
        "subtitle": "สถาบันสอนดนตรีและการแสดง (Music & Performing Arts Academy)",
        "announcement": "ยินดีต้อนรับสู่ BRF KORAT STUDIO สถาบันสอนดนตรีและการแสดง | กรุณาเช็คชื่อก่อนเข้าห้องเรียนทุกครั้ง | ติดต่อสอบถามข้อมูลเพิ่มเติมได้ที่เคาน์เตอร์ประชาสัมพันธ์ 🎵✨",
        "autoFilterDay": True,
        "rotateRoomsSeconds": 0
    },
    "adminPin": "1234",
    "rooms": [
        "Studio 1 (Piano & Vocal)",
        "Studio 2 (Guitar & Bass)",
        "Studio 3 (Drums & Percussion)",
        "Studio 4 (Violin & Strings)",
        "Dance & Acting Hall A",
        "Band Room (Grand Stage)"
    ],
    "subjects": [
        {"name": "ขับร้องสากล (Pop Vocal)", "category": "vocal", "color": "#f43f5e"},
        {"name": "เปียโนคลาสสิก & ป๊อป (Piano)", "category": "piano", "color": "#8b5cf6"},
        {"name": "กีตาร์โปร่ง & ไฟฟ้า (Guitar)", "category": "guitar", "color": "#f59e0b"},
        {"name": "กลองชุด (Drums)", "category": "drums", "color": "#10b981"},
        {"name": "ไวโอลิน (Violin)", "category": "strings", "color": "#06b6d4"},
        {"name": "เต้น K-Pop & Street Dance", "category": "dance", "color": "#ec4899"},
        {"name": "การแสดง (Acting & Drama)", "category": "acting", "color": "#eab308"},
        {"name": "รวมวงดนตรี (Band Ensemble)", "category": "band", "color": "#3b82f6"}
    ],
    "teachers": [
        "ครูแพทตี้ (Kru Patty)",
        "ครูเจมส์ (Kru James)",
        "ครูมาร์ค (Kru Mark)",
        "ครูเบลล์ (Kru Bell)",
        "ครูต้น (Kru Ton)",
        "ครูแพรว (Kru Praew)"
    ],
    "schedules": [
        {
            "id": "sch-101",
            "day": 0,
            "specificDate": "",
            "startTime": "09:00",
            "endTime": "10:00",
            "subject": "เปียโนคลาสสิก & ป๊อป (Piano)",
            "category": "piano",
            "teacher": "ครูเบลล์ (Kru Bell)",
            "student": "น้องอันดา (Anda)",
            "room": "Studio 1 (Piano & Vocal)",
            "level": "Grade 2",
            "note": "Private 1-on-1"
        },
        {
            "id": "sch-102",
            "day": 0,
            "specificDate": "",
            "startTime": "10:00",
            "endTime": "11:30",
            "subject": "ขับร้องสากล (Pop Vocal)",
            "category": "vocal",
            "teacher": "ครูแพทตี้ (Kru Patty)",
            "student": "น้องมิลิน, น้องพราว",
            "room": "Studio 1 (Piano & Vocal)",
            "level": "Intermediate",
            "note": "Duo Vocal Class"
        },
        {
            "id": "sch-103",
            "day": 0,
            "specificDate": "",
            "startTime": "11:00",
            "endTime": "12:00",
            "subject": "กลองชุด (Drums)",
            "category": "drums",
            "teacher": "ครูมาร์ค (Kru Mark)",
            "student": "น้องภูผา (Phupha)",
            "room": "Studio 3 (Drums & Percussion)",
            "level": "Beginner",
            "note": "พื้นฐานจังหวะ Rock"
        },
        {
            "id": "sch-104",
            "day": 0,
            "specificDate": "",
            "startTime": "13:00",
            "endTime": "14:30",
            "subject": "เต้น K-Pop & Street Dance",
            "category": "dance",
            "teacher": "ครูแพรว (Kru Praew)",
            "student": "คลาส K-Pop Junior (6 คน)",
            "room": "Dance & Acting Hall A",
            "level": "Group Class",
            "note": "ซ้อมเพลงโชว์งานประจำปี"
        },
        {
            "id": "sch-105",
            "day": 0,
            "specificDate": "",
            "startTime": "14:00",
            "endTime": "15:30",
            "subject": "กีตาร์โปร่ง & ไฟฟ้า (Guitar)",
            "category": "guitar",
            "teacher": "ครูเจมส์ (Kru James)",
            "student": "น้องภีม (Peem)",
            "room": "Studio 2 (Guitar & Bass)",
            "level": "Intermediate",
            "note": "Solo & Improvisation"
        },
        {
            "id": "sch-106",
            "day": 0,
            "specificDate": "",
            "startTime": "15:00",
            "endTime": "16:30",
            "subject": "ขับร้องสากล (Pop Vocal)",
            "category": "vocal",
            "teacher": "ครูแพทตี้ (Kru Patty)",
            "student": "น้องเกรซ (Grace)",
            "room": "Studio 1 (Piano & Vocal)",
            "level": "Audition Prep",
            "note": "ติวเข้มเตรียมออดิชั่น"
        },
        {
            "id": "sch-107",
            "day": 0,
            "specificDate": "",
            "startTime": "15:00",
            "endTime": "16:00",
            "subject": "การแสดง (Acting & Drama)",
            "category": "acting",
            "teacher": "ครูแพรว (Kru Praew)",
            "student": "น้องทอฝัน, น้องแทนคุณ, น้องวิน",
            "room": "Dance & Acting Hall A",
            "level": "Youth Acting",
            "note": "Character & Storytelling"
        },
        {
            "id": "sch-108",
            "day": 0,
            "specificDate": "",
            "startTime": "16:00",
            "endTime": "17:00",
            "subject": "ไวโอลิน (Violin)",
            "category": "strings",
            "teacher": "ครูเบลล์ (Kru Bell)",
            "student": "น้องซีน่อน (Xenon)",
            "room": "Studio 4 (Violin & Strings)",
            "level": "Grade 3",
            "note": "Classical Piece"
        },
        {
            "id": "sch-109",
            "day": 0,
            "specificDate": "",
            "startTime": "16:30",
            "endTime": "18:00",
            "subject": "รวมวงดนตรี (Band Ensemble)",
            "category": "band",
            "teacher": "ครูต้น (Kru Ton)",
            "student": "วง BRF Rookie Band (5 คน)",
            "room": "Band Room (Grand Stage)",
            "level": "Band",
            "note": "ซ้อมใหญ่ Concert Stage"
        },
        {
            "id": "sch-110",
            "day": 0,
            "specificDate": "",
            "startTime": "17:30",
            "endTime": "18:30",
            "subject": "กลองชุด (Drums)",
            "category": "drums",
            "teacher": "ครูมาร์ค (Kru Mark)",
            "student": "น้องอชิ (Achi)",
            "room": "Studio 3 (Drums & Percussion)",
            "level": "Advanced",
            "note": "Double Pedal Technique"
        },
        {
            "id": "sch-111",
            "day": 0,
            "specificDate": "",
            "startTime": "18:30",
            "endTime": "19:30",
            "subject": "เปียโนคลาสสิก & ป๊อป (Piano)",
            "category": "piano",
            "teacher": "ครูเบลล์ (Kru Bell)",
            "student": "คุณพลอย (K. Ploy)",
            "room": "Studio 1 (Piano & Vocal)",
            "level": "Adult Pop Piano",
            "note": "คอร์สผู้ใหญ่"
        }
    ]
}

def load_data():
    if not os.path.exists(DATA_FILE):
        save_data(DEFAULT_DATA)
        return DEFAULT_DATA
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return DEFAULT_DATA

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

class StudioHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pin')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/data':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            data = dict(load_data())
            data.pop('adminPin', None)
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
            return
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length).decode('utf-8') if length > 0 else '{}'
        current_data = load_data()
        expected_pin = str(current_data.get('adminPin', '1234'))

        if parsed.path == '/api/auth':
            try:
                payload = json.loads(body)
                pin = str(payload.get('pin', '')).strip()
                if pin == expected_pin:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "ok", "authenticated": True}).encode('utf-8'))
                else:
                    self.send_response(401)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "authenticated": False, "message": "รหัส PIN ไม่ถูกต้อง"}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
            return

        provided_pin = self.headers.get('X-Admin-Pin', '')
        if provided_pin and provided_pin != expected_pin:
            self.send_response(401)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "message": "รหัสผ่านผู้ดูแลระบบ (Admin PIN) ไม่ถูกต้อง"}).encode('utf-8'))
            return

        if parsed.path == '/api/data':
            try:
                new_data = json.loads(body)
                if 'newAdminPin' in new_data and str(new_data['newAdminPin']).strip():
                    new_data['adminPin'] = str(new_data['newAdminPin']).strip()
                    new_data.pop('newAdminPin', None)
                else:
                    new_data['adminPin'] = expected_pin
                save_data(new_data)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "ok"}, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return
        elif parsed.path == '/api/reset':
            save_data(DEFAULT_DATA)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(DEFAULT_DATA, ensure_ascii=False).encode('utf-8'))
            return
        self.send_response(404)
        self.end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), StudioHandler) as httpd:
        print(f"BRF KORAT STUDIO Server running at http://localhost:{PORT}")
        httpd.serve_forever()
