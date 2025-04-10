import { BrowserRouter, Route, Routes } from "react-router";
import SocialNetwork from ".";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/*" element={<SocialNetwork />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
