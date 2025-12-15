import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function AdminDashboard({ onLogout }) {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [filter, setFilter] = useState("pending");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchTickets();
  }, [filter]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/stats`);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/tickets?status=${filter}`);
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (ticketId) => {
    if (!confirm("Approve this ticket and send email to user?")) return;
    
    setActionLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/admin/tickets/${ticketId}/approve`);
      alert("Ticket approved and email sent successfully!");
      fetchStats();
      fetchTickets();
      setSelectedTicket(null);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to approve ticket");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (ticketId) => {
    if (!confirm("Reject this ticket?")) return;
    
    setActionLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/admin/tickets/${ticketId}/reject`);
      alert("Ticket rejected");
      fetchStats();
      fetchTickets();
      setSelectedTicket(null);
    } catch (error) {
      alert("Failed to reject ticket");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!confirm("Delete this ticket permanently?")) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/admin/tickets/${ticketId}`);
      alert("Ticket deleted");
      fetchStats();
      fetchTickets();
      setSelectedTicket(null);
    } catch (error) {
      alert("Failed to delete ticket");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="bg-gradient-to-r from-black to-yellow-900/30 border-b border-yellow-500/30 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Farewell Eve '25 Ticket Management</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-b from-yellow-500/20 to-black border border-yellow-500/30 p-6 rounded-lg">
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-sm text-gray-400 mt-1">Pending</div>
          </div>
          <div className="bg-gradient-to-b from-green-500/20 to-black border border-green-500/30 p-6 rounded-lg">
            <div className="text-3xl font-bold text-green-400">{stats.approved}</div>
            <div className="text-sm text-gray-400 mt-1">Approved</div>
          </div>
          <div className="bg-gradient-to-b from-red-500/20 to-black border border-red-500/30 p-6 rounded-lg">
            <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
            <div className="text-sm text-gray-400 mt-1">Rejected</div>
          </div>
          <div className="bg-gradient-to-b from-blue-500/20 to-black border border-blue-500/30 p-6 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-400 mt-1">Total</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["pending", "approved", "rejected", ""].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-md font-semibold transition whitespace-nowrap ${
                filter === status
                  ? "bg-yellow-500 text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {status === "" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Tickets List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-yellow-400">Loading tickets...</div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-lg border border-yellow-500/20">
            <div className="text-gray-400">No tickets found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-gradient-to-b from-white/10 to-black border border-yellow-500/30 p-6 rounded-lg hover:border-yellow-500 transition cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400">{ticket.name}</h3>
                    <p className="text-sm text-gray-400">{ticket.regNo}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.status === "pending"
                        ? "bg-yellow-500 text-black"
                        : ticket.status === "approved"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {ticket.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Batch:</span> {ticket.batch}</p>
                  <p><span className="text-gray-400">Email:</span> {ticket.email}</p>
                  <p><span className="text-gray-400">Phone:</span> {ticket.phone || 'N/A'}</p>
                  <p><span className="text-gray-400">Submitted:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                {ticket.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(ticket._id);
                      }}
                      disabled={actionLoading}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition disabled:bg-gray-500 text-sm font-semibold"
                    >
                      ✓ Approve & Send
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(ticket._id);
                      }}
                      disabled={actionLoading}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:bg-gray-500 text-sm font-semibold"
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedTicket(null)}>
            <div className="bg-gradient-to-b from-yellow-500/20 to-black border-2 border-yellow-500 p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Ticket Details</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-white hover:text-yellow-400 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Name</p>
                    <p className="font-semibold text-lg">{selectedTicket.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className={`font-bold ${
                      selectedTicket.status === "pending" ? "text-yellow-400" :
                      selectedTicket.status === "approved" ? "text-green-400" : "text-red-400"
                    }`}>{selectedTicket.status.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Registration No</p>
                    <p className="font-semibold">{selectedTicket.regNo}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Batch</p>
                    <p className="font-semibold">{selectedTicket.batch}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="font-semibold">{selectedTicket.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">Submitted At</p>
                    <p className="font-semibold">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">Ticket ID</p>
                    <p className="font-mono text-xs">{selectedTicket._id}</p>
                  </div>
                </div>

                {selectedTicket.paymentImage && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Payment Proof</p>
                    <a 
                      href={selectedTicket.paymentImage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={selectedTicket.paymentImage}
                        alt="Payment proof"
                        className="max-w-full h-auto rounded-lg border border-yellow-500/30 hover:border-yellow-500 transition cursor-pointer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23ccc"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23666">Image Not Available</text></svg>';
                        }}
                      />
                    </a>
                    <p className="text-xs text-gray-500 mt-2">Click to open in new tab</p>
                  </div>
                )}

                {selectedTicket.status === "pending" && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleApprove(selectedTicket._id)}
                      disabled={actionLoading}
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-500 font-bold"
                    >
                      ✓ Approve & Send Email
                    </button>
                    <button
                      onClick={() => handleReject(selectedTicket._id)}
                      disabled={actionLoading}
                      className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition disabled:bg-gray-500 font-bold"
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleDelete(selectedTicket._id)}
                  className="w-full bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition mt-4"
                >
                  🗑️ Delete Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

