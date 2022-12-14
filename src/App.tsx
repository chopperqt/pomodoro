import "./App.scss";
import "./assets/default.scss";
import "./assets/fonts.scss";
import "./assets/typography.scss";
import { createNotification } from "./helpers/createNotification";

import { Main } from "./pages";

function App() {
  createNotification({
    text: "One minutes and time end",
  });

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
