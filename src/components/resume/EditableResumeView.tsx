
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

  useEffect(() => {
    const handleDownload = async () => {
      if (!previewRef.current) return;

      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = previewRef.current;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${data.contact.fullName || 'resume'}.pdf`,
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
    };

    window.addEventListener('downloadResume', handleDownload);
    return () => window.removeEventListener('downloadResume', handleDownload);
  }, [data.contact.fullName]);

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
    <div className="bg-white shadow-lg">
      <div 
        ref={previewRef} 
        className="bg-white text-black mx-auto p-8"
        style={{ 
          fontFamily: 'Times, serif', 
          fontSize: '12px', 
          lineHeight: '1.4', 
          width: '8.5in',
          minHeight: '11in',
          color: 'black'
        }}
      >
        
        {/* Header */}
        <div className="text-center mb-6" style={{ paddingTop: '0.25in' }}>
          <EditableText
            value={data.contact.fullName}
            onChange={(value) => updateContact('fullName', value)}
            className="text-center block mb-2"
            placeholder="Your Full Name"
            style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          />
          <div className="text-center" style={{ fontSize: '12px' }}>
            <EditableText
              value={data.contact.phone}
              onChange={(value) => updateContact('phone', value)}
              placeholder="Phone"
              className="inline"
            />
            <span className="mx-2">|</span>
            <EditableText
              value={data.contact.email}
              onChange={(value) => updateContact('email', value)}
              placeholder="email@example.com"
              className="inline underline"
            />
            <span className="mx-2">|</span>
            <EditableText
              value={data.contact.linkedin}
              onChange={(value) => updateContact('linkedin', value)}
              placeholder="linkedin.com/in/username"
              className="inline underline"
            />
            <span className="mx-2">|</span>
            <EditableText
              value={data.contact.github}
              onChange={(value) => updateContact('github', value)}
              placeholder="website.com"
              className="inline underline"
            />
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="font-bold text-left mb-3 pb-1 border-b border-black uppercase tracking-wider" style={{ fontSize: '14px' }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
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
                      style={{ fontSize: '12px' }}
                    />
                    <div className="text-right">
                      {edu.gpa && (
                        <div style={{ fontSize: '12px' }}>
                          {edu.gpa.includes('%') ? 'Percentage: ' : 'CGPA: '}
                          <EditableText
                            value={edu.gpa}
                            onChange={(value) => {
                              const newEducation = data.education.map(e => 
                                e.id === edu.id ? { ...e, gpa: value } : e
                              );
                              updateData('education', newEducation);
                            }}
                            className="inline"
                            placeholder="Grade"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '12px' }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(value) => {
                        const newEducation = data.education.map(e => 
                          e.id === edu.id ? { ...e, degree: value } : e
                        );
                        updateData('education', newEducation);
                      }}
                      placeholder="Degree Name"
                    />
                  </div>
                  <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills */}
        <div className="mb-6">
          <h2 className="font-bold text-left mb-3 pb-1 border-b border-black uppercase tracking-wider" style={{ fontSize: '14px' }}>
            Technical Skills
          </h2>
          <div className="space-y-1" style={{ fontSize: '12px', marginLeft: '0.15in' }}>
            <div>
              <span className="font-bold">Languages: </span>
              {data.skills.slice(0, 6).map((skill, index) => (
                <span key={index}>
                  <EditableText
                    value={skill}
                    onChange={(value) => {
                      const newSkills = [...data.skills];
                      newSkills[index] = value;
                      updateData('skills', newSkills);
                    }}
                    className="inline"
                  />
                  {index < data.skills.slice(0, 6).length - 1 && ', '}
                </span>
              ))}
            </div>
            <div>
              <span className="font-bold">Frameworks: </span>
              {data.skills.slice(6, 10).map((skill, index) => {
                const actualIndex = 6 + index;
                return (
                  <span key={actualIndex}>
                    <EditableText
                      value={skill}
                      onChange={(value) => {
                        const newSkills = [...data.skills];
                        newSkills[actualIndex] = value;
                        updateData('skills', newSkills);
                      }}
                      className="inline"
                    />
                    {index < data.skills.slice(6, 10).length - 1 && ', '}
                  </span>
                );
              })}
            </div>
            <div>
              <span className="font-bold">Databases: </span>
              {data.skills.slice(10).map((skill, index) => {
                const actualIndex = 10 + index;
                return (
                  <span key={actualIndex}>
                    <EditableText
                      value={skill}
                      onChange={(value) => {
                        const newSkills = [...data.skills];
                        newSkills[actualIndex] = value;
                        updateData('skills', newSkills);
                      }}
                      className="inline"
                    />
                    {index < data.skills.slice(10).length - 1 && ', '}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="font-bold text-left mb-3 pb-1 border-b border-black uppercase tracking-wider" style={{ fontSize: '14px' }}>
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
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
                    style={{ fontSize: '12px' }}
                  />
                </div>
                <div className="text-right" style={{ fontSize: '12px' }}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </div>
              </div>
              <div className="mb-2" style={{ fontSize: '12px' }}>
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
                  />
                </span>
                <span className="ml-4" style={{ fontStyle: 'italic' }}>
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
              <ul className="space-y-1" style={{ fontSize: '12px', marginLeft: '0.15in' }}>
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="list-disc">
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
        <div className="mb-6">
          <h2 className="font-bold text-left mb-3 pb-1 border-b border-black uppercase tracking-wider" style={{ fontSize: '14px' }}>
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4" style={{ marginLeft: '0.15in' }}>
              <div className="mb-2">
                <span className="font-bold" style={{ fontSize: '12px' }}>
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
                <span className="mx-2" style={{ fontSize: '12px' }}>|</span>
                <span style={{ fontSize: '12px', fontStyle: 'italic' }}>
                  {project.technologies.join(', ')}
                </span>
              </div>
              <ul className="space-y-1" style={{ fontSize: '12px' }}>
                {project.description.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                  <li key={index} className="list-disc ml-4">
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
  );
};

export default EditableResumeView;
