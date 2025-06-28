
import { useEffect, useRef } from 'react';
import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDownload = async () => {
      if (!previewRef.current) return;

      // Dynamic import to avoid build issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = previewRef.current;
      const opt = {
        margin: 0.5,
        filename: `${data.contact.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    };

    window.addEventListener('downloadResume', handleDownload);
    return () => window.removeEventListener('downloadResume', handleDownload);
  }, [data.contact.fullName]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div ref={previewRef} className="p-8 bg-white text-black" style={{ fontSize: '14px', lineHeight: '1.4' }}>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{data.contact.fullName || 'Your Name'}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            {data.contact.email && <div>{data.contact.email}</div>}
            {data.contact.phone && <div>{data.contact.phone}</div>}
            <div className="flex justify-center space-x-4">
              {data.contact.linkedin && (
                <span>LinkedIn: {data.contact.linkedin}</span>
              )}
              {data.contact.github && (
                <span>GitHub: {data.contact.github}</span>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">TECHNICAL SKILLS</h2>
            <p className="text-sm">{data.skills.join(' • ')}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROFESSIONAL EXPERIENCE</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-sm font-medium">{exp.company} • {exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-4">
                  {exp.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                    <li key={index} className="list-disc">
                      {achievement.startsWith('•') ? achievement.substring(1).trim() : achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">EDUCATION</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROJECTS</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm mb-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600">Technologies: {project.technologies.join(', ')}</p>
                )}
                {project.link && (
                  <p className="text-sm">Link: {project.link}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">CERTIFICATIONS</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm">{cert.issuer}</p>
                  </div>
                  <div className="text-sm text-gray-600">{formatDate(cert.date)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
