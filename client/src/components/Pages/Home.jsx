import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import constants from "../../consts/constants";
import ImageCard from "../ImageCard/ImageCard";

export default function Home() {
    const [images, setImages] = useState({
        newImages: [],
        randomImages: []
    });

    useEffect(() => {
        fetch(`${constants.API_URL}/posts`)
            .then(async res => {
                return { ok: res.ok, data: await res.json() };
            })
            .then(data => {
                if (!data.ok) return;
                setImages({
                    newImages: data.data.slice(0, 4),
                    randomImages: shuffleArray(data.data).slice(0, 4)
                });
            })
    }, []);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    return (
        <main>
            <div className="mt-16">
                <img src={logo} alt="logo" className="h-32 mx-auto select-none" draggable={false} />
                <h1 className="text-white text-7xl text-center font-semibold select-none">IMGXR</h1>
            </div>
            <div className="px-20 mt-14">
                <h1 className="text-white text-3xl font-semibold select-none mb-5">Random Images</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-1 md:gap-5 gap-10 w-full">
                    {
                        images.randomImages.length ? images.randomImages.map((m, i) => <ImageCard
                            key={i}
                            image={`${constants.API_URL}/images/${m.name}`}
                            imageID={m.name}
                            authorID={m.author.id}
                            authorName={m.author.username}
                            author={`${constants.API_URL}/avatars/${m.author.id}/${m.author.avatar}`}
                        />)
                        : <h1 className="text-white text-lg font-semibold">Loading...</h1>
                    }
                </div>
            </div>
            <div className="px-20 mt-14 mb-10">
                <h1 className="text-white text-3xl font-semibold select-none mb-5">New Images</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-1 md:gap-5 gap-10 w-full">
                    {
                        images.newImages.length ? images.newImages.map((m, i) => <ImageCard
                            key={i}
                            image={`${constants.API_URL}/images/${m.name}`}
                            imageID={m.name}
                            authorID={m.author.id}
                            authorName={m.author.username}
                            author={`${constants.API_URL}/avatars/${m.author.id}/${m.author.avatar}`}
                        />)
                            : <h1 className="text-white text-lg font-semibold">Loading...</h1>
                    }
                </div>
            </div>
        </main>
    );
}
