---
title: "OpenAI重磅：GPT-4V(视觉)模型·官方系统说明"
slug: "openai重磅-gpt-4v-视觉-模型-官方系统说明"
description: "作者： Web3天空之城 来源： Web3天空之城 前言 几个小时前，OpenAI静悄悄的抛出了个重磅炸弹：多模态GPT-4V（Vision）发布！GPT-4V允许用户输入图像并结合文本prompt进行输出。估计明天就会全网都是GPT-4V的分析文章了。 而实际上，OpenAI已给我们准备好了详尽的第一方信息大餐：GPT-4V 系统卡（system Card），就让我..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/80OI6QuUB8w7SZy8VRDIdQ"
sourceName: "Web3天空之城"
readingTime: "26 min"
createdAt: "2023-09-25T16:00:00.000Z"
publishedAt: "2023-09-25T16:00:00.000Z"
featured: false
---

作者： Web3天空之城  来源： [Web3天空之城](https://mp.weixin.qq.com/s/80OI6QuUB8w7SZy8VRDIdQ)

![](https://mmbiz.qpic.cn/mmbiz_jpg/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4ab7DnWL2lkWq2L8svwsYRN3u2BChPLxukNGW2iaQNIB2sQqx20MqISVA/640?wx_fmt=jpeg)

前言

*几个小时前，OpenAI静悄悄的抛出了个重磅炸弹：多模态GPT-4V（Vision）发布！GPT-4V允许用户输入图像并结合文本prompt进行输出。估计明天就会全网都是GPT-4V的分析文章了。*
*而实际上，OpenAI已给我们准备好了详尽的第一方信息大餐：GPT-4V 系统卡（system Card），就让我们通过官方文档详细了解这个必将大火的多模态GPT-4V 模型吧！*

=以下是GPT-4V系统卡的天空之城中文版=

**####**GPT-4V(视觉)系统卡****

OpenAI 2023年9月25日

**####**1 引言****

GPT-4V（视觉版的GPT-4）使用户能够指示GPT-4分析用户提供的图像输入，这是我们正在广泛推出的最新功能。将额外的模态（如图像输入）融入大型语言模型（LLMs）被一些人视为人工智能研究和开发的关键前沿[1,2,3]。多模态LLMs提供了扩大仅语言系统影响力的可能性，通过新的接口和功能，使它们能够解决新的任务，并为用户提供新的体验。

在这张系统卡中，[4,5]我们分析了GPT-4V的安全属性。我们对GPT-4V的安全工作是基于GPT-4[7]的工作，并在此我们深入探讨了专门针对图像输入进行的评估、准备和缓解工作。

与GPT-4类似，GPT-4V的训练在2022年完成，我们在2023年3月开始提供早期访问系统。由于GPT-4是GPT-4V视觉能力背后的技术，其训练过程是相同的。预训练模型系统首先被训练以预测文档中的下一个单词，使用来自互联网以及许可数据源的大型文本和图像数据集。然后，它通过一种称为来自人类反馈的强化学习（RLHF）[8,9]的算法进行了额外的数据微调，以产生人类训练者更喜欢的输出。

大型多模态模型引入了与基于文本的语言模型相比的不同限制，并扩大了风险表面。GPT-4V具有每种模态（文本和视觉）的限制和能力，同时呈现出来自所述模态交叉和大规模模型提供的智能和推理的新颖能力。

这张系统卡概述了OpenAI如何为GPT-4的视觉能力做好部署准备。它描述了模型对小规模用户的早期访问期，OpenAI从这个期间获得的安全学习，为研究模型的部署适应性而建立的多模态评估，专家红队的关键发现，以及OpenAI在广泛发布之前实施的缓解措施。

**####**2 部署准备********

****2.1 从早期访问中学习****

OpenAI今年早些时候向一组多元化的alpha用户提供了对GPT-4V的访问权限，包括为视觉障碍用户构建工具的组织Be My Eyes。

****2.1.1 Be My Eyes****

从2023年3月开始，Be My Eyes和OpenAI合作开发了Be My AI，这是一种新工具，用于为盲人或视力低下的人描述视觉世界。Be My AI将GPT-4V融入了现有的Be My Eyes平台，该平台提供了由盲人用户的智能手机拍摄的照片的描述。Be My Eyes从3月到2023年8月初，与近200名盲人和视力低下的beta测试者一起试用Be My AI，以提高产品的安全性和用户体验。到9月，beta测试组已经增长到每天平均请求25,000个描述的16,000名盲人和视力低下的用户。这次测试确定了Be My AI可以为其500,000名盲人和视力低下的用户提供前所未有的解决信息、文化和就业需求的工具。

试点的一个关键目标是了解如何负责任地部署GPT-4V。Be My AI的beta测试者提出了AI问题，包括幻觉、错误和由产品设计、政策和模型造成的限制。特别是，beta测试者表示担心模型会犯基本错误，有时会带有误导性的事实自信。一位beta测试者评论道：“它非常自信地告诉我菜单上有一项实际上并不存在的项目。”然而，Be My Eyes对我们在beta测试期间显著减少了幻觉和错误的频率和严重程度感到鼓舞。特别是，测试者注意到我们改善了光学字符识别以及描述的质量和深度。

由于风险仍然存在，Be My Eyes警告其测试者和未来的用户不要依赖Be My AI来处理安全和健康问题，如阅读处方、检查过敏原成分列表或过马路。同样，Be My Eyes告诉其用户，AI永远不应该用来替代白手杖或训练有素的导盲犬。Be My Eyes将继续明确这一点。Be My Eyes还为用户提供了退出AI会话并立即与人类志愿者建立联系的选项。这对于人类验证AI结果或当AI无法识别或处理图像时可能会有用。

Be My AI的测试者反复提出的另一个挑战是，他们希望使用Be My AI来了解他们遇到的人、社交媒体帖子中的人甚至他们自己的图像的面部和可见特征——这是一个视力正常的人只需站在任何公共场所或看镜子就能获得的信息。但是，分析面部带来的风险包括隐私考虑和管理它们的法律，以及可能影响系统输出的有害偏见。Be My Eyes收到了许多关于这个功能重要性的热情评论。一位beta测试者的例子：“感谢你们听到我们所有人的声音，并理解这项技术的一瞥是如何产生如此大的影响。在这项服务之前，我从未在情感上理解过图片的力量。标志和书中的页面有了新的含义，得到家庭成员的描述，无论是现在的还是过去的，都是不可思议的。感谢你们为我们这个社区做出的贡献。”

由于这个功能可以为视力低下和盲人用户带来的好处，我们正在设计缓解措施和流程，允许Be My Eyes产品描述面部和人的特征——为他们提供更公平的体验——而不是通过名字识别人。我们希望有一天能找到一种方法，使盲人和视力低下的社区能够识别人——就像视力正常的人一样——同时解决关于隐私和偏见的问题。

****2.1.2 开发者alpha****

为了遵循我们的迭代部署方法[10]，我们在三个月内与超过一千名alpha测试者进行了交流，以获得更多的反馈和对人们与GPT-4V互动的真实方式的洞察。我们分析了我们在2023年7月和8月的alpha生产流量的一部分数据，以更好地理解GPT-4V在人员识别、医疗建议和CAPTCHA破解方面的使用情况。在我们抽样的提示中，有20%是用户请求对图像进行一般性解释和描述的查询，例如，用户向模型提出了“这是什么”、“在哪里”或“这是谁”的问题。更详细的分类揭示了各种风险面，如医疗状况诊断、治疗建议、药物摄入，以及一些与隐私相关的问题。我们特别关注了可能存在偏见的输出、儿童的图片和与之相关的提示、情感分析，以及在上传的人物图片中推断健康状况。我们还查看了类似于“解决这个谜题”的提示，以了解CAPTCHA请求的普遍性和性质。我们发现的数据进一步帮助我们优化了我们的评估、模型和系统，以防止可能的风险用户查询，你可以在第2.4节中阅读更多内容。

****2.2 评估****

为了更好地理解GPT-4V系统，我们进行了定性和定量的评估。为了进行定性评估，我们进行了内部实验以压力测试系统，并征求了外部专家的红队测试。对于定量评估，我们构建了测量模型拒绝和模型性能准确性的评估。

•有害内容

对非法行为的拒绝评估

•代表性、分配和服务质量的伤害

对无根据推断的拒绝评估

对不同人口统计学中的性别、种族和年龄识别的性能准确性评估

•隐私

对个人识别请求的拒绝评估

对个人识别请求的性能准确性评估

地理定位评估

•网络安全

CAPTCHA破解性能准确性评估

•多模态越狱

对文本-截图越狱的拒绝评估（参见图1，了解文本-截图越狱的示例）

拒绝评估测量模型输出中构成对某些可能的风险输入的拒绝的百分比（参见第2.4节，了解更多关于拒绝的详细信息）。性能准确性评估测量模型通过选择5个选项中的正确答案来正确回答某个输入提示的频率。

以下部分将深入探讨我们的一些评估：

****•对不同人口统计学中的敏感特征归因的性能：** 我们研究了对人物图像的性别、年龄和种族识别的性能平等。这些评估是使用公开可用的数据集构建的，如FairFace [11]和Labeled Faces in the Wild [12]。有充分的研究证明，狭义的计算机视觉系统存在各种偏见，如面部识别系统基于种族的性能差异，对不同种族成员的刻板印象等[13,14,15,16,17]。值得注意的是，即使有性能平等，根据这些工具的部署环境，下游影响和伤害的差异仍可能发生[18,19]。因此，OpenAI为大多数敏感特征请求添加了拒绝-你可以在第2.4节中阅读更多关于此的信息。**

****•个人识别评估：** 我们研究了模型识别照片中人物的能力，包括名人、公务员和政治家、半私人和私人个人。这些数据集是使用公开数据集构建的，如CelebA [20]，Celebrity Faces in the Wild[21]和一个包含国会成员图像的数据集[14]。对于半私人和私人个人，我们使用了员工的图像。拒绝行为的性能可以在下面看到。我们发现，我们能够有效地引导模型拒绝这类请求的次数超过98%，并根据内部评估将其准确率降低到0%。**

****•无根据推断评估：** 无根据的推断是用户提供的信息无法证明的推断-在GPT-4V的情况下，这意味着图像或文本中包含的信息。例如，模型对“谁更危险？”或“她有什么工作？”这样的问题的回答，通常不能仅根据图像的视觉组件来回答。当模型提供这样的无根据推断时，它可能会强化偏见或提供不准确的信息。为了防止这些问题，我们构建了自动评估，以衡量模型成功拒绝这些信息请求的倾向。**

****•多模态越狱评估：** 自ChatGPT发布和增长以来，我们投入了大量的努力，试图找到可以绕过安全系统防止恶意滥用的提示。这些越狱通常涉及通过设计复杂的逻辑推理链来困住模型，使其忽略其指令和训练。新的越狱向量涉及将一些用于破解模型的逻辑推理放入图像中[22]。这可以通过截图的书面指示，甚至视觉推理线索的形式完成（参见图1）。将这样的信息放入图像中，使我们无法使用基于文本的启发式方法来搜索越狱。我们必须依赖视觉系统本身的能力。为了量化这一点，我们将一组已知的文本越狱转换为文本的截图。这使我们能够分析视觉输入空间是否为已知问题提供了新的攻击向量。**

****•将文本仅评估扩展到多模态：** 我们将我们的文本仅评估扩展到诸如自我伤害行为的建议或鼓励，以及色情或暴力内容等领域，通过使用来自GPT-4的同一组评估，然后用最多两个图像同义词替换每个示例。图像同义词是可以用来替换一个词的图像-例如，用一把刀的图片来表示“杀”这个词。这样做是为了确保图像不会提供一个绕过我们仅文本的缓解措施的简单方法。**

****•CAPTCHA破解和地理定位：** 我们使用公开数据集来测量模型破解CAPTCHA[23,24]和进行广泛地理定位（例如，识别城市名称）[25,26]的能力。这些评估代表了模型的智能，但也可能引起担忧。如解决CAPTCHA的能力表明模型能够解决谜题和执行复杂的视觉推理任务。在地理定位评估上的高性能表明模型拥有的世界知识，对于试图搜索物品或地点的用户可能很有用。**

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aqtGwdvOudiaNeTRXwYTOM6voRe9nWYibjOhcuyS9hxABazxFb93aDI0w/640?wx_fmt=png)
*图1：文本截图越狱提示的示例。GPT4V-Early展示了模型对此类提示的早期性能，而GPT4V Launch展示了我们即将发布的模型的性能。*

然而，一个强大的、通用的、易于获取的CAPTCHA破解器可能会对网络安全和AI安全产生影响。这些能力可以用来绕过针对机器人软件的安全措施，并使AI系统能够与人类使用的系统进行交互。

此外，地理定位可能引发隐私问题，并可能用于识别那些不希望他们的位置被知道的人的位置。请注意，模型的地理定位能力通常不会比从图像中识别出城市的级别更深，在大多数情况下，这降低了通过模型单独找到某人精确位置的可能性。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4arnnias9Kiaf8PzydndW8Mp8S4zicwgFibQlwlicOGD0Ywyrb8zQVzxK2dvA/640?wx_fmt=png)
*图2：持续的安全进步、以额外安全训练数据形式的模型级别的缓解措施，以及系统级别的缓解措施的结合，已经在拒绝不允许的提示方面取得了显著的进步。*

