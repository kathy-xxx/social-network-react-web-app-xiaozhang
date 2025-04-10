import { HashRouter, Route, Routes } from "react-router";
import SocialNetwork from ".";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/*" element={<SocialNetwork />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
