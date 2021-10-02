import { useRef, useState, useEffect } from "react";
import NavButton from "./NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import constants from "../../consts/constants";

export default function Navbar() {
    const mobileNavRef = useRef(null);
    const mobileNavContainer = useRef(null);
    const [currentIcon, setCurrentIcon] = useState(faHamburger);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (!window.localStorage.getItem("jsonwebtoken")) return;
        fetch(`${constants.API_URL}/authorize/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json"
            }
        })
            .then(async (res) => {
                return { ok: res.ok, data: await res.json() };
            })
            .then((data) => {
                if (!data.ok) {
                    window.localStorage.removeItem("jsonwebtoken");
                    window.localStorage.removeItem("userinfo");
                    setCurrentUser(null);
                    return;
                }
                if (data.ok) {
                    setCurrentUser(data.data);
                    window.localStorage.setItem("userinfo", JSON.stringify(data.data));
                }
            })
            .catch(() => {});
    }, []);

    return (
        <header className="h-16 bg-green-500">
            <div className="hidden md:flex p-3 flex-row w-3/4 mx-auto">
                <Link to="/">
                    <h1 className="text-white font-semibold text-3xl select-none cursor-pointer ml-8 hover:opacity-80">IMGXR</h1>
                </Link>
                <div className="menus flex space-x-5 mx-auto p-1 text-white select-none">
                    <Link to="/">
                        <NavButton text="Home" />
                    </Link>
                    <Link to="/gallery">
                        <NavButton text="Gallery" />
                    </Link>
                    <Link to="/api">
                        <NavButton text="API" />
                    </Link>
                    <Link to="/github">
                        <NavButton text="GitHub" />
                    </Link>
                </div>
                <Link to={currentUser ? "/dashboard" : "/login"}>
                    <NavButton text={currentUser ? "Dashboard" : "Login"} button />
                </Link>
            </div>

            <div ref={mobileNavContainer} className="md:hidden mx-auto mobile p-3">
                <div className="flex">
                    <Link to="/">
                        <h1 className="text-white font-semibold text-3xl select-none cursor-pointer ml-8 hover:opacity-80">IMGXR</h1>
                    </Link>
                    <span
                        className="ml-auto mr-5 text-white hover:opacity-80 font-semibold text-3xl"
                        onClick={() => {
                            const isInvisible = mobileNavRef.current?.classList.toggle("invisible");
                            if (!isInvisible) {
                                setCurrentIcon(faTimes);
                                mobileNavContainer.current?.classList.add("bg-green-500", "h-screen", "z-50", "relative");
                            } else {
                                setCurrentIcon(faHamburger);
                                mobileNavContainer.current?.classList.remove("bg-green-500", "h-screen", "z-50", "relative");
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={currentIcon} />
                    </span>
                </div>
                <div className="menus flex flex-col space-y-5 mx-auto text-white select-none mt-14 invisible" ref={mobileNavRef}>
                    <Link to="/">
                        <NavButton text="Home" button />
                    </Link>
                    <Link to="/gallery">
                        <NavButton text="Gallery" button />
                    </Link>
                    <Link to="/api">
                        <NavButton text="API" button />
                    </Link>
                    <Link to="/github">
                        <NavButton text="GitHub" button />
                    </Link>
                    <Link to={currentUser ? "/dashboard" : "/login"}>
                        <NavButton text={currentUser ? "Dashboard" : "Login"} button />
                    </Link>
                </div>
            </div>
        </header>
    );
}
