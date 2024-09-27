import { useStore } from "../store";
import { LINKEDIN_PAGE_ENUM, MESSAGE_ENUMS } from "../types/global.types";
export function useLogin() {
  const { clientId, tenantId, crmUrl, code_challenge } = useStore();

  const handleLogin = async () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER)) {
      const linkOfContactInfo = document.querySelector(
        "#top-card-text-details-contact-info",
      ) as HTMLElement;
      linkOfContactInfo.click();
    }

    chrome.runtime.sendMessage({
      type: MESSAGE_ENUMS.HANDLE_LOGIN_TRIGGERED,
      options: {
        challenge: code_challenge,
        tenantId: tenantId,
        clientId: clientId,
        crmUrl: crmUrl,
      },
    });
  };

  return {
    handleLogin,
  };
}
