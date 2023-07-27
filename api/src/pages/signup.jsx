import { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { GithubButton, GoogleButton } from "../components/props";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../services/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Signup() {
  const {
    error,
    setError,
    loading,
    setLoading,
    signUp,
    signInWithGithub,
    signInWithGoogle,
  } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return setLoading(false);
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return setLoading(false);
    }
    setTimeout(() => {
      signUp(email, password, "/signup").then((location) => navigate(location));
    }, 1000);
  };

  window.addEventListener("load", () => setError(false));

  return (
    <AuthProvider>
      <main className="flex flex-col items-center justify-center">
        <p className="uppercase font-bold pt-6 text-center">
          <Link to={"/"}>Blog API</Link>
        </p>
        <div className="flex flex-col gap-4 items-center justify-center h-screen w-fit">
          <h1 className="font-semibold text-4xl">Create your account</h1>
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
                handleSubmit();
              }}
            >
              <TextField
                id="outlined-basic"
                label="Email address"
                type="email"
                variant="outlined"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  return setError(false);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                required
                error={passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                  return confirmPassword !== e.target.value
                    ? setPasswordError(true)
                    : setPasswordError(false);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                required
                error={passwordError}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  return password !== e.target.value
                    ? setPasswordError(true)
                    : setPasswordError(false);
                }}
              />
              <LoadingButton
                variant="contained"
                loading={loading}
                loadingPosition="end"
                endIcon={<></>}
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
            <span>Already have an account? </span>
            <Link to={"/login"}>
              <span className="text-green-500">Login</span>
            </Link>
          </div>
          <hr className="border border-b-2 w-full" />
          {/* Continue with Google */}
          <GoogleButton
            onClick={() =>
              signInWithGoogle({ location: "/signup" }).then((location) =>
                navigate(location)
              )
            }
            text={"Continue with Google"}
            loading={loading}
          />
          {/* Continue with Github */}
          <GithubButton
            onClick={() =>
              signInWithGithub({ location: "/signup" }).then((location) =>
                navigate(location)
              )
            }
            text={"Continue with Github"}
            loading={loading}
          />
        </div>
      </main>
    </AuthProvider>
  );
}