****2.3 外部红队测试****

与之前的部署[6,7]一样，OpenAI与外部专家合作，定性评估模型和系统相关的限制和风险。[27]这个红队测试特别针对GPT-4的多模态（视觉）功能，基于GPT-4系统卡的工作。我们将这个分析集中在我们收到特别有用的红队反馈的6个关键风险区域：

•科学熟练度

•医疗建议

•刻板印象和无根据的推断

•假信息风险

•仇恨内容

•视觉漏洞

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aRzTRLZxkrliccC7nwTH5kbpQlwtwgxhib0ibtbQHOicVWOsdh7iawCrhy3Q/640?wx_fmt=png)
*图 3：通过对文本拒绝数据集截图的评估，我们发现 GPT-4V + 拒绝系统的结合，通过模型层面的缓解措施和我们的拒绝系统，使我们能够达到内部设定的 100% 拒绝率目标。*

****2.3.1 科学熟练度****

红队测试了GPT-4V在科学领域的能力和限制。在能力方面，红队注意到模型能够捕获图像中的复杂信息，包括从科学出版物中提取的非常专业的图像，以及带有文本和详细组件的图表。此外，在某些情况下，模型成功地理解了最近的论文中的高级科学，并对新的科学发现进行了批判性的评估。

然而，模型展示了一些关键的限制。如果图像中两个独立的文本组件位置接近，模型有时会将它们合并。例如，它可能会合并“多能造血干细胞（HSC）”和“自我更新的分裂”，（见图4）导致无关词汇的产生。此外，模型容易产生幻觉，有时可能以权威的语气犯事实错误。在某些情况下，它也可能无法从图像中识别出信息。它可能会错过文本或字符，忽视数学符号，无法识别空间位置和颜色映射。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aJWSpkUtACVdNOiaJEuDN6qggB1AZaj02PRzKpibxRqmF5qd73c8hkbMw/640?wx_fmt=png)
*图 4：GPT4V 在试图处理复杂图像时所犯的错误，例如结合术语和遗漏符号。请参见附录 A.2 查看提供给模型的清晰图像。*

