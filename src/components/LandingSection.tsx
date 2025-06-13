
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, User, Clock } from 'lucide-react';

interface LandingSectionProps {
  onGetStarted: () => void;
}

export const LandingSection = ({ onGetStarted }: LandingSectionProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Natural Language
            <span className="text-blue-600 block">Task Manager</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your natural language into structured tasks instantly. Just type 
            "Finish landing page Aman by 11pm 20th June" and watch the magic happen.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Managing Tasks
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Enterprise Teams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Smart Parsing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Automatically extracts task names, assignees, and priorities from natural language input.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Date Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Understands dates like "tomorrow", "next Friday", or "20th June" and converts them intelligently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Team Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Automatically identifies and assigns tasks to team members mentioned in your input.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Priority System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Smart priority detection with P1-P4 system, defaulting to P3 for balanced workflow management.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Example Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">See It In Action</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <p className="text-lg text-gray-600 mb-4">Try typing:</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-mono text-blue-800">"Finish landing page Aman by 11pm 20th June P1"</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-gray-900 mb-4">Automatically parsed as:</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Task</p>
                    <p className="text-blue-600">Finish landing page</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Assigned To</p>
                    <p className="text-green-600">Aman</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Due Date</p>
                    <p className="text-purple-600">11:00 PM, 20 June</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Priority</p>
                    <p className="text-red-600">P1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
