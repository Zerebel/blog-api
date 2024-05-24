import { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { GoogleButton, GithubButton } from "../components/props";

export default function Login() {
  const {
    signIn,
    error,
    setError,
    signInWithGoogle,
    signInWithGithub,
    loading,
  } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  window.addEventListener("load", () => setError(false));

  return (
    <main className="flex flex-col justify-center w-full items-center bg-slate-100">
      <p className="uppercase font-bold pt-6 text-center">
        <Link to={"/"}>Blog API</Link>
      </p>
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-fit">
        <h1 className="font-semibold text-4xl text-balance">Welcome back</h1>
        <div className="flex justify-center">
          <FormControl
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            autoComplete="on"
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(email, password, "/login").then((e) => navigate(e));
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email address"
              type="email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
                return setError(false);
              }}
              required
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
                return setError(false);
              }}
              required
            />
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              endIcon={<></>}
              variant="contained"
              className=" !capitalize !bg-green-500 py-1"
              type="submit"
            >
              Continue
            </LoadingButton>
            {error && (
              <p className="text-lg text-center text-red-900">{error}</p>
            )}
          </FormControl>
        </div>
        {/* New User */}
        <div className="flex gap-2 text-lg">
          <span>Don&apos;t have an account? </span>
          <Link to={"/signup"}>
            <span className="text-green-500">Sign up</span>
          </Link>
        </div>
        <hr className="border border-b-2 w-full" />
        {/* Continue with Google */}
        <GoogleButton
          loading={loading}
          text={"Sign in with Google"}
          onClick={() => {
            signInWithGoogle({ location: "/login" }).then((location) => {
              navigate(location);
            });
          }}
        />
        {/* Continue with Github */}
        <GithubButton
          loading={loading}
          text={"Sign in with Github"}
          onClick={() =>
            signInWithGithub({ location: "/login" }).then((location) => {
              navigate(location);
            })
          }
        />
      </div>
    </main>
  );
}
