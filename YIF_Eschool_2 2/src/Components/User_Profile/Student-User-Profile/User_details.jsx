import React from "react";
import { NavLink } from "react-router-dom";
import { useDataLayerValue } from "../../../DataLayer/DataLayer";

const User_details = () => {
  const [{ userDetails }] = useDataLayerValue();
  return (
    <div className="user-details">
      <div className="user-details-container">
        <div className="user-profile-img-container">
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            alt=""
          />
        </div>
        <div className="user-details-info">
          <div className="user-info-item">
            <label htmlFor="user_name">Name : </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              value={userDetails?.name}
              disabled
            />
          </div>
          {!(
            userDetails?.userType === "CENTRAL" ||
            userDetails?.userType === "DISTRICT"
          ) && (
            <div>
              <div className="user-info-item">
                <label htmlFor="user_school">School : </label>
                <input
                  type="text"
                  name="user_school"
                  id="user_school"
                  value={userDetails?.schoolName}
                  disabled
                />
              </div>
              <div className="user-info-item">
                <label htmlFor="user_school_id">School ID : </label>
                <input
                  type="text"
                  name="user_school_id"
                  id="user_school_id"
                  value={userDetails?.schoolId}
                  disabled
                />
              </div>
            </div>
          )}

          {userDetails?.userType === "STUDENT" && (
            <div className="user-info-item">
              <label htmlFor="user_class">Class : </label>
              <input
                type="text"
                name="user_class"
                id="user_class"
                value={`${
                  userDetails?.classes[userDetails?.classes.length - 1].split(
                    " "
                  )[0]
                }${
                  userDetails?.classes[userDetails?.classes.length - 1].split(
                    " "
                  )[1]
                }`}
                disabled
              />
            </div>
          )}

          <div className="user-info-item">
            <label htmlFor="user_id">Conventional Id : </label>
            <input
              type="text"
              name="user_id"
              id="user_id"
              value={userDetails?.conventionalId}
              disabled
            />
          </div>
          <div className="user-info-item">
            <label htmlFor="user_contact">Contact no. : </label>
            <input
              type="text"
              name="user_contact"
              id="user_contact"
              value={userDetails?.contactNumber}
              disabled
            />
          </div>
          <div className="user-info-item">
            <label htmlFor="user_email">Email id : </label>
            <input
              type="text"
              name="user_email"
              id="user_email"
              value={userDetails?.email}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_details;
