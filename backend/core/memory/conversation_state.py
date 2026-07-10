from core.memory.memory_manager import MemoryManager


class ConversationState:
    """
    Wrapper around the MemoryManager.

    Stages should never manipulate WorkingMemory
    directly. They interact only through this class.
    """

    def __init__(self):

        self.manager = MemoryManager()

    # =====================================================
    # Active Task
    # =====================================================

    def has_active_task(self):

        return self.manager.memory.has_active_task()

    # =====================================================
    # Waiting
    # =====================================================

    def is_waiting(self):

        return (

            len(

                self.manager.memory.missing_parameters

            )

            > 0

        )

    # =====================================================
    # Planner
    # =====================================================

    def update_from_planner(
        self,
        planner_result,
    ):

        self.manager.start_task(
            planner_result
        )

    # =====================================================
    # Parameter
    # =====================================================

    def update_parameter(
        self,
        key,
        value,
    ):

        self.manager.update_parameter(
            key,
            value,
        )

    # =====================================================
    # Tool
    # =====================================================

    def remember_tool_result(
        self,
        result,
    ):

        self.manager.remember_tool_result(
            result
        )

    # =====================================================
    # Retrieval
    # =====================================================

    def remember_sources(
        self,
        sources,
    ):

        self.manager.remember_sources(
            sources
        )

    # =====================================================
    # Response
    # =====================================================

    def remember_answer(
        self,
        answer,
    ):

        self.manager.remember_answer(
            answer
        )

    # =====================================================
    # Summary
    # =====================================================

    def update_summary(
        self,
        summary,
    ):

        self.manager.update_summary(
            summary
        )

    # =====================================================
    # Memory
    # =====================================================

    @property
    def memory(self):

        return self.manager.memory

    # =====================================================
    # Finish
    # =====================================================

    def clear(self):

        self.manager.finish_task()