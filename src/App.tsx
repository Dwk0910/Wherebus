import Topbar from "./component/Topbar";

export default function App() {
    return (
        <div className={"flex flex-col h-[100vh]"}>
            <Topbar />
            <div className={"pt-18 text-white"}>
                <div></div>
            </div>
        </div>
    );
}
