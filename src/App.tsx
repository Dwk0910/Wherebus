import $ from 'jquery';

import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Topbar from "./component/Topbar";

// pages
import Main from "./pages/Main";
import SearchStops from "./pages/stop/SearchStops.tsx";
import SearchRoutes from "./pages/routes/SearchRoutes.tsx";
import ViewRoutes from "./pages/routes/ViewRoutes.tsx";

export default function App() {
    const [response, setResponse] = useState<string | null>(null);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/health",
    }).then(res => {
        setResponse(res)
    });

    if (response === "OK") {
        return (
            <div className={"flex flex-col h-[100vh]"}>
                <Topbar />
                <div className={"pt-18 text-white h-full"}>
                    <Routes>
                        <Route index element={<Main />} />
                        <Route
                            path={"/error/404"}
                            element={<span>Error 404</span>}
                        />

                        <Route path={"/stops"} element={<SearchStops />} />
                        <Route path={"/routes"} element={<SearchRoutes />} />
                        <Route path={"/routes/:routeId"} element={<ViewRoutes />} />
                    </Routes>
                </div>
            </div>
        );
    }
}
