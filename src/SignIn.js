
   
import React, { useState, useContext } from "react";
import FacebookLogin from "react-facebook-login";
import netflix_logo from "./favicon.png";
import "./HeaderStyles.css"
import "./AccordionStyles.css";
import "./FeatureStyles.css";
import "./FooterStyles.css";
import "./SignFormStyles.css";
import "./facebookButton.css";



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
        <header className="header-wrapper-home">
          <nav className="navbar-signin">
            <a href="/"   >
              <img className="logo" href="/" src={netflix_logo}/>
            </a>  
          </nav>
          <div className="sign-form-wrapper">
            <form className="sign-form-base" onSubmit={handleSubmit} method="POST">
            <h1 className="sign-form-title">Sign In</h1>
              
              <input className="sign-form-input"
                type="text"
                placeholder="Email Address"
                value={emailAddress}
                onChange={({ target }) => setEmailAddress(target.value)}
              />
              <input className="sign-form-input"
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <button className="sign-form-Button" type="submit" onClick= {netflixLogin}>Sign In</button>
              <Facebook />
              <p className="sign-form-text">
                New to Netflix?
                <a className="sign-form-link" > Sign up now. </a>
              </p>
              <p className="sign-form-captcha">
                This page is protected by Google reCAPTCHA to ensure you are not a
                bot.
              </p>
            </form>
          </div>
          <footer className="footer-wrapper">
            <a href="#" className="footer-title">Questions? Contact us.</a>
            <div className="footer-row">
              <div className="footer-column">
                <a href="#" className="footer-link">FAQ</a>
                <a href="#" className="footer-link">Investor Relations</a>
                <a href="#" className="footer-link">Privacy</a>
                <a href="#" className="footer-link">Speed Test</a>
              </div>
              <div className="footer-column">
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Jobs</a>
                <a href="#" className="footer-link">Cookie Preferences</a>
                <a href="#" className="footer-link">Legal Notices</a>
              </div>
              <div className="footer-column">
                <a href="#" className="footer-link">Account</a>
                <a href="#" className="footer-link">Ways to Watch</a>
                <a href="#" className="footer-link">Corporate Information</a>
                <a href="#" className="footer-link">Netflix Originals</a>
              </div>
              
            </div>
          </footer>
        </header>
        
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
