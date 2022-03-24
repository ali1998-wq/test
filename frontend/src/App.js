import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import EditSectors from "./pages/EditSectors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Index />}></Route>
        <Route path="/edtisector" element={<EditSectors />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
