import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SideNavigation } from "./components/layout/SideNavigation";
import { WhatsAppButton } from "./components/layout/WhatsappButton";
import ScrollTo from "./components/layout/ScrollTo";

import Approutes from "./Approutes";


function App() {
  const queryClient=new QueryClient()
  return (
    // <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
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
    // </Provider>
  );
}

export default App;
