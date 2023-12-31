/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import LoadingButton from "@mui/lab/LoadingButton";

export const Buttton_ = ({
  text,
  className,
  children,
  onClick,
  style,
  active,
}) => (
  <>
    <button
      className={`${className}`}
      onClick={onClick}
      style={style}
      disabled={active}
    >
      {text}
      {children}
    </button>
  </>
);

export const Link_ = ({ text, className, ref }) => (
  <a href={ref} className={`${className}`}>
    {text}
  </a>
);

export const GoogleButton = ({ onClick, text, loading }) => {
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="end"
      endIcon={<></>}
      variant="contained"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-md !px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 19"
      >
        <path
          fillRule="evenodd"
          d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
          clipRule="evenodd"
        />
      </svg>
      {text}
    </LoadingButton>
  );
};

export const GithubButton = ({ onClick, text, loading }) => {
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="end"
      endIcon={<></>}
      variant="contained"
      className="text-white !bg-[#24292F] hover:!bg-[#24292F]/90 focus:!ring-4 focus:!outline-none focus:!ring-[#24292F]/50 font-medium rounded-lg text-md !px-10 py-2.5 text-center inline-flex items-center dark:focus:!ring-gray-500 dark:!hover:bg-[#050708]/30"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
          clipRule="evenodd"
        />
      </svg>
      {text}
    </LoadingButton>
  );
};

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

export const GitHubContributions = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const apiUrl = "https://api.github.com/repos/Zerebel/blog-api/contributors";

    async function getContributors() {
      const response = await fetch(apiUrl);
      const contributors = await response.json();
      setContributors(contributors);
    }

    getContributors();
  }, []);

  return (
    <footer className="py-2 w-full max-w-3xl">
      <div className="container mx-auto">
        <ul className="flex flex-wrap">
          {contributors.map((contributor) => (
            <li key={contributor.id} className="mb-2 flex items-center gap-4">
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noreferrer"
                className=" text-slate-600"
              >
                <img
                  src={contributor.avatar_url}
                  className="h-10 w-10 rounded-full pointer-events-none"
                  alt={contributor.login}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
