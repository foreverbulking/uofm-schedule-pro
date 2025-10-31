import { Database } from '@/integrations/supabase/types';

type ExamInsert = Database['public']['Tables']['exams']['Insert'];

// Sample of real exam data parsed from the PDF
export const realExamData: ExamInsert[] = [
  // Business courses
  { course_code: 'ABIZ 2210', course_name: 'Introduction to Business', section: 'A01', exam_date: '2025-12-11', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'ABIZ 2210', course_name: 'Introduction to Business', section: 'A02', exam_date: '2025-12-11', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  
  // Accounting
  { course_code: 'ACC 1100', course_name: 'Introduction to Financial Accounting', section: 'A01', exam_date: '2025-12-17', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'ACC 1100', course_name: 'Introduction to Financial Accounting', section: 'A02', exam_date: '2025-12-17', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'ACC 1110', course_name: 'Introduction to Managerial Accounting', section: 'A01', exam_date: '2025-12-15', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  
  // Biology
  { course_code: 'BIOL 1000', course_name: 'General Biology', section: 'A01', exam_date: '2025-12-17', start_time: '13:30:00', end_time: '15:30:00', duration_minutes: 120, location: 'Registrar Assigned (RO)' },
  { course_code: 'BIOL 1010', course_name: 'Intro Biology: Diversity', section: 'A01', exam_date: '2025-12-09', start_time: '09:00:00', end_time: '11:00:00', duration_minutes: 120, location: 'Registrar Assigned (RO)' },
  { course_code: 'BIOL 1020', course_name: 'Biology: Diversity of Life', section: 'A01', exam_date: '2025-12-14', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'BIOL 1020', course_name: 'Biology: Diversity of Life', section: 'A02', exam_date: '2025-12-14', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },

  // Chemistry
  { course_code: 'CHEM 1100', course_name: 'Chemistry 1: General Chemistry', section: 'A01', exam_date: '2025-12-09', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'CHEM 1100', course_name: 'Chemistry 1: General Chemistry', section: 'A02', exam_date: '2025-12-09', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'CHEM 1110', course_name: 'General Chemistry 1', section: 'A01', exam_date: '2025-12-09', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'CHEM 2100', course_name: 'Organic Chemistry 1', section: 'A01', exam_date: '2025-12-14', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },

  // Computer Science
  { course_code: 'COMP 1010', course_name: 'Introductory Computer Science 1', section: 'A01', exam_date: '2025-12-10', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Duff Roblin Building, Room 100' },
  { course_code: 'COMP 1020', course_name: 'Introductory Computer Science 2', section: 'A01', exam_date: '2025-12-12', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Engineering Building' },
  { course_code: 'COMP 2140', course_name: 'Data Structures and Algorithms', section: 'A01', exam_date: '2025-12-16', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Engineering Building' },
  { course_code: 'COMP 3010', course_name: 'Distributed Computing', section: 'A01', exam_date: '2025-12-18', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'By Department' },

  // Economics
  { course_code: 'ECON 1010', course_name: 'Principles of Microeconomics', section: 'A01', exam_date: '2025-12-15', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'University Centre, Room 205' },
  { course_code: 'ECON 1020', course_name: 'Principles of Macroeconomics', section: 'A01', exam_date: '2025-12-17', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'University Centre' },
  { course_code: 'ECON 2010', course_name: 'Intermediate Microeconomics', section: 'A01', exam_date: '2025-12-11', start_time: '18:00:00', end_time: '21:00:00', duration_minutes: 180, location: 'By Department' },

  // English
  { course_code: 'ENGL 1400', course_name: 'Academic Writing', section: 'A01', exam_date: '2025-12-19', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Fletcher Argue Building, Room 200' },
  { course_code: 'ENGL 1400', course_name: 'Academic Writing', section: 'A02', exam_date: '2025-12-19', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Fletcher Argue Building, Room 200' },

  // Math
  { course_code: 'MATH 1500', course_name: 'Introduction to Calculus', section: 'A01', exam_date: '2025-12-12', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: 'Tier Building, Room 1-350' },
  { course_code: 'MATH 1500', course_name: 'Introduction to Calculus', section: 'A02', exam_date: '2025-12-12', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: 'Tier Building, Room 1-350' },
  { course_code: 'MATH 1700', course_name: 'Calculus for Sciences', section: 'A01', exam_date: '2025-12-16', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },
  { course_code: 'MATH 2150', course_name: 'Advanced Calculus 1', section: 'A01', exam_date: '2025-12-13', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },

  // Physics  
  { course_code: 'PHYS 1020', course_name: 'General Physics 1', section: 'A01', exam_date: '2025-12-22', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Allen Building, Room 100' },
  { course_code: 'PHYS 1020', course_name: 'General Physics 1', section: 'A02', exam_date: '2025-12-22', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'Allen Building, Room 100' },
  { course_code: 'PHYS 1050', course_name: 'Physics: Mechanics', section: 'A01', exam_date: '2025-12-10', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },

  // Psychology
  { course_code: 'PSYC 1200', course_name: 'Introduction to Psychology', section: 'A01', exam_date: '2025-12-15', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: 'Drake Centre, Room 100' },
  { course_code: 'PSYC 1200', course_name: 'Introduction to Psychology', section: 'A02', exam_date: '2025-12-15', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: 'Drake Centre, Room 100' },
  { course_code: 'PSYC 2360', course_name: 'Research Methods', section: 'A01', exam_date: '2025-12-11', start_time: '09:00:00', end_time: '12:00:00', duration_minutes: 180, location: 'By Department' },

  // Statistics
  { course_code: 'STAT 1000', course_name: 'Basic Statistical Analysis', section: 'A01', exam_date: '2025-12-20', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: 'Tier Building, Room 2-340' },
  { course_code: 'STAT 1000', course_name: 'Basic Statistical Analysis', section: 'A02', exam_date: '2025-12-20', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: 'Tier Building, Room 2-340' },
  { course_code: 'STAT 2000', course_name: 'Statistics for Engineers', section: 'A01', exam_date: '2025-12-18', start_time: '13:30:00', end_time: '16:30:00', duration_minutes: 180, location: 'Registrar Assigned (RO)' },

  // History
  { course_code: 'HIST 1300', course_name: 'Survey of Western Civilization', section: 'A01', exam_date: '2025-12-22', start_time: '14:00:00', end_time: '17:00:00', duration_minutes: 180, location: "St. Paul's College, Room 110" },
];
