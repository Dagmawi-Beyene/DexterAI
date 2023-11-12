# General imports
import os
import requests
import sys
from datetime import datetime
from typing import Optional

# Package specific imports
from langchain.tools import StructuredTool
from langchain.tools.yahoo_finance_news import YahooFinanceNewsTool
from langchain.tools.base import StructuredTool
from langchain.utilities import GoogleSerperAPIWrapper
from langchain.utilities import PubMedAPIWrapper
from langchain.utilities import ArxivAPIWrapper
from langchain.agents import Tool
from langchain.pydantic_v1 import BaseModel, Field
from langchain.document_loaders import BigQueryLoader
from typing import Optional


def get_patents(search_query: Optional[str] = None):
    # get current working directory

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = (
        os.getcwd() + "/packages/gizmo_agent/gizmo_agent/nibretadv2-77a0f147a0fe.json"
    )

    BASE_QUERY = f"""
    SELECT *
    FROM `patents-public-data.patents.publications`
    WHERE 
    (
      EXISTS(
        SELECT 1 
        FROM UNNEST(title_localized) title 
        WHERE title.text LIKE '%{search_query}%'
      ) 
      OR 
      EXISTS(
        SELECT 1 
        FROM UNNEST(abstract_localized) abstract 
        WHERE abstract.text LIKE '%{search_query}%'
      ) 
    )
    AND 
      (publication_date > 20000101)
    ORDER BY publication_date DESC
    LIMIT 5
    """

    loader = BigQueryLoader(
        BASE_QUERY,
        page_content_columns=["title_localized", "publication_date"],
        metadata_columns=["id"],
    )
    data = loader.load()
    print(data)

    return data


class GoogleInput(BaseModel):
    query: str = Field(description="Search query to look up")


class PythonREPLInput(BaseModel):
    query: str = Field(description="Python command to run")


search = GoogleSerperAPIWrapper()
pubmed = PubMedAPIWrapper()
arxiv = ArxivAPIWrapper()

API_NEWS_KEY = "your_secret_key_here"


def get_news_api(search_query: Optional[str] = None) -> dict:
    """Tool calls GET on newsapi.org API."""
    base_sources = "reuters,bbc-news,the-new-york-times,associated-press,google-news,financial-times,loomberg,business-insider,fox-news,cnn"
    base_url = f"https://newsapi.org/v2/everything?sources={base_sources}&pageSize=1&apiKey={API_NEWS_KEY}&sortBy=publishedAt&language=en&pageSize=3"

    if search_query:
        base_url += f"&q={search_query}"

    result = requests.get(base_url)
    return result.json()


TOOLS = [
    Tool(
        name="GoogleSearch",
        func=search.run,
        description="Useful for when you need to search",
    ),
    Tool(
        name="Arxiv",
        func=arxiv.run,
        description="useful when you need an answer about a paper",
    ),
    Tool(
        name="datetime",
        func=lambda x: datetime.now().isoformat(),
        description="Useful for when you need to get current datetime",
    ),
    # Fill parameters for the 'GetNews' Tool if needed
    StructuredTool.from_function(
        func=get_news_api,
        name="GetNews",
        description="Useful tool for querying news",
    ),
    StructuredTool.from_function(
        func=get_patents,
        name="GetPatents",
        description="Useful tool for querying patents",
    ),
    StructuredTool.from_function(
        func=pubmed.run,
        name="PubMed",
        description="Useful tool for querying medical publications",
    ),
]

TOOL_OPTIONS = {tool.name: tool for tool in TOOLS}

# Display python information
print(sys.executable)
print(sys.version)
print(os.getcwd())
