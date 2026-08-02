import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { profile } from "../data/site";

const social = profile.social as {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  instagram?: string;
};

// Blank entries in data.json are skipped rather than rendered as "#" links.
const socialLinks = (
  [
    { label: "Github", href: social.github },
    { label: "Linkedin", href: social.linkedin },
    { label: "Twitter", href: social.twitter },
    { label: "Instagram", href: social.instagram },
  ] as const
).filter((l): l is typeof l & { href: string } => Boolean(l.href));

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            {profile.email && (
              <>
                <h4>Email</h4>
                <p>
                  <a href={`mailto:${profile.email}`} data-cursor="disable">
                    {profile.email}
                  </a>
                </p>
              </>
            )}
            {profile.location && (
              <>
                <h4>Location</h4>
                <p>{profile.location}</p>
              </>
            )}
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                {label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{profile.name}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
