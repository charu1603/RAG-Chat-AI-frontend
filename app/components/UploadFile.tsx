"use client";
import { Upload } from "lucide-react";
import React from "react";

const UploadFile = () => {
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
          await fetch("https://rag-chat-ai-backend.onrender.com/upload/pdf", {
            method: "POST",
            body: formData,
          });
          console.log("file uploaded");
        }
      }
    });
    el.click();
  };
  return (
    <div className="rounded-lg p-4 bg-white text-black flex justify-center items-center ">
      <div className="flex" onClick={hanldeFileUpload}>
        Upload pdf
        <Upload />
      </div>
    </div>
  );
};

export default UploadFile;
