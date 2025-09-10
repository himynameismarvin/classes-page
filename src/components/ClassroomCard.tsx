import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUsers, faUserTie, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faFileArchive, faTrashCan, faAddressCard, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ClassroomCardProps {
  grade: string;
  name: string;
  studentCount: number;
  classCode: string;
  hasCoTeacher?: boolean;
  openMenuId?: string | null;
  onMenuToggle?: (cardId: string) => void;
  cardId: string;
  ssoProvider?: 'google' | 'clever';
  schoolYear: string;
}

export default function ClassroomCard({ 
  grade, 
  name, 
  studentCount, 
  classCode, 
  hasCoTeacher = false,
  openMenuId = null,
  onMenuToggle,
  cardId,
  ssoProvider,
  schoolYear
}: ClassroomCardProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = openMenuId === cardId;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        onMenuToggle?.(cardId);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, cardId, onMenuToggle]);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow max-w-sm">
      {/* Header with grade badge and settings */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
            {grade}
          </div>
          {ssoProvider && (
            <div 
              className="flex items-center justify-center w-5 h-5 rounded-sm"
              title={`Synced with ${ssoProvider === 'google' ? 'Google Classroom' : 'Clever'}`}
            >
              {ssoProvider === 'google' ? (
                <Image
                  src="/images/Google_Classroom_Logo.svg.png"
                  alt="Google Classroom"
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-sm"
                />
              ) : (
                <Image
                  src="/images/Mark-Blue copy.png"
                  alt="Clever"
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-sm"
                />
              )}
            </div>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => onMenuToggle?.(cardId)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-2">
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                  <span>Edit class</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <FontAwesomeIcon icon={faFileArchive} className="w-4 h-4" />
                  <span>Archive class</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 text-left">
                  <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
                  <span>Delete class</span>
                </button>
                <hr className="my-2" />
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <FontAwesomeIcon icon={faAddressCard} className="w-4 h-4" />
                  <span>Manage students</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  <span>Invite parents</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                  <span>Manage co-teachers</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Class Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4 h-14 overflow-hidden leading-7" 
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
        {name}
      </h3>

      {/* Student Count */}
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-gray-600 mr-2" />
        <span className="text-gray-700">
          {studentCount === 0 ? (
            <span className="text-red-600 font-medium">0 students</span>
          ) : (
            <span className="text-teal-600 font-medium">{studentCount} students</span>
          )}
        </span>
        {hasCoTeacher && (
          <>
            <FontAwesomeIcon icon={faUserTie} className="w-5 h-5 text-gray-600 ml-4 mr-1" />
            <span className="text-gray-700">1 co-teacher</span>
          </>
        )}
      </div>

      {/* Class Code */}
      <p className="text-gray-600 mb-2">
        Class code: <span className="font-mono font-medium">{classCode}</span>
      </p>

      {/* School Year */}
      <p className="text-gray-600 mb-6">
        School year: <span className="font-medium">{schoolYear}</span>
      </p>

      {/* Enter Class Button */}
      <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        Enter class
      </button>
    </div>
  );
}