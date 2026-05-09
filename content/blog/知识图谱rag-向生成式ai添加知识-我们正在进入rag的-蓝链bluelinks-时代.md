---
title: "知识图谱RAG：向生成式AI添加知识，我们正在进入RAG的“蓝链BlueLinks”时代。"
slug: "知识图谱rag-向生成式ai添加知识-我们正在进入rag的-蓝链bluelinks-时代"
description: "作者： 苏哲管理咨询 来源： 苏哲管理咨询 菲利普·拉思勒，图数据库Neo4j公司 CTO 1 图谱RAG宣言（Manifesto） 我们正处于认识到，要想在GenAI上做出显著有用的事情，不能仅仅依赖自回归LLMs来做决定的边缘。我知道你在想什么：“RAG就是答案。”或者微调，或者GPT-5。是的。像基于向量的RAG和微调这样的技术可以有所帮助。它们对于一些应用场..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/F_370SQDcuKWaXpbDybdiw"
sourceName: "苏哲管理咨询"
readingTime: "22 min"
createdAt: "2024-07-14T16:00:00.000Z"
publishedAt: "2024-07-14T16:00:00.000Z"
featured: false
---

作者： 苏哲管理咨询  来源： [苏哲管理咨询](https://mp.weixin.qq.com/s/F_370SQDcuKWaXpbDybdiw)

**菲利普·拉思勒，图数据库Neo4j公司 CTO ![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kq5c082LibsJWCQ73OzU83iaUoBys5fqrEjSiaSuh9yCrvUwGEVqPdV6pA/640?wx_fmt=png&from=appmsg)
![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kHQtDmczaTa2DwmIyzVEQ0bIRYiaLbu5hCXrbbVGISQc6Y1wicfgICibUQ/640?wx_fmt=png&from=appmsg)

1 图谱RAG宣言（Manifesto）

我们正处于认识到，要想在GenAI上做出显著有用的事情，不能仅仅依赖自回归LLMs来做决定的边缘。我知道你在想什么：“RAG就是答案。”或者微调，或者GPT-5。是的。像基于向量的RAG和微调这样的技术可以有所帮助。它们对于一些应用场景来说足够好了。但还有另一类应用场景，这些技术都遇到了瓶颈。基于向量的RAG - 和微调一样 - 增加了对许多种问题的正确答案的概率。然而，这两种技术都无法提供正确答案的确定性。它们经常也缺乏上下文，色彩和与你所知道的事实的联系。此外，这些工具也没有给出为什么作出特定决定的线索。

2012年，谷歌发布了第二代搜索引擎，**题为****“**介绍知识图谱：事物，而非字符串”** 。他们发现，如果使用知识图谱来组织网页中所代表的事物，同时也进行字符串处理，就能实现巨大的能力飞跃。我们今天看到了同样的模式在GenAI中展现。**许多**GenAI****项目都受到了限制，因为所使用的解决方案处理的是字符串（嵌入或者向量），而不是事物。**

****镜头快进到现在，AI****工程师和学术研究人员正在领先的领域发现了和谷歌一样的事情：突破这个瓶颈的秘诀就是知识图谱** 。换句话说，将关于事物的知识引入基于统计的文本技术中。这与任何其他类型的 RAG 相同，只是除了向量索引之外，还调用了知识图谱。换句话说，需要知识图谱增强RAGGraphRAG！**

****本文旨在全面且易于阅读地介绍GraphRAG。** 事实证明，构建数据的知识图并在RAG中使用它会给您带来几个强大的优势。有大量研究证明，相较于仅使用常规向量的RAG，它可以给出更好甚至所有问题的答案。**

****那本身将是GraphRAG采用的巨大推动力。** 除此之外，由于数据在构建应用程序时可见，开发变得更加容易。第三个主要优势是图可以被人类以及机器轻松理解和推理。因此，使用GraphRAG构建变得更容易，给出更好的结果，并且在许多行业中，这是一个致命的优势 - 可解释和可审计！我相信GraphRAG将取代仅使用向量的RAG并成为大多数用例的默认RAG架构。本文解释了原因。**

**####**2 等一下，图形知识？****

让我们明确一点，当我们说到图表时，我们指的是这样的东西：

一个图表的例子。

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kvwsbCk3oqKkWnPnrpC6cibkQVksq5Kvj4JqcuQAFDRhmY9IVuIqUP4g/640?wx_fmt=png&from=appmsg)

