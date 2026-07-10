class TopicDetector:
    """
    Determines whether the current query
    belongs to the previous conversation topic.

    Used to decide whether Retrieval Cache
    can be reused.
    """

    def is_same_topic(
        self,
        current_intent,
        cached_intent,
    ):

        if current_intent is None:
            return False

        return current_intent == cached_intent