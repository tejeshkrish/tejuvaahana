
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, Experience, Education, Project, Certification } from '@/types/resume';

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
        className={`${className} min-h-[40px] border-2 border-blue-400 p-1`}
        placeholder={placeholder}
        style={{ ...style, fontFamily: 'Times, serif' }}
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
    <div 
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors min-h-[16px] flex items-center`}
      style={{ ...style, fontFamily: 'Times, serif' }}
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
    </div>
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
        margin: [0.4, 0.4, 0.4, 0.4],
        filename: `${data.contact.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 1.5,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait',
          compress: true
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
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div 
        ref={previewRef} 
        className="bg-white text-black mx-auto"
        style={{ 
          fontFamily: 'Times, serif', 
          fontSize: '11px', 
          lineHeight: '1.2', 
          width: '8.5in',
          minHeight: '11in',
          padding: '0.5in',
          color: 'black'
        }}
      >
        
        {/* Header */}
        <div className="text-center mb-4">
          <EditableText
            value={data.contact.fullName}
            onChange={(value) => updateContact('fullName', value)}
            className="text-center block mb-2"
            placeholder="Your Full Name"
            style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '1.5px' }}
          />
          <div className="text-center" style={{ fontSize: '10px' }}>
            <EditableText
              value={data.contact.phone}
              onChange={(value) => updateContact('phone', value)}
              placeholder="Phone"
              className="inline"
            />
            <span className="mx-1">|</span>
            <EditableText
              value={data.contact.email}
              onChange={(value) => updateContact('email', value)}
              placeholder="email@example.com"
              className="inline"
            />
            <span className="mx-1">|</span>
            <EditableText
              value={data.contact.linkedin}
              onChange={(value) => updateContact('linkedin', value)}
              placeholder="linkedin.com/in/username"
              className="inline"
            />
            <span className="mx-1">|</span>
            <EditableText
              value={data.contact.github}
              onChange={(value) => updateContact('github', value)}
              placeholder="website.com"
              className="inline"
            />
          </div>
        </div>

        {/* Education */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold border-b border-black pb-0.5" style={{ fontSize: '12px', letterSpacing: '1px' }}>EDUCATION</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const newEdu: Education = {
                  id: Date.now().toString(),
                  degree: 'New Degree',
                  institution: 'Institution Name',
                  startDate: '',
                  endDate: '',
                  gpa: ''
                };
                updateData('education', [...data.education, newEdu]);
              }}
              className="text-xs h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="mb-1.5 group relative">
              <div className="flex justify-between items-start">
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
                      style={{ fontSize: '11px' }}
                    />
                    <div className="text-right" style={{ fontSize: '10px' }}>
                      {edu.gpa && (
                        <div>
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
                      <div>
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>
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
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 ml-2 h-6 w-6 p-0"
                  onClick={() => {
                    updateData('education', data.education.filter(e => e.id !== edu.id));
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold border-b border-black pb-0.5" style={{ fontSize: '12px', letterSpacing: '1px' }}>TECHNICAL SKILLS</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => updateData('skills', [...data.skills, 'New Skill'])}
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-0.5" style={{ fontSize: '10px' }}>
            <div>
              <span className="font-bold">Languages: </span>
              {data.skills.slice(0, 6).map((skill, index) => (
                <span key={index} className="group/skill inline">
                  <EditableText
                    value={skill}
                    onChange={(value) => {
                      const newSkills = [...data.skills];
                      newSkills[index] = value;
                      updateData('skills', newSkills);
                    }}
                    className="inline"
                  />
                  {index < 5 && index < data.skills.slice(0, 6).length - 1 && ', '}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover/skill:opacity-100 h-auto p-0 ml-1"
                    onClick={() => {
                      updateData('skills', data.skills.filter((_, i) => i !== index));
                    }}
                  >
                    <Trash2 className="w-2 h-2" />
                  </Button>
                </span>
              ))}
            </div>
            <div>
              <span className="font-bold">Frameworks: </span>
              {data.skills.slice(6, 10).map((skill, index) => {
                const actualIndex = 6 + index;
                return (
                  <span key={actualIndex} className="group/skill inline">
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
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover/skill:opacity-100 h-auto p-0 ml-1"
                      onClick={() => {
                        updateData('skills', data.skills.filter((_, i) => i !== actualIndex));
                      }}
                    >
                      <Trash2 className="w-2 h-2" />
                    </Button>
                  </span>
                );
              })}
            </div>
            <div>
              <span className="font-bold">Databases: </span>
              {data.skills.slice(10).map((skill, index) => {
                const actualIndex = 10 + index;
                return (
                  <span key={actualIndex} className="group/skill inline">
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
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover/skill:opacity-100 h-auto p-0 ml-1"
                      onClick={() => {
                        updateData('skills', data.skills.filter((_, i) => i !== actualIndex));
                      }}
                    >
                      <Trash2 className="w-2 h-2" />
                    </Button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold border-b border-black pb-0.5" style={{ fontSize: '12px', letterSpacing: '1px' }}>EXPERIENCE</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const newExp: Experience = {
                  id: Date.now().toString(),
                  title: 'Job Title',
                  company: 'Company Name',
                  location: 'Location',
                  startDate: '',
                  endDate: '',
                  current: false,
                  achievements: ['New achievement']
                };
                updateData('experience', [...data.experience, newExp]);
              }}
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3 group relative">
              <div className="flex justify-between items-start mb-0.5">
                <div className="flex-1">
                  <EditableText
                    value={exp.title}
                    onChange={(value) => {
                      const newExperience = data.experience.map(e => 
                        e.id === exp.id ? { ...e, title: value } : e
                      );
                      updateData('experience', newExperience);
                    }}
                    className="font-bold block"
                    placeholder="Job Title"
                    style={{ fontSize: '11px' }}
                  />
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>
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
                  </div>
                </div>
                <div className="text-right" style={{ fontSize: '10px' }}>
                  <div>
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                  <div style={{ fontStyle: 'italic' }}>
                    <EditableText
                      value={exp.location}
                      onChange={(value) => {
                        const newExperience = data.experience.map(e => 
                          e.id === exp.id ? { ...e, location: value } : e
                        );
                        updateData('experience', newExperience);
                      }}
                      placeholder="Location"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 ml-2 h-6 w-6 p-0"
                  onClick={() => {
                    updateData('experience', data.experience.filter(e => e.id !== exp.id));
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <ul className="space-y-0.5 ml-4" style={{ fontSize: '10px' }}>
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="list-disc group/achievement">
                    <div className="flex items-start gap-1">
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
                        className="flex-1"
                        placeholder="Achievement description"
                        multiline
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover/achievement:opacity-100 h-auto p-0"
                        onClick={() => {
                          const newExperience = data.experience.map(e => 
                            e.id === exp.id ? {
                              ...e,
                              achievements: e.achievements.filter((_, i) => i !== achIndex)
                            } : e
                          );
                          updateData('experience', newExperience);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </li>
                ))}
                <li className="list-none">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newExperience = data.experience.map(e => 
                        e.id === exp.id ? {
                          ...e,
                          achievements: [...e.achievements, 'New achievement']
                        } : e
                      );
                      updateData('experience', newExperience);
                    }}
                    className="text-gray-500 h-auto p-0 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add achievement
                  </Button>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold border-b border-black pb-0.5" style={{ fontSize: '12px', letterSpacing: '1px' }}>PROJECTS</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const newProject: Project = {
                  id: Date.now().toString(),
                  title: 'Project Title',
                  description: 'Project description...',
                  link: '',
                  technologies: ['Tech1', 'Tech2']
                };
                updateData('projects', [...data.projects, newProject]);
              }}
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-2.5 group relative">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-0.5">
                    <EditableText
                      value={project.title}
                      onChange={(value) => {
                        const newProjects = data.projects.map(p => 
                          p.id === project.id ? { ...p, title: value } : p
                        );
                        updateData('projects', newProjects);
                      }}
                      className="font-bold inline"
                      placeholder="Project Title"
                      style={{ fontSize: '11px' }}
                    />
                    <span style={{ fontSize: '10px' }}>|</span>
                    <div style={{ fontSize: '10px', fontStyle: 'italic' }}>
                      {project.technologies.map((tech, index) => (
                        <span key={index}>
                          {tech}
                          {index < project.technologies.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: '10px' }}>
                    <EditableText
                      value={project.description}
                      onChange={(value) => {
                        const newProjects = data.projects.map(p => 
                          p.id === project.id ? { ...p, description: value } : p
                        );
                        updateData('projects', newProjects);
                      }}
                      className="block"
                      multiline
                      placeholder="Project description..."
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                  onClick={() => {
                    updateData('projects', data.projects.filter(p => p.id !== project.id));
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditableResumeView;
