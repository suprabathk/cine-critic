import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Lato } from "next/font/google";
import MyAppBar from "@/components/common/AppBar";

const lato = Lato({ subsets: ["latin"], weight: "400" });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default function App({ Component, pageProps, router }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        {router.pathname.startsWith("/dashboard") && <MyAppBar />}
        <Component {...pageProps} />
        <CssBaseline enableColorScheme />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
