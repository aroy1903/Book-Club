import { useRef, useEffect, useState } from 'react';
import './pageCSS/Main.css';
import BIRDS from 'vanta/dist/vanta.birds.min';

export default function Main() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const bird = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: bird.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 400.0,
          minWidth: 500.0,
          maxWidth: 800.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundAlpha: 0.0,
          quantity: 3.0,
          color1: 0x72e887,
          color2: 0x3479af,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className="homePage">
      <div className="mainCont">
        <div id="birdWatch" ref={bird}>
          <h1>Welcome to Book Club!</h1>
          <h3>
            A place for book lovers to come together to share book
            reccomendations
          </h3>
        </div>
      </div>
    </div>
  );
}
