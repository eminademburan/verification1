
   
import React, { useState, useContext } from "react";
import HeaderWrapper from "./components/HeaderWrapper";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import FooterCompound from "./components/FooterCompound";
import SignFormWrapper from "./components/SignFormWrapper";
import SignFormBase from "./components/SignFormBase";
import SignFormTitle from "./components/SignFormTitle";
import SignFormInput from "./components/SignFormInput";
import SignFormButton from "./components/SignFormButton";
import SignFormText from "./components/SignFormText";
import SignFormLink from "./components/SignFormLink";
import SignFormCaptcha from "./components/SignFormCaptcha";
import SignFormError from "./components/SignFormError";
import Warning from "./components/Warning";

function SigninPage() {
  
  

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const IsInvalid = password === "" || emailAddress === "";

  function handleSubmit(event) {
    event.preventDefault();

  
  }

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <NavBar className="navbar-signin">
          <Logo />
        </NavBar>
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSubmit} method="POST">
            <Warning>NOT official Netflix</Warning>
            <SignFormTitle>Sign In</SignFormTitle>
            {error ? <SignFormError>{error}</SignFormError> : null}
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormButton disabled={IsInvalid}>Sign In</SignFormButton>
            <SignFormText>
              New to Netflix?
              <SignFormLink href="/signup">Sign up now.</SignFormLink>
            </SignFormText>
            <SignFormCaptcha>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </SignFormCaptcha>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SigninPage;
