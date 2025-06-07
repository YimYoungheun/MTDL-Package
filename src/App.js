// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BBoxOrder from "./components/BBoxOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/box-type-b" element={<BBoxOrder />} />
        {/* 앞으로 다른 제품 추가시 여기에 추가 */}
        {/* <Route path="/box-type-y" element={<YBoxOrder />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
