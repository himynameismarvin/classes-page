import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserTie, faUserPlus, faUsers, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashCan, faEnvelope, faFolderOpen, faUser, faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ClassroomCardProps {
  grade: string;
  name: string;
  studentCount: number;
  classCode: string;
  hasCoTeacher?: boolean;
  openMenuId?: string | null;
  onMenuToggle?: (cardId: string) => void;
  onEditClass?: (cardId: string) => void;
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
  onEditClass,
  cardId,
  ssoProvider,
  schoolYear
}: ClassroomCardProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoIconRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = openMenuId === cardId;
  const [showTooltip, setShowTooltip] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const handleMenuToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.right - 224, // 224px = w-56 (14rem * 16px)
        y: rect.bottom + 8
      });
    }
    onMenuToggle?.(cardId);
  };

  const handleTooltipShow = () => {
    if (infoIconRef.current) {
      const rect = infoIconRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8
      });
    }
    setShowTooltip(true);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow max-w-sm flex flex-col relative">
      <div className="p-6 flex-1 overflow-hidden rounded-t-lg">
        {/* Header with grade, year, SSO icon and settings */}
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            {grade}
          </div>
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            {schoolYear}
          </div>
          {ssoProvider && (
            <div 
              className="flex items-center justify-center w-6 h-6 rounded-sm"
              title={`Synced with ${ssoProvider === 'google' ? 'Google Classroom' : 'Clever'}`}
            >
              {ssoProvider === 'google' ? (
                <Image
                  src="/images/Google_Classroom_Logo.svg.png"
                  alt="Google Classroom"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-sm"
                />
              ) : (
                <Image
                  src="/images/Mark-Blue copy.png"
                  alt="Clever"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-sm"
                />
              )}
            </div>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button 
            ref={buttonRef}
            onClick={handleMenuToggle}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
          </button>
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
        <span className="text-gray-600">
          {studentCount === 0 ? (
            <span className="text-red-600">0 students</span>
          ) : (
            <span>{studentCount} students</span>
          )}
        </span>
        {hasCoTeacher && (
          <>
            <FontAwesomeIcon icon={faUserTie} className="w-5 h-5 text-gray-600 ml-4 mr-1" />
            <span className="text-gray-600">1 co-teacher</span>
          </>
        )}
      </div>

      {/* Class Code */}
      <p className="text-gray-600 mb-6">
        Class code: <span className="font-mono font-medium">{classCode}</span>
      </p>

        {/* Enter Class Button */}
        <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Enter class
        </button>
      </div>

      {/* Co-teacher Indicator */}
      {hasCoTeacher && (
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-center space-x-2 text-gray-600 -mt-2 relative rounded-b-lg">
          <span className="text-sm">You are a co-teacher</span>
          <div 
            ref={infoIconRef}
            className="relative"
            onMouseEnter={handleTooltipShow}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 text-gray-400 cursor-help" />
          </div>
        </div>
      )}
      
      {/* Portal Menu */}
      {isMenuOpen && typeof window !== 'undefined' && createPortal(
        <div 
          ref={menuRef}
          className="fixed w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          style={{
            left: menuPosition.x,
            top: menuPosition.y
          }}
        >
          <div className="py-2">
            <button 
              onClick={() => onEditClass?.(cardId)}
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left"
            >
              <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
              <span>Edit class</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
              <FontAwesomeIcon icon={faFolderOpen} className="w-4 h-4" />
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
              <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
              <span>Manage co-teachers</span>
            </button>
          </div>
        </div>,
        document.body
      )}
      
      {/* Portal Tooltip */}
      {showTooltip && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed px-3 py-2 bg-white text-gray-700 text-sm rounded-lg shadow-lg border border-gray-200 whitespace-nowrap z-50 transform -translate-x-1/2"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          Co-teachers have the same control over content but cannot delete classrooms
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
        </div>,
        document.body
      )}
    </div>
  );
}