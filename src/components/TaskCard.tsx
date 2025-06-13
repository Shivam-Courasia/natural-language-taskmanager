
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Edit, Calendar, User, Clock, CheckCircle, Trash2, RotateCcw } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const TaskCard = ({ task, onUpdate, onDelete, onComplete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800 border-red-200';
      case 'P2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'P3': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'P4': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDateTime = (date: string | null, time: string | null) => {
    if (!date && !time) return null;
    if (date && time) return `${time}, ${date}`;
    if (date) return date;
    if (time) return time;
    return null;
  };

  return (
    <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1 ${
      task.completed ? 'opacity-75 bg-gray-50' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={`${getPriorityColor(task.priority)} px-3 py-1 text-xs font-semibold`}>
              {task.priority}
            </Badge>
            {task.completed && (
              <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-xs font-semibold">
                Completed
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 h-8 w-8"
            disabled={task.completed}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Task Title</label>
              <Input
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Assignee</label>
              <Input
                value={editedTask.assignee || ''}
                onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value || null })}
                placeholder="Enter name"
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
                <Input
                  value={editedTask.dueDate || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value || null })}
                  placeholder="e.g., 20 June"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Time</label>
                <Input
                  value={editedTask.dueTime || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, dueTime: e.target.value || null })}
                  placeholder="e.g., 11:00 PM"
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
              <Select 
                value={editedTask.priority} 
                onValueChange={(value: 'P1' | 'P2' | 'P3' | 'P4') => 
                  setEditedTask({ ...editedTask, priority: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P1">P1 - Urgent</SelectItem>
                  <SelectItem value="P2">P2 - High</SelectItem>
                  <SelectItem value="P3">P3 - Medium (Default)</SelectItem>
                  <SelectItem value="P4">P4 - Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button onClick={handleSave} size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className={`font-semibold text-lg leading-tight ${
                task.completed ? 'text-gray-600 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
            </div>
            
            <div className="space-y-3">
              {task.assignee && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{task.assignee}</span>
                </div>
              )}
              
              {formatDateTime(task.dueDate, task.dueTime) && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{formatDateTime(task.dueDate, task.dueTime)}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Created {task.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComplete}
                className={
                  task.completed 
                    ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    : "text-green-600 hover:text-green-700 hover:bg-green-50"
                }
              >
                {task.completed ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reopen
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
