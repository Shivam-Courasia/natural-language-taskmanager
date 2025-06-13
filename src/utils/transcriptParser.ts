
import { ParsedTask } from '@/types/task';

export function parseTranscript(transcript: string): ParsedTask[] {
  console.log('Parsing transcript:', transcript);
  
  const tasks: ParsedTask[] = [];
  
  // Split transcript into sentences and clean them
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  for (const sentence of sentences) {
    // Look for task patterns with assignee mentions
    const taskPatterns = [
      // "Name you/should/need to/please [action] [details] [by/until] [time]"
      /(\w+)\s+(?:you\s+)?(?:should\s+|need\s+to\s+|please\s+)?([^.!?]*?)(?:\s+by\s+|\s+until\s+|\s+before\s+)([^.!?]+)/i,
      // "Name [action] [details] [by/until] [time]"
      /(\w+)\s+([^.!?]*?)(?:\s+by\s+|\s+until\s+|\s+before\s+)([^.!?]+)/i,
      // "Name you/should/need to/please [action] [details]" (no explicit deadline)
      /(\w+)\s+(?:you\s+)?(?:should\s+|need\s+to\s+|please\s+)([^.!?]+)/i,
    ];
    
    for (const pattern of taskPatterns) {
      const match = sentence.match(pattern);
      if (match) {
        const assignee = match[1];
        let taskDescription = match[2]?.trim();
        const deadline = match[3]?.trim();
        
        // Skip if it doesn't look like a task assignment
        if (!assignee || !taskDescription || taskDescription.length < 5) {
          continue;
        }
        
        // Clean up task description
        taskDescription = taskDescription
          .replace(/^(take\s+care\s+of\s+|take\s+|do\s+|handle\s+|work\s+on\s+)/i, '')
          .trim();
        
        // Extract priority if mentioned
        let priority: 'P1' | 'P2' | 'P3' | 'P4' = 'P3';
        const priorityMatch = taskDescription.match(/\b(P[1-4])\b/i);
        if (priorityMatch) {
          priority = priorityMatch[1].toUpperCase() as 'P1' | 'P2' | 'P3' | 'P4';
          taskDescription = taskDescription.replace(/\b(P[1-4])\b/i, '').trim();
        }
        
        // Parse deadline
        let dueDate: string | null = null;
        let dueTime: string | null = null;
        
        if (deadline) {
          const parsedDeadline = parseDeadline(deadline);
          dueDate = parsedDeadline.date;
          dueTime = parsedDeadline.time;
        }
        
        const task: ParsedTask = {
          title: taskDescription,
          assignee: assignee,
          dueDate,
          dueTime,
          priority
        };
        
        tasks.push(task);
        break; // Found a match for this sentence, move to next
      }
    }
  }
  
  console.log('Parsed tasks from transcript:', tasks);
  return tasks;
}

function parseDeadline(deadline: string): { date: string | null; time: string | null } {
  let date: string | null = null;
  let time: string | null = null;
  
  // Extract time first
  const timePatterns = [
    /\b(\d{1,2}):(\d{2})\s*(am|pm)\b/i,
    /\b(\d{1,2})\s*(am|pm)\b/i,
    /\b(\d{1,2}):\d{2}\b/
  ];
  
  for (const pattern of timePatterns) {
    const timeMatch = deadline.match(pattern);
    if (timeMatch) {
      time = timeMatch[0];
      deadline = deadline.replace(pattern, '').trim();
      break;
    }
  }
  
  // Extract date
  const datePatterns = [
    /\btomorrow\b/i,
    /\btoday\b/i,
    /\btonight\b/i,
    /\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(\d{1,2})(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)\b/i,
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(st|nd|rd|th)?\b/i,
  ];
  
  for (const pattern of datePatterns) {
    const dateMatch = deadline.match(pattern);
    if (dateMatch) {
      date = formatDeadlineDate(dateMatch[0]);
      break;
    }
  }
  
  return { date, time };
}

function formatDeadlineDate(dateString: string): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (dateString.toLowerCase() === 'today') {
    return today.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  if (dateString.toLowerCase() === 'tomorrow') {
    return tomorrow.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  if (dateString.toLowerCase() === 'tonight') {
    return today.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  // Handle day names and other formats similar to original parser
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  if (dayNames.includes(dateString.toLowerCase())) {
    const nextDate = getNextWeekday(dateString);
    return nextDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  // Handle "next [day]" format
  if (dateString.toLowerCase().startsWith('next ')) {
    const dayName = dateString.split(' ')[1];
    const nextDate = getNextWeekday(dayName);
    return nextDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  return dateString;
}

function getNextWeekday(dayName: string): Date {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const targetDay = days.indexOf(dayName.toLowerCase());
  
  if (targetDay === -1) return new Date();
  
  const today = new Date();
  const currentDay = today.getDay();
  
  let daysUntilTarget = targetDay - currentDay;
  if (daysUntilTarget <= 0) {
    daysUntilTarget += 7; // Next week
  }
  
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysUntilTarget);
  
  return targetDate;
}
