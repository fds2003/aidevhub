---
title: "从零构建AI训练推理的GPU集群"
slug: "从零构建ai训练推理的gpu集群"
description: "作者： Web3天空之城 来源： Web3天空之城 文：城主 写在前面： 偶然看到了这个内容，AI训练推理的GPU集群搭建的详细入门指南。很少见的资料。 对于希望自己搭建GPU集群的团队来说，这是一份很有价值的参考；对于高端个人用户而言，或许可以考虑如何在家里搭建一个几GPU的小集群玩玩，毕竟多搞几个30或40系显卡成本还是可以相对接受的。 完整视频版： 【从零构建AI..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/HFC4txxSfuTn9ow8mbUzIg"
sourceName: "Web3天空之城"
readingTime: "27 min"
createdAt: "2023-07-23T16:00:00.000Z"
publishedAt: "2023-07-23T16:00:00.000Z"
featured: false
---

作者： Web3天空之城  来源： [Web3天空之城](https://mp.weixin.qq.com/s/HFC4txxSfuTn9ow8mbUzIg)

文：城主

写在前面：

偶然看到了这个内容，AI训练推理的GPU集群搭建的详细入门指南。很少见的资料。

对于希望自己搭建GPU集群的团队来说，这是一份很有价值的参考；对于高端个人用户而言，或许可以考虑如何在家里搭建一个几GPU的小集群玩玩，毕竟多搞几个30或40系显卡成本还是可以相对接受的。

完整视频版：

【从零构建AI训练推理的GPU集群【60分钟中英】-哔哩哔哩】

[https://b23.tv/TelEDKF](https://b23.tv/TelEDKF)

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxYK0kwIK5om09UVmpCYNPAbzx6cmOtBPMT7icWOFAicEAqnjYrM9Lp1tw/640?wx_fmt=png)
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxAotMJUib4TBicRqgqlicMOOyOcP7Xa1JMibyNs7hUvCkUiaoABwECNVIkicQ/640?wx_fmt=png)

嗨，我叫斯蒂芬·巴拉班。我是 Lambda 的联合创始人兼首席执行官。今天，我将带您了解如何为您的机器学习团队从头开始构建 GPU 集群。让我们开始吧。

关于 Lambda 的一些背景知识：我们是一家AI基础设施公司，我们为财富500强企业, 一些世界顶尖大学，美国国家实验室和国防部提供GPU服务器和集群。

除了担任首席执行官之外，我也是 Lambda Echelon 的首席架构师，这是我们的关键 GPU 集群产品。

本演讲主要基于 Lambda Echelon 参考设计白皮书，以及我们在为客户部署这些大型集群时获得的经验。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxwd3ibn5owTFo20QRRD2SBlE6mHabTRbpL4ZZgibNdq0Wic73xe2ZWA0YQ/640?wx_fmt=png)

对这次演讲简要概述一下。

我将首先回顾一下您可能会看到的一些用例，你的机器学习团队正在做的事情，以及其中一些用例如何真正改变集群的设计。

然后我将逐步介绍您在设计集群时将要处理的三个抽象级别。即集群设计、机架级设计、节点设计。我将稍微讨论一下所有这些不同级别的抽象如何相互作用。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx2EYRASuYia2O6XkksJic6TPM3ezWQpOm83iaB6CbEk3oyw5OUTRWejDAA/640?wx_fmt=png)

我们以前都经历过这样的情况，这就是我所说的公共云或 GPU 云悲伤的五个阶段。

它始于对昂贵的云账单的震惊：

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxqIT8fedib4zV2vECCtOOlIGTBJK8qPfttJsYmBoIfkHhn4qRM78OYNw/640?wx_fmt=png)

当您收到这封电子邮件时，您会收到非常高的公共云账单。

你去和你的工程或机器学习研究团队交谈，然后你说，好吧，让我们尝试解决这个问题。让我们尝试几种不同的方法来做到这一点。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxAnlZjnUt1ibdHkFKOlAGb8ndrhLfd2K2y6AibXhcgWl0kHU4gOfMZeew/640?wx_fmt=png)

这就是我们所说的第一阶段，即否认。也就是说，下个月这种情况不会再发生，我们会修复它。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxVu7UBcbZuHmclQOxAgURqcxT9A3gDddJqAg11U105ictmcS2n00D4Zw/640?wx_fmt=png)

因为下个月你会收到相同的账单，或者账单甚至继续增长。那就是你进入第二阶段，即愤怒的时候。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxCENbJ7wper1UI5LkLnriaGzPzW3pE84ufUgQZS9gzzV31TBD8VxHWNQ/640?wx_fmt=png)

然后第三阶段是讨价还价。您可能会收到来自公共云提供商的电子邮件。它说，嘿，为什么不尝试一下现货实例或预留实例呢？这最终并没有真正的帮助。

更有可能的是，您最终只能支付预付费用并将实例保留三年。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxkuzEjjKL3C1tqPL673ibPzB1KUibdTcHsk5a1kpCv0cWN11QbKBqcphQ/640?wx_fmt=png)

这就是您进入第四阶段的地方，即抑郁阶段，即现货实例和预留实例根本不够，尽管已经支付了前期费用，但感觉非常绝望。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxoph71T3wnlFM5d5CzzL5ZNPsUFXmia7ChCk3cc0btoq9T0HOlSibLrCQ/640?wx_fmt=png)

你可能会进入第五阶段，即接受。好吧，我想公共云 GPU 很昂贵，而且管理硬件太可怕了，所以我们只能接受这一点。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxDycEpicIxBUMiba7ibkOyOZ6O2VZy2a21B1RsDicCytbbV2DPTg4t0MV5g/640?wx_fmt=png)

所有这一切的解决方案就是坐下来学习如何构建 GPU 集群。

这就是今天演讲的内容。它是教你如何摆脱 GPU Cloud Reef 的五个阶段以及与之相关的所有费用以及如何构建自己的集群。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxXufQX0ibQP4EudibwdXIPLKuicOwl8IgJqYFDVLxyQl5HdhticuzPgbT7A/640?wx_fmt=png)

