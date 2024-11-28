'use client'

import { useSession, signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

const UserProfile = () => { 
    const {data:session} = useSession();

    return (
       <Profile session={session}/>
    );
};

export default UserProfile;

function Profile ({session}) {
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full overflow-hidden w-16 h-16">
            <img
                src={session?.user.image}
                alt={session?.user.name}
                className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{session?.user.name}</h2>
            <p className="text-gray-400">{session?.user.email}</p>
          </div>
          <button
            onClick={()=> alert("You are Signed out buddy")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <LogOutIcon size={18} />
            Logout
          </button>
        </div>
      </div>
    ) 
};