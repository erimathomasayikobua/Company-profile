import React from 'react';
import './Project.css';

const Project = ({ project }) => {
    return (
        <div className='project-card'>
            <div className='project-image'>
                {project.image ? (
                    <img src={project.image} alt={project.title} />
                ) : (
                    <div className='project-image-placeholder'>
                        <span>📱 Project</span>
                    </div>
                )}
            </div>
            <div className='project-content'>
                <h3>{project.title}</h3>
                {project.client && <p className='project-client'><strong>Client:</strong> {project.client}</p>}
                {project.category && <span className='project-category'>{project.category}</span>}
                <p className='project-description'>{project.description}</p>
                {project.technologies && (
                    <div className='project-tech'>
                        <strong>Tech Stack:</strong>
                        <div className='tech-tags'>
                            {project.technologies.map((tech, index) => (
                                <span key={index} className='tech-tag'>{tech}</span>
                            ))}
                        </div>
                    </div>
                )}
                {project.results && (
                    <div className='project-results'>
                        <strong>Results:</strong>
                        <ul>
                            {project.results.map((result, index) => (
                                <li key={index}>{result}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className='project-footer'>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className='view-project-btn'>
                        View Project
                    </a>
                )}
            </div>
        </div>
    )
}

export default Project;