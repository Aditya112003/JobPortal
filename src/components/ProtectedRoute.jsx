/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners"; 

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

 
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader width={"100%"} height={4} color="#36d7b7" />
      </div>
    );
  }

  // Redirect to sign-in page if user is not signed in
  if (!isSignedIn) {
    return <Navigate to={"/?sign-in=true"} />;
  }

  // Redirect to onboarding if role is missing and not already on onboarding
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to={"/onboarding"} />;
  }

  return children;
};

export default ProtectedRoute;
