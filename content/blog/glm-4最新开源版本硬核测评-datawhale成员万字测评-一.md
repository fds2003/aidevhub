---
title: "GLM-4最新开源版本硬核测评！Datawhale成员万字测评（一）"
slug: "glm-4最新开源版本硬核测评-datawhale成员万字测评-一"
description: "作者： Datawhale 来源： Datawhale Datawhale干货 作者：潘笃驿，Datawhale成员 智谱今天新推出了一个 glm-4-9b 模型，支持 120k 左右的上下文与 8192 的输出长度，在拿到测试资格的时候我就立马开始了上手评测。 整体体验下来感觉非常不错，对比同类模型有下面几个重要特点，甚至与更大体量的模型更有突出： *指令遵循能力很..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/-vZVTG9q3OX0rpj4PSti1Q"
sourceName: "Datawhale"
readingTime: "26 min"
createdAt: "2024-06-05T16:00:00.000Z"
publishedAt: "2024-06-05T16:00:00.000Z"
featured: false
---

作者： Datawhale  来源： [Datawhale](https://mp.weixin.qq.com/s/-vZVTG9q3OX0rpj4PSti1Q)

Datawhale干货

****作者：潘笃驿，Datawhale成员****

智谱今天新推出了一个 glm-4-9b 模型，支持 120k 左右的上下文与 8192 的输出长度，在拿到测试资格的时候我就立马开始了上手评测。

整体体验下来感觉非常不错，对比同类模型有下面几个重要特点，甚至与更大体量的模型更有突出：

*****指令遵循能力很强****

*****长上下文****

*****8192 的 输出长度支持模型生成更高质量的内容****

同时这一代的各项能力也进一步增强，长文本任务上迎来了一个非常强悍的模型。

我们先来跟新模型打个招呼！

新模型在调用上与其他模型一致，只需要更改 model 参数为最新模型即可。

`from zhipuai import ZhipuAI  
zhipu_client = ZhipuAI(api_key="zhipukey")  
response = zhipu_client.chat.completions.create(  
  model="glm-4-9b",   
    messages=[  
        {"role": "user", "content": "你好，介绍一下你自己"},  
    ]  
    )  
print(response.choices[0].message.content)

你好！我是 ChatGLM，是清华大学 KEG 实验室和智谱 AI 公司于 2024 年共同训练的语言模型。我的目标是针对用户的问题和要求提供适当的答复和支持。
`

****论文爬取总结测试****

让我们来试试一个特殊的任务：论文爬取总结工作。

自大模型横空出世以来，就有无数学者想要利用大模型来简化获取论文相关信息的流程，这个流程往往是我们先从对应的网页爬取对应的内容，然后人为地做数据清洗，最后将清洗好的数据送给 LLM 让它总结必要的信息，现在有了glm-4-9b这个集长上下文长输出的超级模型，也许我们就可以试试另一种大胆的方案？

我们将采用 qwen1.5-32b-chat（30k tokens，输出最大2k） qwen1.5-110b-chat（30k tokens，输出最大8k） moonshot-v1-128k（128k）作为对照组，来让大家直观感受 glm-4-9b 的强大之处。

任务的具体要求如下，我们将直接从 arxiv api 中获取最近与 LLM 相关的 paper。

我们交给 LLM 的任务是，它们必须从含有大量干扰信息的文本中提取出论文的所有相关信息，并总结为我们指定的格式。

这对于大模型是一个相当有挑战性的尝试，对于 LLM 能力要求包括但不限于：

- 

超长的上下文：从 arxiv 上直接爬取的数据存在大量的冗余标签，往往需要人为清洗才能直接送入大模型

- 

强文本理解能力：提取论文中的关键信息需要模型本身就对文本有很强的理解能力

- 

多语言能力：我们从 arxiv 上获取到的内容为英文，要求模型必须提供对应的中文翻译，对模型多语言能力要求很高

- 

严格的指令遵循能力：我们需要大模型在保证总结信息全面详实的同时还要保证严格的格式确保通过校验

我们先来设定好各家模型：

`from zhipuai import ZhipuAI  
import subprocess    
zhipu_client = ZhipuAI(api_key="zhipukey")  
  
import dashscope  
dashscope.api_key = "dashscope-key"  
  
from openai import OpenAI  
kimi_client = OpenAI(  
    api_key = "kimi-key",  
    base_url = "https://api.moonshot.cn/v1",  
)  
 # 请填写您自己的APIKey
`

接着我们来设计一个提示词，指明任务的全部要求。

`GET_ARXIV_PAPER = """  
    ## Task  
    如下是从Arxiv中获取到的文章，请你按照如下json格式总结所有文章的信息并依次返回，不要输出任何其他内容，确保你的输出能够被json.load()方法解析  
    {{  
        id:"序号，从1开始",  
        title:"论文标题",  
        introduction:"论文摘要的中文翻译",  
        recommend_reason:"为什么推荐这篇论文的理由",  
        link:"论文的pdf文件链接"  
    }}  
    ## Papers  
    {web_content}  
  
"""
`
接着我们来设计一个校验工具，它将用于确认模型输出是否为json格式以及解析模型输出，需要注意的是，我们默认模型输出 json 内容时会将其包裹在 r’`json(.*)`’
这样的模式中，在测验结果时可能会对不遵从该规则的模型不公平。
`import re  
import json  
def parse_json(text):  
    pattern = r'```json(.*)```'  
    match = re.search(pattern, text, re.DOTALL)  
    json_text = match.group(1) if match else print("parse error")  
    try:  
        json.loads(json_text)  
        print("parse success")  
    except:  
        print("parse error")
`

工具与模型都导入完毕，我们可以获取数据看看了。

我们先从 arxiv 上获取数据。

`# 从arxiv 按照日期获取最近与llm相关的论文，这里 max_results=1  
result_1 = subprocess.run(['curl', 'https://export.arxiv.org/api/query?search_query=llm&sortBy=submittedDate&sortOrder=descending&max_results=1'], capture_output=True, text=True)    
if result_1.returncode == 0:  
    print(result_1.stdout)    
else:    
    print(f"Error: {result_1.stderr}")
`
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vI9nYe94fsEicLKOXdQyUcgtPLx1xaUaHg6lGm3fxzGAN1BYdyvX8vfgPFY4vgCZhhqU5dIcvvkZY4NTQb5VFuw/640?wx_fmt=png&from=appmsg)

