import {BrowserRouter, Routes, Route} from "react-router-dom";
import FrontpagePage from "./pages/FrontpagePage";
import AdminPage from "./pages/adminPage/AdminPage";
import InfoPage from "./pages/infoPage/InfoPage";
import AddSongPage from "./pages/AddSongPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FrontpagePage/>}/>
                <Route path="admin" element={<AdminPage/>}/>
                <Route path="addSong" element={<AddSongPage/>}/>
                <Route path="info" element={<InfoPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
