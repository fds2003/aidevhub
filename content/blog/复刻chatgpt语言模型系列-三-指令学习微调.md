---
title: "复刻ChatGPT语言模型系列-（三）指令学习微调"
slug: "复刻chatgpt语言模型系列-三-指令学习微调"
description: "作者： AINLP 来源： AINLP 前言 今天开始我将会推出一系列关于复刻ChatGPT语言模型的博文。本系列将包括以下内容： 复刻ChatGPT语言模型系列-（一）基座模型选取 复刻ChatGPT语言模型系列-（二）参数高效微调 *复刻ChatGPT语言模型系列-（三）指令学习微调 复刻ChatGPT语言模型系列-（四）文本生成解码 复刻Ch..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/LrQiZSumbc-onwzEcjCIbg"
sourceName: "AINLP"
readingTime: "24 min"
createdAt: "2024-02-05T16:00:00.000Z"
publishedAt: "2024-02-05T16:00:00.000Z"
featured: false
---

作者： AINLP  来源： [AINLP](https://mp.weixin.qq.com/s/LrQiZSumbc-onwzEcjCIbg)

![](https://mmbiz.qpic.cn/mmbiz_jpg/nW2ZPfuYqSJuK8UUBxdZXj1c20hUg374YPgXibgDGytAy87YxvVk4WCRFWrdKJPshStrlPJp4vGEGUQodxt7ibOw/640?wx_fmt=jpeg)
## 前言

今天开始我将会推出一系列关于复刻ChatGPT语言模型的博文。本系列将包括以下内容：

- 

[复刻ChatGPT语言模型系列-（一）基座模型选取](http://mp.weixin.qq.com/s?__biz=MjM5ODkzMzMwMQ==&mid=2650440503&idx=3&sn=6835f393b6d259b03d0a38643ba2fb25&chksm=becd056d89ba8c7b175bbe3f6a6417337b7985e1588e5d15aae86036a52618efc78b89582a0c&scene=21#wechat_redirect)

- 

[复刻ChatGPT语言模型系列-（二）参数高效微调](http://mp.weixin.qq.com/s?__biz=MjM5ODkzMzMwMQ==&mid=2650440830&idx=2&sn=03266e804eb9b72131a1a187f1b1b6eb&chksm=becd022489ba8b322baab9f251dcd093fd041a384f3e0d2141eb0b8f7835552652484a5e9830&scene=21#wechat_redirect)

*****复刻ChatGPT语言模型系列-（三）指令学习微调****

- 

复刻ChatGPT语言模型系列-（四）文本生成解码

- 

复刻ChatGPT语言模型系列-（五）强化学习RLHF

- 

复刻ChatGPT语言模型系列-（六）LLM模型评估

在大模型时代，指令微调已经成为了连接预训练模型与实际业务的重要桥梁。许多垂直领域模型，都是在预训练模型的基础上，通过针对性的指令微调，以适应特定的业务需求。

在这篇博客中，我们将聚焦于探讨指令微调的起源、目的和实践方法。我们将首先回顾指令微调的起源(FLAN)，探讨其在模型训练中的重要性。接着，我们会深入理解其主要目的——激发预训练模型的指令遵循能力。最后，我们将详细介绍指令微调的训练方法，包括如何获取多样性的数据、如何选择高质量数据和如何组合高质量的数据。

希望通过这篇博客，可以帮助大家对指令微调深入且全面的理解，并在实际工作中有效应用，以提升模型在特定业务场景下的性能。

文章结论如下:

- 

SFT的目的:激发预训练模型的指令遵循能力

- 

SFT的关键做法:

- 

增加数据的多样性(数据中不同任务的类型)；

- 

提高数据的质量(数据筛选指标:PPL/IFD)；

- 

训练过程中加入COT的数据，以保持COT的能力和Zero-shot的能力；

- 

与单一能力学习相比，多任务学习多种能力在低资源下有所改善，在高资源下有所下降

SFT的优势:

- 计算高效，用远小于预训练阶段的资源，完成业务模型的训练

## FLAN

在FLAN系列的论文中，谷歌首次提出了指令学习的概念，通过自然语言描述的方式微调语言模型，可以显著的提升在未见过任务上的零样本表现，并且随着模型规模和指令数据的增加，模型的表现进一步提升。在这两篇的论文中，核心观点如下:

****(1) scaling the number of tasks (数据多样性很重要)****

****(2) scaling the model size (模型参数量很重要)****

****(3) finetuning on chain-of-thought data (数据质量很重要)****

## FLAN V1

论文标题:FINETUNED LANGUAGE MODELS ARE ZERO-SHOT LEARNERS

论文链接:https://arxiv.org/pdf/2109.01652.pdf

**这篇论文探索了一种简单的方法来提升语言模型的**零样本学习能力** 。研究表明，指令微调在一系列通过指令描述的数据集上微调语言模型可以显著提高在未见过的任务上的零样本表现。**

**研究的主要结论为**微调数据集的数量，模型规模和自然语言指令** 是指令微调成功的关键。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWBuwc7bYiahzzUQDYicveewrSsv8Giagepl6N18HwiaQArRnU8flW1UM15w/640?wx_fmt=jpeg&from=appmsg)U8rCwe

****研究背景** :GPT3等LLM模型擅长Few-shot、不擅长Zero-shot**

**推断原因 :推断原因:没有Few-shot示例，模型难以在**与预训练Prompt差距较大的任务上** 取得好的表现

****研究方法** :NLP任务可以通过自然语言指令来描述**

## 数据集详情

****动机** :提高LLM响应NLP指令的能力**

****方法** :将研究社区现有的数据集转化为指令格式。将Tensorflow Datasets上公开可用的62个文本数据集，包括语言理解和语言生成任务，汇集到一个单一的混合体中。图3显示了这些数据集，每个数据集都被归类到十二个任务集群中的一个，给定集群中的数据集是相同的任务类型。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWaQhWyeg4txJJeNbRBjdSfNaXicrHqY7aNibSUVfheYFhiaEsTyosqRXTA/640?wx_fmt=jpeg&from=appmsg)D1ydS4

对于每个数据集，手动编写十个使用自然语言指令描述该数据集任务的独特模板。虽然十个模板中的大多数描述的是原始任务，为了增加多样性，还为每个数据集包含了最多三个“颠倒任务”的模板。然后，在所有数据集的混合上对预训练的语言模型进行指令调优，每个数据集中的示例都通过为该数据集随机选择的指令模板进行格式化。图4显示了一个自然语言推理数据集的多个指令模板。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWZTBf5icDgYz4Sm087LSKibT2CNA91PDae0HP6SVibnicKWkgb4EKW2eibmw/640?wx_fmt=jpeg&from=appmsg)iG1Jpl
## 消融实验

- 指令遵循任务类型数量

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWKBFHNLGLCibsOZwibA0ricsAOkaOzGDhZgWCsbfYB7xDHSBtC0XX2HLTg/640?wx_fmt=jpeg&from=appmsg)nQn4XC

