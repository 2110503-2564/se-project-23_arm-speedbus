import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRatings from "@/libs/getAllRatings";
import CommentCard from "@/components/CommentCard";
import { Rating } from "interfaces";

export default async function DeletRatingPage() {
  const session = await getServerSession(authOptions);

  // Fetch ratings if the user is authenticated
  const ratingsResponse = session?.user.token
    ? await getRatings(session.user.token)
    : { success: false, data: [] };

  // Extract ratings from the response
  const ratings: Rating[] = ratingsResponse.success ? ratingsResponse.data : [];

  // Group the ratings into chunks of 3
  const groupedRatings = [];
  for (let i = 0; i < ratings.length; i += 3) {
    groupedRatings.push(ratings.slice(i, i + 3));
  }

  return (
    <main className="text-center p-5">
      {session?.user.User_info.role === "admin" ? (
        <div>
          <h1 className="text-xl font-medium font-robotoMono mt-6 mb-10">
            Select the Rating You Want to Delete
          </h1>
          <Suspense
            fallback={
              <p>
                Loading ... <LinearProgress />
              </p>
            }
          >
            {/* Render each group of 3 ratings as a row */}
            {groupedRatings.map((group, index) => (
              <div key={index} className="flex justify-center gap-4 mb-4">
                {group.map((rating: Rating, idx) => (
                  <CommentCard
                    key={idx}
                    name={rating.user_info.name}
                    rating={rating.car_rating}
                    review={rating.review}
                    created={new Date(rating.createdAt)}
                  />
                ))}
              </div>
            ))}
          </Suspense>
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">
          You are not an administrator. Access denied.
        </div>
      )}
    </main>
  );
}
