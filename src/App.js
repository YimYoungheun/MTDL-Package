import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BBoxOrder from "./components/BBoxOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/box-type-b" />} />
        <Route path="/box-type-b" element={<BBoxOrder />} />  {/* 이 줄이 꼭 필요!! */}
      </Routes>
    </Router>
  );
}

export default App;