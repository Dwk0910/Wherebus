import Topbar from "./component/Topbar";

export default function App() {
    return (
        <div className={"flex flex-col"}>
            <Topbar />
            <div className={"mt-15"}>
                <h1>Hello, World!</h1>
            </div>
        </div>
    );
}
