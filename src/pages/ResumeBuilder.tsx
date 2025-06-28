
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye } from 'lucide-react';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { ResumeData } from '@/types/resume';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    contact: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: []
  });

  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');

  const handleDownloadPDF = () => {
    // This will trigger the PDF generation in the preview component
    const event = new CustomEvent('downloadResume');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create a professional, ATS-friendly resume in minutes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile View Selector */}
          <div className="lg:hidden flex gap-2 mb-4">
            <Button
              variant={activeView === 'form' ? 'default' : 'outline'}
              onClick={() => setActiveView('form')}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant={activeView === 'preview' ? 'default' : 'outline'}
              onClick={() => setActiveView('preview')}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>

          {/* Form Section */}
          <div className={`lg:w-1/2 ${activeView === 'preview' ? 'hidden lg:block' : ''}`}>
            <Card>
              <CardHeader>
                <CardTitle>Resume Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ResumeForm data={resumeData} onChange={setResumeData} />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className={`lg:w-1/2 ${activeView === 'form' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Live Preview</h2>
                <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
