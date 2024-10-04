import React from "react";
import ReactDOM from "react-dom";
import { UserSearchControlButton } from "../components";

export const useUserSearchButton = () => {
  const addForUserSearch = async () => {
    const usernames = document.querySelectorAll(".entity-result__title-line");
    usernames.forEach((user) => {
      const mainParentCard = user.parentElement?.parentElement?.parentElement;
      user.classList.add("noOverflow");
      const image =
        mainParentCard?.parentElement?.parentElement?.querySelector("img")?.src;
      const userName = mainParentCard
        ?.querySelector("a")
        ?.querySelector('[aria-hidden="true"]')
        ?.textContent?.trim();
      const job = mainParentCard
        ?.querySelector(".entity-result__primary-subtitle")
        ?.textContent?.trim();
      const location = mainParentCard
        ?.querySelector(".entity-result__secondary-subtitle")
        ?.textContent?.trim();

      const userElement = user as HTMLElement;
      // userElement.style.position = 'relative';
      // userElement.style.overflow = 'auto';
      userElement.style.width = "100%";
      const LinkProfile = user?.querySelector(".entity-result__title-text");
      const idForLinkedinIconElelement =
        user.querySelector(".idForLinkedinIcon");
      if (!idForLinkedinIconElelement) {
        const div = document.createElement("div");
        div.classList.add("idForLinkedinIcon");
        if (LinkProfile) {
          LinkProfile.appendChild(div);
        }
      } else {
        ReactDOM.render(
          <UserSearchControlButton
            name={userName}
            job={job}
            image={image}
            location={location}
            url={LinkProfile?.querySelector("a")?.href.split("?")[0]}
          />,
          idForLinkedinIconElelement,
        );
      }
    });
  };

  return {
    addForUserSearch,
  };
};
