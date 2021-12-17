import React from "react";
import ReactDOM from "react-dom";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { AppRouter } from "./Router";

ReactDOM.render(
  <React.StrictMode>
    <CustomizationProvider
      baseTheme="dark"
      theme={{
        space: {
          space0: "3px",
        },
        fontSizes: {
          fontSize30: "16px",
        },
      }}
    >
      <AppRouter />
    </CustomizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