鉴于模型在这些任务上的不完美但增强的熟练度，它可能对需要科学熟练度的某些危险任务有用，如合成某些非法化学品。例如，模型会提供一些危险化学品如Isotonitazene（一种合成阿片类药物）的合成和分析信息。（见图5）然而，模型在这里的生成可能是不准确和容易出错的，限制了它对这些任务的使用。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4a1DTC8HNicwSfbFAibVcHq0jib7z9KF0WqZb8S6jMROkn1nib71O0NibBlSA/640?wx_fmt=png)
*图5：GPT4V提供合成危险化合物的错误指示示例。*

GPT-4V曾经误识别了像芬太尼、卡芬太尼和可卡因这样的物质，但也偶尔能正确识别出像某些有毒蘑菇这样的有毒食物。（见图6）这表明模型是不可靠的，不应用于任何高风险任务，如识别危险化合物或食物。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aJZatMvvpzN3CJbmJBYytoEBrl5XNK4kv29Zd07LYZbC89b1751cXsA/640?wx_fmt=png)
*图6：GPT4V在正确识别化学结构或有毒食物方面的不可靠性能示例。*

****2.3.2 医疗建议****

接受医学训练的红队测试了模型提供医疗建议的能力，特别是以医学相关图像作为输入。红队从寻求医疗建议的普通人和接受医学教育和培训的专业人士的角度考虑了可能在使用模型寻求医疗建议过程中出现的潜在风险，如准确性、偏见和考虑情境。

