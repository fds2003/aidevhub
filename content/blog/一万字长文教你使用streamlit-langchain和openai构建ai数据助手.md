---
title: "一万字长文教你使用Streamlit、LangChain和OpenAI构建AI数据助手"
slug: "一万字长文教你使用streamlit-langchain和openai构建ai数据助手"
description: "作者： 稻谷编程 来源： 稻谷编程 随着大模型应用的不断深入，数据分析有可能不用写代码了，直接给大模型发文本指令，“快给我分析这个数据，找出规律，你这个驴！”于是大模型这个驴就真的开始自主分析数据，然后给出报告和图给你。 下面介绍一个基于Streamlit、Langchain框架和OpenAI结合的AI分析程序开发过程，可以造驴了！ 必备条件： Streamlit库、..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/ix_JutdOAgNXZv5AXiUmBA"
sourceName: "稻谷编程"
readingTime: "22 min"
createdAt: "2024-03-21T16:00:00.000Z"
publishedAt: "2024-03-21T16:00:00.000Z"
featured: false
---

作者： 稻谷编程  来源： [稻谷编程](https://mp.weixin.qq.com/s/ix_JutdOAgNXZv5AXiUmBA)

随着大模型应用的不断深入，数据分析有可能不用写代码了，直接给大模型发文本指令，“快给我分析这个数据，找出规律，你这个驴！”于是大模型这个驴就真的开始自主分析数据，然后给出报告和图给你。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1EX5vho3FWnjKO387hLTs0LWRTXYDtSWTzINZ8nt6sHzKBbYjvbCc6Q/640?wx_fmt=png&from=appmsg)

下面介绍一个基于Streamlit、Langchain框架和OpenAI结合的AI分析程序开发过程，可以造驴了！

必备条件：

****Streamlit库、LangChain库、OpenAI的Api Key****

前两者都是免费的，直接pip安装搞定，可那个OpenAI的api key就得需要美刀了。造驴也不容易，还得喂点粮草！

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1eTH4y1ZeIWEFkiaUrh0vEd3hk8aXWJl3ia83VR9ToSDWtibhdDLygaDag/640?wx_fmt=png&from=appmsg)
## 💻 Streamlit库

Streamlit 是一个功能强大且用户友好的 Python 库，在该项目中发挥着核心作用。它是我们数据科学人工智能助手的支柱。Streamlit 旨在简化使用最少代码创建交互式 Web 应用程序的过程。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd11zKBaGeOVIOP91ggicLX3gdtJKlGhdZfaklD6wV6gztlqKybt5hhc4Q/640?wx_fmt=png&from=appmsg)

从本质上讲，Streamlit 允许轻松地将数据脚本转换为可共享的 Web 应用程序。它是一个开源框架，无需广泛的 Web 开发技能，使用户能够专注于数据和分析，而不用担心 Web 应用程序的复杂性。

Streamlit 的一些主要功能包括：

- 

快速原型制作： Streamlit 以其快速原型制作功能而闻名。只需几行 Python 代码，就可以将脚本转变为功能性 Web 应用程序。

- 

交互元素： Streamlit 提供了各种交互元素，包括滑块、按钮和文本输入，允许用户与数据可视化交互并探索不同的场景。

- 

数据集成： Streamlit 与 Pandas 和 Matplotlib 等流行的数据科学库无缝集成，使其成为数据分析和可视化任务的多功能选择。

- 

定制：虽然 Streamlit 适合初学者，但它还为那些想要创建更复杂的应用程序的人提供定制选项。可以根据需要合并自定义 CSS、JavaScript 和小部件。

- 

部署： Streamlit 可以轻松地将 Web 应用程序部署到云或与其他人共享，从而进一步增强其协作数据项目的实用性。

在此项目中，Streamlit 是用户界面的基础，允许上传 CSV 文件、可视化数据并与 AI 助手无缝交互。

⛓️**Langchain框架**

Langchain 是一个框架，可用于构建能够理解和响应用户查询的对话式人工智能系统，使其成为人工智能聊天机器人和虚拟助手的宝贵工具。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1MVvjIcu6VibvIyFGTiaTct9ebIqw6eJS3Y0KOvWYqViaI9C19UUv21zxA/640?wx_fmt=png&from=appmsg)

