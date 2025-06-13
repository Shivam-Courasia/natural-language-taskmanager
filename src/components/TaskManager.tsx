
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { parseNaturalLanguageTask } from '@/utils/taskParser';
import { Task } from '@/types/task';

interface TaskManagerProps {
  onBack: () => void;
}

export const TaskManager = ({ onBack }: TaskManagerProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    
    const parsedTask = parseNaturalLanguageTask(inputValue);
    const newTask: Task = {
      id: Date.now().toString(),
      ...parsedTask,
      createdAt: new Date()
    };
    
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Task Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder='Try: "Finish landing page Aman by 11pm 20th June P1" or "Call client Rajeev tomorrow 5pm"'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-lg py-3"
              />
              <Button 
                onClick={handleAddTask}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Natural language examples: "Review proposal John by Friday", "Team meeting everyone tomorrow 2pm P1"
            </p>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        {tasks.length === 0 ? (
          <Card className="text-center py-12 shadow-lg border-0">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Add your first task using natural language above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
