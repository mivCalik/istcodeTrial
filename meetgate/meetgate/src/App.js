import UserForm from "./UserForm.jsx";


function App() {
  return (
    <div className="App">
        <div className ="header"> 
          <a href="https://meetgate.ai/"> Meetgate</a>
        </div>

        <UserForm />

        <div className="footer">

          <div className="footer-up">
            <span className="title"> 
              <a href="https://meetgate.ai/">Meetgate</a>
            </span>
            <span className="link">
              <a href="https://meetgate.ai/blog/">Blog</a>
              <a href="https://meetgate.ai/contact/">Contact</a>
            </span>
          </div>

          <hr/>

          <div className="footer-down">
            <div className="copyright">Copyright © 2024</div>
            <div className="mandatory-links">
             
              <span>
                <a href="https://meetgate.ai/privacy-policy/">Privacy Policy</a>
              </span>
              <span>
                <a href="https://meetgate.ai/cookie-policy/">Cookie Policy</a>
              </span>
              <span>
                <a href="https://meetgate.ai/protection-of-personal-data/" >Protection of Personal Data</a>
              </span>
              
              
            </div>
            <div className="istcode">
              <a href="https://www.istcode.com/">ISTCODE</a>
            </div>
          </div>

        </div>
        


    </div>
  );
}

export default App;
