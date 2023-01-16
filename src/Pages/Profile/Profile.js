import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  changeName,
  toggleEditName,
  updateUserProfileAttributes,
  putErrorMessageEdit,
} from "../../Features/User/user";

/**
 * Component for showing Profile page
 *
 * @component
 */
const Profile = () => {
  const {
    user,
    errorMessageProfile,
    errorMessageEdit,
    newFirstName,
    newLastName,
    editName,
  } = useSelector((state) => state.userSlice);
  const { token } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [user]);

  const validateEdit = () => {
    let regexName = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
    let errorMessage = "Enter a valid first name and last name";
    let data = { token };
    let error = false;

    if (regexName.test(newFirstName)) {
      data.firstName = newFirstName;
    } else {
      if (newFirstName) {
        error = true;
      }
      data.firstName = user.firstName;
    }

    if (regexName.test(newLastName)) {
      data.lastName = newLastName;
    } else {
      if (newLastName) {
        error = true;
      }
      data.lastName = user.lastName;
    }

    if (!newLastName && !newFirstName) {
      dispatch(toggleEditName());
    } else if (
      !error &&
      (data.firstName === newFirstName || data.lastName === newLastName)
    ) {
      dispatch(updateUserProfileAttributes(data));
    } else {
      dispatch(putErrorMessageEdit(errorMessage));
    }
  };

  return (
    <main className="main bg-dark">
      {user && (
        <>
          <div className="header">
            {!editName && (
              <>
                <h1>
                  Welcome back
                  <br />
                  {user.firstName} {user.lastName}
                </h1>
                <button
                  className="edit-button"
                  onClick={() => {
                    dispatch(toggleEditName());
                  }}
                >
                  Edit Name
                </button>
              </>
            )}

            {editName && (
              <>
                <h1>Welcome back</h1>
                <div className="account-edit">
                  <div className="account-edit-section">
                    <input
                      placeholder={user.firstName}
                      value={newFirstName}
                      type="text"
                      onChange={(e) =>
                        dispatch(
                          changeName({
                            value: e.target.value,
                            type: "newFirstName",
                          })
                        )
                      }
                    />
                    <input
                      placeholder={user.lastName}
                      value={newLastName}
                      type="text"
                      onChange={(e) =>
                        dispatch(
                          changeName({
                            value: e.target.value,
                            type: "newLastName",
                          })
                        )
                      }
                    />
                  </div>
                  {errorMessageEdit && (
                    <p className="edit-text-error">{errorMessageEdit}</p>
                  )}
                  <div className="account-edit-section">
                    <button
                      onClick={() => {
                        validateEdit();
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        dispatch(toggleEditName());
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </>
      )}

      {!user && <p>{errorMessageProfile}</p>}
    </main>
  );
};

export default Profile;
