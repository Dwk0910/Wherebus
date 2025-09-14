import Topbar from "./component/Topbar";

import Main from "./pages/Main";

export default function App() {
    return (
        <div className={"flex flex-col h-[100vh]"}>
            <Topbar />
            <div className={"pt-18 text-white"}>
                <Main />
            </div>
        </div>
    );
}