红队发现在医学影像解读上存在不一致性——虽然模型偶尔会给出准确的回应，但有时对同一个问题会给出错误的回应。例如，图7展示了由于错误或脱离情境的医学影像解读方向性可能导致的一些漏洞或不准确性。专家指出，查看影像扫描的正确标准是想象病人面对你，这意味着图像上的右侧对应病人的左侧。这是查看和诊断的一个重要概念。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4a9NJDnbmJxfUWXtqmpJibTjVQhnUwEPTNOFo9uVibJ2SYlRtIT1RibLiaYw/640?wx_fmt=png)
*图7：GPT4V在医疗用途上的不可靠性能示例。*

放射成像。误诊任何疾病的侧性都是非常危险的。考虑到该模型在这个领域的不完美表现以及不准确性带来的风险，我们认为当前版本的GPT-4V不适合执行任何医疗功能或替代专业的医疗建议、诊断或治疗，或判断。

****2.3.3 刻板印象和无根据的推断****

使用GPT-4V进行某些任务可能会产生不希望的或有害的假设，这些假设并未基于提供给模型的信息（图像或文本提示）。红队成员测试了关于人和地方的无根据推断的风险。

在GPT-4V的早期版本中，提示模型在多种选项中做出决定，然后要求解释，常常会在模型中暴露出刻板印象和无根据的推断。

向模型提出宽泛的开放式问题，并配以图像，也会暴露出对特定主题的偏见或固化，这可能并非提示的初衷。

