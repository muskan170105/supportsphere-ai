from langchain_chroma import Chroma


# ==========================================================
# Retrieval Configuration
# ==========================================================

SIMILARITY_THRESHOLD = 0.45


def retriever_agent(
    embedding_model,
    user_query: str,
    k: int = 5,
):
    """
    Retriever Agent

    Responsibilities
    ----------------
    - Query vector database.
    - Retrieve relevant documents.
    - Filter irrelevant documents using similarity score.
    - Remove duplicate sources.
    - Return context and source documents.
    """


    vector_db = Chroma(

        persist_directory="chroma_db",

        embedding_function=embedding_model,

    )


    # ======================================================
    # Similarity Search With Scores
    # ======================================================

    results = vector_db.similarity_search_with_score(

        user_query,

        k=k,

    )


    print("=" * 60)
    print("RAW RETRIEVAL RESULTS")
    print("=" * 60)


    for doc, score in results:

        print(
            "Score:",
            score
        )

        print(
            "Source:",
            doc.metadata.get(
                "filename",
                "Unknown"
            )
        )

        print(
            "Preview:",
            doc.page_content[:100]
        )

        print("-" * 40)



    # ======================================================
    # Similarity Filtering
    # ======================================================

    filtered_results = []


    for doc, score in results:


        if score <= SIMILARITY_THRESHOLD:

            filtered_results.append(
                (
                    doc,
                    score
                )
            )


    print("=" * 60)
    print("FILTERED RESULTS")
    print("=" * 60)


    for doc, score in filtered_results:

        print(
            "Accepted:",
            doc.metadata.get(
                "filename",
                "Unknown"
            ),
            "| Score:",
            score
        )


    print("=" * 60)



    # ======================================================
    # No Relevant Documents
    # ======================================================

    if not filtered_results:


        print(
            "No relevant documents found."
        )


        return {

            "context": "",

            "sources": [],

            "scores": [],

        }



    # ======================================================
    # Build Context
    # ======================================================


    documents = [

        doc

        for doc, score in filtered_results

    ]



    context = "\n\n".join(

        doc.page_content

        for doc in documents

    )



    # ======================================================
    # Extract Unique Sources
    # ======================================================


    sources = []

    scores = []

    seen_sources = set()



    for doc, score in filtered_results:


        filename = doc.metadata.get(

            "filename",

            "Unknown"

        )


        if filename not in seen_sources:


            seen_sources.add(
                filename
            )


            sources.append(
                filename
            )


            scores.append(
                round(
                    float(score),
                    3
                )
            )



    print("=" * 60)

    print(
        "FINAL SOURCES:",
        sources
    )

    print(
        "FINAL SCORES:",
        scores
    )

    print("=" * 60)



    return {


        "context": context,


        "sources": sources,


        "scores": scores,


    }