import CreatedJobs from "@/components/CreatedJobs"; // For displaying recruiter's jobs
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  // Only render this page for recruiters
  if (user?.unsafeMetadata?.role !== "recruiter") {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        My Jobs
      </h1>
      <CreatedJobs />
    </div>
  );
};

export default MyJobs;
