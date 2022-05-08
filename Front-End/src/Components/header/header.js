import React from "react";
import ResponsiveAppBar from "./navbar/navbar";
import Slider from "./Slider/index";
export default function Header() {
  return (
    <header className="h-screen">
      <ResponsiveAppBar />
      <Slider />
    </header>
  );
}
