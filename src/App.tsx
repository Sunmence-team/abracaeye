import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Contact from "./pages/view/Contact";
import Blogdetatails from "./pages/view/Blogdetatails";
function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />

        
        <Route path="/blogdetails" element={<Blogdetatails />} />
      </Routes>
    </>
  );
}

export default App;
