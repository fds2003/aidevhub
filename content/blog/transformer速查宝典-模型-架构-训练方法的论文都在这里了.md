---
title: "Transformer速查宝典：模型、架构、训练方法的论文都在这里了"
slug: "transformer速查宝典-模型-架构-训练方法的论文都在这里了"
description: "作者： 机器之心 来源： 机器之心 选自kipply’s blog 作者：kipply **机器之心编译 编辑：梓文、张倩 论文大合集，一篇文章就搞定。 AI 发展迅速，这对于刚刚入门或是正想跟上「潮流」的新手们来说并不友好。如果有一份详细全面的知识列表可能会帮助他们更快走上「正途」。 今天给大家带来一篇 Transformer 的综述文章，供大家了解 Transf..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/uBv8t2hd0WS4aAqUuAyBhw"
sourceName: "机器之心"
readingTime: "19 min"
createdAt: "2023-08-13T16:00:00.000Z"
publishedAt: "2023-08-13T16:00:00.000Z"
featured: false
---

作者： 机器之心  来源： [机器之心](https://mp.weixin.qq.com/s/uBv8t2hd0WS4aAqUuAyBhw)

选自kipply’s blog

****作者：kipply****

**机器之心编译

****编辑：梓文、张倩****

论文大合集，一篇文章就搞定。

AI 发展迅速，这对于刚刚入门或是正想跟上「潮流」的新手们来说并不友好。如果有一份详细全面的知识列表可能会帮助他们更快走上「正途」。

今天给大家带来一篇 Transformer 的综述文章，供大家了解 Transformer 的来龙去脉及相关技术。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpumcp234wPZAG5VWemhCW7nAyJ0FeSIDZ955rfRtL8FgVtdUONtWTibA/640?wx_fmt=png)

****本篇综述涵盖了 21 种模型、11 种架构变化、7 种预训练后处理技术和 3 种训练技术（还有 5 种不属于以上技术的东西）** 。模型包括 GPT-3、GPT-4、Gopher、AlphaCode、RETRO、GPT-3.5、Chinchilla、Flamingo 等。一些重要的架构变化包括多查询注意力、稀疏注意力、混合专家等。同时还介绍了 RLHF、CAI、Minerva 等预训练后处理技术以及超参。所有内容均按照重要性和独特性进行排序，并将链接附在下方。**

以下为机器之心不改变原义对文章进行编译的内容。

****一、模型****

以下模型的属性若未明确说明，要么未公开，要么大致遵循标准 GPT 配置。

****1.GPT-3****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpmaG6wFBMM9M4nrBUXT2RBxsEicMYHqhfAd9WxuM7iazNhKWlteI5NeGA/640?wx_fmt=png)

- 

属性：175B 参数，96 层，12288 嵌入维度，96 个注意力头

- 

论文地址：https://arxiv.org/pdf/2005.14165.pdf

- 

发布详情 Open AI 发布于 2020 年 5 月

本文是继 GPT-2 论文（2018 及扩展定律论文后，大语言模型的一片开创性论文。以下是论文中指出有关 GPT-3 的特征。

- 

它在一个 300B token 的数据集上进行训练。该数据集主要由过滤后的 Common Crawl 以及一些书籍、网络文本和维基百科构成；

- 

使用了 BPE tokenizer（与 GPT-2 相同）；

- 

2048 上下文长度；

- 

交替使用密集和稀疏注意力层；

- 

在最初的 375M toks 中，学习率升至 0.6 × 10^-4，260B toks 后余弦衰减至 10%；

- 

在前 12B 个 token 中，批大小从 32k toks 上升到 3.2M toks；

- 

4x MLP 投影率，如 2017 年 Transformer 论文所示；

- 

50k 词汇表（vocab size）。

以上的许多特征形成了一种标准配置，被后来的模型重复使用。

在论文记录超参数的表 2.1 中有一个可能的拼写错误，其中 GPT-3 13B 被记作为具有 5140 的嵌入维度，这里应该是 5120。

****2.GPT-4****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpQ0ic16qM9ltN7CfLjxxCCH6Y7icHb0rJXxnjDvfNTa8a7C5ljO0J5pQg/640?wx_fmt=png)

- 

报告地址：https://arxiv.org/pdf/2303.08774.pdf

- 

发布详情：Open AI 2022 年 8 月对其完成预训练，发布于 2023 年 3 月。

GPT-4 是 OpenAI 提供的一个模型，其架构不明（技术上类似于 Transformer）。技术报告主要包含大部分评估（结果表现良好），以及能够从较小模型精确推断出的持续扩展结果。报告还记录了提高模型安全性的措施，并演示了 GPT-4 的多模态能力，这种能力似乎是用类似于 Flamingo 的方式训练的。

****3.Gopher****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpwZnClkJ6Pvx59ngcn4ZOSxCVaNOStFWCcl2T0r1icoBL4iaFG8GmAKTQ/640?wx_fmt=png)

