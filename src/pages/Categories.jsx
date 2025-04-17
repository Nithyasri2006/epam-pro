import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Categories() {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Technology', description: 'Discuss the latest tech trends' },
    { id: '2', name: 'Sports', description: 'All about sports and athletics' },
    { id: '3', name: 'Music', description: 'Share your musical interests' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const { user } = useAuth();

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to create a category');
      return;
    }

    const newCategoryObj = {
      id: String(categories.length + 1),
      name: newCategory,
      description: 'New category description'
    };

    setCategories([...categories, newCategoryObj]);
    setNewCategory('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      {user && (
        <form onSubmit={handleCreateCategory} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition"
            >
              Create Category
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;