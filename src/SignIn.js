import React, { useState, useContext, FormControlLabel, Checkbox, Component } from "react";
import FacebookLogin from "react-facebook-login";
import netflix_logo from "./netflix_logo.png";
import { useCookies } from 'react-cookie';
import "./App.css";

function SigninPage() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInWithFacebook, setloggedInWithFacebook] = useState(false);
  const [loggedInWithNetflix, setloggedInWithNetflix] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userID, setuserID] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [picture, setpicture] = useState("");
  const [rememberMe, setrememberMe] = useState(false);
  const [mailText, setmailText] = useState("");
  const [passwordText, setpasswordText] = useState("");


  const [cookies1, setCookie1] = useCookies(["user"]);
  const [cookies2, setCookie2] = useCookies(["password"]);

  const [emailAddress2, setEmailAddress2] = useState("");
  const [password2, setPassword2] = useState("");

  function handleCookie() {
    setCookie1("user", emailAddress, {
      path: "/", maxAge: 100
    });
    setCookie2("password", password, {
      path: "/", maxAge: 100
    });
  }
  
  
  var dict = {
    "+495514022041": "hellomello0",
    "ademsan99@gmail.com": "hellomello1",
    "ardaakcabuyuk@gmail.com": "hellomello2",
    "elifozer@gmail.com": "hellomello3",
    "ssemihd@gmail.com": "hellomello4",
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    return String(phone)
      .toLowerCase()
      .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
  };

  const validateRegistration = (key, value) => {
    var fvalue = dict[key];
    if (fvalue === value) {
      return true;
    }
    return false;
  };

  function getCookies()
  {
    
    if(  !cookies1.user == "" && !cookies2.password == "")
    {
      setEmailAddress2( cookies1.user);
      setPassword2( cookies1.password);
    
      if(validateRegistration(emailAddress2, password2)  )
      {
        setEmailAddress(emailAddress2);
        setloggedInWithNetflix(true);
      }
    }
    
    
  }

  

  function signIn() {
    
    if (password.length == 0 && emailAddress.length == 0) {
      setmailText("Email adress should be filled");
      setpasswordText("Password should be filled");
    } 
    else if( password.length == 0)
    {
      setpasswordText("Password should be filled");
      setmailText("");
    }
    else if( emailAddress.length == 0)
    {
      setmailText("Email adress should be filled");
      setpasswordText("");
    }
    else if(password.length < 4 || password.length > 60  )
    {
      setloggedInWithNetflix(false);
      setmailText("");
      setpasswordText("Your password length should be between 4 and  60");
    }
    else if (validateEmail(emailAddress) || validatePhone(emailAddress)) {
      // email format check
      if (validateRegistration(emailAddress, password)) {
        // email and password registration check
        if(rememberMe)
        {
          handleCookie();
        }
        setloggedInWithNetflix(true);
      } else {
        // not registered
        setmailText("");
        setpasswordText("username or password is not correct");
        
      }
    } 
    else {
      setmailText("Please enter a valid email or phone number.");
      setpasswordText("");
    }
  }

  var fbContent;

  const responseFacebook = (response) => {
    setuserID(response.userID);
    setisLoggedIn(true);
    setloggedInWithFacebook(true);
    setname(response.name);
    setemail(response.email);
    setpicture(response.picture.data.url);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  

  if (!loggedInWithFacebook && !loggedInWithNetflix ) {
    
    getCookies();
    
    return (
      <header className="main-wrapper">
        <nav className="login-navigation">
          <a href="/">
            <img className="logo" href="/" src={netflix_logo} />
          </a>
        </nav>
        <div className="login-wrapper">
          <form className="login-form" onSubmit={handleSubmit} method="POST">
            <h1 className="login-title">Sign In</h1>

            <input
              name="email"
              className="login-input-field"
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <h5 className="empty-email-phone"> {mailText} </h5>
            <input
              name="password"
              className="login-input-field"
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <h5 className="empty-password"> {passwordText} </h5>

            <button className="login-button" type="submit" onClick={signIn}>
              Sign In
            </button>

            <div>
              <input
                name="checkbox"
                type="checkbox"
                onChange={() => setrememberMe(!rememberMe)}
              />
              <span className="remember-me">Remember me</span>
            </div>
            <FacebookLogin
              appId="2083176028515656"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="btnFacebook"
              icon="fa-facebook"
              textButton="&nbsp;&nbsp;Sign In with Facebook"
            />

            <p className="login-text">
              New to Netflix?
              <a className="login-link"> Sign up now. </a>
            </p>
            <p className="login-checkBot">
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </p>
          </form>
        </div>
        <footer className="footer">
          <a href="#" className="footer-title">
            Questions? Contact us.
          </a>
          <div className="horizontal">
            <div className="vertical">
              <a href="#" className="footer-link">
                FAQ
              </a>
              <a href="#" className="footer-link">
                Investor Relations
              </a>
              <a href="#" className="footer-link">
                Privacy
              </a>
              <a href="#" className="footer-link">
                Speed Test
              </a>
            </div>
            <div className="vertical">
              <a href="#" className="footer-link">
                Help Center
              </a>
              <a href="#" className="footer-link">
                Jobs
              </a>
              <a href="#" className="footer-link">
                Cookie Preferences
              </a>
              <a href="#" className="footer-link">
                Legal Notices
              </a>
            </div>
            <div className="vertical">
              <a href="#" className="footer-link">
                Account
              </a>
              <a href="#" className="footer-link">
                Ways to Watch
              </a>
              <a href="#" className="footer-link">
                Corporate Information
              </a>
              <a href="#" className="footer-link">
                Netflix Originals
              </a>
            </div>
          </div>
        </footer>
      </header>

    );
  } 
  else if (loggedInWithFacebook) {
    fbContent = (
      <div
        style={{
          width: "400px",
          margin: "auto",
          background: "#f4f4f4",
          padding: "20px",
        }}
      >
        <img src={picture} alt={name} />
        <h2>Welcome {name}</h2>
        Email: {email}
      </div>
    );
    window.history.pushState({}, null, "/welcome");
    return <div>{fbContent}</div>;
  } else if (loggedInWithNetflix) {
    fbContent = (
      <div
        style={{
          width: "400px",
          margin: "auto",
          background: "#f4f4f4",
          padding: "20px",
        }}
      >
        <h2>Welcome {emailAddress}</h2>
      </div>
    );
    return <div>{fbContent}</div>;
  }
}

export default SigninPage;