可以发现这个文本量还是相当惊人的。。

`print(len(result_1.stdout))  
prompt_1 = GET_ARXIV_PAPER.format(web_content=result_1.stdout)  
print(len(prompt_1))

4703  
4977  
`

**最后**prompt的文本长度已达4900+，其中有非常严重的信息冗余，存在大量标签干扰** 。**

拿到数据后我们就可以开始测试下各家大模型的表现了。

首先是 qwen1.5-32b-chat：

`qwen_32b_response_1 = dashscope.Generation.call(  
    "qwen1.5-32b-chat",  
    messages=[  
        {"role": "user", "content": prompt_1},  
    ],  
    max_tokens=2000,  
    temperature=0.95,  
).output.text  
print(qwen_32b_response_1)

[  
    {  
        "id": "1",  
        "title": "Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis",  
        "introduction": "在寻求人工智能通用性方面，多模态大型语言模型（MLLMs）已经成为最近进展中的焦点。然而，主要关注点仍然集中在增强它们在静态图像理解方面的功能。MLLMs处理序列视觉数据的潜力尚未得到充分探索，这凸显了对其性能进行全面、高质量评估的缺失。在这篇论文中，我们介绍了Video-MME，这是第一个全面的多模态评估基准，用于评估视频分析中的MLLMs。我们的工作通过以下四个关键特性区别于现有的基准：1）视频类型的多样性，覆盖6个主要视觉领域和30个子领域，以确保广泛的场景泛化能力；2）时间维度的持续性，包括短时、中时和长时间视频，范围从11秒到1小时，以实现强大的上下文动态；3）数据模态的广度，整合除了视频帧之外的多模态输入，包括字幕和音频，以揭示MLLMs的全方位能力；4）注释的质量，利用专家注释员进行严格的手动标注，以促进精确可靠的模型评估。通过反复观看所有视频内容，手动选择了900个视频，并进行了注解，总时长为256小时，生成了2700对问题答案对。借助Video-MME，我们广泛评估了各种最先进的MLLMs，包括GPT-4系列和Gemini 1.5 Pro，以及开源的图像模型如InternVL-Chat-V1.5和视频模型如LLaVA-NeXT-Video。我们的实验表明，Gemini 1.5 Pro是表现最佳的商业模型，明显优于开源模型。我们的数据集和这些发现强调了处理更长序列和多模态数据的进一步改进的需求。",  
        "recommend_reason": "这篇论文介绍了一个全新的视频分析多模态语言模型评估基准Video-MME，对于研究者来说，这是一个重要的资源，可以用来测试和改进他们的模型在处理不同视频类型、长度和多模态数据上的性能。",  
        "link": "http://arxiv.org/pdf/2405.21075v1"  
    }  
]

parse_json(qwen_32b_response_1)

parse success  

接下来是 qwen1.5-110b：

qwen_110b_response_1 = dashscope.Generation.call(  
    "qwen1.5-110b-chat",  
    messages=[  
        {"role": "user", "content": prompt_1},  
    ],  
    max_tokens=8000,  
    temperature=0.95,  
).output.text  
print(qwen_110b_response_1)

{  
    "id": "1",  
    "title": "Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis",  
    "introduction": "在追求人工智能的道路上，多模态大型语言模型（MLLMs）已成为近期进展的核心。然而，目前的研究主要集中在提升它们处理静态图像的能力上，而MLLMs在视频分析领域的潜力尚未得到充分探索。本文提出了Video-MME，首个全面评估多模态语言模型在视频分析中性能的基准。Video-MME独具特色，包括广泛的视频类型覆盖、时间维度的深度、多模态数据的融合以及高质量的手动标注，总共涉及900个视频和2700个问题-答案对。通过对包括GPT-4系列和Gemini 1.5 Pro等先进模型的广泛评估，突显了在处理长序列和多模态数据方面的改进需求。",  
    "recommend_reason": "推荐这篇论文是因为它填补了多模态语言模型在视频分析评价标准上的空白，为研究者提供了一个重要的工具来衡量和推动这一领域的发展，同时指出了当前模型的局限性和未来的改进方向。",  
    "link": "http://arxiv.org/pdf/2405.21075v1"  
}

parse_json(qwen_110b_response_1)

parse success

这里是 moonshot-v1-128k：

kimi_128k_1 = kimi_client.chat.completions.create(  
    model="moonshot-v1-128k",  
    messages=[  
        {"role": "user", "content": prompt_1},  
    ],  
    temperature=0.95,  
).choices[0].message.content  
print(kimi_128k_1)

{  
    "1": {  
        "id": "1",  
        "title": "Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis",  
        "introduction": "在人工通用智能的探索中，多模态大型语言模型(MLLMs)成为近期进展的焦点。然而，主要关注点仍然是发展它们在静态图象理解方面的能力。MLLMs在处理顺序视觉数据方面的潜力还没有被充分探索，这突显了对它们在全面、高质量的评估中性能的缺失。在本文中，我们介绍了Video-MME，这是首次全面、多模态评估基准，用于视频分析中的MLLMs。我们的工作通过四个关键特点与现有基准不同：1)视频类型的多样性，涵盖6个主要视觉领域的30个子领域，以确保广泛场景的泛化能力；2)时间维度的持续时间，包括短期、中期和长期视频，从11秒到1小时不等，以实现强大的上下文动态；3)数据模态的广度，除了视频帧之外，集成多模态输入包括字幕和音频，以揭示MLLMs的全方位能力；4)注释质量，使用专家注释者通过反复观看所有视频内容进行严格的手动标记，以促进精确可靠的模型评估。通过反复观看所有视频内容，手动选择了900个视频，并由专家注释者共注释了256小时，产生了2700对问答对。有了Video-MME，我们广泛评估了各种最先进的MLLMs，包括GPT-4系列和Gemini 1.5 Pro，以及开源的图像模型如InternVL-Chat-V1.5，以及像LLaVA-NeXT-Video这样的视频模型。我们的实验揭示了Gemini 1.5 Pro是表现最佳的商业模型，大大超过了开源模型。我们的数据集以及这些发现强调了进一步改进处理更长序列和多模态数据的必要性。",  
        "recommend_reason": "这篇论文是多模态大型语言模型(MLLMs)在视频分析方面的首次全面评估基准，具有里程碑意义。它涵盖了多种视频类型，具有广泛的泛化能力；涵盖了短至11秒、长达1小时的视频，具有强大的上下文动态；集成了字幕和音频等多种输入模式，能够全面评估MLLM的能力；还具有精确可靠的注释质量。此外，该研究揭示了现有模型处理更长序列和多模态数据方面的不足，为未来的研究方向指明了方向。",  
        "link": "http://arxiv.org/pdf/2405.21075v1"  
    }  
}

parse_json(kimi_128k_1)

parse error  
parse error  
`

最后就是我们的压轴主角 glm-4-9b。

`glm_4_9b_response_1 = zhipu_client.chat.completions.create(  
    model='glm-4-9b',  
    messages=[  
        {"role": "user", "content": prompt_1},  
    ],  
    temperature=0.95,  
    max_tokens=8192,  
).choices[0].message.content  
print(glm_4_9b_response_1)

[  
    {  
        "id": "1",  
        "title": "Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis",  
        "introduction": "在追求通用人工智能的道路上，多模态大语言模型（MLLMs）成为了近期发展的焦点。然而，主要的关注点仍然集中在它们在静态图像理解方面的能力发展上。MLLMs在处理序列视觉数据方面的潜力仍未得到充分探索，这突显出缺乏对它们性能的综合、高质量的评估。在这篇论文中，我们介绍了Video-MME，这是第一个全面的、多模态评估基准，用于评估MLLMs在视频分析中的性能。我们的工作与现有的基准不同，有四个关键特点：1) 视频类型的多样性，涵盖了6个主要视觉领域和30个子领域，以确保广泛场景的通用性；2) 时间维度的持续时间，包括短、中、长期视频，时长从11秒到1小时，以实现鲁棒的上下文动态；3) 数据模式的广度，除了视频帧外，还包括字幕和音频的多模态输入，以揭示MLLMs的全面能力；4) 标注的质量，利用专家标注员的严格手动标注，以促进精确和可靠的模式评估。900个视频经过手动选择和标注，重复观看所有视频内容，结果产生了2700个问答对。使用Video-MME，我们广泛评估了各种最先进的MLLMs，包括GPT-4系列和Gemini 1.5 Pro，以及开源图像模型如InternVL-Chat-V1.5和视频模型如LLaVA-NeXT-Video。我们的实验表明，Gemini 1.5 Pro是表现最好的商业模型，显著优于开源模型。我们的数据集和这些发现强调了进一步提高处理更长时间序列和多模态数据的需求。项目页面：https://video-mme.github.io",  
        "recommend_reason": "该论文首次提出了一个全面的、多模态评估基准（Video-MME），用于评估MLLMs在视频分析中的性能。该基准具有多样性、时间维度覆盖范围广、数据模式全面以及标注质量高等特点，有助于推动MLLMs在视频分析领域的进一步发展。",  
        "link": "http://arxiv.org/pdf/2405.21075v1"  
    }  
]

parse_json(glm_4_9b_response_1)

parse success  
`

