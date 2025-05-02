import React from 'react';
import { CategoryFilter } from '../types';

interface CategoryNavProps {
  currentCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

export function CategoryNav({ currentCategory, onCategoryChange }: CategoryNavProps) {
  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'department', label: 'Department' },
    { id: 'training', label: 'Training & Placement' },
  ];

  return (
    <nav className="bg-white shadow-sm mt-1">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-3 py-4 text-sm font-medium ${
                currentCategory === category.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}