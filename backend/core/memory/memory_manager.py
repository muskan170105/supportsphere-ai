from core.memory.working_memory import WorkingMemory


class MemoryManager:

    def __init__(self):

        self.memory = WorkingMemory()

    # =====================================================
    # Conversation
    # =====================================================

    def start_turn(
        self,
        user_message: str,
    ):

        self.memory.start_new_turn(
            user_message
        )

    # =====================================================
    # Planner
    # =====================================================

    def start_task(
        self,
        planner_result,
    ):

        # ------------------------------------------
        # Same Intent
        # ------------------------------------------

        if (
            self.memory.current_intent
            == planner_result.intent.value
        ):

            self.memory.reopen_task()

            for key, value in planner_result.parameters.items():

                self.memory.remember_entity(
                    key,
                    value,
                )

            for parameter in planner_result.missing_parameters:

                if parameter not in self.memory.missing_parameters:

                    self.memory.missing_parameters.append(
                        parameter
                    )

            return

        # ------------------------------------------
        # New Intent
        # ------------------------------------------

        self.memory.reset()

        self.memory.current_intent = (
            planner_result.intent.value
        )

        self.memory.current_tool = (

            planner_result.tool.value

            if planner_result.tool

            else None

        )

        for key, value in planner_result.parameters.items():

            self.memory.remember_entity(
                key,
                value,
            )

        self.memory.missing_parameters = list(
            planner_result.missing_parameters
        )

        self.memory.reopen_task()

    # =====================================================
    # Parameters
    # =====================================================

    def update_parameter(
        self,
        key,
        value,
    ):

        self.memory.remember_entity(
            key,
            value,
        )

        if key in self.memory.missing_parameters:

            self.memory.missing_parameters.remove(
                key
            )

    # =====================================================
    # Entity Helpers
    # =====================================================

    def get_entity(
        self,
        key,
    ):

        return self.memory.get_entity(
            key
        )

    def has_entity(
        self,
        key,
    ):

        return self.memory.has_entity(
            key
        )

    # =====================================================
    # Tool
    # =====================================================

    def remember_tool_result(
        self,
        result,
    ):

        self.memory.last_tool_result = result

    # =====================================================
    # Retrieval
    # =====================================================

    def remember_sources(
        self,
        sources,
    ):

        self.memory.last_retrieved_sources = (
            sources.copy()
        )

    # =====================================================
    # Response
    # =====================================================

    def remember_answer(
        self,
        answer,
    ):

        self.memory.last_answer = answer

    # =====================================================
    # Task
    # =====================================================

    def complete_task(self):

        self.memory.complete_task()

    # =====================================================
    # Summary
    # =====================================================

    def update_summary(
        self,
        summary,
    ):

        self.memory.conversation_summary = (
            summary
        )

    # =====================================================
    # Reset
    # =====================================================

    def finish_task(self):

        self.memory.reset()