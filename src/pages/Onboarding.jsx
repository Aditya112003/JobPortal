import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(true);

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7y" />;
  }

  return (
    <div className="flex flex-col items-center justify-start mt-20 relative">
      {/* Flash message */}
      {showWarning && (
        <div className="w-full p-4 bg-red-200 border border-red-600 text-red-800 font-bold rounded-md shadow-lg flex justify-between items-center mb-4">
          <span>Your role cannot be changed after selecting!</span>
          <button
            className="text-red-800 font-bold ml-4"
            onClick={() => setShowWarning(false)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="mt-16 text-center">
        <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter mb-12">
          I am a ...
        </h2>

        <div className="grid grid-cols-2 gap-4 w-full md:px-40">
          <Button
            variant="blue"
            className="h-16 md:h-20 w-full md:w-64 text-2xl rounded-md border-2 border-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleRoleSelection("candidate")}
          >
            Candidate
          </Button>

          <Button
            variant="destructive"
            className="h-16 md:h-20 w-full md:w-64 text-2xl rounded-md border-2 border-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleRoleSelection("recruiter")}
          >
            Recruiter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
