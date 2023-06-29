import { useContext, useRef } from "react";
import { AuthContext } from "./services/AuthContext";

function App() {
  const {
    currentUser,
    loading,
    signIn,
    signOut_,
    error,
    signUp,
    signInWithPopup_,
  } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <>
      <header className="bg-blue-300">Index</header>
      <main className="h-screen bg-orange-200 w-full">
        <div className="text-4xl text-center py-4">
          Welcome to the Blog API platform
        </div>
        <article className="w-full bg-gray-400 flex flex-col items-center py-8 gap-6">
          <p>{currentUser?.email || "Not Signed In"}</p>
          <form action="" className="flex flex-col gap-4">
            <div>
              <label htmlFor="username">Username: </label>
              <input type="text" id="username" ref={emailRef} />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" ref={passwordRef} />
            </div>
          </form>
          <button
            className="bg-blue-400 px-4 py-2 text-white"
            onClick={() => {
              signIn(emailRef.current.value, passwordRef.current.value);
              emailRef.current.value = "";
              passwordRef.current.value = "";
              return;
            }}
          >
            Sign In
          </button>
          <button
            className="bg-green-400 px-4 py-2 text-white "
            onClick={() => signInWithPopup_()}
          >
            Google
          </button>
          <button
            className="bg-red-700 px-4 py-2 text-white"
            onClick={() => signOut_()}
          >
            Sign Out
          </button>
        </article>
        <article>
          <b>{error && error}</b>
        </article>
      </main>
    </>
  );
}

export default App;
