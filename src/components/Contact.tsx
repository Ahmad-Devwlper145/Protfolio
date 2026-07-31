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

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href={profile.email ? `mailto:${profile.email}` : "#"}
                data-cursor="disable"
              >
                {profile.email}
              </a>
            </p>
            {profile.location && (
              <>
                <h4>Location</h4>
                <p>{profile.location}</p>
              </>
            )}
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={social.github || "#"}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={social.linkedin || "#"}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={social.twitter || "#"}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href={social.instagram || "#"}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
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
