"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, User, Clock, ArrowRight, FileText, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

interface LandingSectionProps {
  onGetStarted: () => void
}

export const LandingSection = ({ onGetStarted }: LandingSectionProps) => {
  // For animations on scroll
  const [isVisible, setIsVisible] = useState({
    features: false,
    transcript: false,
    example: false,
  })

  // For transcript demo
  const [showTranscriptResult, setShowTranscriptResult] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById("features-section")
      const transcriptSection = document.getElementById("transcript-section")
      const exampleSection = document.getElementById("example-section")

      if (featuresSection && window.scrollY > featuresSection.offsetTop - window.innerHeight * 0.8) {
        setIsVisible((prev) => ({ ...prev, features: true }))
      }

      if (transcriptSection && window.scrollY > transcriptSection.offsetTop - window.innerHeight * 0.8) {
        setIsVisible((prev) => ({ ...prev, transcript: true }))
      }

      if (exampleSection && window.scrollY > exampleSection.offsetTop - window.innerHeight * 0.8) {
        setIsVisible((prev) => ({ ...prev, example: true }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on mount to check initial visibility
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTranscriptDemo = () => {
    setShowTranscriptResult(false)
    setTimeout(() => {
      setShowTranscriptResult(true)
    }, 800)
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-28 px-4 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-30"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-10 animate-fade-in-up">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Streamline Your Workflow
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Natural Language
              <span className="text-blue-600 block mt-2 relative">
                Task Manager
                <svg
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                  width="200"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 3.5C20 1.5 50.5 0.999998 75 3.5C99.5 6 150 7.5 199 3.5"
                    stroke="#3B82F6"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your natural language into structured tasks instantly. Just type "Finish landing page Aman by
              11pm 20th June" and watch the magic happen.
            </p>
          </div>
          <div className="animate-fade-in">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 text-lg font-semibold rounded-xl shadow-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              Start Managing Tasks
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <div className="mt-10 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-white font-medium">
                    K
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-white font-medium">
                    M
                  </div>
                </div>
                <span className="ml-4 text-gray-600 font-medium">500+ teams already using it</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 70C672 70 768 50 864 45C960 40 1056 50 1152 65C1248 80 1344 100 1392 110L1440 120V0H0V120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="py-24 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isVisible.features ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Powerful Features
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Built for Enterprise Teams</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent system understands natural language and converts it into structured tasks.
            </p>
          </div>
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${isVisible.features ? "animate-fade-in-stagger" : "opacity-0"}`}
          >
            <Card className="border-0 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:translate-y-[-8px] bg-gradient-to-b from-white to-blue-50 overflow-hidden group">
              <div className="absolute right-0 top-0 h-20 w-20 bg-blue-100 rounded-bl-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300 shadow-md">
                  <CheckCircle className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Smart Parsing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-base leading-relaxed">
                  Automatically extracts task names, assignees, and priorities from natural language input.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:translate-y-[-8px] bg-gradient-to-b from-white to-green-50 overflow-hidden group">
              <div className="absolute right-0 top-0 h-20 w-20 bg-green-100 rounded-bl-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300 shadow-md">
                  <Calendar className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Date Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-base leading-relaxed">
                  Understands dates like "tomorrow", "next Friday", or "20th June" and converts them intelligently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:translate-y-[-8px] bg-gradient-to-b from-white to-purple-50 overflow-hidden group">
              <div className="absolute right-0 top-0 h-20 w-20 bg-purple-100 rounded-bl-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300 shadow-md">
                  <User className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Team Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-base leading-relaxed">
                  Automatically identifies and assigns tasks to team members mentioned in your input.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:translate-y-[-8px] bg-gradient-to-b from-white to-orange-50 overflow-hidden group">
              <div className="absolute right-0 top-0 h-20 w-20 bg-orange-100 rounded-bl-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300 shadow-md">
                  <Clock className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Priority System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-base leading-relaxed">
                  Smart priority detection with P1-P4 system, defaulting to P3 for balanced workflow management.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Meeting Minutes to Tasks Section */}
      <div id="transcript-section" className="py-24 px-4 bg-gradient-to-br from-indigo-50 to-blue-100 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
            <path
              d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 70C672 70 768 50 864 45C960 40 1056 50 1152 65C1248 80 1344 100 1392 110L1440 120V0H0V120Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${isVisible.transcript ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="inline-block bg-blue-200 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              New Feature
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">AI Meeting Minutes to Task Converter</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Paste your meeting transcript and instantly convert discussions into actionable tasks.
            </p>
          </div>

          <div
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${isVisible.transcript ? "animate-fade-in" : "opacity-0"}`}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Transcript Input */}
              <div className="lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Meeting Transcript</h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-inner border border-gray-100 h-64 overflow-y-auto">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    "Alright team, let's wrap up with action items.{" "}
                    <span className="text-indigo-600 font-semibold">
                      Aman you take the landing page by 10pm tomorrow
                    </span>
                    .
                    <span className="text-indigo-600 font-semibold">
                      Rajeev you take care of client follow-up by Wednesday
                    </span>
                    .
                    <span className="text-indigo-600 font-semibold">
                      Shreya please review the marketing deck tonight
                    </span>
                    . Any questions before we end the call?"
                  </p>
                </div>

                <Button
                  onClick={handleTranscriptDemo}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium flex items-center justify-center group"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Convert to Tasks
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Right side - Parsed Tasks */}
              <div className="lg:w-1/2 p-8 bg-gradient-to-br from-white to-indigo-50">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Extracted Tasks</h3>
                </div>

                <div className="space-y-4">
                  {showTranscriptResult ? (
                    <>
                      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform transition-all duration-500 animate-slide-in-right">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">Landing page development</h4>
                            <p className="text-sm text-gray-500 mt-1">Take the landing page</p>
                          </div>
                          <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            P2
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-medium">
                              A
                            </span>
                            <span className="ml-2 text-sm text-gray-600">Aman</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Tomorrow, 10:00 PM</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform transition-all duration-500 animate-slide-in-right animation-delay-150">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">Client follow-up</h4>
                            <p className="text-sm text-gray-500 mt-1">Take care of client follow-up</p>
                          </div>
                          <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            P3
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-white text-xs font-medium">
                              R
                            </span>
                            <span className="ml-2 text-sm text-gray-600">Rajeev</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Wednesday</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform transition-all duration-500 animate-slide-in-right animation-delay-300">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">Marketing deck review</h4>
                            <p className="text-sm text-gray-500 mt-1">Review the marketing deck</p>
                          </div>
                          <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            P1
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs font-medium">
                              S
                            </span>
                            <span className="ml-2 text-sm text-gray-600">Shreya</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Tonight</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-gray-400 text-center">
                        Click "Convert to Tasks" to see the extracted tasks from your meeting transcript
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 70C672 70 768 50 864 45C960 40 1056 50 1152 65C1248 80 1344 100 1392 110L1440 120V0H0V120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Example Section */}
      <div id="example-section" className="py-28 px-4 bg-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`mb-8 ${isVisible.example ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="inline-block bg-purple-100 text-purple-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Live Demo
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See It In Action</h2>
            <p className="text-gray-600 text-lg mb-8">
              Experience the power of natural language processing for task management.
            </p>
          </div>
          <div
            className={`bg-white rounded-2xl shadow-2xl p-10 ${isVisible.example ? "animate-fade-in" : "opacity-0"}`}
          >
            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-4 font-medium">Try typing:</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl shadow-inner">
                <p className="font-mono text-blue-800 text-lg font-medium">
                  "Finish landing page Aman by 11pm 20th June P1"
                </p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-gray-900 mb-6">Automatically parsed as:</p>
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                    <p className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">Task</p>
                    <p className="text-blue-600 font-medium text-lg">Finish landing page</p>
                  </div>
                  <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                    <p className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">Assigned To</p>
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white font-medium mr-2">
                        A
                      </span>
                      <p className="text-green-600 font-medium text-lg">Aman</p>
                    </div>
                  </div>
                  <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                    <p className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">Due Date</p>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                      <p className="text-purple-600 font-medium text-lg">11:00 PM, 20 June</p>
                    </div>
                  </div>
                  <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                    <p className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">Priority</p>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-medium text-xs mr-2">
                        P1
                      </span>
                      <p className="text-red-600 font-medium text-lg">Highest</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Try It Yourself
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .animate-fade-in-stagger > * {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in-stagger > *:nth-child(1) { animation-delay: 0.1s; }
        .animate-fade-in-stagger > *:nth-child(2) { animation-delay: 0.2s; }
        .animate-fade-in-stagger > *:nth-child(3) { animation-delay: 0.3s; }
        .animate-fade-in-stagger > *:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
