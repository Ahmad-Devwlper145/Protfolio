import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";
import { profile, initials } from "../data/site";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Latch: once we've hit 100 we stay complete. Belt-and-braces alongside the
  // monotonic setter in LoadingProvider — a percent that dips back below 100
  // must never be able to cancel the reveal timers below.
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if (percent >= 100) setIsComplete(true);
  }, [percent]);

  // Warm the intro-animation chunk while the model is still downloading, so
  // revealing the page doesn't wait on a fresh network round-trip.
  useEffect(() => {
    import("./utils/initialFX");
  }, []);

  // Runs once when the bar actually reaches 100 — doing this during render
  // spawned a fresh timer chain on every re-render.
  useEffect(() => {
    if (!isComplete) return;
    const t1 = setTimeout(() => setLoaded(true), 150);
    const t2 = setTimeout(() => setIsLoaded(true), 550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isComplete]);

  useEffect(() => {
    if (!isLoaded) return;
    let timer: number;
    import("./utils/initialFX").then((module) => {
      setClicked(true);
      timer = setTimeout(() => {
        module.initialFX?.();
        setIsLoading(false);
      }, 300);
    });
    return () => clearTimeout(timer);
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          {initials}
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span>&nbsp;{profile.title}</span> <span>{profile.tagline}</span>
            <span>&nbsp;{profile.title}</span> <span>{profile.tagline}</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 60) {
      const rand = Math.round(Math.random() * 6);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      // Creep toward the cap quickly enough that the bar never looks frozen
      // while the model is still on the wire.
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 400);
    }
  }, 60);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
