"""Grievance letter: builds the text from a template and saves it as .txt and .pdf."""
import uuid
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

LETTER_DIR = Path(__file__).parent / "generated"
LETTER_DIR.mkdir(exist_ok=True)

TEMPLATE = """Date: {date}

To,
The Chairperson / Secretary,
{society_name}

Subject: Formal grievance regarding {issue_type}

Respected Sir/Madam,

I, {member_name}, a member of {society_name}, wish to formally bring the following grievance to your notice.

Nature of grievance: {issue_type}

Details:
{issue_description}

Date / period of the incident: {incident_date}

This matter appears to be covered under {provision}.

I therefore request you to take the following action:
{desired_resolution}

I request a written response within 15 days of receipt of this letter. If the matter is not resolved, I reserve the right to approach the Registrar of Cooperative Societies / the competent authority under the applicable Act.

Thanking you,

Yours faithfully,
{member_name}
Member, {society_name}
"""


def build_letter_text(data: dict, provision: str) -> str:
    return TEMPLATE.format(date=date.today().strftime("%d %B %Y"), provision=provision, **data)


def save_letter(text: str) -> str:
    """Saves text as generated/<id>.txt and generated/<id>.pdf, returns the id."""
    letter_id = uuid.uuid4().hex[:10]
    (LETTER_DIR / f"{letter_id}.txt").write_text(text, encoding="utf-8")

    body = getSampleStyleSheet()["BodyText"]
    body.fontSize, body.leading = 11, 16
    story = []
    for block in text.split("\n\n"):
        story.append(Paragraph(escape(block).replace("\n", "<br/>"), body))
        story.append(Spacer(1, 4 * mm))
    SimpleDocTemplate(str(LETTER_DIR / f"{letter_id}.pdf"), pagesize=A4,
                      leftMargin=25 * mm, rightMargin=25 * mm,
                      topMargin=25 * mm, bottomMargin=25 * mm).build(story)
    return letter_id
