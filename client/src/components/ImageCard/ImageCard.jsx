import { Link } from "react-router-dom";
import constants from "../../consts/constants";

export default function ImageCard({
    image = "https://cdn.pixabay.com/photo/2021/07/24/01/42/zebra-dove-6488440_960_720.jpg",
    imageID,
    authorID,
    authorName = "John Doe",
    author = "https://cdn.discordapp.com/embed/avatars/2.png"
}) {
    return (
        <div className="group border-2 border-gray-600 relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
            <div className="relative w-full h-80 md:h-64 lg:h-44">
                <a href={`${constants.API_URL}/images/${imageID}`} rel="noreferrer" target="_blank">
                    <img src={image} draggable="false" alt="img" className="select-none w-full h-full object-center object-cover" />
                </a>
            </div>
            <div className="px-3 py-4 flex space-x-1">
                <Link to={`/gallery?author=${authorID}`}>
                    <img src={author} alt="author" className="h-10 w-10 rounded-full select-none" draggable="false" />
                </Link>
                <Link to={`/gallery?author=${authorID}`}>
                    <h3 className="py-1 px-2 text-lg font-semibold text-white opacity-90 select-none">{authorName}</h3>
                </Link>
            </div>
        </div>
    );
}
