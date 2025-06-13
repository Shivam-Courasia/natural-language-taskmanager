
import { ParsedTask } from '@/types/task';

export function parseTranscript(transcript: string): ParsedTask[] {
  console.log('Parsing transcript:', transcript);
  
  const tasks: ParsedTask[] = [];
  
  // Split transcript into sentences and clean them
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  console.log('Split sentences:', sentences);
  
  for (const sentence of sentences) {
    // Look for task patterns - more flexible patterns
    const taskPatterns = [
      // "Name you/should/need to/please [action] [details] [by/until/at] [time]"
      /^(\w+)\s+(?:you\s+)?(?:should\s+|need\s+to\s+|please\s+)?(.+?)(?:\s+(?:by|until|before|at)\s+(.+))?$/i,
      // "Name [action] [details] [by/until/at] [time]"
      /^(\w+)\s+(.+?)(?:\s+(?:by|until|before|at)\s+(.+))?$/i,
    ];
    
    for (const pattern of taskPatterns) {
      const match = sentence.match(pattern);
      console.log('Testing pattern against sentence:', sentence, 'Match:', match);
      
      if (match) {
        const assignee = match[1];
        let taskDescription = match[2]?.trim();
        const deadline = match[3]?.trim();
        
        // Skip if it doesn't look like a task assignment
        if (!assignee || !taskDescription || taskDescription.length < 3) {
          console.log('Skipping - insufficient data:', { assignee, taskDescription });
          continue;
        }
        
        // Clean up task description - remove common prefixes
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
          title: taskDescription || 'New Task',
          assignee: assignee,
          dueDate,
          dueTime,
          priority
        };
        
        console.log('Created task:', task);
        tasks.push(task);
        break; // Found a match for this sentence, move to next
      }
    }
  }
  
  console.log('Final parsed tasks from transcript:', tasks);
  return tasks;
}

function parseDeadline(deadline: string): { date: string | null; time: string | null } {
  console.log('Parsing deadline:', deadline);
  
  let date: string | null = null;
  let time: string | null = null;
  
  // Extract time first - improved patterns
  const timePatterns = [
    /\b(\d{1,2}):(\d{2})\s*(am|pm)\b/i,
    /\b(\d{1,2})\s*(am|pm)\b/i,
    /\b(\d{1,2}):\d{2}\b/,
    /\b(\d{1,2})\s*pm\b/i,
    /\b(\d{1,2})\s*am\b/i
  ];
  
  for (const pattern of timePatterns) {
    const timeMatch = deadline.match(pattern);
    if (timeMatch) {
      time = timeMatch[0];
      deadline = deadline.replace(pattern, '').trim();
      console.log('Found time:', time, 'Remaining deadline:', deadline);
      break;
    }
  }
  
  // Extract date - improved patterns
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
      console.log('Found date:', date);
      break;
    }
  }
  
  // If no specific date found but we have remaining text, use it as date
  if (!date && deadline.trim()) {
    date = formatDeadlineDate(deadline.trim());
  }
  
  console.log('Parsed deadline result:', { date, time });
  return { date, time };
}

function formatDeadlineDate(dateString: string): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const lowerDateString = dateString.toLowerCase();
  
  if (lowerDateString === 'today') {
    return today.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  if (lowerDateString === 'tomorrow') {
    return tomorrow.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  if (lowerDateString === 'tonight') {
    return today.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  // Handle day names
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  if (dayNames.includes(lowerDateString)) {
    const nextDate = getNextWeekday(dateString);
    return nextDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  // Handle "next [day]" format
  if (lowerDateString.startsWith('next ')) {
    const dayName = dateString.split(' ')[1];
    const nextDate = getNextWeekday(dayName);
    return nextDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  // Return as-is if no special formatting needed
  return dateString;
}

function getNextWeekday(dayName: string): Date {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
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
