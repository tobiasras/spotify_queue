import {BrowserRouter, Routes, Route} from "react-router-dom";
import FrontpagePage from "./pages/FrontpagePage";
import AdminPage from "./pages/AdminPage";
import InfoPage from "./pages/InfoPage";
import AddSongPage from "./pages/AddSongPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FrontpagePage/>}/>
                <Route path="admin" element={<AdminPage/>}/>
                <Route path="addSong" element={<AddSongPage/>}/>
                <Route path="info" element={<InfoPage/>}/>
            </Routes>
            {/* <Navbar/> */}
        </BrowserRouter>
    )
}

export default App;