有很多充分的理由考虑进行本地构建。

您可能已经有一个本地集群，但如果您有 PB 级的数据或只是一个巨大的数据集，那么您可能会在公共云中获得非常昂贵的出口成本。

除此之外，如果您将数据存储在别人的硬盘上，您真的拥有它吗？这就是数据主权和安全问题。将所有数据保存在本质上可能是竞争对手的硬盘上是否安全？

最后，公共云非常昂贵，通过本地部署，您可以用更少的钱获得更多的计算能力。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxe7wOy0vKsBibCRbqOHaT53rxicBiaibRf3B1RV2DCgGbdBmUlDzib7CZ56g/640?wx_fmt=png)

在开始构建集群之前，您要做的第一件事是真正深入了解机器学习团队的用例。该用例将推动集群的设计，无论是您正在训练的模型类型，以及他们正在做什么。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxqwVTQMQE7Ej858ibWCc5CPAhAugB08X6qlrxKZlniaYCnpoceNpUlicnA/640?wx_fmt=png)

我将介绍机器学习中三个非常常见的模型用例。

1.超参数搜索，试图找到最好的模型。

2.大规模分布式训练，一旦您了解模型的整体架构，就可以快速训练模型。

3.生产推理，即训练模型后，大规模部署，通常给客户。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxTfFDhHA479kOmQcYzDVJz6GYfKECq4KIjdt7np4JB4V3owFuLMD51w/640?wx_fmt=png)

超参数搜索提出的问题是，这些神经网络中的哪一个（在本例中为 A、B 和 C）会表现最好吗？

我们所说的最好是指最高的准确性。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxkibAU030SniauGHMoBkBsrvGhehRsAd7RibkW68hR2AicgzrdZXtXPnGng/640?wx_fmt=png)

发生的情况是，您通过从头开始训练网络来为每个网络分配分数，然后在评估测试中测量其准确性。

您评估网络的准确性并为其分配分数。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxACywYPJg99icicznEjKdZO7y8hrbCLomQxMdgHK8Yoic7dEsW7Uwx548A/640?wx_fmt=png)

然后你只需选择网络架构，无论是得分最高的节点数量还是层类型。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxJRGs6zjulTnzYjGHGU645h1Wud7vwNFwibJMVJuVKyK7xAay2XLAPiaQ/640?wx_fmt=png)

通常，当人们进行超参数搜索时，可能需要几个小时到 48 小时不等。可能需要几天时间才能看到结果。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxfKSEIk1hnJz7JeMvvONqAzPIKxMp2WkxTx9oSOzVKibSZzvszFUKJ9A/640?wx_fmt=png)

当您开始时，您可能会从小规模开始，因此在 GPU 笔记本电脑或单个 GPU 上进行训练。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxwFiah82p2pWuiaCLmSHQJBhOxRKv6nkRqbUYxfO92zia3x2lr07qNKGlQ/640?wx_fmt=png)

最终，您将希望扩展到更快的 GPU，您将执行 A、然后依次是 B、C。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxIbFa85aQoJYqic2eiamqPIyEpWI0sw2RYcicnBQ8Fqrr6fUboNyj8FOfg/640?wx_fmt=png)

最后，您需要将其扩展到多个服务器以同时运行作业。

正如你在这里看到的，在三台不同的机器上运行 A、B 和 C 训练作业是一个令人尴尬的并行问题。

您实际上不需要在这三台服务器之间进行任何通信。当您为超参数搜索应用程序设计集群时，在集群中构建的网络带宽不需要与大规模分布式训练等其他应用程序一样高的带宽。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxARfMKCerLpldzT5kIv5zAK5GsFiccC74tlibsldKVceDsibhpbFo0Vxiag/640?wx_fmt=png)

大规模分布式训练实际上是，一旦你找到了真正适合你的模型架构，让我们尝试尽快训练这个模型。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxnaNa4NHcp87mSY4DWzCpDINYjUSFcYX5hg9vBQtCsf5m350ayIq9fQ/640?wx_fmt=png)

您所做的基本上是获取非常大的批量大小并将它们分散到服务器集群中。

一般来说，您只需将学习率基本上线性地增加为您正在训练的批次大小的函数。你可以获得非常惊人的加速，我们正在谈论在几小时或几分钟内训练 ImageNet，与在单个 GPU 上运行相反。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxiaC0TQee8sCsTFk1yOiciabR9rWnEjv2EGWwXKQArWuAyGiadScib2g4lUA/640?wx_fmt=png)

然而，随着大规模的分布式训练，协调所有这些服务器很困难。

管理一个集群并不容易，处理所有网络和设计。

真正需要注意的是，当您构建大规模分布式训练集群时，您需要对其进行设计，以便更轻松地协调和维护它们。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxw7eQibKld36aCjswXHrfFOT2ibL9UPx0oicsiaEh44X3YnJ7UKFkibj0icrw/640?wx_fmt=png)

此外，正如您所看到的，当您进行大规模分布式训练作业时，他们基本上是在进行训练，然后将梯度传递给彼此，然后在更新模型之前对这些梯度进行平均。

在大规模分布式训练的情况下，实际上会发生大量的节点到节点的通信。您将需要一个真正高速的网络结构来连接所有这些节点，因为通信开销非常高，并且在分布式训练进行时您基本上会收到很多信息。

大规模分布式训练就是这样，可以改变您最终得到的集群的结构。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxyE6L4kVD2U9Y01UjtiazjzPRQ0DS68KxXpRXA9hiclibPKRpicAqQwA4ibQ/640?wx_fmt=png)

继续，最终模式，同样非常常见的机器学习用例是生产推理。

你可以想象像对着手机说话这样的事情，“嘿 Lambda，把你好翻译成普通话”，它可能会回应，“你好”，然后给你那个结果。嗯，这就是推理。

训练模型后，在以前从未见过的新数据上运行它。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxVHLakfA46afoPqgbdl1Xhz9fnfrLcU69Y8uSdNjQ63pHyrSoCcvphw/640?wx_fmt=png)

