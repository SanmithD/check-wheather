import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner';
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";
import CityDash from "./pages/CityDash";
import WheatherDash from "./pages/WheatherDash";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <Layout>
        <Routes>
          <Route path='/' element={<WheatherDash/>} />
          <Route path='/city/:cityName' element={<CityDash/>} />
        </Routes>
      </Layout>
      <Toaster richColors />
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App