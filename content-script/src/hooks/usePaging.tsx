import React, { useState, useEffect } from "react";
import {
  CompanyPage,
  UserPage,
  ErrorPage,
  LoginPage,
  SetupPage,
  WrongPage,
  UserSearchPage,
  CompanySearchPage,
} from "../pages";
import {
  ACCESS_TOKEN_ENUM,
  ERROR_PAGE_TYPE,
  LINKEDIN_PAGE_ENUM,
  MESSAGE_ENUMS,
  PAGE_ENUM,
  STORAGED_ENUM,
} from "../types/global.types";
import { useStore } from "../store";
import { getAccessTokenRequest } from "../api";
import { getTimeDifferenceForToken } from "../utils/getTimeDifference";
import { useUserSearchButton } from "./useUserSearchButton";

export const usePaging = () => {
  const [updated, setUpdated] = useState(true);
  const {
    setSidebarOpen,
    setPage,
    accessToken,
    authToken,
    page,
    setAuthToken,
    code_verifier,
    clientId,
    tenantId,
    crmUrl,
    setAccessToken,
    setRefreshToken,
    setTenantId,
    setCrmUrl,
    setClientId,
  } = useStore();
  const { addForUserSearch } = useUserSearchButton();

  useEffect(() => {
    const messageListener = (message) => {
      if (message.url) {
        if (!window.location.href.includes(LINKEDIN_PAGE_ENUM.CONTACT_INFO)) {
          setUpdated(false);
          setSidebarOpen(false);
          setTimeout(() => {
            setUpdated(true);
          }, 200);
          setPageViaUrl();
        }
      }
      if (message.message === MESSAGE_ENUMS.ACCESS_TOKEN_GOES_BACK) {
        if (message.code) {
          setAuthToken(message.code);
          localStorage.setItem(STORAGED_ENUM.AUTH_TOKEN, message.code);
        }
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const putIconsToScreen = () => {
    addForUserSearch();
    setTimeout(() => {
      addForUserSearch();
    }, 3000);
  };

  useEffect(() => {
    setPageViaUrl();
    if (!updated) {
      putIconsToScreen();
    }
  }, [updated, accessToken, authToken]);

  useEffect(() => {
    putIconsToScreen();
    const storagedRefreshTime = localStorage.getItem(STORAGED_ENUM.REFRESH_TIME);
    const storagedRefreshToken = localStorage.getItem(STORAGED_ENUM.REFRESH_TOKEN);
    const storagedAccessToken = localStorage.getItem(STORAGED_ENUM.ACCESS_TOKEN);
    const storagedAuthToken = localStorage.getItem(STORAGED_ENUM.AUTH_TOKEN);

    if (storagedRefreshTime && storagedAccessToken && storagedRefreshToken && storagedAuthToken) {
        setAccessToken(storagedAccessToken);
        setRefreshToken(storagedRefreshToken);
        setAuthToken(authToken);

      const timeDifference = getTimeDifferenceForToken(new Date(storagedRefreshTime));
      if (timeDifference >= 8) {
        localStorage.removeItem(STORAGED_ENUM.REFRESH_TIME);
        localStorage.removeItem(STORAGED_ENUM.REFRESH_TOKEN);
        localStorage.removeItem(STORAGED_ENUM.ACCESS_TOKEN);
        localStorage.removeItem(STORAGED_ENUM.AUTH_TOKEN);
      } 
    }
  }, []);


  useEffect(() => {
    const storagedRefreshToken = localStorage.getItem(STORAGED_ENUM.REFRESH_TOKEN);
    const storagedRefreshTime = localStorage.getItem(STORAGED_ENUM.REFRESH_TIME);
    const storagedClientId = localStorage.getItem(STORAGED_ENUM.CLIENT_ID);

    if(storagedRefreshTime && storagedRefreshToken){
      const timeDifference = getTimeDifferenceForToken(new Date(storagedRefreshTime));
      if(timeDifference > 1){
        getAccessTokenRequest(clientId,tenantId,crmUrl,code_verifier,ACCESS_TOKEN_ENUM.REFRESH,storagedRefreshToken).then((response) => {
          if (response.access_token) {
            setAccessToken(response.access_token);
            setRefreshToken(response.refresh_token);
            localStorage.setItem(STORAGED_ENUM.ACCESS_TOKEN,response.access_token);
            localStorage.setItem(STORAGED_ENUM.REFRESH_TOKEN,response.refresh_token);
            localStorage.setItem(STORAGED_ENUM.REFRESH_TIME, `${new Date()}`);
         
          }
        });
      }
    }
    setPageViaUrl();
  }, [updated,authToken,clientId,crmUrl,code_verifier,tenantId])
  

  

  useEffect(() => {
    const storagedTenantId = localStorage.getItem(STORAGED_ENUM.TENANT_ID);
    const storagedClientId = localStorage.getItem(STORAGED_ENUM.CLIENT_ID);
    const storagedCRMUrl = localStorage.getItem(STORAGED_ENUM.CRM_URL);
    if (storagedClientId && storagedCRMUrl && storagedTenantId) {
      setClientId(storagedClientId);
      setTenantId(storagedTenantId);
      setCrmUrl(storagedCRMUrl);
    }
  }, []);




  useEffect(() => {
    console.log("TOKENS",authToken)
    if (!accessToken && authToken) {
      getAccessTokenRequest(clientId,tenantId,crmUrl,code_verifier,ACCESS_TOKEN_ENUM.BASIC,authToken).then((response) => {
        if (response.access_token) {
          setAccessToken(response.access_token);
          setRefreshToken(response.refresh_token);
          localStorage.setItem(STORAGED_ENUM.ACCESS_TOKEN,response.access_token);
          localStorage.setItem(STORAGED_ENUM.REFRESH_TOKEN,response.refresh_token);
          localStorage.setItem(STORAGED_ENUM.REFRESH_TIME, `${new Date()}`);
          console.log(accessToken,'========noluyor arkadas================ IF',authToken)
          setPageViaUrl();
        }
      });
    } else {
    console.log(accessToken,'========noluyor arkadas================ ELSE',authToken)
      setPageViaUrl();
    }
  }, [authToken, accessToken,clientId,tenantId,crmUrl,code_verifier]);

  const setPageViaUrl = () => {
    const url = window.location.href;
    if (!url.includes(LINKEDIN_PAGE_ENUM.LINKEDIN)) {
      setPage(PAGE_ENUM.WRONG_PAGE);
    } else {
      if (authToken && accessToken) {
        switch (true) {
          case url.includes(LINKEDIN_PAGE_ENUM.COMPANY) ||
            url.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY):
            setPage(PAGE_ENUM.COMPANY);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY_SEARCH) ||
            url.includes(LINKEDIN_PAGE_ENUM.COMPANY_SEARCH):
            setPage(PAGE_ENUM.SEARCH_COMPANY_SCRAPE);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.SALES_USER_SEARCH) ||
            url.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH):
            setPage(PAGE_ENUM.SEARCH_PEOPLE_SCRAPE);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.USER) ||
            url.includes(LINKEDIN_PAGE_ENUM.SALES_USER):
            setPage(PAGE_ENUM.USER);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.USER):
            setPage(PAGE_ENUM.USER);
            break;
          default:
            setPage(PAGE_ENUM.WRONG_PAGE);
            break;
        }
      } else {
        setPage(PAGE_ENUM.SETUP);
      }
    }
  };

  const CurrentPage = () => {
    switch (page) {
      case PAGE_ENUM.SETUP:
        return <SetupPage />;
      case PAGE_ENUM.LOGIN:
        return <LoginPage />;
      case PAGE_ENUM.SOMETHING_WENT_WRONG:
        return <ErrorPage page={ERROR_PAGE_TYPE.LOGIN} />;
      case PAGE_ENUM.ERROR:
        return <ErrorPage page={ERROR_PAGE_TYPE.ACTION} />;
      case PAGE_ENUM.USER:
        return <UserPage />;
      case PAGE_ENUM.COMPANY:
        return <CompanyPage />;
      case PAGE_ENUM.WRONG_PAGE:
        return <WrongPage />;
      case PAGE_ENUM.SALES_SEARCH_COMPANY_SCRAPE:
        return <CompanySearchPage />;
      case PAGE_ENUM.SEARCH_PEOPLE_SCRAPE:
        return <UserSearchPage />;
      default:
        return <></>;
    }
  };

  return { CurrentPage, updated };
};