推理集群实际上是为应用程序设计的，在这些应用程序中，另一端可能有数十万、数百万或数千万用户，并且它们正在处理潜在的数千或数万个并发请求。

相比大规模分布式训练和超参数搜索，您会注意到，通过生产推理，另一端有一个实际用户实时等待结果。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxupWU6Q4jXxiaZjjVj8hDIic7L9xV0KqxxialInWUzNhIrlFNm7nSrh13A/640?wx_fmt=png)

集群需要高可用，正常运行时间长，对任何类型的中断都具有鲁棒性，并且需要快速返回答案。

但正如你在这里看到的，一般来说，您基本上在所有这些服务器上运行相同的模型，并且数据不同。

数据不同，因此节点之间没有太多通信。您不需要真正高的节点到节点带宽，但确实需要高冗余和可用性正常运行时间。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx3ltuiaZoibeDgRHncKJgmrJ8afqMb7IgU66OGIz1ooQ4B4NpvEsnvHwg/640?wx_fmt=png)

这里的这个小表总结了这三个应用程序和用例中的每一个如何真正改变集群的一些属性。

我刚刚在这里写出了这三个用例的节点到节点带宽，以及生产中需要的冗余要求。

通过超参数搜索和大规模分布式训练等，这通常是基于队列的训练作业。它将训练作业从队列中拉出，您稍后会回来检查结果。

鉴于生产推理，对最终用户的在线实时响应。这也确实改变了集群与互联网的接口以及它的速度和性能。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxIGQn1jQFS5ZDx5bP0bpPlyoPXZLM3UWPgr2R0ODbAJ7CxsR6S6iaqgQ/640?wx_fmt=png)

这里继续讨论实际的集群设计方面，在整个设计过程中，我们实际上正在研究三个抽象层次。

我们正在从集群层面的思维中跳跃，机架级思维、节点级思维、回到机架级思维和集群级思维，然后是将它们联系在一起的所有软件。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxkibMW8Xw8QTYob1VquXfz74bXGDmf2aOdudqfHVlAwEy5PjlJ78Pdkw/640?wx_fmt=png)

这些实际上是您在设计集群时通常会考虑的三个抽象级别。

通过集群设计，您主要考虑数据中心平面图、容量规划、需要多少计算机、需要多少存储、您需要什么类型的网络，将所有内容连接在一起的网络拓扑。

整个机架只是集群底部的一行。

当你深入到机架设计时，您将看到的主要内容是所谓的机架标高。我们将在稍后的演讲中讨论什么是机架标高以及它们的外观。但它们本质上描述了物理构建节点后服务器的布局和定位。

获得非常详细的机架标高非常重要，因为它驱动 PDU 和布线。实际上，您提出的一组机架标高本质上是整个集群的基础。因为只需查看机架标高即可真正了解该集群是什么。

在机架标高中，该节点中没有任何可见的组件。它只是您选择的节点类型的名称。

最后，当你开始节点设计时，我们谈论的是单个节点的物料清单，它只是组件列表。

节点设计确实至关重要，因为最终，结果是该集群的最终性能。这就是节点设计真正重要的地方。GPU选择、CPU选择、所有这些东西都处于节点设计级别。

最后，还有软件，这就是将所有内容联系在一起的方式。重要的是要记住，有些软件可以在每个不同的抽象级别上运行。有编排和集群管理软件。CUDA 和 PyTorch 中的驱动程序在节点上运行。然后是 IPMI 和一些可用于管理在机架级别运行的 PDU 的软件。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxw0D3lvdx68Ab9dKERwpq9ia6YTPJiaicHfpdz1HibmzUusvsjYkwWahlKQ/640?wx_fmt=png)

每个抽象级别实际上都有一些我们所说的工作产品。

这是完整的集群物料清单。在集群级别，有网络拓扑，数据中心平面图。

在机架级别，它是机架标高和机架BOM，在节点级别，它是节点BOM。

您确实需要创建每一个工作产品来完全定义您的集群是什么，并使其能够进行物理制造，一旦机架到达数据中心，就会在数据中心内进行堆叠、标记和布线。

如果您确实确信自己的运行没有超出数据中心可能提供的某些电力和冷却限制。您的数据中心仅在机架级基础上提供有限的电力和有限的散热量。

您需要确保所有这些工作产品都告诉您，您的产品符合规格，并且一旦购买并安装了所有东西，您就不会遇到任何问题。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxSWCTprdHl3b5AMW15FnwrdG1efOetCOyicyFnejMdLSic5EyICpxwRhQ/640?wx_fmt=png)

让我们开始吧，集群设计。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxOZXyRiaia9vXvtCEGicI805zib045KVymd74eT3diaOib5YBFmpjXf7q9Jibg/640?wx_fmt=png)

例如，集群级架构实际上可以归结为集群中的这五个组件，您需要在开始深入设计节点之前确定这些组件的范围。

您需要拥有执行实际工作的计算节点，并且需要定义所需的计算容量。

您需要与机器学习团队合作并了解他们需要多少计算量，它需要多快，它需要以多快的速度与存储进行通信。

您需要找到存储容量来提供数据集并存储训练模型和检查点。

你需要网络结构来让计算相互通信，让计算能够与存储进行通信，并且管理节点能够将数据复制到存储节点或者在远程计算节点上运行命令。

您确实需要与您的数据中心或主机代管设施交谈，并为您的数据中心（机架笼或机架排）获取完整的数据中心平面图，并了解每个机架中有多少电量。

物理布局是什么？因为您将用它来计算电缆长度。

最后，您将需要创建要使用的数据中心的列表。

每个节点上安装的软件包决定用什么软件来编排整个集群。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxQDy6yqdcYwZqiaaAa1Y3QcPzWpbZxWbh16652K59zrq7jsmmdEUot2w/640?wx_fmt=png)

当你经历这些事情的时候，就像我说的，你看着你和你的机器学习团队坐下来，询问他们需要多少计算能力，并与他们一起真正规划。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxKKMia1AEmt81yicZKXN0vOsAalHrZKDo8cbDZqHIib9vXhmzicaPmB88Zg/640?wx_fmt=png)

对于存储，存储成为集群的瓶颈并不罕见。这是非常有问题的，因为这主要是集群中最昂贵的部分（即您的计算）的瓶颈。您确实需要解决这些存储瓶颈以便您可以充分利用您购买的计算能力。

一般来说，有两种存储路径。您可以构建它或购买它。这要么是在存储合作伙伴处工作，要么是自己推出。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx8LFTVL5M9KPiaCkTia5capgsOEsulXQ7PNsWcicFHViaCRjoqg5Ln5bfDg/640?wx_fmt=png)

这些是一些示例存储架构图，您可以在整个存储设计过程中将它们放在一起。

这些都是很常见的，这里就这三个。我将快速回顾一下它们。

您可以做的最简单的事情实际上只是拥有一个包含所有计算节点的 SSD 或 HDD NFS 服务器，访问该 NFS 挂载，

然后使用缓存文件D之类的东西作为本地NFS缓存。

这实际上是一个非常可扩展的…… 抱歉，它不可扩展，但它是一个很棒的 MVP，集群的最小可行产品。

您最终会遇到存储服务器的带宽限制，或者如果您的数据集大于 NVMe 缓存，您会遇到每个人都不断发生缓存未命中并返回到存储服务器的问题。

您需要将其扩展到并行集群文件系统之类的东西。这就是 Lustre 或 BGFS 之类的东西。

在那里，您正在谈论一个具有元数据服务器的存储集群，它非常快，但也可能是非常难以管理的存储解决方案。

您将需要一名专门的存储工程师，或者至少有一个专门的系统管理员来为您运行并行集群文件系统（如果您打算这样做）。

最后，对于那些有需要的人来说，实际上是并行集群文件系统，通常是 NVMe 闪存，比如 Weka，正如我之前所说，BGFS 和 Lustre。

如果您需要更多的数据存储，例如，如果您是一家自治公司，或者您出于某种原因正在存储大量视频和传感器数据，您将拥有真正的分层存储系统。您可能有一个并行集群文件系统作为热层，但您确实需要使用 HDD 作为后备存储，因为当您存储 PB 级数据时，将所有数据放入闪存中的成本非常昂贵。

然后，您将在该 HDD 层之前有一个 SSD 或闪存服务器。

最后，再次，带有缓存文件 D 的本地 NVMe 缓存，这是一个出色的 Linux 实用程序，可以跨所有这些工作。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxcOELjn6Wk5ZSY4gw9Sn74r03ia4cebCEUCyFcdzncYt9UrNsUvKyacw/640?wx_fmt=png)

另外需要注意的是有这样的技术，它叫做GP直接存储。它允许您的 GPU 直接访问本地 NVMe 驱动器中的数据，而无需通过系统 RAM 进行双重复制。为了使其发挥作用，您确实需要确保拥有正确的 PCI 拓扑。我们将在下面详细介绍这一点。当我们到达那里时，节点设计部分。

但是，当您将数据提取到 GPU 中时，这确实可以加快本地 NVMe 读取速度。它也与GPU直接RDMA非常相似，

这实际上是为了将数据传出InfiniBand。

我们稍后会讨论这个问题，但我只是想快速提出这个问题。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxRy0u2EdIm3WWj3qjgx4Y9ia2x4q3cicxnfHpTbH35Nu1aVpicUyFhXkBQ/640?wx_fmt=png)

再说一次，我已经回顾了其中的一些。

这是构建与购买、自己部署与与存储合作伙伴合作之类的事情。这些是一些常见的开源存储解决方案，这些是我们在机器学习工作负载中看到的一些常见的专有存储解决方案。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxAVfxjFerDP6bMrQPPuKydbos6qqw7QsAM2XsjYQQZOgnbYiaEd2XQQg/640?wx_fmt=png)

让我们继续讨论集群网络。

我们已经讨论过与您的机器学习团队坐下来确定您的计算和存储需求。然后，您确实需要利用从机器学习团队收集的信息并构建一个可以实现这一切的网络。

让我们了解一些有关网络的基础知识。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxmoDVYRl7Ric3MRKmWqpsYYc2vW7Ry6wibPicQcEVgeLkLpzv0tMFGPuoA/640?wx_fmt=png)

借助 InfiniBand 网络，你可能有一个交换机。在本例中，我们将讨论 MSB7800。这是一个36端口交换机。它是 Mellanox 的每秒 100 吉比特的 InfiniBand 交换机。

我们将以此建立一些网络。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx1E0VfVU4eSj1vbGk3PbfKvssQhtCGsEpPWI6RmwXWNP0AaUW1C8WWQ/640?wx_fmt=png)

首先，您可以从小事做起。即36个端口。假设有四台服务器，每台服务器都有四个每秒 100 吉比特的 EDR HCA。它们都是向上连接的。您总共有 16 根 InfiniBand 电缆。36比16大，所以你很好。

对于小型机架级集群来说，这可能是一个完全有效的网络拓扑。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxAYC1SCZFIlUPEic1gk1LicOaOPPxnia3mebib1SAAF2SummuSucrEImWJg/640?wx_fmt=png)

然而，当您扩展集群时，

也许在这种情况下，我们会扩展到 12 个节点，正如您在 3 x 4 的网格中看到的那样。请记住，每台服务器都有四个 InfiniBand NIC。总共 48 根 InfiniBand 电缆，比 MSB7800 提供的 36 根多。

您需要做的是构建脊叶设置的拓扑，在其中以非阻塞的方式扩展网络。我要谈论的是建立一对一的，没有超额订阅网络。

为了保证一对一，您需要做的是确保该系统中外部或南向端口的数量等于内部或北向端口的数量。内部连接是您在叶子和脊柱之间看到的连接。正如你在这里看到的，我们有叶子 A、B 和 C，每个都有 18 个连接，其中每个连接有 9 个连接到主干 A，9 个连接到主干 B。

我们那里有什么？我们有 18 乘以 3，这是那里发生的 54 个内部连接。我们有 54 条 InfiniBand 电缆

