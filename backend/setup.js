const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// 1. กำหนดตำแหน่งของโฟลเดอร์ data
const dataDir = path.join(__dirname, 'data');

// 2. ตรวจสอบว่าโฟลเดอร์ data มีอยู่หรือไม่ ถ้าไม่มีให้สร้างใหม่
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created directory: ${dataDir}`);
}

// 3. ข้อมูลดิบจากโจทย์ในรูปแบบ JavaScript Array of Objects
const dailyReport1Data = [
    { "Date": "15-Jan-2025", "Candidate Name": "Mr.A", "Role": "Data Analyst", "Interview": "Yes", "Status": "Pass" },
    { "Date": "15-Jan-2025", "Candidate Name": "Ms.B", "Role": "Web Developer", "Interview": "Yes", "Status": "Fail" }
];

const dailyReport2Data = [
    { "Date": "15-Jan-2025", "Candidate Name": "Mr.C", "Role": "Software Tester", "Interview": "Yes", "Status": "Fail" },
    { "Date": "15-Jan-2025", "Candidate Name": "Ms.D", "Role": "Project Coordinator", "Interview": "Yes", "Status": "Pass" }
];

const newEmployeeData = [
    { "Employee Name": "Mr.A", "Join Date": "3-Feb-2025", "Role": "Data Analyst", "DOB (Date of Birth)": "01-01-2000", "ID Card": "1-1111-11111-11-1" },
    { "Employee Name": "Ms.D", "Join Date": "17-Feb-2025", "Role": "Project Coordinator", "DOB (Date of Birth)": "01-12-2001", "ID Card": "2-2222-22222-22-2" }
];

// 4. ฟังก์ชันสำหรับสร้างไฟล์ Excel จากข้อมูล
function createExcelFile(filePath, data) {
    // แปลง array of objects ให้เป็น worksheet
    const worksheet = xlsx.utils.json_to_sheet(data);
    // สร้าง workbook ใหม่
    const workbook = xlsx.utils.book_new();
    // เพิ่ม worksheet เข้าไปใน workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // เขียนไฟล์ workbook ลงบนดิสก์
    xlsx.writeFile(workbook, filePath);
    console.log(`Successfully created file: ${filePath}`);
}

// 5. เรียกใช้ฟังก์ชันเพื่อสร้างไฟล์ทั้งหมด
try {
    createExcelFile(path.join(dataDir, 'Daily report_20250115_Pattama_Sooksan.xls'), dailyReport1Data);
    createExcelFile(path.join(dataDir, 'Daily report_20250115_Raewwadee_Jaidee.xls'), dailyReport2Data);
    createExcelFile(path.join(dataDir, 'New Employee_202502.xls'), newEmployeeData);
    console.log('\nSetup complete! All data files have been generated.');
} catch (error) {
    console.error('An error occurred during file creation:', error);
}