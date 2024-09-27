import React from "react";
import "../../style/content/company.scss";
import { useCompanyPage } from "../../hook/useCompanyPage";
import { useStore } from "../../store";
import { Profile } from "../../components";
import { EXIST_PAGE_PAGINATION } from "../../types/global.types";
function Company() {
  const {
    CompanyPagePaginationDetect,
    scrapeCompanyData,
    checkIsCompanyExist,
    companyPagination,
  } = useCompanyPage();
  const { name, companyImage, setLoading, setResetCompanyError } = useStore();
  return (
    <section className="company">
      {companyPagination !== EXIST_PAGE_PAGINATION.SELECT && (
        <Profile
          name={name ? name : ""}
          image={
            companyImage ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          onClick={async () => {
            await scrapeCompanyData();
            await checkIsCompanyExist();
            setResetCompanyError();
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }}
        />
      )}

      {CompanyPagePaginationDetect()}
    </section>
  );
}

export default React.memo(Company);