需要从每个刺连接到每个叶子。您还会注意到，每个脊柱实际上都没有完整，它们没有得到充分利用。实际上还有一些额外的端口可用。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxia4HeglTribNZIeHVSWTZspLdjKmz1JiaibFSIeX3uBzuF5zvibDQWWD4bA/640?wx_fmt=png)

这实际上就是此设置中充分利用的主干和叶子拓扑的样子。

你可以看到有脊柱A和B，然后是四叶交换机。

总共有 72 根，这就是叶子和脊柱之间的电缆数量，两个主干交换机提供的内部连接总数为 72 个。

这等于南向或外部连接的数量，因为同样，18 乘以四是 72，因为 18 乘以二是 36，乘以二是 72。18 乘以四等于 72 个外部连接。

这是扩展你的网络的一种方式。您可以将其扩展到三层，上面有额外的刺，或者你可以做一些完全水平扩展的事情。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxJaQcQ90UDWHKLL9F5SukRLjOMayZNp47dlpspMchGNOHhibtIialB4tQ/640?wx_fmt=png)

正如您所看到的，这可能会导致您在叶子和脊椎之间需要进行大量布线。这就是导向器交换机真正发挥作用的地方。在这种情况下，我们谈论的是CS7520系列，这是来自 Mellanox 的 InfiniBand 216 端口导向器交换机。

它使用背板而不是电缆来构建内部网络。实际上，您可以通过这个导向交换机看到它有六个刺，然后有六个叶子。

但您会注意到，这里的叶子实际上有 36 个外部端口。

这意味着，如果你打开其中一个盒子，实际上有两个相同的 IC，MSB7800 中安装了两个相同的集成电路。

在每个导向器交换机叶中。这意味着有36个南向端口，然后 36 个端口向北进入背板，连接到作为导向器交换机一部分的六个脊柱。

该导向器交换机提供 216 个外部端口。需要注意的是，在构建集群时，您确实需要完成布线，将每个节点的电缆分布在控制器交换机中的多个 IC 上，以便最大限度地提高节点到节点的带宽。

设置起来有点棘手。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxIqsh9MiarcKpnXrEZKpHMq2BqWHwMbqx5ICRbcAPeKmjEicfn5fUYI2A/640?wx_fmt=png)

我们将在这里稍微介绍一下节点拓扑。

这样我们就得到了单个服务器机架的网络拓扑。它有四个不同的网络。它有一个计算结构、一个存储结构、一个带内管理网络，用于让管理服务器与存储和超平面进行通信，带外管理网络，它还连接 PDU 和其他东西，类似于 IPMI 系统，这些不同节点的带外管理系统。

这是您可能看到的真实网络拓扑的示例。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxweMRqLGkjTPMbcUwnNCyPRjYHDOibficspOkib6AsjbQV8QQHmxWj1rbw/640?wx_fmt=png)

继续进行数据中心平面图，您需要与您的数据中心提供商和托管提供商联系。

你需要问他们，你们提供什么机架？有多少电量？请问，每个机架有多少可用电量？允许我达到的最大密度是多少？你知道，我的机架可以达到多高的千瓦功率？这与数据中心的 HVAC 功能有关。

您需要将该平面图和所有信息导入某些 CAD 软件中以测量电缆长度。您的电缆线路会是什么样子？

这是你真正需要做的计划，因为您不仅需要知道电缆长度，而且确实需要确保不会超出数据中心为您提供的功率预算。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx4iaGp91P7bWoCsSEkJiaUHQnMQMZLsz2ZibwRxCDLNicNKtzRNMEiaIhuiaw/640?wx_fmt=png)

最后，这只是我们通常在为客户提供的 Lambda Echelon 集群上安装和支持的一些软件的快速概述。

但你会想要一些东西，你知道，在这些不同的小软件部分的每一个上，你都会想要一些实验管理软件。

您可能需要一些笔记本。您将需要某种方法来编排您的容器。您将需要一个作业调度程序。您将需要一种方法来进行日志记录、监视和系统运行状况。

这只是您在设计集群时可能会看到的一些软件的快速概述。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxVIfh5bteD1EMGXbljM0JUVNsNGOladQRvYCO85OJlfUqp6oOygMjibQ/640?wx_fmt=png)

稍微了解一下实际节点上安装的内容。

在 Lambda，我们开发了名为 Lambda Stack 的东西。它是一个 Debian PPA，可保存您所有的 NVIDIA 驱动程序、CUDA、InfiniBand 驱动程序、一切都是最新的，还提供了在系统范围内安装的最新版本的 PyTorch 和 TensorFlow，以及最新版本的 Docker 和 NVIDIA 容器工具包，用于运行 GPU 加速容器，您可以从 NGC 等容器注册表编写或下载这些容器。

如果您使用 NGC 容器，Lambda Stack 会提供运行该容器所需的所有 Docker 工具。这样做的作用是为您管理升级路径。因此，如果您从 CUDA 8 切换到 CUDA 9，或者在本例中从 10 切换到 11，您通常必须更新驱动程序、PyTorch 和 TensorFlow，并且可能需要重新编译。Lambda Stack 可以为您处理这一切。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxwr2MhWMvjqWPqLQgKpYBKphoyMic6t1P1kt3mMyKcTqgXCZCZ5L1EzQ/640?wx_fmt=png)

所以我现在要深入研究机架设计。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxHZnD31CibviccKKzyJe13Onghv1zxMjVFzWOtyNzNdVTtm9YTfou2gPQ/640?wx_fmt=png)

机架设计是将小节点和大集群连接在一起的部分。

这是我之前提到的机架标高的一个例子。这是机架标高的示例。你可以看到这实际上是我们模拟的一个地方。

所以它看起来就像它实际上的样子。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxM8ial2WphXZU27NFCg5bSdibvoExj9tKSsIH7ArMc4Jpv2ZF96nD9trw/640?wx_fmt=png)

然而，现实情况是，当您在 Excel 中执行这些操作或首次将其写出时，大多数机架立面图实际上看起来都是这样的。

