import React from "react";
import { useStore } from "../../store";
import { ExistCompanySearch, NotExistCompanySearch } from "./Components";
import { Profile } from "../../components";

const SearchCompanyScrape = () => {
  const { companyBackData, companyImage, name } = useStore();

  const handleProfileCompanyReload = () => {};
  return (
    <section>
      <Profile
        name={name || ""}
        onClick={handleProfileCompanyReload}
        image={
          companyImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
      />

      {companyBackData ? <ExistCompanySearch /> : <NotExistCompanySearch />}
    </section>
  );
};

export default SearchCompanyScrape;
