import { Card } from "@/components/ui/card"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    fieldOfStudy: string
    graduationYear: string
  }>
  skills: string[]
}

interface ResumePreviewProps {
  data: ResumeData
  template: string
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  // If no data is provided, show a placeholder
  if (!data.personalInfo.fullName) {
    return (
      <div className="flex flex-col items-center justify-center h-[800px] bg-white dark:bg-gray-900 p-8">
        <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500">Resume Preview</h3>
        <p className="text-gray-400 dark:text-gray-500 mt-2">Fill out the form to see your resume preview</p>
      </div>
    )
  }

  // Render different templates based on the selected template
  switch (template) {
    case "modern":
      return <ModernTemplate data={data} />
    case "creative":
      return <CreativeTemplate data={data} />
    case "executive":
      return <ExecutiveTemplate data={data} />
    case "minimalist":
      return <MinimalistTemplate data={data} />
    case "technical":
      return <TechnicalTemplate data={data} />
    case "professional":
    default:
      return <ProfessionalTemplate data={data} />
  }
}

function ProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 max-w-[800px] mx-auto font-serif">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span>{data.personalInfo.email}</span>
          <span className="hidden sm:inline">|</span>
          <span>{data.personalInfo.phone}</span>
          <span className="hidden sm:inline">|</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 text-gray-800 dark:text-white">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{data.personalInfo.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 text-gray-800 dark:text-white">
          Work Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">{exp.position}</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <h4 className="text-sm italic text-gray-700 dark:text-gray-400 mb-1">{exp.company}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 text-gray-800 dark:text-white">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">{edu.graduationYear}</span>
            </div>
            <h4 className="text-sm italic text-gray-700 dark:text-gray-400">{edu.institution}</h4>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2 text-gray-800 dark:text-white">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b-2 border-rose-500 dark:border-rose-600">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{data.personalInfo.fullName}</h1>
          <p className="text-rose-500 dark:text-rose-400 font-medium mt-1">
            {data.experience[0]?.position || "Professional"}
          </p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <p className="text-sm dark:text-gray-300">{data.personalInfo.email}</p>
          <p className="text-sm dark:text-gray-300">{data.personalInfo.phone}</p>
          <p className="text-sm dark:text-gray-300">{data.personalInfo.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-rose-500 dark:text-rose-400 mb-2">About Me</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{data.personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-rose-500 dark:text-rose-400 mb-3">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">{exp.company}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-rose-500 dark:text-rose-400 mb-3">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{edu.graduationYear}</span>
                </div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">{edu.institution}</h4>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Skills */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-rose-500 dark:text-rose-400 mb-3">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-full px-3 py-1 text-sm shadow-sm dark:text-gray-200"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 bg-clip-text text-transparent">
          {data.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full dark:text-gray-300">
            {data.personalInfo.email}
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full dark:text-gray-300">
            {data.personalInfo.phone}
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full dark:text-gray-300">
            {data.personalInfo.location}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300">{data.personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 bg-clip-text text-transparent">
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <Card key={index} className="mb-4 overflow-hidden border-none shadow-md dark:bg-gray-800">
                <div className="border-l-4 border-gradient-to-b from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 p-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <h3 className="font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">{exp.company}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 bg-clip-text text-transparent">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <Card key={index} className="mb-4 overflow-hidden border-none shadow-md dark:bg-gray-800">
                <div className="border-l-4 border-gradient-to-b from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 p-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{edu.graduationYear}</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">{edu.institution}</h4>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          {/* Skills */}
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-500 bg-clip-text text-transparent">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200 dark:border-gray-700 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 max-w-[800px] mx-auto font-serif">
      {/* Header with elegant styling */}
      <div className="border-b-2 border-gray-800 dark:border-gray-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center uppercase tracking-wider">
          {data.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 mt-3">
          <span>{data.personalInfo.email}</span>
          <span className="hidden sm:inline">•</span>
          <span>{data.personalInfo.phone}</span>
          <span className="hidden sm:inline">•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary with elegant styling */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
          Executive Summary
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-l-2 border-gray-300 dark:border-gray-700 pl-4 italic">
          {data.personalInfo.summary}
        </p>
      </div>

      {/* Experience with elegant styling */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          Professional Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 dark:border-gray-800 pb-1 mb-2">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">{exp.position}</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">{exp.company}</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education with elegant styling */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{edu.graduationYear}</span>
            </div>
            <h4 className="text-gray-700 dark:text-gray-300">{edu.institution}</h4>
          </div>
        ))}
      </div>

      {/* Skills with elegant styling */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          Areas of Expertise
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 dark:bg-gray-400 rounded-full mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 max-w-[800px] mx-auto font-sans">
      {/* Minimalist header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300">{data.personalInfo.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{exp.position}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-2">{exp.company}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-1">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{edu.graduationYear}</span>
            </div>
            <h4 className="text-sm text-gray-700 dark:text-gray-300">{edu.institution}</h4>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="text-sm text-gray-700 dark:text-gray-300">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TechnicalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 max-w-[800px] mx-auto font-mono">
      {/* Header with tech-inspired styling */}
      <div className="border-b-2 border-gray-300 dark:border-gray-700 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span className="flex items-center gap-1">
            <span className="text-emerald-500 dark:text-emerald-400">@:</span> {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500 dark:text-emerald-400">#:</span> {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500 dark:text-emerald-400">~:</span> {data.personalInfo.location}
          </span>
        </div>
      </div>

      {/* Summary with tech-inspired styling */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-3 border-l-4 border-emerald-500 dark:border-emerald-400">
        <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">// PROFILE</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{data.personalInfo.summary}</p>
      </div>

      {/* Experience with tech-inspired styling */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3">// WORK EXPERIENCE</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">{exp.position}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {exp.startDate} <span className="text-emerald-500 dark:text-emerald-400">→</span> {exp.endDate}
              </span>
            </div>
            <h4 className="text-sm text-gray-700 dark:text-gray-400 mb-1">{exp.company}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education with tech-inspired styling */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3">// EDUCATION</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{edu.graduationYear}</span>
            </div>
            <h4 className="text-sm text-gray-700 dark:text-gray-400">{edu.institution}</h4>
          </div>
        ))}
      </div>

      {/* Skills with tech-inspired styling */}
      <div>
        <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3">// TECHNICAL SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono border border-gray-200 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
