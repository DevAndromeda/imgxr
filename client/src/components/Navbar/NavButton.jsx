export default function NavButton({ text, button = false }) {
    return (
        <div className={`${button ? "p-4 md:p-2 w-full bg-green-600 hover:bg-green-700 rounded-md" : ""}`}>
            <span className={`text-white font-semibold text-xl cursor-pointer hover:opacity-80`}>{text}</span>
        </div>
    );
}
