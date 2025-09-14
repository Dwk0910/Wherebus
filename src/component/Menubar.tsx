import { clsx } from "clsx";
import { IoClose } from "react-icons/io5";

export default function Menubar({
    open,
    isAnimating,
    setOpen,
    setIsAnimating,
}: {
    open: boolean;
    isAnimating: boolean;
    setOpen: (open: boolean) => void;
    setIsAnimating: (animating: boolean) => void;
}) {
    return (
        <div className={"flex flex-col"}>
            <div
                className={clsx(
                    "fixed w-full h-[70vh] bg-black z-10 transition-opacity duration-300",
                    !open && "pointer-events-none"
                )}
                onClick={() => {
                    setIsAnimating(true);
                    setOpen(false);
                    setTimeout(() => {
                        setIsAnimating(false);
                    }, 300);
                }}
                style={{
                    opacity: open ? "0.7" : "0",
                }}
            ></div>
            <div
                className={clsx(
                    "fixed transition-[margin-top] duration-300 mt-[100vh] w-full h-full bg-neutral-800 text-white z-20 rounded-[30px]",
                    "flex flex-col",
                    !open && "pointer-events-none"
                )}
                style={{
                    marginTop: open ? "30vh" : "100vh",
                    opacity: !isAnimating && !open ? "0" : "1",
                }}
            >
                <div className={"flex flex-row w-full justify-end"}>
                    <IoClose
                        className={
                            "text-5xl m-7 text-gray-400 hover:text-gray-600 cursor-pointer"
                        }
                        onClick={() => {
                            setIsAnimating(true);
                            setOpen(false);
                            setTimeout(() => {
                                setIsAnimating(false);
                            }, 300);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