可以看到在 4k+ 的文本条件下，glm-4-9b 表现与 qwen1.5-32b qwen1.5-110b 接近，甚至在翻译质量与内容丰富度上表现更优与 moonshot-v1-128k 接近，并且严格遵循了json格式，顺利通过了格式检验。

让我们再来增加下测试难度，我们将信息量从 4k+ 上升至 14k+ 再进行测试，再来对比下 glm-4-9b 与其他模型差距。

`# 从arxiv 按照日期获取最近与llm相关的论文，这里 max_results=5  
result_5 = subprocess.run(['curl', 'https://export.arxiv.org/api/query?search_query=llm&sortBy=submittedDate&sortOrder=descending&max_results=5'], capture_output=True, text=True)    
print(len(result_5.stdout))  
prompt_5 = GET_ARXIV_PAPER.format(web_content=result_5.stdout)  
print(len(prompt_5))

14432  
14706  
`

我们依然先从 qwen1.5-32b-chat 开始测试：

`qwen_32b_response_5 = dashscope.Generation.call(  
    "qwen1.5-32b-chat",  
    messages=[  
        {"role": "user", "content": prompt_5},  
    ],  
    max_tokens=2000,  
    temperature=0.95,  
).output.text  
print(qwen_32b_response_5)  
parse_json(qwen_32b_response_5)

[  
    {  
        "id": "1",  
        "title": "Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis",  
        "introduction": "在追求人工智能的一般性方面，多模态大型语言模型（MLLMs）已经成为最近进步的重点。然而，主要关注点仍然集中在增强他们在静态图像理解中的能力。处理序列视觉数据的MLLM潜力仍然没有得到充分探索，这突出了对其性能进行全面、高质量评估的缺失。在这篇论文中，我们引入了Video-MME，这是第一个全面的多模态评估基准，用于视频分析中的MLLM。我们的工作通过四个关键特征区别于现有的基准：1）视频类型的多样性，覆盖6个主要视觉领域和30个子领域，以确保广泛的场景泛化；2）时间维度的持续性，包括短时、中时和长时间视频，范围从11秒到1小时，以实现稳健的上下文动态；3）数据模态的广度，整合除了视频帧之外的多模态输入，包括字幕和音频，以揭示MLLM的全方位能力；4）注释的质量，利用专家注解员进行严格的手动标注，以促进精确可靠的模型评估。900段视频，总时长为256小时，经过反复观看所有视频内容后被人工选择和标注，产生了2700对问题答案对。借助Video-MME，我们广泛评估了各种最先进的MLLM，包括GPT-4系列和Gemini 1.5 Pro，以及开源图像模型如InternVL-Chat-V1.5和视频模型如LLaVA-NeXT-Video。我们的实验表明，Gemini 1.5 Pro是表现最好的商业模型，明显优于开源模型。我们的数据集连同这些发现强调了处理更长序列和多模态数据方面的进一步改进需求。项目页面：https://video-mme.github.io",  
        "recommend_reason": "这篇论文介绍了首个全面的多模态语言模型在视频分析领域的评估基准，对于研究多模态AI的进展和未来方向具有重要意义。",  
        "link": "http://arxiv.org/pdf/2405.21075v1"  
    },  
    {  
        "id": "2",  
        "title": "Grammar-Aligned Decoding",  
        "introduction": "大型语言模型（LLMs）难以可靠地生成高度结构化的输出，如程序代码、数学公式或良好的标记。约束解码方法缓解了这个问题，通过贪婪地限制LLMs每一步可以输出的令牌，以保证输出符合给定的约束。具体来说，在语法约束解码（GCD）中，LLMs的输出必须遵循给定的文法。在这篇论文中，我们展示了GCD技术（以及一般的约束解码技术）可能会扭曲LLMs的分布，导致输出是语法正确的，但出现的概率并不与LLMs给出的比例相称，因此最终质量较低。我们将这种将采样与语法约束对齐的问题称为语法对齐解码（GAD），并提出了一种自适应采样方法，使用近似预期未来（ASAp），这是一种保证输出语法正确的同时，理论上能产生与LLMs在给定文法约束下的条件概率匹配的输出的解码算法。我们的算法使用先前样本输出来安全地高估不同输出前缀的未来语法正确性。我们在代码生成和结构化NLP任务上的评估显示，ASAp经常比现有的GCD技术产生根据LLMs分布更高的可能性的输出，同时仍然保持所需的语法约束。",  
        "recommend_reason": "该论文提出了一个新的解码算法，解决了LLMs在生成高度结构化输出时遇到的问题，对于提升LLMs的生成能力有重要价值。",  
        "link": "http://arxiv.org/pdf/2405.21047v1"  
    },  
    ...  
]

parse error  
`

再来看看 qwen1.5-110b-chat 与 moonshot-v1-128k：

`qwen_110b_response_5 = dashscope.Generation.call(  
    "qwen1.5-110b-chat",  
    messages=[  
        {"role": "user", "content": prompt_5},  
    ],  
    max_tokens=8000,  
    temperature=0.95,  
).output.text  
parse_json(qwen_110b_response_5)  
  
kimi_128k_5 = kimi_client.chat.completions.create(  
    model="moonshot-v1-128k",  
    messages=[  
        {"role": "user", "content": prompt_5},  
    ],  
    temperature=0.95,  
    max_tokens=8000,  
).choices[0].message.content  
parse_json(kimi_128k_5)

parse success  
parse error  
parse error  
`

可以看到，在 14k 长度的文本测试下，glm-4-9b 依旧发挥稳定，内容表现上不输 qwen1.5-110b-chat ，同时依然严格遵循了json格式。

`glm_4_9b_response_5 = zhipu_client.chat.completions.create(  
    model='glm-4-9b',  
    messages=[  
        {"role": "user", "content": prompt_5},  
    ],  
    temperature=0.95,  
    max_tokens=8192,  
).choices[0].message.content  
print(glm_4_9b_response_5)

[  
    {  
        "id": "1",  
        "title": "Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis",  
        "introduction": "在追求通用人工智能的征程中，多模态大语言模型（MLLMs）已成为最近进步的焦点。然而，主要的关注点仍然集中在他们在静态图像理解方面的能力。MLLMs在处理序列视觉数据方面的潜力仍被充分探索，这突显出缺乏对它们性能的全面、高质量评估。在这篇论文中，我们介绍了Video-MME，这是第一个全面的多模态评估基准，用于评估MLLMs在视频分析中的性能。我们的工作通过四个关键特性与现有基准区分开来：1)视频类型的多样性，涵盖了6个主要视觉领域和30个子领域，以确保广泛的场景泛化性；2)时间维度的持续时间，包括短期、中期和长期视频，从11秒到1小时不等，以实现稳健的上下文动态；3)数据模态的广度，除了视频帧之外，还包括字幕和音频等多模态输入，以揭示MLLMs的全方面能力；4)注释的质量，利用专家标注员严格的手动标注，以促进对模型的精确和可靠评估。900个视频被手动选择和标注，总共花费了256个小时，结果产生了2,700个问答对。通过Video-MME，我们广泛评估了各种最先进的MLLMs，包括GPT-4系列和Gemini 1.5 Pro，以及开源图像模型如InternVL-Chat-V1.5和视频模型如LLaVA-NeXT-Video。我们的实验表明，Gemini 1.5 Pro是表现最好的商业模型，显著优于开源模型。我们的数据集以及这些发现强调了在处理更长的序列和多模态数据方面需要进一步改进的需求。项目页面：https://video-mme.github.io",  
        "recommend_reason": "这篇论文提出了Video-MME，这是一个全面的多模态评估基准，用于评估MLLMs在视频分析中的性能。它是第一个全面的多模态评估基准，涵盖了视频类型的多样性、时间维度的持续时间、数据模态的广度和注释的质量，以实现对MLLMs性能的全面和可靠的评估。",  
        "link": "http://arxiv.org/pdf/2405.21075v1"  
    },  
    {  
        "id": "2",  
        "title": "Grammar-Aligned Decoding",  
        "introduction": "大型语言模型（LLMs）在可靠地生成高度结构化的输出方面存在困难，例如程序代码、数学公式或格式良好的标记。约束解码方法通过贪婪地限制LLMs在每一步可以输出的标记来缓解这个问题，以保证输出匹配给定的约束。具体来说，在语法约束解码（GCD）中，LLMs的输出必须遵循给定的语法。在这篇论文中，我们证明GCD技术（以及更一般的约束解码技术）会扭曲LLMs的分布，导致语法上正确但出现概率与LLMs给出的不成比例的输出，因此最终是低质量的。我们称语法约束下的采样对齐问题为语法对齐解码（GAD），并提出了一种解码算法ASAp，该算法在保证输出语法正确的同时，可以证明产生与LLMs分布条件下给定语法约束的条件概率相匹配的输出。我们的算法使用先验样本输出，合理地过估计不同输出前缀的未来的语法性。我们的评估在代码生成和结构化NLP任务上显示，ASAp通常产生比现有的GCD技术具有更高似然性（根据LLMs的分布）的输出，同时仍然执行所需的语法约束。",  
        "recommend_reason": "这篇论文提出了语法对齐解码（GAD）算法，该算法通过使用先验样本输出，合理地过估计不同输出前缀的未来的语法性，来保证输出语法正确的同时，产生与LLMs分布条件下给定语法约束的条件概率相匹配的输出。",  
        "link": "http://arxiv.org/pdf/2405.21047v1"  
    },  
    {  
        "id": "3",  
        "title": "Direct Alignment of Language Models via Quality-Aware Self-Refinement",  
        "introduction": "强化学习从人类反馈（RLHF）已被普遍用于使大型语言模型（LLMs）的行为与人类偏好保持一致。最近，一个流行的替代方案是直接策略优化（DPO），它用一个策略本身来替换基于LLM的奖励模型，从而避免了额外的内存和训练时间来学习奖励模型的需要。然而，DPO没有考虑积极和消极响应的相对质量，可能导致次优的训练结果。为了缓解这个问题，我们研究了在飞地微调LLMs中使用内在知识来获取相对质量并帮助细化损失函数。具体来说，我们利用LLMs的知识来设计一个细化函数来估计积极和消极响应的质量。我们表明，在温和的假设下，构建的细化函数可以帮助在损失函数下自我细化。细化函数被集成到DPO及其变体身份策略优化（IPO）中。各种评估器的实验表明，它们可以改善微调模型的性能，超过DPO和IPO。",  
        "recommend_reason": "这篇论文研究了在飞地微调LLMs中使用内在知识来获取相对质量并帮助细化损失函数，以改善微调模型的性能。",  
        "link": "http://arxiv.org/pdf/2405.21040v1"  
    },  
    {  
        "id": "4",  
        "title": "Standards for Belief Representations in LLMs",  
        "introduction": "随着大型语言模型（LLMs）在各个领域展现出非凡的能力，计算机科学家正在开发方法来理解他们的认知过程，特别是关于LLMs如何（以及是否）在其内部表示他们对世界的信念。然而，这个领域目前缺乏一个统一的理论基础来支撑对LLMs中信念的研究。本文开始填补这一空白，提出了一种表示在LLMs中被称为信念的标准。我们认为，虽然LLMs中信念测量的项目与决策理论和形式认识论中进行的信念测量具有惊人的特征，但它们也存在一些不同之处，这应该改变我们测量信念的方式。因此，借鉴哲学和当代机器学习的实践中的见解，我们建立了四个标准，平衡理论考虑与实际约束。我们提出的标准包括准确性、一致性、统一性和使用，这些标准共同帮助我们为LLMs中信念表示的全面理解打下基础。我们借鉴了实证工作，这些工作表明，单独使用各种标准来识别信念表示是有局限性的。",  
        "recommend_reason": "这篇论文提出了LLMs中信念表示的标准，包括准确性、一致性、统一性和使用，以帮助全面理解LLMs中信念表示。",  
        "link": "http://arxiv.org/pdf/2405.21030v1"  
    },  
    {  
        "id": "5",  
        "title": "LACIE: Listener-Aware Finetuning for Confidence Calibration in Large Language Models",  
        "introduction": "当回答问题时，LLMs可以传达不仅是一个答案，而且是对答案正确性的信心水平。这包括明确的信心标记（例如给出一个数字分数）以及隐含的标记，如权威的语调或通过提供额外知识来详细阐述。为了LLMs成为可信赖的知识来源，他们传达的信心应该与他们的实际专业知识相匹配；然而，大多数当前模型倾向于过度自信。为了校准隐含和明确的信心标记，我们引入了一种实用、听众感知的微调方法（LACIE），该方法模拟听众，不仅考虑答案是否正确，还考虑答案是否会被听众接受。我们将校准视为偏好优化，创建数据通过一个双代理游戏，其中说话模型输出由模拟的听众判断。然后，我们使用LACIE微调三个LLMs（Mistral-7B，Llama3-8B，Llama3-70B），并表明，这些模型对模拟听众的校准更好。关键的是，这些趋势转移到人类听众身上，帮助他们正确预测模型的正确性：我们在一个人工评估中进行了操作，其中注释员接受或拒绝LLMs的答案，发现使用LACIE训练的结果是接受错误答案的数量减少了47%，同时保持对正确答案的接受程度不变。此外，LACIE微调推广到另一个数据集，当在TriviaQA上训练时，在TruthfulQA上的真实性有了大幅提高。我们的分析表明，LACIE导致了正确和错误示例之间更好的信心分离。从定性上看，我们发现LACIE训练的模型在正确时更倾向于权衡并隐含表示确定性，使用权威的语调或包含详细信息。最后，LACIE微调导致模型对于很可能错误的答案出现了拒绝（例如说“我不知道”）的涌现增加。",  
        "recommend_reason": "这篇论文提出了LACIE，这是一种实用、听众感知的微调方法，用于校准大型语言模型的信心水平，使其更准确地反映模型的实际专业知识。",  
        "link": "http://arxiv.org/pdf/2405.21028v1"  
    }  
]

parse_json(glm_4_9b_response_5)

parse success  
`

我们再加大难度试试，这次我们将论文数扩大至 20。

`# 从arxiv 按照日期获取最近与llm相关的论文，这里 max_results=20  
result_20 = subprocess.run(['curl', 'https://export.arxiv.org/api/query?search_query=llm&sortBy=submittedDate&sortOrder=descending&max_results=20'], capture_output=True, text=True)    
print(len(result_20.stdout))  
prompt_20 = GET_ARXIV_PAPER.format(web_content=result_20.stdout)  
print(len(prompt_20))

52506  
52780  
`

此时文本长度已经来到 50k ，我们来测试下 glm-4-9b 在这种情况下的表现。

`glm_4_9b_response_20 = zhipu_client.chat.completions.create(  
    model='glm-4-9b',  
    messages=[  
        {"role": "user", "content": prompt_20},  
    ],  
    temperature=0.95,  
    max_tokens=8192,  
).choices[0].message.content  
print(glm_4_9b_response_20)
`
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vI9nYe94fsEicLKOXdQyUcgtPLx1xaUaHQoibaxvw0HhOBTJRc6AAzuyajo5Qb8uq2Ssa4bib7P5giajy8qUkpQI2g/640?wx_fmt=png&from=appmsg)
`parse_json(glm_4_9b_response_20)

parse error  
`

