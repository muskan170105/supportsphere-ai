from agents.planner import planner_agent
from agents.retriever import retriever_agent
from agents.response import response_agent
#from agents.evaluation import evaluation_agent
#from agents.correction import correction_agent

from utils.context_resolver import resolve_context

from core.logger import logger


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
        self.history = history_agent
        self.conversation_state = conversation_state

    def run(self, user_query: str):

        logger.info("=" * 80)
        logger.info(f"User Query : {user_query}")

        chat_history = self.history.get_history()

        # ---------------------------------------------------
        # Waiting for Missing Parameters
        # ---------------------------------------------------

        if self.conversation_state.is_waiting():

            planner_result = self.conversation_state.fill_next_parameter(
                user_query
            )

            if self.conversation_state.has_more_missing_parameters():

                answer = response_agent(
                    llm=self.llm,
                    user_query=user_query,
                    planner_result=planner_result,
                    retrieved_context=None,
                    tool_result=None,
                    chat_history=self.history.format_history(),
                )

                self.history.add_user_message(user_query)
                self.history.add_ai_message(answer)

                return answer

        else:

            resolved_query = resolve_context(
                user_query=user_query,
                chat_history=chat_history,
            )

            planner_result = planner_agent(
                planner_llm=self.llm,
                user_query=resolved_query,
                chat_history=chat_history,
            )

            logger.info(f"Intent : {planner_result.intent}")
            logger.info(f"Need RAG : {planner_result.need_rag}")
            logger.info(f"Tool : {planner_result.tool}")

            if planner_result.missing_parameters:

                self.conversation_state.save(planner_result)

                answer = response_agent(
                    llm=self.llm,
                    user_query=user_query,
                    planner_result=planner_result,
                    retrieved_context=None,
                    tool_result=None,
                    chat_history=self.history.format_history(),
                )

                self.history.add_user_message(user_query)
                self.history.add_ai_message(answer)

                return answer

        # ---------------------------------------------------
        # Request Complete
        # ---------------------------------------------------

        self.conversation_state.clear()

        # ---------------------------------------------------
        # Retriever
        # ---------------------------------------------------

        retrieved_context = None

        if planner_result.need_rag:

            logger.info("Running Retriever Agent")

            retrieved_context = retriever_agent(
                self.embedding_model,
                user_query,
            )

        # ---------------------------------------------------
        # Tool
        # ---------------------------------------------------

        tool_result = None

        if planner_result.tool is not None:

            logger.info(f"Executing Tool : {planner_result.tool}")

            tool_result = self.tool_agent.execute(
                planner_result
            )

        # ---------------------------------------------------
        # Response
        # ---------------------------------------------------

        answer = response_agent(
            llm=self.llm,
            user_query=user_query,
            planner_result=planner_result,
            retrieved_context=retrieved_context,
            tool_result=tool_result,
            chat_history=self.history.format_history(),
        )

        logger.info("Response generated.")

        # ---------------------------------------------------
        # Evaluation
        # ---------------------------------------------------
# TODO:
# Re-enable Evaluation and Correction pipeline
# after development/testing or when using a paid API plan.
  
        # evaluation = evaluation_agent(
        #     llm=self.llm,
        #     user_query=user_query,
        #     planner_result=planner_result,
        #     tool_result=tool_result,
        #     retrieved_context=retrieved_context,
        #     ai_response=answer,
        # )

        # logger.info(
        #     f"Evaluation Passed : {evaluation.passed}"
        # )

        # logger.info(
        #     f"Evaluation Confidence : {evaluation.confidence}"
        # )

        # logger.info(
        #     f"Evaluation Feedback : {evaluation.feedback}"
        # )

        # ---------------------------------------------------
        # Correction
        # ---------------------------------------------------

        # if not evaluation.passed:

        #     logger.warning(
        #         "Running Correction Agent..."
        #     )

        #     answer = correction_agent(
        #         llm=self.llm,
        #         user_query=user_query,
        #         planner_result=planner_result,
        #         tool_result=tool_result,
        #         retrieved_context=retrieved_context,
        #         previous_response=answer,
        #         evaluation_feedback=evaluation.feedback,
        #     )

        #     logger.info(
        #         "Correction completed."
        #     )

        # ---------------------------------------------------
        # Save Conversation
        # ---------------------------------------------------

        self.history.add_user_message(user_query)
        self.history.add_ai_message(answer)

        logger.info("=" * 80)

        return answer