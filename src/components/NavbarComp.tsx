import { useState } from "react";
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import styled from "styled-components";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavbarComp = (props: { setLogged: any }) => {
  const UserAvatar = styled.img`
    width: 32px;
    height: 32px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 30px;
    border-radius: 50%;
  `;
  const UserWrapper = styled.div`
    display: flex;
    margin-right: 20px;
  `;

  interface IUserInfo {
    displayName: string | null;
    photoURL: string | null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [userInfo, setUserInfo] = useState({
    displayName: "",
    photoURL: "",
  });
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        setUserInfo(user);
        props.setLogged(true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          className="ms-5"
          href="/"
          onClick={() => {
            console.log(auth);
          }}
        >
          Your Food Log
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {userInfo.displayName === "" ? (
              <div
                className="g-sign-in-button"
                onClick={() => {
                  signIn();
                }}
              >
                <div className="content-wrapper">
                  <div className="logo-wrapper">
                    <img src="https://developers.google.com/identity/images/g-logo.png" />
                  </div>
                  <span className="text-container">
                    <span>Sign in with Google</span>
                  </span>
                </div>
              </div>
            ) : (
              <UserWrapper className="user_info">
                <NavbarText>
                  {userInfo.displayName.length === 0
                    ? ""
                    : userInfo.displayName}
                </NavbarText>
                <NavItem>
                  <UserAvatar
                    src={
                      userInfo.photoURL.length === 0 ? "" : userInfo.photoURL
                    }
                  ></UserAvatar>
                </NavItem>
                <Button
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        props.setLogged(false);
                        setUserInfo({
                          displayName: "",
                          photoURL: "",
                        });
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                >
                  Log Out
                </Button>
              </UserWrapper>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
