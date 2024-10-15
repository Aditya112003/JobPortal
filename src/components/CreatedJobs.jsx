import { getMyJobs } from "@/api/jobsApi";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loadingCreatedJobs ? (
        <div className="flex justify-center items-center my-8">
          <BarLoader width={"100%"} height={4} color="#36d7b7" />
          <p className="text-gray-500 mt-4">Loading your jobs...</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdJobs?.length ? (
            createdJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={fnCreatedJobs}
                isMyJob
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              No jobs found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
