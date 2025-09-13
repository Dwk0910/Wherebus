import { clsx } from "clsx";

export default function Menubar({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <div className={"flex flex-col"}>
            <div
                className={clsx(
                    "h-[70vh] bg-black z-10 transition-opacity duration-300",
                    !open && "pointer-events-none"
                )}
                onClick={() => {
                    setOpen(false);
                }}
                style={{
                    opacity: open ? "0.7" : "0",
                }}
            ></div>
            <div
                className={
                    "fixed transition-all duration-300 mt-[100vh] w-full h-full bg-neutral-800 text-white z-20 border-gray-400 border-t-1"
                }
                style={{
                    marginTop: open ? "30vh" : "100vh",
                }}
            >
                Hello, World!
            </div>
        </div>
    );
}