这幅图被广泛用来阐释知识图谱，但其原始来源和作者尚未确认。目前已知最早使用该图的可能是 Farahnaz Akrami 在 Medium 上发布的一篇文章。如果您是这幅图的创作者，请与我们联系，以便我们提供恰当的归属。

或者这样：

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kEIg7GbeczicTMWFX9V2z9jaEQDbRDQour7NtZxZMIFq2e9ZAjH23j7g/640?wx_fmt=png&from=appmsg)

****权力的游戏图表。****

权力的游戏图谱可视化，由William Lyon制作。

Or this:或者这样:

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kiapv9n4GJlNEyRSvlHWr1E9TM8Zu8CbG9ib92Lzpe5GrZnaeZUGToMVQ/640?wx_fmt=jpeg&from=appmsg)

****伦敦地铁地图的图表。****

伦敦地铁地图（由伦敦交通局提供。）有趣的事实是，伦敦交通局最近部署了一款基于图的数字孪生系统，以改善事件响应并减少拥堵。

换句话说，这不是一张简单的图表。

如果您想深入研究图表和知识图谱，建议您前往Neo4j的GraphAcademy或Andrew Ng的Deeplearning.ai课程学习知识图谱。在这里我们不会停留在定义上，而是假设您对图表有基本的工作知识，继续向前发展。

**如果你理解上面的图片，你就能看到如何在你的RAG**管道中查询底层知识图谱数据（存储在图数据库中）。这就是GraphRAG**的关键 。

**####**3 两种知识表示：向量和图****

典型RAG的核心 - 向量搜索 - 接收一篇文本块，并从候选的书面材料中返回概念上相似的文本。这是一种令人愉快的自动化过程，对于基本搜索非常有用。

在你做这件事的每一次可能不会考虑到的是一个向量是什么样子，或者相似度计算在做什么。让我们从人类角度、向量角度和图形角度来看一个苹果：

**![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kibiadTTuIuXOodxDpibM9Tib4bgTcU0uC3efF1YmlE9p89ZozoZLUfCVYA/640?wx_fmt=jpeg&from=appmsg)**

****一个苹果：人类视角vs.****向量视角 vs.****知识图谱视角。****

****人类的表现是复杂而多维的，不是我们能完全在纸上捕捉的。** 让我们给一些诗意的许可，可以想象这幅美丽诱人的画面代表了一个苹果在它所有知觉和概念辉煌中的形象。**

苹果的向量表示是一组数字数组 - 统计领域的构造。向量的魔力在于它们以编码形式捕捉了对应文本的本质。然而，在RAG环境中，当您需要确定一组单词与另一组单词的相似程度时，它们只有在这种情况下才有价值。要做到这一点就像运行一个相似度计算（也称为向量数学）并找到一个匹配。**但是，如果您想理解向量中包含的内容** ，**了解其周围的内容，了解文本中表示的事物，或者理解这些内容如何适应更大的背景，那么向量作为一种表示方式就无法胜任** 。

****知识图谱，相比之下，是世界的声明性-****或者用人工智能术语来说，是符号表示** 。因此，人类和机器都可以理解和推理知识图谱。这是一件大事，我们稍后会重新审视。此外，您可以查询、可视化、注释、修复和扩展知识图谱。知识图谱代表您的世界模型 - 表示您正在处理的领域的一部分。**

**####**4 知识图谱RAG “vs.” 朴素RAG****

不是为了与向量竞争和图查询各自在RAG中增加价值。正如LlamaIndex创始人Jerry Liu所指出的，有助于将GraphRAG看作是包含向量的。这与“仅向量RAG”有所区别，后者严格基于文本中单词嵌入的相似性。基本上，GraphRAG是RAG，其中检索路径包括知识图。如下所示，核心GraphRAG模式很简单。基本上与具有vectors4的RAG相同的架构，但将知识图层叠到图中。

**####**5 图形RAG模式****

GraphRAG的常见模式。

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kmyMHVqL9OKc3BbESkC5QjL4Y1g2Yz68YHbOgBcjeElwGlnX0sAd3rg/640?wx_fmt=jpeg&from=appmsg)

这里，您可以看到一个图查询被触发。它可以选择性地包括一个向量相似性组件。您可以选择将图和向量分别存储在两个不同的数据库中，或者使用像Neo4j这样也支持向量搜索的图数据库。

使用GraphRAG的常见模式之一如下：

- 

-做一个向量或关键词搜索，找到一个初始节点集。

- 

-遍历图形以收集有关相关节点的信息。

- 

-可选地，可以使用基于图的排名算法（例如PageRank）重新对文档进行排名。

模式因使用情况而异，就像今天的人工智能一样，GraphRAG正在成为一个丰富的领域，每周都会涌现出新的发现。我们将在未来的博客文章中专门介绍我们今天看到的最常见的GraphRAG模式。

**####**6 GraphRAG 生命周期****

一款使用GraphRAG的GenAI应用程序遵循与任何RAG应用程序相同的模式，在开始时增加了一个“创建图形”的步骤：

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1keHIuKZDhYp7Dq1dOXbscUNPkFrBaaIvzNUHxkAic8ibmSBzWMMtBicdDA/640?wx_fmt=jpeg&from=appmsg)

****GraphRAG****生命周期** 。**

创建图表类似于对文档进行分块，并将其加载到向量数据库中。工具的进步使得图的创建变得非常容易。好消息有三个方面：

图表是高度迭代的 - 您可以从“最小可行图谱”开始，然后再进行扩展。

****一旦您的数据进入知识图谱，数据的演进就变得非常容易** 。您可以添加更多种类的数据，以获取数据网络效应的好处。您还可以提高数据的质量，以提升您的应用结果的价值。**

此部分栈正在迅速改善，这意味着随着工具的更加精密化，图创建将变得更加容易。将图形创建步骤添加到之前的图片中的步骤，就会得到如下流程：

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kIjMGlT8psVWlMY3rahRATxN7O8gV3MaE9NHkB0vHic1B3Oic45O041QA/640?wx_fmt=jpeg&from=appmsg)

将图谱创建步骤添加到GenAI流程中。

稍后会更深入地探讨图形的创建。目前，让我们把这个放在一边，谈谈GraphRAG的好处。

**####**7 为什么选择GraphRAG？****

相对于仅使用向量的RAG，我们从GraphRAG中看到的好处主要包括三个主要方面：

-更高的准确性和更完整的答案（运行时/生产利益）。

-创建了知识图谱后，就更容易构建和随后维护您的RAG应用程序（开发时间优势）。

-更好的解释性、可追溯性和访问控制（治理利益）。

让我们深入探讨这些：

****#1:****更高的准确性和更实用的答案****

GraphRAG带来的第一个（也是最直接可感知的）好处是更高质量的响应。除了我们从客户那里看到的越来越多的例子，越来越多的学术研究也支持这一点。其中一例是由数据目录公司Data.world进行的。在2023年底，他们发表了一项研究，表明GraphRAG平均提高了43个业务问题的LLM响应的准确性3倍。该基准测试发现，当有知识图支持时，响应的准确性有显著提高。

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1k0ibJ418l8WVByFUkBEnCHK2SVic8U4QVFEXpicZ9nibxiaD9LibFSUYibJdOg/640?wx_fmt=jpeg&from=appmsg)

**知识图谱将LLM**回应的准确率提高了54.2**％，平均提升3****倍。**

更近期，也许更为人熟知的是微软在2024年2月开始的一系列帖子，标题为GraphRAG: 解锁叙述私人数据上的LLM发现，还附带有一篇相关研究论文和软件发布。他们在这里观察到，基准RAG（即带向量的）存在以下两个问题：

- 

-基准线的 RAG难以连接信息之间的关联。当回答一个问题需要通过它们共享的属性遍历不同的信息片段，以提供新的综合见解时，就会出现这种情况。

- 

-基准线 RAG 在被要求全面理解大量数据集或甚至是单个大型文档的概要语义概念时表现不佳。

微软发现，“通过使用LLM生成的知识图，GraphRAG大大改善了RAG的‘检索’部分，将上下文窗口填充了更相关的内容，从而得到更好的答案并捕捉证据来源。” 他们还发现，与替代方法相比，GraphRAG所需的标记数量减少了26%至97%，这不仅使其在提供答案方面更好，而且更便宜、更具可扩展性。

深入探讨准确性这个话题，重要的不仅仅是答案是否正确，而且还有答案的实用性。人们发现使用GraphRAG后，答案不仅更准确，而且更丰富、更完整、更实用。LinkedIn最近发表的论文描述了GraphRAG对他们客户服务应用的影响，提供了一个很好的示例。GraphRAG提高了回答客户服务问题的准确性和丰富性（因此更有用），为客户服务团队减少了每个问题的中位解决时间28.6%。

从由Neo4j主持的GenAI研讨会以及我们与Google Cloud Platform、AWS和Microsoft的合作伙伴提供的类似示例中，有一个相似的例子。下面的示例查询针对一组SEC文件，很好地说明了在使用向量+GraphRAG与仅使用向量RAG时可能获得的答案类型之间的差异：

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kEuylibhNnJN3qcyLuSh0GqOTtFZicqnoKqHUiaiaubpVHD5olN94mZePJg/640?wx_fmt=jpeg&from=appmsg)

向量 (Vector) 方法与向量量 + 图 (Graph) 方法对比。

注意描述受到锂短缺影响的公司特征与列出可能受到影响的具体公司之间的区别。如果您是一位投资者，希望在市场变化或公司面临自然灾害时重新平衡您的投资组合，那么不仅可以获取到前者的信息，而且可以获取到后者的信息将会是具有重大意义的。在这里，两个答案都是准确的。第二个答案明显更有用。

第23集的Going Meta，由Jesus Barrasa提供了另一个很好的例子，使用了一个法律文件的用例，从词汇图开始。

观察X-球体并在LinkedIn上活跃的人们会经常看到不仅来自实验室而且来自现场的新示例。在这里，Lettria的Charles Borderie举例说明了仅向量的RAG与GraphRAG的对比，以及与基于LLM的文本到图形管道相对应，该管道将10,000篇财经文章纳入知识图谱中。

检索器专用方法 vs. 图检索器方法。

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kTnby0j6FQ5rz7d21dee2b6XqFxIwoWmGNRBjCnNv42FgaB9k8PxyCg/640?wx_fmt=png&from=appmsg)

正如您所看到的，通过使用GraphRAG而不是普通的RAG，答案的质量不仅显著提高，而且所用的标记数量减少了三分之一。

最后一个值得注意的例子是来自Writer的。他们最近宣布了基于RobustQA框架的RAG基准报告，比较了他们基于GraphRAG的方法与竞争对手的最佳工具。GraphRAG的得分为86%，这是与竞争对手相比的显著改进，竞争对手的得分在33%至76%之间，延迟时间相当或更好。

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kAxxKRBjToDEVeBF6AhzeBkTDYibibdWxXsLry1hfqwQXr1uFOewkUNKg/640?wx_fmt=png&from=appmsg)

RAG方法的准确性和响应时间评估。

每周我会见到许多不同行业的客户，他们都对各种GenAI应用程序产生了类似的积极影响。知识图谱通过使结果更准确、更有用，为GenAI打开了道路。

****#2:****改善数据理解，加快迭代。****

知识图谱在概念上和视觉上都很直观。能够探索它们通常会揭示新的见解。许多用户报告的一个意想不到的附加好处是，一旦他们投入到创建他们的知识图谱中，他们发现它帮助他们以意想不到的方式构建和调试他们的GenAI应用程序。这在一定程度上与将数据视为图形如何描绘应用程序底层数据的活态图片有关。图形还为您提供了追踪答案与数据之间关系的钩子，以及追踪该数据沿因果链的渠道。

让我们看一个使用上面提到的锂暴露问题的示例。如果你将向量可视化，你将得到类似于这样的东西，只不过行和列要多得多：

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kyHaZqtYWHywmfj3aavp6USegqWeNMtovGuBq60HntyzAiaJibsEb6yqQ/640?wx_fmt=png&from=appmsg)

向量可视化。

当您将数据表示为图形时，您可以以一种使用向量表示无法实现的方式理解它。

这是最近LLamaIndex10网络研讨会的一个示例，展示了他们提取向量化块的图（词汇图）和LLM提取实体的图（领域图），并用“提及”关系将两者联系在一起的能力：

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kFYG55uicD1nF7oKZ8Zk6icUeVGXqiavxR6r8IoNiaMvphrcb0YVYSsqYBA/640?wx_fmt=png&from=appmsg)

提取词汇图和领域图。

你可以在 Langchain、Haystack、SpringAI 等平台找到类似的例子。

观察这个图表，您可能开始看到将数据存储在丰富的结构中如何打开了各种新的开发和调试可能性。数据的各个部分保留了它们的价值，而结构本身存储并传达额外的意义，您可以利用这些意义来给您的应用程序更多的智能。

这不仅仅是可视化问题。还有一点就是将数据以一种传达和存储含义的方式进行结构化的效果。以下是一位来自一家知名金融科技公司的开发人员，在将知识图引入他们的 RAG 工作流程一周后的反应：

1.﻿多亏了 Neo4j 图形数据科学插件，我们可以在数据库级别存储嵌入并计算余弦相似度

2.获取相关操作就像跟踪节点之间的关系一样简单

3.缓存可以可视化。这是一个非常有价值的调试工具，让我们可以了解缓存是否/何时以及如何被破坏/行为不端，我实际上已经修复了几个错误，多亏了这个：）

在未来的改进中，我们可能能够完全预取整个路径，并将其一次性提供给前端

开发者对GraphRAG的反应。

这位开发者的反应与测试驱动开发的假设很一致，即验证而不是信任答案是正确的。就我个人而言，我不太愿意把我所有的自主权都交给SkyNet来做完全不透明的决定！更具体地说，即使是非末日派的人工智能也能理解，可以看到一个与“Apple, Inc.”相关的块或文档实际上不应该被映射到“Apple Corps”。由于数据最终驱动着GenAI 的决策，因此拥有评估和确保正确性的设施几乎是至关重要的。

****#3****：治理：可解释性，安全性等。********

决策的影响越大，你就越需要能够说服那些最终会对决策负责的人相信这个决策。通常，这需要能够审计每一个决策。同时，还需要具有可靠连续的良好决策记录。但仅仅这些还不够。当他们质疑决策时，你还需要能够向那个人解释决策的基本原因。

LLM自身并不能提供一个很好的方式来做到这一点。是的，你可以得到制定决策所用文档的引用。但这些并不能解释决策本身 - 更不用说LLM已知会虚构这些引用！知识图谱在一个完全不同的层面上运作，使得GenAI流程内部的推理逻辑更清晰，输入也更具解释性。

让我们继续讲述上面的一个例子，Lettria的Charles加载了一个包含来自1万篇财经文章提取实体的知识图，并将其与LLM一起用于执行GraphRAG。我们看到这如何提供更好的答案。让我们来看看数据：

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kibiaQEHTp3R5cj5p7LGZvY5s9FcaFxFECicZ0yhcnjFnBPhpjpJ1H3Icg/640?wx_fmt=png&from=appmsg)

从10,000篇财经文章中提取实体，加载知识图谱。

****将数据视为图是第一步。** 数据还是可导航和可查询的，随着时间的推移可以进行修正和更新。治理优势在于更容易查看和审计数据的“世界模型”。使用图形使得最终对决策负有责任的人更有可能理解，相对于接收相同数据的向量版本。在质量保证方面，将数据存储于知识图中可以更容易地发现数据中的错误和惊喜（不管是令人愉悦的还是不愉快的），并将其追溯到源头。您还可以在图中捕获来自图的权威和信心信息，并将此信息不仅用于您的计算，还用于您的解释。当您查看相同数据的仅向量版本时，这是不可能完成的，如我们之前讨论过的那样，对于普通人甚至是高水平的人都很难理解。**

****知识图谱也可以显著增强安全和隐私。** 这在构建原型时可能并不是首要考虑的问题，但它是通往生产的关键部分。如果您从事受管制行业，比如银行或医疗保健，那么每位员工对信息的访问可能取决于其角色。LLM或向量数据库都没有很好地限制信息范围以匹配角色。您可以通过知识图谱内部的权限轻松处理这个问题，在那里任何给定操作者对数据的访问能力都受到数据库的约束，并排除他们不被允许看到的结果。以下是一个简单安全策略的模拟，您可以在具有细粒度访问控制的知识图谱中实施：**

