import React from "react";
const Header = (props: any): JSX.Element => (
  <header>
    <h1>SPACESTAGRAM</h1>
    <h4 style={{ textTransform: "capitalize" }}>
      Based on NASA's astronomy photo of the day
    </h4>
  </header>
);
export default Header;
