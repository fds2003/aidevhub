---
title: "阿里云PAI大模型RAG对话系统最佳实践"
slug: "阿里云pai大模型rag对话系统最佳实践"
description: "作者： 云推荐服务 来源： 云推荐服务 本文涉及的产品 交互式建模 PAI-DSW，5000CU*H 3个月 去年4月至9月，阿里云人工智能平台 PAI 团队与大数据基础工程技术团队合作，构建了基于知识库检索增强的大模型答疑对话机器人，并在阿里云官方答疑链路、研发小蜜、钉钉大数据技术服务助手等多个线上场景上线，显著提升答疑效率。相关文档：【万字长文】基于阿里云PAI搭建..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/ePKKUpJFZovmFnrrz9MZlQ"
sourceName: "云推荐服务"
readingTime: "22 min"
createdAt: "2024-03-24T16:00:00.000Z"
publishedAt: "2024-03-24T16:00:00.000Z"
featured: false
---

作者： 云推荐服务  来源： [云推荐服务](https://mp.weixin.qq.com/s/ePKKUpJFZovmFnrrz9MZlQ)

本文涉及的产品

交互式建模 PAI-DSW，5000CU*H 3个月

去年4月至9月，阿里云人工智能平台 PAI 团队与大数据基础工程技术团队合作，构建了基于知识库检索增强的大模型答疑对话机器人，并在阿里云官方答疑链路、研发小蜜、钉钉大数据技术服务助手等多个线上场景上线，显著提升答疑效率。相关文档：[【万字长文】基于阿里云PAI搭建知识库向量检索增强的大模型对话系统](https://mp.weixin.qq.com/s?spm=a2c6h.13046898.publish-article.36.6df46ffaIH1aza&__biz=Mzg4MzgxNDk2OA==&mid=2247491025&idx=1&sn=c9142c75652940395db8f12789688c97&scene=21#wechat_redirect)

上线几个月来，随着 RAG 技术日趋火热，我们保持对线上链路的迭代，不断加入学界业界最新的 RAG 优化技术（eg: advanced RAG），改进了包括**知识入库** 、** query 改写** 、**多路检索** 、**召回融合** 、**结果重排序** 、**prompt 工程** 等在内的多个 RAG 模块，线上提效显著。**文中包含上述模块线上调优中积累的部分 Tricks，更多优化细节欢迎联系我们业务合作****（钉钉群号：42250004375）****。**

目前本轮优化已上线阿里云官网最佳实践，并开源在 PAI-RAG 代码库中。随着 RAG 技术迅猛发展，我们在不断跟进最新优化技术，并迭代加入代码库与最佳实践中。

- 

阿里云官网：阿里云大模型RAG对话系统最佳实践

- 

开源代码库

本文为大模型RAG对话系统最佳实践，旨在指引AI开发人员如何有效地结合LLM大语言模型的推理能力和外部知识库检索增强技术，从而显著提升对话系统的性能，使其能更加灵活地返回用户查询的内容。适用于问答、摘要生成和其他依赖外部知识的自然语言处理任务。通过该实践，您可以掌握构建一个大模型RAG对话系统的完整开发链路。

## 1. 背景信息

大语言模型（LLM）在生成准确和实时的回复方面存在局限性，不适合直接用于需要精确信息的客服或问答等场景。当前业界普遍采用基于检索增强的RAG技术来改善LLM的表现。该方法通过结合LLM的归纳生成能力和向量检索库的检索能力，增强对用户查询的理解，并产生更加可靠的回复。

检索增强生成（Retrieval-Augmented Generation, RAG）技术结合了大语言模型（LLM），如通义千问，与信息检索系统，以提高文本生成的准确性和丰富度。在响应用户查询时，RAG首先利用检索系统从知识库中检索相关内容，然后将检索到的内容与原始查询一同输入大语言模型（LLM），从而让语言模型不用重新训练就能够获取最新的信息，并产生可靠的输出。RAG特别适用于问答、摘要生成和其他依赖外部知识的自然语言处理任务，同时还支持定制化提示（Prompt）和基于检索的多轮对话管理，类似于LangChain，从而进一步优化用户交互体验和答案质量。

## 1.1方案架构

![](https://mmbiz.qpic.cn/mmbiz_png/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5zRuywKVsZ88O9t3ZjSIr9uwzUTmZrrkBwy0knWuIyRITQZHczUibWtg/640?wx_fmt=png&from=appmsg)

本方案包括以下功能模块：

- 

向量检索库准备：根据场景需求选择开通Hologres、AnalyticDB PostgreSQL或ElasticSearch，或使用Faiss作为向量检索库供后续RAG对话系统链路使用。

- 

对话模型推理服务在线部署：您可以在EAS中将对话模型部署为在线服务，以供后续RAG对话系统链路中调用模型服务。

- 

RAG服务在线部署：您可以在EAS中部署LangChain的WebUI服务。

- 

在WebUI界面进行知识问答：打开RAG服务的WebUI应用，然后串联自定义的业务数据进行知识问答，验证对话系统的效果。

## 2. 前提条件

- 

已开通PAI（EAS）并创建了默认工作空间。具体操作，请参见开通PAI并创建默认工作空间。

- 

如果使用RAM用户来部署模型，需要为RAM用户授予EAS的管理权限，详情请参见云产品依赖与授权：EAS。

- 

已创建一个专有网络VPC、交换机和安全组。详情请参见创建和管理专有网络和创建安全组。

- 

**已购买灵骏智算资源。具体操作，请参见灵骏智算资源配额。**如果不做大规模预训练与微调，仅做应用部署，则可跳过该步骤。****

****说明****

● 仅在华北6（乌兰察布）地域支持购买灵骏资源，且需要开通白名单。

● 当前灵骏智算资源仅供白名单用户受限申请使用，如果您希望使用灵骏智算资源，您可先提交工单，申请添加灵骏智算使用白名单。

## 3. 步骤一：准备向量检索库

具体步骤一，请参见文档

您可以选择以下任意一种产品构建本地向量库：

- 

Faiss（Facebook AI Similarity Search）

- 

Hologres

- 

AnalyticDB PostgreSQL

- 

Elasticsearch

其中，Faiss无需开通或购买即可使用，Hologres、AnalyticDB PostgreSQL和ElasticSearch需要开通并准备相应的WebUI界面配置参数。后续您可以使用准备好的参数连接向量检索库。

## 3.1 Hologres

- 

开通Hologres实例并创建数据库。具体操作，请参见购买Hologres。您需要将已创建的数据库名称保存到本地。

- 

在实例详情页面查看调用信息。

`1. 单击实例名称，进入**实例详情** 页面。

2. 在**网络信息** 区域，单击**指定VPC** 后的**复制** ，将域名:80前面的内容保存到本地。
`

- 切换到**账号管理** Tab页，创建自定义用户。并将账号和密码保存到本地，后续用于连接Hologres实例。具体操作，请参见创建自定义用户。

其中：**选择成员角色** 选择**实例超级管理员（SuperUser）** 。
## 3.2 AnalyticDB for PostgreSQL

在AnalyticDB for PostgreSQL版控制台上创建实例。具体操作，请参见创建实例。其中：**向量引擎优化** 选择**开启** 。

单击实例名称，进入**基本信息** 页面，在该页面中的**数据库连接信息** 区域，复制内网地址和外网地址并保存到本地。

****说明****

● 如果没有外网地址，您需要单击申请外网地址来获取。具体操作，请参见管理外网地址。

● 如果在同一个VPC内连接实例，只需使用内网地址。

● 创建数据库账号，并将数据库账号和密码保存到本地，后续用于连接数据库。具体操作，请参见创建数据库账号。

● 配置白名单为0.0.0.0/0。具体操作，请参见设置白名单。

## 3.3 ElasticSearch

- 创建阿里云Elasticsearch实例。具体操作，请参见创建阿里云Elasticsearch实例。其中：

`***选择服务** 选择**通用商业版** 。

***场景初始化配置** 选择**通用场景** 。

* 您需要将在**网络及系统配置** 向导页面配置的**登录名** 和**登录密码** 保存到本地。
`

- 单击实例名称，进入实例**基本信息** 页面。在该页面获取**私网地址** 和**私网端口** 并保存到本地。

## 3.4 Faiss

使用Faiss构建本地向量库，无需购买线上向量库产品，免去了线上开通向量库产品的复杂流程，更轻量易用。

## 4. 步骤二：部署模型服务

具体步骤二，请参见文档

在本方案的RAG对话系统链路中，需要部署对话模型推理服务和RAG服务，分别作为与用户交互的对话模型和知识文档预处理步骤的QA提取模型。具体操作步骤如下：

## 4.1 部署对话模型推理服务

您可以使用自定义的数据微调训练对话模型并部署为推理服务，具体操作，请参见灵骏分布式训练和部署模型。本方案以预置镜像为例，介绍如何部署对话模型推理服务：

- 进入**PAI-EAS 模型在线服务** 页面。

`1. 登录PAI控制台。

2. 在左侧导航栏单击**工作空间列表** ，在工作空间列表页面中单击待操作的工作空间名称，进入对应工作空间内。

3. 在工作空间页面的左侧导航栏选择**模型部署>模型在线服务（EAS）** ，进入**PAI-EAS 模型在线服务** 页面。
`
![](https://mmbiz.qpic.cn/mmbiz_png/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5jOSoWgAQxibQ00f7FgHxziaVvuKeo49kf5NZyLrQBbtO8XPv3eSQXL2w/640?wx_fmt=png&from=appmsg)

在**PAI-EAS 模型在线服务** 页面，单击**部署服务** ，在弹出对话框中，选择**自定义部署** ，然后单击**确定** 。

- 

**在**部署服务** 页面，配置以下关键参数。**

**参数
描述**

****服务名称**
自定义服务名称。**

**部署方式
选择**镜像部署AI-Web应用** 。

**镜像选择
在**PAI平台镜像** 列表中选择**chat-llm-webui** ；镜像版本选择**2.0** 。**说明** 由于版本迭代迅速，部署时镜像版本选择最高版本即可。

****运行命令**
不同的模型类型对应的运行命令如下：**

- 

**使用**chatglm2-6b** 模型进行部署：python webui/webui_server.py –port=8000 –model-path=THUDM/chatglm2-6b**

- 

**使用**通义千问-7b** 模型进行部署：python webui/webui_server.py –port=8000 –model-path=Qwen/Qwen-7B-Chat**

- 

**使用**llama2-7b** 模型进行部署：python webui/webui_server.py –port=8000 –model-path=meta-llama/Llama-2-7b-chat-hf**

- 

**使用**Llama2-13b** 模型进行部署：python webui/webui_server.py –port=8000 –model-path=meta-llama/Llama-2-13b-chat-hf –precision=fp16**

****端口号** 配置为：8000。**

**资源组种类
选择**公共资源组** 。

**资源配置方法
选择**常规资源配置** 。

**资源配置选择
必须选择**GPU** 类型，**实例规格** 推荐使用**ml.gu7i.c16m60.1-gu30** （性价比最高）。

****专有网络配置****

- 

当选择Hologres、AnalyticDB for PostgreSQL或ElasticSearch作为向量检索库时，请确保所配置的专有网络与选定的向量检索库保持一致。

- 

当选择Faiss作为向量检索库时，请随意选择一个专有网络。

单击**部署** ，等待一段时间即可完成模型部署。当**服务状态** 为**运行中** 时，表明服务部署成功。

- 

获取VPC地址调用的服务访问地址和Token。

`1. 单击服务名称，进入**服务详情** 页面。

2. 在**基本信息** 区域，单击**查看调用信息** 。

3. 在**调用信息** 对话框的**VPC地址调用** 页签，获取服务访问地址和Token，并保存到本地。
`
## 4.2 部署RAG服务并启动WebUI

PAI提供了最方便快捷的部署方式，您可以直接在EAS中选择指定的镜像即可部署RAG的WebUI服务，具体操作步骤如下。更多关于RAG链路的详细内容，请参见GitHub开源代码。

[https://github.com/aigc-apps/PAI-RAG](https://github.com/aigc-apps/PAI-RAG)

在**PAI-EAS 模型在线服务** 页面，单击**部署服务** ，在弹出对话框中，选择**自定义部署** ，然后单击**确定** 。

- 

**在**部署服务** 页面，配置以下关键参数。**

****参数****

****描述****

****服务名称****

**自定义服务名称。本案例使用的示例值为：**chatbot_langchain_vpc** 。**

****部署方式****

**选择**镜像部署AI-Web应用** 。**

****镜像选择****

在**PAI平台镜像** 列表中选择**chatbot-langchain** ，镜像版本选择**1.0** 。

由于版本迭代迅速，部署时镜像版本选择最高版本即可。

****运行命令****

- 

服务运行命令：uvicorn webui:app –host 0.0.0.0 –port 8000

- 

**端口号输入：**8000** 。**

****资源组种类****

**选择**公共资源组** 。**

****资源配置方法****

必须选择**GPU** 类型，实例规格推荐使用**ml.gu7i.c16m60.1-gu30** （性价比最高）。

- 

**额外系统盘：**70G** 。**

****专有网络配置****

- 

当选择Hologres、AnalyticDB for PostgreSQL或ElasticSearch作为向量检索库时，请确保所配置的专有网络与选定的向量检索库保持一致。

- 

当选择Faiss作为向量检索库时，与对话模型推理服务配置的专有网络保持一致。

单击**部署** ，等待一段时间即可完成模型部署。当**服务状态** 为**运行中** 时，表明服务部署成功。

服务部署成功后，单击**服务方式** 列下的**查看Web应用** ，进入WebUI页面。

## 5. 步骤三：在WebUI页面进行知识问答

具体步骤三，请参见文档

目前RAG对话系统支持集成两类知识库文档类型：HTML和TEXT。以下内容为您介绍两种文档类型支持的产品能力。

## 5.1 场景一：面向HTML文档的检索增强大模型对话系统

**####**1、自定义配置参数****

**如下图所示，您可以在RAG服务WebUI界面的**Settings** 选项卡中，配置本系统的参数，并测试连接是否正常。**

![](https://mmbiz.qpic.cn/mmbiz_png/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5YGwHCia11pZfNaukrTDiag6CMibK93W4ul3ricfYdHj4TwxjMLrfYz1FIA/640?wx_fmt=png&from=appmsg)

具体参数配置详情如下：

*****Emebdding Model** ：支持选择5种embedding model和对应的维度（Emebdding Dimension）。推荐使用SGPT-125M-weightedmean-nli-bitfit。**

*****Emebdding Dimension** ：选择Emebdding Model后，系统会自动进行配置，无需手动操作。**

*****EAS Url** ：配置为步骤二中获取的服务访问地址。**

*****EAS Token** ：配置为步骤二中获取的服务Token。**

- 配置Vector Store。不同的向量检索库对应的参数配置详情如下：

****Hologres****

- 

Host：配置为步骤一中查询到的Hologres调用信息。

- 

Database：配置为步骤一中创建的数据库名称。

- 

User：配置为步骤一中创建的自定义用户的账号。

- 

Password：配置为步骤一中创建的自定义用户的密码。

- 

Table：配置数据库表名称，例如test_table。

**以上参数配置完成后，单击**Connect Hologres** ，验证Hologres实例是否连接正常。**

****AnalyticDB****

- Host：配置为步骤一中获取的数据库连接外网地址。

****说明****

如果在同一个VPC内连接实例，只需使用内网地址。

- 

User：配置为步骤一中创建的数据库账号。

- 

Database：配置为数据库名称。您可以登录数据库后进行查看，如何登录数据库，请参见登录数据库。

![](https://mmbiz.qpic.cn/mmbiz_png/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5PQbEiarKPKTcwyVdJeiaaeVXZdGGf1sCiaibFynsdOtr4F2y7xhNGREDLA/640?wx_fmt=png&from=appmsg)

- 

Password：配置为步骤一中创建的数据库密码。

- 

**CollectionName：用户自定义的数据库表名称。例如**langchain_document** 。**

- 

Pre_delete：是否删除已存在的Database。取值为：True（删除）、False（不删除）。

****ElasticSearch****

- 

URL：配置为步骤一中获取的私网地址和端口，格式为：http://私网地址:端口

- 

Index：用户自定义的索引名称。

- 

User：配置为步骤一中创建ElasticSearch实例时配置的登录名。

- 

Password：配置为步骤一中创建ElasticSearch实例时配置的登录密码。

**以上参数配置完成后，单击**Connect ElasticSearch** ，验证ElasticSearch实例是否连接正常。**

****Faiss****

- 

**Path：用户自定义的数据库文件夹名称。例如**faiss_path** 。**

- 

**Index：用户自定义的索引文件夹名称。例如**faiss_index** 。**

此外，您还可以在**Settings** 选项卡中上传JSON配置文件，并单击**Parse config** 来解析配置文件。解析成功后，WebUI页面将自动根据配置文件内容填写相应配置。不同的向量检索库对应的配置文件内容如下：

****Hologres****

`{  
  "embedding": {  
    "model_dir": "embedding_model/",  
    "embedding_model": "SGPT-125M-weightedmean-nli-bitfit",  
    "embedding_dimension": 768  
  },  
  
  "EASCfg": {  
    "url": "http://xx.vpc.pai-eas.aliyuncs.com/api/predict/chatllm_demo_glm2",  
    "token": "xxxxxxx=="  
  },  
  
  "vector_store": "Hologres",  
  
  "HOLOCfg": {  
    "PG_HOST": "hgpostcn-cn.xxxxxx.vpc.hologres.aliyuncs.com",  
    "PG_PORT": "80",  
    "PG_DATABASE": "langchain",  
    "PG_USER": "user",  
    "PG_PASSWORD": "password"  
  }  
}
`

****AnalyticDB****

`{  
  "embedding": {  
    "model_dir": "embedding_model/",  
    "embedding_model": "SGPT-125M-weightedmean-nli-bitfit",  
    "embedding_dimension": 768  
  },  
  
  "EASCfg": {  
    "url": "http://xx.pai-eas.aliyuncs.com/api/predict/chatllm_demo_glm2",  
    "token": "xxxxxxx=="  
  },  
  
  "vector_store": "AnalyticDB",  
  
  "ADBCfg": {  
    "PG_HOST": "gp.xxxxx.rds.aliyuncs.com",  
    "PG_USER": "xxxxxxx",   
    "PG_DATABASE": "xxxxxxx",   
    "PG_COLLECTION_NAME": "xxxxxxx",  
    "PG_PASSWORD": "passwordxxxx"  
  }  
}
`

****ElasticSearch****

`{  
  "embedding": {  
    "model_dir": "embedding_model/",  
    "embedding_model": "SGPT-125M-weightedmean-nli-bitfit",  
    "embedding_dimension": 768  
  },  
  
  "EASCfg": {  
    "url": "http://xx.pai-eas.aliyuncs.com/api/predict/chatllm_demo_glm2",  
    "token": "xxxxxxx=="  
  },  
  
  "vector_store": "ElasticSearch",  
  
  "ElasticSearchCfg": {  
    "ES_URL": "http://es-cn-xxx.elasticsearch.aliyuncs.com:9200",  
    "ES_USER": "elastic",  
    "ES_PASSWORD": "password",  
    "ES_INDEX": "test_index"  
  }  
}
`

****Faiss****

`{  
  "embedding": {  
    "model_dir": "embedding_model/",  
    "embedding_model": "SGPT-125M-weightedmean-nli-bitfit",  
    "embedding_dimension": 768  
  },  
  
  "EASCfg": {  
    "url": "http://xx.vpc.pai-eas.aliyuncs.com/api/predict/chatllm_demo_glm2",  
    "token": "xxxxxxx=="  
  },  
  
  "vector_store": "FAISS",  
  
  "FAISS": {  
    "index_path": "faiss_index",  
    "index_name": "faiss_file"  
  }  
}
`
其中：**EASCfg** 即为在步骤二中获取的对话模型推理服务的访问地址和Token。**HOLOCfg** 即为Hologres的相关配置。您可以参考WebUI界面参数说明进行配置。

**####**2、上传HTML文件****

**在RAG服务的WebUI页面中，切换到**Upload** 选项卡中，在该页面配置以下参数，并上传HTML类型的用户知识库文档。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ577gBqwMGmJot60rRfmTVUKv2kYTrSHibevFmVvwOqia4xPAVadOqTic1A/640?wx_fmt=jpeg&from=appmsg)

其中：

***Which type of files do you want to upload?** ：选择**html** 。
***Files** ：参考界面操作指引上传知识库文档，然后单击**Upload** 。支持多文件上传，文件格式为：HTML。
***Directory** ：参考界面操作指引上传包含知识库文档的目录，然后单击**Upload** 。

您可以使用PAI提供的rag_chatbot_test_doc.html知识库文档进行Mock测试。

**####**3、文档清洗与切分****

在构建向量检索库前，系统会对您所上传的HTML源码文件进行文本处理。包括**数据清洗** （文本提取、超链替换等）和**语义切块** （chunk）。
![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5V4nMbBoCnyVfl871kXiadbI0B2C4Mbo5D3oN4sFKDFCibwBuu1hxCvGw/640?wx_fmt=jpeg&from=appmsg)

**您可以通过设置**rank label** 参数，来控制语义切块的粒度大小，默认为h2。**

**####**4、QA提取****

将原始的知识文档输入LLM，输出针对该文档的若干QA对，并在后续构建数据库时，用生成的问题Q作为检索index，答案A作为文档内容返回。该方法对知识文档进行语义级别的细粒度划分，使得检索到的文档与用户Query相关度更高，提高信噪比。但QA提取方法依赖于LLM的能力，因此会带来更高的计算开销和时间开销。常用的QA提取方法包括 RefGPT等。

Tricks：对于高信息量、长上下文的知识文档，适合采用QA Extraction方法，将文档划分为更细粒度、信噪比更高的QA子文档。

本方案支持针对**官方文档** 自动**提取QA** 对，以获得更好的检索和回答效果。
![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5XXbu99fCUdfttZNwrntQIC0BdbtagNoZpPdZFKMwia99gOcJxdLhQOg/640?wx_fmt=jpeg&from=appmsg)

以阿里云官方技术文档为例，为您展示提取得到的QA数据。系统会根据您上传的知识库文档自动提取QA对，示例如下：

`Q1:  
授予OSS和DLF权限 前提条件 如何添加AliyunOSSFullAccess和AliyunDLFFullAccess权限以使用DLF服务？  
A1:  
要添加AliyunOSSFullAccess和AliyunDLFFullAccess权限，请按照以下步骤操作： 1. 访问阿里云控制台，登录您的账号。 2. 进入“安全管理”模块，点击“权限管理”。 3. 选择“用户”，点击“添加权限”。 4. 选择“阿里云OSS”，选择“OSS访问控制”，然后点击“添加权限”。 5. 在“授权策略”中，添加“阿里云DLF服务”的授权策略，并设置为“FullAccess”。 6. 完成上述步骤后，您的阿里云OSS和DLF服务将获得AliyunOSSFullAccess和AliyunDLFFullAccess权限。  
  
Q2:  
授予OSS和DLF权限 操作步骤 在集群信息页面，如何找到Worker RAM角色？  
A2:  
在集群信息页面，您需要单击集群资源页签，然后找到Worker RAM角色所在行的链接。
`

系统提取的QA对会自动写入向量检索库中。以Hologres为例，您可以在Hologres中查看写入的数据和向量等信息。具体操作，请参见表。

![](https://mmbiz.qpic.cn/mmbiz_png/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5z7Vxf2rVXUehicOlXThKEWMAEkasUiaZdyUwELnkzWKkwwmCib5tVlmjQ/640?wx_fmt=png&from=appmsg)

**####**5、向量数据库召回****

在RAG服务的WebUI页面的**Chat** 选项卡中，选择**Vector Store** 问答策略，即为直接从向量数据库中召回Top-K条相似结果。
![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5YFBkgwIUN3siblyzZTOLm8ZLxLu2tVmDUDxib2ibnGwJ3FKjLa3SicC7Mg/640?wx_fmt=jpeg&from=appmsg)

**支持在界面**Parameters of Vector Retrieval** 中设置向量检索库返回的相似结果条数，默认为3。**

**####**6、关键词检索召回****

尽管在大多数复杂场景下，向量检索都能有较好的表现，但在某些语料稀缺的垂直领域，或要求准确匹配的场景，向量检索方法可能不如传统的稀疏检索方法。稀疏检索方法通过对用户Query与知识文档的关键词重叠度来进行排序，因此检索过程更为简单和高效。常见的稀疏检索方法有BM25、TF-IDF等。

Tricks: 在语料稀缺的私有垂直领域（如内部产品文档），或要求准确匹配的场景，建议使用稀疏检索算法。

在本步骤，PAI提供了BM25等关键词检索召回算法来完成稀疏检索召回操作。您可以在页面中选择是否使用关键词检索召回。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ59drtxqiaR7cfqHZUNV50oKh4qIChOObbABOIcFMhqUGF9eVnqloJB7g/640?wx_fmt=jpeg&from=appmsg)

**####**7、多路召回融合****

向量数据库召回和关键词检索召回具有各自的优势和不足，因此综合二者的召回结果能够提高整体的检索准确性和效率。倒数排序融合（Reciprocal Rank Fusion, RRF）算法将使用不同相关性指标得到的多个排名结果集组合成单个结果集。其基本原则是，在不同搜索策略中始终出现在顶部位置的文档，可能与用户Query相关性更高，因此应该在合并结果中排名更高。RRF算法的具体计算过程详见Cormack, et al.。

Tricks: 一般场景下，建议使用RRF方法组合稀疏检索和向量检索的结果，以得到相关性指标更多维的综合结果。

当您选择使用关键词检索召回，即Keyword Retrieval选择Keyword Ensembled时，PAI将默认使用RRF算法对向量数据库召回结果和关键词检索召回结果进行多路召回融合。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ59drtxqiaR7cfqHZUNV50oKh4qIChOObbABOIcFMhqUGF9eVnqloJB7g/640?wx_fmt=jpeg&from=appmsg)

**####**8、检索结果** Re-Rank**

大多数向量数据库单独使用向量模型作为检索模型。向量模型通常为Bi-Encoder模型，它生成给定文本的embedding向量，通过计算两个文本的embedding向量之间的余弦距离可以得到这两个文本的语义相似度。向量模型计算效率高，但准确度较低，有时会为了计算效率会牺牲一定程度的准确性。

因此我们可以对向量模型第一次召回的Top-K结果进行精度更高的Re-Rank操作，以得到相关度更高、更准确的知识文档。Re-Rank模型是Cross-Encoder模型，它同时接受两个文本句子作为输入，并输出句子对的相似度分数。Cross-Encoder模型精度高，但不适合大规模数据，因此可以采用先试用向量模型粗排得到Top-100相关文档，再使用Re-Rank模型精排的方式，得到与用户Query最相关的文档。常用的开源Re-Rank模型有Cohere-rerank、BAAI/bge-reranker-base、BAAI/bge-reranker-large等。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5icnmBoTfwfgO5usnrqzyvsPFPtAWBsOrLCQpq9554KyMRdFtsErICyQ/640?wx_fmt=jpeg&from=appmsg)

Tricks: 在计算资源充足的情况下，一般都建议使用向量检索与Re-Rank重排相结合的检索方式。通常第一次向量检索取Top-100，最终精排取Top-3（视具体需求调整）

在本步骤中，PAI提供了BAAI/bge-reranker-base、BAAI/bge-reranker-large等开源模型来完成Re-Rank操作。您可以在页面中选择是否对检索结果进行Re-Rank，以及具体使用的Re-Rank模型。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5eG3tUVCNEILuyUicRoJ0BMuxZggzOzvB4fN2v7S85ge7lpkm4NfXxVw/640?wx_fmt=jpeg&from=appmsg)

**####**9、问答Prompt构建****

Liu, et al.的研究表明，在长上下文输入中，LLM更容易关注输入首部和尾部的信息，而遗漏位于输入中部的信息。因此，为了提高RAG对话的准确度，可以对知识文档与用户 Query 进行重排序，使LLM更关注与用户Query相关度更高的文档。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5z1r7zaxWL66oCMEQFjlPPdDah4GV09X3VFBRhiaTIXqQgclBqeTKrAw/640?wx_fmt=jpeg&from=appmsg)

Tricks: 建议以「参考文档」-「Prompt模板」-「用户Query」的顺序构建LLM输入，建议在「Prompt模板」中说明「答案中不允许包含编造内容」等 instruction。

本步骤中，PAI 基于上述研究对检索到的知识文档与用户 Query 进行了排序整理，并形成了最终输入大模型前的 Prompt 。在RAG服务的WebUI页面的Chat选项卡中，PAI 提供了多种不同的Prompt策略，上述策略被置为默认策略（Simple），您可以选择合适的预定义Prompt模板或输入自定义的Prompt模板以获得更好的推理效果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5ojM3RkviaQia4ahDvflSwCTHS3AKeF1X0efB3ZPcMT7rA9dibefoSpmLg/640?wx_fmt=jpeg&from=appmsg)

**####**10、LLM知识问答****

本方案支持以下三种不同的问答方式，输入您的问题后，具体推理效果如下：

****VectorStore****

直接从向量数据库中检索并返回TopK条相似结果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5W6wJ9JDUFy0UgkgX4M30J8u7MNBtFHUknyMnibYmo1kh0Rfl6h8lYRg/640?wx_fmt=jpeg&from=appmsg)

