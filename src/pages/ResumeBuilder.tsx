
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import EditableResumeView from '@/components/resume/EditableResumeView';
import { ResumeData } from '@/types/resume';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    contact: {
      fullName: 'K TEJESH',
      email: 'ktejesh2021@gmail.com',
      phone: '+91 9553769344',
      linkedin: 'linkedin.com/in/tejeshk/',
      github: 'www.tejeshkrishnammagari.com'
    },
    summary: 'Absolute learner and a Software Engineer with 3 plus years of experience in full stack development and automation building.',
    skills: [
      'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 
      'Docker', 'Git', 'Jenkins', 'Kubernetes', 'REST APIs', 'GraphQL', 'Redux'
    ],
    experience: [
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Company',
        location: 'San Francisco, CA',
        startDate: '2017-01',
        endDate: '2019-01',
        current: false,
        achievements: [
          'Achieved 40% growth for XYZ using React, Node.js, and MongoDB skills.',
          'Led development team which led to 25% improvement in system performance',
          'Developed scalable microservices that improved API response time by 30%'
        ]
      },
      {
        id: '2',
        title: 'Senior Software Engineer',
        company: 'Another Tech Company',
        location: 'San Francisco, CA',
        startDate: '2019-01',
        endDate: '2022-01',
        current: false,
        achievements: [
          'Achieved 50% growth for platform using React, Python, and AWS skills.',
          'Led cross-functional team which led to 35% improvement in user engagement',
          'Developed cloud-native solutions that reduced infrastructure costs by 25%'
        ]
      }
    ],
    education: [
      {
        id: '1',
        degree: 'MTech Integrated Software Engineering',
        institution: 'VIT University, Vellore',
        startDate: '2018-06',
        endDate: '2022-06',
        gpa: '9.12'
      },
      {
        id: '2',
        degree: 'Intermediate',
        institution: 'Sai Sri Chaithanya Jr College',
        startDate: '2015-06',
        endDate: '2017-06',
        gpa: ''
      }
    ],
    projects: [
      {
        id: '1',
        title: 'Hiring Search Tool',
        description: 'Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries. Over 25000 people have used it so far, with 5000+ queries being saved and shared, and search results better than LinkedIn (Try it here)',
        link: 'https://github.com/tejesh/hiring-tool',
        technologies: ['React', 'Node.js', 'Firebase', 'MongoDB']
      },
      {
        id: '2',
        title: 'E-commerce Platform',
        description: 'Build a project that does something and had quantified success using React, Node.js, and MongoDB. This project\'s description spans two lines and also won an award.',
        link: 'https://github.com/tejesh/ecommerce',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-01',
        link: 'https://aws.amazon.com/certification/'
      },
      {
        id: '2',
        name: 'Google Cloud Professional Developer',
        issuer: 'Google Cloud',
        date: '2022-08',
        link: 'https://cloud.google.com/certification'
      }
    ]
  });

  const handleDownloadPDF = () => {
    const event = new CustomEvent('downloadResume');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Resume Builder</h1>
            <p className="text-gray-600 text-sm">Click on any text to edit it directly</p>
          </div>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <EditableResumeView data={resumeData} onChange={setResumeData} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
