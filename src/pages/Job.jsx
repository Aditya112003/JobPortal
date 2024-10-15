import { getSingleJob } from "@/api/jobsApi";
import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { BarLoader } from "react-spinners";
import { DoorClosed, DoorOpen, Briefcase } from "lucide-react";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate(); 

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) {
      const role = user?.unsafeMetadata?.role;

      // If the user is a recruiter, redirect to the "/my-jobs" page
      if (role === "recruiter") {
        navigate("/my-jobs");
      } else {
        fnJob();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  // Find the user's application if it exists
  const userApplication = job?.applications?.find(
    (app) => app.candidate_id === user.id
  );

  // Define styles based on the status
  const statusStyles = {
    applied: {
      backgroundColor: "bg-blue-100",
      borderColor: "border-blue-500",
      textColor: "text-blue-600",
      messageColor: "text-blue-800", // Darker message color
      message: "Your application has been submitted.",
    },
    interviewing: {
      backgroundColor: "bg-yellow-100",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-600",
      messageColor: "text-yellow-800", // Darker message color
      message: "You are in the interview stage. Good luck!",
    },
    hired: {
      backgroundColor: "bg-green-100",
      borderColor: "border-green-500",
      textColor: "text-green-600",
      messageColor: "text-green-800", // Darker message color
      message: "Congratulations! Your application was accepted.",
    },
    rejected: {
      backgroundColor: "bg-red-100",
      borderColor: "border-red-500",
      textColor: "text-red-600",
      messageColor: "text-red-800", // Darker message color
      message: "Unfortunately, your application was rejected.",
    },
  };

  const currentStatus = userApplication?.status?.toLowerCase() || "applied"; // Fallback to 'applied'
  const statusStyle = statusStyles[currentStatus] || statusStyles.applied; // Default to 'applied' style

  return (
    <div className="flex flex-col gap-6 md:gap-8 mt-5 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse gap-4 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-2 text-3xl sm:text-4xl md:text-6xl">
          {job?.title}
        </h1>

        <img
          src={job?.company?.logo_url}
          className="h-10 sm:h-12"
          alt={`${job?.company?.name}'s logo.`}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex gap-2 mb-2 sm:mb-0">
          <MapPinIcon size={18} /> <span>{job?.location}</span>
        </div>

        <div className="flex gap-2 mb-2 sm:mb-0">
          <Briefcase size={18} />{" "}
          <span>{job?.applications?.length} Applicants</span>
        </div>

        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen size={18} /> <span>Open</span>
            </>
          ) : (
            <>
              <DoorClosed size={18} /> <span>Closed</span>
            </>
          )}
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
        About the Job
      </h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* Show the user's application status if they applied */}
      {userApplication && (
        <div
          className={`border ${statusStyle.borderColor} p-4 rounded-md ${statusStyle.backgroundColor}`}
        >
          <h3
            className={`text-lg sm:text-xl font-bold ${statusStyle.textColor}`}
          >
            Your Application Status:{" "}
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </h3>
          <p className={`text-md sm:text-lg ${statusStyle.messageColor}`}>
            {statusStyle.message}
          </p>
        </div>
      )}

      <ApplyJobDrawer
        job={job}
        user={user}
        fetchJob={fnJob}
        applied={userApplication}
      />
    </div>
  );
};

export default Job;
