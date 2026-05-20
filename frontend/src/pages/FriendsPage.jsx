import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { MapPinIcon, MessageSquareIcon, UsersIcon } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h1>
            <p className="opacity-70 mt-1">
              {friends.length} {friends.length === 1 ? "friend" : "friends"} connected
            </p>
          </div>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="bg-base-200 rounded-full p-6">
              <UsersIcon className="size-12 opacity-40" />
            </div>
            <h3 className="text-xl font-semibold">No friends yet</h3>
            <p className="opacity-60 max-w-sm">
              Go to the Home page to discover language learners and send friend requests!
            </p>
            <Link to="/" className="btn btn-primary">
              Find Language Partners
            </Link>
          </div>
        ) : (
          /* Friends Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-5 space-y-4">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={friend.profilePic || `https://avatar.iran.liara.run/public/1.png`}
                          alt={friend.fullName}
                          onError={(e) => {
                            e.target.src = `https://avatar.iran.liara.run/public/1.png`;
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base leading-tight">{friend.fullName}</h3>
                      {friend.location && (
                        <div className="flex items-center text-xs opacity-60 mt-0.5">
                          <MapPinIcon className="size-3 mr-1" />
                          {friend.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Language Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-secondary text-xs">
                      {getLanguageFlag(friend.nativeLanguage)}
                      Native: {capitialize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline text-xs">
                      {getLanguageFlag(friend.learningLanguage)}
                      Learning: {capitialize(friend.learningLanguage)}
                    </span>
                  </div>

                  {/* Message Button */}
                  <Link
                    to={`/chat/${friend._id}`}
                    className="btn btn-primary btn-sm w-full gap-2"
                  >
                    <MessageSquareIcon className="size-4" />
                    Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
