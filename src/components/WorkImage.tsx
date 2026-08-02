import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";


interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  // `props.video` is a public-folder URL (e.g. "/videos/demo.mp4"). The old
  // code fetched a bare "src/assets/..." path, which only ever resolved in dev
  // and 404'd once built.
  const handleMouseEnter = () => {
    if (props.video) setIsVideo(true);
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} loading="lazy" decoding="async" />
        {isVideo && props.video && (
          <video src={props.video} autoPlay muted playsInline loop></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;