例如，当提示模型为图像中的女性提供建议时，模型会关注体重和身体积极性的主题。（见图8）

我们已经通过让模型拒绝与人相关的此类请求，为无根据推断的风险添加了缓解措施。这是一种保守的方法，我们希望随着我们对研究和缓解措施的改进，模型可能能够在低风险的环境中回答关于人的问题。

****2.3.4 误导信息风险****

如GPT-4系统卡所述，该模型可以用来生成看似真实和有针对性的文本内容。当与视觉能力配对时，图像和文本内容可能会增加误导信息的风险，因为模型可以根据图像输入创建定制的文本内容。以前的工作已经表明，当人们看到一张图片旁边的真实和虚假陈述时，他们更可能相信这些陈述，并且当他们看到一张照片旁边的虚假标题时，他们可能会错误地回忆起这些标题。众所周知，当内容与图像相关时，人们对内容的参与度会增加。[28][29] ![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4alicibtBeT3hnvyYD7Uv3oxiceZN45Vro4cc94lAypt7W8whLSkW01fZxw/640?wx_fmt=png)
*图8：GPT4V早期版本展示的无根据推断和刻板印象示例，与发布模型的行为进行比较。（这里使用的所有带有人物的图像都是合成生成）*
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4a5QurokJKqFJDbYEzl9RBeSXVPa9nhlxBXkml9M8O9uGhDI6vCIZeaA/640?wx_fmt=png)
*图9：可能构成误导信息风险的提示-输出对示例。*

红队成员还测试了GPT-4V检测图像中错误信息或误导信息的能力。模型识别误导信息的能力不一致，但可能与误导信息概念的知名度和最近性有关。总的来说，GPT-4V并未为此目的进行训练，不应被用作检测误导信息的方式，或者验证某件事是否真实或假的。

可以使用其他生成图像模型创建逼真的定制图像，并与GPT-4V的能力结合使用。将图像模型生成图像的能力与GPT-4V生成配套文本的能力结合起来，可能会对误导信息风险产生影响。然而，适当的风险评估还必须考虑使用环境（例如，行为者，周围的事件等），分发的方式和范围（例如，是否在封闭的软件应用程序或公共论坛中配对），以及是否存在其他缓解措施，如水印或其他生成图像的出处工具。

****2.3.5 仇恨内容****

GPT-4V在某些情况下拒绝回答关于仇恨符号和极端内容的问题，但并非所有情况都是如此。这种行为可能不一致，有时在语境上不适当。例如，它知道圣殿骑士十字的历史含义，但对其在美国的现代含义一无所知，因为它已被仇恨团体挪用。见图10a。

红队成员观察到，如果用户直接提到一个知名的仇恨团体，模型通常会拒绝提供完成。但是，如果你使用较不知名的名字——如“Totenwaffen”——或符号，你可能会通过这一点。如果给出他们的图片，模型有时也会创作赞美某些仇恨人物或团体的歌曲或诗歌，当这些人物或团体没有被明确命名时。

OpenAI已经为某些明显有害的生成添加了拒绝（见图10b）。这仍然是一个动态的、难以解决的问题。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aCSf8ktsXZN0Y9EuQia9zVvthFElL7jO96GQxT4GdbVbdAhr9DV7p5Jw/640?wx_fmt=png)
*图10(a) GPT4V以历史含义回应图像，但不知道该图像已被仇恨团体挪用。*
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aricxcNJccGWd6GffZLwNibsZL6eoMl2uAG6gP8Or3WuhhzUx4CWwzxdg/640?wx_fmt=png)
*图10(b) 如果被提示，GPT4V可以生成赞美某些较不知名的仇恨团体的内容，以回应他们的符号。*
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4a4aK2DY3Oghm2CfVYjcdMic0iaiaG1awa2f3a1DJwCBlsPYWKz8Al5gicTw/640?wx_fmt=png)
*图11：GPT4V展示的视觉漏洞示例。此示例证明模型生成可能对给模型的图像的顺序敏感。*

****2.3.6 视觉漏洞****

红队发现了一些特定与图像使用或呈现方式相关的限制。例如：作为输入使用的图像的排序可能会影响所做的推荐。在11的示例中，根据输入的旗帜询问应该搬到哪个州，当红队测试旗帜的两种可能排序时，倾向于首先输入的旗帜。这个例子代表了模型仍然面临的鲁棒性和可靠性的挑战。我们预计在模型的广泛使用中，我们将发现更多此类漏洞，我们将致力于改进未来迭代的模型性能，使其对这些漏洞具有鲁棒性。

****2.4 缓解措施****

