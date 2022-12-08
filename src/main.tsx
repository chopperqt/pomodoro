import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./service";
import App from "./App";
import ThemeProvider from "./providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
