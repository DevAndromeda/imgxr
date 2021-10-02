import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main>
            <div className="mt-16">
                <img src={logo} alt="logo" className="h-32 mx-auto select-none" draggable={false} />
                <h1 className="text-white text-7xl text-center font-semibold select-none">404</h1>
                <p className="text-white text-4xl text-center font-semibold select-none opacity-70">Page Not Found!</p>
            </div>
            <div className="flex items-center justify-center m-14">
                <Link to="/" className="p-3 bg-green-500 hover:bg-green-600 hover:opacity-80 text-white font-semibold text-xl rounded-md">
                    Return Home
                </Link>
            </div>
        </main>
    );
}
