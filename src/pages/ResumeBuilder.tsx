
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import EditableResumeView from '@/components/resume/EditableResumeView';
import { ResumeData } from '@/types/resume';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    contact: {
      fullName: 'K Tejesh',
      email: 'ktejesh2021@gmail.com',
      phone: '9553769344',
      linkedin: 'linkedin.com/in/tejeshk/',
      github: 'tejeshkrishnammagari.com'
    },
    summary: '',
    skills: [
      'Python', 'JavaScript', 'SQL', 'HTML/CSS', 'GraphQL', 'Java',
      'React', 'Node.js', 'Flask', 'Material-UI',
      'MySQL', 'MongoDB', 'Redis'
    ],
    experience: [
      {
        id: '1',
        title: 'Software Application Development Engineer',
        company: 'Intel Corporation',
        location: 'Bangalore',
        startDate: '2022-06',
        endDate: '',
        current: true,
        achievements: [
          'Participated in all stages of the Software Development Lifecycle, including design, development, debugging, and testing.',
          'Implemented front-end solutions with React, Redux Toolkit, Material UI, Azure SSO, and TypeScript.',
          'Built back-end services using Node.js, GraphQL, TypeScript, Redis Cache, and Python.'
        ]
      },
      {
        id: '2',
        title: 'Graduate Technical Intern',
        company: 'Intel Corporation',
        location: 'Bangalore',
        startDate: '2021-09',
        endDate: '2022-06',
        current: false,
        achievements: [
          'Designed a License Management Web Application using AngularJS, Flask, Python, and cloud hosting.',
          'Developed automation tools including a disclosure management system, C scripts, and Python scripts.'
        ]
      },
      {
        id: '3',
        title: 'Summer Intern',
        company: 'TechCiti Technologies',
        location: 'Bangalore',
        startDate: '2020-04',
        endDate: '2020-05',
        current: false,
        achievements: [
          'Developed a machine learning project on "Bipolar Disorder Detection" using advanced algorithms.',
          'Presented the project at the 2021 International Semantic Intelligence Conference and published in the SCOPUS database.'
        ]
      }
    ],
    education: [
      {
        id: '1',
        degree: 'MTech Integrated Software Engineering',
        institution: 'VIT University, Vellore',
        startDate: '2017-08',
        endDate: '2022-05',
        gpa: '9.13'
      },
      {
        id: '2',
        degree: 'Intermediate, MPC',
        institution: 'Sai Sri Chaithanya Jr College',
        startDate: '2015-08',
        endDate: '2017-05',
        gpa: '97.1%'
      },
      {
        id: '3',
        degree: 'SSC',
        institution: 'Little Angels High School',
        startDate: '2014-06',
        endDate: '2015-06',
        gpa: '98%'
      }
    ],
    projects: [
      {
        id: '1',
        title: 'EIP Uploads Tracker',
        description: 'Developed a web application to track external IPs, streamlining uploads to Intel\'s central database. Utilized technologies such as Python, Flask, React, Node.js, Redis, MySQL, and MongoDB. Improved efficiency by integrating multiple systems, saving significant time on IP management tasks.',
        link: '',
        technologies: ['Python', 'Flask', 'React', 'Node.js', 'Redis', 'MySQL', 'MongoDB']
      },
      {
        id: '2',
        title: 'EDA IP Tracker',
        description: 'Created a tracking system for monitoring agreements with EDA companies, including status and licensing. Implemented automated tracking, notifications, and metrics to enhance workflow efficiency. Integrated real-time email notifications for approval steps and status updates.',
        link: '',
        technologies: ['Python', 'Flask', 'React', 'MySQL', 'MongoDB', 'Node.js']
      }
    ],
    certifications: []
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