它的作用是显示每个节点的位置节点的名称，以及有关节点功能的一些信息。但这就是您使用机架标高所达到的抽象级别。它实际上是供那些将服务器装架、堆叠、贴标签以及将其布线到该机架中的人员使用的。

一般来说，它被用作了解集群在高层次上是什么样子的一种方式。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxtosoE6QfN8nRuKZz7u8nQxwMiaoghRXEXNA3RmVC99kUAlTNHHSibsBA/640?wx_fmt=png)

每个机架立面实际上都有自己的机架级物料清单。

因此，您可以在这里看到，节点本身并没有分解其 CPU，但它只是此机架物料清单中的一项。它将包含所有不同的电缆、PDU。

您需要了解这些 PDU 使用了多少个端口，我们稍后将讨论机架级电源，以及为一切供电的电缆。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxVsQonCJqzISdiahuRDoOa9OCarnGR2vxsWgdM7Kuia6vLCouicmD45f3Q/640?wx_fmt=png)

您在任何时候都要处理的最重要的数字可能是 TDP，即热设计功耗。

但实际上，了解机架 TDP 是什么很重要，因为这将是数据中心为您提供的限制。您不能超过此机架 TDP 级别。

您知道，您不能，我们提供的 PDU 是 X。

因此，这就是为什么对于机架级物料清单来说，写出进入该机架的所有 IT 设备的热设计功率并对其进行总结并确保它不会超出您的限制非常重要。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxv2f0PNNF45UYCSfFoO8KDsJ03h51ueT0rCvwBeOHCaK5nqShPaWKzg/640?wx_fmt=png)

因此，让我们回归基础知识。

你如何计算功率？这是如何运作的？您可能还记得瓦特等于伏特乘以安培。对于单相系统来说也是如此。这绝对是真的。

然而，对于三相系统则不然。

因此，对于三相系统，实际上有三个不同的线路。事实上，如果你观察这两条线之间的电压，对于三相系统，它实际上会减少三的平方根，因为它们的相位是偏移的。

因此，您将获得如下所示的交流相位。您需要将该电压降低三的平方根。你可以算一下。

您可以使用移相器执行一些三角操作来计算三的平方根。但现在请相信我。所发生的情况是三倍的平方根，因为有三条不同的线和三的平方根，它们有点抵消。

你通常会看到这样写，因为三除以三的平方根就是三的平方根，您将看到它写为电压三倍乘以安培数乘以实际降额系数的平方根。因此 0.8，即 20% 的开销，这是 NEC 建议您进行的监管降级。

让我们看看这在现实生活中是如何运作的。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxv0QNPCzicdItHcQaHm3ZPsBbiciao3cZcI7521WnibHMLtQauWw0oQFLUA/640?wx_fmt=png)

PDU厂家如何计算电源容量？

好吧，他们要做的是获取最大输入电流，在本例中为 60。

他们将进行我之前提到的监管降级。所以他们打算把这个数字减少到 48。然后他们将其乘以三相系统的输入电压。所以是208。然后将其乘以三的平方根，如前面在三相系统中提到的。这就是结果。

所以您将获得 17.3 kVA。

您可以看到，这与数据表上提供的负载能力相同。所以你可以看到，你需要进行监管降额。

第二，你确实需要将这些数字乘以三的平方根。但是一旦你掌握了这些，你就会对构建这些系统和理解感到更加自在，真正了解您的 PDU 能为您提供多少电量。

假设您在这三个阶段之间获得了很好的平衡负载。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx6ib1gIXJfS0qHJ2KywdMickW4ATOLSLLGMBjAregyicDh6LIMEicnUcmgQ/640?wx_fmt=png)

这些是一些常见的 PDU 输入插头，您可能会看到它们挂在 PDU 末端。

对于208系统，你总会看到这个IEC 6309（如果您使用的是 60 安培系统）。如果高于，我相信，400 伏是它切换为红色的规格，那么它将是红色。

对于 400 以上的任何内容，您将开始看到红色的 IEC 6309。对于 30 安培电路，您通常会看到 NEMA L1530P。

您可能还会看到其他一些情况，但这是一种非常常见的情况。

这是一个扭锁。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxX4gibDWTUHUArFBSlL8dXIgHQZsW9rY2WgKFrGqP6rvlVDiaN8g98Rlg/640?wx_fmt=png)

顺便说一句，询问您的数据中心非常重要，嘿，为确保您的 PDU 能够插入而提供给我的输入插座是什么？然后您需要弄清楚我有哪些需要插入 PDU 的插座？我可以使用哪些 PDU 插座？将这些服务器连接到 PDU 所需的电缆长度是多少？

您可以在这里看到这种成对的 IEC C13 插头插入 IEC C14 插座。您通常会在服务器上看到它。

然后，您通常会使用一条 IEC C13 至 C14 电缆，将其插入 PDU 插座，然后插入服务器。您将看到这四对最常见的对。

当您进入 IT 设备时，例如具有 16 个端口的超平面服务器，其中的 GPU，或者 DGX2，或者我们之前讨论过的一些控制器开关。

您将看到从 C13 C14 到 C19 C20 的变化，它们支持比 C13 C14 更高的安培数水平。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxicPHqfrTVpFWpx88AAMheMHB5cSsd033QEX1okfx4tHW4jfDhn1Xpuw/640?wx_fmt=png)

现在您可以真正了解该物料清单需要做多少工作。

它了解网络、电缆长度、功率、整个集群设计。机架级物料清单需要做很多工作。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxGJzGpE4tRE65pauyVNgIAlqnqvYdYhPw5L1dpfaYSusAGROp8YdA3Q/640?wx_fmt=png)
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxd1K2TlLpLxL2sWNcOh6Q2twWkNiaqpqibzricYoHp6N0UnXgXXIlRZxoA/640?wx_fmt=png)

所以我们现在要讨论几个不同的机架高度，并谈谈您可能希望如何设计机架高度，以便它们可扩展。

这里所说的可扩展性是指您可以构建一个机架，然后扩展到更多机架，而无需移动太多东西。

因此，在本例中，这是 40 GPU 机架标高。它可以在 25 分钟内在 MS Coco 上训练 mask R-CNN。它有 40 个 GPU。

