import {
  UserCircle2,
  Circle,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";

function ChatHeader({ conversation }) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-5 rounded-t-2xl">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="relative">

            <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center">

              <UserCircle2
                size={34}
                className="text-cyan-700"
              />

            </div>

            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>

          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              {conversation.name}
            </h2>

            <div className="flex items-center gap-2 mt-1">

              <Circle
                size={10}
                fill="currentColor"
                className="text-emerald-500"
              />

              <span className="text-sm text-emerald-600 font-medium">
                {conversation.status}
              </span>

            </div>

            <p className="text-xs text-slate-500 mt-1">
              Last active {conversation.time}
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              transition
              flex
              items-center
              justify-center
            "
          >

            <Phone
              size={18}
              className="text-slate-700"
            />

          </button>

          <button
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              transition
              flex
              items-center
              justify-center
            "
          >

            <Video
              size={18}
              className="text-slate-700"
            />

          </button>

          <button
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              transition
              flex
              items-center
              justify-center
            "
          >

            <MoreVertical
              size={18}
              className="text-slate-700"
            />

          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatHeader;