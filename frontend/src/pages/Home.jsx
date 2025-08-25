import React from "react";
import { useTheme } from "../Context/UseTheme";
function Home() {
  const { theme } = useTheme();
  return (
    <div
      className={`h-129.5 font-bold text-9xl flex justify-center items-center ${
        theme == "light"
          ? "bg-amber-200 text-slate-800"
          : "bg-slate-900 text-amber-100"
      }`}
    >
      Bakchodi😋
    </div>
  );
}

export default Home;
