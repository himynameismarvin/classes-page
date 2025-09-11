"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; grade: string; schoolYear: string }) => void;
  initialData: {
    name: string;
    grade: string;
    schoolYear: string;
  };
}

const gradeOptions = [
  "1st grade", 
  "2nd grade",
  "3rd grade",
  "4th grade",
  "5th grade",
  "6th grade",
  "7th grade",
  "8th grade"
];

const schoolYearOptions = [
  "2022-23",
  "2023-24", 
  "2024-25",
  "2025-26"
];

// Convert from storage format (e.g., "2ND GRADE") to display format (e.g., "2nd grade")
const convertToDisplayFormat = (grade: string): string => {
  return grade.toLowerCase();
};

// Convert from display format (e.g., "2nd grade") to storage format (e.g., "2ND GRADE")
const convertToStorageFormat = (grade: string): string => {
  return grade.toUpperCase();
};

export default function EditClassModal({ isOpen, onClose, onSave, initialData }: EditClassModalProps) {
  const [formData, setFormData] = useState(initialData);

  // Update form data when initialData changes
  useEffect(() => {
    setFormData({
      ...initialData,
      grade: convertToDisplayFormat(initialData.grade)
    });
  }, [initialData]);

  if (!isOpen || typeof window === 'undefined') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      grade: convertToStorageFormat(formData.grade)
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      ...initialData,
      grade: convertToDisplayFormat(initialData.grade)
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Class</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-2">
              Class Name
            </label>
            <input
              type="text"
              id="className"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
              Grade
            </label>
            <select
              id="grade"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            >
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="schoolYear" className="block text-sm font-medium text-gray-700 mb-2">
              School Year
            </label>
            <select
              id="schoolYear"
              value={formData.schoolYear}
              onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            >
              {schoolYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}