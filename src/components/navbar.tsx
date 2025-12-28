import { FiEdit } from "react-icons/fi";
import logo from "../assets/img/logo.png";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useLocation } from "react-router";
import { Separator } from "./ui/separator";
export default function NavBar() {
  // Object Destructuring
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
          {!pathname.includes("/write") ? (
            <Link to="/write">
              <Button className="text-white py-2 px-4">
                <FiEdit /> Write
              </Button>
            </Link>
          ) : (
              <Button className="text-white py-2 px-4 bg-blue-600 hover:bg-blue-700">
                Publish
              </Button>
          )}

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
}