****LLM****

直接与EAS-LLM对话，返回大模型的回答。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5yH8HibRNzqScCmVy3fwhXKbXfoI5mwDz2WXTHDnhMhoyju5xLmpzsgQ/640?wx_fmt=jpeg&from=appmsg)

****Vector Store + LLM****

将检索返回的结果与用户的问题组装成可自定义的Prompt，送入EAS-LLM服务，从中获取问答结果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5QXgHvhhNlqxaZJicjufibx0K0m99HMABsPNB571q6S4Qib8uAkDa4JJuA/640?wx_fmt=jpeg&from=appmsg)
## 5.2场景二：面向TEXT文档的检索增强大模型对话系统

**####**1、参数自定义配置****

**如下图所示，您可以在RAG服务WebUI界面的**Settings** 选项卡中，配置本系统的参数，并测试连接是否正常。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5iazib5L0YrHtxLicq0QX3oSHUx83bsTJJV87ew4iaIewhKoyx7BhegQRSg/640?wx_fmt=jpeg&from=appmsg)

具体参数配置详情，请参见1、自定义配置参数。

**####**2、上传TEXT文件****

**在RAG服务的WebUI页面中，切换到**Upload** 选项卡中，在该页面配置以下参数，并上传TXT类型的用户知识库文档。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5fnqUibqPzLeVQKyz7downCzFevPK0uJ7ibIKW6nFd5TUl1icLoShsmibRg/640?wx_fmt=jpeg&from=appmsg)