您可以看到有四个网络，我们之前讨论过的四个网络：计算网络、存储网络、IPMI 网络和入站管理网络。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxpqHicNmGLrsficFO0VvYy8icSHnjeIfN6D2PrU3lCBQeTpXGZxTr6h1Fw/640?wx_fmt=png)

当我们将其扩展到更多机架时，您会发现设计并没有太大变化。

布局相同，机架高度相同。这样，您就可以从看起来像 40 GPU 机架的东西开始，并将其扩展为这个 160 GPU 机架，而无需移动原始机架中的太多组件。

这就是我们所说的可扩展的机架高度。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxDAZ5ibDpXoEgQxhcshXrOLY0KSCiavdEBE2JG6xqJg1jwUojvVTdSOrA/640?wx_fmt=png)

四个机架的机架标高就成为我们在 800 GPU 21 机架集群中使用的可复制和粘贴的规模单位。

因此，该集群中基本上总共有这四个机架行中的五个。然后是这个新的核心网络机架，用于这个更大的网络的所有主干交换机都在其中。

这个由 800 个 GPU 组成的特殊集群可以在一分钟多一点的时间内在 ImageNet 上训练 ResNet-50，这显然是一项出色的壮举。

您可以想象，如果您的机器学习团队能够访问该级别的计算，他们的工作效率将会如何。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxX0ialwWIgng9HFiaejPtY5msuMNogdpWU6kiakfjicm2nhCUJunYyRlcRA/640?wx_fmt=png)

现在我们要进入节点设计。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxAGsVpj7F6kbtwvuLJ84jwDALibickX3cic1nZeh7rTC4VwRFIp6ic5veIQ/640?wx_fmt=png)

节点设计实际上是选择 GPU、选择 CPU、选择主板的艺术，并确保他们一起工作。

根据您的应用程序，您可能需要选择不同类型的 GPU。

例如，对于大规模分布式训练，A100s。在这种情况下，这里拍摄的是 PCIe 版本，但通常 SXM4 会更好。

您可能想使用 A100 进行大规模分布式训练。

然而，如果您正在进行超参数搜索，Quadro RTX 8000 之类的东西可能是更好的选择，因为您可以在这方面获得更好的失败率。

因此，选择合适的 GPU 实际上取决于您的用例。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxLkHia4Hbtu1ibTKFNtxSBic2WPwXnGMwjpvUU11mUob1L99TPSDJYyTFg/640?wx_fmt=png)

GPU 基准测试极其困难。有很多不同的参数。

存在这样的问题：如果一个 GPU 的内存比另一个 GPU 更多，我是否需要增加批量大小？我是否保持批量大小相同？这样的比较公平吗？

因此，对此有很多思考。

如果您想了解不同 GPU 的性能，我建议您查看两个地方。当您试图了解什么对您的团队最有效时，请查看 MLPerf 并查看其中正在训练的一些网络，看看哪些 GPU 最适合您的用例。

然后，在 Lambda，我们运行了非常广泛的 GPU 基准测试，并将这些结果发布在我们的博客上。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxYIb2ZkjJQ5sicV0icOOcZqpib5uqhMOy3NyYvWlZXF14LZ50OpQXQHakQ/640?wx_fmt=png)

因此，在设计节点和计算系统时，您需要在节点和计算系统内部查找以下一些内容。

您需要了解 PCIe 通道的数量、PCIe 拓扑以及 PCIe 的代次。

例如，第 4 代 PCIe，其中 16 个通道的数据传输率为每秒 32 GB，而 Gen 3 则只有 16 个。

因此，使用 Gen 4 时，32 GB 的数据传输速度是原来的两倍。当您处理每秒 200 吉比特的数据时，您就会知道这一点非常重要

InfiniBand，好吧，200 GB 除以 8 就是 25 GB。25 GB 大于 16 GB，这是第 3 代 16 通道上的最大可用带宽。因此，您无法将 Gen 3 与每秒 200 Gb 的 InfiniBand 卡一起使用。将会发生的情况是，该卡将开始在 PCIe 级别进行限制，并且您将无法达到可用的最大带宽。

因此，了解所有组件都需要通过 PCIe 总线并且需要确保它们都能协同工作非常重要。

最后，NUMA节点拓扑等方面存在一些细微差别。例如，在 AMD Epic 中，它是一个小芯片设计，并且有一些不同的NUMA节点、非统一内存访问节点，它们确实会影响 GPU 对等互连，

虚拟化，如果您计划进行虚拟化，那么了解其后果非常重要。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxVvKFTnibuwPuaNInic0pE6PB5rTRSv25Ncee8dLRosicTiaN6gpa1MthdQ/640?wx_fmt=png)

因此，我们将快速介绍 GPU 对等互连和 PCIe 拓扑。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxticos5K3uxwMMOnmKoX5KWibdGEScq8G1Sk74utNsWJt3bZiak4KpsbPg/640?wx_fmt=png)

这是 PCIe 拓扑示例。

您只需拉出系统框图即可查看 PCIe 拓扑，我们很快就会介绍一些现实世界的系统框图。

但这基本上会向您展示您的 PCIe 拓扑是什么，这基本上就是您的整个节点的地图，根据您可以或不可以放入该系统的内容。这里的PLX是一个PCIe交换机。

NVLink 显然正在连接 GPU1 和 GPU3，这是一个示例拓扑。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxpkZcIrNN59rDZwz4HztezvicORAESwVkuibYkVQ1G0eibeuyf0uIqK7eQ/640?wx_fmt=png)

当您检查不同的拓扑时，您会发现将开始出现一些不同的权衡。

很大程度上来说，您将需要权衡 CPU 与 GPU 带宽，南北向带宽、GPU 到 GPU 带宽、东西向带宽。

所以在这个例子中，它是双路由PCIe拓扑。总共有 16 × 4，即 64 个 PCIe 通道将 CPU 连接到 GPU。这就是您将看到的最大南北带宽。

