---
title: "从LLM到AIAgent，从Workflow到AgenticWorkflow，25篇论文全面了解智能体工作流"
slug: "从llm到aiagent-从workflow到agenticworkflow-25篇论文全面了解智能体工作流"
description: "作者： 王吉伟 来源： 王吉伟 25篇关于智能体工作流的论文，关注Agentic workflow不要错过 想要了解智能体工作流，一定不要错过这25篇LLM及workflow相关论文 从LLM到AI Agent再到workflow，25篇论文全面了解智能体工作流 从架构到系统，从基准到方法论，6大类25篇论文助你吃透智能体工作流 想要系统了解智能体..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/EnGwa68d0tVFrrEn6URPAA"
sourceName: "王吉伟"
readingTime: "34 min"
createdAt: "2024-07-29T16:00:00.000Z"
publishedAt: "2024-07-29T16:00:00.000Z"
featured: false
---

作者： 王吉伟  来源： [王吉伟](https://mp.weixin.qq.com/s/EnGwa68d0tVFrrEn6URPAA)

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxW2aPyWCupKTPBEMFlLranjysvAfKIApt9pMA8VHj0Nbzl2sYqybCOuDCuPQrSk4wuMTU1giakEQ5g/640?wx_fmt=png&from=appmsg)

- 

25篇关于智能体工作流的论文，关注Agentic workflow不要错过

- 

想要了解智能体工作流，一定不要错过这25篇LLM及workflow相关论文

- 

从LLM到AI Agent再到workflow，25篇论文全面了解智能体工作流

- 

从架构到系统，从基准到方法论，6大类25篇论文助你吃透智能体工作流

- 

想要系统了解智能体工作流，看这25篇论文就够了

- 

什么是智能体工作流？Agentic workflow有哪些系统和工具？一篇文章看明白

全文约11000字，阅读时间15分钟
文/王吉伟

著名AI学者、斯坦福大学教授吴恩达提出了AI Agent的四种设计方式后，Agentic Workflow（智能体工作流）立即火爆全球，多个行业都在实践智能体工作流的应用，并推动了新的Agentic AI探索热潮。

技术的发展与应用已经进入新的拐点，从大语言模型（Large Language Models，LLM）到AI Agent再到Agentic workflow，这些新的技术一经出现便得到快速应用。而AI Agent和Agentic workflow作为LLM的落地应用方式，鉴于它在各种场景的普适性和灵活性，其普及速度比我们想的快很多。

比如在4月份文心智能体平台就已汇聚超5万开发者，创建智能体超过3万，还有30万创作者在文心一言APP创建了智能体，上线了40万个功能丰富的智能体，智能体调用量达8亿。在Coze平台，单是构建智能体能调用的插件就已超过100个。

王吉伟频道盘点过的80多个AI Agent构建平台中，有很多平台已经有不少用户和数量可观的智能体。其中，OpenAI的GPTs数量在今年1月份就已经超过300万个。

**扩展阅读： [AI智能体构建智能未来，全球80+AI Agent构建平台大盘点](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593838&idx=1&sn=ce5d980dae19a28a10c421ffb99cff10&chksm=88b9d3f8bfce5aee1589c22c5852bb8f8927ff4ac12f180566318e3a1bb41d49fb6640a74173&scene=21#wechat_redirect)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxU0arRicTMd4yGiaX95O55VU1d9vrAjukicsic7o3wZR4JseGCQDtUNVqEBOPyjibgPfHUsLzLolcKJpTA/640?wx_fmt=png&from=appmsg)

智能体来势汹汹，已经引起很多人的担心。比如《互联网的未来》一书的作者哈佛大学法学院教授Jonathan Zittrain就已在《The Atlantic》 杂志上发文，他认为当智能体形成数百万量级的庞大生态时，其行为可能不受控制，进而对人类社会产生重大危害，所以应该立即对智能体的行为进行规范，并改进现有互联网标准，从而更好地控制智能体，防止它们失控。

*文章链接：https://www.theatlantic.com/technology/archive/2024/07/ai-agents-safety-risks/678864/*

这篇文章，也从侧面见证了Agentic workflow的野蛮生长。

虽然Agentic Workflow已获得惊人的进展，但业内外对其认知还存在一定的偏差。

吴恩达教授在介绍Agentic Workflow时，认为它是与 LLM 交互和完成任务的一种方法，可以将任务分解成多个步骤，在不同环节进行迭代，指导最终生成期望的结果。并将 Agentic Workflow的设计模式总结为反思、工具使用、规划和多智能体协作四种。

**扩展阅读： [Agentic Workflow加速Agentic AI到来，AI Agent成为重要实现方式](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650594022&idx=1&sn=ead770994c1fdf21f5edb85f1fa4263f&chksm=88b9d330bfce5a26cd9cb6fbbb6b6a13978775015cec3cf169264fe3601d7420e2c036ea90bb&scene=21#wechat_redirect)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxW2aPyWCupKTPBEMFlLranjYibkf3PSBOFLefNzYJ8DanTYDWUVu2b8KRuGXI0eAPjeoxbESEMnV2g/640?wx_fmt=png&from=appmsg)Coze的Bot构建页面

但在实际应用中，我们经常会看到智能体工作流的应用模式远不止这四种模式。比如Coze不只推出了多智能体和工作流功能，还衍生出了图像流。

而最终通过插件、大模型、代码、知识库、工作流、图像流、选择器、文本处理、消息、变量、数据库等构建的工作流，又会被置入「技能」模块而最终构建成为一个智能体（Coze平台称之为Bot）。更多的智能体，可以执行更多的任务，参与相对复杂的业务流程。

还有，如果仔细观察你会发现，在LLM应用越发普及化的前提下，很多工作流都是混合了传统业务流程与智能体工作流。其中既有“四种模式”的工作流，也有传统应用嵌入GenAI的工作流，还有简单的直接应用大语言模型的工作流。

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJVOyceOwdOJiaXZItwSbeCNXj69l53wsG1Z9zYfCMuUk5uIqt3qxDiaSQ/640?wx_fmt=png&from=appmsg)

一个典型的案例就是，目前通过AI Agent构建平台构架的智能体工作流尚无法完成操作企业管理软件等复杂业务流程（受API及连结能力限制），而通过RPA等超自动化工具连结更多的简单智能体工作流就是不错的方式。

与此同时，RPA等超自动化工具现在也已经进化成RPA Agent，使用RPA本身也是对智能体工作流的一种应用。并且这种方式，正在被越来越多地应用于企业级业务场景。

在王吉伟频道看来，Agentic Workflow并非简单的智能体工作流，而是包含传统软件（工具、解决方案）、大语言模型、AI Agent等在内的新型业务流程的集合。当传统业务流程包含了LLM工作流或者Agent工作流，都可以视作Agentic Workflow。

尤其是在大语言模型Agent化以及智能助手（Copilot也具备反思、规划、工具使用能力并能调用Agent）Agent化的趋势下，显然它们更符合Agentic Workflow的定义。

所以要研究Agentic Workflow，不只要看AI Agent以及Agentic Workflow本身，更要关注大语言模型及RPA等传统业务流程在LLM及Workflow方面的进展。

![](https://mmbiz.qpic.cn/mmbiz_jpg/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJAC7UK6Iw64ICx9QRgibDJib4O1icXZNdDwMxGMxc6fpQVGYlJj2oxRFdw/640?wx_fmt=jpeg&from=appmsg)

为了让大家更好地学习与理解Agentic Workflow，本文精选了25篇智能体工作流相关的论文，并将其分为技术框架、系统（套件与工具）、评估测试基准、编程语言、模型与工作流及方法论六大类，希望对大家有所帮助。

**注：为了方便不能科学上网的朋友，已将本文提到的所有论文打包。后台发消息**Workflow**  ，获取论文资源。**

****一、技术框架****

** 1、Sibyl：用于复杂现实世界推理的简单而有效的智能体框架**

Sibyl: Simple yet Effective Agent Framework for Complex Real-world Reasoning

论文地址：https://arxiv.org/abs/2407.10718

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJxxlhgJcpnjRsTZAwbz7ydOuuL0ibGUuwdxWJmDFkibwoFTGw5MpLwm6g/640?wx_fmt=png&from=appmsg)

大型语言模型（LLM）集成了固有知识、上下文学习和零样本能力，展现出强大的问题解决能力。然而，现有智能体在长期推理和工具潜力利用方面存在不足，导致现实世界推理任务中的缺陷。为克服这些限制，Sibyl作为一个新型的LLM智能体框架，通过最少工具有效处理复杂推理任务。

Sibyl从全球工作空间理论中获取灵感，整合了全球工作空间，加强了系统知识和对话历史的管理与共享。在心智理论的指导下，Sibyl通过多主体辩论的陪审团机制自我完善答案，确保全面性和平衡性。这一设计旨在简化系统复杂性，拓宽问题解决范围，促进从系统1到系统2的思维转变。

Sibyl注重可扩展性和易调试性，采用函数式编程中的重入概念，以无缝集成到其他LLM应用中。在GAIA基准测试集中，Sibyl实现了34.55%的平均得分，展现了其先进性能。论文作者期望Sibyl能推动开发更可靠和可重用的LLM智能体，以应对复杂的现实世界推理挑战。

** 2、PEER：使用多智能体框架和调优方法对特定领域的任务进行专业化**

PEER: Expertizing Domain-Specific Tasks with a Multi-Agent Framework and Tuning Methods

论文地址：https://arxiv.org/abs/2407.06985

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJ0DVC1nWfRwNoA88rLgparHevg6GmQJJJ58b4JG4K9DiaqoHialj6rBKQ/640?wx_fmt=png&from=appmsg)

在专业领域应用中，GPT-4 通过精确的提示和检索增强生成（RAG）技术展现出巨大潜力，但同时也面临性能、成本和数据隐私的三重困境。高性能需求往往需要复杂的技术处理，而要管理多个智能体在复杂工作流程中的表现，不仅成本高，难度也大。

为应对这些挑战，论文提出了 PEER（规划、执行、表达、审查）多智能体框架。该框架通过整合精细的问题拆解、高效的信息检索、综合的总结能力以及严格的自我评估，系统化地处理专业领域任务。

考虑到成本和数据隐私的顾虑，许多企业正从 GPT-4 等专有模型转向定制模型，以期在成本、安全性与性能之间找到平衡点。团队利用在线数据和用户反馈，开发了一套行业实践，旨在实现模型的高效调整。

本研究提供了一套最佳实践指南，用于在特定领域问题解决中应用多智能体系统，并实施有效的智能体调优策略。特别是在金融问答领域的实证研究表明，该方法达到了 GPT-4 性能的 95.0%，同时在成本控制和数据隐私保护方面表现出色。

** 3、BMW Agents——通过多智能体协作实现任务自动化的框架**

BMW Agents – A Framework For Task Automation Through Multi-Agent Collaboration

论文地址：https://arxiv.org/abs/2406.20041

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJqbkiby4yHy2Kk2rkMlWrB8DLfCrqHiclLQ7AyjLYJyZsiaU5L3ibpRmZibw/640?wx_fmt=png&from=appmsg)

由大型语言模型（LLM）驱动的自主智能体展现了自动化的巨大潜力。技术的初步成效已在多个演示中显现，其中包括智能体解决复杂任务、与外部系统交互以扩展知识，以及触发必要操作。

特别是，多个智能体以协作方式共同解决复杂任务的场景，彰显了它们在非严格和非明确环境下的运作能力。因此，多智能体方法在许多工业应用中具有极大的应用潜力，无论是构建复杂的知识检索系统还是开发下一代机器人流程自动化。

考虑到当前LLM一代的推理能力，处理复杂流程需要采取多步骤策略，这包括制定明确定义的模块化任务计划。这些任务可以由单一智能体或一组智能体根据其复杂性执行。在本项研究中，团队专注于构建一个灵活的智能体工程框架，特别关注规划和执行阶段，以应对跨不同领域的复杂应用案例。

该框架能够为工业应用提供了所需的可靠性，并且为确保多个自主智能体能够协同工作、共同解决问题提供了一套可扩展、灵活且协作的技术流程。

** 4、Trace是新的AutoDiff——解锁计算工作流的高效优化**

Trace is the New AutoDiff – Unlocking Efficient Optimization of Computational Workflows

论文地址：https://arxiv.org/abs/2406.16218

项目地址：https://microsoft.github.io/Trace

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJzgicmF0AcOOtG1EAJMSiagcItvnEsZUj0NiaaXt78ntNXPz6UKdEYP5AQ/640?wx_fmt=png&from=appmsg)

论文探索了一种针对自动化编码助手、机器人和副驾驶等人工智能系统的优化问题，研究团队开发了一个名为Trace的端到端优化框架，它将AI系统的计算流程视为神经网络图，并基于反向传播的泛化进行优化。这种优化处理了包括丰富反馈、异构参数和复杂目标在内的多种因素，并能适应动态变化的计算图。

Trace框架通过一种新的迭代优化数学设置——使用跟踪预言机优化（OPTO）——来捕获和抽象AI系统的特性，以设计跨领域的优化器。在OPTO中，优化器通过接收执行跟踪和输出反馈来迭代更新参数。Trace提供了一个Python接口，利用类似PyTorch的接口高效地将计算流程转换为OPTO实例。

利用Trace，团队开发了一个名为OptoPrime的通用优化器，它基于LLM，能够解决多种OPTO问题，包括数值优化、提示优化、超参数调优、机器人控制器设计和代码调试等，且性能可与领域内专业优化器相媲美。论文认为，Trace、OptoPrime和OPTO框架将推动下一代交互式智能体的发展，使其能够利用各种反馈实现自动适应。

** 5、RCAgent：使用工具增强型大型语言模型的自治智能体进行云根本原因分析**

RCAgent: Cloud Root Cause Analysis by Autonomous Agents with Tool-Augmented Large Language Models

[https://arxiv.org/abs/2310.16340](https://arxiv.org/abs/2310.16340)

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJYljlZJVVag9wJ9wlMl1icvqEQUSOrjS7Vqtn3cfr8GicXHYmps6H1MAQ/640?wx_fmt=png&from=appmsg)

近期，云根本原因分析（RCA）领域对大型语言模型（LLM）的应用进行了积极探索。但现有方法仍依赖手动设置工作流，未能充分发挥LLM在决策和环境交互方面的能力。为此，研究团队推出了RCAgent，这是一个工具增强的LLM自治智能体框架，专为实用且注重隐私的工业RCA设计。

RCAgent不依赖外部模型如GPT系列，而是在内部部署的模型上运行，能够自主进行自由格式的数据收集和综合分析。该框架融合了多项增强功能，包括行动轨迹的自洽性，以及一系列用于上下文管理、稳定性提升和领域知识导入的方法。

实验结果表明，RCAgent在RCA的多个方面（如预测根本原因、解决方案、证据和责任）以及规则内外任务上均显示出显著且一致的优势，这些优势已通过自动化指标和人工评估得到验证。此外，RCAgent已成功集成至阿里云Apache Flink实时计算平台的诊断和问题发现工作流程中，进一步提升了工业RCA的效率和准确性。

****二、系统、套件与工具****

** 1、AgileCoder：基于敏捷方法论的软件开发动态协作智能体**

AgileCoder: Dynamic Collaborative Agents for Software Development based on Agile Methodology

论文地址：https://arxiv.org/abs/2406.11912

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJic6eF7RJmIBRG8mpDtHOVzMOlB8ThaVuTF8ic0WVNPGY7pzZZ7rAcIsw/640?wx_fmt=png&from=appmsg)

软件智能体正成为解决复杂软件工程任务的有前景的工具。然而，现有研究常常过于简化软件开发流程，而现实世界中的这些流程往往更为复杂。

为了应对这一挑战，研究团队设计了AgileCoder，这是一个将敏捷方法论（AM）整合进框架的多智能体系统。该系统将特定的AM角色，如产品经理、开发人员和测试人员，分配给不同的智能体，它们根据用户输入协作开发软件。

AgileCoder通过组织工作为一系列冲刺（sprint），提高开发效率，并专注于逐步完成软件的开发。此外，还引入了一个动态代码图生成器，该模块能够在代码库更新时动态创建代码依赖图。这使得智能体能够更深入地理解代码库，从而在软件开发过程中实现更精确的代码生成和修改。

AgileCoder在性能上超越了现有的基准，如ChatDev和MetaGPT，树立了新的标准，并展现了多智能体系统在高级软件工程环境中的强大能力。这标志着软件开发向更自动化、智能化方向迈出了重要一步。

** 2、Parrot：使用语义变量高效提供基于LLM的应用程序**

Parrot: Efficient Serving of LLM-based Applications with Semantic Variable

论文地址：https://arxiv.org/abs/2405.19888

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJ2VxosQ9VIJBc67FM8QNgQ6WFvBKT3yBzeIqeaNz0zWk1gKs7P4vhRg/640?wx_fmt=png&from=appmsg)

LLM的兴起催生了基于LLM与传统软件优势的新型应用程序——AI智能体（也叫副驾驶），这是一种软件新范式。

不同租户的LLM应用程序通过多个LLM请求设计复杂工作流以完成任务，但受限于当前公共LLM服务提供的简化请求级API，丢失了关键的应用程序级信息。这些服务只能盲目优化单个LLM请求，导致应用程序的整体性能不佳。

该论文介绍了Parrot，这是一个专注于LLM应用程序端到端体验的服务系统。Parrot引入了语义变量的概念，这是一种统一的抽象，将应用程序级知识暴露给公共LLM服务。语义变量在请求提示中标注输入/输出变量，并在连接多个LLM请求时形成数据管道，提供了一种自然的LLM应用程序编程方式。

公开语义变量给公共LLM服务，使其能够执行数据流分析，揭示多个LLM请求间的相关性，为LLM应用程序的整体性能优化开辟了新空间。广泛的评估显示，Parrot针对流行和实际的LLM应用程序用例实现了显著的性能提升。

** 3、使用基础模型实现企业自动化**

Automating the Enterprise with Foundation Models

论文地址：https://arxiv.org/abs/2405.03710

项目地址：https://github.com/HazyResearch/eclair-agents

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJZdtdslU4JNpQEicE3py0QJICIgCcwRIZIUglyzD6ibVicPyjsIMDPjJKw/640?wx_fmt=png&from=appmsg)

企业工作流程自动化每年可带来 4 万亿美元的生产力提升。尽管这一领域已受到数据管理社区数十年的关注，但实现端到端工作流自动化的终极目标仍然具有挑战性。现有解决方案主要依赖流程挖掘和机器人流程自动化（RPA），这些机器人通常被硬编码以遵循预设规则。

通过对医院和大型B2B企业的案例研究，研究团队发现RPA的普及受到诸如高设置成本（12-18个月）、执行不可靠（初始准确率60%）和维护繁重等问题的制约。新一代多模态基础模型（FM），如GPT-4，以其卓越的推理和规划能力，为工作流自动化提供了新的可能性。

为此，论文提出了ECLAIR系统，它在最少人工监督下实现企业工作流程自动化。初步实验显示，ECLAIR通过多模态FM实现了接近人类水平的工作流理解（准确率93%），并基于工作流的自然语言描述即可快速设置，实现了40%的端到端完成率。论文认为，人与AI的协作、验证和自我改进是未来研究的开放性挑战，并提出利用数据管理技术来解决这些问题。

** 4、S-Agents：开放环境中的自组织智能体**

S-Agents: Self-organizing Agents in Open-ended Environments

[https://arxiv.org/abs/2402.04578](https://arxiv.org/abs/2402.04578)

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJO8hRxhp3ywZcdR2ml0g5yaPrXEwPljEhJvEHTZOL9Cj1cT4icPgicvhw/640?wx_fmt=png&from=appmsg)

利用LLM，自主智能体在处理各类任务上取得了显著进步。在开放环境中，为了提升协作的效率和有效性，需要灵活调整策略。然而，现有研究多聚焦于固定且任务导向的工作流程，而忽视了以智能体为中心的组织结构。

受人类组织行为的启发，该团队提出了一种自组织智能体系统（S-Agents），它包括动态工作流的“智能体树”结构、用于平衡信息优先级的“沙漏智能体架构”，以及支持智能体间异步任务执行的“非阻碍协作”方法。这一结构使得一组智能体能在无人为干预下，有效应对开放和动态环境的挑战。

团队的实验在Minecraft环境中进行，S-Agent系统在执行协作建造和资源收集任务时表现出了熟练和高效，从而验证了其组织结构和协作方法的有效性。这一研究成果为智能体在复杂环境中的自组织协作提供了新的视角和解决方案。

** 5、一种人机协作工具，用于通过几个示例将单个大型语言模型智能体训练到网络中**

A Human-Computer Collaborative Tool for Training a Single Large Language Model Agent into a Network through Few Examples

论文地址：https://arxiv.org/abs/2404.15974

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJ7sDVMNKgPNjAFlgvMUVCMYrZVA9gb4ibrEdoOmU1FYJ3icyRqpqgNHPQ/640?wx_fmt=png&from=appmsg)

单个大型语言模型（LLM）智能体在解决复杂任务时能力有限。通过将多个LLM智能体连接成网络，可以显著提升整体性能。然而，构建这样的LLM智能体网络（LAN）是一项耗时且复杂的过程。

在本研究中，团队推出了EasyLAN，这是一个旨在帮助开发者构建智能体网络的人机协作工具。EasyLAN首先根据任务描述生成一个只包含单个智能体的网络。然后，它利用训练样本来逐步优化网络。EasyLAN会分析输出与实际值之间的差异，诊断错误原因，并采取策略进行修正。用户可以参与EasyLAN的工作流程，或直接对网络进行调整。

最终，网络从单一智能体发展成为一个成熟的LLM智能体网络。实验结果表明，使用EasyLAN，开发者能够迅速构建出性能优异的智能体网络。这一工具极大地简化了智能体网络的构建过程，提高了开发效率。

** 6、PromptRPA：根据文本提示在智能手机上生成机器人流程自动化**

PromptRPA: Generating Robotic Process Automation on Smartphones from Textual Prompts

论文地址：https://arxiv.org/abs/2404.02475

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJkoVdCeQt4PGWjyKSYx1UrbqVUvKmKkRwwbEMS9m7bwt9KmME8EGHNQ/640?wx_fmt=png&from=appmsg)

机器人流程自动化（RPA）通过模拟人机交互，在不修改现有代码的基础上，为自动化图形用户界面（GUI）上的任务提供了有效的解决方案。但RPA的广泛应用受限于对脚本语言和工作流设计专业知识的需求。

为解决这一问题，研究团队提出了PromptRPA，这是一个能够理解与任务相关的各种文本提示（如目标、程序）并生成及执行相应RPA任务的系统。

PromptRPA由一系列智能体组成，它们模仿人类的认知功能，专门用于解读用户意图、管理由RPA生成的外部信息，并在智能手机上执行操作。这些智能体能够从用户反馈中学习，并根据积累的知识不断提升性能。

实验结果显示，使用PromptRPA后，性能从基线的22.28%显著提升至95.21%，且每个新任务平均仅需1.66次用户干预。

PromptRPA在创建教程、智能辅助以及客户服务等领域展现出广阔的应用前景，为RPA技术的进一步普及和应用提供了新的可能性。

7、ProAgent：从机器人流程自动化到智能体流程自动化

