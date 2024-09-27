import React from "react";
import { useStore } from "../../store";
import {
  ExistCompanySearchSales,
  NotExistCompanySearchSales,
} from "./Components";
import { Profile } from "../../components";

const SearchCompanyScrapeSales = () => {
  const { companyBackData, companyImage, name, setResetCompany } = useStore();

  const handleProfileCompanyReload = () => {
    // setResetCompany()
  };
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

      {companyBackData ? (
        <ExistCompanySearchSales />
      ) : (
        <NotExistCompanySearchSales />
      )}
    </section>
  );
};

export default SearchCompanyScrapeSales;
