
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Plus, User, Calendar as CalendarIcon } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { parseNaturalLanguageTask } from '@/utils/taskParser';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskManagerProps {
  onBack: () => void;
}

export const TaskManager = ({ onBack }: TaskManagerProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [quickAssignee, setQuickAssignee] = useState('');
  const [quickDate, setQuickDate] = useState<Date | undefined>();
  const [showAssigneeInput, setShowAssigneeInput] = useState(false);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    
    let taskInput = inputValue;
    
    // Append quick assignee if set
    if (quickAssignee.trim()) {
      taskInput += ` ${quickAssignee}`;
    }
    
    // Append quick date if set
    if (quickDate) {
      const formattedDate = format(quickDate, 'MMMM do');
      taskInput += ` ${formattedDate}`;
    }
    
    const parsedTask = parseNaturalLanguageTask(taskInput);
    const newTask: Task = {
      id: Date.now().toString(),
      ...parsedTask,
      createdAt: new Date()
    };
    
    setTasks([newTask, ...tasks]);
    setInputValue('');
    setQuickAssignee('');
    setQuickDate(undefined);
    setShowAssigneeInput(false);
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = (id: string) => {
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
            <div className="space-y-4">
              {/* Main Input */}
              <div className="flex space-x-4">
                <Input
                  placeholder='Try: "Finish landing page by 11pm 20th June P1" or "Call client tomorrow 5pm"'
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

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAssigneeInput(!showAssigneeInput)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Assign To</span>
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center space-x-2",
                        quickDate && "text-blue-600 border-blue-200 bg-blue-50"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {quickDate ? format(quickDate, "MMM do") : "Due Date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={quickDate}
                      onSelect={setQuickDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {(quickAssignee || quickDate) && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setQuickAssignee('');
                      setQuickDate(undefined);
                      setShowAssigneeInput(false);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Assignee Input */}
              {showAssigneeInput && (
                <div className="flex space-x-2 items-center animate-fade-in">
                  <User className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Enter assignee name"
                    value={quickAssignee}
                    onChange={(e) => setQuickAssignee(e.target.value)}
                    className="flex-1"
                  />
                </div>
              )}

              {/* Current selections display */}
              {(quickAssignee || quickDate) && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg animate-fade-in">
                  <span className="font-medium">Quick selections: </span>
                  {quickAssignee && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-2">
                      <User className="w-3 h-3 mr-1" />
                      {quickAssignee}
                    </span>
                  )}
                  {quickDate && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {format(quickDate, "MMM do, yyyy")}
                    </span>
                  )}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Natural language examples: "Review proposal John by Friday", "Team meeting everyone tomorrow 2pm P1"
              </p>
            </div>
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
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
