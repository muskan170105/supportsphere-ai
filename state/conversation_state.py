from schemas.planner_schema import PlannerOutput
from utils.parameter_extractor import extract_parameter


class ConversationState:
    """
    Stores a pending PlannerOutput while waiting
    for missing information from the user.
    """

    def __init__(self):
        self.pending_request: PlannerOutput | None = None

    def is_waiting(self) -> bool:
        return self.pending_request is not None

    def save(self, planner_result: PlannerOutput):
        self.pending_request = planner_result

    def get(self) -> PlannerOutput | None:
        return self.pending_request

    def fill_next_parameter(self, value: str) -> PlannerOutput:
        """
        Fill the next missing parameter.
        """

        if self.pending_request is None:
            raise ValueError("No pending request.")

        planner_result = self.pending_request

        parameter_name = planner_result.missing_parameters.pop(0)

        extracted_value = extract_parameter(
            parameter_name=parameter_name,
            text=value,
        )

        planner_result.parameters[parameter_name] = extracted_value

        return planner_result

    def has_more_missing_parameters(self) -> bool:

        if self.pending_request is None:
            return False

        return len(self.pending_request.missing_parameters) > 0

    def clear(self):
        self.pending_request = None