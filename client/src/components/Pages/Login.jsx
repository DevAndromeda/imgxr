import logo from "../../assets/logo.svg";
import { useEffect, useRef, useState } from "react";
import constants from "../../consts/constants";
import { Link } from "react-router-dom";

export default function Login() {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [submitError, setSubmitError] = useState(null);
    const [formDisabled, setFormDisabled] = useState(true);

    useEffect(() => {
        if (!window.localStorage.getItem("jsonwebtoken")) return setFormDisabled(false);
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
                if (!data.ok) return setFormDisabled(false);
                if (data.ok) {
                    window.localStorage.setItem("userinfo", JSON.stringify(data.data));
                    window.location.href = "/";
                }
            })
            .catch(() => {});
    }, []);

    function handleSubmit(ev) {
        ev.preventDefault();
        clearError();
        const data = {
            email: emailRef.current?.value,
            password: passRef.current?.value
        };

        for (const item of Object.values(data)) {
            if (!item) return setSubmitError("Invalid form data!");
        }

        fetch(`${constants.API_URL}/authorize/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (res) => {
                return { ok: res.ok, data: await res.json() };
            })
            .then((d) => {
                if (!d.ok) return setSubmitError(d.data.error || d.data.message);
                window.localStorage.setItem("jsonwebtoken", String(d.data.jwt));
                window.localStorage.setItem("userinfo", JSON.stringify(d.data.user));
                window.location.href = "/";
            })
            .catch((err) => setSubmitError(err.message));
    }

    function clearError() {
        if (submitError) setSubmitError(null);
    }

    return (
        <>
            <div className="mt-16">
                <img src={logo} alt="logo" className="h-32 mx-auto select-none" draggable={false} />
                <h1 className="text-white text-7xl text-center font-semibold select-none">Login</h1>
            </div>
            <div className="mt-14 px-3 mx-auto">
                {submitError ? (
                    <p className="text-lg font-semibold text-red-500 text-center select-none">
                        Submission Error: <b>{submitError}</b>
                    </p>
                ) : null}
                <form className="flex flex-col md:w-1/2 mx-auto gap-3" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-white opacity-80 font-semibold text-lg">
                        1. E-mail
                    </label>
                    <input disabled={formDisabled} onInput={clearError} ref={emailRef} name="email" id="email" className="p-3 rounded-md text-gray-800 shadow-2xl focus:outline-none font-semibold" type="email" placeholder="me@example.com" required />

                    <label htmlFor="password" className="text-white opacity-80 font-semibold text-lg">
                        2. Password
                    </label>
                    <input disabled={formDisabled} onInput={clearError} ref={passRef} name="password" id="password" className="p-3 rounded-md text-gray-800 shadow-2xl focus:outline-none font-semibold" type="password" placeholder="p@ssw0rd" required />

                    <button disabled={formDisabled} type="submit" className="p-3 mt-5 bg-green-500 hover:opacity-80 hover:bg-green-600 text-white font-semibold text-xl rounded-md">
                        Login
                    </button>
                </form>
                <p className="text-gray-300 text-center mt-7 text-lg font-semibold">
                    <Link to="/signup">
                        <b className="text-blurple-500 hover:text-blurple-700">Sign Up</b>
                    </Link>{" "}
                    instead
                </p>
            </div>
        </>
    );
}
