import { Routes, Route } from "react-router-dom";
import History from "./pages/History";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/history" element={<History />} />
        <Route exact path="/" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
