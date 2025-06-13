
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Wand2, User, Calendar, Clock } from 'lucide-react';
import { parseTranscript } from '@/utils/transcriptParser';
import { ParsedTask } from '@/types/task';

interface TranscriptParserProps {
  onTasksExtracted: (tasks: ParsedTask[]) => void;
}

export const TranscriptParser = ({ onTasksExtracted }: TranscriptParserProps) => {
  const [transcript, setTranscript] = useState('');
  const [extractedTasks, setExtractedTasks] = useState<ParsedTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleParseTranscript = () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const tasks = parseTranscript(transcript);
      setExtractedTasks(tasks);
      setIsProcessing(false);
    }, 1000);
  };

  const handleAddAllTasks = () => {
    onTasksExtracted(extractedTasks);
    setTranscript('');
    setExtractedTasks([]);
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

  const exampleTranscript = `Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight.`;

  return (
    <Card className="mb-8 shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>AI Transcript Parser</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Paste your meeting transcript and let AI extract all tasks automatically
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder={`Paste your meeting transcript here...\n\nExample:\n"${exampleTranscript}"`}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-[120px] text-sm resize-none"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            onClick={handleParseTranscript}
            disabled={!transcript.trim() || isProcessing}
            className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
          >
            <Wand2 className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Processing...' : 'Extract Tasks'}</span>
          </Button>

          {extractedTasks.length > 0 && (
            <Button
              onClick={handleAddAllTasks}
              className="bg-green-600 hover:bg-green-700"
            >
              Add All Tasks ({extractedTasks.length})
            </Button>
          )}
        </div>

        {/* Extracted Tasks Preview */}
        {extractedTasks.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <span>Extracted Tasks ({extractedTasks.length})</span>
            </h3>
            <div className="grid gap-3 max-h-60 overflow-y-auto">
              {extractedTasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <Badge className={`${getPriorityColor(task.priority)} px-2 py-1 text-xs font-semibold`}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                    {task.assignee && (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-green-600" />
                        <span>{task.assignee}</span>
                      </div>
                    )}
                    
                    {(task.dueDate || task.dueTime) && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>
                          {task.dueTime && task.dueDate 
                            ? `${task.dueTime}, ${task.dueDate}`
                            : task.dueDate 
                            ? task.dueDate
                            : task.dueTime
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p className="font-medium mb-1">💡 Tips for better parsing:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Use clear assignee names (e.g., "John", "Sarah")</li>
            <li>Include deadlines (e.g., "by tomorrow", "by Friday 5pm")</li>
            <li>Add priorities when needed (P1, P2, P3, P4)</li>
            <li>Use action words (e.g., "take care of", "review", "finish")</li>
            <li>Use full stop between tasks (e.g., Aman complete landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday.)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
