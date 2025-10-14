
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Home, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditableResumeView from '@/components/resume/EditableResumeView';
import { ResumeData } from '@/types/resume';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const ACCESS_CODE = 'tejesh2024'; // Change this to your preferred password

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('resumeAccess');
    if (savedAuth === 'granted') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('resumeAccess', 'granted');
      setError('');
    } else {
      setError('Invalid access code');
      setPassword('');
    }
  };
  
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
          'Developed automation tools including a disclosure management system, C# scripts, and Python scripts.'
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
        startDate: '2015-06',
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
      },
      {
        id: '3',
        title: 'Project Title',
        description: 'Project description goes here. Add details about what you built and the impact it had. Include technologies used and key achievements.',
        link: '',
        technologies: ['Technology1', 'Technology2', 'Technology3']
      }
    ],
    certifications: []
  });

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const event = new CustomEvent('downloadResume');
    window.dispatchEvent(event);
    
    // Simulate download time
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Resume Builder Access</h1>
          <p className="text-gray-600 text-center mb-6">Enter access code to continue</p>
          <form onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code"
              className="mb-4"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Button type="submit" className="w-full">
              Access Resume Builder
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Resume Builder</h1>
          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>
        </div>

        {/* Loading overlay */}
        {isDownloading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700 font-medium">Generating PDF...</span>
            </div>
          </div>
        )}
        
        <EditableResumeView data={resumeData} onChange={setResumeData} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
