export function formatEventDateTime(dateString?: string, timeString?: string) {
    if (!dateString || !timeString) {
      console.error("Error formatting date/time: Missing date or time string", { dateString, timeString });
      return "Invalid Date/Time"; // Fallback
    }
  
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date format");
  
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
  
      const formattedTime = new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
  
      return `${formattedDate} ${formattedTime}`;
    } catch (error) {
      console.error("Error formatting date/time:", error);
      return "Invalid Date/Time";
    }
  }
  