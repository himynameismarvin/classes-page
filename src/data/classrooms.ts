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
}

export const classrooms: Classroom[] = [
  {
    id: "1",
    grade: "2ND GRADE",
    name: "Homeroom (11A)",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: false,
    ssoProvider: 'google',
    schoolYear: '2024-25'
  },
  {
    id: "2",
    grade: "2ND GRADE", 
    name: "Homeroom (11A)",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: true,
    isCoTeacher: false,
    ssoProvider: 'clever',
    schoolYear: '2024-25'
  },
  {
    id: "3",
    grade: "2ND GRADE",
    name: "Period 2 - MATH - WHITEHURST",
    studentCount: 0,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: true,
    schoolYear: '2023-24'
  },
  {
    id: "4",
    grade: "3RD GRADE",
    name: "Period 2 - MATH - WHITEHURST", 
    studentCount: 0,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: false,
    ssoProvider: 'google',
    schoolYear: '2023-24'
  },
  {
    id: "5",
    grade: "1ST GRADE",
    name: "PERIOD 3 - MATH - WHITEHURST",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: true,
    isCoTeacher: false,
    ssoProvider: 'clever',
    schoolYear: '2024-25'
  },
  {
    id: "6",
    grade: "2ND GRADE",
    name: "PERIOD 3 - MATH - WHITEHURST",
    studentCount: 11,
    classCode: "X32QM9K",
    hasCoTeacher: false,
    isCoTeacher: false,
    schoolYear: '2024-25'
  }
];