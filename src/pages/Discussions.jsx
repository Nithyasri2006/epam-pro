import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { FaHeart, FaRetweet, FaRegComment } from 'react-icons/fa';

function Discussions() {
  const [discussions, setDiscussions] = useState([
    {
      id: '1',
      title: 'Welcome to our Forum',
      content: 'This is our first discussion topic!',
      category: { name: 'General' },
      user: { username: 'admin' },
      created_at: new Date().toISOString(),
      likes: 5,
      reposts: 2,
      comments: 3
    }
  ]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', category: 'general' });
  const { user } = useAuth();

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'tech', name: 'Technology' },
    { id: 'sports', name: 'Sports' }
  ];

  const handleCreateDiscussion = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to create a discussion');
      return;
    }

    const newDiscussionObj = {
      id: String(discussions.length + 1),
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" data-aos="fade-right">Discussions</h1>

      {user && (
        <form onSubmit={handleCreateDiscussion} className="mb-8 bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={newDiscussion.category}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={newDiscussion.content}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700 transition"
            >
              Create Discussion
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            data-aos="fade-up"
          >
            <Link to={`/discussions/${discussion.id}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{discussion.title}</h2>
                  <p className="text-gray-600 mb-4">{discussion.content}</p>
                </div>
                <span className="text-sm text-primary">{discussion.category.name}</span>
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
        ))}
      </div>
    </div>
  );
}

export default Discussions;