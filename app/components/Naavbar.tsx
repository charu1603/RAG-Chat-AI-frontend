"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Menu } from "lucide-react";

function Navbar() {
  return (
    <>
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">DocuChat</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <BookOpen className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      {/* <div className="hidden lg:block p-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Chat</h2>
            <p className="text-sm text-muted-foreground">3 documents loaded</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default Navbar;