其核心优势在于其数据感知和代理功能，使其非常擅长处理广泛的数据集并提供高效的查询功能。

其主要组成部分有：模型、代理、工具、提示模板、链、内存和索引。

- 

模型： LangChain 集成了一系列用于自然语言处理的多功能模型。这些有助于处理非结构化文本数据并促进基于用户查询的信息检索。

- 

代理：它们负责与用户输入进行交互并采用不同的模型来处理它们。代理在确定要采取的行动及其顺序方面发挥着关键作用。代理可以组合在一起创建更复杂和复杂的应用程序。

- 

工具：这些工具具有代理用来与其环境交互的功能。这些资源可以采用多功能实用程序（例如搜索功能）、链甚至其他代理的形式。

- 

提示模板：这些模板提供了构建用户查询提示的方法，随后可以将其传递给法学硕士进行处理。

- 

链：这些是协同工作以实现特定目标的模型序列。

- 

索引： LangChain 的索引功能对于组织文档至关重要，使法学硕士能够快速提取信息以响应用户查询。

- 

内存：内存组件使聊天机器人等应用程序能够回忆过去的交互，从而为用户提供个性化的响应，即使对于类似的查询也是如此。

****开发过程****

**####**📦 导入所需的包****

在深入研究 AI 助手的代码之前，了解我们将使用的 Python 包和模块非常重要。这些包为我们的项目提供了必要的功能。

`import os
from apikey import apikey
  

import streamlit as st
import pandas as pd
  

from langchain.llms import OpenAI
from langchain.agents import create_pandas_dataframe_agent
from dotenv import load_dotenv, find_dotenv
`

让我们仔细看看他们的作用：

- 

os：该库提供了一种使用操作系统相关功能的方法。在我们的脚本中，我们使用它来设置环境变量，例如 OpenAI API 密钥，以实现与 OpenAI 语言模型的安全通信。

- 

apikey：我们导入 apikey 模块，其中包含您的 OpenAI API 密钥。使用 OpenAI API 进行身份验证需要此密钥。

- 

Streamlit： Streamlit 是我们项目的核心。它使我们能够为人工智能助手创建一个用户友好的界面。

- 

pandas： pandas 库是数据操作和分析的基本工具。我们用它来处理用户上传的数据集，使数据探索变得容易。

- 

langchain.llms： langchain 包中的这个模块特定于我们的项目，并包含 OpenAI 的大型语言模型。它允许我们与语言模型交互以进行自然语言理解和生成。

- 

langchain.agents： langchain 的另一个模块，用于创建 Pandas DataFrame 代理。该代理帮助我们弥合数据操作和自然语言交互之间的差距。

- 

dotenv：该库用于从 .env 文件加载环境变量。它确保敏感信息（例如您的 OpenAI API 密钥）得到安全存储和访问。

导入这些包和模块使我们能够为 AI 助手配备必要的工具，使数据科学变得易于访问和参与。在以下部分中，我们将探讨这些组件如何组合在一起为数据分析创建动态和交互式体验。

**####**🗝️设置openAI密钥****

为了使脚本可以访问 API 密钥，需要将其设置为环境变量。在我们的代码中，我们使用该os
模块来实现此目的：

`  * 

os.environ['OPENAI_API_KEY'] = apikey
`

通过安全存储和设置您的 OpenAI API 密钥， AI 助手就可以利用 LLM 的功能以自然语言与您交互、回答问题并协助数据分析。这种安全设置可确保您的数据和交互保持私密性并受到保护。

**####**📕 添加标题和简介****

数据科学人工智能助手应该有一个友好且信息丰富的用户界面。

为了给AI助手命名，你可以使用st.title()
Streamlit提供的功能。此函数在 Web 应用程序的顶部显示一个大的、粗体的标题。您可以按如下方式设置标题：

`  * 

st.title('AI Assistant for Data Science 🤖')
`

设置标题后，必须提供介绍性消息，告知用户 AI 助手的用途和功能。此消息应该让用户在使用该应用程序时感到受欢迎和舒适。在脚本中，可以使用该st.write()
函数来显示简介：

`st.write("Hello 👋🏻 I am your AI Assistant, and I am here to help you with your data science problems.")
  

该st.write()
功能允许包含提供上下文的文本，并为用户与 AI 助手的交互奠定基础。
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1BwKLGa0zKicxybTXqmmSRV1dzAlVgjRr8icQibnUSUcsQQuT3icDVIxdBw/640?wx_fmt=png&from=appmsg)

🗒️ 添加标题和副标题

Streamlit 还允许向应用程序添加标题和子标题。

`st.header("Exploratory data analysis")
st.subheader("General information about the dataset")
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1Gszz8J4p4zeX6oqt0KicEfyDNlYbz8xKerHC1SvhBnj4umW3sBW0Stw/640?wx_fmt=png&from=appmsg)

添加标题、标题、副标题和简介可创建一个用户友好且引人入胜的环境。当用户使用 AI 助手开始数据科学之旅时，他们将确切地知道会发生什么，并感到更加轻松。

**####**💾 文本格式****

Streamlit 提供文本格式选项，使内容更具吸引力和信息量。可以使用 Markdown 将格式应用于文本。

以下是基本文本格式的一些示例：

粗体文本：要使文本粗体，请在文本周围使用双星号 (**
) 或双下划线 ( )。

`st.write("This is**bold** text.")
`

斜体文本：要使文本变为斜体，请在文本周围使用单个星号 ( *
) 或单个下划线 ( )。

`st.write("This is *italic* text.")
`

项目符号列表：*
使用列表项或-
后跟列表项创建项目符号列表。

`st.write("Here's a list:\n* Item 1\n* Item 2\n* Item 3")
`

Streamlit 还允许使用 HTML 但使用参数来自定义文本unsafe_allow_html=True
。例如，可以通过以下方式将标题置于侧边栏中的中心位置：

`st.caption('<p style="text-align:center">made with ❤️ by Ana</p>', unsafe_allow_html=True)
`

这些文本格式选项允许在 AI 助手中构建和强调重要信息。

**####**👩‍🏫 添加说明侧边栏****

解释侧边栏是 Streamlit 应用程序的一个重要组件，可以为用户提供额外的上下文和指导。

Streamlit 提供了一个st.sidebar
上下文管理器，允许将内容专门添加到应用程序的侧边栏。在脚本中，可以使用此上下文管理器来创建说明侧边栏：

`with st.sidebar:
    st.write("*Your Data Science Adventure Begins with a CSV Upload*")
    st.caption('''You may already know that every exciting data science journey starts with a dataset. That's why I'd love for you to upload a CSV file. Once we have your data in hand, we'll dive into understanding it and have some fun exploring it. Then, we'll work together to shape your business challenge into a data science framework. I'll introduce you to the coolest machine learning models, and we'll use them to tackle your problem. Sounds fun right?''')
  

上面的代码使用st.write()
和st.caption()
将文本和标题添加到侧边栏。您可以自定义此内容以提供有关 AI 助手的用途以及用户应采取的步骤的信息。
`

这将通过提供有关如何开始使用 AI 助手的清晰说明和指导来增强用户体验。用户将欣赏额外的背景信息，并在踏上数据科学冒险之旅时感到更加自信。

**####**✂️ 添加分隔线****

分隔线对于在视觉上分隔应用程序的不同部分非常有用，使用户更容易导航。

可以使用该st.divider()
功能插入水平线。以下是在脚本中添加分隔线的方法：

`  * 

st.divider()
`

可以在 AI 助手的各个部分之间放置分隔线，以创建干净且有组织的界面。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1wUQCF6wyk1HX1pWmFaItPCAKkFEjjvtTI37uls5xwzlgFWTQwjTfzw/640?wx_fmt=png&from=appmsg)

添加分隔线并应用文本格式，可以让为 AI 助手创建一个视觉上有吸引力且组织良好的界面。这不仅增强了用户体验，还使内容更易于访问和吸引人。

**####**🖲️ 在 Streamlit 中添加按钮和会话状态****

按钮是在 Streamlit 应用程序中触发操作或转换的常用方法。

这些元素允许用户启动特定操作并维护交互之间的信息。

可以使用st.button()
创建按钮元素：

`  *   * 

if st.button("Let's get started"):
    # Action to perform when the button is clicked
`

但是，按钮仅在单击按钮后立即加载页面期间短暂返回 True，然后恢复为 False。为了解决这个问题，Streamlit 允许管理会话状态，这对于维护应用程序不同部分之间的信息和交互至关重要。在脚本中，可以使用 st.session_state 对象来创建和管理会话状态变量：

`  *   *   *   *   *   *   *   *   *   *   * 

# Initialise a session state variable
if 'clicked' not in st.session_state:
    st.session_state.clicked = {1: False}
  

# Function to update the value in session state
def clicked(button):
    st.session_state.clicked[button] = True
  

# Button with callback function
if st.button("Let's get started", on_click=clicked, args=[1]):
    # Action to perform when the button is clicked
`

在上面的代码中，我们初始化一个名为 clicked 的会话状态变量，并在单击按钮时更新它。这使可以维护应用程序不同部分的信息和条件。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1lj2gmViaU5fBTvibfIY3Twb3xDsiakqQPdCQRPWPLJeYuyXeLOtwibpzGg/640?wx_fmt=png&from=appmsg)

按钮可以触发特定操作，会话状态有助于在整个用户交互过程中保持应用程序的一致状态。这将为用户创造互动和动态的体验。

**####**📁 添加文件上传器****

文件上传器是一项重要功能，它使用户能够上传自己的 CSV 文件，然后将其用于数据分析和探索。

Streamlit提供了一个方便的功能，称为st.file_uploader()
添加文件上传功能。以下是将其合并到脚本中的方法：

`user_csv = st.file_uploader("Upload your file here!", type="csv")
  

该st.file_uploader()函数接受一个标签作为其第一个参数（在本例中为“在此处上传您的文件！”）和一个可选type参数来指定接受的文件格式。我们将其设置为“csv”以确保用户只能上传 CSV 文件。
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1tYDewImITmEH3UCRIgibo3tonPvibVg1r0IAibuah5Ef3M7c99Tpwk0Tw/640?wx_fmt=png&from=appmsg)

一旦用户上传文件，该user_csv
变量将包含上传的文件数据。

**####**🪞 将 .csv 文件转换为数据框****

现在用户可以上传 CSV 文件，是时候将上传的文件转换为 Pandas DataFrame，这是 Python 中数据操作和分析的标准数据结构。

为此，我们可以使用以下代码：

`  *   *   * 

if user_csv is not None:
    user_csv.seek(0)
    df = pd.read_csv(user_csv, low_memory=False)
`

在上面的代码中，我们首先确保文件指针位于文件的开头（以防在其他地方使用它）。然后，我们将 CSV 文件读入名为 df 的 Pandas 数据帧中。

设置low_memory=False
意味着Pandas在读取CSV文件时不会优化内存使用。默认情况下，pandas 使用内存节省模式，以块的形式读取数据，试图最大限度地减少内存消耗。但是，设置low_memory=False
会禁用这种节省内存的模式，Pandas 会立即将整个数据集加载到内存中。

该数据框现在已准备好进行分析和探索。

**####**🔋加载我们的LLM模型****

我们的 AI 助手依靠大型语言模型 (LLM) 来提供自然语言理解并生成响应。

我们使用OpenAI LLM模型与用户交互：

`  * 

llm = OpenAI(temperature=0)
`

在此代码中，我们创建一个名为 llm 的模型实例。温度参数控制 LLM 响应的随机性，在这种情况下，值为 0 会使响应具有确定性。温度越高，模型越有创意。

LLM 模型是 AI 助手的重要组成部分，允许它以对话方式与用户进行通信和交互。它使助手能够以自然语言格式提供富有洞察力和信息丰富的响应。

**####**📢 使用我们的助手生成信息****

初始化 LLM 后， AI 助手现在可以理解用户查询、生成自然语言响应并协助数据分析。

为了生成信息，我们可以这样使用我们的 LLM 模型：

`  * 

