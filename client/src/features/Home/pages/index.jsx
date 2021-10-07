import React from 'react';
import Typewriter from "typewriter-effect";
import './HomePage.css';

export default function HomePage() {
  const sentences = ["breakfast", "lunch", "dinner"];
  return (
    <>
      <div className="home_page">
        <div className="title">
        <h2>🍱</h2>
        <h1>A wonderful place for cooking lovers!</h1>
        <p>
          The collection of recipes for
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
