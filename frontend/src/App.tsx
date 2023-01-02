import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./stores";
import ItemPage from "./pages/admin/ItemPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDasboard from "./pages/admin/AdminDashboard";
import BookPage from "./pages/BookPage";
import ProtectedRoute from "./routers/ProtectedRoute";
import RouteAdmin from "./routers/RouteAdmin";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import Profile from "./pages/Profile";
import { Router } from "./routers/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* protected */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<RouteAdmin />}>
                  <Route index path="admin" element={<AdminDasboard />} />
                  <Route path={Router.admin.action}>
                    <Route index element={<ItemPage />} />
                    <Route path=":idItem" element={<ItemPage />} />
                  </Route>
                </Route>
                <Route path={Router.order} element={<OrderPage />} />
                <Route path={Router.profile} element={<Profile />} />
              </Route>
              <Route path="*" element={<div>Not found page</div>} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