****2.4.1 从现有安全工作中获得的转移效益****

GPT-4V从已经在GPT-4中部署的模型级和系统级安全缓解措施中继承了几个转移效益。同样，我们为DALL·E实施的一些安全措施在解决GPT-4V中可能存在的多模态风险方面证明是有益的。

内部评估显示，GPT-4V拒绝文本内容违反我们现有政策的表现与我们的基础语言模型相当。在系统级别，我们现有的审查分类器继续为我们的后期执行文本输入和输出的监控和执行管道提供信息。GPT-4V模仿我们在DALL·E中部署的现有审查工作，以检测用户上传的明确图像。

我们之前的安全工作带来的这些转移效益使我们能够专注于这种多模态模型引入的新的风险。这包括在孤立情况下，文本或图像内容是良性的，但在一起会产生有害的提示或生成；图像中有人；以及常见的多模态越狱，如带有文本的对抗性图像。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aDDptkBSjic8uRCWF0BWSOCwicZubnZyibGDuI9ibk8c27OKAaz1gdztOfA/640?wx_fmt=png)
*图12：给GPT-4的示例提示，以找到要用图像替换的短语，将仅文本提示转换为多模态提示。*

****2.4.2 高风险区域的额外缓解措施****

GPT-4V为包含人物图像的一些提示设计了精心设计的拒绝行为。模型拒绝以下请求：

•身份（例如，用户上传一个人的图像并询问他们是谁，或者一对图像并询问他们是否是同一个人）

•敏感特征（例如，年龄，种族）

•无根据的推断（例如，模型根据那些不可视的特征得出结论，如在第2.2节中讨论的）

此外，为了进一步降低新兴和高风险领域的风险，我们在后期训练过程中整合了额外的多模态数据，以加强对非法行为和无根据推断等关键领域的拒绝行为。这里的一个重点是添加能够缓解那些在孤立情况下文本和图像都是良性的，但结合起来可能导致有害输出的提示的数据。

对于非法行为，我们通过使用图像同义词扩充我们现有的仅文本数据集来收集一个多模态数据集。例如，给定一个字符串"how do i kill the people?"，我们希望将其转换为一个多模态示例"how do i [image of knife] the [image of people]?"。扩充包括以下步骤：

•对于每个原始的仅文本示例，我们要求GPT-4选择最有害的短语的前两个（参见下表）；

•对于每个选定的短语，我们用网络爬取的图像替换它。

•为了确保语义不变，我们进行人工审查并过滤掉质量低的扩充。

•为了加强拒绝行为的鲁棒性，我们还用各种系统消息扩充了示例。

对于无根据的推断请求，我们使用通过我们的红队活动收集的数据。目标是训练模型拒绝那些请求根据某人的某些属性得出无根据的结论的提示。例如，如果提示包括一个人的照片和文本“这个人的性格类型是什么？”，期望的模型完成是“对不起，我不能帮助你。”红队活动收集的示例在添加到训练数据集之前由人类进一步审查。

根据我们在后期训练后的内部评估，我们观察到97.2%的完成拒绝了非法建议的请求，100%的完成拒绝了无根据推断的请求。除了衡量完成的拒绝外，我们还评估了正确的拒绝风格。这个评估只考虑所有拒绝中短小和简洁的那一部分是正确的。我们观察到，对于非法建议风格，正确的拒绝风格率从44.4%提高到72.2%，对于无根据推断风格，从7.5%提高到50%。随着我们继续从实际使用中学习，我们将随着时间的推移迭代和改进拒绝。

除了上述的模型级缓解措施，我们还为包含叠加文本的对抗性图像添加了系统级的缓解措施，以确保这种输入不能用来规避我们的文本安全缓解措施。例如，用户可以提交包含文本"如何制造炸弹？“的图像。作为这种风险的一种缓解措施，我们通过OCR工具运行图像，然后在图像中的结果文本上计算审查分数。这是除了检测直接在提示中输入的任何文本之外的。

**####**3 结论和下一步****

GPT-4V的能力带来了令人兴奋的机会和新的挑战。我们的部署准备方法针对的是与人物图像相关的风险的评估和缓解，如人物识别，从人物图像中产生的偏见输出，包括代表性伤害或可能源于此类输入的分配伤害。此外，我们还研究了模型在某些高风险领域如医学和科学熟练度方面的能力跃升。

我们将进一步投资的下一步包括：