在知识图谱中实施的简单安全策略示例。

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kIVAPeBeS2E0eMa5MTDrhibXRFiabZFvKHUnIiagrpsLnTeET3RER2mo8w/640?wx_fmt=png&from=appmsg)

**####**8 知识图谱创建****

人们经常问我建立知识图谱需要什么。理解答案的第一步是要了解对GenAI应用最相关的两种图：

1:领域图是与您的应用程序相关的世界模型的图形表示。以下是一个简单的示例：

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kQLxZLpRdUBCsBdqkO0nTffiaib0lXPgWYTtVVpcbk1uC5giaETKRyQbYA/640?wx_fmt=png&from=appmsg)

领域图。

**2：基于词法图的**文本结构图是文档结构的图表** 。最基本的文本结构图每个文本块都有一个节点。**

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kmDOicSfoR5J6uJ4set9lJNTO2rfyGPeKibdaKPrqUmic0ibRqXUZQoicPNA/640?wx_fmt=png&from=appmsg)

**词法图（**Lexical graph****）** 。**

人们通常会将这进一步扩展，包括块与文档对象（如表格）、章节、页码、文档名称/标识、集合、来源等之间的关系。您也可以将域和词汇图结合起来，如下所示：

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kqJUldb0N2mic5HHrAZrd0wX4ZDSmIKtvhwsMwSm1IIoGibfhrWUoibQEw/640?wx_fmt=png&from=appmsg)

****领域层和词汇层的结合。****

****创建词法图很容易，主要是简单解析和切块策略的问题** 。至于领域图，具体路径取决于您导入的数据是来自结构化来源、非结构化文本，还是两者兼有。幸运的是，从非结构化数据源创建知识图的工具正在迅速改进。例如，新的Neo4j知识图构建器可以处理PDF文档、网页、YouTube视频或维基百科文章，并从中自动创建知识图。只需点击几个按钮，就能让您可视化（当然也能查询）输入文本的领域图和词法图。它功能强大且有趣，大大降低了创建知识图的门槛。**

****客户、产品、地理位置等数据可能以结构化形式存储在您企业的某个地方，并且可以直接从其位置提取。** 以最常见的情况为例，如果数据存储在关系型数据库中，您可以使用遵循经过验证的关系到图映射规则的标准工具。**

## 9 使用知识图谱。

拥有知识图谱后，有越来越多的框架用于进行GraphRAG，包括LlamaIndex Property Graph Index，Langchain的Neo4j集成以及Haystack（国内也有很多初创企业在开发图谱数据库包括星环、杭州Galaxybase等等。这个领域正在快速发展，但我们现在已经到达了编程方法变得简单直接的阶段。

图形构建方面也是如此，使用诸如Neo4j导入工具这样的工具，它具有用于将表格数据映射和导入到图形中的图形化用户界面，以及上文提到的Neo4j的新版v1 LLM知识图构建器。下图总结了构建知识图的步骤。

