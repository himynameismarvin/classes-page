"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpDown, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import ClassroomCard from "./ClassroomCard";
import { classrooms } from "@/data/classrooms";

export default function MainContent() {
  const [sortBy, setSortBy] = useState("School year");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = ["School year", "Date created", "Grade", "A to Z"];

  const handleMenuToggle = (cardId: string) => {
    setOpenMenuId(openMenuId === cardId ? null : cardId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const sortedClassrooms = useMemo(() => {
    const sorted = [...classrooms].sort((a, b) => {
      switch (sortBy) {
        case "School year":
          return b.schoolYear.localeCompare(a.schoolYear);
        case "Date created":
          return parseInt(b.id) - parseInt(a.id);
        case "Grade":
          return a.grade.localeCompare(b.grade);
        case "A to Z":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return sorted;
  }, [sortBy]);

  const groupedBySchoolYear = useMemo(() => {
    if (sortBy !== "School year") return null;
    
    const groups: { [key: string]: typeof classrooms } = {};
    sortedClassrooms.forEach(classroom => {
      if (!groups[classroom.schoolYear]) {
        groups[classroom.schoolYear] = [];
      }
      groups[classroom.schoolYear].push(classroom);
    });
    
    const sortedGroups = Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map(schoolYear => ({
        schoolYear,
        classrooms: groups[schoolYear].sort((a, b) => a.name.localeCompare(b.name))
      }));
    
    return sortedGroups;
  }, [sortedClassrooms, sortBy]);

  const groupedByGrade = useMemo(() => {
    if (sortBy !== "Grade") return null;
    
    const groups: { [key: string]: typeof classrooms } = {};
    sortedClassrooms.forEach(classroom => {
      if (!groups[classroom.grade]) {
        groups[classroom.grade] = [];
      }
      groups[classroom.grade].push(classroom);
    });
    
    const sortedGroups = Object.keys(groups)
      .sort((a, b) => a.localeCompare(b))
      .map(grade => ({
        grade,
        classrooms: groups[grade].sort((a, b) => a.name.localeCompare(b.name))
      }));
    
    return sortedGroups;
  }, [sortedClassrooms, sortBy]);

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen max-w-7xl overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
        
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faUpDown} className="w-4 h-4" />
              <span>{sortBy}</span>
              <FontAwesomeIcon icon={faCaretDown} className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create Class Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            <span>Create class</span>
          </button>
        </div>
      </div>

      {/* Classes Display */}
      {sortBy === "School year" && groupedBySchoolYear ? (
        <div className="space-y-8">
          {groupedBySchoolYear.map(({ schoolYear, classrooms }, groupIndex) => (
            <div key={schoolYear}>
              {groupIndex > 0 && <div className="border-t border-gray-200 mb-8" />}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  SY {schoolYear}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {classrooms.map((classroom) => (
                  <ClassroomCard
                    key={classroom.id}
                    cardId={classroom.id.toString()}
                    grade={classroom.grade}
                    name={classroom.name}
                    studentCount={classroom.studentCount}
                    classCode={classroom.classCode}
                    hasCoTeacher={classroom.hasCoTeacher}
                    ssoProvider={classroom.ssoProvider}
                    schoolYear={classroom.schoolYear}
                    openMenuId={openMenuId}
                    onMenuToggle={handleMenuToggle}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : sortBy === "Grade" && groupedByGrade ? (
        <div className="space-y-8">
          {groupedByGrade.map(({ grade, classrooms }, groupIndex) => (
            <div key={grade}>
              {groupIndex > 0 && <div className="border-t border-gray-200 mb-8" />}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {grade}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {classrooms.map((classroom) => (
                  <ClassroomCard
                    key={classroom.id}
                    cardId={classroom.id.toString()}
                    grade={classroom.grade}
                    name={classroom.name}
                    studentCount={classroom.studentCount}
                    classCode={classroom.classCode}
                    hasCoTeacher={classroom.hasCoTeacher}
                    ssoProvider={classroom.ssoProvider}
                    schoolYear={classroom.schoolYear}
                    openMenuId={openMenuId}
                    onMenuToggle={handleMenuToggle}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {sortedClassrooms.map((classroom) => (
            <ClassroomCard
              key={classroom.id}
              cardId={classroom.id.toString()}
              grade={classroom.grade}
              name={classroom.name}
              studentCount={classroom.studentCount}
              classCode={classroom.classCode}
              hasCoTeacher={classroom.hasCoTeacher}
              ssoProvider={classroom.ssoProvider}
              schoolYear={classroom.schoolYear}
              openMenuId={openMenuId}
              onMenuToggle={handleMenuToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}