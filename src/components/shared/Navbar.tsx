import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-sky-600 shadow-md">
      {/* <div className="text-2xl font-bold text-gray-800">Liver</div> */}
      <div className="flex items-center gap-1">
        <img
          src="https://www.shutterstock.com/image-vector/human-liver-medical-vector-icon-260nw-2433895253.jpg"
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />

        <div className="hidden lg:block text-2xl font-bold text-white">
          Liver Disease Awareness
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="bg-blue-800 hover:bg-blue-900 rounded-full">
          Admin Login
        </Button>
        <Button variant="outline" className="rounded-full">
          Member Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