可以看到 glm-4-9b 仍然完成了绝大多数任务，但在此时在 json 格式遵循上出现了部分问题。

**最后我们来总结一下上面的实验结果，**在长文本内容理解，信息提取总结上 glm-4-9b 有着不输于更大规模模型的表现，在 50k 以下的文本内甚至还能保持严格格式遵循，****可以称的上小模型界的一枚重磅炸弹！****

****有趣的 Use Case****

**借助于 glm-4-9b**指令遵循能力很强，长上下文，长 output**  的优点，我们可以再做一个更加实用的有趣 demo：**

我们可以利用 glm-4-9b**实现一个 paper agent** ，从 arxiv api**订阅获取每日的最新 paper，并且仔细阅读论文原文为我们总结论文核心内容** 。
`import subprocess  
import re  
import json  
from zhipuai import ZhipuAI  
  
# Initialize the ZhipuAI client  
zhipu_client = ZhipuAI(api_key="......")  
  
class Trigger:  
    GET_ARXIV_PAPER = """  
    ## Task  
    如下是从Arxiv中获取到的文章，请你按照如下json格式总结所有文章的信息并依次返回，不要输出任何其他内容，确保你的输出能够被json.load()方法解析  
    {{  
        id: "序号，从1开始",  
        title: "论文标题",  
        introduction: "论文摘要的中文翻译",  
        recommend_reason: "为什么推荐这篇论文的理由",  
        link: "论文的pdf文件链接"  
    }}  
    ## Papers  
    {web_content}  
    """  
    # 你可以优化下面的提示词来取得更好的效果  
    GET_ARXIV_PDF = """  
    ## Task  
    在阅读下面的论文时，提取以下关键信息：  
  
    1. 基本信息：  
    - 论文标题、作者、发表日期、发表期刊、关键词  
  
    2. 摘要：  
    - 摘要内容：概括论文的整体内容。  
  
    3. 研究背景：  
    - 研究的背景和动机：为什么进行这项研究。  
    - 研究的主要问题或挑战：研究要解决的问题。  
  
    4. 研究目的：  
    - 研究目标：研究的主要目标。  
  
    5. 文献综述：  
    - 相关领域已有的研究：总结相关领域已有研究。  
    - 本研究的理论基础：本研究是如何建立在之前研究基础上的。  
  
    6. 研究方法：  
    - 研究方法和技术：研究中使用的方法和技术。  
    - 数据收集和分析：数据是如何收集和分析的。  
  
    7. 研究结果：  
    - 主要研究结果：研究发现。  
    - 结果与研究目标的关系：结果如何支持研究目标。  
  
    8. 讨论：  
    - 研究结果的意义：研究结果的意义和影响。  
    - 结果如何解释和支持研究假设：解释研究结果是否支持假设，提供合理的解释。  
    - 有哪些意外发现或有趣的结果。  
  
    9. 结论：  
    - 研究的主要结论：研究的结论。  
    - 研究的局限性：研究的局限。  
    - 对未来研究的建议：未来研究的建议和方向。  
  
    10. 参考文献：  
    - 关键参考文献：几篇重要的参考文献。  
  
    11. 研究贡献：  
    - 研究对该领域的主要贡献：研究的创新点和贡献。  
  
    12. 实际应用：  
    - 研究结果的实际应用：研究结果的实际应用及其对行业或社会的影响。  
  
    ## Content  
    {content}  
    """  
  
    def __init__(self, websites: list = []) -> None:  
        self.websites = websites  
  
    def predict(self, prompt: str) -> str:  
        response = zhipu_client.chat.completions.create(  
            model='glm-4-9b',  
            messages=[{"role": "user", "content": prompt}],  
            temperature=0.95,  
            max_tokens=8192,  
        ).choices[0].message.content  
        return response  
  
    def fetch_papers(self, website: str) -> str:  
        result = subprocess.run(['curl', website], capture_output=True, text=True)  
        if result.returncode == 0:  
            return result.stdout  
        else:  
            print(f"Error: {result.stderr}")  
            return None  
  
    def parse_json(self, text: str) -> list:  
        pattern = r'```json(.*)```'  
        match = re.search(pattern, text, re.DOTALL)  
        if match:  
            json_text = match.group(1).strip()  
            try:  
                return json.loads(json_text)  
            except json.JSONDecodeError:  
                print("JSON decode error")  
                return []  
        else:  
            print("No JSON content found")  
            return []  
  
    def get_arxiv_pdf(self, pdf_link: str) -> str:  
        result = subprocess.run(['curl', f'https://r.jina.ai/{pdf_link}'], capture_output=True, text=True)  
        if result.returncode == 0:  
            return result.stdout  
        else:  
            print(f"Error: {result.stderr}")  
            return None  
  
    def run(self) -> list:  
        result = []  
        for website in self.websites:  
            web_content = self.fetch_papers(website)  
            if web_content:  
                web_summary = self.predict(self.GET_ARXIV_PAPER.format(web_content=web_content))  
                json_data = self.parse_json(web_summary)  
                for paper in json_data:  
                    pdf_content = self.get_arxiv_pdf(paper['link'])  
                    if pdf_content:  
                        pdf_summary = self.predict(self.GET_ARXIV_PDF.format(content=pdf_content))  
                        paper['summary'] = pdf_summary  
                result.append(json_data)  
        print("task done!")  
        return result  
trigger = Trigger(websites=['https://export.arxiv.org/api/query?search_query=llm&sortBy=submittedDate&sortOrder=descending&max_results=5'])  
papers_summary = trigger.run()  
with open('output.jsonl', 'w', encoding='utf-8') as file:    
    for i in papers_summary:  
        for item in i:    
            json_str = json.dumps(item, ensure_ascii=False)    
            file.write(json_str + '\n')
`
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vI9nYe94fsEicLKOXdQyUcgtPLx1xaUaHFxjqicfvq3KGT705LpbydITLOGdPudwycbACh9utZO1Cf7RfxG3PQrg/640?wx_fmt=png&from=appmsg)

