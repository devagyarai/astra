import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  isLastStep: boolean;
}

export function NavigationControls({
  onNext,
  onPrevious,
  isNextDisabled,
  isPreviousDisabled,
  isLastStep,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mt-8 pt-6 border-t border-border/50">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="w-32"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="w-32"
      >
        {isLastStep ? "Complete" : "Next"}
        {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