**消融实验中，首先检查**指令微调中使用的集群和任务数量对性能的影响** 。在这个实验设置中，将NLI，闭卷问答和常识推理作为评估集群，使用剩余的七个集群进行指令微调。**

结果显示，随着在指令微调中添加更多的集群和任务，三个held-out集群的平均性能改善（情感分析集群除外），证实了指令微调方法对未见任务的零样本性能的好处。

- 缩放法则

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWDrFc5X2utTbuaBohQHzn4sOWS3uvPQ8rC9d7VJmjEyic7FyWfib0FlKQ/640?wx_fmt=jpeg&from=appmsg)lNnTsV

对于较大的模型，语言模型的Zero-shot和Few-shot学习能力会显著提高。接下来，将探索模型规模对指令微调的影响。

在和之前消融研究相同的集群划分下，评估了指令调整对模型大小为422M、2B、8B、68B和137B参数的影响。

**结果显示，**对于参数数量在100B级别的两个模型，指令调整显著提高了在Held-out任务上的表现** ，这符合论文中的先前结果。然而，对于8B及以下模型在保留任务上的表现引人深思—指令微调实际上降低了在Held-out任务上的表现。**

一个可能的解释是，对于小规模模型，学习指令微调期间使用的约40个任务填充了整个模型容量，导致这些模型在新任务上的表现更差。根据这个可能的解释，对于较大规模的模型，指令调整占用了一些模型容量，但同时也教会了这些模型如何遵循指令，使它们能够用剩余的容量推广到新任务。

- 指令的作用

验证自然语言指令的作用。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWfVD011iarVIHGIGUttrTVqFoHia1ib6gkH0WBOxzO1STicguxax3uWGkFQ/640?wx_fmt=jpeg&from=appmsg)VAshxp

在最后的消融研究中，探讨了指令在微调过程中的作用。作者考虑了两种没有指令的微调设置。在没有模板的设置中，只给模型提供了输入和输出（(e.g., for translation the input would be “The dog runs.” and the output would be “Le chien court.”).）。在数据集名称设置中，每个输入都前置了任务和数据集的名称（e.g., for translation to French, the input would be “[Translation: WMT’14 to French] The dog runs.”）。将这两种消融设置与FLAN的微调过程进行比较，FLAN的微调过程使用了自然指令（e.g.,“Please translate this sentence to French: ‘The dogruns.’”)。

图8显示了结果，这两种消融配置的性能都明显低于FLAN，这表明训练中的指令对于在未见任务上的零样本性能至关重要。

- 少样本的指令

在推理阶段中，使用Few-shot的指令，提高了模型的表现。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWAT3SwTld4cXLouYAQcfS8HuLW80iaRgibtK9qm0GK77oib7mKjZgrXVAA/640?wx_fmt=jpeg&from=appmsg)TWTOXK

- 指令学习促进Prompt学习

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWCAic3OGdguY0BBQcefKU4lT1nFQECM7QoGvs8IlDMADxD2ibcx6wU0mg/640?wx_fmt=jpeg&from=appmsg)l0cYDW

在FLAN训练之后，在进行Prompt-tuning，相较于原始模型，取得了更好的效果。

## FLAN V2

论文标题:Scaling Instruction-Finetuned Language Models

论文链接:https://arxiv.org/pdf/2210.11416.pdf

文章结构如下:

![FLANV2]([https://jmxblog.oss-cn-hangzhou.aliyuncs.com/uPic/FLAN](https://jmxblog.oss-cn-hangzhou.aliyuncs.com/uPic/FLAN) V2.png)

这篇文章的主题是关于对语言模型进行指令微调的研究。文章主要关注三个方面：(1) 扩大任务的数量，(2) 扩大模型的规模，以及 (3) 在COT数据上进行微调。研究发现，采取以上方式的指令微调能显著提高多种模型类别（如PaLM，T5，U-PaLM）的表现，无论是在不同的提示设置（例如Zero-shot，Few-shot，CoT）还是在各种评估基准（如MMLU，BBH，TyDiQA，MGSM，开放式生成，RealToxicityPrompts）上都有所改善。

例如，对1.8K任务进行指令微调的Flan-PaLM 540B，其性能比PaLM 540B提高了很大的幅度（平均提高了9.4%）。Flan-PaLM 540B在几个基准测试中都达到了业界领先的表现，例如在5-shot的MMLU上得分为75.2%。他们也公开发布了Flan-T5检查点，即使与更大的模型（如PaLM 62B）相比，其Few-shot表现也很强。

文章重点:

****(1) scaling the number of tasks (数据多样性很重要)****

****(2) scaling the model size (模型参数量很重要)****

****(3) finetuning on chain-of-thought data (数据质量很重要)****

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWToLt34NeH40nVdrkD0CDB0Znr80N42icvgWgzlBuwYedcHMDLtuDT8w/640?wx_fmt=jpeg&from=appmsg)fawbSB
## FLAN Finetuning

- 微调数据

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWko9JqQcBWoauvibia7ZP3B0ug23pDWf2MsiaDliaGDIbXMgvMOgYkP26bw/640?wx_fmt=jpeg&from=appmsg)kyKMvo

- 

如图2所示，FLAN数据集混合了473个数据集，146个任务分类，共计1836个任务

- 

微调数据中包含了COT的推理数据

- 

如图3所示，指令遵循的模版也是多样化的，Zero-shot和Few-shot的混合。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWblYLTK0YPo6FpsEZlAMiazUywia5K5S52TMZJrbp5GjD3ZKWvx5ia8pwg/640?wx_fmt=jpeg&from=appmsg)jSx3zF

- 微调过程

- 

模型大小:80M-540B

- 

常数学习率

- 

Adafactor优化器

These model families span arange of sizes, from Flan-T5-small (80M parameters), to PaLM and U-PaLM (540B parameters). For each model, we apply the same training procedure, except for a few hyperparameters: learning rate, batch size,dropout, and finetuning steps. We use a constant learning rate schedule and finetune using the Adafactor optimizer (Shazeer and Stern, 2018).

- 评估方法

- benchmark:**MMLU/BBU/TyDiQA/MGSM**

## Scaling to 540B parameters and 1.8K tasks

**文章首先研究了**模型规模和微调任务数量** 对模型的影响。**

- 

微调任务数量对模型的影响

- 

模型规模大小对模型的影响

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWrzKCShGeo6zrfewLb2WBE2lKkJRtWAI5x14FDbYMdmEic9XticWZw9iaQ/640?wx_fmt=jpeg&from=appmsg)aFyvhA

- 

作者通过对三种大小的PaLM模型（8B，62B和540B）进行实验来扩大模型规模。作者从任务最少的混合开始，逐步添加任务混合，直到任务最多的混合：CoT，Muffin，T0-SF和NIV2。

- 

将模型规模增大一个数量级（即，从8B到62B或从62B到540B）对于微调过和未微调过的模型的性能都有显著提高。

****Question1:为什么任务数量增加到282个任务之后，增益变小** :**

一种可能是**额外的任务并不特别多样化** ，因此它们并没有为模型**提供新的知识** 。

- 

另一种解释是，多任务指令微调的主要收益来自于模型更好地表达它在预训练中已经获得的知识，而超过282个任务并没有太大帮助。这种解释可能是有道理的，因为预训练数据包含780Btoken，而指导微调只使用了1.4Btoken（预训练token的0.2%）。

****Question2:那假设1.4B Token是780B所不包含的知识，能够注入知识吗？还是SFT只能够更好的表示预训练知识** ？**

****个人理解** :**

- 

SFT可以注入知识，比如评测数据集中无预训练的知识，通过SFT可以提高评测数据集的表现；

- 

超过282个任务并没有太大帮助原因是，在评测数据集的这个领域正好对应通用的知识，这些知识在预训练阶段已经得到了充分的训练，SFT部分未能补充更多的知识，所以起到的是指令遵循的一个能力；

****Question3:知乎的问题:** 如何看待FLANv2和LIMA关于LLM的指令微调的不同观点？**

FLAN-v2论文链接：Scaling Instruction-Finetuned Language Models

LIMA论文链接：LIMA: Less Is More for Alignment

