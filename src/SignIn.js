
   
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
import FacebookLogin from "react-facebook-login";
import "./facebookButton.css"




function SigninPage() {
  
  const [loggedInWithFacebook, setloggedInWithFacebook] = useState(false);
  const [loggedInWithNetflix, setloggedInWithNetflix] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userID, setuserID] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [picture, setpicture] = useState("");

  var fbContent;

  function Facebook() {
    

    const responseFacebook = (response) =>  {
      
      setuserID(response.userID);
      setisLoggedIn(true);
      setloggedInWithFacebook(true);
      setname(response.name);
      setemail( response.email);
      setpicture(response.picture.data.url);
    };


    

    if (!isLoggedIn) {
      fbContent = (
      <FacebookLogin
          appId="997105144497078"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="btnFacebook"
          icon="fa-facebook"
          textButton = "&nbsp;&nbsp;Sign In with Facebook"

      />
      );
    } 
    return <div>{fbContent}</div>;
  }
   

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const IsInvalid = password === "" || emailAddress === "";
  function netflixLogin (event) {
      
    event.preventDefault();
    setloggedInWithNetflix(true);
    
  };

  function handleSubmit(event) {
    event.preventDefault();

  
  }
  
  if( !loggedInWithFacebook && !loggedInWithNetflix)
  {
    return (
      <>
        <HeaderWrapper className="header-wrapper-home">
          <NavBar className="navbar-signin">
            <Logo />
          </NavBar>
          <SignFormWrapper>
            <SignFormBase onSubmit={handleSubmit} method="POST">
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
              <SignFormButton onClick= {netflixLogin}>Sign In</SignFormButton>
              <Facebook />
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
          <FooterCompound />
        </HeaderWrapper>
        
      </>
    );
    }
  else if( loggedInWithFacebook)
  {
    fbContent = (
      <div
        style={{
          width: "400px",
          margin: "auto",
          background: "#f4f4f4",
          padding: "20px"
        }}
      >
        <img src={picture} alt={name} />
        <h2>Welcome {name}</h2>
        Email: {email}
      </div>
    );
    return <div>{fbContent}</div>;
  }
  else if( loggedInWithNetflix)
  {
    
    fbContent = (
      <div
        style={{
          width: "400px",
          margin: "auto",
          background: "#f4f4f4",
          padding: "20px"
        }}
      >
        
        <h2>Welcome {emailAddress}</h2>
      </div>
    );
    return <div>{fbContent}</div>;
  }
  
}

export default SigninPage;
