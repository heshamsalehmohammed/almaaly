import { useEffect } from "react";
import mouseScroll from "../../assets/images/mouse-scroll.png";


const RotatingText = () => {
    useEffect(() => {
      const words = document.querySelectorAll('.word');
      words.forEach((word) => {
        const letters = word.textContent.split('');
        word.textContent = '';
        letters.forEach((letter) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.className = 'letter';
          word.append(span);
        });
      });
  
      let currentWordIndex = 0;
      const maxWordIndex = words.length - 1;
      words[currentWordIndex].style.opacity = '1';
  
      const rotateText = () => {
        const currentWord = words[currentWordIndex];
        const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  
        Array.from(currentWord.children).forEach((letter, i) => {
          setTimeout(() => {
            letter.className = 'letter out';
          }, i * 80);
        });
  
        nextWord.style.opacity = '1';
        Array.from(nextWord.children).forEach((letter, i) => {
          letter.className = 'letter behind';
          setTimeout(() => {
            letter.className = 'letter in';
          }, 340 + i * 80);
        });
  
        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
      };
  
      rotateText();
      const intervalId = setInterval(rotateText, 4000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="mb-3 rotating-text fs-2 d-flex justify-content-center align-items-center flex-md-wrap">
        <p className="me-2">Our School is</p>
        <p className="text-uppercase">
          <span className="word alizarin">awesome.</span>
          <span className="word wisteria">beautiful.</span>
          <span className="word peter-river">creative.</span>
          <span className="word emerald">fabulous.</span>
          <span className="word sun-flower">interesting.</span>
        </p>
      </div>
    );
  };
  
  // Define separate section components for better organization
  const Section1 = () => (
    <div
      className="section d-flex flex-column justify-content-center align-items-center position-relative"
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Welcome Box */}
      <div className="col-12 text-center">
        <div className="welcome-box">
          <RotatingText />
         <div className="">  <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            A
          </span>
          <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            L
          </span>
          <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            M
          </span>
          <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            A
          </span>
          <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            A
          </span>
          <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            L
          </span>
          <span className="coumpany-name display-1 welcome-title animate__animated animate__fadeInUp">
            Y
          </span></div>
        
          <p className=" col-md-7 desc pt-2 pb-0 mb-0 pe-sm-0 pe-5 animate__animated animate__fadeInUp">
            El Maaly International School offers a modern, engaging learning
            environment designed to inspire students. With a dynamic approach to
            education,
          </p>
          <p className=" col-md-5 desc pt-0 pe-sm-0 pe-5 animate__animated animate__fadeInUp">
            We are dedicated to empowering young minds for a bright future. Join us in creating a foundation for lifelong success.
          </p>
        </div>
      </div>
  
      {/* Scroll Down */}
      <div className="col-12 position-absolute bottom-0 start-50 translate-middle-x mb-3">
        <div className="scroll-down animate__animated animate__fadeInUp d-flex flex-column align-items-center">
          <img src={mouseScroll} alt="Scroll Down" />
          <span className="mt-3">Scroll Down</span>
        </div>
      </div>
    </div>
  );



  export default Section1;