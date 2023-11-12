from langchain.tools.render import render_text_description
from langchain.agents.format_scratchpad import format_xml
from langchain.chat_models import ChatAnthropic
from langchain.chat_models import ChatEverlyAI

from .prompts import conversational_prompt, parse_output


def get_xml_agent(tools, system_message):
    model = ChatAnthropic(temperature=0, max_tokens_to_sample=2000)
    prompt = conversational_prompt.partial(
        tools=render_text_description(tools),
        tool_names=", ".join([t.name for t in tools]),
        system_message=system_message,
    )
    llm_with_stop = model.bind(stop=["</tool_input>"])

    agent = (
        {
            "messages": lambda x: x["messages"],
            "agent_scratchpad": lambda x: format_xml(x["intermediate_steps"]),
        }
        | prompt
        | llm_with_stop
        | parse_output
    )
    return agent

def get_llama_agent(tools, system_message):
    model = ChatEverlyAI(model_name="meta-llama/Llama-2-13b-chat-hf-quantized", max_tokens=3000)
    prompt = conversational_prompt.partial(
        tools=render_text_description(tools),
        tool_names=", ".join([t.name for t in tools]),
        system_message=system_message,
    )
    llm_with_stop = model.bind(stop=["</tool_input>"])

    agent = (
        {
            "messages": lambda x: x["messages"],
            "agent_scratchpad": lambda x: format_xml(x["intermediate_steps"]),
        }
        | prompt
        | llm_with_stop
        | parse_output
    )
    return agent
