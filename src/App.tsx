import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Routers from "./config/Routers";
import "./App.css";

function App() {
  const customTheme = extendTheme({
    colors: {
      light: "#B8B8B8",
      main: "#141414",
      dark: "#0E0A0A",
    },
    brand: {
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
    Text: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    }
  });

  return (
    <ChakraProvider theme={customTheme}>
      <Routers />
    </ChakraProvider>
  );
}

export default App;
