import {
  Link,
} from "react-router-dom";

const Home = () => {

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">

      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">

          EchoSupport

        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-2xl"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-2xl font-bold"
          >
            Get Started
          </Link>

        </div>

      </nav>

      <section className="flex flex-col justify-center items-center text-center px-6 py-32">

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight max-w-5xl">

          AI Powered
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {" "}
            Customer Support
          </span>
          {" "}
          Platform

        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl leading-relaxed">

          Manage complaints, automate support,
          track tickets, analyze customer issues,
          and power your support team with AI.

        </p>

        <div className="flex gap-6 mt-12 flex-wrap justify-center">

          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 rounded-3xl text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Start Free 🚀
          </Link>

          <Link
            to="/login"
            className="bg-gray-900 border border-gray-700 px-10 py-5 rounded-3xl text-xl font-bold hover:bg-gray-800 transition-all"
          >
            Login
          </Link>

        </div>

      </section>

      <section className="px-10 pb-24">

        <h2 className="text-5xl font-bold text-center mb-20">

          Powerful Features ⚡

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">

            <h3 className="text-3xl font-bold mb-4">
              🤖 AI Assistant
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Smart AI powered support assistant
              for solving customer issues instantly.
            </p>

          </div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">

            <h3 className="text-3xl font-bold mb-4">
              🎫 Ticket System
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Create, manage and track complaints
              with advanced status management.
            </p>

          </div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">

            <h3 className="text-3xl font-bold mb-4">
              📊 Analytics
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Visualize customer complaint trends
              with advanced analytics dashboards.
            </p>

          </div>

        </div>

      </section>

      <section className="px-10 pb-24">

        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-[40px] p-14 text-center shadow-2xl">

          <h2 className="text-5xl font-extrabold">
            Ready to modernize support?
          </h2>

          <p className="text-xl mt-6 text-gray-200">

            Start managing customer support
            smarter with AI powered workflows.

          </p>

          <Link
            to="/register"
            className="inline-block mt-10 bg-black px-10 py-5 rounded-3xl text-xl font-bold hover:scale-105 transition-all"
          >
            Launch EchoSupport 🚀
          </Link>

        </div>

      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">

        © 2026 EchoSupport. All rights reserved.

      </footer>

    </div>
  );
};

export default Home;