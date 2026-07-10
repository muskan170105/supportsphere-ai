import {
  Bot,
  User,
  CheckCheck,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  FileText,
} from "lucide-react";

import { useState } from "react";

function MessageBubble({

  sender,

  message,

  confidence,

  confidenceLevel,

  confidenceReason,

  sources = [],

}) {

  const isAI = sender === "AI";

  const [copied, setCopied] =
    useState(false);

  const [feedback, setFeedback] =
    useState(null);

  const currentTime =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  async function copyMessage() {

    await navigator.clipboard.writeText(
      message
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }

  return (

    <div
      className={`flex ${
        isAI
          ? "justify-start"
          : "justify-end"
      } mb-6 group`}
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

          <div className="flex justify-between items-center gap-6 mb-3">

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

          {/* Message */}

          <p className="leading-7 whitespace-pre-wrap">

            {message}

          </p>

          {/* Confidence */}

          {

            isAI && confidenceLevel && (

              <div className="mt-5 flex flex-wrap items-center gap-3">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      confidenceLevel === "High"

                        ? "bg-emerald-100 text-emerald-700"

                        : confidenceLevel === "Medium"

                        ? "bg-amber-100 text-amber-700"

                        : "bg-red-100 text-red-700"
                    }
                  `}
                >

                  {confidenceLevel} Confidence

                </span>

                {

                  confidence !== undefined && (

                    <span className="text-sm text-slate-500">

                      {confidence.toFixed(1)}%

                    </span>

                  )

                }

              </div>

            )

          }

          {/* Confidence Reason */}

          {

            isAI &&
            confidenceReason && (

              <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">

                <p className="text-xs text-slate-600">

                  {confidenceReason}

                </p>

              </div>

            )

          }

          {/* Sources */}

          {

            isAI &&
            sources.length > 0 && (

              <div className="mt-5">

                <p className="text-xs font-semibold text-slate-500 mb-3">

                  Sources

                </p>

                <div className="flex flex-wrap gap-2">

                  {

                    sources.map(

                      (source) => (

                        <div

                          key={source}

                          className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            rounded-full
                            bg-cyan-50
                            border
                            border-cyan-200
                            text-cyan-700
                            text-sm
                            font-medium
                          "

                        >

                          <FileText size={14} />

                          {source}

                        </div>

                      )

                    )

                  }

                </div>

              </div>

            )

          }

          {/* Footer */}

          <div className="flex items-center justify-between mt-5">

            {

              !isAI ? (

                <CheckCheck
                  size={16}
                  className="text-cyan-100"
                />

              ) : (

                <div className="flex items-center gap-2">

                  <button

                    onClick={() =>
                      setFeedback("up")
                    }

                    className={`
                      p-1.5
                      rounded-lg
                      transition

                      ${
                        feedback === "up"

                          ? "bg-emerald-100 text-emerald-700"

                          : "hover:bg-slate-100"

                      }
                    `}

                  >

                    <ThumbsUp size={15} />

                  </button>

                  <button

                    onClick={() =>
                      setFeedback("down")
                    }

                    className={`
                      p-1.5
                      rounded-lg
                      transition

                      ${
                        feedback === "down"

                          ? "bg-red-100 text-red-700"

                          : "hover:bg-slate-100"

                      }
                    `}

                  >

                    <ThumbsDown size={15} />

                  </button>

                </div>

              )

            }

            {

              isAI && (

                <button

                  onClick={copyMessage}

                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-slate-500
                    hover:text-cyan-700
                    transition
                  "

                >

                  {

                    copied

                      ? (

                          <>

                            <Check size={15} />

                            Copied

                          </>

                        )

                      : (

                          <>

                            <Copy size={15} />

                            Copy

                          </>

                        )

                  }

                </button>

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default MessageBubble;