import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// ฟังก์ชันสำหรับสร้าง class ให้กับ Badge ของ Role เพื่อแยกสี
const getRoleClass = (role) => {
  const roleFormatted = role.toLowerCase().replace(/ /g, '-');
  return `badge-${roleFormatted}`; // ใช้ backtick สำหรับ template literal
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://vanness-plus.onrender.com';

    fetch(`${apiUrl}/api/new-employees`) // แก้เป็น backtick
      .then(response => {
        if (!response.ok) throw new Error('Failed to connect to the backend server.');
        return response.json();
      })
      .then(data => setEmployees(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  // --- คำนวณ Key Metrics ด้วย useMemo เพื่อประสิทธิภาพ ---
  const keyMetrics = useMemo(() => {
    const totalHires = employees.length;
    return { totalHires };
  }, [employees]);

  if (loading) return <div className="status-display"><h2>Loading Dashboard...</h2></div>;
  if (error) return <div className="status-display"><h2>Error: {error}</h2></div>;

  return (
    <div className="dashboard-layout">
      {/* --- ส่วนของตารางข้อมูล --- */}
      <main className="table-container">
        <h2 className="table-title">New Employee Details</h2>
        <table>
          <thead>
            <tr>
              <th>EMPLOYEE NAME</th>
              <th>JOIN DATE</th>
              <th>ROLE</th>
              <th>TEAM MEMBER</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={index}>
                  <td data-label="Employee Name">{employee['Employee Name']}</td>
                  <td data-label="Join Date">{employee['Join Date']}</td>
                  <td data-label="Role">
                    <span className={`role-badge ${getRoleClass(employee['Role'])}`}>
                      {employee['Role']}
                    </span>
                  </td>
                  <td data-label="Team Member">{employee['Team Member']}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">No new employee data to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
