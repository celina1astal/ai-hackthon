from langdetect import detect, DetectorFactory
import os

from dotenv import load_dotenv
load_dotenv()

from google import genai

DetectorFactory.seed = 0

SUPPORTED = {
    "en": "English",
    "hi": "Hindi",
    "mr": "Marathi",
    "ta": "Tamil",
    "te": "Telugu",
    "bn": "Bengali",
    "gu": "Gujarati",
    "kn": "Kannada",
    "ml": "Malayalam",
    "pa": "Punjabi",
}

# Gemini client
_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def detect_language(text: str, fallback: str = "en") -> str:
    if len(text.strip()) < 12:
        return fallback

    try:
        code = detect(text)
        return code if code in SUPPORTED else fallback
    except Exception:
        return fallback


def _translate(text: str, source: str, target: str) -> str:
    """
    Translate text using Gemini.
    """

    if not text.strip() or source == target:
        return text

    source_name = SUPPORTED.get(source, source)
    target_name = SUPPORTED.get(target, target)

    prompt = f"""
You are a professional translation engine.

Translate the following text from {source_name} to {target_name}.

Rules:
- Translate ONLY the text.
- Do not explain anything.
- Do not add or remove information.
- Preserve names, numbers, dates, legal section numbers, URLs and formatting.
- Keep the meaning exactly the same.
- For legal/cooperative terminology, use natural and understandable terminology.

Text:
{text}
"""

    try:
        response = _client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        translated = response.text.strip()

        return translated if translated else text

    except Exception as e:
        print(f"Translation error ({source}->{target}): {e}")
        return text


def to_english(text: str, lang: str) -> str:
    """
    Convert user's selected language to English
    before sending the message to LangGraph/RAG.
    """

    if lang == "en" or text.strip().isdigit():
        return text

    return _translate(text, lang, "en")


def from_english(text: str, lang: str) -> str:
    """
    Convert LangGraph/RAG English response back
    into the user's selected language.
    """

    if lang == "en":
        return text

    return _translate(text, "en", lang)