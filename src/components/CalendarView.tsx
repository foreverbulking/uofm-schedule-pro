import { Exam } from "@/types/exam";
import { format, parseISO, isSameDay } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface CalendarViewProps {
  exams: Exam[];
}

const CalendarView = ({ exams }: CalendarViewProps) => {
  // Group exams by date
  const examsByDate = exams.reduce((acc, exam) => {
    const dateKey = exam.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  // Sort dates
  const sortedDates = Object.keys(examsByDate).sort();

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => {
        const dateExams = examsByDate[date];
        const formattedDate = format(parseISO(date), "EEEE, MMMM d, yyyy");

        return (
          <div key={date} className="space-y-3">
            <h3 className="text-lg font-semibold text-primary sticky top-0 bg-background py-2 z-10">
              {formattedDate}
            </h3>
            <div className="space-y-3 pl-4 border-l-2 border-accent">
              {dateExams.map((exam) => (
                <Card key={exam.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-primary">{exam.courseCode}</h4>
                      <p className="text-sm text-muted-foreground">{exam.courseName}</p>
                    </div>
                    <Badge variant="secondary">{exam.section}</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm mt-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accent" />
                      <span>{exam.startTime} - {exam.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      <span className="text-muted-foreground">{exam.location}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarView;
