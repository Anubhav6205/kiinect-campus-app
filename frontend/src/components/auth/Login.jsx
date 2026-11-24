import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { DEMO_MODE, startDemoSession } from "../../demo/demoMode";
function Login() {
  const handleDemo = () => {
    startDemoSession();
    window.location.href = "/";
  };

  const handleSubmitGoogle = async () => {
    if (DEMO_MODE) {
      handleDemo();
      return;
    }
    console.log("login");
    //authenticates user with google account
    await signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="blob"></div>
      <div className="box">
        <div className="left">
          <div className="logo">
            <img src="../../../logo.png"></img>
          </div>
          <div className="cartoon">
            <img src="https://www.springboard.com/blog/wp-content/uploads/2022/04/117-coding-programming-interview-questions-answers-2022-prep-guide.png"></img>
          </div>

       </div>
        <div className="right">
          <div className="title">
            <h6>Welcome Kiitians !</h6>
          </div>

          <div className="mid">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              {DEMO_MODE && (
                <div className="demo-note">
                  <p>
                    Demo mode: no account is needed. Sample data is stored in
                    your browser only.
                  </p>
                  <button type="button" className="btn" onClick={handleDemo}>
                    Enter demo
                  </button>
                </div>
              )}
              <div className="email first">
                <i className="fa fa-envelope"></i>
                <input autoComplete="on" type="email" placeholder="Enter email address" />
              </div>
              <div className="password">
              <i className="fa fa-lock"></i>
                <input autoComplete="on" type="password" placeholder="Enter password" />
              </div>
              <button type="submit" className="btn">
                Login Now
              </button>
            </form>
          </div>

          <div className="bottom">
            <div className="options">Or you can join with</div>
            <div className="icons">
              <div className="google">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  onClick={handleSubmitGoogle}
                ></img>
              </div>
              <div className="github">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
