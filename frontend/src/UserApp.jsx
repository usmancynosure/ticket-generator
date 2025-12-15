import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function UserApp() {
  const [form, setForm] = useState({
    name: "",
    regNo: "",
    batch: "",
    email: "",
    payment: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    setMessage("");
  };

  const handleFileChange = (e) => {
    setForm({ ...form, payment: e.target.files[0] });
    setError("");
    setMessage("");
  };

  const scrollToForm = () => {
    document.getElementById("ticket-form").scrollIntoView({ 
      behavior: "smooth",
      block: "center"
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.regNo || !form.batch || !form.email) {
      setError("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("regNo", form.regNo);
      data.append("batch", form.batch);
      data.append("email", form.email);
      if (form.payment) {
        data.append("payment", form.payment);
      }

      const response = await axios.post(`${API_BASE_URL}/submit`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message || "Request submitted! Pending verification.");
      setForm({
        name: "",
        regNo: "",
        batch: "",
        email: "",
        payment: null,
      });
      
      const fileInput = document.getElementById("payment-input");
      if (fileInput) fileInput.value = "";

    } catch (err) {
      setError(
        err.response?.data?.error || 
        "Failed to submit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-yellow-400">FAREWELL EVE '25</span>
            </div>
            <button
              onClick={scrollToForm}
              className="bg-yellow-500 text-black px-4 sm:px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition text-sm sm:text-base"
            >
              Get Ticket - Rs. 3500
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
          <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic mb-4 sm:mb-6 tracking-tight text-white">
              Farewell Eve '25
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent max-w-2xl mx-auto"></div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 italic">
            with grateful hearts, we bid farewell & welcome new beginnings
          </p>
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-wider">
              LIVE QAWALI & CONCERT
            </h2>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-yellow-400">
              FRIDAY, 19 DEC 2025 AT 6 PM
            </div>
            <div className="text-lg sm:text-xl text-gray-300">
              Avior Marquee, Gulberg Greens, Islamabad
            </div>
          </div>
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 rounded-lg shadow-2xl">
              <p className="text-2xl sm:text-3xl font-bold text-black">
                Only <span className="text-4xl sm:text-5xl">Rs. 3500</span>
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-black italic">Per head</p>
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="bg-yellow-500 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
          >
            Book Your Ticket Now
          </button>
        </div>
      </section>

      {/* Dinner Menu Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-yellow-900/20 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-yellow-400 text-center mb-12 sm:mb-16">
            Dinner Menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-lg border-2 border-yellow-500/30 hover:border-yellow-500 transition">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">Starter</h3>
              <ul className="space-y-3 text-base sm:text-lg">
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Soup
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Fish Crackers
                </li>
              </ul>
            </div>

            {/* Main Course */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-lg border-2 border-yellow-500/30 hover:border-yellow-500 transition">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">Main Course</h3>
              <ul className="space-y-3 text-base sm:text-lg">
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Chicken Qorma
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Chicken Biyani
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Live BBQ
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Tikka Boti & Seekh Kabab
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Two Types of Sweets
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Naan & Salad
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">•</span>
                  Cold Drink & Mineral Water
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-12 sm:py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-yellow-400 text-center mb-12 sm:mb-16">
            Activities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🎤</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Awaaz Band Concert</h3>
              <p className="text-sm sm:text-base text-gray-400">Live music performance</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🎵</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Qawali & DJ</h3>
              <p className="text-sm sm:text-base text-gray-400">Traditional & modern beats</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🎭</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Performances</h3>
              <p className="text-sm sm:text-base text-gray-400">Student showcases</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🎪</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Fun Activities</h3>
              <p className="text-sm sm:text-base text-gray-400">Games & entertainment</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🍽️</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Lavish Dinner</h3>
              <p className="text-sm sm:text-base text-gray-400">Complete menu included</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🏮</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Lantern Show</h3>
              <p className="text-sm sm:text-base text-gray-400">Magical lighting</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🎂</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Cake Cutting</h3>
              <p className="text-sm sm:text-base text-gray-400">Special ceremony</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">💬</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Confession Segment</h3>
              <p className="text-sm sm:text-base text-gray-400">Share your memories</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition">
              <div className="text-4xl sm:text-5xl mb-4">🎙️</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">Open Mic</h3>
              <p className="text-sm sm:text-base text-gray-400">Express yourself</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Form Section */}
      <section id="ticket-form" className="py-12 sm:py-20 px-4 bg-gradient-to-b from-black to-yellow-900/20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-yellow-400">Get Your Ticket</h2>
            <p className="text-base sm:text-lg text-gray-300">Submit your details for verification</p>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-500 mt-4">Rs. 3500 per person</p>
            <p className="text-sm text-gray-400 mt-2">📧 Ticket will be emailed after admin approval</p>
          </div>

          <div className="bg-gradient-to-b from-yellow-500/10 to-black border-2 border-yellow-500/50 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-yellow-400">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-yellow-400">
                  Registration Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="regNo"
                  value={form.regNo}
                  onChange={handleInputChange}
                  placeholder="Enter your registration number"
                  className="w-full px-4 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-yellow-400">
                  Batch <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="batch"
                  value={form.batch}
                  onChange={handleInputChange}
                  placeholder="e.g., 2021-2025"
                  className="w-full px-4 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-yellow-400">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                  disabled={loading}
                />
                <p className="text-xs text-gray-400 mt-1">Ticket will be sent here after approval</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-yellow-400">
                  Payment Proof <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  id="payment-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 bg-white text-black rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-yellow-500 file:text-black file:cursor-pointer hover:file:bg-yellow-400 file:text-sm file:font-semibold"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-500 text-white p-4 rounded-lg animate-shake">
                  <p className="font-semibold">⚠️ Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="bg-yellow-500 text-black p-4 rounded-lg border-2 border-yellow-600">
                  <p className="font-semibold">⏳ Pending Verification</p>
                  <p className="text-sm">{message}</p>
                  <p className="text-xs mt-2">You'll receive your ticket via email once approved by admin.</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit for Verification"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
              <p>⏳ Your request will be reviewed by admin</p>
              <p>✅ Ticket will be emailed once approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-20 px-4 bg-black border-t border-yellow-500/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-yellow-400">
            For More Information Contact:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Hasnain Abbasi</h3>
              <a href="tel:03065789045" className="text-white hover:text-yellow-400 transition">
                0306-5789045
              </a>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Zarnish Jawad</h3>
              <a href="tel:03404555553" className="text-white hover:text-yellow-400 transition">
                0340-4555553
              </a>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">M Asad</h3>
              <a href="tel:03016996105" className="text-white hover:text-yellow-400 transition">
                0301-6996105
              </a>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Usman Waris</h3>
              <a href="tel:03200787777" className="text-white hover:text-yellow-400 transition">
                0320-0787777
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-yellow-500/30 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-serif italic text-yellow-400 mb-2">Farewell Eve '25</h3>
            <p className="text-gray-400 text-sm sm:text-base italic">with grateful hearts, we bid farewell & welcome new beginnings</p>
          </div>
          <div className="border-t border-yellow-500/20 pt-6">
            <p className="text-gray-500 text-xs sm:text-sm">© 2025 Farewell Eve. All rights reserved.</p>
            <p className="text-yellow-600 text-xs mt-2">FRIDAY, 19 DEC 2025 AT 6 PM | Avior Marquee, Gulberg Greens, Islamabad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserApp;

