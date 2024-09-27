import React, { useState } from "react";
import { Button, Dropdown, Input, TextArea } from "../../../components";
import {
  APP_LOCATION,
  BUTTON_ENUM,
  DROPDOWN_TYPE,
  INPUT_TYPES,
  IN_OUT,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { useStore } from "../../../store";
import { InfoIcon, SuccessIcon } from "../../../assets";
import { openInCrm } from "../../../utils/openCrm.util";
import { useCreateUser } from "../../../hook/useCreateUser";
import { useNoExistUser } from "../../../hook/useNoExistUser";
import { useExistUser } from "../../../hook/useExistUser";
import { createDataForExistedNamesCompany } from "../../../utils/selectCompanyUtils";

const NoExistSearchUser = () => {
  const {
    uds_linkedin,
    uds_salesnavigatoruserurl,
    userAddress1_nameError,
    fullname,
    fullnameError,
    setFullname,
    description,
    descriptionError,
    jobtitle,
    userAddress1_name,
    setJobTitle,
    jobtitleError,
    setUserAdress,
    crmUrl,
    isUserHaveError,
    name,
    customer,
    customerId,
    setCompanyName,
    companyBackDataWithNames,
    setLinkedinCompanyId,
    setAccountid,
  } = useStore();

  const { createdUser, handleClickSave, isCreated } = useCreateUser();
  const { handleChange, handlePaste } = useNoExistUser();
  const { handleSearch, showLoaderForDropdown } = useExistUser();
  return (
    <div>
      <div className="company__form">
        <div className="company__form__inputs">
          <Input
            id="uds_linkedin"
            type={INPUT_TYPES.WITH_LABEL}
            name="uds_linkedinprofilecompanyurl"
            placeholder="User profile link"
            value={uds_linkedin ? uds_linkedin : uds_salesnavigatoruserurl}
            readonly
            required
          />

          <Input
            id="fullname"
            type={INPUT_TYPES.WITH_LABEL}
            name="fullname"
            onChange={handleChange}
            placeholder="Full name"
            value={fullname}
            onClear={() => {
              setFullname("");
            }}
            error={fullnameError}
            required
            onPaste={async (e) => {
              handlePaste(e ? e : fullname, "fullname");
            }}
          />

          <Input
            id="jobtitle"
            type={INPUT_TYPES.WITH_LABEL}
            name="jobtitle"
            onChange={handleChange}
            placeholder="Job title"
            value={jobtitle ? jobtitle : ""}
            onClear={() => {
              setJobTitle("");
            }}
            onPaste={async (e) => {
              handlePaste(e ? e : jobtitle, "jobtitle");
            }}
            error={jobtitleError}
          />

          <Input
            id="userAddress1_name"
            type={INPUT_TYPES.WITH_LABEL}
            name="userAddress1_name"
            onChange={handleChange}
            placeholder="Adress"
            value={userAddress1_name ? userAddress1_name : ""}
            onClear={() => {
              setUserAdress("");
            }}
            onPaste={async (e) => {
              handlePaste(e ? e : userAddress1_name, "userAddress1_name");
            }}
            error={userAddress1_nameError}
          />

          {customer && (
            <Dropdown
              withRadioButton
              type={DROPDOWN_TYPE.SINGLE}
              withSearch
              loader={showLoaderForDropdown}
              onSearch={handleSearch}
              searchValue={name}
              onCreateNew={() => {
                setCompanyName(customer);
                setLinkedinCompanyId(customerId);
                setAccountid(null);
              }}
              label={name ? name : "Add company"}
              inOut={IN_OUT.INNER}
              location={APP_LOCATION.USER}
              createNewData={{
                name: customer ? customer : "Create New",
                id: customerId ? customerId : "",
                data: [],
              }}
              withLabel={true}
              dataForExistedElements={
                createDataForExistedNamesCompany(companyBackDataWithNames) || []
              }
              onViewMore={() => {}}
              hideViewMore={true}
            />
          )}
        </div>
        <TextArea
          type={TEXTAREA_ENUM.NORMAL}
          onChange={handleChange}
          value={description}
          name="description"
          placeholder="Add comment"
          error={descriptionError}
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
                    APP_LOCATION.USER,
                    createdUser?.contactid ? createdUser?.contactid : "",
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
                onClick={() => {
                  handleClickSave("POST");
                }}
                text="Capture"
                type={BUTTON_ENUM.GOLD}
                disabled={isUserHaveError}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoExistSearchUser;
