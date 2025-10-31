import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, List } from "lucide-react";

interface ExamFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "list" | "calendar";
  onViewModeChange: (mode: "list" | "calendar") => void;
}

const ExamFilters = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: ExamFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by course code or name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
          className="gap-2"
        >
          <List className="w-4 h-4" />
          List
        </Button>
        <Button
          variant={viewMode === "calendar" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("calendar")}
          className="gap-2"
        >
          <Calendar className="w-4 h-4" />
          Calendar
        </Button>
      </div>
    </div>
  );
};

export default ExamFilters;
