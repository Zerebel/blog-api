import { useContext } from "react";
import Header from "./header";
import AuthProvider, { AuthContext } from "../services/AuthContext";
import BlogLogo from "../assets/blog.svg";

export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Header />
      <main className="flex flex-col items-center font-Roboto text-lg">
        <div className="flex flex-col px-2 md:px-16 lg:px-24 ">
          <h1 className="text-4xl font-semibold flex items-center">
            Welcome to the{" "}
            <img src={BlogLogo} alt="Blog" className=" w-24 h-24" /> API
            platform
          </h1>
          <h3 className="text-2xl font-medium">Start with the basics</h3>
          <article className="flex flex-col gap-8">
            <section className="grid lg:grid-cols-2 px-4 md:px-0 gap-4 min-h-[25vh]">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded p-4 flex justify-end text-white md:w-96 flex-col gap-2">
                <p>User API key</p>
                <pre className="bg-gray-600 p-4 rounded">
                  {currentUser && (
                    <code className="text-white">{currentUser?.uid}</code>
                  )}
                  {!currentUser && (
                    <code className="text-white">Login for API Key</code>
                  )}
                </pre>
              </div>

              <div className="bg-gradient-to-r from-pink-500  to-yellow-500 rounded p-4 flex justify-end text-white flex-col md:w-96 gap-2">
                <p className="text-xl">User Verified</p>
                <pre className="bg-gray-600 text-white p-4 rounded">
                  {currentUser && (
                    <code
                      className={`${
                        currentUser?.emailVerified
                          ? "text-blue-600"
                          : "bg-red-400"
                      }`}
                    >
                      {currentUser?.emailVerified.toString().toUpperCase()}
                    </code>
                  )}
                  {!currentUser && (
                    <code className="text-white">Requires Login</code>
                  )}
                </pre>
              </div>
            </section>

            {/* Usage */}

            <section className=" max-w-3xl">
              <h2 className="uppercase text-2xl font-semibold">usage</h2>
              <div className="flex flex-col gap-2">
                <p className="">
                  To access our Blog API, you can make requests to the following
                  endpoint:
                </p>
                <pre className="bg-gray-600 text-white p-4 rounded">
                  <code className="text-white">
                    https://auth-dev-ae419.web.app/api
                  </code>
                </pre>
                <p className="">
                  However, for a faster response and to optimize data transfer,
                  we recommend filtering the results based on the specific
                  fields you need.
                </p>
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="uppercase text-2xl font-semibold">
                About This project
              </h2>
              <p className="max-w-3xl py-2">
                <span className="pl-4 italic">Blog API</span> is a powerful and
                flexible backend system designed to manage and deliver blog
                content. Built with modern technologies like Node.js and
                Express.js, our API provides efficient content creation,
                organization, and retrieval. With secure authentication,
                database integration, and essential features like pagination and
                search, our Blog API empowers developers to create exceptional
                blog experiences.
              </p>
            </section>

            {/* Contributing */}
            <section>
              <h2 className="uppercase text-2xl font-semibold">Contributing</h2>
              <p className="max-w-3xl py-2">
                Any help is always welcome! Just edit the relevant file and
                create a new Merge Request or you can also donate using Patreon
                or PayPal.
              </p>
            </section>
          </article>
        </div>
      </main>
    </AuthProvider>
  );
}
