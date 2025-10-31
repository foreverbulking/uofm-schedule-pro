import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type Exam = Database['public']['Tables']['exams']['Row'];

interface CourseSelectorProps {
  availableExams: Exam[];
  savedExamIds: string[];
  onCoursesUpdated: () => void;
}

const CourseSelector = ({ availableExams, savedExamIds, onCoursesUpdated }: CourseSelectorProps) => {
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const filteredExams = availableExams.filter((exam) => {
    const searchLower = search.toLowerCase();
    return (
      exam.course_code.toLowerCase().includes(searchLower) ||
      exam.course_name?.toLowerCase().includes(searchLower) ||
      exam.section.toLowerCase().includes(searchLower)
    );
  });

  const handleToggleCourse = async (examId: string) => {
    setAdding((prev) => ({ ...prev, [examId]: true }));

    try {
      const isSaved = savedExamIds.includes(examId);

      if (isSaved) {
        const { error } = await supabase
          .from('user_courses')
          .delete()
          .eq('exam_id', examId);

        if (error) throw error;

        toast({
          title: 'Course Removed',
          description: 'Course removed from your schedule',
        });
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
          .from('user_courses')
          .insert({
            user_id: user.id,
            exam_id: examId,
          });

        if (error) throw error;

        toast({
          title: 'Course Added',
          description: 'Course added to your schedule',
        });
      }

      onCoursesUpdated();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setAdding((prev) => ({ ...prev, [examId]: false }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredExams.map((exam) => {
          const isSaved = savedExamIds.includes(exam.id);
          const isAdding = adding[exam.id];

          return (
            <Card key={exam.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-primary">{exam.course_code}</h4>
                  <p className="text-sm text-muted-foreground">{exam.course_name}</p>
                </div>
                <Badge variant="secondary">{exam.section}</Badge>
              </div>

              <Button
                size="sm"
                variant={isSaved ? 'secondary' : 'default'}
                onClick={() => handleToggleCourse(exam.id)}
                disabled={isAdding}
                className="w-full mt-2"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Schedule
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSelector;
