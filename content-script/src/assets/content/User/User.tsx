import { Profile } from "../../components";
import { useEffect } from "react";
import { useUserScrape } from "../../hook/useUserScrape";
import { useStore } from "../../store";
import {
  EXIST_PAGE_PAGINATION,
  LINKEDIN_PAGE_ENUM,
} from "../../types/global.types";
function User() {
  const { scrapeUserData, UserPagePaginationDetect, checkIsUserExist } =
    useUserScrape();
  const {
    fullname,
    userProfileImage,
    setLoading,
    userPagination,
    setResetUserError,
  } = useStore();

  return (
    <section>
      {userPagination !== EXIST_PAGE_PAGINATION.SELECT && (
        <Profile
          name={fullname}
          onClick={
            window.location.href.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH)
              ? async () => {
                  await checkIsUserExist();
                  setResetUserError();
                  setTimeout(() => {
                    setLoading(false);
                  }, 500);
                }
              : async () => {
                  await scrapeUserData();

                  await checkIsUserExist();
                  setResetUserError();
                  setTimeout(() => {
                    setLoading(false);
                  }, 500);
                }
          }
          image={
            userProfileImage ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
      )}

      <div
        className={
          userPagination !== EXIST_PAGE_PAGINATION.SELECT ? "company__form" : ""
        }
      >
        {UserPagePaginationDetect()}
      </div>
    </section>
  );
}

export default User;
