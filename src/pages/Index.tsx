import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ExamCard from "@/components/ExamCard";
import ExamFilters from "@/components/ExamFilters";
import CalendarView from "@/components/CalendarView";
import CourseSelector from "@/components/CourseSelector";
import { GraduationCap, LogOut, Plus, Loader2 } from "lucide-react";
import { isSameDay, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { realExamData } from "@/utils/parseExamData";
import { Database } from "@/integrations/supabase/types";

type Exam = Database['public']['Tables']['exams']['Row'];
type UserCourse = Database['public']['Tables']['user_courses']['Row'];

const IndexNew = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [exams, setExams] = useState<Exam[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataInitialized, setDataInitialized] = useState(false);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Initialize exam data if empty
  useEffect(() => {
    const initializeExamData = async () => {
      if (dataInitialized) return;

      const { count } = await supabase.from('exams').select('*', { count: 'exact', head: true });

      if (count === 0) {
        const { error } = await supabase.from('exams').insert(realExamData);
        if (error) {
          console.error('Error initializing exam data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load exam schedule',
            variant: 'destructive',
          });
        }
      }
      setDataInitialized(true);
    };

    if (user) {
      initializeExamData();
    }
  }, [user, dataInitialized, toast]);

  // Fetch exams and user courses
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all exams
        const { data: examsData, error: examsError } = await supabase
          .from('exams')
          .select('*')
          .order('exam_date', { ascending: true });

        if (examsError) throw examsError;
        setExams(examsData || []);

        // Fetch user's saved courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('user_courses')
          .select('*');

        if (coursesError) throw coursesError;
        setUserCourses(coursesData || []);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  const savedExamIds = userCourses.map(uc => uc.exam_id);
  
  // Show only user's saved courses
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const isSaved = savedExamIds.includes(exam.id);
      if (!isSaved) return false;

      const searchLower = searchQuery.toLowerCase();
      return (
        exam.course_code.toLowerCase().includes(searchLower) ||
        exam.course_name?.toLowerCase().includes(searchLower)
      );
    });
  }, [exams, savedExamIds, searchQuery]);

  // Detect conflicts
  const examConflicts = useMemo(() => {
    const conflicts: Record<string, boolean> = {};

    filteredExams.forEach((exam, index) => {
      filteredExams.slice(index + 1).forEach((otherExam) => {
        if (isSameDay(parseISO(exam.exam_date), parseISO(otherExam.exam_date))) {
          const examStart = exam.start_time;
          const examEnd = exam.end_time;
          const otherStart = otherExam.start_time;
          const otherEnd = otherExam.end_time;

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-10 h-10" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  University of Manitoba
                </h1>
                <p className="text-primary-foreground/90 mt-1">My Exam Schedule</p>
              </div>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">My Courses</h3>
            <p className="text-3xl font-bold text-primary mt-2">{filteredExams.length}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Exam Period</h3>
            <p className="text-3xl font-bold text-accent mt-2">Dec 9-22</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Conflicts Detected</h3>
            <p className="text-3xl font-bold text-destructive mt-2">{conflictCount}</p>
          </div>
        </div>

        {/* Add Course Button */}
        <div className="mb-4 flex justify-end">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Courses
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Add Courses to Schedule</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <CourseSelector
                  availableExams={exams}
                  savedExamIds={savedExamIds}
                  onCoursesUpdated={async () => {
                    const { data } = await supabase.from('user_courses').select('*');
                    setUserCourses(data || []);
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        {filteredExams.length > 0 && (
          <div className="mb-8">
            <ExamFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        )}

        {/* Exam Display */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              You haven't added any courses yet.
            </p>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your Courses
            </Button>
          </div>
        ) : viewMode === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={{
                  id: exam.id,
                  courseCode: exam.course_code,
                  courseName: exam.course_name || '',
                  section: exam.section,
                  date: exam.exam_date,
                  startTime: exam.start_time,
                  endTime: exam.end_time,
                  duration: exam.duration_minutes,
                  location: exam.location,
                  instructor: '',
                }}
                hasConflict={examConflicts[exam.id]}
              />
            ))}
          </div>
        ) : (
          <CalendarView
            exams={filteredExams.map(exam => ({
              id: exam.id,
              courseCode: exam.course_code,
              courseName: exam.course_name || '',
              section: exam.section,
              date: exam.exam_date,
              startTime: exam.start_time,
              endTime: exam.end_time,
              duration: exam.duration_minutes,
              location: exam.location,
              instructor: '',
            }))}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 mt-16 py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 University of Manitoba - Exam Scheduler</p>
          <p className="mt-1">Powered by Lovable Cloud</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexNew;
