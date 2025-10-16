// File: frontend/src/components/BillingPayments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BillingPayments({ user }) {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    bankAccount: '',
    routingNumber: '',
    walletAddress: '',
    walletPin: ''
  });

  // API base URL - adjust this to match your backend
  const API_BASE_URL = 'http://localhost:8083/api';

  // Function to fetch invoices from API
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // For now, we'll use a default user ID of 1
      // In a real application, this would come from the logged-in user context
      const userId = user?.id || 1;
      const response = await axios.get(`${API_BASE_URL}/invoices/user/${userId}`);

      // Transform the API response to match the expected format
      const transformedInvoices = response.data.map(invoice => ({
        id: invoice.id,
        invoiceId: invoice.invoiceId,
        date: invoice.invoiceDate,
        dueDate: invoice.dueDate,
        weight: invoice.weight,
        weightCharge: invoice.weightCharge,
        amount: invoice.amount,
        status: invoice.status
      }));

      setInvoices(transformedInvoices);
    } catch (err) {
      setError('Could not fetch invoices. Please try again later.');
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load invoices when component mounts
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = invoices;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    // Sort functionality
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredInvoices(filtered);
  }, [invoices, searchTerm, statusFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  // Open payment modal
  const handlePayInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
    setPaymentMethod('');
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      bankAccount: '',
      routingNumber: '',
      walletAddress: '',
      walletPin: ''
    });
  };

  // Process payment after confirmation
  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    setPaymentLoading(selectedInvoice.invoiceId);
    try {
      // Call the API to process the payment
      const response = await axios.post(`${API_BASE_URL}/invoices/pay/${selectedInvoice.id}`);

      // Update the invoice status in the local state
      setInvoices(prevInvoices =>
        prevInvoices.map(invoice =>
          invoice.id === selectedInvoice.id
            ? { ...invoice, status: 'PAID' }
            : invoice
        )
      );

      setSuccessMessage(`Payment successful for invoice ${selectedInvoice.invoiceId} using ${paymentMethod}!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);

      // Close modal
      setShowPaymentModal(false);
      setSelectedInvoice(null);
      setPaymentMethod('');
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(null);
    }
  };

  // Close payment modal
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedInvoice(null);
    setPaymentMethod('');
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      bankAccount: '',
      routingNumber: '',
      walletAddress: '',
      walletPin: ''
    });
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'PAID': return 'status-paid';
      case 'UNPAID': return 'status-unpaid';
      case 'PARTIALLY_PAID': return 'status-partial';
      default: return 'status-default';
    }
  };

  // Calculate totals
  const totalInvoices = filteredInvoices.length;
  const unpaidInvoices = filteredInvoices.filter(invoice => invoice.status === 'UNPAID').length;
  const paidInvoices = filteredInvoices.filter(invoice => invoice.status === 'PAID').length;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Billing & Payments</h2>
      <p className="dashboard-welcome">Manage your invoices and payments efficiently.</p>

          {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-notification" style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '12px 16px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>✅ {successMessage}</span>
          <button
            onClick={() => setShowSuccessMessage(false)}
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>Total Invoices</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>{totalInvoices}</p>
        </div>
        <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>Unpaid</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{unpaidInvoices}</p>
        </div>
         <div style={{ backgroundColor: '#d4edda', padding: '20px', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
           <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>Paid</h4>
           <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>{paidInvoices}</p>
         </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Search Invoices:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by invoice ID or description..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
                <option value="ALL">All Status</option>
                <option value="UNPAID">Unpaid</option>
                <option value="PAID">Paid</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="dashboard-card">
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#6c757d' }}>Loading invoices...</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Invoice ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Invoice Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Due Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Weight (kg)</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Weight Charge</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Action</th>
                    </tr>
                  </thead>
                <tbody>
                  {currentInvoices.length > 0 ? (
                    currentInvoices.map((invoice) => (
                      <tr key={invoice.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                        <td style={{ padding: '12px', fontWeight: '500' }}>{invoice.invoiceId}</td>
                        <td style={{ padding: '12px' }}>{invoice.date}</td>
                        <td style={{ padding: '12px' }}>{invoice.dueDate}</td>
                        <td style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>{invoice.weight ? `${invoice.weight} kg` : 'N/A'}</td>
                        <td style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>{invoice.weightCharge ? `Rs${invoice.weightCharge.toFixed(2)}` : 'N/A'}</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`status-badge ${getStatusClass(invoice.status)}`} style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase'
                          }}>
                            {invoice.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {invoice.status === 'UNPAID' ? (
                            <button
                              onClick={() => handlePayInvoice(invoice)}
                              disabled={paymentLoading === invoice.invoiceId}
                              style={{
                                backgroundColor: paymentLoading === invoice.invoiceId ? '#6c757d' : '#28a745',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: paymentLoading === invoice.invoiceId ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {paymentLoading === invoice.invoiceId ? 'Processing...' : 'Pay Now'}
                            </button>
                          ) : (
                            <span style={{ color: '#6c757d', fontSize: '14px' }}>Paid</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
                        No invoices found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                gap: '10px'
              }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    backgroundColor: currentPage === 1 ? '#f8f9fa' : 'white',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Previous
                </button>

                <span style={{ padding: '0 10px' }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    backgroundColor: currentPage === totalPages ? '#f8f9fa' : 'white',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#495057' }}>Payment Details</h3>
              <button
                onClick={handleClosePaymentModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            </div>

            {/* Invoice Summary */}
              <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>Invoice Summary</h4>
                <p style={{ margin: '5px 0', color: '#6c757d' }}><strong>Invoice ID:</strong> {selectedInvoice.invoiceId}</p>
                <p style={{ margin: '5px 0', color: '#6c757d' }}><strong>Weight:</strong> {selectedInvoice.weight ? `${selectedInvoice.weight} kg` : 'N/A'}</p>
                <p style={{ margin: '5px 0', color: '#6c757d' }}><strong>Weight Charge:</strong> {selectedInvoice.weightCharge ? `$${selectedInvoice.weightCharge.toFixed(2)}/kg` : 'N/A'}</p>
                <p style={{ margin: '5px 0', color: '#6c757d' }}><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
              </div>

            {/* Payment Method Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#495057' }}>
                Select Payment Method:
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                 <button
                   onClick={() => setPaymentMethod('Card')}
                   style={{
                     padding: '10px 20px',
                     border: paymentMethod === 'Card' ? '2px solid #007bff' : '1px solid #ced4da',
                     backgroundColor: paymentMethod === 'Card' ? '#e7f3ff' : 'white',
                     borderRadius: '6px',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     color: '#495057',
                     fontSize: '14px',
                     fontWeight: '500'
                   }}
                 >
                   💳 Credit/Debit Card
                 </button>
                 <button
                   onClick={() => setPaymentMethod('Bank Transfer')}
                   style={{
                     padding: '10px 20px',
                     border: paymentMethod === 'Bank Transfer' ? '2px solid #007bff' : '1px solid #ced4da',
                     backgroundColor: paymentMethod === 'Bank Transfer' ? '#e7f3ff' : 'white',
                     borderRadius: '6px',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     color: '#495057',
                     fontSize: '14px',
                     fontWeight: '500'
                   }}
                 >
                   🏦 Bank Transfer
                 </button>
                 <button
                   onClick={() => setPaymentMethod('Wallet')}
                   style={{
                     padding: '10px 20px',
                     border: paymentMethod === 'Wallet' ? '2px solid #007bff' : '1px solid #ced4da',
                     backgroundColor: paymentMethod === 'Wallet' ? '#e7f3ff' : 'white',
                     borderRadius: '6px',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     color: '#495057',
                     fontSize: '14px',
                     fontWeight: '500'
                   }}
                 >
                   💰 Digital Wallet
                 </button>
              </div>
            </div>

            {/* Payment Details Forms */}
            {paymentMethod === 'Card' && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>Card Details</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        placeholder="123"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardholderName}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Bank Transfer' && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>Bank Transfer Details</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.bankAccount}
                      onChange={(e) => setPaymentDetails({...paymentDetails, bankAccount: e.target.value})}
                      placeholder="1234567890"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.routingNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, routingNumber: e.target.value})}
                      placeholder="123456789"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Wallet' && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>Digital Wallet Details</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.walletAddress}
                      onChange={(e) => setPaymentDetails({...paymentDetails, walletAddress: e.target.value})}
                      placeholder="0x1234567890abcdef"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#495057' }}>
                      Wallet PIN
                    </label>
                    <input
                      type="password"
                      value={paymentDetails.walletPin}
                      onChange={(e) => setPaymentDetails({...paymentDetails, walletPin: e.target.value})}
                      placeholder="Enter your wallet PIN"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
               <button
                 onClick={handleClosePaymentModal}
                 style={{
                   padding: '10px 20px',
                   border: '1px solid #ced4da',
                   backgroundColor: 'white',
                   borderRadius: '4px',
                   cursor: 'pointer',
                   fontSize: '14px',
                   color: '#495057',
                   fontWeight: '500'
                 }}
               >
                 Cancel
               </button>
              <button
                onClick={handleConfirmPayment}
                disabled={paymentLoading === selectedInvoice.invoiceId}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: paymentLoading === selectedInvoice.invoiceId ? '#6c757d' : '#28a745',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: paymentLoading === selectedInvoice.invoiceId ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {paymentLoading === selectedInvoice.invoiceId ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BillingPayments;