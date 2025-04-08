
import { Book } from 'lucide-react';

const Education = () => {
  const educations = [
    {
      institution: "Vellore Institute of Technology",
      degree: "M.Tech Integrated Software Engineering, Computer Science",
      period: "2017 - 2022",
      grade: "9.12/10 CGPA",
      logo: "/lovable-uploads/4ecee192-1209-4c94-af7e-03e0516da815.png",
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
      logo: null
    }
  ];

  const certifications = [
    {
      name: "Product Assurance and Security Yellow Belt - Software",
      issuer: "Intel Corporation",
      issued: "Feb 2023",
      logo: "/lovable-uploads/cab418db-d8d4-4f25-89d6-1280c19f9ac7.png"
    },
    {
      name: "Product Assurance and Security White Belt",
      issuer: "Intel Corporation",
      issued: "Feb 2022",
      logo: "/lovable-uploads/cab418db-d8d4-4f25-89d6-1280c19f9ac7.png"
    },
    {
      name: "Security Analyst",
      issuer: "nasscom",
      issued: "Aug 2021",
      logo: null
    },
    {
      name: "Embedded Hardware and Operating Systems",
      issuer: "Coursera",
      issued: "Jun 2020",
      logo: null
    },
    {
      name: "The Bits and Bytes of Computer Networking",
      issuer: "Google",
      issued: "Nov 2019",
      logo: null
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
                    {edu.logo && (
                      <div className="bg-secondary/50 p-2 rounded-md w-12 h-12 flex items-center justify-center">
                        <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                      </div>
                    )}
                    
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
                    {cert.logo && (
                      <div className="bg-secondary/50 p-2 rounded-md w-12 h-12 flex items-center justify-center">
                        <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-xl">{cert.name}</h4>
                      <p className="text-primary">{cert.issuer}</p>
                      <p className="text-muted-foreground text-sm">Issued {cert.issued}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="#" 
                className="inline-flex items-center text-primary hover:underline"
              >
                View all certifications
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
