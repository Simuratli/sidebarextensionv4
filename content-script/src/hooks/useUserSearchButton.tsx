import React from "react";
import {UserSearchControlButton} from '../components'

const useUserSearchButton = () => {
  const addControlForUser = () => {
    let header = document.querySelector(".ph5");
    if (!header) {
      header = document.querySelector(".pb5");
    }
    let LinkProfile = header
      ?.querySelector(".artdeco-hoverable-trigger")
      ?.querySelector("a");

    if (!LinkProfile) {
      LinkProfile = header
        ?.querySelectorAll(
          ".artdeco-hoverable-trigger--content-placed-bottom"
        )[1]
        .querySelector("a");
    }
    const idForLinkedinIconElelement =
      document.querySelector("#idForLinkedinIcon");

    if (!idForLinkedinIconElelement) {
      const div = document.createElement("div");
      div.id = "idForLinkedinIcon";
      if (LinkProfile) {
        // LinkProfile.append(div);
        LinkProfile.insertAdjacentElement("afterend", div);
      }
    } else {
      ReactDOM.render(<UserControl />, idForLinkedinIconElelement);
    }
  };

  return <div>useUserSearchButton</div>;
};

export default useUserSearchButton;
