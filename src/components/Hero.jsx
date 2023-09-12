import React from "react";
import { logo } from "../assets";
function Hero() {
  const openGitHub = () => {
    window.open("https://github.com/subhabratamajee/AI_Summarizer");
  };
  return (
    <>
      <header className=" flex flex-col justify-center items-center w-full">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
          <img className="w-28 object-contain" src={logo} alt="logo" />
          <button className="black_btn" onClick={() => openGitHub()}>Github</button>
        </nav>
        <h1 className="head_text">
            Summarize Article with <br/>
            <span className="orange_gradient">OpenAI ChatGPT 4.0</span>
        </h1>
        <h2 className="desc">
            Get a gist of your Article and save your valuable time....
        </h2>
      </header>
    </>
  );
}

export default Hero;
