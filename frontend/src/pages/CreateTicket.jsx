import { useState } from "react";
import axios from "axios";

const CreateTicket = () => {

  const [formData, setFormData] = useState({
    userIssue: "",
    category: "",
    priority: "Low",
    summary: "",
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

      const response = await axios.post(
        "https://echo-support-backend.onrender.com/api/tickets/create",
        formData
      );

      console.log(response.data);

      alert("Ticket Created Successfully ✅");

      setFormData({
        userIssue: "",
        category: "",
        priority: "Low",
        summary: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error creating ticket ❌");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/90 border border-gray-700 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
      >

        <h1 className="text-4xl font-bold text-center text-white">
          Create Ticket 🎫
        </h1>

        <input
          type="text"
          name="userIssue"
          placeholder="Enter Issue"
          value={formData.userIssue}
          onChange={handleChange}
          className="p-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="p-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
        >

          <option value="Low">Low</option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">High</option>

        </select>

        <textarea
          name="summary"
          placeholder="Describe your issue..."
          rows="5"
          value={formData.summary}
          onChange={handleChange}
          className="p-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500 resize-none"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-3 rounded-xl font-bold text-white"
        >
          Submit Ticket
        </button>

      </form>

    </div>
  );
};

export default CreateTicket;