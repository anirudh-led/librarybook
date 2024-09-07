import { Route, Routes, BrowserRouter } from "react-router-dom";
//pages and components
import Books from "./pages/Books";
import Admin from "./pages/Admin";
import Lander from "./pages/Lander";
import Create from "./pages/Create";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/admin/books" element={<Books />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Lander />} />
            <Route path="/admin/create" element={<Create />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
