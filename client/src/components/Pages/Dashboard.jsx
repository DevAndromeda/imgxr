import { useEffect, useState, useRef } from "react";
import constants from "../../consts/constants";

export default function Dashboard() {
    const imageRef = useRef(null);
    const [submitError, setSubmitError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        try {
            const data = JSON.parse(window.localStorage.getItem("userinfo"));
            setUserInfo(data);
        } catch(e) {
            setSubmitError(`${e}`);
        }
    }, []);

    async function handleSubmit(ev) {
        ev.preventDefault();
        clearError();

        if (!imageRef.current?.files.length) return setSubmitError("Missing image file");

        const params = new FormData(ev.target);

        fetch(`${constants.API_URL}/posts`, {
            method: "POST",
            body: params,
            headers: {
                "Authorization": `Bearer ${window.localStorage.jsonwebtoken}`
            }
        })
            .then(async (res) => {
                return { ok: res.ok, data: await res.json() };
            })
            .then((d) => {
                if (!d.ok) return setSubmitError(d.data.error || d.data.message);
                window.location.href = "/";
            })
            .catch((err) => setSubmitError(err.message));
    }

    function clearError() {
        if (submitError) setSubmitError(null);
    }

    return (
        !userInfo ? <>
            <h1 className="text-5xl text-white font-semibold text-center my-14">Loading...</h1>
        </> :
            <>
                <div className="mt-16">
                    <img src={`${constants.API_URL}/avatars/${userInfo.id}/${userInfo.avatar}`} alt="avatar" className="h-32 mx-auto select-none" draggable={false} />
                    <h1 className="text-white text-7xl text-center font-semibold select-none">{userInfo.username}</h1>
                    <p className="text-white text-xl text-center font-semibold opacity-80">{userInfo.id}</p>
                </div>
                <div className="mt-14 px-3 mx-auto">
                    <form className="flex flex-col md:w-1/2 mx-auto gap-3" onSubmit={handleSubmit}>
                        <h1 className="text-white font-semibold text-2xl my-5">Upload Image</h1>
                        {submitError ? (
                            <p className="text-lg font-semibold text-red-500 text-center select-none">
                                Submission Error: <b>{submitError}</b>
                            </p>
                        ) : null}
                        <label htmlFor="image" className="text-white opacity-80 font-semibold text-lg">
                            1. Select Image (Only JPEG and PNG supported)
                        </label>
                        <input ref={imageRef} name="image" id="image" className="p-3 rounded-md text-white bg-gray-500 shadow-2xl focus:outline-none font-semibold" required type="file" accept=".png,.jpg,.jpeg" />

                        <button type="submit" className="p-3 mt-5 bg-green-500 hover:opacity-80 hover:bg-green-600 text-white font-semibold text-xl rounded-md">
                            Submit
                        </button>
                    </form>
                </div>
            </>
    );
}
