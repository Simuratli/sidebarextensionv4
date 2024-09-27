import { getDataverse } from "../api";

export const checkIfUserExistOrNotSearch = async (
  url?: string,
  webApiEndpoint?: string,
  accessToken?: string,
) => {
  const existWithUrl = await getDataverse(
    `${webApiEndpoint}/contacts?$filter=contains(${"uds_linkedin"},'${url}')`,
    accessToken ? accessToken : "",
  );

  let companyData = null;
  if (existWithUrl.value && existWithUrl.value.length !== 0) {
    const existWithID = await getDataverse(
      `${webApiEndpoint}/accounts?$filter=accountid eq ${existWithUrl.value[0]?._parentcustomerid_value}`,
      accessToken ? accessToken : "",
    );
    companyData = existWithID.value;
  }

  return {
    userData: existWithUrl.value,
    companyData: companyData,
  };
};

export const checkIfCompanyExistOrNotSearch = async (
  name?: string,
  id?: string | null | undefined,
  webApiEndpoint?: string,
  accessToken?: string,
) => {
  const existWithName = id
    ? await getDataverse(
        `${webApiEndpoint}/accounts?$filter=contains(uds_linkedincompanyid,'${Number(id)}')`,
        accessToken ? accessToken : "",
      )
    : await getDataverse(
        `${webApiEndpoint}/accounts?$filter=contains(name,'${name}')`,
        accessToken ? accessToken : "",
      );

  return existWithName;
};
