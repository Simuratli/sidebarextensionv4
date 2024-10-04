import React, { useState, useEffect } from "react";
import { useUserSearchButton } from "../../hooks/useUserSearchButton";
import { PeopleSearchControlType } from "../../components/ControlButtons/ControlButton.types";
import { useStore } from "../../store";
import { UserSearchExist, UserSearchNotExist } from "./components";
const UserSearch = () => {
  const [updated, setupdated] = useState(false);
  const { addForUserSearch } = useUserSearchButton();
  const { userBackendData } = useStore();

  useEffect(() => {
    setupdated(true);
    setTimeout(() => {
      setupdated(false);
      addForUserSearch();
    }, 2500);
    addForUserSearch();
  }, []);

  return (
    <div>{userBackendData ? <UserSearchExist /> : <UserSearchNotExist />}</div>
  );
};

export default UserSearch;
