import { Briefcase, Mail, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title font-garamond animate-slide-in-blurred-top">About Me</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <p className="text-lg md:text-xl font-garamond leading-relaxed">
              Developing full-stack web applications and automations to safeguard Intel's external intellectual property.
            </p>
            
            <p className="leading-relaxed">
              I am a Software Application Development Engineer at Intel Corporation with expertise in 
              React.js, Python, JavaScript, and Node.js. I specialize in developing and deploying 
              full-stack applications, managing implementation processes, and utilizing industry-standard 
              tools and techniques to ensure efficient and effective application development.
            </p>
            
            <p className="leading-relaxed">
              Throughout my career, I have successfully led teams, trained interns, conducted code reviews,
              and implemented strategic initiatives to enhance project visibility and engagement.
              I am passionate about creating robust, user-friendly applications that solve complex problems.
            </p>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:translate-y-[-3px] hover:shadow-lg rounded-md"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-in rounded-lg border border-border/30 p-6 bg-white/20 shadow-sm" style={{animationDelay: '0.4s'}}>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-300 group">
                <Briefcase className="w-5 h-5 mt-1 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-medium font-garamond">Current Position</h3>
                  <p>Software Application Development Engineer at Intel Corporation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-300 group">
                <MapPin className="w-5 h-5 mt-1 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-medium font-garamond">Location</h3>
                  <p>Bengaluru, Karnataka, India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 hover:translate-x-1 transition-transform duration-300 group">
                <Mail className="w-5 h-5 mt-1 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-medium font-garamond">Email</h3>
                  <a href="mailto:tejeshkumar448@gmail.com" className="hover:underline text-primary">
                    tejeshkumar448@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium font-garamond mb-3">Languages</h3>
              <ul className="space-y-2">
                {[
                  { name: "English", level: "Full professional proficiency" },
                  { name: "Hindi", level: "Full professional proficiency" },
                  { name: "Telugu", level: "Native or bilingual proficiency" },
                  { name: "French", level: "Elementary proficiency" }
                ].map((language, index) => (
                  <li key={index} className="flex justify-between items-center hover:bg-secondary/50 p-2 transition-colors rounded-md group">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors text-sm">{language.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
