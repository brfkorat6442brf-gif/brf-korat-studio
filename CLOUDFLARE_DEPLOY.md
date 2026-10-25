# คู่มือการนำ BRF KORAT STUDIO ขึ้นใช้งานจริงบน Cloudflare Pages + Cloudflare KV Database

โปรเจกต์นี้ถูกตั้งค่าโครงสร้างสำหรับ **Cloudflare Pages Functions** และ **Cloudflare KV (Key-Value Database)** ไว้ครบถ้วนแล้ว สามารถนำไปเชื่อมต่อผ่าน GitHub หรืออัปโหลดผ่านหน้าเว็บ Cloudflare Dashboard ได้ทันที (ใช้งานฟรี 100%)

---

## 📁 โครงสร้างไฟล์ของโปรเจกต์สำหรับ Cloudflare

```text
BRF Office/
├── index.html               # หน้าจอแสดงผลหลัก (TV Live Display)
├── admin.html               # หน้าจัดการข้อมูล (Admin Panel พร้อมระบบล็อกอิน PIN)
├── styles.css               # ไฟล์ตกแต่งหน้าจอ (Luxury Dark Stage Theme)
├── shared.js                # ระบบซิงค์ฐานข้อมูล, คำนวณเวลาจริง และเสียงเตือนเริ่มคลาส
├── wrangler.toml            # ไฟล์ตั้งค่าการผูกฐานข้อมูล Cloudflare KV
├── package.json             # คำสั่งสำหรับรันและ Deploy ด้วย Wrangler CLI
└── functions/               # ⚡ Cloudflare Pages Functions (Backend API)
    └── api/
        ├── data.js          # GET / POST ข้อมูลตารางสอนลง Cloudflare KV
        ├── auth.js          # POST ตรวจสอบรหัสผ่านเข้าหน้า Admin (PIN)
        └── reset.js         # POST รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น
```

---

## 🚀 ขั้นตอนการ Deploy ขึ้น Cloudflare Dashboard (แบบจับมือทำ)

### ขั้นตอนที่ 1: สร้างฐานข้อมูล Cloudflare KV (ใช้เวลา 1 นาที)
1. เข้าสู่ระบบที่ [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. ที่แถบเมนูด้านซ้าย ไปที่ **Storage & Databases** → เลือก **KV**
3. กดปุ่ม **Create a namespace**
4. ตั้งชื่อ Namespace ว่า `BRF_STUDIO_KV` แล้วกด **Add**

---

### ขั้นตอนที่ 2: สร้างโปรเจกต์ Cloudflare Pages
คุณสามารถเลือกได้ 2 วิธีตามความสะดวก:

#### วิธีที่ A: เชื่อมต่อผ่าน GitHub (แนะนำ — อัปเดตโค้ดง่ายที่สุด)
1. นำไฟล์ทั้งหมดในโฟลเดอร์ `BRF Office` นี้ขึ้นไปไว้บน GitHub Repository ของคุณ
2. ในหน้า Cloudflare Dashboard ไปที่เมนู **Compute (Workers & Pages)** → กด **Create**
3. เลือกแท็บ **Pages** → กด **Connect to Git** แล้วเลือก Repository ของคุณ
4. ในหน้าตั้งค่า Build:
   * **Project name:** `brf-korat-studio` (จะได้ลิงก์ `https://brf-korat-studio.pages.dev`)
   * **Build command:** *(เว้นว่างไว้)*
   * **Build output directory:** `/` หรือ `.`
5. กด **Save and Deploy**

#### วิธีที่ B: อัปโหลดผ่าน Wrangler CLI (หากใช้คำสั่งในเครื่อง)
1. คัดลอก **Namespace ID** จากขั้นตอนที่ 1 มาใส่ในไฟล์ `wrangler.toml` ตรงช่อง `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`
2. รันคำสั่ง:
   ```bash
   npx wrangler pages deploy . --project-name brf-korat-studio
   ```

---

### ขั้นตอนที่ 3: ผูกฐานข้อมูล KV เข้ากับเว็บ (สำคัญมาก!)
หลังจากสร้างโปรเจกต์ Pages เสร็จแล้ว ให้เชื่อมต่อฐานข้อมูลดังนี้:
1. เข้าไปที่โปรเจกต์ **brf-korat-studio** ในหน้า Cloudflare Pages
2. ไปที่แท็บ **Settings** → เลือกเมนู **Bindings** (หรือ **Functions** → **KV namespace bindings**)
3. กดปุ่ม **Add** → เลือก **KV namespace**
4. กรอกข้อมูลดังนี้:
   * **Variable name:** `BRF_STUDIO_KV` *(ต้องสะกดตรงตามนี้ทุกตัวอักษร)*
   * **KV namespace:** เลือก `BRF_STUDIO_KV` ที่สร้างไว้ในขั้นตอนที่ 1
5. กด **Save**
6. *(ตัวเลือกเสริม)* หากต้องการกำหนดรหัสผ่าน Admin PIN เริ่มต้นผ่าน Environment Variable สามารถกด **Add** → **Plaintext** ตั้งชื่อว่า `ADMIN_PIN` และใส่รหัสที่ต้องการได้ (หากไม่ตั้งค่า รหัสเริ่มต้นคือ `1234` และสามารถเปลี่ยนในหน้าเว็บ Admin ได้โดยตรง)
7. ไปที่แท็บ **Deployments** แล้วกด **Retry deployment** (หรืออัปโหลดใหม่ 1 ครั้ง) เพื่อให้การผูกฐานข้อมูล KV มีผลทันที

---

## 🔐 การใช้งานระบบหลังบ้าน (Admin Panel) และฟีเจอร์ใหม่
* **รหัสผ่านเริ่มต้นเข้าหน้า Admin (`/admin.html`):** `1234` (สามารถเปลี่ยนรหัส PIN ใหม่ได้ที่เมนู *"📢 ตั้งค่าสถาบัน & รหัสผ่าน PIN"*)
* **การระบุวันที่เฉพาะเจาะจง (คลาสพิเศษ/ชดเชย):** ในฟอร์มเพิ่มตารางสอนจะมีช่อง *"วันที่เฉพาะเจาะจง"* หากเลือกวันที่ ระบบจะแสดงคลาสนั้นเฉพาะในวันที่ระบุ พร้อมป้ายกำกับสีชมพูบนหน้าจอหลัก
* **สำรองข้อมูล Excel CSV / JSON:** ที่เมนู *"📥 สำรองข้อมูล Excel CSV / JSON"* สามารถกดดาวน์โหลดตารางสอนเป็นไฟล์ `.csv` เปิดใน Excel ได้ทันที หรือนำเข้าไฟล์กลับขึ้นฐานข้อมูล Cloudflare KV ได้ตลอดเวลา
* **เสียงระฆังแจ้งเตือนเริ่มคลาส (Chime Sound):** บนมุมขวาบนของหน้าจอแสดงผลหลัก (`index.html`) มีปุ่ม **"🔔 เสียงเตือนเริ่มคลาส"** เมื่อเปิดไว้ ระบบจะส่งเสียงแจ้งเตือนนุ่มนวลอัตโนมัติทันทีที่มีคลาสเรียนเปลี่ยนสถานะเข้าสู่ช่วงเวลา `ON AIR`
