// File: frontend/src/components/MyBills.jsx
import React, { useState, useEffect } from 'react';

function MyBills({ user }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Enhanced mock data for billing history
  const mockBills = [
    {
      id: 1,
      invoiceId: 'INV-001',
      date: '2024-01-15',
      amount: 25.50,
      status: 'PAID',
      paymentDate: '2024-01-20',
      paymentMethod: 'Credit Card',
      description: 'Waste Collection Service - January'
    },
    {
      id: 2,
      invoiceId: 'INV-002',
      date: '2024-01-20',
      amount: 18.75,
      status: 'PAID',
      paymentDate: '2024-01-25',
      paymentMethod: 'Bank Transfer',
      description: 'Waste Collection Service - January'
    },
    {
      id: 3,
      invoiceId: 'INV-003',
      date: '2024-01-25',
      amount: 32.00,
      status: 'PAID',
      paymentDate: '2024-01-30',
      paymentMethod: 'Credit Card',
      description: 'Waste Collection Service - January'
    },
    {
      id: 4,
      invoiceId: 'INV-004',
      date: '2024-02-01',
      amount: 15.25,
      status: 'PAID',
      paymentDate: '2024-02-05',
      paymentMethod: 'Bank Transfer',
      description: 'Waste Collection Service - February'
    },
    {
      id: 5,
      invoiceId: 'INV-005',
      date: '2024-02-05',
      amount: 28.90,
      status: 'PAID',
      paymentDate: '2024-02-10',
      paymentMethod: 'Credit Card',
      description: 'Waste Collection Service - February'
    },
    {
      id: 6,
      invoiceId: 'INV-006',
      date: '2024-02-10',
      amount: 22.40,
      status: 'PAID',
      paymentDate: '2024-02-15',
      paymentMethod: 'Bank Transfer',
      description: 'Waste Collection Service - February'
    }
  ];

  // Filter bills by date
  useEffect(() => {
    setLoading(true);
    const filteredBills = mockBills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate.getFullYear() === selectedYear && 
             billDate.getMonth() + 1 === selectedMonth;
    });
    setBills(filteredBills);
    setLoading(false);
  }, [selectedYear, selectedMonth]);

  // Calculate monthly statistics
  const monthlyTotal = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paymentMethods = [...new Set(bills.map(bill => bill.paymentMethod))];

  // Generate year and month options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Bills</h2>
      <p className="dashboard-welcome">View your billing history and payment records.</p>

      {/* Date Filter */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            style={{
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <div style={{ 
            backgroundColor: '#e9ecef', 
            padding: '10px 15px', 
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '2px' }}>Monthly Total</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#495057' }}>
              ${monthlyTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#d4edda', padding: '20px', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>Total Bills</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>{bills.length}</p>
        </div>
        <div style={{ backgroundColor: '#cce5ff', padding: '20px', borderRadius: '8px', border: '1px solid #99d6ff' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#004085' }}>Payment Methods</h4>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#004085' }}>
            {paymentMethods.length} types
          </p>
        </div>
        <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>Average Bill</h4>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#856404' }}>
            ${bills.length > 0 ? (monthlyTotal / bills.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Bills Table */}
      <div className="dashboard-card">
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '20px', color: '#6c757d' }}>Loading bills...</p>
          </div>
        )}
        
        {!loading && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Invoice ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Bill Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Payment Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Payment Method</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <tr key={bill.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', fontWeight: '500' }}>{bill.invoiceId}</td>
                      <td style={{ padding: '12px', color: '#6c757d' }}>{bill.description}</td>
                      <td style={{ padding: '12px' }}>{bill.date}</td>
                      <td style={{ padding: '12px', fontWeight: '500' }}>${bill.amount.toFixed(2)}</td>
                      <td style={{ padding: '12px' }}>{bill.paymentDate}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: '#e9ecef',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {bill.paymentMethod}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
                      No bills found for the selected period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default MyBills;