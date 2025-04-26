import Link from "next/link"
import { ArrowRight, FileText, Sparkles, Download, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      {/* Header */}
      <header className="border-b dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-950 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-rose-500 dark:text-rose-400">Resume</span>
            <span className="dark:text-white">Builder</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400 transition-colors"
            >
              Templates
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/builder">
              <Button className="bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition-colors">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 mb-2">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Professional Resume Builder
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-white">
                  Create Stunning Resumes in Minutes
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our AI-powered resume builder helps you create professional resumes that stand out to employers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/builder">
                  <Button
                    size="lg"
                    className="gap-1 bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Build Your Resume <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-${i * 100} dark:bg-gray-${900 - i * 100}`}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by 10,000+ professionals</p>
              </div>
            </div>
            <div className="flex justify-center relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl blur-xl opacity-50 dark:opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Resume Builder Preview"
                  className="w-full h-auto"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Powerful Features
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                Everything You Need
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Create professional resumes with our comprehensive toolset
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-900/50 hover:-translate-y-1"
              >
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-full text-rose-600 dark:text-rose-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold dark:text-white">{feature.title}</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Simple Process
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                How It Works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Create your professional resume in just a few simple steps
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-rose-200 dark:bg-rose-800 -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section
        id="templates"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-rose-50 dark:from-gray-950 dark:to-gray-900"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
              <FileText className="h-3.5 w-3.5 mr-1" />
              Premium Templates
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                Professional Templates
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose from our collection of professionally designed templates
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-12">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="aspect-[3/4] object-cover w-full transition-transform duration-300 group-hover:scale-105"
                    width={300}
                    height={400}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Link href="/builder">
                      <Button
                        variant="default"
                        className="w-full bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                      >
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg dark:text-white">{template.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Testimonials
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from professionals who have used our resume builder
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 dark:bg-rose-600">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="max-w-[600px] mx-auto text-rose-100 md:text-xl/relaxed mb-8">
            Join thousands of professionals who have boosted their career with our resume builder
          </p>
          <Link href="/builder">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 dark:hover:bg-white/90">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 dark:border-gray-800">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-rose-500 dark:text-rose-400">Resume</span>
            <span className="dark:text-white">Builder</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Created by Muhammad Arsalan Aftab, Founder</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "AI-Powered",
    description: "Our AI technology helps you create professional content for your resume.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Modern Templates",
    description: "Choose from a variety of professionally designed templates.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "PDF Export",
    description: "Download your resume as a professional PDF document.",
    icon: <Download className="h-6 w-6" />,
  },
]

const steps = [
  {
    title: "Fill Your Information",
    description: "Enter your personal details, work experience, education, and skills.",
  },
  {
    title: "Choose a Template",
    description: "Select from our collection of professional resume templates.",
  },
  {
    title: "Download & Share",
    description: "Download your resume as a PDF and share it with potential employers.",
  },
]

const templates = [
  {
    name: "Professional",
    description: "Clean and traditional layout perfect for corporate roles",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Modern",
    description: "Contemporary design with a fresh, innovative look",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Creative",
    description: "Unique design for creative industries and portfolios",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Executive",
    description: "Sophisticated layout for senior management positions",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Minimalist",
    description: "Simple and elegant design focusing on essential information",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Technical",
    description: "Specialized format for IT and engineering professionals",
    image: "/placeholder.svg?height=400&width=300",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Marketing Manager",
    quote:
      "This resume builder helped me land my dream job! The templates are professional and the AI suggestions made my resume stand out.",
  },
  {
    name: "David Chen",
    position: "Software Engineer",
    quote:
      "As a developer, I was impressed by how easy it was to create a technical resume. The Technical template perfectly highlighted my skills.",
  },
  {
    name: "Priya Patel",
    position: "Financial Analyst",
    quote:
      "The Executive template helped me showcase my experience in a professional way. I received multiple interview calls after updating my resume!",
  },
]
