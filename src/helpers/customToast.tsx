import React from "react";
import { toast } from "react-toastify";

export const customToast = (
  type: "success" | "error" | "info",
  message: string
) => {
  if (type === "success") {
    toast.success(<h3>{message}</h3>, {
      autoClose: 2000,
    });
  }

  if (type === "error") {
    toast.error(<h3>{message}</h3>, {
      autoClose: 2000,
    });
  }

  if (type === "info") {
    toast.error(<h3>{message}</h3>, {
      autoClose: 2000,
    });
  }
};
