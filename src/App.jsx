import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SideNavigation } from "./components/layout/SideNavigation";
import { WhatsAppButton } from "./components/layout/WhatsappButton";
import ScrollTo from "./components/layout/ScrollTo";
import Approutes from "./Approutes";
import ScrollToTopOnRouteChange from "./components/layout/ScrollToTopOnRoute";
import { store } from "./redux/store";
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "./services/queryclient";
function App() {

  return (
    <Provider store={store}>
     <Toaster position="bottom-right" />
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
        <ScrollToTopOnRouteChange />
          {/* Fixed Layout Components */}
          <SideNavigation />
          <Navbar />
          <WhatsAppButton />
          <ScrollTo />

          {/* Main Routes */}
          <main >
            <Approutes />
          </main>

          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
   </Provider>
  );
}

export default App;
