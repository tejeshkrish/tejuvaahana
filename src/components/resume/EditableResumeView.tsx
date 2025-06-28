
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit } from 'lucide-react';
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
  placeholder = "Click to edit" 
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
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
        className={`${className} min-h-[60px]`}
        placeholder={placeholder}
      />
    ) : (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={className}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors min-h-[24px] flex items-center`}
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

  const addSkill = () => {
    updateData('skills', [...data.skills, 'New Skill']);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    updateData('skills', newSkills);
  };

  const removeSkill = (index: number) => {
    updateData('skills', data.skills.filter((_, i) => i !== index));
  };

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
          <EditableText
            value={data.contact.fullName}
            onChange={(value) => updateContact('fullName', value)}
            className="text-2xl font-bold mb-2 text-center"
            placeholder="Your Full Name"
          />
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-center items-center gap-2">
              <EditableText
                value={data.contact.phone}
                onChange={(value) => updateContact('phone', value)}
                placeholder="+91 1234567890"
              />
              <span>•</span>
              <span>Bangalore</span>
            </div>
            <div className="flex justify-center flex-wrap gap-4 text-blue-600">
              <EditableText
                value={data.contact.email}
                onChange={(value) => updateContact('email', value)}
                placeholder="email@example.com"
                className="text-blue-600"
              />
              <span>◊</span>
              <EditableText
                value={data.contact.linkedin}
                onChange={(value) => updateContact('linkedin', value)}
                placeholder="linkedin.com/in/username"
                className="text-blue-600"
              />
              <span>◊</span>
              <EditableText
                value={data.contact.github}
                onChange={(value) => updateContact('github', value)}
                placeholder="github.com/username"
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Objective */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">OBJECTIVE</h2>
          <EditableText
            value={data.summary}
            onChange={(value) => updateData('summary', value)}
            multiline
            placeholder="Write your professional objective..."
            className="text-sm leading-relaxed"
          />
        </div>

        {/* Education */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1">EDUCATION</h2>
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
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="mb-3 group relative">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <EditableText
                        value={edu.degree}
                        onChange={(value) => {
                          const newEducation = data.education.map(e => 
                            e.id === edu.id ? { ...e, degree: value } : e
                          );
                          updateData('education', newEducation);
                        }}
                        className="font-semibold"
                        placeholder="Degree Name"
                      />
                      <EditableText
                        value={edu.institution}
                        onChange={(value) => {
                          const newEducation = data.education.map(e => 
                            e.id === edu.id ? { ...e, institution: value } : e
                          );
                          updateData('education', newEducation);
                        }}
                        className="text-sm"
                        placeholder="Institution Name"
                      />
                    </div>
                    <div className="text-right text-sm">
                      <div>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                      {edu.gpa && <div>CGPA {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 ml-2"
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

        {/* Skills */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1">SKILLS</h2>
            <Button size="sm" variant="ghost" onClick={addSkill}>
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-medium mb-1">Technical Skills</div>
              <div className="text-sm space-y-1">
                {data.skills.slice(0, Math.ceil(data.skills.length/3)).map((skill, index) => (
                  <div key={index} className="flex items-center group">
                    <EditableText
                      value={skill}
                      onChange={(value) => updateSkill(index, value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 h-auto p-0 ml-1"
                      onClick={() => removeSkill(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Soft Skills</div>
              <div className="text-sm space-y-1">
                {data.skills.slice(Math.ceil(data.skills.length/3), Math.ceil(data.skills.length*2/3)).map((skill, index) => {
                  const actualIndex = Math.ceil(data.skills.length/3) + index;
                  return (
                    <div key={actualIndex} className="flex items-center group">
                      <EditableText
                        value={skill}
                        onChange={(value) => updateSkill(actualIndex, value)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 h-auto p-0 ml-1"
                        onClick={() => removeSkill(actualIndex)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">XYZ</div>
              <div className="text-sm space-y-1">
                {data.skills.slice(Math.ceil(data.skills.length*2/3)).map((skill, index) => {
                  const actualIndex = Math.ceil(data.skills.length*2/3) + index;
                  return (
                    <div key={actualIndex} className="flex items-center group">
                      <EditableText
                        value={skill}
                        onChange={(value) => updateSkill(actualIndex, value)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 h-auto p-0 ml-1"
                        onClick={() => removeSkill(actualIndex)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1">EXPERIENCE</h2>
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
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4 group relative">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <EditableText
                    value={exp.title}
                    onChange={(value) => {
                      const newExperience = data.experience.map(e => 
                        e.id === exp.id ? { ...e, title: value } : e
                      );
                      updateData('experience', newExperience);
                    }}
                    className="font-semibold"
                    placeholder="Job Title"
                  />
                  <div className="flex items-center gap-1 text-sm">
                    <EditableText
                      value={exp.company}
                      onChange={(value) => {
                        const newExperience = data.experience.map(e => 
                          e.id === exp.id ? { ...e, company: value } : e
                        );
                        updateData('experience', newExperience);
                      }}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600 italic">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                  <div className="text-sm text-gray-600">
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
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      updateData('experience', data.experience.filter(e => e.id !== exp.id));
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <ul className="text-sm space-y-1">
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
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1">PROJECTS</h2>
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
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3 group relative">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <EditableText
                    value={project.title}
                    onChange={(value) => {
                      const newProjects = data.projects.map(p => 
                        p.id === project.id ? { ...p, title: value } : p
                      );
                      updateData('projects', newProjects);
                    }}
                    className="font-semibold"
                    placeholder="Project Title"
                  />
                  <EditableText
                    value={project.description}
                    onChange={(value) => {
                      const newProjects = data.projects.map(p => 
                        p.id === project.id ? { ...p, description: value } : p
                      );
                      updateData('projects', newProjects);
                    }}
                    className="text-sm mb-1"
                    multiline
                    placeholder="Project description..."
                  />
                  {project.link && (
                    <EditableText
                      value={project.link}
                      onChange={(value) => {
                        const newProjects = data.projects.map(p => 
                          p.id === project.id ? { ...p, link: value } : p
                        );
                        updateData('projects', newProjects);
                      }}
                      className="text-sm text-blue-600"
                      placeholder="Project link"
                    />
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100"
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

        {/* Extra-Curricular Activities */}
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">EXTRA-CURRICULAR ACTIVITIES</h2>
          <ul className="text-sm space-y-2">
            <li className="list-disc ml-4">
              <span>Actively write </span>
              <span className="text-blue-600">blog posts</span>
              <span> and social media posts (</span>
              <span className="text-blue-600">TikTok, Instagram</span>
              <span>) viewed by over 20K+ job seekers per week to help people with best practices to land their dream jobs.</span>
            </li>
            <li className="list-disc ml-4">Sample bullet point.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditableResumeView;
