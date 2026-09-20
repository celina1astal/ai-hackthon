def route_query(query: str) -> str:
    """Route the user's question to the appropriate LangGraph flow."""

    text = query.lower()

    # 1. Voting-related questions
    if any(word in text for word in [
        "vote",
        "voting",
        "election",
        "eligible to vote",
        "eligibility to vote",
    ]):
        return "voting"

    # 2. Grievance / complaint-related questions
    if any(word in text for word in [
        "grievance",
        "complaint",
        "complain",
        "dispute",
        "issue",
    ]):
        return "grievance"

    # 3. Registration-related questions
    if any(word in text for word in [
        "register",
        "registration",
        "register a cooperative",
        "registration process",
        "registration form",
    ]):
        return "registration"

    # 4. Legal / Act / law-related questions
    if any(word in text for word in [
        "law",
        "act",
        "section",
        "legal",
        "amendment",
        "legislation",
    ]):
        return "legal"

    # 5. Governance-related questions
    if any(word in text for word in [
        "governance",
        "management",
        "meeting",
        "members",
        "accountability",
    ]):
        return "governance"

    # Default
    return "governance"