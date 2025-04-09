import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaRetweet, FaRegComment } from 'react-icons/fa';
import { format } from 'date-fns';

function DiscussionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [discussion] = useState({
    id,
    title: 'Sample Discussion',
    content: 'This is a sample discussion content.',
    user: { username: 'user1' },
    created_at: new Date().toISOString(),
    likes: 5,
    reposts: 2
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      content: 'Great discussion!',
      user: { username: 'user2' },
      created_at: new Date().toISOString(),
      likes: 2
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to comment');
      return;
    }

    const comment = {
      id: comments.length + 1,
      content: newComment,
      user: { username: user.email },
      created_at: new Date().toISOString(),
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold mb-4">{discussion.title}</h1>
          <p className="text-gray-600 mb-4">{discussion.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>Posted by {discussion.user.username}</span>
            <span>{format(new Date(discussion.created_at), 'PPp')}</span>
          </div>
          <div className="flex gap-6 border-t pt-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 ${liked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
            >
              <FaHeart /> {discussion.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setReposted(!reposted)}
              className={`flex items-center gap-2 ${reposted ? 'text-green-600' : 'text-gray-600'} hover:text-green-600`}
            >
              <FaRetweet /> {discussion.reposts + (reposted ? 1 : 0)}
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <FaRegComment /> {comments.length}
            </div>
          </div>
        </div>

        {user && (
          <form onSubmit={handleComment} className="mb-8" data-aos="fade-up">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              required
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition"
            >
              Comment
            </button>
          </form>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg shadow-md p-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-gray-800 mb-4">{comment.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{comment.user.username}</span>
                <span>{format(new Date(comment.created_at), 'PPp')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscussionDetail;