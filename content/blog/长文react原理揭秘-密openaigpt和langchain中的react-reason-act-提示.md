---
title: "长文ReAct原理揭秘：密OpenAIGPT和LangChain中的ReAct（Reason+Act）提示"
slug: "长文react原理揭秘-密openaigpt和langchain中的react-reason-act-提示"
description: "作者： RowanFYI 来源： [RowanFYI](https://mp.weixin.qq.com/s/f-iYhuLcV-O4KD1XS-q2fw) LangChain是一个开源工具，可以帮助你在LLM中组成各种语言链（如聊天系统，QA系统等），它还提供了一个框架，通过Reasoning+Acting构建自治代理，简称ReAct。 在这篇文章中，我将简要地向..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: ""
sourceName: ""
readingTime: "36 min"
createdAt: "2023-07-02T16:00:00.000Z"
publishedAt: "2023-07-02T16:00:00.000Z"
featured: false
---

`作者： RowanFYI  来源： [RowanFYI](https://mp.weixin.qq.com/s/f-iYhuLcV-O4KD1XS-q2fw)
`
![](https://mmbiz.qpic.cn/mmbiz_jpg/CHD1E1Q314xoDzZNvhVr9zoKdoa9jbuKibuFLQ3CdReTPfYRe1z1fyCeJkn5PGoOKDhZmDpfrFr66H3KxtsYdgA/640?wx_fmt=jpeg)

LangChain是一个开源工具，可以帮助你在LLM中组成各种语言链（如聊天系统，QA系统等），它还提供了一个框架，通过Reasoning+Acting构建自治代理，简称ReAct。

在这篇文章中，我将简要地向你展示“ReAct的本质是什么？”“，“怎么回事？“，和“如何建造？”OpenAI GPT和广泛使用的LangChain。

目前有很多工具、实用程序和开源–例如Auto-GPT、HuggingGPT（JARVIS）、ChatGPT插件等–通过在LLM上进行推理来自动执行各种任务。这篇文章将给予你一个构建这样一个自治代理的提示。

## ReAct（Reasoning + Acting）-与LLM和外部工具的协作

将LLM（大型语言模型）与外部工具集成在真实的业务应用中经常需要。

例如，微软已经将OpenAI LLM与Microsoft 365 Copilot中的Office应用程序集成在一起。

另一个例子是搜索。LLM并不总是给予正确的答案，并且与外部搜索引擎交互的方法（无论是互联网还是内联网）通常被应用在QA系统中。

LLM的推理和其他专家之间的组合的灵活架构，然后在几篇论文中提出-如ReAct（推理+代理）或MRKL（模块化推理，知识和语言）。

ReAct是本文中已经引入的框架（Shunyu等人，2022），并通过将LLM与外部工具集成来改善决策。

正如你在这篇文章中所看到的，这是非常灵活的，你可以在LLM和外部工具之间的各种类型的自动化（编排）中应用这种方法。

例如，我们可以定义 search [entity]
从对应的维基百科实体返回句子的动作“”，并且多跳问题（其不能从单个维基百科实体回答，但可以通过引用多个实体来回答）可以被分解成多个搜索动作。所有搜索操作将由外部工具处理。最后，可以通过LLM的问答获得答案。(See下面是论文中的例子）。

![](https://mmbiz.qpic.cn/mmbiz_jpg/CHD1E1Q314xoDzZNvhVr9zoKdoa9jbuKDZSiaDyqgyMHj8FraabIUiaYaHNexYsVTHBfic6Oc949fibOTpCMXfK7Mg/640?wx_fmt=jpeg)

注：在本文的基准测试中， lookup [entity]
还引入了““action，它返回包含字符串的页面中的下一个句子，模拟浏览器上的Ctrl+F功能。

这些动作（搜索、查找）是在模拟人类响应中的人类行为。

正如您在后面看到的，LLM会调用一个外部工具，然后暂停以获取该工具的响应作为观察结果，然后根据前面的所有响应决定下一个操作。

这种技术有时也被称为增强语言模型（ALM）。

这种推理和行动可以通过少量的上下文提示来执行，或者也可以通过更高级的方法中的强化学习或模仿学习（使用专家数据）来学习。

在这篇文章中，我们将看到这个ReAct示例，其中有几个提示。

## 设置LangChain环境

在这个例子中，我在Microsoft Azure中使用了Ubuntu Server 20.04 LTS。

在这个虚拟机中，它已经安装了Python 3.8，您只需安装额外的包来运行示例，如下所示。

`# Update pip  
sudo apt-get update  
sudo apt-get install -y python3-pip  
sudo -H pip3 install --upgrade pip  
  
# Install packages  
pip3 install openai  
pip3 install langchain==0.0.100  
pip3 install wikipedia  
`

在运行应用程序之前，您应该在LangChain中设置Azure OpenAI集成的环境变量。(See在LangChain中使用Azure OpenAI服务。

`export OPENAI_API_TYPE=azure  
export OPENAI_API_VERSION=2022-12-01  
export OPENAI_API_BASE=https://your-resource-name.openai.azure.com  
export OPENAI_API_KEY="..."  
`
## 使用LangChain运行您的第一个ReAct

现在让我们开始第一个ReAct链。

这是LangChain中包含的Wikipedia docstore示例，其中问题被分解为多个搜索操作。

在本演示中，我使用了OpenAI GPT中温度为0.0的text-davinci-003（GPT-3.5）模型。

在下面的代码中，它最终通过函数执行ReAct链 run()
，以获得以下问题的答案：

作者大卫Chanoff与美国哪位海军上将在哪位总统任内担任过驻英国大使？”

`from langchain.docstore.wikipedia import Wikipedia  
from langchain.llms import AzureOpenAI  
from langchain.agents import initialize_agent, Tool, AgentExecutor  
from langchain.agents.react.base import DocstoreExplorer  
  
# build tools  
docstore=DocstoreExplorer(Wikipedia())  
tools = [  
  Tool(  
    name="Search",  
    func=docstore.search,  
    description="Search for a term in the docstore.",  
  ),  
  Tool(  
    name="Lookup",  
    func=docstore.lookup,  
    description="Lookup a term in the docstore.",  
  )  
]  
  
# build LLM  
llm = AzureOpenAI(  
  deployment_name="davinci003-deploy",  
  model_name="text-davinci-003",  
  temperature=0,  
)  
  
# initialize ReAct agent  
react = initialize_agent(tools, llm, agent="react-docstore", verbose=True)  
agent_executor = AgentExecutor.from_agent_and_tools(  
  agent=react.agent,  
  tools=tools,  
  verbose=True,  
)  
  
# perform question-answering  
question = "Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?"  
agent_executor.run(question)  
`

这个问题不能通过引用单个Wikipedia文章来回答，因此需要多跳搜索操作。

运行此应用程序时，日志中将显示以下详细输出。

正如你所发现的，这个问题被分解成3个搜索操作（ Search[David Chanoff]
“”，“ Search[U.S. Navy admiral]
”和“ Search[Admiral William J. Crowe]
”），并得到最终的答案“比尔克林顿”。

![](https://mmbiz.qpic.cn/mmbiz_jpg/CHD1E1Q314xoDzZNvhVr9zoKdoa9jbuKRFtzJwTVtAVBeqL55h0tLicvliaN9bWKME9C2DLdKrfYo8TWRA8JwRPw/640?wx_fmt=jpeg)
## LangChain在里面做什么？（React揭秘）

现在让我们看看它在LangChain中是如何工作的，并深入了解ReAct框架的实现。

在此链的底部，将向OpenAI GPT发出以下提示。(You可以通过运行以下代码来查看提示符的模板。）

以下提示模板中的前一部分（长文本）是few-shot的上下文示例。然后，OpenAI将学习如何使用这些几个例子为目标问题生成文本。

最后一部分（输出中的最后2行）是一个目标问题， {input}
{agent_scratchpad}
根据用户的输入和链步骤，和占位符将被LangChain框架替换。（我很快就会给你看这个例子。）

`# output prompt's template  
print(react.agent.llm_chain.prompt.template)  
`

输出

`Question: What is the elevation range for the area that the eastern sector of the  
Colorado orogeny extends into?  
Thought 1: I need to search Colorado orogeny, find the area that the eastern sector  
of the Colorado orogeny extends into, then find the elevation range of the  
area.  
Action 1: Search[Colorado orogeny]  
Observation 1: The Colorado orogeny was an episode of mountain building (an orogeny) in  
Colorado and surrounding areas.  
Thought 2: It does not mention the eastern sector. So I need to look up eastern  
sector.  
Action 2: Lookup[eastern sector]  
Observation 2: (Result 1 / 1) The eastern sector extends into the High Plains and is called  
the Central Plains orogeny.  
Thought 3: The eastern sector of Colorado orogeny extends into the High Plains. So I  
need to search High Plains and find its elevation range.  
Action 3: Search[High Plains]  
Observation 3: High Plains refers to one of two distinct land regions  
Thought 4: I need to instead search High Plains (United States).  
Action 4: Search[High Plains (United States)]  
Observation 4: The High Plains are a subregion of the Great Plains. From east to west, the  
High Plains rise in elevation from around 1,800 to 7,000 ft (550 to 2,130  
m).[3]  
Thought 5: High Plains rise in elevation from around 1,800 to 7,000 ft, so the answer  
is 1,800 to 7,000 ft.  
Action 5: Finish[1,800 to 7,000 ft]  
  
Question: Musician and satirist Allie Goertz wrote a song about the "The Simpsons"  
character Milhouse, who Matt Groening named after who?  
Thought 1: The question simplifies to "The Simpsons" character Milhouse is named after  
who. I only need to search Milhouse and find who it is named after.  
Action 1: Search[Milhouse]  
Observation 1: Milhouse Mussolini Van Houten is a recurring character in the Fox animated  
television series The Simpsons voiced by Pamela Hayden and created by Matt  
Groening.  
Thought 2: The paragraph does not tell who Milhouse is named after, maybe I can look up  
"named after".  
Action 2: Lookup[named after]  
Observation 2: (Result 1 / 1) Milhouse was named after U.S. president Richard Nixon, whose  
middle name was Milhous.  
Thought 3: Milhouse was named after U.S. president Richard Nixon, so the answer is  
Richard Nixon.  
Action 3: Finish[Richard Nixon]  
  
Question: Which documentary is about Finnish rock groups, Adam Clayton Powell or The  
Saimaa Gesture?  
Thought 1: I need to search Adam Clayton Powell and The Saimaa Gesture, and find which  
documentary is about Finnish rock groups.  
Action 1: Search[Adam Clayton Powell]  
Observation 1 Could not find [Adam Clayton Powell]. Similar: [’Adam Clayton Powell  
III’, ’Seventh Avenue (Manhattan)’, ’Adam Clayton Powell Jr. State Office  
Building’, ’Isabel Washington Powell’, ’Adam Powell’, ’Adam Clayton Powell  
(film)’, ’Giancarlo Esposito’].  
Thought 2: To find the documentary, I can search Adam Clayton Powell (film).  
Action 2: Search[Adam Clayton Powell (film)]  
Observation 2: Adam Clayton Powell is a 1989 American documentary film directed by  
Richard Kilberg. The film is about the rise and fall of influential  
African-American politician Adam Clayton Powell Jr.[3][4] It was later aired  
as part of the PBS series The American Experience.  
Thought 3: Adam Clayton Powell (film) is a documentary about an African-American  
politician, not Finnish rock groups. So the documentary about Finnish rock  
groups must instead be The Saimaa Gesture.  
Action 3: Finish[The Saimaa Gesture]  
  
Question: What profession does Nicholas Ray and Elia Kazan have in common?  
Thought 1: I need to search Nicholas Ray and Elia Kazan, find their professions, then  
find the profession they have in common.  
Action 1: Search[Nicholas Ray]  
Observation 1: Nicholas Ray (born Raymond Nicholas Kienzle Jr., August 7, 1911 - June 16,  
1979) was an American film director, screenwriter, and actor best known for  
the 1955 film Rebel Without a Cause.  
Thought 2: Professions of Nicholas Ray are director, screenwriter, and actor. I need  
to search Elia Kazan next and find his professions.  
Action 2: Search[Elia Kazan]  
Observation 2: Elia Kazan was an American film and theatre director, producer, screenwriter  
and actor.  
Thought 3: Professions of Elia Kazan are director, producer, screenwriter, and actor.  
So profession Nicholas Ray and Elia Kazan have in common is director,  
screenwriter, and actor.  
Action 3: Finish[director, screenwriter, actor]  
  
Question: Which magazine was started first Arthur’s Magazine or First for Women?  
Thought 1: I need to search Arthur’s Magazine and First for Women, and find which was  
started first.  
Action 1: Search[Arthur’s Magazine]  
Observation 1: Arthur’s Magazine (1844-1846) was an American literary periodical published  
in Philadelphia in the 19th century.  
Thought 2: Arthur’s Magazine was started in 1844. I need to search First for Women  
next.  
Action 2: Search[First for Women]  
Observation 2: First for Women is a woman’s magazine published by Bauer Media Group in the  
USA.[1] The magazine was started in 1989.  
Thought 3: First for Women was started in 1989. 1844 (Arthur’s Magazine) < 1989 (First  
for Women), so Arthur’s Magazine was started first.  
Action 3: Finish[Arthur’s Magazine]  
  
Question: Were Pavel Urysohn and Leonid Levin known for the same type of work?  
Thought 1: I need to search Pavel Urysohn and Leonid Levin, find their types of work,  
then find if they are the same.  
Action 1: Search[Pavel Urysohn]  
Observation 1: Pavel Samuilovich Urysohn (February 3, 1898 - August 17, 1924) was a Soviet  
mathematician who is best known for his contributions in dimension theory.  
Thought 2: Pavel Urysohn is a mathematician. I need to search Leonid Levin next and  
find its type of work.  
Action 2: Search[Leonid Levin]  
Observation 2: Leonid Anatolievich Levin is a Soviet-American mathematician and computer  
scientist.  
Thought 3: Leonid Levin is a mathematician and computer scientist. So Pavel Urysohn  
and Leonid Levin have the same type of work.  
Action 3: Finish[yes]  
  
  
Question: {input}  
{agent_scratchpad}  
`

现在我将在提示中向您展示示例。

首先，它将向OpenAI GPT提供以下提示。

正如你在下面看到的，前一部分（few-shot的例子部分）与上面相同，但后一部分被目标问题所取代。

如果您可以使用OpenAI playground，请在提示符中输入此文本并查看生成的文本。(Here我使用text-davinci-003模型，温度为0.0，最大256个令牌。）

提示1

`Question: What is the elevation range for the area that the eastern sector of the  
Colorado orogeny extends into?  
Thought 1: I need to search Colorado orogeny, find the area that the eastern sector  
of the Colorado orogeny extends into, then find the elevation range of the  
area.  
Action 1: Search[Colorado orogeny]  
Observation 1: The Colorado orogeny was an episode of mountain building (an orogeny) in  
Colorado and surrounding areas.  
Thought 2: It does not mention the eastern sector. So I need to look up eastern  
sector.  
Action 2: Lookup[eastern sector]  
Observation 2: (Result 1 / 1) The eastern sector extends into the High Plains and is called  
the Central Plains orogeny.  
Thought 3: The eastern sector of Colorado orogeny extends into the High Plains. So I  
need to search High Plains and find its elevation range.  
Action 3: Search[High Plains]  
Observation 3: High Plains refers to one of two distinct land regions  
Thought 4: I need to instead search High Plains (United States).  
Action 4: Search[High Plains (United States)]  
Observation 4: The High Plains are a subregion of the Great Plains. From east to west, the  
High Plains rise in elevation from around 1,800 to 7,000 ft (550 to 2,130  
m).[3]  
Thought 5: High Plains rise in elevation from around 1,800 to 7,000 ft, so the answer  
is 1,800 to 7,000 ft.  
Action 5: Finish[1,800 to 7,000 ft]  
  
Question: Musician and satirist Allie Goertz wrote a song about the "The Simpsons"  
character Milhouse, who Matt Groening named after who?  
Thought 1: The question simplifies to "The Simpsons" character Milhouse is named after  
who. I only need to search Milhouse and find who it is named after.  
Action 1: Search[Milhouse]  
Observation 1: Milhouse Mussolini Van Houten is a recurring character in the Fox animated  
television series The Simpsons voiced by Pamela Hayden and created by Matt  
Groening.  
Thought 2: The paragraph does not tell who Milhouse is named after, maybe I can look up  
"named after".  
Action 2: Lookup[named after]  
Observation 2: (Result 1 / 1) Milhouse was named after U.S. president Richard Nixon, whose  
middle name was Milhous.  
Thought 3: Milhouse was named after U.S. president Richard Nixon, so the answer is  
Richard Nixon.  
Action 3: Finish[Richard Nixon]  
  
Question: Which documentary is about Finnish rock groups, Adam Clayton Powell or The  
Saimaa Gesture?  
Thought 1: I need to search Adam Clayton Powell and The Saimaa Gesture, and find which  
documentary is about Finnish rock groups.  
Action 1: Search[Adam Clayton Powell]  
Observation 1 Could not find [Adam Clayton Powell]. Similar: [’Adam Clayton Powell  
III’, ’Seventh Avenue (Manhattan)’, ’Adam Clayton Powell Jr. State Office  
Building’, ’Isabel Washington Powell’, ’Adam Powell’, ’Adam Clayton Powell  
(film)’, ’Giancarlo Esposito’].  
Thought 2: To find the documentary, I can search Adam Clayton Powell (film).  
Action 2: Search[Adam Clayton Powell (film)]  
Observation 2: Adam Clayton Powell is a 1989 American documentary film directed by  
Richard Kilberg. The film is about the rise and fall of influential  
African-American politician Adam Clayton Powell Jr.[3][4] It was later aired  
as part of the PBS series The American Experience.  
Thought 3: Adam Clayton Powell (film) is a documentary about an African-American  
politician, not Finnish rock groups. So the documentary about Finnish rock  
groups must instead be The Saimaa Gesture.  
Action 3: Finish[The Saimaa Gesture]  
  
Question: What profession does Nicholas Ray and Elia Kazan have in common?  
Thought 1: I need to search Nicholas Ray and Elia Kazan, find their professions, then  
find the profession they have in common.  
Action 1: Search[Nicholas Ray]  
Observation 1: Nicholas Ray (born Raymond Nicholas Kienzle Jr., August 7, 1911 - June 16,  
1979) was an American film director, screenwriter, and actor best known for  
the 1955 film Rebel Without a Cause.  
Thought 2: Professions of Nicholas Ray are director, screenwriter, and actor. I need  
to search Elia Kazan next and find his professions.  
Action 2: Search[Elia Kazan]  
Observation 2: Elia Kazan was an American film and theatre director, producer, screenwriter  
and actor.  
Thought 3: Professions of Elia Kazan are director, producer, screenwriter, and actor.  
So profession Nicholas Ray and Elia Kazan have in common is director,  
screenwriter, and actor.  
Action 3: Finish[director, screenwriter, actor]  
  
Question: Which magazine was started first Arthur’s Magazine or First for Women?  
Thought 1: I need to search Arthur’s Magazine and First for Women, and find which was  
started first.  
Action 1: Search[Arthur’s Magazine]  
Observation 1: Arthur’s Magazine (1844-1846) was an American literary periodical published  
in Philadelphia in the 19th century.  
Thought 2: Arthur’s Magazine was started in 1844. I need to search First for Women  
next.  
Action 2: Search[First for Women]  
Observation 2: First for Women is a woman’s magazine published by Bauer Media Group in the  
USA.[1] The magazine was started in 1989.  
Thought 3: First for Women was started in 1989. 1844 (Arthur’s Magazine) < 1989 (First  
for Women), so Arthur’s Magazine was started first.  
Action 3: Finish[Arthur’s Magazine]  
  
Question: Were Pavel Urysohn and Leonid Levin known for the same type of work?  
Thought 1: I need to search Pavel Urysohn and Leonid Levin, find their types of work,  
then find if they are the same.  
Action 1: Search[Pavel Urysohn]  
Observation 1: Pavel Samuilovich Urysohn (February 3, 1898 - August 17, 1924) was a Soviet  
mathematician who is best known for his contributions in dimension theory.  
Thought 2: Pavel Urysohn is a mathematician. I need to search Leonid Levin next and  
find its type of work.  
Action 2: Search[Leonid Levin]  
Observation 2: Leonid Anatolievich Levin is a Soviet-American mathematician and computer  
scientist.  
Thought 3: Leonid Levin is a mathematician and computer scientist. So Pavel Urysohn  
and Leonid Levin have the same type of work.  
Action 3: Finish[yes]  
  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
`

OpenAI将生成以下结果。(The突出显示的文本是来自OpenAI GPT的响应。）

在LangChain中，“”下的文本 Observation 1:
将被全部忽略，只有“ Thought 1:
”和“ Action 1:
”部分将用于下一个上下文。

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is an American author and journalist. He is the co-author of  
several books, including Inside the Mirage: America's Fragile Partnership  
with Saudi Arabia (2004) and The Game Player: Confessions of the CIA's  
Original Political Operative (1989).  
Thought 2: I need to search the U.S. Navy admiral David Chanoff collaborated with.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral Charles R. Larson was a United States Navy four-star admiral who  
served as the United States Ambassador to the United Kingdom from 1998 to  
2001.  
Thought 3: Admiral Charles R. Larson served as the United States Ambassador to the  
United Kingdom from 1998 to 2001. So the President they served under is  
Bill Clinton.  
Action 3: Finish[Bill Clinton]  
`

LangChain框架解析“ Action 1: Search[David Chanoff]
”（见上文）并使用外部工具（在本例中为函数）在维基百科实体中搜索“大卫Chanoff” docstore.search()
。

当其获得搜索结果时，其将随后如下在“观察1”部分中填充该结果。

我注意到这个搜索结果与上面OpenAI生成的响应文本不同。

`... (omitted)  
  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
`

下一个LangChain框架将提示如下。

如你所见，它包含了前一个Observation 1的结果，然后要求“思想2”。

我注意到，我在前面的部分中省略了大量的few-shot示例，但它每次都包含相同的few-shot示例（即，它每次都需要所有的历史标记），因为提示符总是无状态的。

提示2

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2:  
`

然后OpenAI将返回以下响应。(The突出显示的文本是来自OpenAI GPT的响应。）

和上面一样，““下的文本 Observation 2:
将全部被忽略，链中只使用“ Thought 2:
“和“ Action 2:
“部分。

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: William J. Crowe Jr. (January 2, 1925 – October 18, 2007) was an admiral in the United States Navy who served as Chairman of the Joint Chiefs of Staff under Presidents Ronald Reagan and George H. W. Bush and then as the United States Ambassador to the United Kingdom.  
Thought 3: William J. Crowe Jr. was the ambassador to the United Kingdom under  
Presidents Ronald Reagan and George H. W. Bush. So the answer is Ronald  
Reagan and George H. W. Bush.  
Action 3: Finish[Ronald Reagan and George H. W. Bush]  
`

然后LangChain框架将搜索“美国Navy admiral”，并将此结果作为观察结果添加如下。(See以下为“观察2”。

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral of the Navy was the highest-possible rank in the United States Navy, prior to the creation of fleet admiral in 1944. The rank is considered to be at least equivalent to that of a five-star admiral, with Admiral George Dewey being the only officer to be appointed to the rank.  
`

LangChain框架将再次提示如下。

正如你所发现的，它包含了之前的Observation2的结果（搜索结果），并要求“Thought3”。

提示3

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral of the Navy was the highest-possible rank in the United States Navy, prior to the creation of fleet admiral in 1944. The rank is considered to be at least equivalent to that of a five-star admiral, with Admiral George Dewey being the only officer to be appointed to the rank.  
Thought 3:  
`

然后OpenAI将返回以下响应。(The突出显示的文本是来自OpenAI GPT的响应。）

和上面一样，“”下的文本 Observation 3:
也将被忽略，链中只使用“ Thought 3:
”和“ Action 3:
”部分。

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral of the Navy was the highest-possible rank in the United States Navy, prior to the creation of fleet admiral in 1944. The rank is considered to be at least equivalent to that of a five-star admiral, with Admiral George Dewey being the only officer to be appointed to the rank.  
Thought 3: I need to search Admiral William J. Crowe and find the ambassador to the  
United Kingdom.  
Action 3: Search[Admiral William J. Crowe]  
Observation 3: Admiral William J. Crowe Jr., KBE, DSC (January 2, 1925 – October 18, 2007) was a United States Navy admiral who served as Chairman of the Joint Chiefs of Staff under Presidents Ronald Reagan and George H. W. Bush and as the United States Ambassador to the United Kingdom under President Bill Clinton.  
Thought 4: Admiral William J. Crowe was the ambassador to the United Kingdom under  
President Bill Clinton, so the answer is Bill Clinton.  
Action 4: Finish[Bill Clinton]  
`

LangChain框架将再次搜索“Admiral William J. Crowe”，并将此结果作为观察结果添加如下。

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral of the Navy was the highest-possible rank in the United States Navy, prior to the creation of fleet admiral in 1944. The rank is considered to be at least equivalent to that of a five-star admiral, with Admiral George Dewey being the only officer to be appointed to the rank.  
Thought 3: I need to search Admiral William J. Crowe and find the ambassador to the  
United Kingdom.  
Action 3: Search[Admiral William J. Crowe]  
Observation 3: William James Crowe Jr. (January 2, 1925 – October 18, 2007) was a United States Navy admiral and diplomat who served as the 11th chairman of the Joint Chiefs of Staff under Presidents Ronald Reagan and George H. W. Bush, and as the ambassador to the United Kingdom and Chair of the Intelligence Oversight Board under President Bill Clinton.  
`

LangChain框架将再次提示如下。

正如你所发现的，它再次包含了之前Observation3的结果（搜索结果），并要求“Thought4”。

提示4

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral of the Navy was the highest-possible rank in the United States Navy, prior to the creation of fleet admiral in 1944. The rank is considered to be at least equivalent to that of a five-star admiral, with Admiral George Dewey being the only officer to be appointed to the rank.  
Thought 3: I need to search Admiral William J. Crowe and find the ambassador to the  
United Kingdom.  
Action 3: Search[Admiral William J. Crowe]  
Observation 3: William James Crowe Jr. (January 2, 1925 – October 18, 2007) was a United States Navy admiral and diplomat who served as the 11th chairman of the Joint Chiefs of Staff under Presidents Ronald Reagan and George H. W. Bush, and as the ambassador to the United Kingdom and Chair of the Intelligence Oversight Board under President Bill Clinton.  
Thought 4:  
`

然后OpenAI将返回以下响应。(The突出显示的文本是来自OpenAI GPT的响应。）

这一次，OpenAI现在提供了最终答案，因为之前的搜索结果包括了答案。

`... few-shot examples (omitted)  
  
Question: Author David Chanoff has collaborated with a U.S. Navy admiral who served as the ambassador to the United Kingdom under which President?  
Thought 1: I need to search David Chanoff and the U.S. Navy admiral, find the  
ambassador to the United Kingdom, then find the President they served under.  
Action 1: Search[David Chanoff]  
Observation 1: David Chanoff is a noted author of non-fiction work. His work has typically involved collaborations with the principal protagonist of the work concerned. His collaborators have included; Augustus A. White, Joycelyn Elders, Đoàn Văn Toại, William J. Crowe, Ariel Sharon, Kenneth Good and Felix Zandman. He has also written about a wide range of subjects including literary history, education and foreign for The Washington Post, The New Republic and The New York Times Magazine. He has published more than twelve books.  
Thought 2: David Chanoff has collaborated with a U.S. Navy admiral. I need to search  
the U.S. Navy admiral and find the ambassador to the United Kingdom.  
Action 2: Search[U.S. Navy admiral]  
Observation 2: Admiral of the Navy was the highest-possible rank in the United States Navy, prior to the creation of fleet admiral in 1944. The rank is considered to be at least equivalent to that of a five-star admiral, with Admiral George Dewey being the only officer to be appointed to the rank.  
Thought 3: I need to search Admiral William J. Crowe and find the ambassador to the  
United Kingdom.  
Action 3: Search[Admiral William J. Crowe]  
Observation 3: William James Crowe Jr. (January 2, 1925 – October 18, 2007) was a United States Navy admiral and diplomat who served as the 11th chairman of the Joint Chiefs of Staff under Presidents Ronald Reagan and George H. W. Bush, and as the ambassador to the United Kingdom and Chair of the Intelligence Oversight Board under President Bill Clinton.  
Thought 4: Admiral William J. Crowe was the ambassador to the United Kingdom under  
President Bill Clinton, so the answer is Bill Clinton.  
Action 4: Finish[Bill Clinton]  
`

然后LangChain框架就可以识别出最终的答案是“比尔·克林顿”，链就完成了（done！）.

在这里，我总结了LLM（OpenAI GPT-3）和外部工具（在本例中是搜索工具）如何相互交互，如下所示。(See下图）。

LLM将提供思想和下一个行动与以前的上下文的历史，外部工具将执行每个相应的行动。然后LangChain框架将这些活动连接在链中。

![](https://mmbiz.qpic.cn/mmbiz_jpg/CHD1E1Q314xoDzZNvhVr9zoKdoa9jbuKia7EDgSRYPxz6LxMUWXAIb3xQwXM6BWlOzh0ib4PTaHXcFibxU4xvNUNA/640?wx_fmt=jpeg)

在这个例子中，我们已经在提示中应用了几个镜头的例子，但是你也可以通过使用LangChain中的class来使用零镜头提示 langchain.agents.ZeroShotAgent
。

以下是零拍提示模板示例。前缀和后缀文本可以在课堂上自定义 ZeroShotAgent
。（我注意到，以下“搜索”和“查找”也会根据指定的工具而有所不同。

`{prefix text}  
  
Search: Search for a term in the docstore.  
Lookup: Lookup a term in the docstore.  
  
Use the following format:  
  
Question: the input question you must answer  
Thought: you should always think about what to do  
Action: the action to take, should be one of [Search, Lookup]  
Action Input: the input to the action  
Observation: the result of the action  
... (this Thought/Action/Action Input/Observation can repeat N times)  
Thought: I now know the final answer  
Final Answer: the final answer to the original input question  
  
{suffix text}  
  
Question: {input}  
{agent_scratchpad}  
`
## 构建您自己的自定义工具和代理

您可以在LangChain中使用以下内置代理。

（我使用的是LangChain版本0.0.100，这是本文的最新版本。

zero-shot-react-description：多用途代理优化为零杆提示（它使用 `langchain.agents.ZeroShotAgent` 类，我在上面提到）

- 

react-docstore：ReAct代理示例，使用docstore示例（见上文）

- 

self-ask-with-search：通过搜索工具回答开放问题的代理。在LangChain中，存在一个工具（包装器类）来使用SerpApi。

- 

conversational-react-description：多用途代理，您可以在提示中包括会话历史记录

如果这些内置的代理不重要，您还可以在LangChain框架中构建和定义自己的链，自己的外部工具和自己的代理。

在这个例子中，我将向你展示一个例子，要求公司的发票金额及其简单的计算。

在本例中，我将定义以下外部工具。

- GetInvoice[name_of_company]：

这将从公司数据库中返回name_of_company的发票金额。

- Diff[list_of_quantity]：

这是一个简单的计算器，返回list_of_quantity之间的差值。占位符list_of_quantity应使用空格字符分隔。

- 总计[list_of_quantity]：

这也是一个简单的计算器，返回list_of_quantity的总数量（相加）。占位符list_of_quantity也应该用空格字符分隔。

有了这些工具，我将提出以下问题：

****“C、F公司的总和和A、E公司的总和相差多少？”****

在本例中，我们期望执行以下过程。

- 

获取公司C和F的发票金额。（GetInvoice操作）

- 

计算上述C和F的总量。（总行动）

- 

获取公司A和公司E的发票金额。（GetInvoice操作）

- 

计算上述A和E的总量。（总行动）

- 

计算之前的C、F和A、E总和之间的差值。(Diff行动）

注：OpenAI GPT可以进行简单的计算（例如，total，difference等），您不需要上述工具进行计算（Diff和Total）。

在本例中，我将为您的学习目的定义这些基本工具。

为了正确地使用思想链（CoT），我将向OpenAI GPT提供以下提示和少量示例（其中，少量示例包含在前面的部分中）。

`Question: How much is the difference between the invoice of company A and company B ?  
Thought : I need to get invoice amount of company A.  
Action : GetInvoice[A]  
Observation : 2000  
Thought : I need to get invoice amount of company B.  
Action : GetInvoice[B]  
Observation : 1500  
Thought : I need to get difference of obtained amount between company A and company B.  
Action : Diff[2000 1500]  
Observation : 500  
Thought : So the answer is 500.  
Action : Finish[500]  
  
Question: How much is the total invoice amount of company B, C, and D ?  
Thought : I need to get invoice amount of company B.  
Action : GetInvoice[B]  
Observation : 1500  
Thought : I need to get invoice amount of company C.  
Action : GetInvoice[C]  
Observation : 20000  
Thought : I need to get invoice amount of company D.  
Action : GetInvoice[D]  
Observation : 6700  
Thought : I need to get total amount of obtained amount B, C, and D.  
Action : Total[1500 20000 6700]  
Observation : 28200  
Thought : So the answer is 28200.  
Action : Finish[28200]  
  
Question: How much is the difference between company C and the total invoice amount of company A, D ?  
Thought : I need to get invoice amount of company C.  
Action : GetInvoice[C]  
Observation : 20000  
Thought : I need to get invoice amount of company A.  
Action : GetInvoice[A]  
Observation : 2000  
Thought : I need to get invoice amount of company D.  
Action : GetInvoice[D]  
Observation : 6700  
Thought : I need to get total amount of obtained amount A and D.  
Action : Total[2000 6700]  
Observation : 8700  
Thought : I need to get difference of obtained amount C and the total of A, D.  
Action : Diff[20000 8700]  
Observation : 11300  
Thought : So the answer is 11300.  
Action : Finish[11300]  
  
Question: How much is the difference between the total of company C, F and the total of company A, E ?  
Thought :  
`

下面是这个自定义ReAct链示例的源代码。

在这个源代码中，我定义了自定义工具和自定义代理，将这些所有组件（工具，代理和Azure OpenAI LLM）放在一起，最后运行链 agent_executor.run()
。

如果你想用非英语语言处理ReAct的提示，定制代理也会帮助你。

`import re  
from typing import Sequence, List, Tuple, Optional  
from langchain.agents.agent import Agent  
from langchain.prompts.prompt import PromptTemplate  
from langchain.prompts.base import BasePromptTemplate  
from langchain.tools.base import BaseTool  
from langchain.agents import Tool, initialize_agent, AgentExecutor  
from langchain.llms import AzureOpenAI  
  
##########  
# define tools  
##########  
  
company_dic = {  
  "A": 2000,  
  "B": 1500,  
  "C": 20000,  
  "D": 6700,  
  "E": 1000,  
  "F": 4100,  
}  
  
def get_invoice(company_name):  
  return company_dic[company_name]  
  
def diff(value_str):  
  str_list = value_str.split(" ")  
  assert(len(str_list) == 2)  
  int_list = [int(s) for s in str_list]  
  return str(abs(int_list[0] - int_list[1]))  
  
def total(value_str):  
  str_list = value_str.split(" ")  
  int_list = [int(s) for s in str_list]  
  return str(sum(int_list))  
  
tools = [  
  Tool(  
    name="GetInvoice",  
    func=get_invoice,  
    description="Get invoice amount of trading company.",  
  ),  
  Tool(  
    name="Diff",  
    func=diff,  
    description="Get diffrence.",  
  ),  
  Tool(  
    name="Total",  
    func=total,  
    description="Get total.",  
  ),  
]  
  
##########  
# define agent  
##########  
  
EXAMPLES = [  
  """Question: How much is the difference between the invoice of company A and company B ?  
Thought : I need to get invoice amount of company A.  
Action : GetInvoice[A]  
Observation : 2000  
Thought : I need to get invoice amount of company B.  
Action : GetInvoice[B]  
Observation : 1500  
Thought : I need to get difference of obtained amount between company A and company B.  
Action : Diff[2000 1500]  
Observation : 500  
Thought : So the answer is 500.  
Action : Finish[500]""",  
  """Question: How much is the total invoice amount of company B, C, and D ?  
Thought : I need to get invoice amount of company B.  
Action : GetInvoice[B]  
Observation 1: 1500  
Thought : I need to get invoice amount of company C.  
Action : GetInvoice[C]  
Observation : 20000  
Thought : I need to get invoice amount of company D.  
Action : GetInvoice[D]  
Observation : 6700  
Thought : I need to get total amount of obtained amount B, C, and D.  
Action : Total[1500 20000 6700]  
Observation : 28200  
Thought : So the answer is 28200.  
Action : Finish[28200]""",  
  """Question: How much is the difference between company C and the total invoice amount of company A, D ?  
Thought : I need to get invoice amount of company C.  
Action : GetInvoice[C]  
Observation : 20000  
Thought : I need to get invoice amount of company A.  
Action : GetInvoice[A]  
Observation : 2000  
Thought : I need to get invoice amount of company D.  
Action : GetInvoice[D]  
Observation : 6700  
Thought : I need to get total amount of obtained amount A and D.  
Action : Total[2000 6700]  
Observation : 8700  
Thought : I need to get difference of obtained amount C and the total of A, D.  
Action : Diff[20000 8700]  
Observation : 11300  
Thought : So the answer is 11300.  
Action : Finish[11300]""",  
]  
  
SUFFIX = """\nQuestion: {input}  
{agent_scratchpad}"""  
  
TEST_PROMPT = PromptTemplate.from_examples(  
  EXAMPLES, SUFFIX, ["input", "agent_scratchpad"]  
)  
  
class ReActTestAgent(Agent):  
  @classmethod  
  def create_prompt(cls, tools: Sequence[BaseTool]) -> BasePromptTemplate:  
    return TEST_PROMPT  
  
  @classmethod  
  def _validate_tools(cls, tools: Sequence[BaseTool]) -> None:  
    if len(tools) != 3:  
      raise ValueError("The number of tools is invalid.")  
    tool_names = {tool.name for tool in tools}  
    if tool_names != {"GetInvoice", "Diff", "Total"}:  
      raise ValueError("The name of tools is invalid.")  
  
  @property  
  def _agent_type(self) -> str:  
    return "react-test"  
  
  @property  
  def finish_tool_name(self) -> str:  
    return "Finish"  
  
  @property  
  def observation_prefix(self) -> str:  
    return f"Observation : "  
  
  @property  
  def llm_prefix(self) -> str:  
    return f"Thought : "  
  
  # This method is called by framework to parse text  
  def _extract_tool_and_input(self, text: str) -> Optional[Tuple[str, str]]:  
    action_prefix = f"Action : "  
    if not text.split("\n")[1].startswith(action_prefix):  
      return None  
    action_block = text.split("\n")[1]  
  
    action_str = action_block[len(action_prefix) :]  
    re_matches = re.search(r"(.*?)\[(.*?)\]", action_str)  
    if re_matches is None:  
      raise ValueError(f"Could not parse action directive: {action_str}")  
    return re_matches.group(1), re_matches.group(2)  
  
##########  
# run agent  
##########  
  
llm = AzureOpenAI(  
  deployment_name="davinci003-deploy",  
  model_name="text-davinci-003",  
  temperature=0,  
)  
agent = ReActTestAgent.from_llm_and_tools(  
  llm,  
  tools,  
)  
agent_executor = AgentExecutor.from_agent_and_tools(  
  agent=agent,  
  tools=tools,  
  verbose=True,  
)  
  
question = "How much is the difference between the total of company C, F and the total of company A, E ?"  
agent_executor.run(question)  
`

注意：为了简化，我已经修复了几个镜头样本中的可用工具，但最佳实践是在提示中列出可用工具，以防将来更改可用工具。

附注（于2023年6月新增）：现在可以使用新的启用函数的模型（ gpt-4-0613
和 gpt-3.5-turbo-0613
）来更可靠地执行GPT的函数调用推理。

当您运行此代码时，它将显示以下详细输出。

OpenAI不知道E公司和F公司的发票金额（因为我没有在少数例子中提供这些值），但它可以提供正确的答案，因为外部函数（在本例中， get_invoice()
， diff()
， total()
）在这个链中得到了正确的使用。

![](https://mmbiz.qpic.cn/mmbiz_jpg/CHD1E1Q314xoDzZNvhVr9zoKdoa9jbuKcCTF9EyTDZFAfwJeT1JzmU7lMpHLncqorTlJh7nyrtWnicficGESRzKA/640?wx_fmt=jpeg)

这是一个简单的例子，但您可以通过ReAct框架构建自己的实用逻辑，其中外部工具可以灵活地集成在LLM管道中。

例如，用户可以在旅行助理应用中请求餐馆和晚餐的推荐，并且AI代理然后将通过与外部数据库交互来向他们显示具有相关信息的结果，例如，估计的晚餐价格、座位的可用性等。

****记得关注哦，分享AIGC最前沿技术和思考****
