import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import constants from "../../consts/constants";
import ImageCard from "../ImageCard/ImageCard";

export default function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const authorId = new URLSearchParams(window.location.toString()).get("author");

        fetch(`${constants.API_URL}/posts`)
            .then(async res => {
                return { ok: res.ok, data: await res.json() };
            })
            .then(data => {
                if (!data.ok) return;
                // TODO: fix this
                setImages(authorId ? data.data.filter(x => x.author.id === authorId) : data.data);
            })
    }, []);

    return (
        <main>
            <div className="mt-16">
                <img src={logo} alt="logo" className="h-32 mx-auto select-none" draggable={false} />
                <h1 className="text-white text-7xl text-center font-semibold select-none">IMGXR - Gallery</h1>
            </div>
            <div className="px-20 mt-14 mb-14">
                <h1 className="text-white text-3xl font-semibold select-none mb-5">All Images</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-5 w-full">
                    {
                        images.length ? images.map((m, i) => <ImageCard
                            key={i}
                            image={`${constants.API_URL}/images/${m.name}`}
                            imageID={m.name}
                            authorID={m.author.id}
                            author={`${constants.API_URL}/avatars/${m.author.id}/${m.author.avatar}`}
                            authorName={m.author.username}
                        />)
                            : <h1 className="text-white text-lg font-semibold">Loading...</h1>
                    }
                </div>
            </div>
        </main>
    );
}
