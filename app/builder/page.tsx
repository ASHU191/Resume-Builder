"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { ArrowLeft, Download, Save, FileText, Briefcase, GraduationCap, Lightbulb, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ResumePreview } from "@/components/resume-preview"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
    location: z.string().min(2, { message: "Location is required" }),
    summary: z.string().min(10, { message: "Summary is required" }),
  }),
  experience: z
    .array(
      z.object({
        company: z.string().min(1, { message: "Company name is required" }),
        position: z.string().min(1, { message: "Position is required" }),
        startDate: z.string().min(1, { message: "Start date is required" }),
        endDate: z.string().min(1, { message: "End date is required" }),
        description: z.string().min(1, { message: "Description is required" }),
      }),
    )
    .min(1, { message: "At least one experience entry is required" }),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, { message: "Institution name is required" }),
        degree: z.string().min(1, { message: "Degree is required" }),
        fieldOfStudy: z.string().min(1, { message: "Field of study is required" }),
        graduationYear: z.string().min(1, { message: "Graduation year is required" }),
      }),
    )
    .min(1, { message: "At least one education entry is required" }),
  skills: z.array(z.string()).min(1, { message: "At least one skill is required" }),
})

type FormValues = z.infer<typeof formSchema>

export default function ResumeBuilder() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [currentTemplate, setCurrentTemplate] = useState("professional")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      },
      experience: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          graduationYear: "",
        },
      ],
      skills: [""],
    },
  })

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        form.reset(parsedData)
      } catch (error) {
        console.error("Error parsing saved resume data:", error)
      }
    }
  }, [form])

  // Add new experience entry
  const addExperience = () => {
    const currentExperience = form.getValues("experience")
    form.setValue("experience", [
      ...currentExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  // Add new education entry
  const addEducation = () => {
    const currentEducation = form.getValues("education")
    form.setValue("education", [
      ...currentEducation,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
      },
    ])
  }

  // Add new skill
  const addSkill = () => {
    const currentSkills = form.getValues("skills")
    form.setValue("skills", [...currentSkills, ""])
  }

  // Remove experience entry
  const removeExperience = (index: number) => {
    const currentExperience = form.getValues("experience")
    if (currentExperience.length > 1) {
      form.setValue(
        "experience",
        currentExperience.filter((_, i) => i !== index),
      )
    }
  }

  // Remove education entry
  const removeEducation = (index: number) => {
    const currentEducation = form.getValues("education")
    if (currentEducation.length > 1) {
      form.setValue(
        "education",
        currentEducation.filter((_, i) => i !== index),
      )
    }
  }

  // Remove skill
  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills")
    if (currentSkills.length > 1) {
      form.setValue(
        "skills",
        currentSkills.filter((_, i) => i !== index),
      )
    }
  }

  // Save form data to localStorage
  const saveFormData = () => {
    const formData = form.getValues()
    localStorage.setItem("resumeData", JSON.stringify(formData))
    toast({
      title: "Progress Saved",
      description: "Your resume data has been saved locally.",
    })
  }

  // Generate and download PDF
  const downloadPDF = async () => {
    const resumeElement = document.getElementById("resume-preview")
    if (!resumeElement) return

    setIsLoading(true)
    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your resume...",
    })

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`${form.getValues().personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`)

      toast({
        title: "PDF Generated",
        description: "Your resume has been downloaded successfully.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
    localStorage.setItem("resumeData", JSON.stringify(data))
    toast({
      title: "Progress Saved",
      description: "Your resume data has been saved successfully.",
    })
    setActiveTab("preview")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-rose-500 dark:text-rose-400">Resume</span>
            <span className="dark:text-white">Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={saveFormData}
              className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              size="sm"
              onClick={downloadPDF}
              className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
              disabled={isLoading}
            >
              <Download className="h-4 w-4 mr-2" />
              {isLoading ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6 px-4 md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-rose-500 dark:data-[state=active]:text-rose-400 rounded-md transition-all"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Personal Info</span>
              <span className="sm:hidden">Personal</span>
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-rose-500 dark:data-[state=active]:text-rose-400 rounded-md transition-all"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Experience</span>
              <span className="sm:hidden">Work</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-rose-500 dark:data-[state=active]:text-rose-400 rounded-md transition-all"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Education & Skills</span>
              <span className="sm:hidden">Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-rose-500 dark:data-[state=active]:text-rose-400 rounded-md transition-all"
            >
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Preview</span>
              <span className="sm:hidden">Preview</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="personal" className="space-y-6">
                  <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                          <h2 className="text-xl font-bold dark:text-white">Personal Information</h2>
                        </div>
                        <Separator className="dark:bg-gray-800" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="personalInfo.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-gray-300">Full Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John Doe"
                                    {...field}
                                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                  />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="personalInfo.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-gray-300">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="john.doe@example.com"
                                    {...field}
                                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                  />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="personalInfo.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-gray-300">Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+1 (555) 123-4567"
                                    {...field}
                                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                  />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="personalInfo.location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="dark:text-gray-300">Location</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="New York, NY"
                                    {...field}
                                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                  />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="personalInfo.summary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-gray-300">Professional Summary</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Experienced professional with a track record of..."
                                  className="min-h-[120px] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-rose-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("experience")}
                      className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition-colors"
                    >
                      Next: Experience
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                            <h2 className="text-xl font-bold dark:text-white">Work Experience</h2>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addExperience}
                            className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            Add Experience
                          </Button>
                        </div>
                        <Separator className="dark:bg-gray-800" />
                        {form.getValues().experience.map((_, index) => (
                          <div
                            key={index}
                            className="space-y-4 p-4 border rounded-lg dark:border-gray-800 dark:bg-gray-800/50"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium dark:text-white">Experience #{index + 1}</h3>
                              {form.getValues().experience.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeExperience(index)}
                                  className="bg-rose-500 hover:bg-rose-600"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`experience.${index}.company`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Company</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Company Name"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`experience.${index}.position`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Position</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Job Title"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`experience.${index}.startDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Start Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Jan 2020"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`experience.${index}.endDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">End Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Present"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name={`experience.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="dark:text-gray-300">Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Describe your responsibilities and achievements..."
                                      className="min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-rose-500" />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("personal")}
                      className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Back: Personal Info
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("education")}
                      className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition-colors"
                    >
                      Next: Education & Skills
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                            <h2 className="text-xl font-bold dark:text-white">Education</h2>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addEducation}
                            className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            Add Education
                          </Button>
                        </div>
                        <Separator className="dark:bg-gray-800" />
                        {form.getValues().education.map((_, index) => (
                          <div
                            key={index}
                            className="space-y-4 p-4 border rounded-lg dark:border-gray-800 dark:bg-gray-800/50"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium dark:text-white">Education #{index + 1}</h3>
                              {form.getValues().education.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeEducation(index)}
                                  className="bg-rose-500 hover:bg-rose-600"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`education.${index}.institution`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Institution</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="University Name"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`education.${index}.degree`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Degree</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Bachelor of Science"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`education.${index}.fieldOfStudy`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Field of Study</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Computer Science"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`education.${index}.graduationYear`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="dark:text-gray-300">Graduation Year</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="2020"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                            <h2 className="text-xl font-bold dark:text-white">Skills</h2>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addSkill}
                            className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            Add Skill
                          </Button>
                        </div>
                        <Separator className="dark:bg-gray-800" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {form.getValues().skills.map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <FormField
                                control={form.control}
                                name={`skills.${index}`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        placeholder="Skill"
                                        {...field}
                                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-500" />
                                  </FormItem>
                                )}
                              />
                              {form.getValues().skills.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeSkill(index)}
                                  className="bg-rose-500 hover:bg-rose-600"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("experience")}
                      className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Back: Experience
                    </Button>
                    <Button
                      type="submit"
                      className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition-colors"
                    >
                      Save and Preview
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                      <h2 className="text-xl font-bold dark:text-white">Resume Preview</h2>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <h3 className="font-medium mb-2 dark:text-white">Select Template</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={currentTemplate === "professional" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTemplate("professional")}
                          className={
                            currentTemplate === "professional"
                              ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                              : "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }
                        >
                          Professional
                        </Button>
                        <Button
                          variant={currentTemplate === "modern" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTemplate("modern")}
                          className={
                            currentTemplate === "modern"
                              ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                              : "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }
                        >
                          Modern
                        </Button>
                        <Button
                          variant={currentTemplate === "creative" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTemplate("creative")}
                          className={
                            currentTemplate === "creative"
                              ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                              : "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }
                        >
                          Creative
                        </Button>
                        <Button
                          variant={currentTemplate === "executive" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTemplate("executive")}
                          className={
                            currentTemplate === "executive"
                              ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                              : "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }
                        >
                          Executive
                        </Button>
                        <Button
                          variant={currentTemplate === "minimalist" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTemplate("minimalist")}
                          className={
                            currentTemplate === "minimalist"
                              ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                              : "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }
                        >
                          Minimalist
                        </Button>
                        <Button
                          variant={currentTemplate === "technical" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentTemplate("technical")}
                          className={
                            currentTemplate === "technical"
                              ? "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                              : "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          }
                        >
                          Technical
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                    <div id="resume-preview">
                      <ResumePreview data={form.getValues()} template={currentTemplate} />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("education")}
                      className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Back: Education & Skills
                    </Button>
                    <Button
                      onClick={downloadPDF}
                      className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition-colors"
                      disabled={isLoading}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isLoading ? "Generating..." : "Download PDF"}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
