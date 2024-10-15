import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useUser } from "@clerk/clerk-react";

const Landing = () => {
  const { isSignedIn, user } = useUser(); // Get user sign-in status and user info
  const navigate = useNavigate();

  const handleFindJobs = () => {
    if (!isSignedIn) {
      navigate("/onboarding"); // Redirect to login if not signed in
    } else {
      navigate("/jobs"); // Navigate to jobs if signed in
    }
  };

  const handlePostJob = () => {
    if (!isSignedIn) {
      navigate("/onboarding"); // Redirect to login if not signed in
    } else {
      navigate("/post-job"); // Navigate to post job if signed in
    }
  };

  // Check user role
  const isRecruiter = user?.unsafeMetadata?.role === "recruiter";
  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 px-4">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title font-bold text-3xl sm:text-5xl lg:text-7xl tracking-tight py-4">
          Unlock Your Career Potential
          <span className="flex items-center gap-2 sm:gap-6">
            with Our Platform
          </span>
        </h1>
        <p className="text-gray-600 sm:mt-4 text-sm sm:text-lg font-semibold">
          Dive into a world of opportunities or find the talent your company
          needs.
        </p>
      </section>

      <div className="flex gap-4 justify-center">
        <Button
          variant="blue"
          size="lg"
          onClick={handleFindJobs}
          className="px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold"
          disabled={isRecruiter} // Disable if user is a recruiter
        >
          Explore Jobs
        </Button>

        <Button
          variant="destructive"
          size="lg"
          onClick={handlePostJob}
          className="px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold"
          disabled={isCandidate} // Disable if user is a candidate
        >
          Advertise a Job
        </Button>
      </div>

      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="-z-10 w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-xl">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base">
            Search for jobs, apply with ease, and manage your applications
            effortlessly.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-xl">For Employers</CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base">
            Post job openings, review applications, and find your next star
            employee.
          </CardContent>
        </Card>
      </section>

      <section className=" -z-10 text-center py-10 bg-gradient-to-b ">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Why SimplyHire?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="font-bold text-xl text-white mb-2">
              Effortless Job Search
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Explore a vast selection of jobs that align with your skills and
              passion, tailored just for you.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="font-bold text-xl text-white mb-2">
              Seamless Job Posting
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Employers can post jobs swiftly, reaching top talent in no time
              with our user-friendly platform.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="font-bold text-xl text-white mb-2">
              Exclusive Features
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Access tools to track applications, save jobs, and manage your
              recruitment journey with ease.
            </p>
          </div>
        </div>
      </section>

      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="font-medium text-lg sm:text-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default Landing;
