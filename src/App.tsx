import { BrowserRouter, Route, Routes } from "react-router";
import SocialNetwork from ".";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/*" element={<SocialNetwork />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
