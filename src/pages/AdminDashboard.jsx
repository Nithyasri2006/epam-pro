import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaBan, FaCheck } from 'react-icons/fa';

function AdminDashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState([
    { id: 1, type: 'discussion', content: 'Inappropriate content', status: 'pending' },
    { id: 2, type: 'comment', content: 'Spam', status: 'resolved' },
  ]);
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com', status: 'active' },
    { id: 2, email: 'user2@example.com', status: 'banned' },
  ]);

  const handleReport = (id, action) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: action } : report
    ));
  };

  const handleUser = (id, action) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: action } : user
    ));
  };

  if (!user || user.email !== 'admin@example.com') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" data-aos="fade-right">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4">Reported Content</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{report.type}</p>
                    <p className="text-gray-600">{report.content}</p>
                    <span className={`text-sm ${
                      report.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReport(report.id, 'resolved')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReport(report.id, 'deleted')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{user.email}</p>
                    <span className={`text-sm ${
                      user.status === 'active' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUser(user.id, user.status === 'active' ? 'banned' : 'active')}
                      className={`p-2 ${
                        user.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
                      } rounded`}
                    >
                      {user.status === 'active' ? <FaBan /> : <FaCheck />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;