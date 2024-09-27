import React, { useRef, useEffect, useState } from "react";
import { useStore } from "../../store";
import { Profile } from "../../components";
import { ExistSearchUser, NoExistSearchUser } from "./Components";

function SearchScrape() {
  const {
    fullname,
    userProfileImage,
    setLoading,
    setResetUserError,
    userBackendData,
  } = useStore();
  const handleProfileReload = async () => {
    setLoading(true);
    setResetUserError();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <section>
      <Profile
        name={fullname}
        onClick={handleProfileReload}
        image={
          userProfileImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
      />

      {userBackendData ? <ExistSearchUser /> : <NoExistSearchUser />}
    </section>
  );
}

export default SearchScrape;
