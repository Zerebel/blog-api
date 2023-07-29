import { useContext } from "react";
import Header from "./header";
import AuthProvider, { AuthContext } from "../services/AuthContext";
import BlogLogo from "../assets/blog.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { GitHubContributions } from "./props";

export default function Dashboard() {
  const { currentUser, loading, verifyEmail, setLoading } =
    useContext(AuthContext);

  const handleEmailVerification = async () => {
    setLoading(true);
    return await verifyEmail();
  };
  return (
    <AuthProvider>
      <Header />
      <main className="flex flex-col items-center font-Roboto text-lg mt-12">
        <div className="flex flex-col px-2 md:px-16 lg:px-24 ">
          <h1 className="text-4xl font-semibold flex items-center">
            Welcome to the{" "}
            <img src={BlogLogo} alt="Blog" className=" w-24 h-24" /> API
            platform
          </h1>
          <h3 className="text-2xl font-medium">Start with the basics</h3>
          <article className="flex flex-col gap-8">
            <section className="grid lg:grid-cols-2 px-4 md:px-0 gap-4 min-h-[25vh]">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded p-4 flex justify-end text-white md:w-96 md:minw flex-col gap-2">
                <p>User API key</p>
                <pre className="bg-gray-600 p-4 rounded">
                  {currentUser && (
                    <code className="text-white">
                      {currentUser?.emailVerified
                        ? currentUser?.uid
                        : "Email not verified"}
                    </code>
                  )}
                  {!currentUser && (
                    <code className="text-white">Login for API Key</code>
                  )}
                </pre>
              </div>

              <div className="bg-gradient-to-r from-pink-500  to-yellow-500 rounded p-4 flex justify-end text-white flex-col md:w-96 gap-2">
                <p className="text-xl">User Verified</p>
                <pre className="bg-gray-600 text-white p-4 rounded flex">
                  {currentUser && (
                    <code
                      className={`${
                        currentUser?.emailVerified
                          ? "text-blue-600"
                          : "text-red-400"
                      } flex w-full justify-between`}
                    >
                      {currentUser?.emailVerified.toString().toUpperCase()}
                      {!currentUser?.emailVerified && (
                        <LoadingButton
                          loading={loading}
                          loadingPosition="end"
                          endIcon={<SendIcon />}
                          variant="contained"
                          className="!capitalize !bg-blue-500 !h-7 !px-8"
                          onClick={handleEmailVerification}
                        >
                          Verify Email
                        </LoadingButton>
                      )}
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

            <section className="max-w-3xl h-[22rem] min-h-full pointer-events-none select-none flex flex-col">
              <p className="font-semibold">
                Fetching all Blog Posts - - Authenticated GET Request
              </p>
              <span className="text-base max-w-xl">
                To fetch data from the API, make sure to include the following
                headers and use the GET method in your request.{" "}
                <span className="italic font-sans">
                  The headers are strictly required for all requests
                </span>
              </span>
              <iframe
                src="https://stackblitz.com/edit/js-g8v1rh?embed=1&file=index.js&hideExplorer=1&hideNavigation=1&view=editor"
                className="w-full h-full"
              ></iframe>
            </section>

            <section className="max-w-3xl h-80 pointer-events-none select-none flex flex-col">
              <p>
                To retrieve a single blog post from the API, simply pass a query
                in the URL.
              </p>
              <iframe
                src="https://stackblitz.com/edit/js-g8v1rh?embed=1&file=query.js&hideExplorer=1&hideNavigation=1&view=editor"
                className="w-full h-full"
              ></iframe>
            </section>

            {/* Adding */}
            <section className="max-w-3xl h-[28rem] min-h-full pointer-events-none select-none flex flex-col">
              <p className="font-semibold">
                Uploading Blogs - Authenticated POST Request
              </p>
              <span className="text-base">
                This code shows how to make a POST request to the API with the
                given URL, headers, and data. It returns the blog details, date
                created and date updated.
              </span>
              <iframe
                src="https://stackblitz.com/edit/js-g8v1rh?embed=1&file=add.js&hideExplorer=1&hideNavigation=1&view=editor"
                className="w-full h-full"
              ></iframe>
            </section>

            {/* Updating */}
            <section className="max-w-3xl h-[28rem] min-h-full pointer-events-none select-none flex flex-col">
              <p className="font-semibold">
                Updating Blogs - Authenticated PUT Request
              </p>
              <span className="text-base">
                This code demonstrates making a PUT request to the API using the
                provided URL, headers, and data. The response includes the new
                blog details, creation date, and update date.
              </span>
              <iframe
                src="https://stackblitz.com/edit/js-g8v1rh?embed=1&file=update.js&hideExplorer=1&hideNavigation=1&view=editor"
                className="w-full h-full"
              ></iframe>
            </section>

            {/* Deleting */}
            <section className="max-w-3xl h-[24rem] min-h-full pointer-events-none select-none flex flex-col">
              <p className="font-semibold">
                Deleting Blogs - Authenticated DELETE Request
              </p>
              <span className="text-base">
                This code performs a DELETE request to the API with the given
                URL, headers, and data. Upon successful execution, the response
                will include a success message.
              </span>
              <iframe
                src="https://stackblitz.com/edit/js-g8v1rh?embed=1&file=delete.js&hideExplorer=1&hideNavigation=1&view=editor"
                className="w-full h-full"
              ></iframe>
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
                create a new Merge Request. Users are also encouraged to create{" "}
                <a
                  href="https://github.com/Zerebel/blog-api/issues"
                  target="_blank"
                  rel="noreferrer"
                  className=" text-slate-600 italic"
                >
                  GitHub issues
                </a>{" "}
                for any questions, feedback, or bug reports related to the
                project. Your contributions and suggestions are highly
                appreciated! If you&apos;d like to contribute, feel free to edit
                the relevant file and submit a new Merge Request, and we&apos;ll
                be glad to review and merge your changes. Let&apos;s work
                together to make this project even better!
              </p>
            </section>
          </article>
        </div>
        <GitHubContributions />
      </main>
    </AuthProvider>
  );
}