steps_eda = llm("What steps are involved in EDA?")
`

在上面的代码中，向llm提出了一个问题，它生成一个响应，提供信息和解释，在本例中，是有关探索性数据分析中涉及的步骤的信息和解释。该信息保存在变量steps_eda中。

**####**🪗 将扩展器添加到侧边栏****

扩展器是 Streamlit 的一项重要功能，可组织内容并为用户提供在 Streamlit 应用程序的侧边栏中显示或隐藏其他信息的选项。

Streamlit 可以轻松使用该st.expander()
函数创建扩展器。我们可以在侧边栏中使用扩展器来显示有关 EDA 步骤的信息：

`  *   *   * 

with st.sidebar:
    with st.expander("What steps are involved in EDA?"):
        st.caption(steps_eda())
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1wwx6L4MpWQicOMQBhf2aibbrzjX3RFdZyJDhlLj3jFoylM3kmF8yPY6g/640?wx_fmt=png&from=appmsg)

这是一个扩展器。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1brqtqdicYpXnkOxQ2YreSM4Isia1bmwrvhkcpibOoDGUsYxqeQsMlgrMw/640?wx_fmt=png&from=appmsg)

用户可以选择通过单击箭头来展开信息。

扩展器非常适合组织和构建信息。扩展器的可折叠特性使界面保持干净且用户友好。

**####**🕵️ 创建 Pandas 代理****

LangChain的Pandas Agent是一个为高效处理数据集而量身定制的有价值的工具。它与 Pandas 数据框架无缝交互，提供高级查询功能。凭借一系列关键功能，它在分组、聚合、应用复杂的过滤条件以及无缝连接多个数据帧方面表现出色。该代理可以满足处理大量数据集、寻求高级查询和数据操作功能的开发人员的需求。

首先，需要通过传递 LLM 模型和要分析的 DataFrame 来创建 Pandas 代理的实例：

`pandas_agent = create_pandas_dataframe_agent(llm, df, verbose=True)
  

create_pandas_dataframe_agent()在此代码中，我们通过调用并传递 

LLM 和df
我们之前从上传的 CSV 文件转换的数据帧来创建一个名为 pandas_agent 的 Pandas 代理。
`

Pandas 代理现在可以执行各种数据分析任务。可以定义与常见数据分析操作相对应的功能，并且您的代理可以根据用户查询提供答案和见解。例如，可以创建函数来：

- 

解释数据框中列的含义。

- 

计算汇总统计数据，例如平均值、中位数和标准差。

- 

识别缺失值和重复值。

- 

进行相关性分析、异常值检测等。

**####**📉 使用 Pandas 代理回答有关数据的特定问题****

准备好 Pandas 代理后，现在可以使用它来回答特定问题并提供有关数据的见解。

Pandas 代理旨在理解并响应有关 DataFrame 的查询。以下是如何使用 Pandas 代理回答问题的示例：

`  *   *   * 

question = "What are the meanings of the columns?"
columns_meaning = agent.run(question)
st.write(columns_meaning)
`

在上面的代码中，Pandas 代理处理查询并生成响应，然后使用st.write()
.

对于我们的人工智能助手，我们将创建一个函数来对我们的数据集执行探索性数据分析：

`  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * 

def function_agent():
    st.write("**Data Overview**")
    st.write("The first rows of your dataset look like this:")
    st.write(df.head())
    st.write("**Data Cleaning**")
    columns_df = pandas_agent.run("What are the meaning of the columns?")
    st.write(columns_df)
    missing_values = pandas_agent.run("How many missing values does this dataframe have? Start the answer with 'There are'")
    st.write(missing_values)
    duplicates = pandas_agent.run("Are there any duplicate values and if so where?")
    st.write(duplicates)
    st.write("**Data Summarisation**")
    st.write(df.describe())
    correlation_analysis = pandas_agent.run("Calculate correlations between numerical variables to identify potential relationships.")
    st.write(correlation_analysis)
    outliers = pandas_agent.run("Identify outliers in the data that may be erroneous or that may have a significant impact on the analysis.")
    st.write(outliers)
    new_features = pandas_agent.run("What new features would be interesting to create?.")
    st.write(new_features)
    return
`

function_agent 函数旨在提供数据集的结构化概述，并使用 Pandas 代理执行各种与数据相关的任务。

`st.write("**Data Overview**"):该行使用 Streamlit 的功能显示节标题“数据概述” st.write()。它用于介绍数据分析过程的第一部分。
st.write("The first rows of your dataset look like this:"): 此行提供说明，通知用户他们将看到数据集的初始行。
st.write(df.head()):这里，df.head()用于显示变量 df 中存储的数据集的前几行。这是显示数据集的初始结构和内容的典型方式。
st.write("**Data Cleaning**"):与步骤 1 类似，此行引入了一个新部分“数据清理”。
columns_df = pandas_agent.run("What are the meaning of the columns?"):在这一行中，使用 pandas_agent.run 函数向 Pandas 代理提出了一个问题。要求代理解释数据集列的含义，并将响应存储在变量中columns_df。
st.write(columns_df):使用 来显示上一步中从 Pandas 代理获得的响应st.write()。这可以包括列内容或元数据的解释。
missing_values = pandas_agent.run("How many missing values does this dataframe have? Start the answer with 'There are'"):这次，Pandas 代理被要求计算数据集中的缺失值，并返回以“There are”开头的响应。
st.write(missing_values):显示从 Pandas 代理获得的缺失值的计数。
duplicates = pandas_agent.run("Are there any duplicate values and if so where?"):在这里，Pandas 代理的任务是识别和指定数据集中任何重复值的位置。
st.write(duplicates):显示 Pandas 代理关于重复项的响应。
st.write("**Data Summarisation**"):此行引入了一个新部分“数据摘要”。
st.write(df.describe()):该describe方法用于生成数据集的汇总统计数据。该行显示这些统计数据以概述数字数据特征。
correlation_analysis = pandas_agent.run("Calculate correlations between numerical variables to identify potential relationships."):Pandas 代理被要求对数据集中的数值变量之间进行相关性分析，以识别潜在的关系。
st.write(correlation_analysis):显示相关性分析的结果。
outliers = pandas_agent.run("Identify outliers in the data that may be erroneous or that may have a significant impact on the analysis."):Pandas 代理的任务是识别并提供有关数据集中异常值的信息。
st.write(outliers):显示 Pandas 代理有关异常值的响应。
new_features = pandas_agent.run("What new features would be interesting to create?."):Pandas 代理被要求建议基于数据集创建的可能有趣的新功能。
st.write(new_features):将显示建议的新功能。
`

该功能本质上引导用户完成各种数据分析任务，使用 Pandas 代理提供见解并对数据集执行特定的数据相关操作。它将过程组织成不同的部分，并向用户提供解释和结果。

为了兼顾用户体验地显示该函数的答案，我们可以编写以下代码：

`  *   *   * 

st.header('Exploratory data analysis')
st.subheader('General information about the dataset')
function_agent()
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1JHflDLaqrFgWVwy00iaHdK1NJyFAfoDAHGFTgW5MvY0bDdoWLAVQtzQ/640?wx_fmt=png&from=appmsg)

****🗞️ Streamlit 中的缓存****

缓存是 Streamlit 中的一项重要功能，允许存储和重用函数的结果。这显着提高了 AI 助手的性能和响应能力。在本小节中，我们将探讨如何在 Streamlit 中为函数使用缓存。

Streamlit 提供了@st.cache_data
装饰器，可以将其应用于要缓存的函数。

`  *   *   *   * 

@st.cache_data
def your_function():
    #what your function does
    return