- 

属性：280B 参数，260B 非嵌入参数，80 层，16384 嵌入维度，128 个注意力头

- 

论文地址：https://arxiv.org/pdf/2112.11446.pdf

- 

发布详情：DeepMind 在 2020 年底对其进行训练，发布于 2021 年 12 月。

Gopher 是 DeepMind 在 2021 年发布的第一个大型语言模型。它使用 RMSNorm 而不是 LayerNorm，使用 Transformer-XL 的相对位置编码方案而不是绝对位置编码，这就是嵌入参数如此之多的原因。

它使用 SentencePiece 进行分词，词汇表大小为 32k，并用 300B token 进行训练，其中一半来自为 Gopher 收集的 MassiveText，以及书籍、Common Crawl、维基百科、新闻和 Github。

****4.AlphaCode****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpo7eHQAlHic8e1AdCibHVMPW1jWUiaibeVbow9hALibS3EibV0QrNnUmlvLXg/640?wx_fmt=png)

- 

属性：41B 参数，8 个编码器层，56 个解码器层，6144 嵌入维度

- 

论文地址：https://arxiv.org/pdf/2203.07814.pdf

- 

发布详情：DeepMind 发布于 2022 年 2 月。

AlphaCode 是在 715GB（967B token）代码基础上训练出来的模型，可以用于解决编程竞赛问题。它是本文中唯一采用解码器 - 编码器架构的模型。它将编程竞赛题视为一项翻译任务（问题陈述 → 解决方案），以获得双向性。它在编码器中使用 1536 个 token，在解码器中使用 768 个 token。使用多查询注意力，并在推理时生成数千个样本，然后选择一个解决方案子集进行提交。

****5.RETRO****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpYKbCBNzY7J6BlubLkTuOZqibtvK9uh1go1Kia1Rb7sxk27wlnuhwR5nQ/640?wx_fmt=png)

- 

属性：7B 参数

- 

论文地址：https://arxiv.org/pdf/2112.04426.pdf

- 

发布详情：DeepMind 发布于 2022 年 2 月。

检索是一种通用的技术，即在进行推理时提供一个数据库供其查找。RETRO 是第一篇使用 2T token 数据库的 Transformer 检索论文。它使用预训练的 BERT 式模型将 token 数据库嵌入块中，然后在训练和推理期间对数据库中的最近邻执行分块交叉注意力。

****6.GPT-3.5****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpjvWKn0ZJYAzyuxxlNwgpNmiaLBdHj9dBwvnUeo4BMSIosgHg5JZw50g/640?wx_fmt=png)

- 

属性：架构未知

- 

文档地址 [https://platform.openai.com/docs/guides/gpt](https://platform.openai.com/docs/guides/gpt)

- 

发布详情：OpenAI 发布于 2022 年 3 月。

OpenAI 将三种模型划分为 GTP-3.5，具体包括 davinci-002 系列中的两种和 davinci-003 系列中的一种。其中， code-davinci-002 是基本模型，text-davinci-002 是一个带有 FeedME 非 RL 指令调整的版本。text-davinci-003 是带有 RLHF 的 InstructGPT。有一篇 InstructGPT 论文训练了 RLHF 模型，但没有提到 FeedME，而 text-davinci-002 虽然是 InstructGPT 模型，但没有使用 RLHF。OpenAI API 上的 davinci 模型在 2020 年的论文中被指出是 175B 模型，但从未证实 davinci-002 是否具有相同尺寸。

****7.Chinchilla****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpj1SmEiausPgbzypCsyAGgMQZo2fgt9PjvBKtTvN92H523PKiafXGmpyA/640?wx_fmt=png)

- 

属性：70B 参数，80 层，8192 嵌入维度，64 个注意力头

- 

论文地址：https://arxiv.org/pdf/2203.15556.pdf

- 

发布详情：DeepMind 发布于 2022 年 3 月。

Chinchilla 的论文中引入了新的、改进版的 scalling law。它使用 1.5T token（与 Gopher 相似的数据集）和与 Gopher 相同的计算量进行训练，但性能优于 Gopher。在 scalling law 中，模型的参数和 token 数按照 20:1 的比例线性增加。学习率采用余弦调度进行调整。Megatron Turing NLG 和 Jurassic J-1 Jumbo 是另外两个大型模型，由于它们不是 Chinchilla 最优模型，也没有独特意义，因此没有在本文中单独记录。

****8.Flamingo****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpcd0CMfIgibxUUh50gC0KIyqeibBGJYaR5NibWMyZexlw5jEVt88Bqk3DQ/640?wx_fmt=png)

- 

属性：80B 参数

- 

论文地址 [https://arxiv.org/pdf/2204.14198.pdf](https://arxiv.org/pdf/2204.14198.pdf)

- 

发布详情：DeepMind 发布于 2022 年 4 月。

Flamingo 是一个多模态（文本 / 图像）模型。它只生成文本，而图像输入通过视觉编码器（435M 参数）运行，并使用交叉注意力来关注这些输出。它还在视觉编码器之后使用重采样器（194M 参数），无论输入特征的数量如何，都能产生固定（少量）的视觉 token。它们建立在冻结的 Chinchilla 模型上，80B 参数来自添加到 70B Chinchilla 模型中的交叉注意力层。PaLI 是谷歌的图像 / 语言多模态模型。

****9.Gato****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpvURyOuFYbHHO8SszXK1GUPkJUwrI15iaU5xuPAgYmY7iaianlfTOoYlfg/640?wx_fmt=png)

- 

属性：1.18B 参数

- 

论文地址：https://arxiv.org/pdf/2205.06175.pdf

- 

发布详情：发布于 2022 年 5 月。

Gato 是一个通用型智能体，算是 Flamingo 的后续产品，但拥有更多的模态。它使用图像和文本，以及按钮按压数据格式化成的 token，还有来自机器人感知的连续数据编码，并尝试使用尽可能少的数据来完成额外的任务。这些任务包括机器人堆叠测试、图像字幕和 Atari。

****10.Anthropic LM****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpRRkgIx3uZAtEk64D9ay5icwX8iag5anUvgmgwJlZYOIrDx5VZicNE0h2w/640?wx_fmt=png)

- 

属性：52B 参数，64 层，8192 嵌入维度

- 

论文地址：https://arxiv.org/pdf/2112.00861.pdf

- 

发布详情：Anthropic 发布于 2021 年 12 月。

在 400Btoken 上进行训练，但在 Chinchilla 之后的一篇论文（《 Language Models (Mostly) Know What They Know 》）中，Anthropic 使用了为 850B token 训练的具有相同架构的模型。在后来的另一篇关于道德自我纠正的论文中，使用了一个没有明确说明的 175B 模型。

****11.PaLM****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpG1yvZJX9ZJAIY9Vl88NdHfVjI1nwgpqkYzibMFWQUg9ibZnxIQoMyrlQ/640?wx_fmt=png)

- 

属性：540B 参数，118 层，18432 嵌入维度，48 个注意力头

- 

论文地址：https://arxiv.org/pdf/2204.02311.pdf

- 

发布详情：Google 发布于 2022 年 4 月。

截至 2023 年 1 月，这是公开已知的最大密集语言模型。PaLM 使用 SwiGLU 激活，使用并行注意力、多查询注意力、旋转嵌入，并对输入和输出嵌入使用相同的矩阵。它没有使用偏置，使用了一个包含 256k 个 token 的 SentencePiece tokenizer。PaLM 是在与 LaMDA 和 GLaM 类似的数据集上，用 780B 个 token 进行训练的。

****12.GPT-NeoX****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpO7r8WdLdo8sDb1Y7a1xZNicuNgHAOMMDOyzWqj3eneniaqhzDtVOibMDg/640?wx_fmt=png)

- 

属性：20B 参数

- 

论文地址：https://arxiv.org/pdf/2204.06745.pdf

- 

项目地址：https://github.com/EleutherAI/gpt-neox

- 

发布详情：Eleuther AI 发布于 2022 年 2 月。

这是 Eleuther 的一个开源模型。它使用 DeepSpeed (微软) 和 Nvidia Megatron 在 GPU 上进行训练，并使用与 GPT-J 相同的架构修改，在整个 Pile (400B token) 上进行训练。

****13.GPT-J****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp7lQ5jjHBxleiclYrnTVhBiaibyiaPT6a2q9ibdYE5nxZJbJW3vv0O0IJ4jQ/640?wx_fmt=png)

- 

属性：6.7B 参数

- 

项目地址：https://github.com/kingoflolz/mesh-transformer-jax/#gpt-j-6b

- 

发布详情：Eleuther AI 发布于 2021 年 7 月。

GPT-J 因完全开源而闻名，并且与 GPT-3 论文中 6.7B 版本性能相媲美。它在 TPU 上进行训练，并使用旋转嵌入，并行注意力。为降低复杂性，它仅使用了密集注意力层。它是在 Pile 上训练的，Pile 是一个由 Eleuther AI 创建的开放数据集，包含 22 个较小的数据集，包括 Common Crawl、 OpenWebText、书籍和论文。

****14.GLaM****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp0CME1j9NWUTM4QuPJ36rhwlwLSYicNlWzpTPzibtT9FESIFwOaHHm6ow/640?wx_fmt=png)

- 

属性：1.2T 参数

- 

论文地址：https://arxiv.org/pdf/2112.06905.pdf

- 

发布详情：Google 发布于 2021 年 12 月。

GLaM 被称为「通用语言模型」，是一个混合专家 (MoE) 模型，其中的参数是稀疏激活。它每层有 64 个专家，每个 token 激活 96.6B 参数。每一层都有一个门控单元，它为每个 token 选择 64 个 MLP 中的一个或两个。

