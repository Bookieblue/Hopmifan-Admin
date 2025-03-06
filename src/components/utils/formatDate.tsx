import { format, parseISO } from "date-fns";

export const formatDate = (isoString?: string) => {
  if (!isoString) return "Invalid date"; // Handle undefined/null cases

  try {
    return format(parseISO(isoString), "MMMM d, yyyy - h:mm a"); 
    // Example output: February 6, 2025 - 3:18 PM
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};
