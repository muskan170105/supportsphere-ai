from agents.planner import planner_agent
from agents.retriever import retriever_agent
from agents.response import response_agent

from utils.context_resolver import resolve_context


class ConversationOrchestrator:
    """
    Coordinates the complete SupportSphere AI pipeline.
    """

    def __init__(
        self,
        llm,
        embedding_model,
        tool_agent,
        history_agent,
        conversation_state,
    ):
        self.llm = llm
        self.embedding_model = embedding_model
        self.tool_agent = tool_agent
        self.history_agent = history_agent
        self.conversation_state = conversation_state

    def run(self, user_query: str):

        # ---------------------------------
        # Previous Conversation
        # ---------------------------------
        chat_history = self.history_agent.get_history()

        # ---------------------------------
        # Waiting for Missing Parameters?
        # ---------------------------------
        if self.conversation_state.is_waiting():

            planner_result = self.conversation_state.fill_next_parameter(
                user_query
            )

            # Still waiting for more parameters
            if self.conversation_state.has_more_missing_parameters():

                answer = response_agent(
                    llm=self.llm,
                    user_query=user_query,
                    planner_result=planner_result,
                    retrieved_context=None,
                    tool_result=None,
                    chat_history=self.history_agent.format_history(),
                )

                self.history_agent.add_user_message(user_query)
                self.history_agent.add_ai_message(answer)

                return answer

        else:

            # ---------------------------------
            # Resolve Context
            # ---------------------------------
            resolved_query = resolve_context(
                user_query=user_query,
                chat_history=chat_history,
            )

            # ---------------------------------
            # Planner
            # ---------------------------------
            planner_result = planner_agent(
                planner_llm=self.llm,
                user_query=resolved_query,
                chat_history=chat_history,
            )

            # ---------------------------------
            # Missing Parameters
            # ---------------------------------
            if planner_result.missing_parameters:

                self.conversation_state.save(planner_result)

                answer = response_agent(
                    llm=self.llm,
                    user_query=user_query,
                    planner_result=planner_result,
                    retrieved_context=None,
                    tool_result=None,
                    chat_history=self.history_agent.format_history(),
                )

                self.history_agent.add_user_message(user_query)
                self.history_agent.add_ai_message(answer)

                return answer

        # ---------------------------------
        # Request Complete
        # ---------------------------------
        self.conversation_state.clear()

        # ---------------------------------
        # Retriever
        # ---------------------------------
        retrieved_context = None

        if planner_result.need_rag:

            retrieved_context = retriever_agent(
                self.embedding_model,
                user_query,
            )

        # ---------------------------------
        # Tool
        # ---------------------------------
        tool_result = None

        if planner_result.tool is not None:

            tool_result = self.tool_agent.execute(
                planner_result
            )

        # ---------------------------------
        # Response
        # ---------------------------------
        answer = response_agent(
            llm=self.llm,
            user_query=user_query,
            planner_result=planner_result,
            retrieved_context=retrieved_context,
            tool_result=tool_result,
            chat_history=self.history_agent.format_history(),
        )

        # ---------------------------------
        # Save Conversation
        # ---------------------------------
        self.history_agent.add_user_message(user_query)
        self.history_agent.add_ai_message(answer)

        return answer