![](https://mmbiz.qpic.cn/mmbiz_png/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kf8OOnVmBbBxm25uOsS9L9fB2j9PGzUVBhO5icA2cmBzDNhZZ9p28PjA/640?wx_fmt=png&from=appmsg)

****为GenAI自动生成知识图谱。****

使用知识图谱时，另一个你将发现自己正在做的事情是将人类语言问题映射到图数据库查询中。Neo4j推出的新开源工具NeoConverse旨在帮助进行图的自然语言查询。这是朝着泛化这一方向迈出的第一实质性步骤。

虽然制作图表需要一些工作和学习，但好消息是随着工具的不断改进，这一过程变得越来越容易。

## 10 结论：GraphRAG 是 RAG 的下一个自然步骤

基于词的计算和LLMs以及基于向量的RAG中固有的语言技能提供了良好的结果。为了获得稳定的优秀结果，需要超越字符串，捕捉世界模型以及词模型。就像谷歌发现要掌握搜索一样，他们需要超越纯粹的文本分析，绘制出字符串下面的基本事物，我们开始看到AI世界中出现相同的模式。这种模式就是GraphRAG。

进展是呈"S"曲线的：当一种技术达到顶峰时，另一种技术会推动进展并超越前者。随着GenAI的发展，对于那些关注答案质量至关重要的用途；或者对于需要可解释性的内部、外部或监管利益相关者；或者对于需要对数据访问进行精细控制以确保隐私和安全的情况下，很有可能您下一个GenAI应用程序将会使用知识图谱。

人工智能的演变。

![](https://mmbiz.qpic.cn/mmbiz_jpg/t7y9yAXIlsHzb6U5wp9pqVsibHibbjhv1kbBPbPJen5gias2QqbQqW47AASs2swRJG4zsFXwEdDVbiaDNOQ2uDhJibQ/640?wx_fmt=jpeg&from=appmsg)

可以亲身体验GraphRAG！

如果准备跟进GraphRAG的下一步，可以尝试Neo4j LLM知识图构建器。这个简单的网络应用程序让您在几个点击内从非结构化文本来源（如PDF、网页和YouTube视频）创建知识图。这是体验GraphRAG的强大功能的完美场所。

使用LLM知识图构建器，可以：

连接到您的免费基于云的 Neo4j 实例，并从您喜欢的文本来源构建图形。

使用互动可视化探索您新创建的知识图谱。

与您的数据交谈，让GraphRAG接受考验。

将知识图谱集成到应用中，解锁新的见解。

开始使用，启动一个免费的 AuraDB 实例并构建你的知识图谱。您可以在这里了解更多关于 Neo4j LLM 知识图谱构建工具，并获得指导。

## 11 致谢

许多人为这篇帖子作出了贡献。我想要感谢所有分享学习、写作和代码的人——这里引用了许多示例，并鼓励你们继续如此。通过作为一个社区共享，我们都会学习。

我还要感谢许多人看到了GraphRAG的重要性，并慷慨地花时间审查和评论帖子本身。在许多情况下，这是通过他们世界中出现的示例来支持的。

与其试图命名每个人，我想要提到一些超出你通常会考虑到的“图形世界”的人。我们一起看到GraphRAG不仅是一个重要的趋势，更是两个世界之间的融合。

说完这一切，我要最诚挚地感谢你们所有人，包括（按姓氏字母顺序排列）：

- 

Harrison Chase，Langchain公司CEO

- 

Ali Ghodsi，Databricks的首席执行官

- 

Rod Johnson, Investor and Founder of SpringSource

- 

Douwe Kiela, ContextualAI 的 CEO，RAG 共同发明人

- 

Christina Li, FPV Ventures

- 

刘杰瑞，LlamaIndex的首席执行官。

- 

Owen Robertson, Principal, DTS

- 

Milos Rusic, deepset / Haystack 的首席执行官

**####**12 补充：进一步阅读****

有关这个话题已经有很多文章写作，新的见解和例子每天都会出现。虽然我无法提供一个详尽的清单，但如果你有兴趣了解更多，以下是一些特别不错的文章，供你参考：

深度学习AI的有关知识图谱的RAG短期课程是一个很好的开始方式，时长60分钟。

GraphRAG生态系统工具。通过花几分钟时间，使用LLM知识图构建器在YouTube的视频或您喜爱的PDF或维基百科页面中创建一个数据和概念的知识图。如果您还没有Aura Free实例，您可以在这里使用知识图构建器创建您自己的实例。

****加入GraphRAG的Discord。****

汤玛斯·布拉塔尼奇的帖子称为将Microsoft的GraphRAG工作与Neo4j和LangChain集成：构建图，该图将Microsoft的GraphRAG工作整合到Neo4j + Langchain流水线中。

Tomaz Bratanic的其他任何博文。

****Ben Lorica的两篇文章：《绘制智能AI的图形路线图》和《GraphRAG：设计模式、挑战、建议》。****

****一些音频参考：****

The Data Exchange podcast episode, Supercharging AI with Graphs (June 27, 2024) where Ben and I both discuss the material in this post, and more.数据交换播客节目《图形加速人工智能》(2024年6月27日)，其中本文中的内容以及更多内容由本人和本文作者Ben讨论。

2024年7月4日，ThursdAI播客一周年纪念特别节目，其中包括由Emil Eifrem主持的关于GraphRAG的专题。

德勤的文件题为《知识丰富生成式人工智能下的负责任企业决策》，副标题是企业级生成式人工智能必须整合知识图谱的重要性是什么？

Jesus Barrasa的“Going Meta”系列。目前共有27个视频，每个视频涵盖GraphRAG的不同方面或示例。

任何Leann Chen的学习视频，包括《您需要更好的知识图谱来支持您的RAG》和《使用Neo4j知识图谱构建高级RAG聊天机器人》。

****LlamaIndex的六部分闪电介绍：属性图。****

GraphStuff.fm播客，主持人为Jennifer Reif、Andreas Kollegger、Alison Cossette、Jason Koo。

最后但并非最不重要的，如果你发现自己需要向老板证明GraphRAG的价值，并想要提出一些额外的支持，那么不用再多想，只需参考加特纳(Gartner)的2024年生成式人工智能影响雷达，它把知识图谱置于当前最相关的GenAI技术的中心位置！

阅读这篇博文，看看谷歌在网络搜索中的旅程对目前在GenAI领域正在发生的事情有多么精彩。

2 NB：这些特定数字可能实际上代表苹果，也可能不代表。很难确定，这说明了向量和图之间的一个关键区别。

正如后面在“知识图谱创建”部分讨论的，另一种与“领域图谱”不同的知识图谱正在崛起并证明其有用性。这就是“词汇图谱”，它不同于世界模型，而是一个由向量块组成的图，展示它们彼此之间以及与周围文件结构（表格/图表/页面/文件/集合/作者等）之间的关系。

自然情况下，这通常不只是作为一个包罗万象的单一步骤出现在现实世界中，而是越来越多地作为一个遵循自己一套步骤和逻辑的代理管道的一部分。顺便说一下，这也是一个图。随着这些变得更加复杂，人们可能会看到将这些工作流程和规则捕捉到图数据库中，而不是在代码中。但我们还没有到那一步，这与当前讨论的主题不同。

这个在您已经建立了知识图谱之后就会启动。这并非免费，但您可能会对最新进展的可获得性感到惊讶。因为这是一个基础性的主题，我们在此之后专门设置了一个关于建立知识图谱的科学和艺术的部分。

知识图还可以帮助进行其他形式的可追溯性，比如捕获数据在系统之间流动的方式，使用系统间之间的/溯源/数据谱系图。它们还可以提供其他AI方面的好处，比如跟踪已解决实体。由于这里的重点是GraphRAG，我们将把所有这些放在一边。

如果你想深入了解这一点，并且想亲自动手编写一些代码，我强烈推荐我的同事Tomaz Bratanic的文章：使用Neo4j和LangChain实现“从本地到全球”GraphRAG：构建图。这进一步扩展了微软的工作，将其集成到Neo4j + Langchain管道中。

8本文本身包括对GraphRAG和仅向量RAG方法的更详细比较，发现GraphRAG在MRR上的改进为77.6％，在BLEU上比基准提高了0.32。

这是一个展示如何使用他们的新（大约在2024年5月）属性图索引的出色网络研讨会，其中包括用于将文本转换为图形的内置方法。

我认为我们都知道“影响”是什么意思，但简单来解释一下：这包括任何错误答案可能会对健康和人身安全产生影响，对社会和公平产生影响，对声誉产生影响，或对财务产生高额影响的决定。这显然也包括可能受到政府监管的任何决定，或者存在合规影响的决定。

12注意，这里的词汇“词汇”的意义不仅仅指个别词汇，更广义地涵盖了“与单词或语言词汇有关”的含义，正如以下词典定义所示：“与单词或语言词汇有关”。这包括了所有属于词汇体系及其关系领域的内容。

一些能够实现这一功能的库包括：Docs2KG、Diffbot、GLiNER、spaCy、NuMind、NetOwl®和（特别是在实体解析方面表现出色的）Senzing。

在2024年下半年将推出这个工具的新版本，这个版本将支持直接连接您选择的关系数据库。

NeoConverse和LLM GraphBUilder都是由Neo4j构建的不断增长的GraphRAG生态系统工具的一部分。

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
