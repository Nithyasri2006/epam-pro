import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaRetweet, FaRegComment, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';

function DiscussionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  useEffect(() => {
    // Load discussion from localStorage
    const savedDiscussions = JSON.parse(localStorage.getItem('forumDiscussions') || '[]');
    const foundDiscussion = savedDiscussions.find(d => d.id === id);
    if (foundDiscussion) {
      setDiscussion(foundDiscussion);
    }

    // Load comments from localStorage
    const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
    setComments(savedComments);
  }, [id]);

  useEffect(() => {
    // Save comments to localStorage whenever they change
    if (comments.length > 0) {
      localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
    }
  }, [comments, id]);

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to comment');
      return;
    }

    const comment = {
      id: Date.now().toString(),
      content: newComment,
      user: { username: user.email },
      created_at: new Date().toISOString(),
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');

    // Update discussion comments count in localStorage
    const savedDiscussions = JSON.parse(localStorage.getItem('forumDiscussions') || '[]');
    const updatedDiscussions = savedDiscussions.map(d => 
      d.id === id ? { ...d, comments: (d.comments || 0) + 1 } : d
    );
    localStorage.setItem('forumDiscussions', JSON.stringify(updatedDiscussions));
  };

  const handleLike = () => {
    if (!user) {
      alert('Please sign in to like discussions');
      return;
    }
    setLiked(!liked);
    
    // Update likes in localStorage
    const savedDiscussions = JSON.parse(localStorage.getItem('forumDiscussions') || '[]');
    const updatedDiscussions = savedDiscussions.map(d => 
      d.id === id ? { ...d, likes: d.likes + (liked ? -1 : 1) } : d
    );
    localStorage.setItem('forumDiscussions', JSON.stringify(updatedDiscussions));
  };

  const handleRepost = () => {
    if (!user) {
      alert('Please sign in to repost discussions');
      return;
    }
    setReposted(!reposted);
    
    // Update reposts in localStorage
    const savedDiscussions = JSON.parse(localStorage.getItem('forumDiscussions') || '[]');
    const updatedDiscussions = savedDiscussions.map(d => 
      d.id === id ? { ...d, reposts: d.reposts + (reposted ? -1 : 1) } : d
    );
    localStorage.setItem('forumDiscussions', JSON.stringify(updatedDiscussions));
  };

  if (!discussion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600">Discussion not found</p>
          <button
            onClick={() => navigate('/discussions')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition"
          >
            Back to Discussions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/discussions')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft /> Back to Discussions
      </button>
      
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
              onClick={handleLike}
              className={`flex items-center gap-2 ${liked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
            >
              <FaHeart /> {discussion.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={handleRepost}
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