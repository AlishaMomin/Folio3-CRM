import logo from './logo.svg';
import signin from './signin-image.jpg'
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={signin} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div class="main">
      <section class="sign-in">
        <div class="container">
          <div class="signin-content">
            <div class="signin-image">
              <img src={signin} alt="logo" />
              <a href="#" class="signup-image-link"></a>
            </div>

            <div class="signin-form">
              <h2 class="form-title">Sign up</h2>
              <form method="POST" class="register-form" id="login-form">
                <div class="form-group">
                  <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name="your_name" id="your_name" placeholder="Your Name" />
                </div>
                <div class="form-group">
                  <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
                </div>
                <div class="form-group">
                  <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                  <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                </div>
                <div class="form-group form-button">
                  <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export default App;
