import { Book } from 'lucide-react';

const Education = () => {
  const educations = [
    {
      institution: "Vellore Institute of Technology",
      degree: "M.Tech Integrated Software Engineering, Computer Science",
      period: "2017 - 2022",
      grade: "9.12/10 CGPA",
      // Removed logo property
      activities: [
        "Public Relations Chair - IEEE NPSS",
        "Program Coordinator - i-PACT 2021 (Innovations in Power and Advanced Computing Technologies)"
      ]
    },
    {
      institution: "Sai Sri Chaitanya Junior College",
      degree: "Higher Secondary Education, MPC",
      period: "2015 - 2017",
      grade: "97.1/100 %",
      // Removed logo property
    }
  ];

  const certifications = [
    {
      name: "Product Assurance and Security Yellow Belt - Software",
      issuer: "Intel Corporation",
      issued: "Feb 2023",
      // Removed logo property
    },
    {
      name: "Product Assurance and Security White Belt",
      issuer: "Intel Corporation",
      issued: "Feb 2022",
      // Removed logo property
    },
    {
      name: "Security Analyst",
      issuer: "nasscom",
      issued: "Aug 2021",
      // Removed logo property
    },
    {
      name: "Embedded Hardware and Operating Systems",
      issuer: "Coursera",
      issued: "Jun 2020",
      // Removed logo property
    },
    {
      name: "The Bits and Bytes of Computer Networking",
      issuer: "Google",
      issued: "Nov 2019",
      // Removed logo property
    }
  ];

  return (
    <section id="education">
      <div className="section-container">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl mb-6 flex items-center">
              <Book className="mr-2" /> Education
            </h3>
            
            <div className="space-y-8">
              {educations.map((edu, index) => (
                <div key={index} className="border-l-2 border-muted pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full left-[-7px] top-3"></div>
                  
                  <div className="flex items-start gap-4">
                    {/* Removed logo rendering */}
                    
                    <div>
                      <h4 className="text-xl">{edu.institution}</h4>
                      <p className="text-primary">{edu.degree}</p>
                      <p className="text-muted-foreground text-sm mb-2">{edu.period}</p>
                      <p className="text-sm">Grade: {edu.grade}</p>
                      
                      {edu.activities && edu.activities.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium">Activities and societies:</p>
                          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
                            {edu.activities.map((activity, idx) => (
                              <li key={idx}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl mb-6">Licenses & Certifications</h3>
            
            <div className="space-y-8">
              {certifications.map((cert, index) => (
                <div key={index} className="border-l-2 border-muted pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full left-[-7px] top-3"></div>
                  
                  <div className="flex items-start gap-4">
                    {/* Removed logo rendering */}
                    
                    <div>
                      <h4 className="text-xl">{cert.name}</h4>
                      <p className="text-primary">{cert.issuer}</p>
                      <p className="text-muted-foreground text-sm">Issued {cert.issued}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
