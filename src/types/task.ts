
export interface Task {
  id: string;
  title: string;
  assignee: string | null;
  dueDate: string | null;
  dueTime: string | null;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  completed: boolean;
  createdAt: Date;
}

export interface ParsedTask {
  title: string;
  assignee: string | null;
  dueDate: string | null;
  dueTime: string | null;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
}
