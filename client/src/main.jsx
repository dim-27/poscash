import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppWrapper from "./app/AppWrapper.jsx";
import { store } from "./features/store.js";
import { AuthContextProvider } from "./components/auth/AuthContext.jsx";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthContextProvider>
            <AppWrapper />
          </AuthContextProvider>
        </BrowserRouter>
      </Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
