"use client";

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";


interface LoadingDialogProps {
  isLoading: boolean;
  message?: string;
}

export function Loading({
  isLoading,
  message = "Loading...",
}: LoadingDialogProps) {
  return (
    <Dialog open={isLoading} onOpenChange={() => {}}>
      <DialogContent
        className="flex flex-col items-center justify-center bg-transparent border-0 border-transparent outline-none border-none shadow-none w-60 h-60 rounded-xl"
        showCloseButton={false}
      >
        <DialogTitle></DialogTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"animate-spin text-white"}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <p className="mt-4 text-white font-medium text-center">{message}</p>
      </DialogContent>
    </Dialog>
  );
}