其中：

***Which type of files do you want to upload?** ：选择**text** 。
***Files** ：参考界面操作指引上传知识库文档，然后单击**Upload** 。支持多文件上传，文件格式为：txt、doc、docx、pdf和md等。
***Directory** ：参考界面操作指引上传包含知识库文档的目录，然后单击**Upload** 。

您可以使用PAI提供的rag_chatbot_test_doc.txt知识库文档进行Mock测试。

**####**3、文档清洗与切分****

在构建向量检索库前，系统会对您所上传的知识文档进行预处理。包括**数据清洗** （文本提取、超链替换等）和**切块** （chunk）。
![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5V4nMbBoCnyVfl871kXiadbI0B2C4Mbo5D3oN4sFKDFCibwBuu1hxCvGw/640?wx_fmt=jpeg&from=appmsg)

您可以通过设置以下两个参数来控制文档切块粒度的大小：

*****Chunk Size** ：指定每个分块的大小，单位为字节，默认为200。**

*****Chunk Overlap** ：表示相邻分块之间的重叠量，默认为0。**

**####**4、向量数据库召回****

在RAG服务的WebUI页面的**Chat** 选项卡中，选择**Vector Store** 问答策略，即为直接从向量数据库中召回Top-K条相似结果。
![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5YFBkgwIUN3siblyzZTOLm8ZLxLu2tVmDUDxib2ibnGwJ3FKjLa3SicC7Mg/640?wx_fmt=jpeg&from=appmsg)

**支持在界面**Parameters of Vector Retrieval** 中设置向量检索库返回的相似结果条数，默认为3。**

**####**5、关键词检索召回****

尽管在大多数复杂场景下，向量检索都能有较好的表现，但在某些语料稀缺的垂直领域，或要求准确匹配的场景，向量检索方法可能不如传统的稀疏检索方法。稀疏检索方法通过对用户Query与知识文档的关键词重叠度来进行排序，因此检索过程更为简单和高效。常见的稀疏检索方法有BM25、TF-IDF等。

Tricks: 在语料稀缺的私有垂直领域（如内部产品文档），或要求准确匹配的场景，建议使用稀疏检索算法。

在本步骤，PAI提供了BM25等关键词检索召回算法来完成稀疏检索召回操作。您可以在页面中选择是否使用关键词检索召回。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ59drtxqiaR7cfqHZUNV50oKh4qIChOObbABOIcFMhqUGF9eVnqloJB7g/640?wx_fmt=jpeg&from=appmsg)

**####**6、多路召回融合****

向量数据库召回和关键词检索召回具有各自的优势和不足，因此综合二者的召回结果能够提高整体的检索准确性和效率。倒数排序融合（Reciprocal Rank Fusion, RRF）算法将使用不同相关性指标得到的多个排名结果集组合成单个结果集。其基本原则是，在不同搜索策略中始终出现在顶部位置的文档，可能与用户Query相关性更高，因此应该在合并结果中排名更高。RRF算法的具体计算过程详见Cormack, et al.。

Tricks: 一般场景下，建议使用RRF方法组合稀疏检索和向量检索的结果，以得到相关性指标更多维的综合结果。

当您选择使用关键词检索召回，即Keyword Retrieval选择Keyword Ensembled时，PAI将默认使用RRF算法对向量数据库召回结果和关键词检索召回结果进行多路召回融合。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ59drtxqiaR7cfqHZUNV50oKh4qIChOObbABOIcFMhqUGF9eVnqloJB7g/640?wx_fmt=jpeg&from=appmsg)

**####**7、检索结果Re-Rank****

大多数向量数据库单独使用向量模型作为检索模型。向量模型通常为Bi-Encoder模型，它生成给定文本的embedding向量，通过计算两个文本的embedding向量之间的余弦距离可以得到这两个文本的语义相似度。向量模型计算效率高，但准确度较低，有时会为了计算效率会牺牲一定程度的准确性。

因此我们可以对向量模型第一次召回的Top-K结果进行精度更高的Re-Rank操作，以得到相关度更高、更准确的知识文档。Re-Rank模型是Cross-Encoder模型，它同时接受两个文本句子作为输入，并输出句子对的相似度分数。Cross-Encoder模型精度高，但不适合大规模数据，因此可以采用先试用向量模型粗排得到Top-100相关文档，再使用Re-Rank模型精排的方式，得到与用户Query最相关的文档。常用的开源Re-Rank模型有Cohere-rerank、BAAI/bge-reranker-base、BAAI/bge-reranker-large等。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5icnmBoTfwfgO5usnrqzyvsPFPtAWBsOrLCQpq9554KyMRdFtsErICyQ/640?wx_fmt=jpeg&from=appmsg)

Tricks: 在计算资源充足的情况下，一般都建议使用向量检索与Re-Rank重排相结合的检索方式。通常第一次向量检索取Top-100，最终精排取Top-3（视具体需求调整）

在本步骤中，PAI提供了BAAI/bge-reranker-base、BAAI/bge-reranker-large等开源模型来完成Re-Rank操作。您可以在页面中选择是否对检索结果进行Re-Rank，以及具体使用的Re-Rank模型。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5eG3tUVCNEILuyUicRoJ0BMuxZggzOzvB4fN2v7S85ge7lpkm4NfXxVw/640?wx_fmt=jpeg&from=appmsg)

**####**8、问答Prompt构建****

Liu, et al.的研究表明，在长上下文输入中，LLM更容易关注输入首部和尾部的信息，而遗漏位于输入中部的信息。因此，为了提高RAG对话的准确度，可以对知识文档与用户 Query 进行重排序，使LLM更关注与用户Query相关度更高的文档。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5z1r7zaxWL66oCMEQFjlPPdDah4GV09X3VFBRhiaTIXqQgclBqeTKrAw/640?wx_fmt=jpeg&from=appmsg)

Tricks: 建议以「参考文档」-「Prompt模板」-「用户Query」的顺序构建LLM输入，建议在「Prompt模板」中说明「答案中不允许包含编造内容」等 instruction。

