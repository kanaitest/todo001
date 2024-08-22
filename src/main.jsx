import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {
QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Create a client
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnReconnect:true,
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
