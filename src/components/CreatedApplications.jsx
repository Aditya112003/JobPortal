import { getApplications } from "@/api/applicationsApi";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications) {
    return (
      <div className="flex justify-center items-center my-8">
        <BarLoader width={"100%"} height={4} color="#36d7b7" />
        <p className="text-gray-500 mt-4">Fetching applications...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {applications?.length ? (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        ))
      ) : (
        // Empty state message if no applications are found
        <p className="text-center text-gray-500 mt-4">No applications found.</p>
      )}
    </div>
  );
};

export default CreatedApplications;