paper agent 结果

**可以看到 glm-4-9b 出色地完成了**从论文提取，到 paper 阅读再到 paper 关键内容总结的全部任务** ，并且保证在这样一个对中间过程要求严格的测试条件下保证稳定。**

****对未来的展望****

**从上面的测试中可以看出，**glm-4-9b 在长文本任务，指令遵循上表现相当优秀，同时又能保持相当高的多语言水平与逻辑能力** ，以 9b 的体量与更大体量的模型掰掰手腕，而相比于这些模型，glm-4-9b有着推理速度快，部署成本低，易于微调等不可忽视的优点，而在如下的场景中 glm-4-9b 更是适合落地的最佳人选：**

****智能客服与聊天机器人：** glm-4-9b 能够快速响应用户查询，并提供相关的信息和建议。它们能够处理用户输入的长文本，理解上下文，能够保持对用户历史偏好的记忆，并给出恰当的回应。**

****实时文本分析：** 在社交媒体监控、新闻分析等领域，需要实时处理大量的文本数据。glm-4-9b 能够迅速分析文本内容，提取关键信息，并生成报告或警报。**

****个性化推荐系统：** 在电商、视频平台等场景中，基于用户的历史行为和偏好进行个性化推荐至关重要。glm-4-9b 可以处理用户的长期行为数据，理解用户的兴趣和需求，并生成精准的推荐结果同时使用成本较低。**

相关领域的小伙伴们可以用起来啦！

![](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsGxu3P5YibTO899okS0X9WaLmQCtia4U8Eu1xWCz9t8Qtq9PH6T1bTcxibiaCIkGzAxpeRkRFYqibVmwSw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)
**一起****“**点赞**”**三连↓**

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
