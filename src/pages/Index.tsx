import { useState, useMemo } from "react";
import { dummyExams } from "@/data/dummyExams";
import ExamCard from "@/components/ExamCard";
import ExamFilters from "@/components/ExamFilters";
import CalendarView from "@/components/CalendarView";
import { GraduationCap } from "lucide-react";
import { isSameDay, parseISO } from "date-fns";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  // Filter exams based on search
  const filteredExams = useMemo(() => {
    return dummyExams.filter((exam) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        exam.courseCode.toLowerCase().includes(searchLower) ||
        exam.courseName.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  // Detect conflicts (same date and overlapping times)
  const examConflicts = useMemo(() => {
    const conflicts: Record<string, boolean> = {};
    
    filteredExams.forEach((exam, index) => {
      filteredExams.slice(index + 1).forEach((otherExam) => {
        if (isSameDay(parseISO(exam.date), parseISO(otherExam.date))) {
          // Check for time overlap
          const examStart = exam.startTime;
          const examEnd = exam.endTime;
          const otherStart = otherExam.startTime;
          const otherEnd = otherExam.endTime;

          if (
            (examStart >= otherStart && examStart < otherEnd) ||
            (examEnd > otherStart && examEnd <= otherEnd) ||
            (otherStart >= examStart && otherStart < examEnd)
          ) {
            conflicts[exam.id] = true;
            conflicts[otherExam.id] = true;
          }
        }
      });
    });

    return conflicts;
  }, [filteredExams]);

  const conflictCount = Object.keys(examConflicts).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-10 h-10" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                University of Manitoba
              </h1>
              <p className="text-primary-foreground/90 mt-1">Exam Scheduler</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Exams</h3>
            <p className="text-3xl font-bold text-primary mt-2">{filteredExams.length}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Exam Period</h3>
            <p className="text-3xl font-bold text-accent mt-2">Dec 10-22</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Conflicts Detected</h3>
            <p className="text-3xl font-bold text-destructive mt-2">{conflictCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ExamFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Exam Display */}
        {filteredExams.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No exams found matching your search.</p>
          </div>
        ) : viewMode === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                hasConflict={examConflicts[exam.id]}
              />
            ))}
          </div>
        ) : (
          <CalendarView exams={filteredExams} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 mt-16 py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 University of Manitoba - Exam Scheduler</p>
          <p className="mt-1">For academic planning purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
