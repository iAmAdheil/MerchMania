import Searchbar from "./searchbar";
export default function Navbar() {
    return (
        <div className="bg-white dark:bg-black px-14 py-2 border-b border-solid border-gray-200 dark:border-gray-800 shadow-lg flex flex-row items-center z-10">
            <div className="flex flex-row items-center gap-4">
                <span className="text-2xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
                    CreatorMerch
                </span>
                <Searchbar />
            </div>
        </div>
    );
}
