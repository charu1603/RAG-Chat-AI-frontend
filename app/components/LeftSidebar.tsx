"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Settings,
  History,
  FileSpreadsheet,
  ImageIcon,
  Link,
  Type,
  Upload,
  Loader2,
} from "lucide-react";

export function LeftSidebar() {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [csvContent, setCsvContent] = useState("");

  // State for summarization results and loading
  const [summary, setSummary] = useState<string | null>(null);
  const [mainPoints, setMainPoints] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSubmit = () => {
    if (textContent.trim()) {
      setIsTextModalOpen(false);
    }
  };

  const handleWebsiteSubmit = () => {
    console.log("Website URL:", websiteUrl);
    setWebsiteUrl("");
    setIsWebsiteModalOpen(false);
  };

  const handleCsvSubmit = () => {
    console.log("CSV content:", csvContent);
    setCsvContent("");
    setIsCsvModalOpen(false);
  };

  const hanldeFileUpload = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append("pdf", file);
          await fetch("http://localhost:8000/upload/pdf", {
            method: "POST",
            body: formData,
          });
          console.log("file uploaded");
        }
      }
    });
    el.click();
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "csv":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "link":
        return <Link className="h-4 w-4" />;
      case "text":
        return <Type className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">DocuChat</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI Document Assistant
        </p>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
          Add Content
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col h-16 p-2 bg-transparent hover:bg-accent"
            onClick={() => setIsTextModalOpen(true)}
          >
            <Type className="h-4 w-4 mb-1" />
            <span className="text-xs">Text</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col h-16 p-2 bg-transparent hover:bg-accent"
            onClick={() => setIsWebsiteModalOpen(true)}
          >
            <Link className="h-4 w-4 mb-1" />
            <span className="text-xs">Website</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col h-16 p-2 bg-transparent hover:bg-accent"
            onClick={hanldeFileUpload}
          >
            <Upload className="h-4 w-4 mb-1" />
            <span className="text-xs">PDF</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col h-16 p-2 bg-transparent hover:bg-accent"
            onClick={() => setIsCsvModalOpen(true)}
          >
            <FileSpreadsheet className="h-4 w-4 mb-1" />
            <span className="text-xs">CSV</span>
          </Button>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-6 border-b border-sidebar-border">
            <SheetTitle className="text-xl font-bold text-sidebar-foreground">
              DocuChat
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              AI Document Assistant
            </SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-80 bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent />
      </div>

      {/* Text Input Modal */}
      <Dialog open={isTextModalOpen} onOpenChange={setIsTextModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Text Content</DialogTitle>
            <DialogDescription>
              Paste or type your text content to chat with it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content">Text Content</Label>
              <Textarea
                id="text-content"
                placeholder="Paste your text here..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[200px] mt-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsTextModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleTextSubmit} disabled={!textContent.trim()}>
                Add Text & Summarize
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Website URL Modal */}
      <Dialog open={isWebsiteModalOpen} onOpenChange={setIsWebsiteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Website Content</DialogTitle>
            <DialogDescription>
              Enter a website URL to extract and chat with its content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                type="url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsWebsiteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleWebsiteSubmit}
                disabled={!websiteUrl.trim()}
              >
                Add Website
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CSV Input Modal */}
      <Dialog open={isCsvModalOpen} onOpenChange={setIsCsvModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add CSV Data</DialogTitle>
            <DialogDescription>
              Paste your CSV data to analyze and chat with it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="csv-content">CSV Data</Label>
              <Textarea
                id="csv-content"
                placeholder="Paste your CSV data here..."
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                className="min-h-[200px] mt-2 font-mono text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCsvModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCsvSubmit} disabled={!csvContent.trim()}>
                Add CSV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Summary Display Modal */}
      <Dialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Document Summary</DialogTitle>
            <DialogDescription>
              Here is the summary and main points from your content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="mt-4 text-sm text-muted-foreground">
                  Generating summary...
                </span>
              </div>
            ) : (
              <>
                {summary && (
                  <Card className="p-4 bg-secondary">
                    <h4 className="text-lg font-semibold mb-2">Summary</h4>
                    <p className="text-sm">{summary}</p>
                  </Card>
                )}
                {mainPoints && mainPoints.length > 0 && (
                  <Card className="p-4 bg-secondary">
                    <h4 className="text-lg font-semibold mb-2">Main Points</h4>
                    <div className="flex flex-wrap gap-2">
                      {mainPoints.map((point, index) => (
                        <Badge key={index} variant="secondary">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
            <div className="flex justify-end">
              <Button onClick={() => setIsSummaryModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LeftSidebar;