****15.LAMDA****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp3xA5L0uKlNmIMbj435OgDsPy1Fs1X6aPLTK69w8rk9ajQXKkGeiboqQ/640?wx_fmt=png)

- 

属性：137B 参数，64 层，8192 嵌入维度，128 个注意力头

- 

论文地址：https://arxiv.org/pdf/2201.08239.pdf

- 

发布详情：Google 在 I/O 上演示于 2021 年 5 月，论文发布于 2022 年 1 月。

LaMDA 对话模型是根据 Meena 创建的。它明确有一个包含大量对话 / 论坛的 2.81T 数据集 (用 32k 的 SentencePiece tokenizer 进行编码)。基础模型有时被称为 LaMDA GLM 或 GLM- 137B；LaMDA 在此基础上添加了许多对话微调。

模型训练用了多少个 token 是明确的，它用到了 1024 个 TPUv3，使用率为 56.5%，训练时间为 57.7 天，batch 大小为 256k，可能是 bf16，计算表明这将是 2.81T token 中的约 900B。

****16.Switch****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpX3x71tZsic0CrzkXtr7LYLibibACCeQKoibicF4PnrCuKOFrPGXPCa5DGAg/640?wx_fmt=png)

- 

属性：1T 参数

- 

论文地址：https://arxiv.org/pdf/2101.03961.pdf

- 

发布详情：Google 发布于 2022 年 6 月。

SwitchTransformer 对 GLaM 进行了改进，它只路由到一个专家，从而减少了计算量。它的创新是使用了不同的路由机制，证明了路由到单个专家是有效的。

****17.BLOOM****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpDShQlgVdzfJJXDDaD5N8aTHXoHtYMItliaEFAGOiadvgEY1CUxfgOtkA/640?wx_fmt=png)

- 

属性：176B 参数，70 层，14336 嵌入维度，112 个注意力头

- 

论文地址：https://arxiv.org/pdf/2211.05100.pdf

- 

发布详情：HuggingFace 发布于 2022 年 7 月。

截止于本文梳理的时间，BLOOM 是最大的开源模型。它在 HuggingFace 语料库 ROOTS 上进行训练，该语料库包含 498 个 HuggingFace 数据集。该模型在 366B token 上进行训练，并且位置编码是用 ALiBi 完成的。它用到了 250k 词汇表大小的 BPE tokenizer，帮助它适应多语言数据。

****18.Galactica****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpv0BHZujl2niavj5Eau2kUezP0KNnBcj0JVrqWcIugLONFroMnPVzBhQ/640?wx_fmt=png)

- 

属性：120B 参数

- 

论文地址：https://arxiv.org/pdf/2211.09085.pdf

- 

发布详情：Meta 发布于 2022 年 11 月。

Galactica 是一个科学模型，主要以论文、少量代码、其他基于知识的数据和一些 Common Crawl 数据为基础进行预训练。它用  token 对工作记忆进行编码，并使用特殊 token 对引文进行编码。

****19.LLaMa****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpRepzXBibKGSe30fSjTdk8nicjS94Bej7GUsv28TjETibBia96icj0C7skoQ/640?wx_fmt=png)

- 

属性：65B 参数

- 

论文地址：https://arxiv.org/pdf/2302.13971.pdf

- 

发布详情：Meta 发布于 2023 年 2 月。

LLaMa 像是 Chinchilla 的复制品，有着相当标准的训练组合，大部分为 Common Crawl。

****20.OPT****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp5rmxjqg2rusSjrDW107b4PHOhibyMiaQy5EUqewR9HVFib73Ohva1mBbw/640?wx_fmt=png)

- 

属性：175B 参数，与 GPT-3 相同的架构

- 

论文地址：https://arxiv.org/pdf/2205.01068.pdf

- 

项目地址：https://github.com/facebookresearch/metaseq/blob/main/projects/OPT/chronicles/OPT175B_Logbook.pdf

- 

发布详情：Meta 发布于 2022 年 5 月。

这是 GPT-3 的复刻版，它在 Pile 和 PushShift reddit 上训练，只有 180B token。

这些 Meta 论文完全不是相互关联的项目。LLama、OPT 和 Galactica 共有 41 位作者，只有一位是重合的。

****21.GLM-130B****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpDHvgmicuc3iasuUVsUhPgCdS8rcjd9RlNtPRVR2U0Zxnr3yVnNxk1ItQ/640?wx_fmt=png)

- 

属性：130B 参数

- 

论文地址：https://arxiv.org/pdf/2210.02414.pdf

- 

发布详情：清华大学发布于 2022 年 10 月。

GLM 是一个开源的双语（中文 / 英文）模型。它使用旋转嵌入和 DeepNorm，并通过 GeGLU 激活 MLP。值得关注的是，它主要以 INT4 进行推理（而其他模型，如 BLOOM 和 OPT，则量化为 INT8）。它还在预训练中加入了 prompt，而不是标准的 GPT 架构，并且使用 GLM 实现了双向注意力。

****架构变化****

****1. 多查询注意力（Multi-Query Attention，MQA）****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp5pY6h9uBGBU1bkib5ia2dqAT8x1f0ICV8HYtia4r1sgQve0TNSr3ZqMZQ/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/1911.02150.pdf

Noam Shazeer 的这篇论文中，key 和 value 在 head 之间共享，大大减少了推理时所需的内存数量，提高了延迟和吞吐量。这是一篇非常简洁的论文，并附有代码和结果。AlphaCode 和 PaLM 都使用 MQA。

****2. 稀疏注意力****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpaCXNW2ME0QWoQorXrcA7B7Exeic8icLHMibVIDSib8eZiaah7XzYiatOeLgw/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/1904.10509.pdf

在这种机制中，注意力不会应用于所有之前的 token。它描述了稀疏 Transformer 的两种风格，一种是跨步式，即关注最后 N 个 token；另一种是固定式，即关注序列中的部分 token。在 GPT-3 论文中，该模型被描述为交替密集和「局部带状」稀疏层。

****3. 混合专家（Mixture-of-Experts，MoE）****

关于 MoE 的内容有很多，在介绍 GLaM 和 Switch 时已经提到了一点。因此，此处将罗列一些优秀的原始文献。

- 

2017 年关于 LSTM 的 MoE 论文 [https://arxiv.org/abs/1701.06538](https://arxiv.org/abs/1701.06538)

- 

面向 MoE 的 Deepmind Scaling Laws 论文 [https://arxiv.org/pdf/2202.01169.pdf](https://arxiv.org/pdf/2202.01169.pdf)

- 

训练 1.1T 参数 MoE 的 Meta 论文 ：https://arxiv.org/pdf/2112.10684.pdf

一些谷歌的论文：

- 

[https://arxiv.org/pdf/2202.08906.pdf](https://arxiv.org/pdf/2202.08906.pdf)

- 

[https://arxiv.org/pdf/2202.09368.pdf](https://arxiv.org/pdf/2202.09368.pdf)

- 

[https://arxiv.org/pdf/2205.10937.pdf](https://arxiv.org/pdf/2205.10937.pdf)

- 

[https://arxiv.org/pdf/2202.08906.pdf](https://arxiv.org/pdf/2202.08906.pdf)

- 

[https://openreview.net/pdf?id=23ZjUGpjcc](https://openreview.net/pdf?id=23ZjUGpjcc)

****4.FlashAttention****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp0SORSpdqYtY5X0sic4wFicT8rSMZVYrVCicPC1n3H5hZC9E4Kq7hf72KQ/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2205.14135.pdf

FlashAttention 是一种架构变革，能以更少的内存访问量完成注意力处理。它对注意力矩阵进行切片和增量化的 softmax 约简，并避免了在后向传播过程中存储整个中间注意力矩阵。论文指出，与 megatron 相比，它训练速度提高到 1.7 倍，推理速度提高到 4 倍多（上下文长度越长，倍数越大）。在此之前，另一篇文章 ([https://arxiv.org/pdf/2112.05682.pdf](https://arxiv.org/pdf/2112.05682.pdf)) 也在 TPU 上采用了同样的方法，实现了 O (log_n) 内存占用。

****5. 编码器 + 解码器****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp3baarEA95h9uPDKCuSjZjDb1RBMO1d1mdQYEKYTfXzOF3h42XVgibVA/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/1706.03762.pdf

根据 Transformer 的原始论文，编码器 - 解码器架构最初是为翻译任务而设计的。经典的 GPT 架构交替使用注意力和 MLP 模块。原始的 Transformer 则采用了编码器块和解码器块。编码器块的结构是：注意力机制 → MLP；解码器块的结构是：掩蔽注意力→ 编码器 - 解码器注意力 → MLP。对于许多序列到序列的任务来说，例如 AlphaCode 或 T5，这也是一个合理的架构。

****6. 平行注意力****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpWroytj8Vff2iaYHxurukiaWw8ywYNJschQn8OS3hBxbpDbEN8ZJp1AWw/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2204.02311.pdf

PaLM 使用平行注意力。即在训练模型时，注意力层和 MLP 层并行运行，使用相同的向量。如此一来，就可以将注意力和前馈矩阵乘法合并在一起，从而提升运算强度，获得更好的性能（PaLM 的训练速度提升了 15%）。GPT-J 也使用了这种方法。

****7. 可供选择的激活方案：GeGLU，SwiGLU，SoLU****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpAJSS73szYy3kjsengibFSTTe4jUXZz4JNITHXT81jcFS4wmKG5VduSw/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/1706.03762.pdf

最初的 Transformer 论文使用 ReLU 来激活 MLP 模块。它在两个线性变换（matmuls）之间进行简单的 x if > x = 0 else 0。从直观上看，这有点草率。GeLU 与 ReLU 类似，但要平滑一些。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpDdrXs2dpWHz04NcynBlS5wsef5gWgYB3XkZvPRXlsdJKWv28gf1Szg/640?wx_fmt=png)

论文地址：https://transformer-circuits.pub/2022/solu/index.html

SoLU（Softmax）简单地说就是 x*softmax (x)，用于提高模型的可解释性。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpDbZeOe1zbL7gnQYNMmoRouhK9VZ5ygPu7JibWuDxTfoib7v1LIguGajw/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2002.05202.pdf

SwiGLU 是所列论文中最复杂的，也是 Noam Shazee 的个人论文。它建立在门控线性单元的基础上，旨在比 ReLU 更稳定，并在 GLU 之前进行 swish 运算。与 GeLU 一样，它软化了 ReLU，允许某些值低于零。

****8.LayerNorm 的替代方案：DeepNorm，RMSNorm****

LLM 每个区块有两次 norm（一次用于注意力，一次用于前馈），它会执行一些归一化功能以改进训练。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpdibibCstJ9El9l4eAI9ONTbYXvA7pvvro6kW0UwyxyDwRctsWlAOGNmQ/640?wx_fmt=png)

DeepNorm 论文地址：https://arxiv.org/pdf/2203.00555.pdf)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpMuRUPwJOBlzRJf18dZ3ADatwCLyNx6eTxJ5rxVdezKvjJmF3dfF6sA/640?wx_fmt=png)

RMSNorm 论文地址：https://arxiv.org/pdf/1910.07467.pdf

DeepNorm 和 RMSNorm 可以成为替代方案。RMSNorm（均方根）简单来说就是数值均值的平方根。还有一种 batch norm，效率很低，用起来似乎不太聪明。

****9.RoPE****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp7Swdfn2ia0BBzLS9bwISlOXwibL0mHlk3UAoLm5pWmLvuauibsIBXsIXg/640?wx_fmt=png)

- 

论文地址：https://arxiv.org/pdf/2104.09864.pdf

- 

相关 Blog 文章：https://blog.eleuther.ai/rotary-embeddings/

这篇 Blog 文章总结得十分优秀，本文不做赘述。

****10.BPE vs SentencePiece Tokenizers****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp7Swdfn2ia0BBzLS9bwISlOXwibL0mHlk3UAoLm5pWmLvuauibsIBXsIXg/640?wx_fmt=png)

- 

BPE 项目地址：https://huggingface.co/learn/nlp-course/chapter6/5?fw=pt

- 

SentencePiece 编码器项目地址：https://github.com/google/sentencepiece

字节对编码（Byte Pair Encoding，BPE）是大多数语言模型的默认编码，最初的 GPT 论文、GPT-3 以及 GPT-3.5 都使用了这种编码。不使用纯 BPE，而使用 SentencePiece 情况的一个明显原因是，分布不包含空格分隔的单词，就像 AlphaCode、GLM（中文）和 PaLM（明确是因为多语言）那样。

****11.ALiBi****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpZaFWGOOPGLujgUSLVESF1tSddJujQokibcnZcORc6nGIkhE9Iqq7OtA/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2108.12409.pdf

ALiBi（Attention with Linear Biases）是一种长上下文位置嵌入方案，通过根据距离对 qk 分数进行线性偏置，来支持对更长的长度进行外推。BLOOM 用了 ALiBi，Galactica 也尝试过，但没有采用。

****预训练后处理技术****

****1. 采用 PPO 算法的 RLHF****

在 RLHF 中，首先要训练一个奖励模型，由标注员评估模型生成的数组。然后在 RL 中使用 PPO（近端策略优化），策略生成由奖励模型评估的输出，以改进策略。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpMglflXqug14hjibE6MAVlGZhicbv0OVgUxUtibqHPKo8z9aIs4SQKS5wA/640?wx_fmt=png)

Christiano 论文：https://proceedings.neurips.cc/paper/2017/hash/d5e2c0adad503c91f91df240d0cd4e49-Abstract.html

Deepmind 的 Sparrow 和 Anthropic 的 LM 都是用 RL (AI|H) F 训练的，它们都有对话界面。WebGPT 和 GopherCite 一样，也是用 RLHF 训练的（后者调用了 RLHPreferences）。我认为，这都起源于 2017 年的 Christiano，它先于 LLM 所有内容，之后才是 2020 年根据人类反馈进行的总结以及 PPO 论文。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpEjqmlBPXE9cxaItk2WoYM6x5xagmsORmAm8v85zhViaLuantkwEXc1Q/640?wx_fmt=png)

2020 年根据人类反馈进行的总结 [https://proceedings.neurips.cc/paper/2020/file/1f89885d556929e98d3ef9b86448f951-Paper.pdf](https://proceedings.neurips.cc/paper/2020/file/1f89885d556929e98d3ef9b86448f951-Paper.pdf)

****2.Constitutional****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpjZUJTBweDrrA8SNCRbWnQhwtpVyr1bB3INM278ibeyDVgfvYUVFgqNw/640?wx_fmt=png)

论文链接：https://arxiv.org/pdf/2212.08073.pdf

作为 RLHF 的扩展，Constitutional 基本上是 RLAIF，不过实际上被称为 CAI。它有一个监督学习阶段，在这一阶段，只提供帮助的 AI 会生成对抗性 prompt。然后，助手会根据所提供的 constitution（以字符串的形式提供给模型的一组短值）迭代出自己的响应。然后对这些响应进行微调。第二阶段就像采用 PPO 的 RLHF，只不过将 AI 反馈替换了。

****3.Minerva****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpLOIGMDQicnkWqNXa21CF1qrxyoQHqlCiaEIRIV5RpdP29u35C309lc5Q/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2206.14858.pdf

Minerva 是 Blueshift 团队于 2022 年 6 月发布的一个数学和科学数据微调模型，执行效果非常好。它是一个来自 PaLM 的 62/540B 微调模型。它的数据集来自 ArXiV 和一些网站，并经过精心预处理，保留了数学格式。

****4.Codex****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp9w7LEibeQtRvZ4nhwtzibdnbOHRfkUiciay7sF3qrVblnia2zs8Kicul3GBg/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2107.03374.pdf

Codex 于 2021 年 7 月推出（并支撑了 Github Copilot 的推出)，是在 100B token 代码 (此处为公开的 Github 代码) 上微调而成的。该论文还首次提出了 HumanEval，即人类编写的代码评估。本文最值得注意的是，它证明了代码数据对代码性能非常重要，因为 GPT-J 在代码方面的表现优于 GPT-3。他们还为代码添加了一些 token，这使压缩率提高了 30%。

****5. 只对 CoTed 输出进行微调****

我忘了哪篇论文是这么做的，但依稀记得他们根据模型的思维链输出对模型进行了微调，结果变得更好。虽然这在意料之中，但是也值得关注。

****6.FeedME (SFT)****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpWaALyKkpUI1Jpu6YzP3ULpcxueoKV8lKzDicHBPDzk3ia9cjibqC8GLRQ/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2203.02155.pdf

这种方法在 Instruct GPT 论文中有所描述，但这不一定是该方法起源。该方法的起源更加接近下面这篇论文。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpAEAbaPKBcacWe5k0n5mBy9kWuBa7ZXicXyYTaRJnPtWnnRRgz74Ak1w/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/1909.08593.pdf

监督微调使用人工生成的内容，然后用于微调预训练模型。论文发现，SFT 比基础预训练模型表现更好，但 RLHF 比 SFT 表现更好。

****7.FLAN****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpeyVnaQZNhF6u4jo9ic8DKKH10CDef7zUN02Z6D8o4DLwVGeZibXnZicgQ/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2109.01652.pdf

FLAN 是一个经过指令调整的模型（在指令格式的 nlp 任务上进行了微调），可提升零样本性能。

****训练技术****

****1. 善于设置超参数****

没有论文是专门讨论这个的，但正确设置超参数显然是非常重要的。

通过阅读以下文章可以获得一些基准。

- 

Chinchilla 论文：https://arxiv.org/pdf/2203.15556.pdf

- 

Scalling Laws 论文 [https://arxiv.org/pdf/2001.08361.pdf](https://arxiv.org/pdf/2001.08361.pdf)

- 

Jane Street 的有关理解批大小的博客文章：https://blog.janestreet.com/does-batch-size-matter/

****2. 基于人类反馈的预训练****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpRgJOFQ8g9Hfr7VDGicMmBNNBgmGV4fBltKfVrz7QiaI61L2e2pmL40ew/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2302.08582.pdf

尽管 PHF（Pretraining with Human Feedback）在预训练时使用了一种简单的技术来标记数据，但预训练往往采用无监督的形式。该方法在训练时使用两个条件 token（好的和坏的）预置到样本中，然后在推理时使用它们进行采样。该研究还尝试了其他各种目标（尤其是把坏数据过滤掉），但在 python 风格、PII 和毒性上的评估结果都很差。

****3.MuP****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLphNYXKSTUtL48fmZ8vA2stntT5LVEicXufen8iaNqiaScW4wuibjTuVbzYA/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2203.03466.pdf

MuP（Maximal Update Parameterization ）是一种参数化方法，这种方法不仅节省了参数扫描计算，而且更接近最优。这篇论文很好地阐述了这一方法的理论依据。

****其他****

****1. 思维链（CoT）****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLphib0vXgelrPH0GacMzBOicmdgJP8ltNxpBxEhfiaFU6nglFQN5fjyWcrg/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2201.11903.pdf

CoT 是一种让模型 「step-by-step」思考并产生更好结果的技术，名字起源于上述论文《 Chain-of-Thought Prompting Elicits Reasoning in Large Language Models 》。论文描述了发表于 2021 年 2 月的论文《Prompt Programming for Large Language Models:Beyond the Few-Shot Paradigm》中技术的具体应用。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpgtaCwBIwkjujhtSlq4dgLtsD2HLr94j8dfTSia26OJJickFCr8BPowNw/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2102.07350.pdf

****2. 工具使用****

关于规范工具使用的论文可以最早追溯到 2021 年 12 月的 WebGPT 论文。文中 GPT-3 可以访问网络，从而大大增强了模型能力。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLp5FqlkhynPxiaevBBvTP8QPU7uNsIABb8N5leYmpHwVwjNNFlpV3iapcg/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2112.09332.pdf

除此以外，DeepMind 还训练了可以借助 RL 工具来完成各种任务的智能体 ；Meta 发布语言模型 Toolformer，可以教会自己使用工具。

- 

DeepMind 论文：https://arxiv.org/pdf/2202.08137.pdf

- 

Meta 的 Toolformer：https://arxiv.org/pdf/2302.04761.pdf

****3.Fill In the Middle****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLptejmaJxFiaXKbf6wrQCfNBGVXiaicmTOjAZvJKYAyVtKTuiaKYS6ibYt1Lw/640?wx_fmt=png)

论文地址：https://arxiv.org/pdf/2207.14255.pdf

这篇论文描述了一种简单的数据转换，它将子字符串从文本中间移到末尾，并要求模型填充中间部分。这样，模型就能获得一种对代码补全等任务非常有用的能力，而不会影响严格意义上从左到右任务的性能。

****4. 采样技术：Top-k，Top-p (核)，Beam Search****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpzddwkag38L3PTCvTtnA5XGwLenrZ5w4qdkGKLq7OlwoQg2vNSibhLYA/640?wx_fmt=png)

与 Top -P 有关的论文地址：https://arxiv.org/pdf/1904.09751.pdf

语言模型的输出基本上是每个可能 token 的 logit，然后将其 softmax 化为概率。将 logits 转换为 token 的最简单方法，就是取最有可能的 token。当语言模型有温度控制时，它将 logits 除以温度，这使模型对其首选更有信心 / 更没有信心。Top -K 采样从该分布中获取前 K 个 token 和样本。Top -P 采样，或称核采样，会选择 tokens 中概率累积排名前 P 个百分比的部分，并从这个选定的部分进行抽样。

****5. 无尾采样（Tail Free Sampling）****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibwK2TxMMcXEnEt9e6wOtLpOVT4qwmKnUtnsmkc2I11oRJLURubiazUvI8HK1l0ibzz2AdISyQqWMXA/640?wx_fmt=png)

