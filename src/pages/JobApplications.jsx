import { getSingleJob, updateHiringStatus } from "@/api/jobsApi";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { MapPinIcon, Briefcase, DoorOpen, DoorClosed } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import ApplicationCard from "@/components/ApplicationCard";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const JobApplications = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fetchJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) {
      fetchJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fetchJob());
  };

  if (!isLoaded || loadingJob || loadingHiringStatus) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5 px-4 md:px-8">
      {/* Job Details */}
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-5xl md:text-6xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-12 md:h-16"
          alt={`${job?.company?.name}'s logo.`}
        />
      </div>

      {/* Job Info */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex gap-2 items-center">
          <MapPinIcon size={20} /> <span>{job?.location}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Briefcase size={20} />{" "}
          <span>{job?.applications?.length} Applicants</span>
        </div>
        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen size={20} /> <span>Open</span>
            </>
          ) : (
            <>
              <DoorClosed size={20} /> <span>Closed</span>
            </>
          )}
        </div>
      </div>

      {/* Hiring Status */}
      {job?.recruiter_id === user?.id && (
        <Select
          onValueChange={handleStatusChange}
          className="w-full mt-4 sm:mt-0"
        >
          <SelectTrigger
            className={`w-full ${
              job?.isOpen ? "bg-green-950" : "bg-red-950"
            } text-white`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* Job Description */}
      <h2 className="text-2xl sm:text-3xl font-bold mt-6">About the Job</h2>
      <p className="sm:text-lg">{job?.description}</p>

      {/* Job Requirements */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-6">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* Job Applications Section */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-6">
        Job Applications
      </h2>

      {/* Application Cards */}
      <div className="flex flex-col gap-4">
        {job?.applications.length > 0 ? (
          job?.applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            />
          ))
        ) : (
          <p>No applications for this job yet.</p>
        )}
      </div>
    </div>
  );
};

export default JobApplications;
