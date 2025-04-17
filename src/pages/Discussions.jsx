import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { FaHeart, FaRetweet, FaRegComment, FaPlus } from 'react-icons/fa';

function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', category: 'general' });
  const { user } = useAuth();

  // Load discussions from localStorage on component mount
  useEffect(() => {
    const savedDiscussions = localStorage.getItem('forumDiscussions');
    if (savedDiscussions) {
      setDiscussions(JSON.parse(savedDiscussions));
    }
  }, []);

  // Save discussions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('forumDiscussions', JSON.stringify(discussions));
  }, [discussions]);

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'tech', name: 'Technology' },
    { id: 'sports', name: 'Sports' },
    { id: 'klu', name: 'KL University' },
    { id: 'frontend', name: 'Frontend Frameworks' },
    
  ];

  const handleCreateDiscussion = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to create a discussion');
      return;
    }

    const newDiscussionObj = {
      id: Date.now().toString(),
      ...newDiscussion,
      user: { username: user.email },
      category: { name: categories.find(c => c.id === newDiscussion.category).name },
      created_at: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      comments: 0
    };

    setDiscussions([newDiscussionObj, ...discussions]);
    setNewDiscussion({ title: '', content: '', category: 'general' });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" data-aos="fade-right">Discussions</h1>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition"
            data-aos="fade-left"
          >
            <FaPlus /> New Discussion
          </button>
        )}
      </div>

      {showForm && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-aos="fade">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-bold mb-4">Create New Discussion</h2>
            <form onSubmit={handleCreateDiscussion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={newDiscussion.category}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                  rows="4"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700 transition"
                >
                  Create Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {discussions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md" data-aos="fade-up">
            <p className="text-xl text-gray-600">No discussions yet. Be the first to start one!</p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              data-aos="fade-up"
            >
              <Link to={`/discussions/${discussion.id}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{discussion.title}</h2>
                    <p className="text-gray-600 mb-4">{discussion.content}</p>
                  </div>
                  <span className="text-sm text-primary px-3 py-1 bg-red-50 rounded-full">
                    {discussion.category.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-6">
                    <span className="flex items-center gap-2 text-gray-600">
                      <FaHeart /> {discussion.likes}
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <FaRetweet /> {discussion.reposts}
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <FaRegComment /> {discussion.comments}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>Posted by {discussion.user.username}</span>
                    <span className="ml-4">{format(new Date(discussion.created_at), 'PPp')}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Discussions;