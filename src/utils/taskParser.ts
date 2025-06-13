
import { ParsedTask } from '@/types/task';

export function parseNaturalLanguageTask(input: string): ParsedTask {
  console.log('Parsing input:', input);
  
  let title = input;
  let assignee: string | null = null;
  let dueDate: string | null = null;
  let dueTime: string | null = null;
  let priority: 'P1' | 'P2' | 'P3' | 'P4' = 'P3';

  // Extract priority (P1, P2, P3, P4)
  const priorityMatch = input.match(/\b(P[1-4])\b/i);
  if (priorityMatch) {
    priority = priorityMatch[1].toUpperCase() as 'P1' | 'P2' | 'P3' | 'P4';
    title = title.replace(/\b(P[1-4])\b/i, '').trim();
  }

  // Extract time (various formats)
  const timePatterns = [
    /\b(\d{1,2}):(\d{2})\s*(am|pm)\b/i,
    /\b(\d{1,2})\s*(am|pm)\b/i,
    /\b(\d{1,2}):\d{2}\b/
  ];

  for (const pattern of timePatterns) {
    const timeMatch = title.match(pattern);
    if (timeMatch) {
      dueTime = timeMatch[0];
      title = title.replace(pattern, '').trim();
      break;
    }
  }

  // Extract dates (various formats)
  const datePatterns = [
    /\b(\d{1,2})(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)\b/i,
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(st|nd|rd|th)?\b/i,
    /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/,
    /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/,
    /\btomorrow\b/i,
    /\btoday\b/i,
    /\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i
  ];

  for (const pattern of datePatterns) {
    const dateMatch = title.match(pattern);
    if (dateMatch) {
      dueDate = formatDate(dateMatch[0]);
      title = title.replace(pattern, '').trim();
      break;
    }
  }

  // Extract assignee (look for names - capitalized words that aren't common task words)
  const commonWords = ['by', 'on', 'at', 'for', 'with', 'to', 'from', 'the', 'and', 'or', 'but', 'in', 'out', 'up', 'down'];
  const words = title.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Check if word starts with capital letter and isn't a common word
    if (word && word[0] === word[0].toUpperCase() && 
        !commonWords.includes(word.toLowerCase()) &&
        word.length > 1 &&
        /^[A-Za-z]+$/.test(word)) {
      assignee = word;
      // Remove the assignee from title
      words.splice(i, 1);
      title = words.join(' ').trim();
      break;
    }
  }

  // Clean up title - remove extra spaces and connecting words at the end
  title = title.replace(/\s+/g, ' ').trim();
  title = title.replace(/\s+(by|on|at|for|with|to|from)$/, '').trim();

  const result = {
    title: title || 'New Task',
    assignee,
    dueDate,
    dueTime,
    priority
  };

  console.log('Parsed result:', result);
  return result;
}

function formatDate(dateString: string): string {
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

  // Handle "next [day]" format
  if (dateString.toLowerCase().startsWith('next ')) {
    const dayName = dateString.split(' ')[1];
    const nextDate = getNextWeekday(dayName);
    return nextDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }

  // Handle day names
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  if (dayNames.includes(dateString.toLowerCase())) {
    const nextDate = getNextWeekday(dateString);
    return nextDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  }

  // Handle "20th June" format
  const monthDayMatch = dateString.match(/(\d{1,2})(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i);
  if (monthDayMatch) {
    const day = monthDayMatch[1];
    const month = monthDayMatch[3];
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()}`;
  }

  // Handle "June 20th" format
  const dayMonthMatch = dateString.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(st|nd|rd|th)?/i);
  if (dayMonthMatch) {
    const month = dayMonthMatch[1];
    const day = dayMonthMatch[2];
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()}`;
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
