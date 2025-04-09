import { Briefcase, Mail, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg md:text-xl">
              Developing full-stack web applications and automations to safeguard Intel's external intellectual property.
            </p>
            
            <p>
              I am a Software Application Development Engineer at Intel Corporation with expertise in 
              React.js, Python, JavaScript, and Node.js. I specialize in developing and deploying 
              full-stack applications, managing implementation processes, and utilizing industry-standard 
              tools and techniques to ensure efficient and effective application development.
            </p>
            
            <p>
              Throughout my career, I have successfully led teams, trained interns, conducted code reviews,
              and implemented strategic initiatives to enhance project visibility and engagement.
              I am passionate about creating robust, user-friendly applications that solve complex problems.
            </p>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Current Position</h3>
                  <p>Software Application Development Engineer at Intel Corporation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p>Bengaluru, Karnataka, India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <a href="mailto:tejeshkumar448@gmail.com" className="hover:underline">
                    tejeshkumar448@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium mb-3">Languages</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>English</span>
                  <span className="text-muted-foreground">Full professional proficiency</span>
                </li>
                <li className="flex justify-between">
                  <span>Hindi</span>
                  <span className="text-muted-foreground">Full professional proficiency</span>
                </li>
                <li className="flex justify-between">
                  <span>Telugu</span>
                  <span className="text-muted-foreground">Native or bilingual proficiency</span>
                </li>
                <li className="flex justify-between">
                  <span>French</span>
                  <span className="text-muted-foreground">Elementary proficiency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
