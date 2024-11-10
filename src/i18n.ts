import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Settings: "Settings",
      "Toggle Dark/Light Mode": "Toggle Dark/Light Mode",
      "Select Language": "Select Language",
      "Settings Page ©2024": "Settings Page ©2024",
      Dashboard: "Dashboard",
      "Bill Tracking": "Bill Tracking",
      "Add Bill": "Add Bill",
      "Export to Excel": "Export to Excel",
      "Edit Bill": "Edit Bill",
      Login: "Login",
      "Not Found": "Not Found",
      "Bill Manager": "Bill Manager",
      "Bill Management System": "Bill Management System",
    },
  },
  th: {
    translation: {
      Settings: "การตั้งค่า",
      "Toggle Dark/Light Mode": "สลับโหมดสว่าง/มืด",
      "Select Language": "เลือกภาษา",
      "Settings Page ©2024": "หน้าการตั้งค่า ©2024",
      Dashboard: "แผงควบคุม",
      "Bill Tracking": "การติดตามบิล",
      "Add Bill": "เพิ่มบิล",
      "Export to Excel": "ส่งออกเป็น Excel",
      "Edit Bill": "แก้ไขบิล",
      Login: "เข้าสู่ระบบ",
      "Not Found": "ไม่พบหน้าที่ค้นหา",
      "Bill Manager": "ผู้จัดการบิล",
      "Bill Management System": "ระบบจัดการบิล",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;
