# คู่มือการนำ BRF KORAT STUDIO ขึ้นใช้งานจริงบน Cloudflare (อัปเดตตรงตามหน้าเมนูเว็บไซต์ Cloudflare Dashboard ล่าสุด)

คู่มือนี้อ้างอิงชื่อปุ่มและลำดับเมนูจากหน้าเว็บไซต์ **Cloudflare Dashboard (`https://dash.cloudflare.com`)** ทุกตัวอักษร เพื่อให้คุณกดตามได้ทีละขั้นตอนโดยไม่สับสนครับ

---

## 🔹 ขั้นตอนที่ 0: นำไฟล์ในเครื่องขึ้น GitHub ก่อน (เตรียมพร้อมก่อนเข้าเว็บ Cloudflare)

เนื่องจาก Cloudflare Pages จะดึงทั้งหน้าเว็บ (`index.html`, `admin.html`) และระบบฐานข้อมูลหลังบ้าน (`functions/api/...`) จาก GitHub โดยอัตโนมัติ ให้ทำตามนี้ก่อนครับ:

1. เปิดเว็บ **[https://github.com/new](https://github.com/new)** (ล็อกอินบัญชี GitHub ของคุณ)
2. ช่อง **Repository name** พิมพ์ชื่อ: `brf-korat-studio`
3. เลือกเป็น **Private** (หรือ Public ก็ได้)
4. **ไม่ต้องติ๊ก** ช่องใดๆ ด้านล่าง แล้วกดปุ่มสีเขียว **`Create repository`**
5. เปิดโปรแกรม **Terminal** ในเครื่อง Mac ของคุณ แล้วคัดลอกคำสั่งนี้ไปวางเพื่อส่งไฟล์ขึ้น GitHub (เปลี่ยน `YOUR_USERNAME` เป็นชื่อบัญชี GitHub ของคุณ):
   ```bash
   cd "/Users/admin/Downloads/BRF Office"
   git remote add origin https://github.com/YOUR_USERNAME/brf-korat-studio.git
   git push -u origin main
   ```

---

## 🔹 ขั้นตอนที่ 1: สร้างฐานข้อมูล KV บนเว็บ Cloudflare Dashboard

1. เปิดเว็บ **[https://dash.cloudflare.com](https://dash.cloudflare.com)** และล็อกอินเข้าสู่ระบบ
2. ดูที่ **แถบเมนูด้านซ้ายมือ (Left Sidebar)**:
   * คลิกที่หมวด **`Storage & Databases`** (หรือในบางบัญชีจะอยู่ใน **`Workers & Pages`** → **`KV`**)
   * คลิกที่เมนูย่อย **`KV`**
3. ที่มุมขวาบน คลิกปุ่มสีน้ำเงิน **`Create a namespace`** (หรือ **`Create instance`**)
4. ในช่อง **Namespace name** ให้พิมพ์ชื่อว่า:
   ```text
   BRF_STUDIO_KV
   ```
5. คลิกปุ่ม **`Add`** (หรือ **`Create`**)
   *(ตอนนี้คุณจะได้ฐานข้อมูลชื่อ `BRF_STUDIO_KV` ปรากฏอยู่ในตารางแล้ว)*

---

## 🔹 ขั้นตอนที่ 2: สร้างโปรเจกต์ Cloudflare Pages และเชื่อมต่อกับ GitHub

1. ดูที่ **แถบเมนูด้านซ้ายมือ (Left Sidebar)** ของเว็บ Cloudflare:
   * คลิกที่หมวด **`Compute (Workers & Pages)`**
   * คลิกที่เมนูย่อย **`Workers & Pages`** (จะเข้าสู่หน้า Overview)
2. ที่มุมขวาบน คลิกปุ่มสีน้ำเงิน **`Create`** (หรือ **`Create application`**)
3. บนหน้าจอจะเห็นแท็บด้านบน 2 แท็บ คือ `Workers` และ `Pages`:
   * **สำคัญมาก:** ให้คลิกเลือกแท็บ **`Pages`** (อย่าเลือกแท็บ Workers)
4. ในหัวข้อ **Import an existing Git repository** ให้คลิกปุ่ม **`Connect to Git`** (หรือปุ่ม **`Get started`** ข้างข้อความ Import an existing Git repository)
5. หน้าจอจะเข้าสู่ส่วน **Connect GitHub**:
   * คลิกปุ่ม **`Connect GitHub`** แล้วกดยืนยัน (`Authorize Cloudflare` / `Install & Authorize`) เพื่อให้สิทธิ์เข้าถึงโปรเจกต์ของคุณ
   * ในรายการ **Select a repository** ให้คลิกเลือก **`brf-korat-studio`**
   * คลิกปุ่มสีน้ำเงิน **`Begin setup`** ที่มุมขวาล่าง
6. หน้าจอจะเข้าสู่ส่วน **Set up builds and deployments** ให้ตั้งค่าแต่ละช่องตามนี้ทุกประการ:
   * **Project name:** `brf-korat-studio` *(จะได้ลิงก์เว็บเป็น `https://brf-korat-studio.pages.dev`)*
   * **Production branch:** `main`
   * **Framework preset:** เลือกเป็น **`None`** (ค่าเริ่มต้น)
   * **Build command:** **เว้นว่างไว้** *(ไม่ต้องพิมพ์อะไรเลย)*
   * **Build output directory:** **เว้นว่างไว้** หรือพิมพ์แค่เครื่องหมาย **`/`** *(ในหน้าเว็บ Cloudflare ปัจจุบัน ช่องนี้จะมีข้อความจางๆ ว่า `/` อยู่แล้ว ให้ปล่อยตามค่าเริ่มต้นได้เลยครับ ไม่ต้องพิมพ์ `.`)*
7. คลิกปุ่มสีน้ำเงิน **`Save and Deploy`** ที่ด้านล่างสุด
8. รอประมาณ 30–60 วินาที จนหน้าจอขึ้นข้อความ **`Success! Your project is deployed to Region: Earth`** จากนั้นคลิกปุ่ม **`Continue to project`**

---

## 🔹 ขั้นตอนที่ 3: เชื่อมฐานข้อมูล KV (`BRF_STUDIO_KV`) เข้ากับโปรเจกต์เว็บของคุณ

เมื่อกด `Continue to project` เข้ามาในหน้าจัดการของ **`brf-korat-studio`** แล้ว จะเห็นแถบเมนูแนวนอนด้านบน (`Deployments`, `Metrics`, `Custom domains`, `Settings`):

1. คลิกที่แท็บ **`Settings`** (อยู่ขวาสุดของแถบเมนูแนวนอนด้านบน)
2. ดูที่เมนูย่อยด้านซ้ายมือภายใต้หน้า Settings:
   * คลิกที่ **`Bindings`** *(หรือในหน้าเว็บแบบเดิมจะชื่อว่า **`Functions`** แล้วเลื่อนลงมาที่หัวข้อ **KV namespace bindings**)*
3. คลิกปุ่มสีน้ำเงิน **`Add`** (หรือ **`Add binding`**)
4. ในหน้าต่างที่เด้งขึ้นมา ให้เลือกประเภทเป็น **`KV namespace`**
5. กรอกข้อมูล 2 ช่องนี้ให้ตรงทุกตัวอักษร:
   * **Variable name:** พิมพ์คำว่า **`BRF_STUDIO_KV`** *(ต้องเป็นตัวพิมพ์ใหญ่ทั้งหมดและมีขีดล่างตรงกัน เพราะโค้ดใน `functions/api/data.js` เรียกใช้ชื่อนี้)*
   * **KV namespace:** คลิกเลือก **`BRF_STUDIO_KV`** (ที่คุณสร้างไว้ในขั้นตอนที่ 1)
   * *(หากมีให้เลือก Environment ให้ติ๊กทั้ง **Production** และ **Preview**)*
6. คลิกปุ่ม **`Save`**

---

## 🔹 ขั้นตอนที่ 4: กดสั่งอัปเดต (Retry Deployment) 1 ครั้งเพื่อให้ฐานข้อมูลเริ่มทำงาน

การเพิ่ม Binding ในขั้นตอนที่ 3 จะเริ่มทำงานเมื่อมีการ Deploy รอบใหม่ ให้ทำดังนี้ครับ:

1. คลิกที่แท็บ **`Deployments`** (แท็บแรกสุดด้านบนของโปรเจกต์ `brf-korat-studio`)
2. ดูที่ตาราง **All deployments** ด้านล่าง ในบรรทัดบนสุด (รายการล่าสุด):
   * คลิกที่ปุ่ม **จุด 3 จุด (`⋯`)** ที่อยู่ด้านขวาสุดของแถวนั้น
   * คลิกเลือกเมนู **`Retry deployment`**
3. รอประมาณ 20 วินาทีให้สถานะขึ้นสีเขียว ✅ **`Active`**

---

## 🎉 เสร็จสมบูรณ์! ลิงก์เข้าใช้งานเว็บไซต์ของคุณบน Cloudflare

เมื่อขึ้นสถานะ Active แล้ว คุณสามารถคลิกลิงก์ใต้หัวข้อ **Domain** (เช่น `https://brf-korat-studio.pages.dev`) เพื่อใช้งานได้ทันที:

* 📺 **สำหรับเปิดบนจอทีวีหน้าร้าน (Live Display):**
  `https://brf-korat-studio.pages.dev/`
* ⚙️ **สำหรับพนักงาน/ครู จัดการตารางสอนผ่านมือถือหรือคอมพิวเตอร์ (Admin Panel):**
  `https://brf-korat-studio.pages.dev/admin.html`
  *(รหัสผ่าน PIN เริ่มต้นคือ **`1234`** — สามารถเข้าไปเปลี่ยนรหัส PIN ใหม่ได้ที่เมนู **"📢 ตั้งค่าสถาบัน & รหัสผ่าน PIN"** แล้วกดบันทึก รหัสใหม่จะถูกเก็บไว้ในฐานข้อมูล Cloudflare KV ทันที)*
