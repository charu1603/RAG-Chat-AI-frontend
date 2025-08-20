"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { BookOpen, BarChart3, X, Type, TrendingUp, Eye, FileText } from "lucide-react"

const mockSummary = {
  title: "Document Summary",
  keyPoints: [
    "Main topic focuses on artificial intelligence and machine learning applications",
    "Discusses implementation strategies for modern web development",
    "Covers best practices for user experience design",
    "Includes performance optimization techniques",
  ],
  mainTheme: "Technology and Innovation",
  conclusion:
    "The document provides comprehensive insights into modern development practices with emphasis on AI integration and user-centric design approaches.",
}

const mockAnalysis = {
  wordCount: 1247,
  readingTime: 6,
  sentiment: "positive" as const,
  keyTopics: ["Technology", "Business", "Innovation", "Strategy"],
  complexity: "moderate" as const,
}

function RightSidebar() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "text-green-600"
      case "complex":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  const SummaryContent = () => (
    <div className="flex-1 p-4">
      <ScrollArea className="h-full">
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">{mockSummary.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Theme:</span>
                <Badge variant="secondary" className="text-xs">
                  {mockSummary.mainTheme}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3">Key Points</h4>
            <ul className="space-y-2">
              {mockSummary.keyPoints.map((point: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3">Conclusion</h4>
            <p className="text-sm text-muted-foreground">{mockSummary.conclusion}</p>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )

  const AnalysisContent = () => (
    <div className="flex-1 p-4">
      <ScrollArea className="h-full">
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Content Statistics</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Word Count:</span>
                <span className="text-sm font-medium">{mockAnalysis.wordCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reading Time:</span>
                <span className="text-sm font-medium">{mockAnalysis.readingTime} min</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Sentiment Analysis</span>
            </div>
            <div className={`text-sm font-medium capitalize ${getSentimentColor(mockAnalysis.sentiment)}`}>
              {mockAnalysis.sentiment}
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full transition-all duration-500 bg-green-500" style={{ width: "75%" }}></div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Complexity Level</span>
            </div>
            <div className={`text-sm font-medium capitalize ${getComplexityColor(mockAnalysis.complexity)}`}>
              {mockAnalysis.complexity}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Moderately complex</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Key Topics</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockAnalysis.keyTopics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium">Content Type</span>
            </div>
            <div className="text-sm">Document</div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Mobile Summary Sheet */}
      <Sheet>
        <SheetContent side="right" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <SheetTitle className="text-lg font-semibold text-sidebar-foreground">Summary</SheetTitle>
              </div>
              <SheetDescription className="text-sm text-muted-foreground">Document overview</SheetDescription>
            </SheetHeader>
            <SummaryContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Analysis Sheet */}
      <Sheet>
        <SheetContent side="right" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <SheetTitle className="text-lg font-semibold text-sidebar-foreground">Content Analysis</SheetTitle>
              </div>
              <SheetDescription className="text-sm text-muted-foreground">Real-time insights</SheetDescription>
            </SheetHeader>
            <AnalysisContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Summary Panel */}
      <div className="hidden lg:flex w-80 bg-sidebar border-l border-sidebar-border flex-col fixed right-0 top-0 h-full z-40">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-sidebar-foreground">Summary</h2>
            </div>
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Document overview</p>
        </div>
        <SummaryContent />
      </div>

      {/* Desktop Analysis Sidebar - Only visible on xl screens */}
      <div className="hidden xl:flex w-80 bg-sidebar border-l border-sidebar-border flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-sidebar-foreground">Content Analysis</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Real-time insights</p>
        </div>
        <AnalysisContent />
      </div>
    </>
  )
}
export default RightSidebar