本步骤中，PAI 基于上述研究对检索到的知识文档与用户 Query 进行了排序整理，并形成了最终输入大模型前的 Prompt 。在RAG服务的WebUI页面的Chat选项卡中，PAI 提供了多种不同的Prompt策略，上述策略被置为默认策略（Simple），您可以选择合适的预定义Prompt模板或输入自定义的Prompt模板以获得更好的推理效果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5ojM3RkviaQia4ahDvflSwCTHS3AKeF1X0efB3ZPcMT7rA9dibefoSpmLg/640?wx_fmt=jpeg&from=appmsg)

**####**9、LLM知识问答****

本方案支持以下三种不同的问答方式，输入您的问题后，具体推理效果如下：

****VectorStore****

直接从向量数据库中检索并返回TopK条相似结果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5INoSKZj3TrhZ9T1PwECcUmoZGPDo5kxjM1jI9Qzx7wLBIicfzI2icg1g/640?wx_fmt=jpeg&from=appmsg)

****LLM****

直接与EAS-LLM对话，返回大模型的回答。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5tibuEkAFWvuTeuERdH7ZwwGAfcIOic53ffm6n9tpjXaoiaHo93jB9DEDg/640?wx_fmt=jpeg&from=appmsg)

****Vector Store + LLM****

将检索返回的结果与用户的问题输入已选择的Prompt模板中，送入EAS-LLM服务，从中获取问答结果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/tXo0Z4jTLeK0yxQWxiaBWcQApgSRuZPZ5YQaXpY0sdCibfDGBVOM3NgEiaiaEJ65oaQgd1joo0TVy0X8fhPvSjh4kw/640?wx_fmt=jpeg&from=appmsg)
更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
