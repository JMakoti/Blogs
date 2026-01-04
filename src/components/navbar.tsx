import { FiEdit } from "react-icons/fi";
import logo from "../assets/img/logo.png";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useLocation } from "react-router";
import { Separator } from "./ui/separator";
import type React from "react";

type NavBarProps = {
  formRef: React.RefObject<HTMLFormElement | null>;
};

const NavBar: React.FC<NavBarProps> = ({ formRef }) => {
  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleUpdate = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b shadow-sm">
      <div className="flex flex-row items-center justify-between mx-auto p-2 max-w-7xl">
        <div>
          <Link to="/">
            <img src={logo} alt="Blue Bird" width={60} height={60} />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          {!pathname.includes("/write") && !pathname.includes("/edit") ? (
            <Link to="/write">
              <Button
                type="button"
                className="px-4 py-2 bg-black text-white rounded"
              >
                <FiEdit /> Write
              </Button>
            </Link>
          ) : pathname.includes("/write") ? (
            <div className="flex gap-3">
              <Button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                // Optional: You could add a separate function for save draft
                // onClick={handleSaveDraft}
              >
                Save Draft
              </Button>
              <Button
                type="button"
                onClick={handleClick}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Publish
              </Button>
            </div>
          ) : pathname.includes("/edit") ? (
            <Button
              type="button"
              onClick={handleUpdate}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Update
            </Button>
          ) : null}

          <Avatar>
            <AvatarImage
              src="https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg"
              alt="Blue Bird"
            />
            <AvatarFallback>BB</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default NavBar;
