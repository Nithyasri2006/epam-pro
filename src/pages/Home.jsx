import { Link } from 'react-router-dom';
import { FaUniversity, FaReact, FaHeart } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Welcome to Our Forum</h1>
          <p className="text-xl mb-8">Join the conversation, share knowledge, and connect with others.</p>
          <Link to="/login" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-red-700 transition inline-block transform hover:scale-105">
            Join Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4">Engage in Discussions</h3>
              <p>Start meaningful conversations and share your thoughts with others.</p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4">Learn from Others</h3>
              <p>Gain insights and knowledge from experienced community members.</p>
            </div>
            <div className="text-center p-8 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4">Build Connections</h3>
              <p>Network with like-minded individuals and grow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Topics</h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <FaUniversity className="text-4xl text-primary" />
                <div>
                  <h3 className="text-2xl font-bold">KL University</h3>
                  <p className="text-gray-600">Explore academic life, campus events, and student experiences at KLU</p>
                </div>
              </div>
              <Link to="/discussions" className="text-primary hover:text-red-700 font-semibold">Join Discussion →</Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <FaReact className="text-4xl text-primary" />
                <div>
                  <h3 className="text-2xl font-bold">Frontend Frameworks</h3>
                  <p className="text-gray-600">Discuss React, Vue, Angular, and modern web development</p>
                </div>
              </div>
              <Link to="/discussions" className="text-primary hover:text-red-700 font-semibold">Join Discussion →</Link>
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;