import React from "react";
import { Button, Input, TextArea } from "../../../components";
import {
  APP_LOCATION,
  BUTTON_ENUM,
  INPUT_TYPES,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { useStore } from "../../../store";
import { InfoIcon, SuccessIcon } from "../../../assets";
import { useCompanyValidation } from "../../../hook/useCompanyValidation";
import { useCreateCompany } from "../../../hook/useCreateCompany";
import { openInCrm } from "../../../utils/openCrm.util";

const NotExistCompanySearch = () => {
  const {
    name,
    uds_linkedinprofilecompanyurl,
    uds_salesnavigatorcompanyurl,
    companyDescription,
    crmUrl,
    setCompanyName,
    nameError,
    companyDescriptionError,
    isCompanyHaveError,
    numberofemployees,
    setNumberOfEmployees,
    numberofemployeesError,
  } = useStore();
  const { createCompany, createdCompany, isCreated } = useCreateCompany();
  const { handleChange } = useCompanyValidation();

  const handlePaste = (value?: string | number | null, name?: string) => {
    handleChange({
      target: { name: name, value: value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <div className="company__form">
        <div className="company__form__inputs">
          <Input
            id="uds_linkedinprofilecompanyurl"
            name="uds_linkedinprofilecompanyurl"
            type={INPUT_TYPES.WITH_LABEL}
            placeholder="Company profile link"
            value={
              uds_linkedinprofilecompanyurl
                ? uds_linkedinprofilecompanyurl
                : uds_salesnavigatorcompanyurl || ""
            }
            readonly
            required
          />

          <Input
            id="name"
            type={INPUT_TYPES.WITH_LABEL}
            name="name"
            onChange={handleChange}
            placeholder="Company name"
            value={name}
            onClear={() => {
              setCompanyName("");
            }}
            error={nameError}
            required
            onPaste={async (e) => {
              handlePaste(e ? e : name, "name");
            }}
          />
          <Input
            id="numberofemployees"
            type={INPUT_TYPES.WITH_LABEL}
            name="numberofemployees"
            onChange={handleChange}
            placeholder="Employees on Ln"
            value={numberofemployees}
            onClear={() => {
              setNumberOfEmployees(0);
            }}
            onPaste={async (e) => {
              !isNaN(Number(e)) &&
                handlePaste(
                  e ? Number(e) : numberofemployees,
                  "numberofemployees",
                );
            }}
            error={numberofemployeesError}
          />
        </div>
        <TextArea
          type={TEXTAREA_ENUM.NORMAL}
          onChange={handleChange}
          value={companyDescription}
          name="companyDescription"
          placeholder="Add comment"
          error={companyDescriptionError}
        />
      </div>
      <div className="company__footer">
        <div className="company__footer__text">
          <InfoIcon />
          <p>You can complete the empty fields yourself</p>
        </div>
        <div className="company__footer__buttonContainer">
          {isCreated ? (
            <>
              <p className="company__footer__success">
                <SuccessIcon />
                Success!
              </p>
              <Button
                className="company__captureButton"
                onClick={() => {
                  openInCrm(
                    crmUrl,
                    APP_LOCATION.COMPANY,
                    createdCompany?.accountid ? createdCompany?.accountid : "",
                  );
                }}
                text="Go to CRM"
                type={BUTTON_ENUM.GOLD}
              />
            </>
          ) : (
            <>
              <Button
                className="company__captureButton"
                onClick={createCompany}
                text="Capture"
                type={BUTTON_ENUM.GOLD}
                disabled={isCompanyHaveError}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotExistCompanySearch;