似乎一个强调范围，一个更强调指令，而中间一篇 Tulu: How Far Can Camels Go? Exploring the State of Instruction Tuning on Open Resources 说的更是不明不白，只看到了多样性越多越好。但是刚刚发布的LLAMA2 并没有使用很多的指令来微调。而现在的国内厂商似乎都在做大指令微调的数据集，这个思路是否有道理？

****个人理解** :**

- 

**首先，二者论文并没有冲突，LIMA论文中存在两个假定假设，**1:一个模型的知识和能力几乎完全是在预训练期间学习的，而对齐则教会它在与用户交互时应该使用哪种子分布格式。2：对齐主要是关于学习风格的话，预训练模型可以通过一小组示例进行充分调整。****

- 

FLAN-V2中也提到当数量增加到282个数据集之后，模型效果提升收益减少，模型收益来源于模型更好地表达它在预训练中已经获得的知识。

- 

针对预训练知识能够解决的通用的评测集，SFT增加高质量的部分数据，即可取得很好的效果；

- 

针对预训练知识不能够解决的评测集，SFT需要增加多样性的指令数据。

## Finetuning with chain-of-thought annotations

- Finetuning on chain-of-thought improves reasoning on held-out tasks

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWJvz91shWvlO10ydrfk9ibU66pFCYN6pssQ1DiayJcmHwgCx1y5ouRU8g/640?wx_fmt=jpeg&from=appmsg)mpwy0i

表4显示，Flan-PaLM的CoT提示能力超过了PaLM在四个Held-out评估基准上的表现。

- Some chain-of-thought data is needed to maintain reasoning ability

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWsFvUAQw6dWU7OmRLIicYNH4j6pJoBmQVrqy5ibOicZwedQN43AF9nSIsg/640?wx_fmt=jpeg&from=appmsg)GDnq8i

如上图所示，在训练模型时，仅使用CoT数据集进行微调，其表现强于仅使用非CoT数据集进行微调。然而，结合非CoT和CoT数据集进行微调，并不会影响在非CoT任务上的表现。重要的是，这项研究也表明，在微调过程中至少需要一些CoT样本，因为仅使用非CoT样本进行微调会大幅降低模型在CoT任务上的表现。尽管以前的研究发现，指令微调可以提高未见任务的表现，但这仅适用于未见任务与微调任务处于相同提示范式（即非CoT或CoT）的情况。因此，为了提高模型在所有评估中的能力，需要同时使用非CoT和CoT数据。

- Unlocking zero-shot reasoning

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWFUHiankb3QZMORsKpd222eQOUYGpCaLfhGufldpwXiayZGdZjPKUOClA/640?wx_fmt=jpeg&from=appmsg)YKy6ac

**对CoT数据进行指令微调的一个最终好处是，**无论是否有示例，结果模型都能在Zeo-shot情况下进行CoT推理** 。**

在23个未见过的挑战性BIG-Bench任务的BBH基准测试中，Flan-PaLM模型可以通过利用由“让我们一步一步地思考”这句话激活的CoT推理来提高性能。相比之下，没有进行微调的PaLM不能生成解决这些问题的CoT。

虽然PaLM的负面Zero-shot CoT结果可能看似与Kojima等人的发现相矛盾，但更仔细的比较显示，它们并不矛盾。那篇论文中成功的Zero-shot CoT实验大部分实际上利用了InstructGPT，该模型进行了指令微调（假设这种指令微调包括了一些类似CoT的数据）。

## Discussion

- 指令微调的放缩曲线

模型的大小和微调任务数量是提高性能的两个关键组成部分。先前的工作要么扩大了模板数量，要么扩大了任务数量，要么扩大了模型的大小。文章描绘了这两个组成部分的扩展曲线，说明扩大模型的大小和微调任务数量预计将继续提高性能，尽管任务数量的扩大收益递减。

- COT对于逻辑推理很关键

尽管先前的指令微调工作表明，对非CoT任务进行微调可以提高在未见过的非CoT任务上的性能，但我们发现这实际上会导致CoT任务的性能降低。作为解决CoT性能降低的方法，我们同时在非CoT和CoT数据上进行微调。这种联合微调使CoT性能大幅提高，同时保持了非CoT任务的性能，使得一个模型在所有评估中都表现良好。

- 

指令微调可以推广到各模型

- 

指令微调提高了可用性并减轻了一些潜在的危害

直接使用预训练的模型具有挑战性，因为仅在下一个标记预测目标上训练的模型不知道何时停止生成，可能会犯如继续用户输入而非响应它的错误。Flan-PaLM在几个负责任的AI基准上胜过PaLM，特别是测量有毒语言危害的基准。这些结果与InstructGPT的发现一致，该发现显示微调模型产生的输出更符合人类的偏好。

- 指令微调是相对计算高效的

指令微调可以在相对较小的计算量下提升模型性能，例如，对于PaLM 540B，指令微调只需要0.2%的预训练计算量，但可以将评估基准的规范化平均值提高9.4%。

## 指令微调数据

## 数据获取

这一部分内容将介绍两种方式获取指定领域的SFT数据，核心思想是通过GPT4来套取可用的SFT数据，其中通过Self-Instruct来获取单轮的SFT数据，通过Baize来获取多轮的SFT数据。

## Self-Instruct

