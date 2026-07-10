from copy import deepcopy


class ExecutionLogger:

    """
    Stores the execution trace of the latest request.

    Used by the AI Inspector.
    """

    def __init__(self):

        self.clear()

    # =====================================================

    def clear(self):

        self.steps = []

        self.planner = None

        self.retriever = None

        self.tool = None

        self.response = None

        self.guardrail = None

        self.memory_before = None

        self.memory_after = None

        self.timeline = []

    # =====================================================

    def log(
        self,
        agent,
        description,
        status="Completed",
    ):

        step = {
            "agent": agent,
            "status": status,
            "description": description,
        }

        self.steps.append(step)

        self.timeline.append(step)

    # =====================================================
    # Planner
    # =====================================================

    def set_planner(
        self,
        planner,
    ):

        self.planner = deepcopy(planner)

    # =====================================================
    # Retriever
    # =====================================================

    def set_retriever(
        self,
        retriever,
    ):

        self.retriever = deepcopy(retriever)

    # =====================================================
    # Tool
    # =====================================================

    def set_tool(
        self,
        tool,
    ):

        self.tool = deepcopy(tool)

    # =====================================================
    # Response
    # =====================================================

    def set_response(
        self,
        response,
    ):

        self.response = deepcopy(response)

    # =====================================================
    # Guardrail
    # =====================================================

    def set_guardrail(
        self,
        guardrail,
    ):

        self.guardrail = deepcopy(guardrail)

    # =====================================================
    # Memory
    # =====================================================

    def set_memory_before(
        self,
        memory,
    ):

        self.memory_before = deepcopy(memory)

    def set_memory_after(
        self,
        memory,
    ):

        self.memory_after = deepcopy(memory)

    # =====================================================

    def get_execution_steps(self):

        return deepcopy(self.steps)

    # =====================================================

    def export(self):

        return {

            "planner": self.planner,

            "retriever": self.retriever,

            "tool": self.tool,

            "response": self.response,

            "guardrail": self.guardrail,

            "memory_before": self.memory_before,

            "memory_after": self.memory_after,

            "timeline": deepcopy(self.timeline),

        }


execution_logger = ExecutionLogger()