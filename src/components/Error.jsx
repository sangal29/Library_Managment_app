import { Link, useRouteError } from "react-router-dom";

function Error() {
    const error = useRouteError();

    return (
        <section className="h-screen -mt-11 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Oops! Error</h1>
            <p className="mt-3 text-xl font-semibold">Page Not Found!</p>
            <p className="mt-3 text-xl font-semibold">{error.status}, {error.data.slice(6)}</p>
            <img className="mt-6" src="/browser.png" />
            <Link to="/"><button className="bg-sky-700 mt-7 py-2 px-4 rounded-md font-semibold text-lg text-white">Go back to home</button></Link>
        </section>
    )
}

export default Error;