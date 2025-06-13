
import { useState } from 'react';
import { LandingSection } from '@/components/LandingSection';
import { TaskManager } from '@/components/TaskManager';

const Index = () => {
  const [showTaskManager, setShowTaskManager] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!showTaskManager ? (
        <LandingSection onGetStarted={() => setShowTaskManager(true)} />
      ) : (
        <TaskManager onBack={() => setShowTaskManager(false)} />
      )}
    </div>
  );
};

export default Index;