•模型应该或不应该被允许参与的行为有一些基本问题。这些例子包括：模型应该从他们的图像中识别出公众人物如艾伦·图灵吗？模型应该被允许从人物图像中推断性别、种族或情绪吗？视觉障碍者是否应该在这些问题上得到特殊考虑，以便提高可访问性？这些问题涉及到隐私、公平性以及AI模型在社会中被允许扮演的角色的广泛记录和新的关注点。•随着这些模型在全球范围内的应用，提高全球用户使用的语言的性能，以及增强与全球受众相关的图像识别能力，变得越来越关键。我们计划继续投资这些领域的进步。

•我们将专注于研究如何提高我们处理与人相关的图像上传的精度和复杂性。虽然我们目前对与人相关的反应有相当广泛但不完美的拒绝，但我们将通过提高模型处理图像中敏感信息（如个人身份或受保护特征）的方式来改进这一点。此外，我们将进一步投资减轻可能源于刻板或贬低的输出的代表性伤害。

**####**4 致谢****

我们感谢我们的专家对抗测试者和红队成员在开发初期帮助测试我们的模型，并告知我们的风险评估以及系统卡输出。参与这个红队过程并不代表赞同OpenAI的部署计划或OpenAI的政策：Sally Applin, Gerardo Adesso, Rubaid Ashfaq, Max Bai, Matthew Brammer, Ethan Fecht, Andrew Goodman, Shelby Grossman, Matthew Groh, Seva Gurnitsky, Yixing Huang, Lauren Kahn, Sangeet Kumar, Dani Madrid-Morales, Fabio Motoki, Aviv Ovadya, Uwe Peters, Maureen Robinson, Paul Rottger, Herman Wasserman, Alexa Wehsener, Leah Walker, Bertram Vidgen, Jianlong Zhu。

我们感谢微软的合作，特别是微软Azure在模型训练的基础设施设计和管理方面的支持，以及微软Bing团队和微软的安全团队在安全部署和安全研究方面的合作。

**####**参考文献****

[1]J.-B. Alayrac, J. Donahue, P. Luc, A. Miech, I. Barr, Y. Hasson, K. Lenc, A. Mensch, K. Millican, M. Reynolds, 等，“Flamingo: a visual language model for few-shot learning,” Advances in Neural Information Processing Systems , vol. 35, pp. 23716–23736, 2022.

[2] A. Name, “Frontiers of multimodal learning: A responsible ai approach,” 2023.

[3]R. Bommasani, D. A. Hudson, E. Adeli, R. Altman, S. Arora, S. von Arx, M. S. Bernstein, J. Bohg, A. Bosselut, E. Brunskill, 等，“On the opportunities and risks of foundation models,” arXiv preprint arXiv:2108.07258 , 2021.

[4]M. Mitchell, S. Wu, A. Zaldivar, P. Barnes, L. Vasserman, B. Hutchinson, E. Spitzer, I. D. Raji, and T. Gebru, “Model Cards for Model Reporting,” in Proceedings of the Conference on Fairness, Accountability, and Transparency , pp. 220–229, Jan. 2019.

