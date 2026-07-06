import {
  Bot,
  User,
  CheckCheck,
} from "lucide-react";

function MessageBubble({
  sender,
  message,
}) {

  const isAI = sender === "AI";

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (

    <div
      className={`flex ${
        isAI
          ? "justify-start"
          : "justify-end"
      } mb-6`}
    >

      <div
        className={`flex items-end gap-3 max-w-[78%] ${
          isAI
            ? ""
            : "flex-row-reverse"
        }`}
      >

        {/* Avatar */}

        <div
          className={`
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
            shrink-0

            ${
              isAI
                ? "bg-cyan-100"
                : "bg-slate-200"
            }
          `}
        >

          {

            isAI
              ? (
                  <Bot
                    size={20}
                    className="text-cyan-700"
                  />
                )
              : (
                  <User
                    size={18}
                    className="text-slate-700"
                  />
                )

          }

        </div>

        {/* Bubble */}

        <div
          className={`
            rounded-2xl
            px-5
            py-4
            shadow-sm

            ${
              isAI
                ? "bg-white border border-slate-200 text-slate-800"
                : "bg-cyan-600 text-white"
            }
          `}
        >

          {/* Header */}

          <div className="flex items-center justify-between gap-6 mb-3">

            <div className="flex items-center gap-2">

              <span
                className={`font-semibold text-sm ${
                  isAI
                    ? "text-cyan-700"
                    : "text-cyan-100"
                }`}
              >

                {
                  isAI
                    ? "SupportSphere AI"
                    : "Customer"
                }

              </span>

              {

                isAI && (

                  <span className="
                    text-[10px]
                    px-2
                    py-0.5
                    rounded-full
                    bg-cyan-100
                    text-cyan-700
                    font-medium
                  ">

                    AI

                  </span>

                )

              }

            </div>

            <span
              className={`text-xs ${
                isAI
                  ? "text-slate-400"
                  : "text-cyan-100"
              }`}
            >

              {currentTime}

            </span>

          </div>

          {/* Content */}

          <p className="leading-7 whitespace-pre-wrap">

            {message}

          </p>

          {/* Footer */}

          {

            !isAI && (

              <div className="flex justify-end mt-4">

                <CheckCheck
                  size={16}
                  className="text-cyan-100"
                />

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default MessageBubble;