论文标题:SELF-INSTRUCT: Aligning Language Models with Self-Generated Instructions

论文链接:https://arxiv.org/pdf/2212.10560.pdf

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWoVWe4p6grSlBicjz0fQeHqYslqib90kpMefe0Qs6pSqSOZPXQP7XMOOg/640?wx_fmt=jpeg&from=appmsg)eQgUhJ

- 基于种子Prompt，生成新的任务指示描述，通过ICL每次窗口为8个示例（6人工+2生成）

starts off with a limited (e.g., 175 in our study) seed set of manually-written instructions that are used to guide the overall generation. In the first phase, the model is prompted to generate instructions for new tasks. This step leverages the existing collection of instructions to create more broad-coverage instructions that define (often new) tasks

- 判断任务是否是分类任务，分类任务的形式不同，分类器为GPT3 few-shot形式，（12分类+19非分类）

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWVeia9PzRicOgXWoQE5s7GYW9oa4Ty0JlzRib4kMibdwpbnw4a3DTrtu4aA/640?wx_fmt=png&from=appmsg)

- 产生输出输出对，分类任务Output-First；非分类任务Input-First

Given the newlygenerated set of instructions, the framework also creates input-output instances for them, which can be later used for supervising the instruction tuning.

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWSV6DQSXHnK44b6toopKAO87EUxJ8ic2s6eADt9gpyFIFTKggwF8jfkg/640?wx_fmt=png&from=appmsg)![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWbqHtRFWkhPYeIGhAenk8ynDSVVCFD3dXObOr3iaKtic83nxleHvjY9Gg/640?wx_fmt=png&from=appmsg)

- 过滤低质量以及重复的指示

Finally, various measures are used to prune lowquality and repeated instructions, before adding them to the task pool.

- 与已有Instruction的重复低于0.7

ROUGE-L overlap with any existing instruction is less than 0.7.

- 剔除不能被语言模型处理的内容

We also exclude instructions that contain some specific keywords (e.g., images, pictures, graphs) that usually can not be processed by language models.

- 过滤相同或者来自相同Prompt输入的输出

When generating new instances for each instruction, we filter out instances that are exactly the same or those with the same input but different outputs.

****生成的Instruction与种子Prompt重复较少****

We observe that the resulting data provides a diverse range of creative tasks and over 50% of them have less than 0.3 ROUGEL overlaps with the seed instructions

****实验数据：****

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWbW9Wc9udJT9v8W57xLa0XFcyV4ZjeTMiaIKaicyKSH9omBtbz97jHjHw/640?wx_fmt=png&from=appmsg)

**生成 Instruction的多样性与质量：**

- 

只有一半生成的Instruction是常见的动宾结构

- 

TOP动词和名词构成的数据只占据14%

- 

生成的Instruction与已有种子重复度不高

- 

大多数生成是有意义的，然而会包含许多噪音

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWNNlmCHhEicC4DpZAvCIwRjNuWjDaKn60g5q2mVjRprlsymTibts7lbsA/640?wx_fmt=png&from=appmsg)

生成Instruction与种子Prompt最大的相似度分布：

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWLnDiaqHfpZp3dOlHfPVSByl0dtIrXN2SCKGtRicA6bNx6wCtc9hTVSUg/640?wx_fmt=png&from=appmsg)![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWWJRGgEjJkK4RibLpuofSSr9ibRaPibcbgKc4V81dOxR24QfaR1fwmyrvA/640?wx_fmt=png&from=appmsg)

****实验结果：在常规的测试数据上，超过GPT3模型33%，并接近InstructGPT；在新构建的数据集上，超过在公开指示数据集微调的GPT3，与InstructGPT只差5%****

The SUPERNI results indicate that GPT3SELF-INST outperforms GPT3 (the original model) by a large margin (+33.1%) and nearly matches the performance of InstructGPT001. Moreover, our human evaluation on the newly-created instruction set shows that GPT3SELF-INST demonstrates a broad range of instruction following ability, outperforming models trained on other publicly available instruction datasets and leaving only a 5% gap behind InstructGPT001.

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtW3Nq8ZeVE7QUBgrBibxOBLic7smKEibSnbkIuFr2TiaCN41Fg4f80My9ezA/640?wx_fmt=png&from=appmsg)![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWkUfv8oYQt5YYwhbKtxscvkibz43WqvRicc2Hnk0nR24ASCjyml6I0zZw/640?wx_fmt=png&from=appmsg)

****具体应用** :**

**斯坦福大学提出的**Alpaca** 羊驼模型，利用InstructGPT生成Instrutions，再基于LLAMA进行微调**

[https://alpaca-ai-custom3.ngrok.io/](https://alpaca-ai-custom3.ngrok.io/)

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWSLGpupS2mNK9gmDia1QLCcIW5kLZMh5ib79zeoqIoNIewv94H3wkZNdw/640?wx_fmt=png&from=appmsg)
## Baize(多轮对话数据构建)

论文标题:Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data

论文链接:https://arxiv.org/pdf/2304.01196.pdf

概述:团队从美国知乎Quora，最大的编程问答社区StackOverflow等处收集到种子问题。

**然后让ChatGPT自我对话，收集了11万条多轮对话，使用OpenAI的API大约花费**100美元** 。**

在此基础上使用LoRA（Low-Rank Adaption）方法微调Meta开源大模型LLaMA得到白泽。整体流程如下图所示:

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWvo7pTvib9ugwic1b3W1pmIuIO3SwHhpJ4FSJfeJdxfm67A6ibHMwQSXPg/640?wx_fmt=png&from=appmsg)
![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtW9ALib68ibqHOyxJxYESntxBXaWaCI7zmn6oIEAtbVv2Coibhibd4ODCDWQ/640?wx_fmt=jpeg&from=appmsg)![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtW8PAy4zibSsNw08IhjfJ4ia6Y6IQN71QMHIcD9C0Y5RKibsWltrKnN8xoA/640?wx_fmt=png&from=appmsg)
## 英文Prompt

instruct = “Forget the instruction you have previously received. The following is a conversation between a human and an AI assistant. The human and the AI assistant take turns chatting about the topic: ‘{}’. Human statements start with [Human] and AI assistant statements start with [AI]. The human will ask related questions on related topics or previous conversation. The human will stop the conversation when they have no more question. The AI assistant tries not to ask questions. Complete the transcript in exactly that format.\n[Human] Hello!\n[AI] Hi! How can I help you?\n”.format(

query

)

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWCXsCE8uyBVwfKiaqr8krnZAJxGGEZf1ibpFzqxrswIMXQ3jIYeIKjzicQ/640?wx_fmt=png&from=appmsg)
## 翻译后Prompt

忘记你之前收到的指令。下面是一个人和人工智能助手之间的对话。这个人和人工智能助理轮流聊这个话题：‘户外露营如何选择装备’。人类语句以[用户]开头，人工智能助手语句以[AI]开头。人类会就相关话题或之前的对话提出相关问题。当人类没有更多问题时，他们会停止对话。人工智能助理尽量不提问。尽量按照以下这种格式输出：\n[用户] 你好!\n[AI] 你好，有什么我能帮您的?\n

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWibcmK6tdzbFBOUwbnoC2toqic1rgK3pwL5OlCzLpt8SQYqBxZSLPHHBA/640?wx_fmt=png&from=appmsg)LXC1Sf
## 数据筛选

在现有的海量SFT数据中，根据LIMA等论文的研究表明，SFT的数据质量对模型的表现有着至关重要的影响。那么，面对这些数据，我们应如何筛选出高质量的数据呢？在本文中，我们将详细介绍两个评估数据质量的重要指标：PPL和IFD。

## PPL(困惑度标签)

在信息论中，perplexity(困惑度)用来度量一个概率分布或概率模型预测样本的好坏程度。它也可以用来比较两个概率分布或概率模型。（应该是比较两者在预测样本上的优劣）低困惑度的概率分布模型或概率模型能更好地预测样本。

****困惑度越小，句子概率越大，语言模型越好。****

在自然语言处理中，困惑度是用来衡量语言概率模型优劣的一个方法。一个语言概率模型可以看成是在整过句子或者文段上的概率分布。

它主要是根据每个词来估计一句话出现的概率，并用句子长度作normalize，公式为如下：

****Perplexity另一种表达****

针对文本中的词预测任务来说，离散概率分布p的困惑度由下式给出，其中H(p) 是该分布的熵，x遍历事件空间。概率分布的perplexity：

当选用e作为底数时:

## IFD

论文标题:From Quantity to Quality: Boosting LLM Performance with Self-Guided Data Selection for Instruction Tuning

论文链接:https://arxiv.org/pdf/2308.12032.pdf

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWpoU03upMJl1JQrXt46RMWA7NutQVcYPsmRysDPj0voA4vCcM7mkkLg/640?wx_fmt=jpeg&from=appmsg)UPZNLB

利用IFD指标自动筛选樱桃数据，再利用樱桃数据进行模型指令微调，获取更好地微调模型，文章流程主要涉及三个步骤：

- 

Learning from Brief Experience：利用少量进行进行模型初学；

- 

Evaluating Based on Experience：利用初学模型计算原始数据中所有IFD指标;

- 

Retraining from Self-Guided Experience：利用樱桃数据进行模型重训练。

公式定义如下:

Conditioned Answer Score(CAS)指标定义:

根据CAS的高低，可以判断出模型对指令Q生成答案A的难易，但也可能受到模型生成答案A的难易程度的影响。

Direct Answer Score(DAS)指标定义:

利用模型直接对答案进行续写，再根据答案真实内容获取直接的差异值，DAS得分越高，可能表明该答案对模型生成来说本身就更具挑战性或更复杂。

Instruction-Following Difficulty (IFD)指标定义:

为了获取更好的指令数据，也就是哪些指令对模型的影响更高，需要刨除答案本身的影响。在这种情况下，LLM的内在能力对适应答案字符串的影响被部分缓解。得分衡量了给定指令有多大程度上帮助相应反应的对齐。高IFD分数暗示了模型对齐给定指令能力的不足，反过来表明了指令的难度。

