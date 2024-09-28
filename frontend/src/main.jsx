import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const styles = {
	global: (props) => ({
	  body: {
		color: mode("#000000", "#FFFFFF")(props), // Black components in light mode, white components in dark mode
		bg: mode("#FFFFFF", "#161323")(props),    // White background in light mode, solid #161323 background in dark mode
	  },
	}),
  };
  
  const config = {
	initialColorMode: "dark", // Set initial color mode to dark
	useSystemColorMode: true, // Allow using system color mode preference
  };
  
  const colors = {
	gray: {
	  light: "#FFFFFF",  // White background for light mode
	  dark: "#161323",   // Solid #161323 background for dark mode
	},
	primary: {
	  light: "#000000",   // Black components for light mode
	  dark: "#FFFFFF",    // White components for dark mode
	},
  };
  

  
  

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
	// React.StrictMode renders every component twice (in the initial render), only in development.
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<SocketContextProvider>
						<App />
					</SocketContextProvider>
				</ChakraProvider>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
);
