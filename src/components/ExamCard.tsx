import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Exam } from "@/types/exam";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface ExamCardProps {
  exam: Exam;
  hasConflict?: boolean;
}

const ExamCard = ({ exam, hasConflict = false }: ExamCardProps) => {
  const formattedDate = format(new Date(exam.date), "EEEE, MMMM d, yyyy");
  
  return (
    <Card className={`p-6 hover:shadow-lg transition-all duration-300 ${hasConflict ? 'border-destructive border-2' : ''}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-primary">{exam.courseCode}</h3>
            <p className="text-sm text-muted-foreground mt-1">{exam.courseName}</p>
          </div>
          <Badge variant={hasConflict ? "destructive" : "secondary"} className="ml-2">
            {exam.section}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-accent" />
            <span>{exam.startTime} - {exam.endTime}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{exam.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-accent" />
            <span>{exam.instructor}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Duration: {exam.duration} minutes</span>
        </div>

        {hasConflict && (
          <div className="text-sm text-destructive font-medium">
            ⚠️ Exam conflict detected
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExamCard;
