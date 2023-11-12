# Dexter AI
Dexter is an advanced AI Research Assistant that is programmed to empower users to conduct efficient academic research.

Try Dexter AI [here](https://dexterv1-pyjwrsrc3q-uc.a.run.app/).

## About

Dexter alleviates the challenge of locating, citing, and summarizing relevant academic papers, medical publications, and patents by autonomously accessing expansive databases to provide accurate and up-to-date information. Dexter's unique feature allows real-time access to Google search, ensuring current news and trends are included in your research.

Notably, Dexter encourages effective interaction with retrieved information with options for detailed literature summary, report creation, and data analysis. Its commendable intuitive ideation can aid in uncovering trending topics from news and newly published articles, thereby highlighting relevant research topics.

## Quickstart

**1. Start the backend**

Install requirements

```shell
cd backend
pip install -r requirements.txt
```

By default, this uses OpenAI, but there are also options for Azure OpenAI and Anthropic.
If you are using those, you may need to set different environment variables.

```shell
export OPENAI_API_KEY="sk-..."
```

Set up [Serper](https://serper.dev/).
This will allow lightning-fast Google searches.

```shell
export SERPER_API_KEY=...
```

Set up [LangSmith](https://smith.langchain.com/).
This is optional, but it will help with debugging, logging, monitoring.
Sign up at the link above and then set the relevant environment variables

```shell
export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY=...
```

Start the backend server

```shell
langchain serve --port=8100
```

**2. Start the frontend**

```shell
cd frontend
yarn
yarn dev
```

Navigate to [http://localhost:5173/](http://localhost:5173/) and enjoy!