`

在 AI 助手的脚本中，我们将缓存所有函数以避免它们重新运行。当将来使用相同的输入参数调用该函数时，Streamlit 将使用缓存的结果而不是重新计算它。

缓存有助于减少计算时间并确保流畅的用户体验，特别是在处理涉及数据处理或检索的功能时。

**####**📈 使用 Streamlit 数据可视化功能****

数据可视化是数据分析和呈现的一个重要方面。Streamlit 提供了一系列数据可视化功能，允许您在 AI Assistant 中创建交互式图表、绘图和数据的可视化表示。

Streamlit 支持各种图表库，例如 Matplotlib、Plotly 和 Altair。您可以使用这些库创建交互式图表，例如线图、条形图、散点图等。您可以自定义图表的外观和交互性，以最好地传达您想要与用户分享的见解。

滑块、按钮和文本输入等交互式小部件可以与可视化结合使用，以允许用户调整参数、应用过滤器和交互式探索数据。

**####**📡 使用 Pandas 代理回答有关用户选择的变量的特定预定义问题****

AI 助手的强大功能之一是它能够回答有关用户选择的变量的特定问题。Pandas 代理与 Streamlit 相结合，使这种交互信息丰富且用户友好。

我们可以用来text_input()
允许用户从数据集中选择他们想要进一步探索的变量：

`user_question_variable = st.text_input("What variable are you interested in?")
  

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1RyROVKHxvyqGn6iaffs06g6xEKdnGjfUVr2K85ic7s4E4AGnI6oSW9ZA/640?wx_fmt=png&from=appmsg)
`

有了用户选择的变量，我们的 Pandas 代理就可以接手回答有关该变量的特定问题。

该function_question_variable
功能专注于执行各种数据分析任务并总结与数据集中感兴趣的特定变量相关的信息。

`def function_question_variable():
st.line_chart(df, y = [user_question_variable])
summary_statistics = pandas_agent.run(f"What are the mean, median, mode, standard deviation, variance, range, quartiles, skewness and kurtosis of {user_question_variable}")
st.write(summary_statistics)
normality = pandas_agent.run(f"Check for normality or specific distribution shapes of {user_question_variable}")
st.write(normality)
outliers = pandas_agent.run(f"Assess the presence of outliers of {user_question_variable}")
st.write(outliers)
trends = pandas_agent.run(f"Analyse trends, seasonality, and cyclic patterns of {user_question_variable}")
st.write(trends)
missing_values = pandas_agent.run(f"Determine the extent of missing values of {user_question_variable}")
st.write(missing_values)
return
  

  

st.line_chart(df, y=[user_question_variable]):该线使用 Streamlit 函数生成折线图st.line_chart()。该图表可视化 df 数据集中的数据，特别是 表示的变量user_question_variable。
summary_statistics = pandas_agent.run(f"What are the mean, median, mode, standard deviation, variance, range, quartiles, skewness, and kurtosis of {user_question_variable}"):Pandas 代理被指示计算并提供 中指定的变量的摘要统计信息user_question_variable。
st.write(summary_statistics):使用 st.write 函数显示从 Pandas 代理获取的摘要统计信息。这提供了变量特征的简明概述。
normality = pandas_agent.run(f"Check for normality or specific distribution shapes of {user_question_variable}"):Pandas 代理的任务是评估分布的正态性或识别相关变量的特定分布形状。该信息存储在normality变量中。
st.write(normality):正态性评估的结果通过该st.write()功能呈现给用户。
outliers = pandas_agent.run(f"Assess the presence of outliers of {user_question_variable}"):Pandas 代理被指示评估指定变量中是否存在异常值。
st.write(outliers):显示 Pandas 代理提供的异常值评估结果。
trends = pandas_agent.run(f"Analyse trends, seasonality, and cyclic patterns of {user_question_variable}"):Pandas 代理需要分析与 表示的变量相关的趋势、季节性和循环模式user_question_variable。
st.write(trends):趋势、季节性和循环模式分析的结果呈现给用户。
missing_values = pandas_agent.run(f"Determine the extent of missing values of {user_question_variable}"):Pandas 代理用于确定特定变量内缺失值的程度。
st.write(missing_values):显示 Pandas 代理提供的有关缺失值的存在和程度的信息。
`

该功能提供对所选变量的全面分析，范围从基本可视化到汇总统计、分布评估、异常值检测、趋势分析和缺失值评估。它允许用户更深入地了解数据集中变量的特征和行为。

为了存储用户变量并显示答案，我们可以使用文本输入编写以下代码：

`  *   *   * 

