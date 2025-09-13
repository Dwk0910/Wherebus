import { useState } from "react";

import { IoMenu } from "react-icons/io5";
import Menubar from "./Menubar";

export default function Topbar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={"flex flex-row fixed items-center"}>
                <div
                    className={"bg-gray-700 m-3 px-6 pb-3 pt-4 shadow-2xl"}
                    style={{
                        borderRadius: "5px 20px 5px 20px",
                    }}
                >
                    <span
                        className={
                            "font-bold text-[1.2rem] text-white font-SeoulNamsan grow"
                        }
                    >
                        어디쯤버스
                    </span>
                </div>
                <div
                    className={
                        "flex bg-neutral-700 p-3 rounded-[5px] shadow-2xl cursor-pointer transition-all duration-200 ease-in-out hover:shadow-3xl hover:scale-110"
                    }
                    onClick={() => setOpen(!open)}
                >
                    <IoMenu className={"text-white text-[1.8rem]"} />
                </div>
            </div>
            <Menubar open={open} setOpen={setOpen} />
        </>
    );
}
