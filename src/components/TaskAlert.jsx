import React from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export const TaskAlert = ({ message }) => (
  <Alert variant="destructive" className="animate-in fade-in">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
