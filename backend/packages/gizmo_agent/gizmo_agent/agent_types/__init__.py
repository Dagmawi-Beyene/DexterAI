from .openai import get_openai_function_agent
from .xml.agent import get_xml_agent
from .xml.agent import get_llama_agent
from enum import Enum


class GizmoAgentType(str, Enum):
    GPT_35_TURBO = "GPT 3.5 Turbo"
    GPT_4 = "GPT 4"
    # AZURE_OPENAI = "Azure OpenAI"
    # CLAUDE2 = "Claude 2"
    LLAMA_2_13B = "Llama 2-13B"


__all__ = [
    "get_openai_function_agent",
    "get_xml_agent",
    "get_llama_agent",
    "GizmoAgentType",
]
