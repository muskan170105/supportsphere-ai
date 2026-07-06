class ExecutionLogger:

    def __init__(self):
        self.steps = []

    def log(self, agent, description):
        self.steps.append({
            "agent": agent,
            "status": "Completed",
            "description": description,
        })

    def clear(self):
        self.steps.clear()

    def get_steps(self):
        return self.steps.copy()


execution_logger = ExecutionLogger()