ProAgent: From Robotic Process Automation to Agentic Process Automation

论文地址：https://arxiv.org/abs/2311.10751

项目地址：https://github.com/OpenBMB/ProAgent

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJ8ARKPSLrIhmpS9icFNNGqe05aVmP3jcoFUbQiaQtcejZzXXsO9og4EeQ/640?wx_fmt=png&from=appmsg)

自动化技术从古代的水车发展到今天的RPA，一直在解放人类从事繁重任务。但RPA在处理需要人类智能的任务时面临挑战，尤其是在精心设计工作流和执行中的动态决策方面。

随着大型语言模型（LLM）的出现，研究团队提出了智能体流程自动化（APA），这是一种革命性的自动化新范式，利用基于LLM的智能体实现高级自动化，通过将任务分配给负责构建和执行的智能体来减轻人力负担。

论文具体实现了ProAgent，这是一个基于LLM的智能体，它可以根据人工指令创建工作流程，并通过协调专业的智能体做出复杂决策。

通过实证实验，论文详细展示了APA在工作流构建和执行方面的过程，证明了APA的可行性，并展现了由智能体驱动的自动化新范式的巨大潜力。这不仅为自动化领域带来了新的视角，也为未来智能自动化的发展提供了新的方向。

8、基于LLM的智能体调查：常见工作流和可重用的LLM分析组件

A Survey on LLM-Based Agents: Common Workflows and Reusable LLM-Profiled Components

论文地址：https://arxiv.org/abs/2406.05804

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJmjWKibibib278IqDJexiaAMbaZE3V8OR6YkzianAY920ZgAZMdz3QP9XDhw/640?wx_fmt=png&from=appmsg)

大型语言模型（LLM）的最新进展推动了基于LLM的复杂智能体框架的开发。然而，这些框架的复杂性在一定程度上阻碍了细粒度差异化的实现，这对于在不同框架间高效实现功能和推动未来研究至关重要。因此，该调查的主要目标是通过识别通用工作流程和可重用的LLM分析组件（LMPC），来促进对近期提出的多种框架的统一理解。

这项工作旨在简化不同智能体框架之间的差异，通过提取共通的工作流程和分析组件，为研究者和开发者提供一个更加清晰和一致的视角。通过这种方式，论文希望能够降低开发和维护智能体框架的难度，同时为未来的研究和创新打下坚实的基础。

****三、评估测试基准****

** 1、WorkArena++：迈向基于作文规划和推理的常识性工作任务**

WorkArena++: Towards Compositional Planning and Reasoning-based Common Knowledge Work Tasks

论文地址：https://arxiv.org/abs/2407.05291

基准测试项目：https://github.com/ServiceNow/WorkArena/tree/workarena-plus-plus

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJOhuUT5kX5NNmiajJZmupO9n1NBT74fNE739SWx1NiaBzCVRDr4VSlCRQ/640?wx_fmt=png&from=appmsg)

大型语言模型（LLM）因其模仿人类智能的能力而备受关注，这促使基于LLM的自主智能体数量激增。尽管最新的LLM展现出根据用户指令进行规划和推理的潜力，但它们在自主任务解决方面的实际应用效果尚待深入研究。特别是在企业环境中，自动化智能体的应用被寄予厚望，期望能够带来显著的影响。

为了解决这一研究空白，论文提出了WorkArena++，这是一个创新的基准测试套件，包含682个任务，覆盖知识工作者日常执行的实际工作流程。WorkArena++的目标是全面评估网络智能体在规划、问题解决、逻辑/算术推理、信息检索以及上下文理解等方面的能力。

通过对最先进的LLM、视觉语言模型（VLM）以及人类工作者的实证研究，论文揭示了这些模型在职场中作为有效助手所面临的若干挑战。

除了基准测试，论文还提供了一种机制，能够轻松生成数千条基于真实情境的观察/动作轨迹，这些轨迹可以用于微调现有的智能体模型，并期望这项工作能够成为推动社区向有能力的自主智能体发展的重要资源。

** 2、FlowBench：重新审视基于LLM的智能体工作流引导规划并对其进行基准测试**

FlowBench: Revisiting and Benchmarking Workflow-Guided Planning for LLM-based Agent

论文地址：https://arxiv.org/abs/2406.14884

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJhyMrIUIRlBF2Vm8NceFRUzgQQrh1JicM9MicrLuwRjWJRf4icYHKjtPPA/640?wx_fmt=png&from=appmsg)

大型语言模型（LLM）驱动的智能体已成为执行复杂任务的有前途工具，它们通过迭代规划和行动来完成任务。但当缺乏对专业知识密集型任务的深入理解时，这些智能体可能会产生不切实际的规划幻想。为提高规划的可靠性，该团队尝试整合与工作流相关的外部知识。

尽管这一方法有潜力，但整合的知识往往杂乱无章、形式多样，缺乏严格的形式化和全面评估。因此，该团队对不同格式的工作流知识进行形式化处理，并推出了FlowBench——首个工作流引导规划的基准测试。FlowBench覆盖6个领域的51个不同场景，以多种形式展现知识。

为了在FlowBench上评估不同的LLM，团队设计了一个多层评估框架，评估了工作流知识在多种格式下的有效性。结果表明，现有的LLM智能体在规划方面还有很大的提升空间。论文期望FlowBench这一具有挑战性的基准测试能够为未来智能体规划研究提供参考，推动相关技术的进步。

** 3、多模态基础模型是否了解企业工作流？业务流程管理任务的基准**

Do Multimodal Foundation Models Understand Enterprise Workflows? A Benchmark for Business Process Management Tasks

论文地址：https://arxiv.org/abs/2406.13264

数据集和实验项目地址：https://github.com/HazyResearch/wonderbread

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJEru9VD9nAlEbKFESgqL9OZr2Ribzlm8YcJZnVzEibds3UWlaRFzk4x0w/640?wx_fmt=png&from=appmsg)

现有的机器学习（ML）基准测试在评估业务流程管理（BPM）任务时，缺乏足够的深度和多样性的注释。BPM 是一种旨在记录、衡量、改进和自动化企业工作流的实践。

目前的研究几乎完全集中在单一任务上，即利用多模态基础模型（FM）如 GPT-4 实现端到端的自动化。这种对自动化的专注忽视了大多数BPM工具的实际应用情况——在典型的流程优化项目中，仅仅记录相关工作流就占据了60%的时间。

为了填补这一空白，研究团队推出了WONDERBREAD，这是首个用于评估BPM任务的多模态FM基准测试，它超越了自动化的范畴。该论文的贡献包括：

- 

一个包含2928个记录工作流程演示的数据集；

- 

6个新的BPM任务，涵盖从工作流文档到知识转移再到流程改进的实际应用；

- 

一套自动评估工具。基准测试显示，尽管最先进的FM能够自动生成文档（例如，在工作流程的视频演示中识别88%的步骤），但它们在将这些知识重新应用于更精细的工作流程完成验证方面表现不佳（F1分数小于0.3）。

团队期望WONDERBREAD能够激励开发更多以人为中心的AI工具，用于企业应用程序，并进一步探索多模态FM在更广泛的BPM任务中的应用。

****四、编程语言****

**** APPL：一种提示编程语言，用于程序和大型语言模型提示的和谐集成

APPL: A Prompt Programming Language for Harmonious Integration of Programs and Large Language Model Prompts