但是，如果 CPU、GPU0 尝试与 GPU7 进行通信，则需要通过 CPU 到 CPU 互连，这可能会很慢且成为瓶颈，尤其是当您有一堆数据像这样同时从一侧传输到另一侧时。这可能是训练的一个问题。

现在，像 NVLink 这样的东西已经修复了，但并不是每个服务器都有 NVLink。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxA4d70n6Xaib9UubeiaQeJ5MlaUtHLRknAnQh1MQKxC21fj0AlPUOEzrg/640?wx_fmt=png)

这就是您将开始看到单路由 PCIe 拓扑的地方，因为在这种情况下，如果GPU0想要与GPU7通信，只需要通过CPU0的PCIe控制器，而不是通过CPU0到CPU1互连。

这就是单路由 PCIe 拓扑的优势。它将增加您的 GPU 到 GPU 的带宽。

然而，正如您在此处看到的，现在从 CPU 到 GPU 的 PCIe 通道只有 32 条。因此从 CPU 到 GPU 的数据传输会受到一些限制。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxiaVyRvyrQuLWdsUjCbLEM7AGNyCQWUIoVy4oPic7wDLE674ubjfsQOlQ/640?wx_fmt=png)

更极端的是所谓的级联 PCIe 拓扑。

现在这就是 GPU0 可以与 GPU7 通信的地方，而不是通过CPU的PCIe控制器，它实际上只是经过PLX交换机。

PLX 交换机本身实际上是比 CPU 中可用的带宽更高、延迟更低的 PCIe 传输 PCI 交换机。

这是一个极端的例子，但是因为你可以看到现在我们的 CPU 到 GPU 的带宽只有 16 个通道。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx10DteGSibiawl2j5h1yV0U2ogqJfWoKswwbnkQNZ4icXB6B9dEdwf9PWw/640?wx_fmt=png)

然而，值得庆幸的是，NVIDIA 已经提出了 NVLink，它允许 GPU 在板上拥有自己的小型网络结构。

现在，此示例是来自 Lambda Hyperplane 8 的 NVLink 混合立方体网格拓扑。这也与原始 DGX1 类似。

您可以看到有这个 NVLink 网格。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx6icShauJKzHfFFndojY7JkLzVbcxokgUrXjfc3GCkk2KUd5OrXyiaVhQ/640?wx_fmt=png)

这里发生的情况是，GPU 可以通过 NVLink 网格相互通信，然后通过 PCIe 交换机将数据发送到 InfiniBand NIC。

它们都连接在下面。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxFYfvIrX5KmNMZ5kEwtswr2DaTkCYqNDPmFYEeNOXRdGexWvgKibib5lw/640?wx_fmt=png)

因此，您在这里看到的是，随着 DGX2 和 Lambda Hyperplane 8 A100 系列的出现，您已经拥有了这款 NV 交换机。

NV 交换机实际上是一种网络结构，在某种意义上看起来与我们之前讨论的一些网络结构非常相似。

也就是说，您拥有的不是实际的单独硬连线 NVLink 通道，而是所有部件都连接到的 NV 交换机。

借助新的 Lambda Hyperplane 8 A100 或 DGX A100 服务器，您将为每个 GPU 配备一个 InfiniBand NIC。

因此，这些系统实际上有八个传出 InfiniBand 连接，可实现极端的节点到节点带宽。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxCFRTj9tJ1ohsdleZlWtzGfu04mF5iciam5ar2euDx5KQku7eLd1X7CFQ/640?wx_fmt=png)

值得注意的是，如果没有像基于 InfiniBand 的 GPU 直接 RDMA 这样的技术，您需要将数据从 GPU 复制到 CPU 内存，然后 CPU 从内存复制到 InfiniBand NIC。

借助 GPU 直接 RDMA，您可以直接通过 PCI 交换机进行通信。这可以显著提高节点到节点的带宽。

我亲自进行了测量，通过在 InfiniBand 上启用 GPU 直接 RDMA，您可以看到高达 2 倍的改进。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxP0yOgKmrpyFfOM90duQtNFUDVBf1vuGYLqkwvfiaU3utcWjDbuX3XoA/640?wx_fmt=png)
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxaXF4fPibMH18V5BvtMXdYwrKkRpzmUKEAUEPSlUukAiaYwyaMWgAoscg/640?wx_fmt=png)

让我们快速了解一些现实生活中 PCIe 拓扑的示例。

这是一个 Lambda Scale，您可以看到它有这两个 AMD EPEX。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxYibkWAe1vU4CNlc2kSjtMKqAsaibwEFSHykcENmq8DlJX4IUXpLJic3jg/640?wx_fmt=png)

这是 Lambda 超平面 8。它有这两个 AMD EPEX，然后是相同类型的 NVSwitched 拓扑和一堆 PCI 交换机，作为双根拓扑。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxDWicvsZmGV4w8rwibNVdkVFozNvEZ5rJ78gEV3Ju4AnD7P20icibTic4LTw/640?wx_fmt=png)
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxzwoo2LgYEgfEE7sbKMxv9N6EI5bqOyay7y4WuvAVNXgkUwj2u9Eq5A/640?wx_fmt=png)

这也是双根拓扑，因为您可以看到有两个 CPU，每个 CPU 下面都有自己的树。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKxARz6HNtIdV0hVuCQcUsgq4jiazGVjPbVOTyySvZNVXvONGHThViblcIA/640?wx_fmt=png)

最终，当您将所有这些放在一起时，您将必须编写集群、机架、节点、账单和材料，对 BOM 进行定价，协商托管合同，订购 BOM 的所有部件，组装服务器。

你必须运送机架。您必须进行机架、堆叠、标签和布线、安装软件、打开软件，然后在集群的整个生命周期内对其进行维护。这需要大量的工作。通常需要整个团队才能成功执行这样的集群项目。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYialWiaIQBhFImhMwo4P2ZKx5Zk1JuAicagGHAtEqXvqnia5OngNGGOk849BGf82oa2MiaUth0nTuYtyQ/640?wx_fmt=png)

然而，我希望这是这样，然后你就完成了。

我希望这对您来说是一次真正内容丰富的演讲。我希望您已经学会了如何构建机器学习集群。

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
