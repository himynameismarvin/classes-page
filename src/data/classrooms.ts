export interface Classroom {
  id: string;
  grade: string;
  name: string;
  studentCount: number;
  classCode: string;
  hasCoTeacher?: boolean;
  isCoTeacher?: boolean;
  ssoProvider?: 'google' | 'clever';
  schoolYear: string;
  isCleverDistrictSync?: boolean;
}

export const classrooms: Classroom[] = [
  {
    id: "1",
    grade: "4TH GRADE",
    name: "Homeroom (11A) - NILSSON",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: false,
    ssoProvider: 'google',
    schoolYear: '2024-25'
  },
  {
    id: "2",
    grade: "4TH GRADE",
    name: "Homeroom (11A) - NILSSON",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: true,
    isCoTeacher: false,
    ssoProvider: 'clever',
    schoolYear: '2024-25',
    isCleverDistrictSync: true
  },
  {
    id: "3",
    grade: "3RD GRADE",
    name: "Period 2 - MATH - NILSSON",
    studentCount: 0,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: true,
    schoolYear: '2023-24'
  },
  {
    id: "4",
    grade: "3RD GRADE",
    name: "Period 2 - MATH - NILSSON",
    studentCount: 0,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: false,
    ssoProvider: 'google',
    schoolYear: '2023-24'
  },
  {
    id: "5",
    grade: "4TH GRADE",
    name: "PERIOD 3 - MATH - NILSSON",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: true,
    isCoTeacher: false,
    ssoProvider: 'clever',
    schoolYear: '2024-25',
    isCleverDistrictSync: false
  },
  {
    id: "6",
    grade: "4TH GRADE",
    name: "PERIOD 3 - MATH - NILSSON",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: false,
    schoolYear: '2024-25'
  },
  {
    id: "7",
    grade: "4TH GRADE",
    name: "Advanced Math - NILSSON",
    studentCount: 18,
    classCode: "H7K9P2L",
    hasCoTeacher: false,
    isCoTeacher: false,
    ssoProvider: 'google',
    schoolYear: '2025-26'
  },
  {
    id: "8",
    grade: "4TH GRADE",
    name: "Homeroom (11A) - NILSSON",
    studentCount: 22,
    classCode: "M4N8Q5R",
    hasCoTeacher: true,
    isCoTeacher: false,
    ssoProvider: 'clever',
    schoolYear: '2025-26',
    isCleverDistrictSync: false
  },
  {
    id: "9",
    grade: "4TH GRADE",
    name: "Geometry & Algebra - NILSSON",
    studentCount: 16,
    classCode: "T9W3E6Y",
    hasCoTeacher: false,
    isCoTeacher: false,
    schoolYear: '2025-26'
  }
];