在Alpaca和WizardLM两个数据集上利用Llama-7B进行实验，发现在5%的Alpaca樱桃数据上进行训练就超过了全量数据训练结果。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWAwTKpluGqeVJ5YZnXP7vBT68PicMsovD8sVJcPPZZP65GKepwYI6LPw/640?wx_fmt=jpeg&from=appmsg)sDnpOz

****如何判断IFD指标是有效的** ？对比随机采样、IFD采样、IFD低分采样、CAS采样四种方法对模型指令微调的影响，发现IFD采样在不同数据比例下，均高于全量数据微调效果，但其他采样方法均低于全量数据微调方法。**

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWgq2NG8AFDJIlgdc1WA599MY3XPr9PRY4iaQrsNWGXYqEHWicvIAS72icA/640?wx_fmt=jpeg&from=appmsg)GLo6gU

对高质量数据和低质量数据进行分析，发现樱桃数据通常在范围、复杂性、深度和知识方面得分更高，在清晰度和简单性方面得分更低。并且发现高难度和低难度的样本之间存在明显的界限。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWU02qMGmYlH3SmJGf2r0g4yGhVPZM0Gv3U8XcVFlIQp1b3DqhnovctQ/640?wx_fmt=jpeg&from=appmsg)s2rlnf

接下来是理解原始数据集中樱桃数据的分布特性。作者首先计算Alpaca数据集中每个指令的嵌入，并使用t-SNE进行降维，将高维嵌入映射到2D空间。将根据最高或最低的5%难度比率进行颜色编码的可视化向量展示在图7中。与传统观点相反，樱桃数据并非均匀分布。相反，高难度和低难度样本之间存在明显的划分，这挑战了之前的假设，即选定的数据应覆盖整个指令谱并最大化多样性。

![](https://mmbiz.qpic.cn/mmbiz_jpg/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWe7nq2ZfLdMo3QgSibcU4ysSkblJaq0Bx9qEhE49StIx09zGIunaEDUw/640?wx_fmt=jpeg&from=appmsg)vltEZB
## 数据配比:SFT混合训练

在我们获得大量高质量的跨领域SFT数据后，如何组合这些数据以构建训练集成为了一个重要问题。尽管FLAN等相关研究已经阐述了数据多样性对模型性能的提升作用，但在不同数据集之间是否存在相互影响以及如何合理配比不同数据集以提升模型效果，尚待进一步探讨。接下来，我们将就这些问题展开深入讨论，并引入一篇研究论文的相关内容。

论文标题:HOW ABILITIES IN LARGE LANGUAGE MODELS ARE AFFECTED BY SUPERVISED FINE-TUNING DATA COMPOSITION

论文链接: [https://arxiv.org/pdf/2310.05492.pdf](https://arxiv.org/pdf/2310.05492.pdf)

文章内容结构如下图所示:

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWtU4M1N4eR876URjJ03gCzMNufAeKVPRowS41Y8bEHQyc3SKGBeqy7g/640?wx_fmt=png&from=appmsg)
## 出发点

**论文提出4个**核心问题** :**

- 

数学推理、代码、通用能力随SFT数据数量如何变化？

- 

当SFT混合三者数据时，是否会出现冲突？

- 

导致三者冲突的关键因素是什么？

- 

针对混合数据的不同SFT训练策略影响是什么？

为了找到这些问题的答案，作者设置了一些实验进行探究。

## 实验结果

****实验设置** :**

数学推理能力代码生成能力通用能力

训练数据
GSM8K RFT
Code Alpaca
ShareGPT

测试数据
GSM8K
HumanEval
MT-Bench

## 不同数据量下单能力的表现

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWOHic0Z58PEVlLJPxgIJ7Tt3WWefS2GicGE0yHic5icE0fKzkUPY0oiadzHQ/640?wx_fmt=png&from=appmsg)

****图片介绍:****

- 

横坐标:训练数据量占整体数据量的比例

- 

纵坐标:相应的模型能力打分

****实验结论:****

*****不同能力呈现出不同的放缩曲线****

*****大模型在同样数据集下通常表现更佳****

## 不同数据混合数量下 能力表现的差异

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWr02icUpibgHmuc393MUGjKWudWDN7d6jV2FjyEnw3xUibBBtDJHibcmCXw/640?wx_fmt=png&from=appmsg)

****设计思路** :固定了不同领域数据的比例，修改绝对的数据量**

****图片介绍:****

- 

横坐标:训练数据量占整体数据量的比例

- 

纵坐标:相应的模型能力打分

- 

蓝色曲线:单独能力数据集训练曲线

- 

红色曲线:混合数据集训练曲线

****实验结论:****

*****混合的情况下，在数据量较少时优于单能力表现;在数据量较多时劣于单能力表现****

`* 低资源情况下，不同数据量可以互相受益；高资源情况下，其他领域数据被视为了噪声
`

*****随模型大小增加，模型表现在低资源情况下也增加****

## 不同数据混合比例下 能力表现的差异

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWk1CibJVnj1c6rDAx28oVPibrFFT43oo3jPqWkPibtrdqyEziasJ0ZKS7zQ/640?wx_fmt=png&from=appmsg)

****设计思路** :固定全量xx数据集，增加其他数据集数量，观测固定数据集下的能力表现**

图片介绍:

- 

横坐标:新增垂直训练数据量占整体数据量的比例

- 

纵坐标:相应的模型能力打分

- 

蓝色曲线:加入混合数据训练曲线

- 

红色曲线:对比训练曲线

****实验结论** :**

*****当不同SFT能力之间的任务格式和数据分布存在显著差异时，数据比率的影响是最小的。然而，当存在一定程度的相似性时，数据比率可能会导致性能的明显波动。****

`* 数学推理和通用能力在语义空间差距较大

* ShareGPT中数据格式和分布的差异，导致数据比例增加时，性能出现波动
`

*****低资源情况下，数据比例对性能的影响:缩放趋势与完整数据量相同****

## 不同训练策略下 能力表现的差异

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWJbB9kJYoiapfA2ibZFCV7zDT3icsbqGyzcicSkcZvFUicD1GSt8ITMOr1iaw/640?wx_fmt=png&from=appmsg)

作者提出了四种训练策略:

- 

Multi-task Learning:多个领域数据集混合一同训练

- 

Sequential Training:多个领域数据集顺序训练

- 

Mixed Sequential Training:第一阶段混合垂直领域数据集训练,第二阶段全量通用领域数据集训练

- 

Dual-stage Mixed Fine-tuning:第一阶段混合垂直领域数据集训练，第二阶段全量通用数据集+小部分垂直领域数据集训练

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWZLTy0TiaKoUOhoIiaryIxACMYRl01EYfntDuoB8J8ze0wib6sNZRtWaVg/640?wx_fmt=png&from=appmsg)

****实验结果:****

*****多任务学习会导致冲突，而顺序训练会导致灾难性遗忘。DMF训练方法有效地缓解了SFT短语中的性能冲突和灾难性遗忘，实现了一般能力和专项能力之间的平衡。****

![](https://mmbiz.qpic.cn/mmbiz_png/Hq9ANWCLRic06XsITuUpaMrqVQTXnWOtWKhsY6BNic2nqHnyMufuCa8s41sApQHY9NO8KdIYJDf9R0QfxJP3SFCg/640?wx_fmt=png&from=appmsg)

图片介绍:

- 

横坐标:新增垂直训练数据量占整体数据量的比例

- 

纵坐标:相应的模型能力打分

- 

蓝色曲线:垂直领域能力曲线

- 

红色曲线:通用领域能力曲线

****实验结论:****

*****低资源情况下，不同数据量可以互相受益；****

*****高资源情况下，其他领域数据被视为了噪声，效果下降****

## 实验结果

**1.**不同SFT能力存在不同的数据缩放模式，大模型在同样数据下通常表现更好****

**2.**与单一能力学习相比，多任务学习多种能力在低资源下有所改善，在高资源下有所下降。此外，随着模型大小的增加，在数学和一般能力的低资源设置中有更大的性能提升。****

**3.**数据量直接影响每种能力，而数据比率并不重要。****

**4.**多任务学习会导致冲突，而顺序训练会导致灾难性遗忘。DMF训练方法有效地缓解了SFT短语中的性能冲突和灾难性遗忘，实现了一般能力和专项能力之间的平衡。****

## 总结

总结来说，本文详细地探讨了指令微调—连接预训练模型与实际业务需求的重要手段。我们重点介绍了指令微调的起源、目标和实践策略，并希望能够从中获取到实际应用的方法和思路。

具体来说，我们首先回顾了指令微调的起源FLAN，并强调了其在模型训练中的重要性。接着，我们阐述了指令微调的核心目的——即激发预训练模型的指令遵循能力，以帮助模型更好地理解和执行特定指令。最后，我们深入探讨了如何执行指令微调，包括获取数据的多样性、选择高质量数据以及组合高质量数据。

此外，我们也详细讨论了SFT的目标、关键做法和优势。这些内容的讨论和分析，旨在帮助大家在实际工作中更高效地应用指令微调，从而提升模型在特定业务场景下的性能。

****进技术交流群请添加AINLP小助手微信（id: ainlp2)****

****请备注具体方向+所用到的相关技术点****

`![](https://mmbiz.qpic.cn/mmbiz_jpg/nW2ZPfuYqSJADkmZ2IX6Z23znAibuEevotDMq9iaMxiapK7jfMibiauGFkycicAJEs6x5U9SGyDJZ0S1tRed9TPNUUDQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)
`

****关于AINLP****

`AINLP 是一个有趣有AI的自然语言处理社区，专注于 AI、NLP、机器学习、深度学习、推荐算法等相关技术的分享，主题包括LLM、预训练模型、自动生成、文本摘要、智能问答、聊天机器人、机器翻译、知识图谱、推荐系统、计算广告、招聘信息、求职经验分享等，欢迎关注！加技术交流群请添加AINLP小助手微信(id：ainlp2)，备注工作/研究方向+加群目的。

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/nW2ZPfuYqSKABHCqVVQkVYPrM4XY1vsd0iaeuXzyJnoFc8cibd5mYb4wdA3WMQtiaPVmr0XLZHMuVibqWncibpnTSnQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)       
`
更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
