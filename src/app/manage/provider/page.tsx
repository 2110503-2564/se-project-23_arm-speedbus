import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export default async function manageProvidersPage() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <div className="bg-slate-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-800 text-center">
            Manage Providers
          </h2>
          <div className="space-y-4">
            <Link href="/manage/provider/add" className="block">
              <div className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-md text-center transition-colors duration-300">
                Add a Provider
              </div>
            </Link>
            <Link href="/manage/provider/update" className="block">
              <div className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md text-center transition-colors duration-300">
                Update a Provider
              </div>
            </Link>
            <Link href="/manage/provider/delete" className="block">
              <div className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md text-center transition-colors duration-300">
                Delete a Provider
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
          You are not an administrator. Access denied.
        </div>
      )}
    </>
  );
}
