
import { Code } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Languages & Frameworks",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "Node.js", level: 80 },
        { name: "TypeScript", level: 75 },
        { name: "Redux.js", level: 70 },
        { name: "Angular", level: 60 },
        { name: "Flask", level: 75 }
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "REST APIs", level: 85 },
        { name: "CI/CD", level: 70 }
      ]
    },
    {
      category: "Machine Learning",
      skills: [
        { name: "Machine Learning", level: 60 },
        { name: "Random Forest", level: 55 },
        { name: "Data Analysis", level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl mb-6 flex items-center">
              <Code className="mr-2" /> Top Skills
            </h3>
            <div className="space-y-6">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h4 className="text-xl mb-4">{category.category}</h4>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${skill.level}%`, transitionDelay: `${skillIndex * 100}ms` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="sticky top-32">
              <h3 className="text-2xl mb-6">Professional Focus</h3>
              <p className="mb-6">
                As a Full Stack Developer, I specialize in building robust web applications
                using modern JavaScript frameworks and Python backends. My professional
                focus includes:
              </p>
              
              <div className="space-y-4">
                <div className="border border-muted p-6 hover:border-primary/50 transition-colors">
                  <h4 className="text-xl mb-2">Frontend Development</h4>
                  <p className="text-muted-foreground">
                    Creating responsive, accessible, and performant user interfaces using React.js and modern JavaScript.
                  </p>
                </div>
                
                <div className="border border-muted p-6 hover:border-primary/50 transition-colors">
                  <h4 className="text-xl mb-2">Backend Systems</h4>
                  <p className="text-muted-foreground">
                    Developing scalable and secure backend services using Python, Node.js, and RESTful APIs.
                  </p>
                </div>
                
                <div className="border border-muted p-6 hover:border-primary/50 transition-colors">
                  <h4 className="text-xl mb-2">Data Processing</h4>
                  <p className="text-muted-foreground">
                    Building efficient data processing systems and implementing analysis pipelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
