import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, Save, ClipboardCheck, Search } from "lucide-react"; 

const Header = () => {
  const { user } = useUser(); 
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  // Check user roles from unsafeMetadata
  const isCandidate = user?.unsafeMetadata?.role === "candidate";
  const isRecruiter = user?.unsafeMetadata?.role === "recruiter";


  const menuItems = [];

  if (isRecruiter) {
    menuItems.push(
      <UserButton.Link
        key="post-jobs"
        label="Post Jobs"
        labelIcon={<BriefcaseBusiness size={15} />} 
        href="/post-job"
      />,
      <UserButton.Link
        key="created-jobs"
        label="Created Jobs"
        labelIcon={<ClipboardCheck size={15} />} 
        href="/my-jobs"
      />
    );
  }

  if (isCandidate) {
    menuItems.push(
      <UserButton.Link
        key="explore-jobs"
        label="Explore Jobs"
        labelIcon={<Search size={15} />} 
        href="/jobs"
      />,
      <UserButton.Link
        key="saved-jobs"
        label="Saved Jobs"
        labelIcon={<Save size={15} />} 
        href="/saved-jobs"
      />
    );
  }

  menuItems.push(
    <UserButton.Action
      key="manage-account"
      label="Manage Account"
      onClick={() => {}}
    />
  );

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="logo-font text-3xl md:text-5xl font-bold text-white font-[Dancing Script]">
            SimplyHire
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
              className="text-white bg-gradient-to-r from-blue-900 to-blue-700
                          px-4 py-2 text-sm md:text-base font-semibold
                          hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-600
                          hover:shadow-lg border-none transition-all duration-300 ease-in-out
                          rounded-md"
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 md:w-12 md:h-12",
                },
              }}
            >
              <UserButton.MenuItems>
                {menuItems} 
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
