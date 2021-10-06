import React from 'react';
import Typewriter from "typewriter-effect";
import './HomePage.css';

export default function HomePage() {
  const sentences = ["breakfast", "lunch", "dinner"];
  return (
    <>
      <div className="home_page">
        <div className="title">
        <h2>🥘</h2>
        <h1>A favorite place who in love with cooking!</h1>
        <p>
          We have recipe for
          <div className="typewriter">
            <Typewriter
              options={{
                strings: sentences,
                autoStart: true,
                loop: true
              }}
            />
          </div>
          <button className="join_us" onClick={() => {window.location.href = '/login'}}>
            <span>Join us now!</span>
          </button>
        </p>
        </div>
      </div>
    </>
  )
}
