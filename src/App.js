import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Rooms from "./components/pages/Rooms";
import RoomIdPage from "./components/pages/RoomIdPage";




function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rooms" element={<Rooms/>}/>
                <Route path="/room/:id" element={<RoomIdPage/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/rooms" replace/>}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
