import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const navigate = useNavigate();

  const categories = [
    "Payment",
    "Login",
    "Network",
    "Delivery",
    "Account",
    "Other",
  ];

  const [formData, setFormData] = useState({
    userIssue: "",
    category: "Payment",
    priority: "Low",
    summary: "",
    productName: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyWhatsApp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_BASE_URL}/api/tickets/create`,
        formData
      );

      alert("Ticket created successfully");
      navigate("/my-tickets");
    } catch (error) {
      console.log(error);
      alert("Error creating ticket");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-gray-950/95 border border-blue-900/70 rounded-3xl p-8 shadow-2xl flex flex-col gap-6"
        >
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-2xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
            >
              Back
            </button>

            <h1 className="text-4xl font-bold text-center">
              Create Ticket
            </h1>

            <div className="w-[72px]" />
          </div>

          <input
            type="text"
            name="userIssue"
            placeholder="Enter Issue"
            value={formData.userIssue}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
            required
          />

          <div>
            <p className="mb-4 text-lg font-bold">
              Select Category
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      category,
                    })
                  }
                  className={`rounded-2xl border px-5 py-4 font-bold transition-all ${
                    formData.category === category
                      ? "border-cyan-300 bg-cyan-500 text-white shadow-lg"
                      : "border-blue-800 bg-blue-950/60 text-gray-100 hover:border-cyan-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="productName"
              placeholder="Product name"
              value={formData.productName}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
            />

            <input
              type="text"
              name="companyName"
              placeholder="Product company"
              value={formData.companyName}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
            />
          </div>

          <input
            type="email"
            name="companyEmail"
            placeholder="Company support email (optional)"
            value={formData.companyEmail}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="tel"
              name="companyPhone"
              placeholder="Company phone (optional)"
              value={formData.companyPhone}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
            />

            <input
              type="tel"
              name="companyWhatsApp"
              placeholder="Company WhatsApp (optional)"
              value={formData.companyWhatsApp}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
            />
          </div>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <textarea
            name="summary"
            placeholder="Describe your issue..."
            rows="7"
            value={formData.summary}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-blue-950/60 text-white outline-none border border-blue-800 focus:border-cyan-400 resize-none"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl font-bold text-white hover:scale-[1.01] transition-all"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateTicket;
