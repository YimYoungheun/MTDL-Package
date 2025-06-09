import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BBoxOrder from "./components/BBoxOrder";
import YBoxOrder from "./components/YBoxOrder";
import NamecardOrder from "./components/NamecardOrder"; // ⭐️ 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/box-type-b" />} />
        <Route path="/box-type-b" element={<BBoxOrder />} />
        <Route path="/box-type-y" element={<YBoxOrder />} />
        <Route path="/order-namecard" element={<NamecardOrder />} /> {/* ⭐️ 이 줄 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
