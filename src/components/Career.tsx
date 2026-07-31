import "./styles/Career.css";
import { experience } from "../data/site";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experience.map((job, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{job.role}</h4>
                  <h5>{job.company}</h5>
                </div>
                {job.duration && <h3>{job.duration}</h3>}
              </div>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
