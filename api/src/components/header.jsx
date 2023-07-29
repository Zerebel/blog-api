import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthProvider, { AuthContext } from "../services/AuthContext";
import Blog from "../assets/Blog.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const { currentUser, signOut_ } = useContext(AuthContext);
  return (
    <AuthProvider>
      <header className="w-full bg-slate-50 fixed top-0 left-0">
        <nav className="flex w-full justify-between py-2 md:py-0">
          <p className="uppercase font-bold md:hidden pl-4">Blog API</p>
          <ul
            className={`${
              isMenuOpen ? "" : "hidden"
            } justify-between py-2 px-8 font-Roboto shadow-lg absolute md:relative z-50 flex-col md:flex-row bg-inherit h-screen md:h-auto md:flex w-full`}
          >
            <div className="flex gap-4 items-center flex-col md:flex-row">
              <button className="md:hidden self-end" onClick={toggleMenu}>
                <span className="material-icons-outlined">close</span>
              </button>
              <li className="uppercase font-bold flex items-center gap-1">
                <img src={Blog} className="w-12" alt="BLOG" /> API
              </li>
              <div className="outline outline-1 outline-slate-600 h-auto md:w-auto md:h-6 w-full"></div>
              <li>
                <a
                  href="https://github.com/Zerebel/blog-api"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:font-semibold"
                >
                  View on Github
                </a>
              </li>
              <div className="outline outline-1 outline-slate-600 h-auto md:w-auto md:h-6 w-full"></div>
              <li>
                <a
                  href="https://github.com/Zerebel/blog-api/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:font-semibold"
                >
                  Issues
                </a>
              </li>
              <div className="outline outline-1 outline-slate-600 h-auto md:w-auto md:h-6 w-full"></div>
            </div>
            {currentUser ? (
              <div className="flex gap-2 items-center">
                <span>{currentUser.email}</span>
                <Link
                  to={"/login"}
                  className="py-1 bg-red-700 px-2 text-white"
                  onClick={() => signOut_()}
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 mt-4 md:mt-0 items-center flex-col md:flex-row">
                <li className="">
                  <Link to={"/login"}>Log in</Link>
                </li>
                <Link to={"/signup"}>
                  <li className="bg-green-400 text-white px-4 py-2">Sign up</li>
                </Link>
              </div>
            )}
          </ul>
          <button onClick={toggleMenu} className="md:hidden pr-4">
            <span className="material-icons-outlined">menu</span>
          </button>
          <hr className="mb-4 hidden md:block" />
        </nav>
      </header>
    </AuthProvider>
  );
}
