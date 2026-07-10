from dataclasses import dataclass, field


@dataclass
class RetrievalCache:
    """
    Stores the latest retrieved knowledge.

    Enables follow-up questions without
    querying the vector database again.
    """

    query: str = ""

    context: str = ""

    sources: list[str] = field(
        default_factory=list
    )

    intent: str | None = None

    def has_cache(self):

        return bool(self.context)

    def remember(

        self,

        query,

        intent,

        context,

        sources,

    ):

        self.query = query

        self.intent = intent

        self.context = context

        self.sources = list(sources)

    def clear(self):

        self.query = ""

        self.intent = None

        self.context = ""

        self.sources.clear()