文章地址：https://www.trentonbricken.com/Tail-Free-Sampling/

无尾采样是 Top-p 采样的衍生，之所以这样命名是为了找到 「尾」，因为 Top-p 采样可能会在许多 token 具有相似概率的点上被切断而失败。上面这篇文章像是说明了无尾采样能够更好进行采样工作的原因，但当涉及到提高模型的创造力和范围时，没有很好的基准。

补充地址（文章中提到的其他论文的地址）如下：

- 

GPT-2 论文（2018）：https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf

- 

扩展定律论文：https://arxiv.org/pdf/2001.08361.pdf

- 

Transformer 论文 2017：https://arxiv.org/pdf/1706.03762.pdf

- 

Turing NLG 论文：https://arxiv.org/pdf/2201.11990.pdf

- 

Jurassic J-1 Jumbo 论文：https://uploads-ssl.webflow.com/60fd4503684b466578c0d307/61138924626a6981ee09caf6_jurassic_tech_paper.pdf

- 

PaLI 论文：https://arxiv.org/pdf/2209.06794.pdf

- 

post-Chinchilla 论文：https://arxiv.org/pdf/2207.05221.pdf

- 

有关道德自我纠正的论文：https://arxiv.org/pdf/2302.07459.pdf

- 

近端策略优化论文：https://arxiv.org/pdf/1707.06347.pdf

- 

Deepmind 的 Sparrow 论文：https://arxiv.org/pdf/2209.14375.pdf

- 

WebGPT 论文：https://arxiv.org/pdf/2112.09332.pdf

- 

GopherCite 论文：https://arxiv.org/pdf/2203.11147.pdf

*原文链接：https://kipp.ly/transformer-taxonomy/?continueFlag=a897a8d0eb16dcae5398f1b58cc5e06f*
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8dbicXVZ673FXc1TtzgDGrpQo5YDOTicpyuvRso9NgnbCE2fGBwMUmEIwTJmeGpENpRmF5wwP5VAxg/640?wx_fmt=png)

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：content@jiqizhixin.com

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
