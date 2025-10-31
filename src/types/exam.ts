export interface Exam {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  duration: number;
  instructor: string;
  section: string;
}

export interface ExamConflict {
  examId: string;
  conflictsWith: string[];
}
