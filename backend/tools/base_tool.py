from abc import ABC, abstractmethod


class BaseTool(ABC):
    """
    Base class for all business tools.
    """

    @abstractmethod
    def execute(self, **kwargs):
        """
        Execute the business operation.
        """
        pass