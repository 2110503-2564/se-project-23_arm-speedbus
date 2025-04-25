import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRatings from "@/libs/getAllRatings";
import { Rating } from "interfaces";
import ManageReviewCard from "@/components/ManageReviewCard";

export default async function DeletRatingPage() {
  const session = await getServerSession(authOptions);

  // Fetch ratings if the user is authenticated
  const ratingsResponse = session?.user.token
    ? await getRatings(session.user.token)
    : { success: false, data: [] };

  // Extract ratings from the response
  const ratings: Rating[] = ratingsResponse.success ? ratingsResponse.data : [];

  return (
    <main className="p-6 min-h-screen font-robotoMono mt-10 bg-gray-100">
      {session?.user.User_info.role === "admin" ? (
        <div className="max-w-4xl mx-auto center w-full font-robotoMono">
          <h1 className="text-4xl font-semibold text-gray-800 font-robotoMono text-center mb-6 mt-3">
            All Review History
          </h1>
          <div className="mb-8 text-center">
            <h2 className="text-lg text-black font-robotoMono mt-3">
              Manage and modify reviews for all rental bookings.
            </h2>
          </div>
          <Suspense
            fallback={
              <p>
                Loading ... <LinearProgress />
              </p>
            }
          >
            {ratings.map((rating: Rating, idx) => (
              <div key={idx}>
                <ManageReviewCard
                  ratingId={rating._id}
                  userName={rating.user_info.name}
                  carName={rating.car_info.name}
                  carRating={rating.car_rating}
                  providerRating={rating.provider_rating}
                  review={rating.review}
                  posted={new Date(rating.updatedAt)}
                />
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
