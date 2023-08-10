import React, { useState } from "react";
interface Props {
  txt: string;
  words: number;
  // bool?: Boolean;
}
/**
 * @param text string that you want to cut
 * @param words numberofword
 */

const Explain = (props: Props): JSX.Element => {
  const [less, setless] = useState(true);
  let arr = props.txt.split(" ");
  let returnstring: string = "";
  for (let i = 0; i < props.words; i++) {
    returnstring += arr[i] + " ";
  }
  return (
    <>
      <p id="explain">
        <span id="nameof">NASA: </span>
        {less ? returnstring : props.txt}
        <a
          data-href="#"
          onClick={(e) => {
            e.preventDefault();
            setless(!less);
          }}
        >
          Show {less ? "More" : "Less"}
        </a>
      </p>
    </>
  );
};
export default Explain;
