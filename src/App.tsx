import { Routes, Route } from "react-router-dom";

import Topbar from "./component/Topbar";

// pages
import Main from "./pages/Main";
import SearchStops from "./pages/SearchStops";
import SearchRoutes from "./pages/SearchRoutes";

export default function App() {
    return (
        <div className={"flex flex-col h-[100vh]"}>
            <Topbar />
            <div className={"pt-18 text-white h-full"}>
                <Routes>
                    <Route index element={<Main />} />
                    <Route path={"/stops"} element={<SearchStops />} />
                    <Route path={"/routes"} element={<SearchRoutes />} />
                </Routes>
            </div>
        </div>
    );
}
