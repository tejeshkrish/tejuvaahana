
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
        className={`${className} min-h-[60px] border-2 border-blue-400`}
        placeholder={placeholder}
        style={style}
      />
    ) : (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} border-2 border-blue-400`}
        placeholder={placeholder}
        style={style}
      />
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors min-h-[20px] flex items-center`}
      style={style}
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
      <div ref={previewRef} className="p-12 bg-white text-black" style={{ fontFamily: 'Times, serif', fontSize: '12px', lineHeight: '1.3', maxWidth: '8.5in', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <EditableText
            value={data.contact.fullName}
            onChange={(value) => updateContact('fullName', value)}
            className="text-center block mb-3"
            placeholder="Your Full Name"
            style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}
          />
          <div className="text-center" style={{ fontSize: '11px' }}>
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold border-b border-black pb-1" style={{ fontSize: '14px', letterSpacing: '1px' }}>EDUCATION</h2>
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
              className="text-xs"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2 group relative">
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
                      style={{ fontSize: '12px' }}
                    />
                    <div className="text-right" style={{ fontSize: '11px' }}>
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
                  <div style={{ fontStyle: 'italic', fontSize: '11px' }}>
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
                  className="opacity-0 group-hover:opacity-100 ml-2 text-xs"
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold border-b border-black pb-1" style={{ fontSize: '14px', letterSpacing: '1px' }}>TECHNICAL SKILLS</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => updateData('skills', [...data.skills, 'New Skill'])}
              className="text-xs"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-1" style={{ fontSize: '11px' }}>
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
                    className="opacity-0 group-hover/skill:opacity-100 h-auto p-0 ml-1 text-xs"
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
                      className="opacity-0 group-hover/skill:opacity-100 h-auto p-0 ml-1 text-xs"
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
                      className="opacity-0 group-hover/skill:opacity-100 h-auto p-0 ml-1 text-xs"
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold border-b border-black pb-1" style={{ fontSize: '14px', letterSpacing: '1px' }}>EXPERIENCE</h2>
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
              className="text-xs"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4 group relative">
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
                    className="font-bold block"
                    placeholder="Job Title"
                    style={{ fontSize: '12px' }}
                  />
                  <div style={{ fontStyle: 'italic', fontSize: '11px' }}>
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
                <div className="text-right" style={{ fontSize: '11px' }}>
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
                  className="opacity-0 group-hover:opacity-100 ml-2 text-xs"
                  onClick={() => {
                    updateData('experience', data.experience.filter(e => e.id !== exp.id));
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <ul className="space-y-1" style={{ fontSize: '11px' }}>
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="list-disc ml-4 group/achievement">
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
                        className="opacity-0 group-hover/achievement:opacity-100 h-auto p-0 text-xs"
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
                <li className="list-none ml-4">
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
                    className="text-xs text-gray-500 h-auto p-0"
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold border-b border-black pb-1" style={{ fontSize: '14px', letterSpacing: '1px' }}>PROJECTS</h2>
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
              className="text-xs"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3 group relative">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start gap-2">
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
                      style={{ fontSize: '12px' }}
                    />
                    <span style={{ fontSize: '11px' }}>|</span>
                    <div style={{ fontSize: '11px', fontStyle: 'italic' }}>
                      {project.technologies.map((tech, index) => (
                        <span key={index}>
                          {tech}
                          {index < project.technologies.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="mt-1 space-y-1" style={{ fontSize: '11px' }}>
                    {project.description.split('. ').map((sentence, index) => (
                      <li key={index} className="list-disc ml-4">
                        {sentence}{index < project.description.split('. ').length - 1 && '.'}
                      </li>
                    ))}
                  </ul>
                  <EditableText
                    value={project.description}
                    onChange={(value) => {
                      const newProjects = data.projects.map(p => 
                        p.id === project.id ? { ...p, description: value } : p
                      );
                      updateData('projects', newProjects);
                    }}
                    className="hidden"
                    multiline
                    placeholder="Project description..."
                  />
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 text-xs"
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
