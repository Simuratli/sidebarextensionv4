import React, { useEffect } from "react";
import { Button, Input, TextArea } from "../../../components";
import { useStore } from "../../../store";
import { APP_LOCATION, BUTTON_ENUM, INPUT_TYPES, TEXTAREA_ENUM } from "../../../types/global.types";
import { InfoIcon, SuccessIcon } from "../../../assets";
import { openInCrm } from "../../../utils/openCrm.util";
import '../../../style/content/company.scss'

const UserSearchNotExist = () => {
  const {
    fullname,
    uds_linkedin,
    uds_salesnavigatoruserurl,
    setFullname,
    fullnameError,
    jobtitle,
    jobtitleError,
    setJobTitle,
    userAddress1_name,
    userAddress1_nameError,
    setUserAdress,
    description,
    descriptionError
  } = useStore();
  useEffect(() => {
    console.log("NOT EXIST", fullname);
  }, []);


  const isCreated = false
  const isUserHaveError = false
  const handleChange = () => {};
  const handlePaste = (e: any, b: String) => {};
  const handleClickSave = (e: any) => {};

  return (
    <div>
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
                  // onClick={() => {
                  //   openInCrm(
                  //     crmUrl,
                  //     APP_LOCATION.USER,
                  //     createdUser?.contactid ? createdUser?.contactid : ""
                  //   );
                  // }}
                  onClick={()=>{}}
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
    </div>
  );
};

export default UserSearchNotExist;