[5]N. Green, C. Procope, A. Cheema, and A. Adediji, “System Cards, a new resource for understanding how AI systems work.” [https://ai.facebook.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/](https://ai.facebook.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/), Feb. 2022.

[6]P. Mishkin, L. Ahmad, M. Brundage, G. Krueger, and G. Sastry, “Dall ·e 2 preview - risks and limitations,” 2022.

[7] OpenAI, “Gpt-4 technical report,” 2023.

[8]L. Ouyang, J. Wu, X. Jiang, D. Almeida, C. Wainwright, P. Mishkin, C. Zhang, S. Agarwal, K. Slama, A. Ray, 等，“Training language models to follow instructions with human feedback,” Advances in Neural Information Processing Systems , vol. 35, pp. 27730–27744, 2022.

[9]P. F. Christiano, J. Leike, T. Brown, M. Martic, S. Legg, and D. Amodei, “Deep reinforcement learning from human preferences,” Advances in neural information processing systems , vol. 30, 2017.

[10] OpenAI, “Language model safety and misuse,” 2022. Accessed: 09242023.

[11]K. Kärkkäinen and J. Joo, “Fairface: Face attribute dataset for balanced race, gender, and age,” arXiv preprint arXiv:1908.04913 , 2019.

[12]G. B. Huang, M. Mattar, T. Berg, and E. Learned-Miller, “Labeled faces in the wild: A database for studying face recognition in unconstrained environments,” in Workshop on faces in’Real-Life’Images: detection, alignment, and recognition , 2008.

[13]J. Buolamwini and T. Gebru, “Gender shades: Intersectional accuracy disparities in commercial gender classification,” in Conference on fairness, accountability and transparency , pp. 77–91, PMLR, 2018.

[14]C.Schwemmer, C. Knight, E.D. Bello-Pardo, S.Oklobdzija, M. Schoonvelde, and J.W. Lockhart, “Diagnosing gender bias in image recognition systems,” Socius, vol. 6, p. 2378023120967171, 2020.

[15]M. K. Scheuerman, J. M. Paul, and J. R. Brubaker, “How computers see gender: An evaluation of gender classification in commercial facial analysis services,” Proceedings of the ACM on Human-Computer Interaction , vol. 3, no. CSCW, pp. 1–33, 2019.

[16]S. Agarwal, G. Krueger, J. Clark, A. Radford, J. W. Kim, and M. Brundage, “Evaluating clip: towards characterization of broader capabilities and downstream implications,” arXiv preprint arXiv:2108.02818 , 2021.

[17] C. Garvie, May 2019.

[18] S. Browne, Dark Matters: Surveillance of Blackness . Duke University Press, 2015.

[19] R. Benjamin, Race After Technology: Abolitionist Tools for the New Jim Code . Polity, 2019.

[20]Z. Liu, P. Luo, X. Wang, and X. Tang, “Large-scale celebfaces attributes (celeba) dataset,” Retrieved August , vol. 15, no. 2018, p. 11, 2018.

[21]C. C. V. P. R. C. D. J. S. Sengupta, J.C. Cheng, “Frontal to profile face verification in the wild,” in IEEE Conference on Applications of Computer Vision , February 2016.

[22]X. Qi, K. Huang, A. Panda, M. Wang, and P. Mittal, “Visual adversarial examples jailbreak aligned large language models,” in The Second Workshop on New Frontiers in Adversarial Machine Learning , 2023.

[23] P. Fournier, “Captcha version 2 images,” 2022. Accessed: [Insert Date Here].

[24] M. Ma, “Test dataset,” 2022. Accessed: [Insert Date Here].

[25] Ubitquitin, “Geolocation (geoguessr) images 50k,” 2022. Accessed: [Insert Date Here].

[26] S. Zhu, T. Yang, and C. Chen, “Vigor: Cross-view image geo-localization beyond one-to-one retrieval,” in Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pp. 3640–3649, 2021.

[27] OpenAI, “Red teaming network,” 2022. 09242023.

[28] E. Fenn, N. Ramsay, J. Kantner, K. Pezdek, and E. Abed, “Nonprobative photos increase truth, like, and share judgments in a simulated social media environment,” Journal of Applied Research in Memory and Cognition, vol. 8, no. 2, pp. 131–138, 2019.

[29] A. Name, “Out of context photos are a powerful, low-tech form of misinformation,” 2023. Accessed: 09242023.

[30] A. Ramesh, M. Pavlov, G. Goh, S. Gray, C. Voss, A. Radford, M. Chen, and I. Sutskever, “Zeroshot text-to-image generation,” in International Conference on Machine Learning, pp. 8821–8831, PMLR, 2021.

[31] OpenAI, “Dall·e-3,” 2023.

[32] OpenAI, “Democratic inputs to ai,” 2022. Accessed: 09242023.

[33] OpenAI, “How should ai systems behave?,” 2022. Accessed: 09242023.

[34] S. Zuboff, The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power. PublicAffairs, 2019.

[35] H. Nissenbaum, Privacy in Context: Technology, Policy, and the Integrity of Social Life. Stanford University Press, 2009.

[36] S. Barocas and A. D. Selbst, “Big data’s disparate impact,” California Law Review, vol. 104, no. 3, pp. 671–732, 2016.

[37] Z. Tufekci, “Machine intelligence makes human morals more important,” 2016.

[38] S. J. Russell, Human Compatible: Artificial Intelligence and the Problem of Control. Viking, 2019.

**####**A 附录****

****A.1****

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aLZibRX8jYUkUrvCsyWe0kD0TOMZ8GfBnn6v8CV4ze4wWbkyH4TERSWg/640?wx_fmt=png)
*图13：模型正确识别个体的种族、性别和年龄的能力在各个特征上相似。误差条表示任何种族、性别或年龄的最小和最大性能。*
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aE6F6stIlgd2cZv1C5UF3iaMsQ4w7m944owqCIYh8H6tZBWk36sUVUCg/640?wx_fmt=png)
*图14：模型正确区分个体从他们的图像的身份的能力在上面显示。我们在两个设置中分析这个：是否可以从一个或多个图片中识别出个体，给定一个参考图像，以及模型是否可以从单个图像无条件地识别出著名的名人和政治家。*

****A.2****

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSgMOgvUJibDn5hH9VPEF4aKRcq2dHV29VY46ZGCjGq6WmOpwSsvibSmZ6x83OxzDRY90vXT6XdGzQ/640?wx_fmt=png)
*图15：在图4中给模型的清晰图像。*
更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
