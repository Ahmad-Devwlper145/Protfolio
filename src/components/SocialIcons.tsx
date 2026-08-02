import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { profile } from "../data/site";

const social = profile.social as {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  instagram?: string;
};

// Only render icons that actually have a URL in data.json — a blank entry
// used to ship as a dead "#" link.
const links = (
  [
    { key: "github", href: social.github, Icon: FaGithub },
    { key: "linkedin", href: social.linkedin, Icon: FaLinkedinIn },
    { key: "twitter", href: social.twitter, Icon: FaXTwitter },
    { key: "instagram", href: social.instagram, Icon: FaInstagram },
  ] as const
).filter((l): l is typeof l & { href: string } => Boolean(l.href));

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    // One shared rAF loop and one shared mousemove listener for all icons —
    // previously each icon started its own loop that was never cancelled, and
    // the cleanup returned from inside forEach was silently discarded.
    const items = Array.from(social.querySelectorAll("span")).map((item) => {
      const elem = item as HTMLElement;
      return {
        elem,
        link: elem.querySelector("a") as HTMLElement | null,
        rect: elem.getBoundingClientRect(),
        mouseX: 0,
        mouseY: 0,
        currentX: 0,
        currentY: 0,
      };
    });

    const recenter = () => {
      items.forEach((it) => {
        it.rect = it.elem.getBoundingClientRect();
        it.mouseX = it.rect.width / 2;
        it.mouseY = it.rect.height / 2;
      });
    };
    recenter();

    let frame = 0;
    const updatePosition = () => {
      items.forEach((it) => {
        if (!it.link) return;
        it.currentX += (it.mouseX - it.currentX) * 0.1;
        it.currentY += (it.mouseY - it.currentY) * 0.1;
        it.link.style.setProperty("--siLeft", `${it.currentX}px`);
        it.link.style.setProperty("--siTop", `${it.currentY}px`);
      });
      frame = requestAnimationFrame(updatePosition);
    };
    frame = requestAnimationFrame(updatePosition);

    const onMouseMove = (e: MouseEvent) => {
      items.forEach((it) => {
        const x = e.clientX - it.rect.left;
        const y = e.clientY - it.rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          it.mouseX = x;
          it.mouseY = y;
        } else {
          it.mouseX = it.rect.width / 2;
          it.mouseY = it.rect.height / 2;
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", recenter);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", recenter);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {links.map(({ key, href, Icon }) => (
          <span key={key}>
            <a href={href} target="_blank" rel="noreferrer" aria-label={key}>
              <Icon />
            </a>
          </span>
        ))}
      </div>
      {profile.resumeUrl && (
        <a className="resume-button" href={profile.resumeUrl} target="_blank" rel="noreferrer">
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
