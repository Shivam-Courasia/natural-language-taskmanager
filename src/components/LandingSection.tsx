"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, User, Clock, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface LandingSectionProps {
  onGetStarted: () => void
}

export const LandingSection = ({ onGetStarted }: LandingSectionProps) => {
  // For animations on scroll
  const [isVisible, setIsVisible] = useState({
    features: false,
    example: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById("features-section")
      const exampleSection = document.getElementById("example-section")

      if (featuresSection && window.scrollY > featuresSection.offsetTop - window.innerHeight * 0.8) {
        setIsVisible((prev) => ({ ...prev, features: true }))
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

      {/* Example Section */}
      <div id="example-section" className="py-28 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0">
          <svg
            width="400"
            height="400"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-25"
          >
            <path
              d="M42.9 -74.4C56.4 -69.1 68.8 -59.2 74.9 -46.5C80.9 -33.7 80.5 -18.1 77.8 -4.4C75.1 9.3 70 20.9 64.5 32.4C59.1 44 53.3 55.4 43.5 63.1C33.8 70.8 20.1 74.8 4.4 80.5C-11.3 86.2 -28.9 93.7 -43.4 91.3C-57.9 89 -69.4 76.8 -77.1 63C-84.8 49.2 -88.7 33.7 -89.8 18.5C-91 3.3 -89.3 -11.7 -80.2 -20.3C-71.1 -28.9 -54.5 -31.2 -43.4 -38.8C-32.3 -46.4 -26.8 -59.3 -17.7 -66.4C-8.7 -73.6 3.9 -75 15.9 -78.1C27.9 -81.2 39.1 -86.1 50.1 -84C61.1 -82 72 -73 78.2 -60.7C84.5 -48.4 86.2 -32.8 83.8 -17.3C81.4 -1.9 74.9 13.5 66.9 25.8C58.9 38.2 49.4 47.6 38.4 54.9C27.5 62.1 15 67.3 1.2 75.4C-12.6 83.5 -27.7 94.6 -39.7 93.6C-51.7 92.6 -60.7 79.6 -70.5 67.7C-80.3 55.7 -90.9 44.9 -94.1 32.1C-97.3 19.4 -93 4.7 -89.9 -9.7C-86.8 -24.1 -84.8 -38.1 -75.7 -45.1C-66.6 -52.1 -50.3 -51.9 -37.5 -56.5C-24.7 -61.1 -15.3 -70.4 -1.7 -77.8C11.9 -85.2 29.5 -90.7 43 -85.3C56.6 -79.9 66.2 -63.6 76.5 -47.9C86.8 -32.2 97.9 -17.1 99.8 -0.9C101.7 15.3 94.4 32.7 84.4 45.5C74.3 58.3 61.5 66.7 48.9 74.5C36.2 82.3 23.6 89.6 9.5 91.9C-4.7 94.1 -20.3 91.3 -34.9 87C-49.5 82.8 -63.1 77.2 -74.7 67.3C-86.3 57.5 -96 43.5 -99.3 28.2C-102.6 12.9 -99.6 -3.7 -92.9 -17.9C-86.3 -32.1 -76.1 -44.1 -63.8 -54.2C-51.5 -64.3 -37.2 -72.7 -22.9 -77.4C-8.6 -82.1 5.8 -83.2 20 -80.4C34.1 -77.6 48 -71 59.4 -61.3C70.7 -51.6 79.5 -38.8 84.1 -25.1C88.6 -11.4 89 3.2 85.9 17.7C82.9 32.2 76.4 46.6 67.4 59.4C58.3 72.3 46.7 83.7 33.3 88.5C19.8 93.3 4.6 91.5 -9.1 87.6C-22.7 83.6 -34.9 77.4 -46.6 70C-58.3 62.6 -69.6 54.1 -75.1 42.8C-80.7 31.5 -80.4 17.4 -83.2 2.2C-86 -13 -91.8 -29.3 -86.8 -39.6C-81.8 -49.9 -66.1 -54.4 -53 -63.1C-39.9 -71.9 -29.5 -85 -16.7 -89.6C-3.9 -94.3 11.2 -90.7 25.4 -85.2C39.6 -79.8 52.9 -72.5 63.8 -62.2C74.8 -51.8 83.4 -38.4 87.8 -24.2C92.2 -9.9 92.5 5.1 89 19.2C85.6 33.3 78.3 46.4 69.3 57.5C60.2 68.5 49.5 77.4 36.7 80C23.9 82.6 9 78.8 -4.1 75.6C-17.3 72.3 -28.8 69.7 -42 65.9C-55.3 62.1 -70.2 57.1 -81 46.9C-91.7 36.7 -98.2 21.4 -101.5 5.2C-104.9 -11.1 -105 -28.1 -96.6 -38.2C-88.3 -48.3 -71.5 -51.4 -57 -59.2C-42.4 -67.1 -30.2 -79.6 -16.1 -84.6C-2 -89.5 13.9 -86.9 29.4 -83.4C44.9 -79.9 59.9 -75.4 68.8 -65.1C77.7 -54.8 80.4 -38.7 82.1 -23.1C83.7 -7.5 84.4 7.7 80.3 21.8C76.2 35.9 67.4 48.9 56.6 59.5C45.7 70 32.9 78.2 19.9 78.7C6.9 79.3 -6.2 72.3 -16.5 64.1C-26.8 55.9 -34.4 46.5 -41 36.8C-47.6 27 -53.3 16.9 -58.6 5.3C-63.9 -6.3 -68.8 -19.4 -69.2 -34.2C-69.6 -49 -65.4 -65.3 -55.2 -74.1C-44.9 -82.9 -28.7 -83.9 -14.3 -79.3C0.2 -74.6 12.8 -64.3 23.8 -55.6C34.8 -46.9 44.1 -39.8 50.8 -30.4C57.5 -21.1 61.5 -9.5 60.9 1.4C60.2 12.4 54.9 22.8 52.6 37.9C50.3 52.9 51 72.7 42.6 83.3C34.1 94 16.6 95.6 0.7 94.5C-15.3 93.3 -30.5 89.5 -42 82.2C-53.6 75 -61.5 64.2 -69.2 52.9C-77 41.6 -84.5 29.6 -88.1 16.3C-91.6 3 -91.2 -11.6 -86.3 -24.5C-81.5 -37.5 -72.2 -48.9 -60.5 -58.7C-48.8 -68.5 -34.7 -76.8 -20.4 -79.5C-6 -82.2 8.6 -79.3 22.7 -73.9C36.9 -68.5 50.7 -60.5 62.8 -50.2C74.8 -39.8 85.2 -27 89.4 -12.5C93.6 1.9 91.6 18 85.3 31.3C79 44.6 68.4 55.1 56.2 63.6C44.1 72 30.5 78.5 16.9 82.1C3.3 85.7 -10.3 86.5 -24.4 82.7C-38.5 78.8 -53.2 70.4 -63.3 59C-73.4 47.7 -79.1 33.3 -81.7 19.2C-84.3 5.1 -83.9 -8.7 -80.3 -21.8C-76.6 -35 -69.9 -47.4 -59.8 -58C-49.8 -68.5 -36.4 -77.1 -22.4 -83.2C-8.3 -89.4 6.3 -93.1 21 -92.1C35.7 -91.2 50.4 -85.7 63.6 -76.7C76.8 -67.8 88.5 -55.5 93.9 -41.1C99.4 -26.8 98.7 -10.5 95.3 4.2C91.9 18.9 85.9 32 76.4 42.6C66.8 53.2 53.7 61.2 40.3 68.2C26.9 75.2 13.3 81.2 -1.4 83.7C-16 86.3 -31.7 85.5 -45.7 80.2C-59.7 74.9 -72.2 65.2 -78.8 52.5C-85.5 39.8 -86.5 24.1 -87.3 9.1C-88.1 -5.8 -88.8 -20.1 -84.5 -33C-80.2 -45.9 -71.1 -57.5 -59.4 -68C-47.7 -78.5 -33.6 -88 -18.6 -88.8C-3.6 -89.6 12.3 -81.7 26 -72.3C39.7 -63 51.3 -52.1 61.2 -39.8C71.1 -27.4 79.4 -13.7 83.1 1.6C86.8 17 85.9 33.9 79.9 48.2C73.9 62.4 62.8 74.2 49.9 80.9C37 87.7 22.2 89.3 9 84.9C-4.2 80.5 -15.9 70 -29.7 63.7C-43.6 57.4 -59.6 55.2 -71.5 47C-83.4 38.9 -91.1 24.8 -91.7 10.5C-92.2 -3.7 -85.6 -18.2 -78.6 -31.9C-71.7 -45.7 -64.4 -58.7 -53.3 -67.1C-42.3 -75.5 -27.6 -79.1 -12.7 -83.1C2.2 -87.1 17.2 -91.4 30.9 -88.9C44.6 -86.4 56.9 -77.1 68 -66.7C79.1 -56.3 88.9 -44.8 92.2 -31.5C95.4 -18.2 92.1 -3.1 87.8 10.5C83.5 24.2 78.2 36.3 69.3 46.2C60.4 56.1 48.1 63.9 35.8 68.7C23.5 73.5 11.3 75.4 -0.9 76.9C-13.1 78.4 -25.1 79.5 -39.7 76.3C-54.2 73.2 -71.2 65.7 -80.2 53.5C-89.3 41.3 -90.4 24.4 -89.6 9C-88.8 -6.4 -86 -20.2 -78.3 -30.3C-70.6 -40.4 -57.9 -46.7 -45.8 -54.9C-33.7 -63.1 -22.1 -73.1 -8.5 -76.7C5.2 -80.2 20.9 -77.4 35.6 -73C50.4 -68.7 64.1 -63 73.7 -52.9C83.3 -42.8 88.7 -28.4 92.4 -13.5C96.1 1.4 98 16.9 92.8 28.8C87.7 40.7 75.6 49.2 63.2 57.8C50.9 66.5 38.3 75.4 24.5 80.4C10.7 85.5 -4.5 86.9 -18.8 84.8C-33.1 82.7 -46.6 77.2 -55.4 67.9C-64.3 58.6 -68.7 45.5 -74.6 33.2C-80.6 20.9 -88.2 9.5 -90.5 -3.5C-92.9 -16.6 -90 -31.2 -82.7 -42.8C-75.4 -54.3 -63.7 -62.9 -50.6 -70.2C-37.5 -77.5 -22.9 -83.6 -8.1 -83.4C6.7 -83.2 21.7 -76.8 35.1 -68.7C48.6 -60.7 60.5 -51 69.1 -39.1C77.7 -27.1 82.9 -13 82.4 0.5C81.9 14 75.8 28 69.4 41.9C63 55.7 56.3 69.4 45.2 76.4C34.1 83.3 18.7 83.4 4.2 81.4C-10.3 79.4 -24 75.3 -34.9 68C-45.9 60.7 -54.1 50.3 -65 39.9C-75.9 29.5 -89.5 19.2 -95.5 5.6C-101.6 -7.9 -100.2 -24.8 -93 -38.2C-85.8 -51.6 -72.8 -61.4 -58.3 -67.6C-43.8 -73.9 -27.9 -76.5 -12.5 -79.1C2.9 -81.7 17.9 -84.4 31.4 -81C45 -77.7 57.2 -68.3 68.7 -57.4C80.2 -46.6 91.1 -34.2 94.7 -19.8C98.2 -5.5 94.5 11 89.7 26.6C84.8 42.1 78.9 56.9 68 65.9C57.1 74.9 41.3 78.1 25.6 79.1C9.8 80.1 -6 78.8 -20.9 74.7C-35.7 70.6 -49.7 63.6 -58.7 53.2C-67.7 42.7 -71.8 28.8 -76.1 14.9C-80.3 1.1 -84.8 -12.7 -82.7 -25C-80.6 -37.3 -71.9 -48.1 -60.9 -57.6C-49.9 -67.2 -36.7 -75.6 -22.8 -78.1C-8.8 -80.7 6 -77.4 19.4 -72.7C32.8 -67.9 44.9 -61.7 57.1 -53.8C69.2 -45.8 81.3 -36.1 84.8 -23.3C88.3 -10.5 83.2 5.3 79.2 21.2C75.2 37.1 72.3 52.9 63.7 63.9C55 74.8 40.7 80.8 26.8 82.4C12.9 84 -0.7 81.2 -13.6 77.2C-26.5 73.3 -38.7 68.2 -47.7 59.8C-56.7 51.5 -62.5 39.9 -71.4 28.8C-80.4 17.7 -92.4 7 -94.9 -5.2C-97.3 -17.5 -90.1 -31.3 -82.7 -45.5C-75.3 -59.8 -67.5 -74.4 -55.3 -79.7C-43.1 -85 -26.5 -80.9 -12.3 -78.6C1.8 -76.4 13.5 -76 26.7 -72.9C40 -69.7 54.8 -63.7 66.2 -54C77.7 -44.3 85.9 -30.9 88.2 -16.9C90.5 -2.9 87 11.7 83.2 26.7C79.3 41.7 75.2 57.1 65.5 67.8C55.8 78.5 40.6 84.5 25.6 85C10.5 85.4 -4.4 80.2 -17 74.2C-29.5 68.2 -39.7 61.4 -51.8 53.9C-64 46.4 -77.9 38.2 -84.9 26.3C-92 14.4 -92.1 -1.3 -88.4 -15.1C-84.7 -28.9 -77.3 -40.9 -69.1 -53.9C-60.9 -66.9 -51.8 -80.9 -39.1 -85.4C-26.3 -90 -9.8 -85.1 5.6 -83.2C21 -81.4 35.4 -82.5 46.5 -77.6C57.5 -72.7 65.2 -61.8 72.6 -50.3C79.9 -38.8 87 -26.7 90.4 -13C93.9 0.6 93.7 15.9 89 29.2C84.3 42.4 75.1 53.7 63.9 62.6C52.8 71.5 39.8 78.1 26 81.1C12.3 84.2 -2.3 83.7 -17.5 82.5C-32.7 81.3 -48.6 79.2 -61.2 72C-73.7 64.7 -83.1 52.3 -88.5 38.3C-93.9 24.2 -95.4 8.5 -95.3 -7.2C-95.2 -22.9 -93.5 -38.7 -85 -49.2C-76.5 -59.7 -61.2 -65 -47.3 -69.7C-33.4 -74.5 -20.9 -78.8 -7.7 -82.5C5.5 -86.3 19.3 -89.5 31 -84.2C42.7 -78.9 52.4 -65.1 57 -51C61.6 -36.9 61.1 -22.5 63.3 -9.2C65.5 4.1 70.4 16.2 71.5 29.6C72.7 42.9 70.1 57.5 62.6 66.8C55.1 76 42.8 79.9 30.3 82.5C17.9 85.1 5.3 86.5 -6.8 86.6C-18.9 86.7 -30.5 85.6 -42 82.7C-53.6 79.8 -65.1 75.2 -74.9 67.1C-84.7 59 -92.9 47.3 -94.3 34.4C-95.7 21.5 -90.4 7.4 -87.1 -6.2C-83.7 -19.8 -82.2 -33 -76.7 -44.9C-71.2 -56.8 -61.6 -67.4 -49.5 -74.7C-37.4 -82 -22.9 -86.1 -9.1 -85.3C4.7 -84.4 17.7 -78.7 30.9 -72.4C44 -66.1 57.3 -59.3 68.3 -49.1C79.3 -38.9 88.1 -25.3 90.4 -11"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="2"
            ></path>
          </svg>
        </div>

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
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
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
      `}</style>
    </div>
  )
}