user_question_variable = st.text_input('What variable are you interested in')
if user_question_variable is not None and user_question_variable !="":
    function_question_variable()
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1rnMdOGoqKmuJJXvgLCQ11ticK3y2ZV2M6pBT6ZD822uJ6ib91MW9ZMHA/640?wx_fmt=png&from=appmsg)

**####**🐼 使用 Pandas 代理回答用户选择的特定问题****

除了预定义的问题之外，我们还可以使 AI 助手能够回答用户提出的自定义问题。这种灵活性允许用户查询对他们最重要的数据的特定方面。

用户可能想询问与他们的分析相关的数据的任何问题。

- 

“两个特定变量之间的相关性是什么？”

- 

“数据集中是否有缺失值？”

- 

“你能总结出某个变量在特定时间范围内的数据吗？”

这些问题不是预先定义的，但可以即时询问，使人工智能助手能够高度适应用户需求。

当用户提出自定义问题时，我们可以让 AI 助手将查询引导至 Pandas 代理。代理将处理问题并执行必要的数据分析任务以生成有意义的响应。例如，如果用户询问“‘变量 A’和‘变量 B’之间的相关性是什么？”，Pandas 代理将计算相关系数并提供信息丰富的响应。

此功能使我们的人工智能助手成为一种多功能且以用户为中心的数据分析工具。它适应个人用户的独特查询和要求，使他们能够与数据交互并获得对其分析很重要的见解。

我们脚本中的 function_question_dataframe 函数旨在让用户能够询问有关整个数据帧的特定问题并使用 Pandas 代理接收响应。

`  *   *   *   * 

def function_question_dataframe():
dataframe_info = pandas_agent.run(user_question_dataframe)
st.write(dataframe_info)
return
`

- 

dataframe_info = pandas_agent.run(user_question_dataframe):
此行将用户提供的问题或请求（存储在变量 user_question_dataframe 中）发送到 Pandas 代理。然后 Pandas 代理处理这个问题。

- 

st.write(dataframe_info):
Pandas 代理生成的响应用于回答用户的问题，并显示给用户。

function_question_dataframe 函数充当用户友好的界面，用于查询整个数据框并根据用户的特定数据探索和分析需求获取信息响应。

为了存储用户问题并显示答案，我们可以使用文本输入编写以下代码：

`  *   *   *   *   *   * 

 if user_question_variable:
    user_question_dataframe = st.text_input( "Is there anything else you would like to know about your dataframe?")
        if user_question_dataframe is not None and user_question_dataframe not in ("","no","No"):
            function_question_dataframe()
        if user_question_dataframe in ("no", "No"):
            st.write("")
`
![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1aBIEJxstxOrKJVCeaMWICMvpIEy14c20PVB9PxxW0ibe1TvevLRPGOQ/640?wx_fmt=png&from=appmsg)

💭 剧本思路

LangChain 框架的一个显着特点是它能够提供脚本在执行过程中的思维过程的可见性。这使我们能够深入了解智能体如何得出结论并产生结果，揭示为得出这些结果而进行的具体计算。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1jx2u6l9y5nQ56uiaWpQqKRWnY8v0xHsKEib5E0Yax3K8VibL6icDJxpibDA/640?wx_fmt=png&from=appmsg)

详细的执行日志可以方便地显示在终端上，为框架的内部工作提供透明且信息丰富的一瞥。

至此AI数据助手就完成了。国内应该可以借助于千问模型或者讯飞星火大模型的API实现类似的开发，后续可以试试。

![](https://mmbiz.qpic.cn/mmbiz_png/Xs8vpUmQlUsdCseBTSF5EE9U8R4cLKd1fic4tk8jocib9EBQcMZoNZmkmyWTlr4LRiatSib8CXCtWmoSfbvdzvBNJw/640?wx_fmt=png&from=appmsg)
更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