**论文地址： [https://arxiv.org/abs/2406.13161](https://arxiv.org/abs/2406.13161)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJeiadgpvoqgn6qd0O4HlCMbj2d2zbhI8Yu53ShzCJgWHjQXpSXI1cDFQ/640?wx_fmt=png&from=appmsg)

大型语言模型（LLM）通过精心设计的提示和外部工具的集成，日益展现出处理各类任务的能力。然而，随着任务复杂性的提升，涉及LLM的工作流程可能变得复杂，难以实现和维护。为解决这一难题，研究团队提出了APPL，一种新颖的提示编程语言，它作为计算机程序与LLM之间的桥梁，支持将提示无缝嵌入Python函数，反之亦然。

APPL具备直观的Python原生语法，拥有异步语义的高效并行化运行时环境，并且配备了无需额外成本的跟踪模块，以支持有效的故障诊断和重放。论文通过三个典型场景——自一致性的思维链（CoT-SC）、ReAct工具使用的智能体，以及多智能体聊天——证明了APPL程序的直观性、简洁性和高效性。

此外，对三个可并行化工作流的实验进一步证实了APPL在并行化独立LLM调用方面的有效性，并实现了与预期估算相匹配的显著加速比。这表明APPL是一个强大的工具，能够提升LLM在复杂任务中的性能和可用性。

****五、模型与工作流****

** 1、Granite Code Models：用于代码智能的开放基础模型系列**

Granite Code Models: A Family of Open Foundation Models for Code Intelligence

**论文地址： [https://arxiv.org/abs/2405.04324](https://arxiv.org/abs/2405.04324)

**项目地址： [https://github.com/ibm-granite/granite-code-models](https://github.com/ibm-granite/granite-code-models)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJqvXhOKa4lGEnQ4fOtXewR33pz3Dr0X9SCymPibcHicttUbw2ZuibPOVrg/640?wx_fmt=png&from=appmsg)

LLM在代码训练方面取得了突破性进展，正深刻改变着软件开发的生态。越来越多的代码LLM被融入到软件开发工具中，以提升程序员的工作效率。同时，基于LLM的智能体也开始展现出独立处理复杂编码任务的能力。

要充分发挥代码LLM的潜力，需要它们具备广泛的能力，如代码生成、错误修复、代码解释、文档编写和代码库维护等。在本项研究中，团队推出了Granite系列仅解码器代码模型，专门用于代码生成任务。这些模型经过了116种编程语言的代码训练，覆盖了从30亿到340亿参数大小不等的多种模型，能够满足从复杂的应用现代化到设备内存受限的各种场景。

通过一系列综合任务的评估，团队发现Granite Code模型在所有可用的开源代码LLM中始终保持最先进的性能。

该模型系列针对企业级软件开发流程进行了特别优化，在代码生成、修复和解释等多项编码任务中均有出色表现，成为一个多功能的全能型代码模型。所有Granite Code模型均在Apache 2.0许可下发布，既适用于研究也适用于商业用途，为软件开发领域带来了前所未有的灵活性和创新潜力。

** 2、迈向实现零样本提示优化的分层多智能体工作流程**

Towards Hierarchical Multi-Agent Workflows for Zero-Shot Prompt Optimization

**论文地址： [https://arxiv.org/abs/2405.20252](https://arxiv.org/abs/2405.20252)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJ1adAZic9yYQk6JBx3PMsR2GXnnLn5fkLqGpEo4g4aaEPJokf1Fp5ZJQ/640?wx_fmt=png&from=appmsg)

大型语言模型（LLM）在解答用户问题上取得了显著进步，支撑了多样化的应用场景。但LLM的回答质量极大程度上依赖于提示的质量，一个精心设计的提示能够引导LLM准确回答极具挑战性的问题。

尽管已有研究开发了多种策略来优化提示，包括手工制作和领域内优化，它们在开放场景下的有效性仍受限，因为前者依赖于人类对问题的理解，而后者对未见过场景的泛化能力不足。

为克服这些限制，研究团队提出了一种让LLM自主设计最佳提示的方法。具体来说，团队构建了一个分层的提示生成框架，首先创建包含精确指令和准确措辞的提示，再基于此生成最终答案。这一流程称为分层多智能体工作流（HMAW）。

与现有方法相比，HMAW不受任何人类预设限制，无需训练，完全任务独立，同时能够适应任务的细微差别。通过跨多个基准的实验，证实了HMAW虽然简单，却能创建出详尽且合适的提示，进一步提升了LLM的性能。

** 3、面向混合现实的多模态细粒度培训助手的自主工作流**

Autonomous Workflow for Multimodal Fine-Grained Training Assistants Towards Mixed Reality

**论文地址： [https://arxiv.org/abs/2405.13034](https://arxiv.org/abs/2405.13034)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJKETof1pTBSPndnZjDyBqFb8iaIHVBLwbvpqG8Gc23FXibFFemibYkV5yg/640?wx_fmt=png&from=appmsg)

自主人工智能智能体（Autonomous Agent）在自动理解基于语言的环境中展现出巨大潜力，尤其是在大型语言模型（LLM）迅猛发展的背景下。然而，对多模态环境的深入理解尚待进一步探索。本研究设计了一个自主工作流程，旨在将AI智能体无障碍地集成到扩展现实（XR）应用中，实现细粒度训练。

论文展示了一个在XR环境中用于乐高积木组装的多模态细粒度培训助手的案例。该智能体结合了LLM、记忆、规划功能以及与XR工具的交互能力，能够根据历史经验做出决策。此外，论文介绍了LEGO-MRTA，这是一个多模态细粒度装配对话数据集，它能够在商业LLM服务的工作流程中自动合成，包含多模态说明、对话、XR响应和视觉问答。

研究团队选取了几个流行的开放资源LLM作为基准，评估它们在微调和未微调状态下对团队提出的数据集的性能。论文期望这一工作流程能够推动更智能助手的开发，实现XR环境中的无缝用户交互，并促进AI和人机交互（HCI）社区的研究。

****六、方法论****

** 1、利用多AI智能体进行跨领域知识发现**

Leveraging Multi-AI Agents for Cross-Domain Knowledge Discovery

**论文地址： [https://arxiv.org/abs/2404.08511](https://arxiv.org/abs/2404.08511)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJS2qdV1fCdpSEs2OibCziaOZtrMlRTmx8lz3BUEuMQ0ntRictPicrcIg4lA/640?wx_fmt=png&from=appmsg)

在迅速发展的人工智能领域，跨领域知识的整合与应用是一项关键的挑战与机遇。本研究提出了一种新方法，通过部署专注于不同知识领域的多人工智能智能体，实现跨学科的知识发现。每个智能体都像特定领域的专家，在统一框架下协同工作，提供综合的、超越单一领域限制的深入见解。

研究团队的平台通过促进智能体间的无缝互动，利用每个智能体的独特优势，增强了知识发现和决策过程。通过对比分析不同的多智能体工作流场景，评估了它们在效率、准确性和知识整合广度上的表现。实验结果表明，这些特定领域的多智能体系统在识别和填补知识空白方面表现出色。

这项研究不仅凸显了协作智能在促进创新中的关键作用，也为人工智能推动的跨学科研究和应用的发展奠定了基础。团队在小规模试点数据上评估了其方法，结果显示出预期趋势，随着自定义训练智能体的数据量增加，这些趋势预计将变得更加明显。

** 2、从头开始为类似计划的任务开发基础模型的案例**

The Case for Developing a Foundation Model for Planning-like Tasks from Scratch

**论文地址： [https://arxiv.org/abs/2404.04540](https://arxiv.org/abs/2404.04540)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJeYQnnGQe1LEPIzBOOsr3erzdPgjYYyrnlvBybSQuIpmZBvoA9MZhgw/640?wx_fmt=png&from=appmsg)

基础模型 （FM） 彻底改变了许多计算领域，包括自动规划和调度 （APS）。例如，最近的一项研究发现它们对规划问题很有用：计划生成、语言翻译、模型构建、多智能体规划、交互式规划、启发式优化、工具集成和大脑启发规划。

除了APS，还有许多任务涉及生成一系列行动，这些行动对于达成目标的可执行性有不同的保障，团队统称这些为类似计划（PL）任务，例如业务流程、程序编写、工作流管理和指南制定。研究人员正考虑将FM应用于这些领域。

然而，以往的研究多集中在使用现成的预训练FM，并可能对它们进行微调。该论文讨论了为PL任务从头开始设计全面的FM的必要性，并探讨了设计时需考虑的因素。论文认为，这样的FM将为PL问题提供新的有效解决方案，正如大型语言模型（LLM）为APS领域所做的那样。

** 3、Transformations时代的转变**

Transformations in the Time of The Transformer

**论文地址： [https://arxiv.org/abs/2401.10897](https://arxiv.org/abs/2401.10897)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJYexUIzt4sq8abUjS4Cic4icXbFIyEs9KdrhhNAMab67hcaNoiakTynOdg/640?wx_fmt=png&from=appmsg)

基础模型为以人工智能为主导的视角重新设计现有系统和工作流程提供了新的机遇。然而，实现这一转型面临着挑战和需要权衡的问题。本文旨在提供一个结构化的框架，帮助企业在向以AI为优先的组织转型过程中做出明智的决策。所提供的建议旨在帮助企业全面、有意识地做出知情的选择，同时避免受到不必要的干扰。

尽管这个领域看似发展迅猛，但其中一些核心的基础要素发展步伐相对较慢。团队专注于这些稳定不变的因素，以此构建论证的逻辑基础。通过深入理解这些不变的基本面，企业可以更稳健地把握AI转型的方向和步骤。

** 4、协同人机交互：与基于LLM的智能体进行服务共创的23种启发式指南**

Synergizing Human-AI Agency: A Guide of 23 Heuristics for Service Co-Creation with LLM-Based Agents

**论文地址： [https://arxiv.org/abs/2310.15065](https://arxiv.org/abs/2310.15065)
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxWPtTM6znf16nYcsGmegnbJNFPLTibFQvsGmBJfQTWAvfl1xbXtFTs2MMSBGialJVCZOLicTm0TjMTfw/640?wx_fmt=png&from=appmsg)

本项实证研究为服务供应商提供了入门知识，帮助他们确定是否以及如何将大型语言模型（LLM）技术集成到其从业者和更广泛社区的工作之中。通过CoAGent——一种与基于LLM的智能体共同创造服务的工具，研究团队探索了非AI专家与AI相互学习的过程。

这项研究通过与23位来自美国公共图书馆的领域专家合作，经历了一个三阶段的参与式设计流程，揭示了将AI集成到人类工作流程中所面临的根本性挑战。

研究结果提供了23种可操作的“与AI共同创造服务的启发式方法”，这些方法突出了人类与AI之间微妙的共同责任。并进一步提出了人工智能的9个基本智能体方面，强调了所有权、公平待遇和言论自由等基本要素。这种创新方法通过将AI视为关键利益相关者，并利用AI与AI的交互来识别盲点，从而丰富了参与式设计模型。

这些见解为服务环境中协同和道德的人类与AI共创铺平了道路，为人工智能共存的劳动力生态系统做好了准备。这不仅为服务供应商提供了实用的指导，也为构建人机协作的未来提供了宝贵的洞见。

** 5、计算管理的基础：将人工智能集成到现有工作流程中的任务自动化的系统方法**

The Foundations of Computational Management: A Systematic Approach to Task Automation for the Integration of Artificial Intelligence into Existing Workflows

**论文地址： [https://arxiv.org/abs/2402.05142](https://arxiv.org/abs/2402.05142)

在AI迅猛发展的今天，组织面临一个核心问题：如何将AI技术有效融入现有运营？为解答这一问题、调控期望并减少挑战，该论文引入了计算管理——一种系统化的任务自动化方法，旨在增强组织利用AI的潜力。计算管理融合了管理科学的战略洞察与计算思维的分析精确性，架设了二者之间的桥梁。

论文提供三个分步流程，以助于在工作流中启动AI的集成。

首先是任务（重新）制定，它将工作活动拆解为基本单元，每个单元由智能体执行，包括明确行动并产生多样结果。

第二，评估任务自动化潜力，通过任务自动化指数对任务进行评估，依据其标准化输入、规则明确性、重复性、数据依赖性和客观输出进行排序。

第三，任务规范模板详述了16个关键组件，作为选择或调整AI解决方案以适应现有工作流程的清单。

这些流程结合了手动和自动方法，并为现有的大型语言模型（LLM）提供了使用提示，以辅助完成这些步骤。计算管理为人与AI的协同提供了路线图和工具，提升了组织效率和创新力，为人机共荣的未来铺平了道路。

*注：本文论文叙述部分配图，皆来自论文截图，具体内容请参考论文详情。*

全文完

**【文末福利1】：后台发消息**Workflow** ，获取本文提到的25篇论文资源。**

![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxW2aPyWCupKTPBEMFlLranj1USPfCibNXPic84JQlib8AeRev60DJl3hWpcAsLGSOZiadAqoIQyxHtZbw/640?wx_fmt=png&from=appmsg)
【文末福利2】：后台发消息**agentic** ，获取**Agentic AI** 相关资源。
![](https://mmbiz.qpic.cn/mmbiz_png/dhuZGgEcGxUB2icKMPVVBy5DzKDxI73BJD88E1mz0HfDI9yssqVWhI3FAorFnHTM66lo0s9ykE3k6CYeibemiapKw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**【文末福利3】：后台发消息**Agent2024** ，获取十份AI Agent研报及论文资源。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/dhuZGgEcGxUUz2K4iaXibDc8lGuUkUic5QDdQByAjcb5GFnibqfmZNN0QWYDOQTicxsbCHnYKicjMrLDpnKvr1zv68iaQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)
![](https://mmbiz.qpic.cn/mmbiz_gif/dhuZGgEcGxXegD57aOiazgn9Z0JAZaoeuTGrfv44mlOqXZgLdulxVo4QPFxKvkHYfdH7xaIhCoMDKUw0TOicHibCA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp)

****RECOMMEND****

推荐阅读

[1、](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593364&idx=1&sn=f6714b5425f720ef39d3e51ed8e5ce26&chksm=88b9d182bfce589440568da59c58119c3f25915a5b959d8ec6904de98203760a5d7b6dc4fdc8&scene=21#wechat_redirect)[API难以解决AI智能体执行能力问题，AI Agent深度落地锁定RPA](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593544&idx=1&sn=285ec85cc082c34b46131819068f7540&chksm=88b9d0debfce59c8fe276700ccdc3b17921d07b1b53224f7d5a2a8e84726926fd7df23562e5b&scene=21#wechat_redirect)
[2、](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593643&idx=1&sn=7791eb4566934dba49a92bc8491d9d2b&chksm=88b9d0bdbfce59abf991c9c1e90a82e1416be56cba17d6e202185696c3cfd8aa4db6aa658368&scene=21#wechat_redirect)[【万字长文】数字员工、超级个体、具身智能，AI Agent未来发展十大研究方向](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593643&idx=1&sn=7791eb4566934dba49a92bc8491d9d2b&chksm=88b9d0bdbfce59abf991c9c1e90a82e1416be56cba17d6e202185696c3cfd8aa4db6aa658368&scene=21#wechat_redirect)
[3、](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591634&idx=1&sn=0f2cf4dd1523616b804bf178fabef9c0&chksm=88b9d844bfce515232f7b04b78a75c5ac9d73b1074acbff6c9ff25be518d7faec407e88893f9&scene=21#wechat_redirect)[【万字长文】全球AI Agent大盘点，大语言模型创业一定要参考的60个AI智能体](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593007&idx=1&sn=22b24b222da839231fbaf16779f658af&chksm=88b9df39bfce562fa66990f5d90e41473c9d19a3474efd2393cd3e3b8df2cdbbc557c9589665&scene=21#wechat_redirect)
[4、](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593064&idx=1&sn=0f307fb00c95f7160c95ff1a30c54925&chksm=88b9defebfce57e8a454559bc71c26205f77236636c908a3f8663c934b4fdcb21cda0456982f&scene=21#wechat_redirect)[AI Agent发展简史，从哲学思想启蒙到人工智能实体落地](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593064&idx=1&sn=0f307fb00c95f7160c95ff1a30c54925&chksm=88b9defebfce57e8a454559bc71c26205f77236636c908a3f8663c934b4fdcb21cda0456982f&scene=21#wechat_redirect)

[5、RPA终极发展方向瞄准AI Agent，超自动化智能体时代已经开启](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593026&idx=1&sn=a470a32bff49b7de9f4127922dea9559&chksm=88b9ded4bfce57c2c926013db9b028ecc824ea2f6cd5b2d6568dc20e6fd37748d13f69bed3be&scene=21#wechat_redirect)

[6、正在强烈冲击AI Agent的“准Agent” GPTs，真的会杀死AI智能体吗？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593284&idx=1&sn=de077ee6efa51aa5ce6d94ed19ecbe1d&chksm=88b9d1d2bfce58c473bd2fc7819b5f8681387c13148f4e8d86ef4ea182891a7897619ee87900&scene=21#wechat_redirect)

****AIGC研究系列文章****

[Agentic Workflow加速Agentic AI到来，AI Agent成为重要实现方式](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650594022&idx=1&sn=ead770994c1fdf21f5edb85f1fa4263f&chksm=88b9d330bfce5a26cd9cb6fbbb6b6a13978775015cec3cf169264fe3601d7420e2c036ea90bb&scene=21#wechat_redirect)

[【万字长文】AI智能体驱动未来商业，深度剖析11种AI Agent商业模式](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593940&idx=1&sn=9c2d2e728139f5df562b903833ff7240&chksm=88b9d342bfce5a54898afc7149124cd1fee6193708726c5281521af1c0a89cd372ae0be7978e&scene=21#wechat_redirect)

[科技巨头紧锣密鼓布局智能体，你需要了解AI Agent行业未来发展的18个趋势](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593879&idx=1&sn=1cbb73996a9e1fbd05f9427902dd595c&chksm=88b9d381bfce5a97127d45190611ec2488af28a27a17d28a25353cb7e81a50829b69abbfb817&scene=21#wechat_redirect)

[AI智能体构建智能未来，全球80+AI Agent构建平台大盘点](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593838&idx=1&sn=ce5d980dae19a28a10c421ffb99cff10&chksm=88b9d3f8bfce5aee1589c22c5852bb8f8927ff4ac12f180566318e3a1bb41d49fb6640a74173&scene=21#wechat_redirect)

[AI智能体全景式解读，SWOT视角下的AI Agent行业将何去何从？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593796&idx=1&sn=5e144fbb7d8fa78a74fd2af2879c26c1&chksm=88b9d3d2bfce5ac4cd6eb6da21fb0a22abd7d1c886c391f4880d097a9d757f2f1404dfcf6a0c&scene=21#wechat_redirect)

[【深度盘点】从科技巨头到创业公司，先一步布局的AI Agent加速应用落地](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593768&idx=1&sn=91ddd4067516227c69a8f96dd24a9d8c&chksm=88b9d03ebfce5928c0c6937b37d30314e38b369f003250f9c61c4123aa5140d38bd6e74d04a9&scene=21#wechat_redirect)

[AI Agent涌向移动终端，手机智能体开启跨端跨应用业务连接新场景](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593709&idx=1&sn=fbba53f913c0d8aedc26349584c8dacc&chksm=88b9d07bbfce596dbf7484aaf3316fe49dbff97702ddbbdaade619145dbaf6a29344b6568e95&scene=21#wechat_redirect)

[AI Agent引爆AGI时代，十篇研报透视AI智能体的现在与未来](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593676&idx=1&sn=30cf55872ccf52cd20857432868b30c2&chksm=88b9d05abfce594cf8e2e8cc29ee15bf5cce67be87967a3b17f88cd4494df5b041623ba2990d&scene=21#wechat_redirect)

[【万字长文】数字员工、超级个体、具身智能，AI Agent未来发展十大研究方向](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593643&idx=1&sn=7791eb4566934dba49a92bc8491d9d2b&chksm=88b9d0bdbfce59abf991c9c1e90a82e1416be56cba17d6e202185696c3cfd8aa4db6aa658368&scene=21#wechat_redirect)

[详解AI Agent市场格局、技术路径与未来市场，智能体创业一定不要错过](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593364&idx=1&sn=f6714b5425f720ef39d3e51ed8e5ce26&chksm=88b9d182bfce589440568da59c58119c3f25915a5b959d8ec6904de98203760a5d7b6dc4fdc8&scene=21#wechat_redirect)

[API难以解决AI智能体执行能力问题，AI Agent深度落地锁定RPA](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593544&idx=1&sn=285ec85cc082c34b46131819068f7540&chksm=88b9d0debfce59c8fe276700ccdc3b17921d07b1b53224f7d5a2a8e84726926fd7df23562e5b&scene=21#wechat_redirect)

[热闹的人工智能VS酷寒的资本寒冬，2023年AI Agent项目盘点与融资分析](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593540&idx=1&sn=41d48ed5e5e57927718c2b0ceb54f539&chksm=88b9d0d2bfce59c4d01707ac05f8d4f17aa63c5920e1362dfd70028f989ef3aa1bb450a4e928&scene=21#wechat_redirect)

[正在强烈冲击AI Agent的“准Agent” GPTs，真的会杀死AI智能体吗？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593284&idx=1&sn=de077ee6efa51aa5ce6d94ed19ecbe1d&chksm=88b9d1d2bfce58c473bd2fc7819b5f8681387c13148f4e8d86ef4ea182891a7897619ee87900&scene=21#wechat_redirect)

[AI Agent发展简史，从哲学思想启蒙到人工智能实体落地](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593064&idx=1&sn=0f307fb00c95f7160c95ff1a30c54925&chksm=88b9defebfce57e8a454559bc71c26205f77236636c908a3f8663c934b4fdcb21cda0456982f&scene=21#wechat_redirect)

[【万字长文】全球AI Agent大盘点，大语言模型创业一定要参考的60个AI智能体](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593007&idx=1&sn=22b24b222da839231fbaf16779f658af&chksm=88b9df39bfce562fa66990f5d90e41473c9d19a3474efd2393cd3e3b8df2cdbbc557c9589665&scene=21#wechat_redirect)

[RPA终极发展方向瞄准AI Agent，超自动化智能体时代已经开启](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593026&idx=1&sn=a470a32bff49b7de9f4127922dea9559&chksm=88b9ded4bfce57c2c926013db9b028ecc824ea2f6cd5b2d6568dc20e6fd37748d13f69bed3be&scene=21#wechat_redirect)

[从大语言模型到大流程模型，生成式AI带来的BPM范式转变](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650593149&idx=1&sn=d4f3db8eaf05b66177d9487336efeed8&chksm=88b9deabbfce57bd4218d528b4939ae17ee66ee8fb4496f2a424c16f68ae596e2f7ca06a7d50&scene=21#wechat_redirect)

[产业上下游齐发力LLM挺进端侧，大语言模型加速落地利好超自动化](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592770&idx=1&sn=46c634dfc5e5c619deb4471bdaab05b5&chksm=88b9dfd4bfce56c2fee621e295a7bdb00ac0c38a192fe16889939b95b47b4db786fee2e7eda6&scene=21#wechat_redirect)

[从引入并集成多LLM到发布自研模型，RPA与LLM的融合进度怎样了？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592604&idx=1&sn=47ce3c036b9bdd9e1e73201409c9df0c&chksm=88b9dc8abfce559c604af1a359a80ec75618dc7f2d5315d54505380d08756a54ad5f05cf4d13&scene=21#wechat_redirect)

C[hatGPT与RPA集成，生成式AI+自动化流程让AIGC价值倍增](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591119&idx=1&sn=b4c39d8be943c86c6a8e5396126cb785&chksm=88b9c659bfce4f4fa0d9a48ddb3203d47ad9c0f24f72bc80c4486c2bc7023c7a0a7dab27f1b3&scene=21#wechat_redirect)

[产业上下游齐发力LLM挺进端侧，大语言模型加速落地利好超自动化](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592770&idx=1&sn=46c634dfc5e5c619deb4471bdaab05b5&chksm=88b9dfd4bfce56c2fee621e295a7bdb00ac0c38a192fe16889939b95b47b4db786fee2e7eda6&scene=21#wechat_redirect)

[业务流程将因生成式AI变革，ChatGPT引领的AIGC正在改变组织运营](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591230&idx=1&sn=826fd3a2d154cd32af4d986d6c39f434&chksm=88b9c628bfce4f3ea6400b0918dc1d4bae0bf4c9398d07bd3625f5a1af7ae72ddaac734eafaf&scene=21#wechat_redirect)

[更多组织接入ChatGPT等生成式AI，生成式自动化或成企业运营新标配](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591394&idx=1&sn=bf9c8fd25f898f09e3f023c2744fb3a1&chksm=88b9d974bfce50626cd0bbb072496b514535255b3d3203f62aa080d189b836a65495c5b185e8&scene=21#wechat_redirect)

[AIGC模式正在影响更多组织，十个案例助你深度认知生成式AI](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591473&idx=1&sn=d29d30364cb696959bab94fc9a57f22c&chksm=88b9d927bfce5031fee7b6777c9c886e706ea68275d8be3affbadb6dfdce52831dd4a19746c1&scene=21#wechat_redirect)

[多家厂商引入ChatGPT，集成与融合生成式AI成为RPA技术新趋势](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591547&idx=1&sn=9365821698a0369af6348edffec7214d&chksm=88b9d8edbfce51fbbf709008652c7bc5f74dc086ceb071822998b182c90557a36965427ed71b&scene=21#wechat_redirect)

[基于AI构建的当代RPA，在生成式AI影响下的生命周期还有多长？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591714&idx=1&sn=988175e44a2eb4610572f685aa6d4e57&chksm=88b9d834bfce51224097759dee48da9d8a65b6c9b3203e65bc694d6b185a3ceb0be221d34b71&scene=21#wechat_redirect)

[从ChatGPT数据泄露事件，看组织安全稳定自动化的重要性](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591739&idx=1&sn=d835a888afe52ec78028b3cd1fc6603b&chksm=88b9d82dbfce513b0836b63270fb8876e486a16b3bdbd3d3fc5bed652f2879eda518fd47d9f2&scene=21#wechat_redirect)

[大模型API上的新商业逻辑，生成式AI变革组织经营](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591634&idx=1&sn=0f2cf4dd1523616b804bf178fabef9c0&chksm=88b9d844bfce515232f7b04b78a75c5ac9d73b1074acbff6c9ff25be518d7faec407e88893f9&scene=21#wechat_redirect)

[生成式AI与客户体验有什么关系？如何影响客户体验？一文看明白](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591818&idx=1&sn=7b8e1803a79a405612e81525c80b2a11&chksm=88b9db9cbfce528a077f4e09a13ff0900a55d8a04ee5e8c930b85bc6001183192ed44ff46888&scene=21#wechat_redirect)

[从几个业务场景和实际案例，看生成式AI在金融领域的应用](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591925&idx=1&sn=343a0f16ff6a93a5132ce4eab2d03c26&chksm=88b9db63bfce5275d05d4aa38a806cc57dc82a7822b6dfca044764a8005d0b4e3a996933c42c&scene=21#wechat_redirect)

[生成式AI席卷PPT制作，办公生产力迎来大变革，附20个正在流行的AI PPT制作工具](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591948&idx=1&sn=5879d9dceb2229caa53a7adadb137a23&chksm=88b9db1abfce520cf1846fd058f0bb3f22246162bbbba11bf3fafe7eb4b80e1813cb3bb1d74e&scene=21#wechat_redirect)

[从RPA+AI到RPAxAI，弘玑走上全新LLM融合之路](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650591846&idx=1&sn=ea31d5d40185b05113920e62f55c64f1&chksm=88b9dbb0bfce52a6c9d320c65149df91387f21b32f9850553cc3835dc600a6366c920b4fee60&scene=21#wechat_redirect)

[LLM时代到来，生成式AI会成为超自动化蓬勃发展的催化剂吗？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592016&idx=1&sn=47b90a4e98d8c61c79e3840c4fd34bda&chksm=88b9dac6bfce53d0e5c84ef4e50f44af0d6b29d82f556d00ecd145bc8792343c2d70cb7262a6&scene=21#wechat_redirect)

[AIGC持续火爆大模型争相推出，庞大市场造就算力供应模式演变](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592048&idx=1&sn=0880d6df47fc088c21b638a7396425dc&chksm=88b9dae6bfce53f0e1d3ee7a56e9ffefe1d18885ab4986bc196259801de07abc3bd9c751524c&scene=21#wechat_redirect)

[从“人+RPA”到“人+生成式AI+RPA”，LLM如何影响RPA人机交互？](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592122&idx=1&sn=52216fd15426e7381534c78788dab1fd&chksm=88b9daacbfce53babf528606b62839e374909c2a423c7828de1e2600d991e116850d8579c197&scene=21#wechat_redirect)

[生成式AI正在颠覆装饰装修领域【文末附28个AI装饰设计工具】](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592243&idx=1&sn=d2ca41385bab610c946ee1a3a6197a19&chksm=88b9da25bfce533327e6098f232a05a21cb18bc3f37c6c034d0491aecc1e540a91326595f17b&scene=21#wechat_redirect)

[从LLM特性与数字化转型本质，看大语言模型对数字化转型的影响](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592359&idx=1&sn=fed5149d38d7f387616483ec4c3479de&chksm=88b9ddb1bfce54a781c8c6a121f424d534293738e5b7cf6d1b9f44660a9cd71be9a9e1005525&scene=21#wechat_redirect)

[2022-2023上半年全球RPA融资盘点：海外项目占比67%，总额165亿元](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592564&idx=1&sn=03bc8d4db8296e1bdec7963002c33f69&chksm=88b9dce2bfce55f478070684e0e702764d9f136f99445922d4680c286be3427115782ccec07f&scene=21#wechat_redirect)

[从AI模特换装到AIGC赋能运营，生成式AI全方位渗透电商产业链](http://mp.weixin.qq.com/s?__biz=MzA5NjMzODEwNQ==&mid=2650592802&idx=1&sn=cf38b79c8fa186c7ba1fb20f5fe66698&chksm=88b9dff4bfce56e2e3186f79eced4f8fc49d0a60df55deefb68d27fd104a4f75bb304e2584f0&scene=21#wechat_redirect)

![](https://mmbiz.qpic.cn/mmbiz_gif/dhuZGgEcGxXegD57aOiazgn9Z0JAZaoeuTGrfv44mlOqXZgLdulxVo4QPFxKvkHYfdH7xaIhCoMDKUw0TOicHibCA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp)

- 

期待点赞、在看、评论、转发，您的支持就是我的动力。

- 

鼓励积极评论，您的留言可以成为选题。

- 

欢迎阅读其他文章，或会激发您的更多思考。

点击左下角“阅读原文”查看AIGC研究系列文章，扫码或者后台回复【加群】申请加入AIGC行业应用交流社群。如果你是正在关注AI Agent的创业者、投资人及企业，欢迎带着产品、项目及需求与王吉伟频道交流。

![](https://mmbiz.qpic.cn/mmbiz_jpg/dhuZGgEcGxUjJEe1HBxo5TZzI3yAHu8WDZHG5SNia3temt0D5kdWMpXpDr9ZUiaibeBhrsoME4Hm6gGx0icrdLkeFg/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

****注：** RPA相关文章，后台回复关键词 RPA 。**

【王吉伟频道，关注AIGC与IoT，专注数字化转型、业务流程自动化与RPA。公号ID：jiwei1122，欢迎关注与交流。】

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
