import Link from "next/link";

export default function ManageChoice() {
  return (
    <div className="flex flex-col items-center  min-h-screen  text-5xl mt-10 font-[BlinkMacSystemFont]">
      Welcome Admin
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-10 ">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
          Manage Resources
        </h2>
        <div className="space-y-4">
          <Link href="/manage/provider" className="block w-full">
            <div className="bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300 border border-indigo-200 rounded-md p-4 text-xl text-indigo-700 text-center font-medium">
              Manage Providers
            </div>
          </Link>
          <Link href="/manage/car" className="block w-full">
            <div className="bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300 border border-indigo-200 rounded-md p-4 text-xl text-indigo-700 text-center font-medium">
              Manage Cars
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
