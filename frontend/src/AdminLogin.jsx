import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        onLogin();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Admin Login</h1>
          <p className="text-gray-400">Farewell Eve '25 - Ticket Management</p>
        </div>

        <div className="bg-gradient-to-b from-yellow-500/10 to-black border-2 border-yellow-500/50 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-yellow-400">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-yellow-400">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500 text-white p-4 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition disabled:bg-gray-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

