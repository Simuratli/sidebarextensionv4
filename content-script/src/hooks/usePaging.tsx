import React, { useState, useEffect } from "react";
import {
  CompanyPage,
  UserPage,
  ErrorPage,
  LoginPage,
  SetupPage,
  WrongPage,
} from "../pages";
import {
  ACCESS_TOKEN_ENUM,
  ERROR_PAGE_TYPE,
  LINKEDIN_PAGE_ENUM,
  MESSAGE_ENUMS,
  PAGE_ENUM,
} from "../types/global.types";
import { useStore } from "../store";
import { getAccessTokenRequest } from "../api";

export const usePaging = () => {
  const [updated, setUpdated] = useState(true);
  const { setSidebarOpen, setPage, accessToken, authToken, page, setAuthToken, code_verifier,clientId,tenantId,crmUrl,setAccessToken,setRefreshToken} = useStore();

  useEffect(() => {
    const messageListener = (message) => {
      if (message.url) {
        if (!window.location.href.includes(LINKEDIN_PAGE_ENUM.CONTACT_INFO)) {
          console.log("messagesendendn inner");
          setUpdated(false);
          setSidebarOpen(false);
          setTimeout(() => {
            setUpdated(true);
          }, 200);
          setPageViaUrl();
        }
      }
      if (message.message === MESSAGE_ENUMS.ACCESS_TOKEN_GOES_BACK) {
        if(message.code){
          setAuthToken(message.code)
        }
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);


  useEffect(() => {
    if(!accessToken){
      getAccessTokenRequest( clientId,tenantId,crmUrl,code_verifier,ACCESS_TOKEN_ENUM.BASIC,authToken).then((response)=>{
        console.log('response,ami somet',response)
        setAccessToken(response.access_token)
        setRefreshToken(response.refresh_token)
      })
    }else{
      setPageViaUrl()
    }
  }, [authToken]);
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
      default:
        return <SetupPage />;
    }
  };

  return { CurrentPage, updated };
};
