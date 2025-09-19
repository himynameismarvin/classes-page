import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import { useState } from 'react';

interface CoTeacher {
  id: string;
  name: string;
  email: string;
}

interface CoTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  coTeachers: CoTeacher[];
  onAddCoTeacher: (name: string, email: string) => void;
  onRemoveCoTeacher: (id: string) => void;
  isCoTeacher?: boolean;
  primaryTeacher?: string;
  primaryTeacherEmail?: string;
}

export default function CoTeacherModal({
  isOpen,
  onClose,
  className,
  coTeachers,
  onAddCoTeacher,
  onRemoveCoTeacher,
  isCoTeacher = false,
  primaryTeacher,
  primaryTeacherEmail
}: CoTeacherModalProps) {
  // When user is a co-teacher, we'll show other co-teachers and the user separately
  // This ensures we respect the 2 co-teacher limit
  const otherCoTeachers = isCoTeacher ? coTeachers : coTeachers;
  const currentUser = {
    id: 'current-user',
    name: 'Elizabeth Nilsson',
    email: 'e.nilsson@prodigy.edu'
  };
  const [isAddingCoTeacher, setIsAddingCoTeacher] = useState(false);
  const [newCoTeacherName, setNewCoTeacherName] = useState('');
  const [newCoTeacherEmail, setNewCoTeacherEmail] = useState('');

  if (!isOpen || typeof window === 'undefined') return null;

  const handleAddCoTeacher = () => {
    if (newCoTeacherName.trim() && newCoTeacherEmail.trim()) {
      onAddCoTeacher(newCoTeacherName.trim(), newCoTeacherEmail.trim());
      setNewCoTeacherName('');
      setNewCoTeacherEmail('');
      setIsAddingCoTeacher(false);
    }
  };

  const canAddMoreCoTeachers = true; // No limit on co-teachers

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isCoTeacher ? 'Co-teachers in ' : 'Manage co-teachers in '}{className}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isCoTeacher ? (
            <>
              {primaryTeacher && (
                <div className="flex items-center mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-700 font-medium text-sm">
                      {primaryTeacher.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Primary Teacher</div>
                    <div className="text-sm text-gray-600">{primaryTeacher}</div>
                    {primaryTeacherEmail && (
                      <div className="text-sm text-gray-600">{primaryTeacherEmail}</div>
                    )}
                  </div>
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Co-teachers
              </h3>
              <p className="text-gray-600 mb-6">
                Co-teachers have the same control over content but cannot delete classrooms or manage co-teachers.
              </p>
            </>
          ) : (
            <>
              {primaryTeacher && (
                <div className="flex items-center mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-700 font-medium text-sm">
                      {primaryTeacher.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Primary Teacher</div>
                    <div className="text-sm text-gray-600">Elizabeth Nilsson <span className="text-gray-500 italic">(You)</span></div>
                  </div>
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                You have {coTeachers.length} co-teacher{coTeachers.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-gray-600 mb-6">
                Plan and organize your class instruction with your co-teachers. Co-teachers have the same class permissions as you. They can set up assignments, view reports, and more. They don't have access to your account settings.
              </p>
            </>
          )}

          {/* Add Co-teacher Button */}
          {!isCoTeacher && canAddMoreCoTeachers && !isAddingCoTeacher && (
            <button
              onClick={() => setIsAddingCoTeacher(true)}
              className="flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg transition-colors mb-6"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              <span>Add a co-teacher</span>
            </button>
          )}

          {/* Add Co-teacher Form */}
          {isAddingCoTeacher && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newCoTeacherName}
                    onChange={(e) => setNewCoTeacherName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newCoTeacherEmail}
                    onChange={(e) => setNewCoTeacherEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddCoTeacher}
                    disabled={!newCoTeacherName.trim() || !newCoTeacherEmail.trim()}
                    className="bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Co-teacher
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCoTeacher(false);
                      setNewCoTeacherName('');
                      setNewCoTeacherEmail('');
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Co-teacher List */}
          <div className="space-y-3">
            {isCoTeacher && (
              <div
                key="current-user"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {currentUser.name} <span className="text-gray-500 italic ml-1">(You)</span>
                    </div>
                    <div className="text-sm text-gray-600">{currentUser.email}</div>
                  </div>
                </div>
              </div>
            )}

            {otherCoTeachers.map((coTeacher) => (
              <div
                key={coTeacher.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {coTeacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{coTeacher.name}</div>
                    <div className="text-sm text-gray-600">{coTeacher.email}</div>
                  </div>
                </div>
                {!isCoTeacher && (
                  <button
                    onClick={() => onRemoveCoTeacher(coTeacher.id)}
                    className="text-red-600 hover:text-red-700 px-3 py-1 border border-red-600 hover:border-red-700 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {!isCoTeacher && coTeachers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No co-teachers added yet
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}