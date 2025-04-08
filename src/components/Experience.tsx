
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Software Application Development Engineer",
      company: "Intel Corporation",
      period: "Jun 2022 - Present · 2 yrs 11 mos",
      location: "Bengaluru, Karnataka, India",
      responsibilities: [
        "Developed and deployed full stack applications using React, Python, and Node.js",
        "Managed and trained interns, conducted code reviews, and led successful implementation processes",
        "Utilized industry-standard tools and techniques to ensure efficient and effective application development"
      ],
      skills: ["JavaScript", "Flask", "React.js", "Node.js", "Python"]
    },
    {
      title: "Graduate Intern Technical",
      company: "Intel Corporation",
      period: "Aug 2021 - Jun 2022 · 11 mos",
      location: "Bengaluru, Karnataka, India",
      responsibilities: [
        "Developed backend scripts using Python for data processing and analysis",
        "Created frontend applications to streamline critical data processing tasks",
        "Ensured thorough documentation of projects for future reference"
      ],
      skills: ["JavaScript", "Flask", "Python", "Data Analysis"]
    },
    {
      title: "Research Intern | Web developer",
      company: "TechCiti Technologies Private Limited",
      period: "Apr 2020 - May 2020 · 2 mos",
      location: "Remote",
      responsibilities: [
        "Researched machine learning concepts to develop a model for bipolar disorder detection among patients and healthy siblings",
        "Presented research paper at the International Semantic Intelligence Conference 2021 organised by university of Lubek Germany",
        "Collaborated with team members to implement the machine learning model successfully"
      ],
      skills: ["Machine Learning", "Random Forest", "Research", "Web Development"]
    },
    {
      title: "Public Relations Chair",
      company: "IEEE NPSS VIT Chapter",
      period: "Jul 2019 - Mar 2020 · 9 mos",
      location: "Vellore, Tamil Nadu, India",
      responsibilities: [
        "Successfully led communication and outreach efforts to enhance the chapter's visibility and engagement within the community",
        "Developed and implemented strategic initiatives to promote the chapter's mission",
        "Coordinated impactful events and campaigns to increase community involvement"
      ]
    },
    {
      title: "District Coordinator - Digital Literacy Program",
      company: "Government of Andhra Pradesh",
      period: "May 2018 - Jun 2018 · 2 mos",
      location: "Chittoor, Andhra Pradesh, India",
      responsibilities: [
        "Coordinated efforts to connect donors with schools to facilitate digitalization of government schools in Chittoor, Andhra Pradesh",
        "Enabled access to technology and digital resources for schools through donor support",
        "Collaborated with stakeholders to ensure successful implementation of the Digital Literacy Program"
      ]
    }
  ];

  return (
    <section id="experience">
      <div className="section-container">
        <h2 className="section-title">Experience</h2>
        
        <div className="mt-12">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="flex flex-col md:flex-row md:items-start gap-4 mb-2">
                <div className="bg-muted p-3 rounded-md w-12 h-12 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{exp.title}</h3>
                  <p className="text-primary">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mb-4">{exp.period} · {exp.location}</p>
                  
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.skills && (
                    <div className="mt-4">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="skill-item">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
