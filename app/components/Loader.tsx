"use client";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-[#00000032]">
      <div>
        <CircularProgress className="text-gray-800" />
      </div>
    </div>
  );
};

export default Loader;
