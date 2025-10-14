
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ResumeData } from '@/types/resume';

interface EditableResumeViewProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const EditableText = ({ 
  value, 
  onChange, 
  className = "", 
  multiline = false, 
  placeholder = "Click to edit",
  style = {}
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return multiline ? (
      <Textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} border-2 border-blue-400 p-1 resize-none`}
        placeholder={placeholder}
        style={{ ...style, fontFamily: 'Times, serif', minHeight: 'auto' }}
      />
    ) : (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} border-2 border-blue-400 p-1`}
        placeholder={placeholder}
        style={{ ...style, fontFamily: 'Times, serif' }}
      />
    );
  }

  return (
    <span 
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:bg-gray-50 rounded px-1 transition-colors`}
      style={{ ...style, fontFamily: 'Times, serif' }}
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
    </span>
  );
};

const EditableResumeView = ({ data, onChange }: EditableResumeViewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const handleDownload = async () => {
      setFileName(data.contact.fullName || 'resume');
      setShowNameDialog(true);
    };

    window.addEventListener('downloadResume', handleDownload);
    return () => window.removeEventListener('downloadResume', handleDownload);
  }, [data.contact.fullName]);

  const proceedWithDownload = async () => {
    if (!previewRef.current || !fileName.trim()) return;

    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = previewRef.current;
    const opt = {
      margin: 0,
      filename: `${fileName.trim()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        height: element.scrollHeight,
        width: element.scrollWidth
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(element).save();
    setShowNameDialog(false);
  };

  const updateData = (section: keyof ResumeData, value: any) => {
    onChange({ ...data, [section]: value });
  };

  const updateContact = (field: keyof typeof data.contact, value: string) => {
    updateData('contact', { ...data.contact, [field]: value });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month}. ${year}`;
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} -- ${end}`;
  };

  return (
    <>
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name Your Resume</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNameDialog(false)}>
              Cancel
            </Button>
            <Button onClick={proceedWithDownload} disabled={!fileName.trim()}>
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-white shadow-lg">
        <div 
          ref={previewRef} 
          className="bg-white text-black"
          style={{ 
            fontFamily: 'Times, serif', 
            fontSize: '10pt', 
            lineHeight: '1.15', 
            width: '8.5in',
            height: '11in',
            color: 'black',
            padding: '0.5in 0.6in',
            margin: '0 auto',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '0.12in' }}>
            <EditableText
              value={data.contact.fullName}
              onChange={(value) => updateContact('fullName', value)}
              className="text-center block"
              placeholder="Your Full Name"
              style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1pt'
              }}
            />
            <div className="text-center" style={{ fontSize: '10pt', lineHeight: '1.0' }}>
              <EditableText
                value={data.contact.phone}
                onChange={(value) => updateContact('phone', value)}
                placeholder="Phone"
                className="inline"
              />
              <span className="mx-1"> | </span>
              <EditableText
                value={data.contact.email}
                onChange={(value) => updateContact('email', value)}
                placeholder="email@example.com"
                className="inline"
              />
              <span className="mx-1"> | </span>
              <EditableText
                value={data.contact.linkedin}
                onChange={(value) => updateContact('linkedin', value)}
                placeholder="linkedin.com/in/username"
                className="inline"
              />
              <span className="mx-1"> | </span>
              <EditableText
                value={data.contact.github}
                onChange={(value) => updateContact('github', value)}
                placeholder="website.com"
                className="inline"
              />
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '0.1in' }}>
            <h2 className="font-bold text-left pb-1 border-b border-black uppercase tracking-wide" 
                style={{ 
                  fontSize: '11pt', 
                  marginBottom: '3pt',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: index === data.education.length - 1 ? '0' : '1pt' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '1pt' }}>
                  <div className="flex-1">
                    <EditableText
                      value={edu.institution}
                      onChange={(value) => {
                        const newEducation = data.education.map(e => 
                          e.id === edu.id ? { ...e, institution: value } : e
                        );
                        updateData('education', newEducation);
                      }}
                      className="font-bold"
                      placeholder="Institution Name"
                      style={{ fontSize: '11pt', display: 'block', lineHeight: '1.0', fontWeight: 'bold' }}
                    />
                    <EditableText
                      value={edu.degree}
                      onChange={(value) => {
                        const newEducation = data.education.map(e => 
                          e.id === edu.id ? { ...e, degree: value } : e
                        );
                        updateData('education', newEducation);
                      }}
                      placeholder="Degree Name"
                      style={{ fontStyle: 'italic', fontSize: '10pt', display: 'block', lineHeight: '1.0' }}
                    />
                  </div>
                  <div className="text-right">
                    {edu.gpa && (
                      <EditableText
                        value={edu.gpa.includes('%') ? `Percentage: ${edu.gpa}` : `CGPA: ${edu.gpa}`}
                        onChange={(value) => {
                          const gpaValue = value.replace('Percentage: ', '').replace('CGPA: ', '');
                          const newEducation = data.education.map(e => 
                            e.id === edu.id ? { ...e, gpa: gpaValue } : e
                          );
                          updateData('education', newEducation);
                        }}
                        className="inline"
                        placeholder="Grade"
                        style={{ fontSize: '11pt', display: 'block', lineHeight: '1.0' }}
                      />
                    )}
                    <EditableText
                      value={formatDateRange(edu.startDate, edu.endDate, false)}
                      onChange={(value) => {
                        console.log('Date editing not implemented for complex parsing');
                      }}
                      placeholder="Date Range"
                      style={{ fontStyle: 'italic', fontSize: '10pt', lineHeight: '1.0' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '0.1in' }}>
            <h2 className="font-bold text-left pb-1 border-b border-black uppercase tracking-wide" 
                style={{ 
                  fontSize: '11pt', 
                  marginBottom: '3pt',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
              Technical Skills
            </h2>
            <div style={{ fontSize: '10pt', lineHeight: '1.2', marginLeft: '0.15in' }}>
              <div style={{ marginBottom: '1pt' }}>
                <EditableText
                  value="Languages: "
                  onChange={() => {}}
                  className="font-bold inline"
                  placeholder="Languages: "
                  style={{ fontWeight: 'bold' }}
                />
                <EditableText
                  value={data.skills.slice(0, 6).join(', ')}
                  onChange={(value) => {
                    const newSkills = [...data.skills];
                    const languages = value.split(',').map(s => s.trim());
                    languages.forEach((lang, index) => {
                      if (index < 6) newSkills[index] = lang;
                    });
                    updateData('skills', newSkills);
                  }}
                  className="inline"
                  placeholder="Languages"
                />
              </div>
              <div style={{ marginBottom: '1pt' }}>
                <EditableText
                  value="Frameworks: "
                  onChange={() => {}}
                  className="font-bold inline"
                  placeholder="Frameworks: "
                  style={{ fontWeight: 'bold' }}
                />
                <EditableText
                  value={data.skills.slice(6, 10).join(', ')}
                  onChange={(value) => {
                    const newSkills = [...data.skills];
                    const frameworks = value.split(',').map(s => s.trim());
                    frameworks.forEach((framework, index) => {
                      if (index < 4) newSkills[6 + index] = framework;
                    });
                    updateData('skills', newSkills);
                  }}
                  className="inline"
                  placeholder="Frameworks"
                />
              </div>
              <div>
                <EditableText
                  value="Databases: "
                  onChange={() => {}}
                  className="font-bold inline"
                  placeholder="Databases: "
                  style={{ fontWeight: 'bold' }}
                />
                <EditableText
                  value={data.skills.slice(10).join(', ')}
                  onChange={(value) => {
                    const newSkills = [...data.skills.slice(0, 10)];
                    const databases = value.split(',').map(s => s.trim());
                    newSkills.push(...databases);
                    updateData('skills', newSkills);
                  }}
                  className="inline"
                  placeholder="Databases"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '0.1in' }}>
            <h2 className="font-bold text-left pb-1 border-b border-black uppercase tracking-wide" 
                style={{ 
                  fontSize: '11pt', 
                  marginBottom: '3pt',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: index === data.experience.length - 1 ? '0' : '3pt' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '0.5pt' }}>
                  <div className="flex-1">
                    <EditableText
                      value={exp.title}
                      onChange={(value) => {
                        const newExperience = data.experience.map(e => 
                          e.id === exp.id ? { ...e, title: value } : e
                        );
                        updateData('experience', newExperience);
                      }}
                      className="font-bold"
                      placeholder="Job Title"
                      style={{ fontSize: '11pt', lineHeight: '1.0', fontWeight: 'bold' }}
                    />
                  </div>
                  <div className="text-right" style={{ fontSize: '11pt', lineHeight: '1.0' }}>
                    <EditableText
                      value={formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      onChange={(value) => {
                        console.log('Date editing not implemented for complex parsing');
                      }}
                      placeholder="Date Range"
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11pt', marginBottom: '1pt', lineHeight: '1.0' }}>
                  <span className="font-bold">
                    <EditableText
                      value={exp.company}
                      onChange={(value) => {
                        const newExperience = data.experience.map(e => 
                          e.id === exp.id ? { ...e, company: value } : e
                        );
                        updateData('experience', newExperience);
                      }}
                      placeholder="Company Name"
                      className="inline"
                      style={{ fontWeight: 'bold' }}
                    />
                  </span>
                  <span style={{ marginLeft: '12px', fontStyle: 'italic' }}>
                    <EditableText
                      value={exp.location}
                      onChange={(value) => {
                        const newExperience = data.experience.map(e => 
                          e.id === exp.id ? { ...e, location: value } : e
                        );
                        updateData('experience', newExperience);
                      }}
                      placeholder="Location"
                      className="inline"
                    />
                  </span>
                </div>
                <ul style={{ fontSize: '10pt', marginLeft: '0.15in', paddingLeft: '0', listStyleType: 'disc', lineHeight: '1.1' }}>
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} style={{ marginBottom: '0.5pt' }}>
                      <EditableText
                        value={achievement}
                        onChange={(value) => {
                          const newExperience = data.experience.map(e => 
                            e.id === exp.id ? {
                              ...e,
                              achievements: e.achievements.map((a, i) => i === achIndex ? value : a)
                            } : e
                          );
                          updateData('experience', newExperience);
                        }}
                        className="block"
                        placeholder="Achievement description"
                        multiline
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-bold text-left pb-1 border-b border-black uppercase tracking-wide" 
                style={{ 
                  fontSize: '11pt', 
                  marginBottom: '3pt',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
              Projects
            </h2>
            {data.projects.map((project, index) => (
              <div key={project.id} style={{ marginBottom: index === data.projects.length - 1 ? '0' : '3pt' }}>
                <div style={{ marginBottom: '0.5pt' }}>
                  <span className="font-bold" style={{ fontSize: '11pt', fontWeight: 'bold' }}>
                    <EditableText
                      value={project.title}
                      onChange={(value) => {
                        const newProjects = data.projects.map(p => 
                          p.id === project.id ? { ...p, title: value } : p
                        );
                        updateData('projects', newProjects);
                      }}
                      placeholder="Project Title"
                      className="inline"
                    />
                  </span>
                  <span style={{ margin: '0 4px', fontSize: '11pt' }}> | </span>
                  <span style={{ fontSize: '11pt', fontStyle: 'italic' }}>
                    <EditableText
                      value={project.technologies.join(', ')}
                      onChange={(value) => {
                        const newProjects = data.projects.map(p => 
                          p.id === project.id ? { 
                            ...p, 
                            technologies: value.split(',').map(s => s.trim()) 
                          } : p
                        );
                        updateData('projects', newProjects);
                      }}
                      placeholder="Technologies"
                      className="inline"
                    />
                  </span>
                </div>
                <ul style={{ fontSize: '10pt', paddingLeft: '0.15in', listStyleType: 'disc', lineHeight: '1.1' }}>
                  {project.description.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                    <li key={index} style={{ marginBottom: '0.5pt' }}>
                      <EditableText
                        value={sentence.trim() + '.'}
                        onChange={(value) => {
                          const sentences = project.description.split('.').filter(s => s.trim());
                          sentences[index] = value.replace('.', '');
                          const newDescription = sentences.join('. ').replace(/\.\s*$/, '.');
                          const newProjects = data.projects.map(p => 
                            p.id === project.id ? { ...p, description: newDescription } : p
                          );
                          updateData('projects', newProjects);
                        }}
                        className="inline"
                        placeholder="Project achievement"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditableResumeView;
