---
title: "Llama2官方入门指南(中文版)"
slug: "llama2官方入门指南-中文版"
description: "作者： Web3天空之城 来源： Web3天空之城 文：城主 英文原文：Getting started with Llama 2 - AI at Meta https://ai.meta.com/llama/get-started/ 欢迎阅读Llama的入门指南。 本指南提供了帮助您设置Llama所需的信息和资源，包括如何访问模型、托管、操作指南和集成指南。另外，您还..."
category: "tutorials"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/QOyYgn8q1XhqloW6Wfp-HA"
sourceName: "Web3天空之城"
readingTime: "26 min"
createdAt: "2023-10-29T16:00:00.000Z"
publishedAt: "2023-10-29T16:00:00.000Z"
featured: false
---

作者： Web3天空之城  来源： [Web3天空之城](https://mp.weixin.qq.com/s/QOyYgn8q1XhqloW6Wfp-HA)

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSjUWZKg9fxDud95eWicFfo3u97ZXcpsDkYoiaYW5iaTaZX5qnhic3WNHlYZJoATpylGoMhibUj6j39QQ/640?wx_fmt=png)

文：城主

英文原文：Getting started with Llama 2 - AI at Meta

[https://ai.meta.com/llama/get-started/](https://ai.meta.com/llama/get-started/)

欢迎阅读Llama的入门指南。

本指南提供了帮助您设置Llama所需的信息和资源，包括如何访问模型、托管、操作指南和集成指南。另外，您还会找到一些补充材料，以便在使用Llama构建时为您提供更多帮助。

**####**快速设置****

## 前提条件

a.操作系统：Ubuntu

b.包：wget，md5sum

c.包管理器：Conda ME

如果你想在Windows或macOS上运行它，请参考开源社区关于他们如何实现这一点的说明。

这里有一些你可以阅读更多关于开源资源的链接

[https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)

[https://github.com/facebookresearch/llama-recipes/issues/32#issuecomment-1647095537](https://github.com/facebookresearch/llama-recipes/issues/32#issuecomment-1647095537)

## 获取模型

a.访问Llama下载表单（https://ai.meta.com/micro_site/url/?click_from_context_menu=true&country=HK&destination=https%3A%2F%2Fai.meta.com%2Fresources%2Fmodels-and-libraries%2Fllama-downloads%2F&event_type=click&last_nav_impression_id=1Fi6aMOl2BdFe7cqa&max_percent_page_viewed=100&max_viewport_height_px=985&max_viewport_width_px=1293&orig_request_uri=https%3A%2F%2Fai.meta.com%2Fllama%2Fget-started%2F&primary_cmsid=1066018851518569&primary_content_locale=en_US&region=apac&scrolled=true&session_id=0w3r6LDvzBfVZ7ltO&site=meta_ai）并接受我们的许可。

b.一旦你的请求被批准，你将通过电子邮件收到一个签名的URL。

c.克隆Llama 2仓库

[https://github.com/facebookresearch/llama](https://github.com/facebookresearch/llama)

d.运行download.sh脚本，当提示开始下载时，传递提供的URL。

请记住，链接在24小时后和一定数量的下载后会过期。如果你开始看到如403：禁止的错误，你可以随时重新请求链接。

## 托管****

####**

**####**亚马逊网络服务****

AWS提供了多种托管你的Llama模型的方式。（SageMaker Jumpstart，EC2，Bedrock等）。在这份文档中，我们将概述使用SageMaker Jumpstart和Bedrock托管你的模型的步骤。你可以直接在AWS网站上参考其他产品。

Bedrock

一个完全托管的服务，提供了一种选择高性能基础模型的选择，通过API构建生成AI应用，简化开发同时保持隐私和安全。你可以在这里 [https://aws.amazon.com/bedrock/](https://aws.amazon.com/bedrock/) 阅读更多关于产品的信息，并在这里 [https://aws.amazon.com/bedrock/llama-2/](https://aws.amazon.com/bedrock/llama-2/) 查看如何使用Llama 2和Bedrock的指南。

SageMaker JumpStart

亚马逊SageMaker使ML从业者能够使用完全托管的基础设施、工具和工作流程，为任何用例构建、训练和部署机器学习模型。使用SageMaker JumpStart，ML从业者可以从广泛的公开可用的基础模型中选择，并在SageMaker实例上进行模型训练和部署。你可以在这里

[https://aws.amazon.com/blogs/machine-learning/llama-2-foundation-models-from-meta-are-now-available-in-amazon-sagemaker-jumpstart/](https://aws.amazon.com/blogs/machine-learning/llama-2-foundation-models-from-meta-are-now-available-in-amazon-sagemaker-jumpstart/) 阅读更多关于它的信息。

**####**Cloudflare****

Workers AI是Cloudflare全球网络上的无服务器GPU推理。它是一个AI推理作为服务平台，使开发者能够只用几行代码就能运行AI模型。在这里

[https://blog.cloudflare.com/workers-ai/](https://blog.cloudflare.com/workers-ai/) 了解更多关于Workers AI的信息，并查看这里 [https://developers.cloudflare.com/workers-ai/models/llm/](https://developers.cloudflare.com/workers-ai/models/llm/) 的文档开始使用Llama 2模型。

**####**谷歌云平台（GCP）-模型花园****

GCP是一套云计算服务，提供计算资源以及虚拟机。在GCP服务的基础上，Vertex AI的模型花园https://cloud.google.com/model-garden 提供了基础设施，以一个地方发现、定制和部署各种模型，为你的ML项目提供了起点。有超过100种基础模型供开发者使用，你可以通过几次点击就部署AI模型，以及在Google Colab的笔记本中运行微调任务。

Vertex AI

我们与谷歌云的Vertex AI合作，完全集成了Llama 2，提供了预训练的聊天和CodeLlama的各种大小。从这里 [https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/139](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/139) 开始，注意你可能需要请求适当的GPU计算配额作为前提条件。

**####**Hugging Face****

你必须首先使用与你的Hugging Face账户相同的电子邮件地址请求下载

[https://ai.meta.com/resources/models-and-libraries/llama-downloads/](https://ai.meta.com/resources/models-and-libraries/llama-downloads/) 。

这样做后，你可以请求访问 Hugging Face

[https://huggingface.co/meta-llama](https://huggingface.co/meta-llama) 上的任何模型，1-2天内你的账户将被授予所有版本的访问权限。

**####**Kaggle****

Kaggle是一个数据科学家和机器学习工程师的在线社区。它不仅允许用户找到用于构建他们的AI模型的数据集，还允许用户搜索并下载其他用户上传的预训练模型。在一个地方发现数百个经过训练，准备就绪的机器学习模型。此外，社区成员也可以使用这些模型在笔记本中发布他们的创新作品，由谷歌云AI平台提供计算资源和虚拟机的支持。我们与Kaggle合作，完全集成了Llama 2，提供预训练的聊天和CodeLlama模型，各种大小。要从Kaggle下载Llama 2模型工件，您必须首先使用与您的Kaggle帐户相同的电子邮件地址请求下载

[https://ai.meta.com/resources/models-and-libraries/llama-downloads/](https://ai.meta.com/resources/models-and-libraries/llama-downloads/) 。

这样做后，您可以请求访问Llama 2

[https://www.kaggle.com/models/metaresearch/llama-2](https://www.kaggle.com/models/metaresearch/llama-2)

和Code Lama

[https://www.kaggle.com/models/metaresearch/codellama](https://www.kaggle.com/models/metaresearch/codellama) 模型。一旦您的请求被处理，您将获得下载权限。

**####**微软Azure和Windows****

使用Microsoft Azure，您可以通过两种方式之一访问Llama 2，要么下载Llama 2模型并在虚拟机上部署，要么使用Azure模型目录。

Azure虚拟机

要在Azure VM上运行Llama，您可以设置自己的VM，或者使用Azure的数据科学VM，它已经预装了Pytorch、CUDA、NVIDIA系统管理和其他ML工具。要使用数据科学VM，请按照这里的说明设置一个。确保使用GPU启用的映像设置此VM。然而，如果你想设置自己的VM，你可以按照微软网站上的快速入门指南 [https://learn.microsoft.com/en-us/azure/machine-learning/data-science-virtual-machine/dsvm-ubuntu-intro?view=azureml-api-2](https://learn.microsoft.com/en-us/azure/machine-learning/data-science-virtual-machine/dsvm-ubuntu-intro?view=azureml-api-2) 。你可以在“连接到虚拟机”步骤停止。一旦你有了一个VM设置，你可以按照这里的指南在VM上本地访问模型。

Azure模型目录

Azure模型目录是一个用于探索基础模型集合的中心。基于Azure ML平台，模型目录提供了运行ML任务，如微调和评估的选项，只需几次点击。总的来说，这是初级开发者尝试他们喜欢的模型的好起点，也集成了强大的工具，供高级开发者构建AI应用程序。我们已经与Azure合作，将Llama 2完全集成到模型目录中，提供预训练的聊天和CodeLlama模型，各种大小。请按照这里 [https://techcommunity.microsoft.com/t5/ai-machine-learning-blog/introducing-llama-2-on-azure/ba-p/3881233](https://techcommunity.microsoft.com/t5/ai-machine-learning-blog/introducing-llama-2-on-azure/ba-p/3881233) 的说明开始。

ONNX for Windows

ONNX [https://onnx.ai/about.html](https://onnx.ai/about.html) 是一个用于表示机器学习模型的开放格式。它定义了一组通用的操作符和一个通用的文件格式，使AI开发者能够在各种框架、工具、运行时和编译器中使用模型。使用ONNX的主要优点之一是，它允许模型从一个框架（如TensorFlow）轻松导出，并导入到另一个框架（如PyTorch）。

配合ONNX运行时，它将通过灵活的接口加速您的开发，集成硬件特定的库，基本上允许您在不同的平台（如Windows）上轻松运行ML任务，包括推理。开始为Windows/PC开发应用程序，使用官方的ONNX Llama 2仓库 [https://github.com/microsoft/Llama-2-Onnx](https://github.com/microsoft/Llama-2-Onnx) 和ONNX运行时 [https://github.com/microsoft/Llama-2-Onnx](https://github.com/microsoft/Llama-2-Onnx) 。请注意，要使用ONNX Llama 2仓库，您需要提交一个请求，从子仓库下载模型工件。这个请求将由微软ONNX团队审查。

**####**如何指南****

如果你想通过编写代码来学习，强烈建议你看看了解Llama 2 - Jupyter Notebook

[https://github.com/facebookresearch/llama-recipes/blob/main/examples/Getting_to_know_Llama.ipynb](https://github.com/facebookresearch/llama-recipes/blob/main/examples/Getting_to_know_Llama.ipynb) 。这是开始最常见的LLMs操作的好地方。

## 微调****

全参数微调是一种微调所有层的所有参数的预训练模型的方法。总的来说，它可以达到最好的性能，但它也是最耗资源和时间的：它需要最多的GPU资源，并且需要最长的时间。PEFT，或参数高效微调，允许人们用最少的资源和成本微调模型。有两种重要的PEFT方法：LoRA（低秩适应）和QLoRA（量化LoRA），其中预训练模型分别以量化的8位和4位权重加载到GPU。你可能可以使用LoRA或QLoRA微调Llama 2-13B模型，使用单个消费者GPU，内存为24GB，使用QLoRA需要的GPU内存和微调时间比LoRA少。通常，人们应该首先尝试LoRA，或者如果资源极其有限，尝试QLoRA，微调完成后，评估性能。只有当性能不满意时，才考虑全面微调。

## 配方PEFT LoRA****

llama-recipes仓库详细介绍了由提供的样本脚本支持的不同微调

[https://github.com/facebookresearch/llama-recipes/blob/main/docs/LLM_finetuning.md](https://github.com/facebookresearch/llama-recipes/blob/main/docs/LLM_finetuning.md)（FT）替代方案。特别是，它强调了使用PEFT作为首选的FT方法，因为它减少了硬件需求，并防止了灾难性的遗忘。对于特定的情况，全参数FT仍然可以有效，可以使用不同的策略来防止过度修改模型。此外，FT可以在单个gpu

[https://github.com/facebookresearch/llama-recipes/blob/main/docs/single_gpu.md](https://github.com/facebookresearch/llama-recipes/blob/main/docs/single_gpu.md) 或多个gpu

[https://github.com/facebookresearch/llama-recipes/blob/main/docs/multi_gpu.md](https://github.com/facebookresearch/llama-recipes/blob/main/docs/multi_gpu.md) 上使用FSDP完成。为了运行这些配方，可以按照以下步骤操作：

a.创建一个包含pytorch和其他依赖项的conda环境

b.按照这里描述的方法安装配方：

[https://github.com/facebookresearch/llama-recipes#install-with-pip](https://github.com/facebookresearch/llama-recipes#install-with-pip)

c.从hf下载所需的模型，可以使用git-lfs或使用llama下载脚本。

d.配置好所有内容后，运行以下命令：

`pip install trl  
git clone https://github.com/lvwerra/trl
`

python trl/examples/scripts/sft_trainer.py \

–model_name meta-llama/Llama-2-7b-hf \
–dataset_name timdettmers/openassistant-guanaco \
–load_in_4bit \
–use_peft \
–batch_size 4 \ –gradient_accumulation_steps 2

## Hugging Face PEFT LoRA****

([https://github.com/huggingface/peft](https://github.com/huggingface/peft)）

使用Low Rank Adaption（LoRA），Llama 2被加载到GPU内存中作为量化的8位权重。

使用Hugging Face的PEFT LoRA

[https://huggingface.co/blog/llama2#fine-tuning-with-peft](https://huggingface.co/blog/llama2#fine-tuning-with-peft) 进行微调非常简单 - 在Llama 2-7b上使用OpenAssistant数据集进行微调的示例可以在三个简单步骤中完成：

`pip install trl  
git clone https://github.com/lvwerra/trl
`

python trl/examples/scripts/sft_trainer.py \

–model_name meta-llama/Llama-2-7b-hf \
–dataset_name timdettmers/openassistant-guanaco \
–load_in_4bit \
–use_peft \
–batch_size 4 \ –gradient_accumulation_steps 2

这大约需要在单个GPU上运行16小时，并使用不到10GB的GPU内存；改变批处理大小到8/16/32将使用超过11/16/25GB的GPU内存。微调完成后，你会在一个名为“output”的新目录中看到至少有adapter_config.json和adapter_model.bin - 运行下面的脚本来推断基础模型和新模型，这是通过合并基础模型和微调模型生成的：

`import torch  
from transformers import ( AutoModelForCausalLM, AutoTokenizer,  
pipeline,  
)  
from peft import LoraConfig, PeftModel from trl import SFTTrainer
`
model_name = “meta-llama/Llama-2-7b-chat-hf” new_model = “output”
device_map = {"": 0}
base_model = AutoModelForCausalLM.from_pretrained( model_name,
low_cpu_mem_usage=True,
return_dict=True,
torch_dtype=torch.float16,
device_map=device_map,
)

model = PeftModel.from_pretrained(base_model, new_model)

model = model.merge_and_unload()

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)

tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = “right”

prompt = “Who wrote the book Innovator’s Dilemma?”

pipe = pipeline(task=“text-generation”, model=base_model, tokenizer=tokenizer, max_length=200)
result = pipe(f"[INST] {prompt} [/INST]")
print(result[0][‘generated_text’])
pipe = pipeline(task=“text-generation”, model=model, tokenizer=tokenizer, max_length=200)
result = pipe(f"[INST] {prompt} [/INST]")
print(result[0][‘generated_text’])

## QLoRA微调****

QLoRA（Q代表量化）比LoRA更节省内存。在QLoRA中，预训练模型作为量化的4位权重加载到GPU。使用QLoRA进行微调也非常容易运行 - 使用OpenAssistant对Llama 2-7b进行微调的示例可以在四个快速步骤中完成：

`git clone https://github.com/artidoro/qlora cd qlora  

pip install -U -r requirements.txt ./scripts/finetune_llama2_guanaco_7b.sh
`

这大约需要在单个GPU上运行6.5小时，使用11GB的GPU内存。微调完成后，./scripts/finetune_llama2_guanaco_7b.sh中指定的output_dir将有checkoutpoint-xxx子文件夹，其中包含微调的适配器模型文件。要运行推断，请使用下面的脚本：

`import torch
`
model_id = “meta-llama/Llama-2-7b-hf”
new_model = “output/llama-2-guanaco-7b/checkpoint-1875/adapter_model” # change if needed
quantization_config = BitsAndBytesConfig(
load_in_4bit=True,
bnb_4bit_compute_dtype=torch.bfloat16,
bnb_4bit_use_double_quant=True,
bnb_4bit_quant_type=‘nf4’
)
model = AutoModelForCausalLM.from_pretrained(
model_id,
low_cpu_mem_usage=True,
load_in_4bit=True,
quantization_config=quantization_config,
torch_dtype=torch.float16,
device_map=‘auto’
)
model = PeftModel.from_pretrained(model, new_model)
tokenizer = AutoTokenizer.from_pretrained(model_id)
prompt = “Who wrote the book innovator’s dilemma?”
pipe = pipeline(task=“text-generation”, model=model, tokenizer=tokenizer, max_length=200)
result = pipe(f"[INST] {prompt} [/INST]") print(result[0][‘generated_text’])

Axotol [https://github.com/OpenAccess-AI-Collective/axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) 是另一个开源库，你可以用它来简化Llama 2的微调。使用Axotol微调Llama 2的一个好例子是这四个笔记本，涵盖了整个微调过程（生成数据集，使用LoRA微调模型，评估和基准测试）

[https://github.com/OpenPipe/OpenPipe/tree/main/examples/classify-recipes](https://github.com/OpenPipe/OpenPipe/tree/main/examples/classify-recipes) 。

## 量化

量化是一种表示模型权重的技术，这些权重通常是32位浮点数，用较低精度的数据如16位浮点数，16位整数，8位整数，甚至4/3/2位整数来表示。量化的好处包括更小的模型大小，更快的微调和更快的推理。在资源受限的环境中，如单GPU或Mac或移动边缘设备（例如https://github.com/ggerganov/llama.cpp），量化是微调模型或运行推理的必要条件。关于量化的更多信息可以在这里

[https://pytorch.org/blog/introduction-to-quantization-on-pytorch/](https://pytorch.org/blog/introduction-to-quantization-on-pytorch/) 和这里

[https://huggingface.co/docs/optimum/concept_guides/quantization](https://huggingface.co/docs/optimum/concept_guides/quantization) 找到。

## 提示

提示工程是一种用于提高语言模型性能的技术，通过为模型提供更多的上下文和任务信息。它涉及创建提示，这些提示是提供额外信息或指导给模型的短文本，如文本将生成的主题或类型。通过使用提示，模型可以更好地理解预期的输出类型，并产生更准确和相关的结果。在Llama 2中，上下文的大小，以令牌数量计，已经从2048增加到4096。

**####**制作有效的提示****

制作有效的提示是提示工程的重要部分。以下是一些创建提示的技巧，这些提示将有助于提高你的语言模型的性能：

1.清晰简洁：你的提示应该易于理解，并提供足够的信息让模型生成相关的输出。避免使用可能会让模型混淆的行话或技术术语。

2.使用具体的例子：在你的提示中提供具体的例子可以帮助模型更好地理解预期的输出。例如，如果你希望模型生成关于特定主题的故事，包括一些关于设置，角色和情节的句子。

3.变化提示：使用不同的提示可以帮助模型更多地了解手头的任务，并产生更多样化和创新的输出。尝试使用不同的风格，语气和格式来看看模型的反应。

4.测试和改进：一旦你创建了一组提示，就在模型上测试它们，看看它们的表现如何。如果结果不符合预期，尝试通过添加更多的细节或调整语气和风格来改进提示。

5.使用反馈：最后，使用用户或其他来源的反馈来不断改进你的提示。这可以帮助你识别模型需要更多指导的地方，并做出相应的调整。

**####**基于角色的提示****

根据被対话的人或实体的角色或视角创建提示。这种技术对于生成更相关和吸引人的语言模型的回应可能很有用。

优点：

1.提高相关性：基于角色的提示帮助语言模型理解被対话的人或实体的角色或视角，这可能导致更相关和吸引人的回应。

2.提高准确性：提供关于被対话的人或实体的角色或视角的额外上下文可以帮助语言模型避免犯错误或误解。

缺点：

1.需要付出努力：需要付出更多的努力来收集和提供有关被对话的人或实体的角色或观点的必要信息。

示例：

你是一位虚拟导游，正在夜间带领游客参观埃菲尔铁塔。向你的观众描述埃菲尔铁塔，包括它的历史，每年参观的人数，完成一次完整游览需要的时间，以及每年有那么多人参观这个地方的原因。

**####**思维链技术****

涉及向语言模型提供一系列提示或问题，以帮助引导其思考并生成更连贯和相关的回应。这种技术对于生成更深思熟虑和有理有据的语言模型回应非常有用。

优点：

1.提高连贯性：帮助语言模型以逻辑和结构化的方式思考问题或问题，这可能导致更连贯和相关的回应。

2.增加深度：提供一系列提示或问题可以帮助语言模型更深入和全面地探索一个主题，可能会导致更有洞察力和信息丰富的回应。

缺点：

1.需要付出努力**：** 思维链技术需要更多的努力来创建和提供必要的提示或问题。

示例：

你是一位来自1901年的虚拟导游。你有游客参观埃菲尔铁塔。向你的观众描述埃菲尔铁塔。从以下几点开始：

1.为什么建造它

2.建造它花了多长时间

3.建造材料的来源

4.建造它需要多少人

5.以1900年代每年参观埃菲尔铁塔的人数，完成一次完整游览需要的时间，以及每年有那么多人参观这个地方的原因结束。

在游览结束时，通过包含1或2个有趣的笑话使你的游览变得有趣。

**####**减少幻觉****

Meta的负责任使用指南

[https://ai.meta.com/static-resource/responsible-use-guide/](https://ai.meta.com/static-resource/responsible-use-guide/) 是理解如何最好地提示和处理语言模型输入/输出风险的极好资源。参考页面（14-17）。以下是语言模型可能产生幻觉的一些示例，以及解决问题的一些策略：

示例1：

语言模型被要求对其未经过训练的主题提出问题的回应。语言模型可能会产生幻觉信息或制造出不准确或无证据支持的事实。

解决方法：为了解决这个问题，你可以向语言模型提供更多关于主题的上下文或信息，以帮助它理解正在提出的问题，并生成更准确的回应。你也可以要求语言模型为其所做的任何声明提供来源或证据，以确保其回应基于事实信息。

示例2：

语言模型被要求对需要特定观点或观点的问题生成回应。语言模型可能会产生幻觉信息或制造出与所需观点或观点不一致的事实。

解决方法：为了解决这个问题，你可以向语言模型提供有关所需观点或观点的额外信息，例如被对话的人或实体的目标，价值观或信念。这可以帮助语言模型理解上下文，并生成与所需观点或观点更一致的回应。

示例3：

语言模型被要求对需要特定语气或风格的问题生成回应。语言模型可能会产生幻觉信息或制造出与所需语气或风格不一致的事实。

解决方法：为了解决这个问题，你可以向语言模型提供有关所需语气或风格的额外信息，例如通信的受众或目的。这可以帮助语言模型理解上下文，并生成与所需语气或风格更一致的回应。

总的来说，避免语言模型产生幻觉的关键是向它们提供清晰和准确的信息和上下文，并仔细监控它们的回应，以确保它们符合你的期望和要求。

## 使用Llama提示

格式：

`<s>[INST]  
{{ user_message }} [/INST]
`

多轮用户提示

`<s>[INST]  
{{ user_message_1 }} [/INST] {{ llama_answer_1 }} </s><s>[INST] {{ user_message_2 }} [/INST]
`

## 推理

以下是一些开始使用您的LLMs进行推理的优秀资源。

Github Llama食谱：

[https://github.com/facebookresearch/llama-recipes/blob/main/docs/inference.md](https://github.com/facebookresearch/llama-recipes/blob/main/docs/inference.md)

Page注意力vLLM：

了解更多

[https://vllm.ai/](https://vllm.ai/)

食谱示例

[https://github.com/facebookresearch/llama-recipes/blob/main/examples/vllm/inference.py](https://github.com/facebookresearch/llama-recipes/blob/main/examples/vllm/inference.py)

Hugging Face TGI：

了解更多

[https://github.com/huggingface/text-generation-inference](https://github.com/huggingface/text-generation-inference)

食谱示例

[https://github.com/facebookresearch/llama-recipes/tree/main/examples/hf_text_generation_inference](https://github.com/facebookresearch/llama-recipes/tree/main/examples/hf_text_generation_inference)

Cuda图表：

了解更多

[https://blog.fireworks.ai/speed-python-pick-two-how-cuda-graphs-enable-fast-python-code-for-deep-learning-353bf6241248](https://blog.fireworks.ai/speed-python-pick-two-how-cuda-graphs-enable-fast-python-code-for-deep-learning-353bf6241248)

## 验证****

俗话说，如果你不能测量它，你就不能改进它，在这一部分，我们将介绍不同的测量和最终验证Llama的方法，以便确定不同微调技术提供的改进。

**####**定量技术****

这些技术的重点是收集可以在每次微调运行期间和之后轻松比较的客观指标，以便快速反馈模型的性能。主要收集的指标是损失和困惑度。

**####**K-折叠交叉验证****

包括将数据集划分为k个子集或折叠，然后微调模型k次。

在每次运行中，使用不同的折叠作为验证数据集，其余的用于训练。每次运行的性能结果平均为最终报告。这提供了一个更准确的模型在整个数据集上的性能指标，因为所有条目都用于验证和训练。虽然它产生了对给定数据集微调后模型如何泛化的最准确预测，但它在计算上昂贵，更适合小数据集。

**####**保留****

使用保留时，数据集被划分为两个或三个子集，训练和验证，测试是可选的。测试和验证集可以分别占据数据集的10% - 30%。顾名思义，前两个子集用于微调期间的训练和验证，第三个只在微调完成后用于评估模型在未见过的数据上的泛化能力。拥有三个分区的优点是，它提供了一种在微调后评估模型的方法，以便无偏地查看模型性能，但它需要稍大的数据集以允许适当的划分。这目前在Llama食谱微调脚本中实现，使用数据集的两个子集，训练

[https://github.com/facebookresearch/llama-recipes/blob/main/src/llama_recipes/finetuning.py#L165](https://github.com/facebookresearch/llama-recipes/blob/main/src/llama_recipes/finetuning.py#L165) 和验证

[https://github.com/facebookresearch/llama-recipes/blob/main/src/llama_recipes/finetuning.py#L174](https://github.com/facebookresearch/llama-recipes/blob/main/src/llama_recipes/finetuning.py#L174) 。数据收集在一个json文件中，可以绘制出来，以便轻松解释结果并评估模型的性能。

**####**标准评估工具****

有多个项目提供标准评估。他们提供预定义的任务，使用常用的指标来评估LLMs的性能，如hellaswag和ThrouthfulQA。这些工具可以用来测试模型在微调后是否退化。此外，可以使用预计微调模型的数据集创建自定义任务，有效地自动化模型性能在微调前后的手动验证。这些类型的项目提供了一种定量观察模型在模拟真实世界示例中的性能的方法。其中一些项目包括LM评估工具 [https://github.com/EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)（用于创建HF排行榜

[https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)）、

Helm

[https://github.com/stanford-crfm/helm](https://github.com/stanford-crfm/helm) 、

BIG-bench

[https://github.com/google/BIG-bench](https://github.com/google/BIG-bench)

和OpenCompass

[https://github.com/open-compass/opencompass](https://github.com/open-compass/opencompass) 。

**####**解读损失和困惑度****

使用的损失值来自Transformer的LlamaForCausalLM

[https://huggingface.co/docs/transformers/main/model_doc/llama#transformers.LlamaForCausalLM](https://huggingface.co/docs/transformers/main/model_doc/llama#transformers.LlamaForCausalLM) ，它根据模型所需的目标初始化不同的损失函数。本节的目标是简要介绍如何理解损失和困惑度的结果，作为微调期间模型性能的初步评估。我们还计算困惑度作为损失值的指数。关于损失函数的更多信息可以在这些资源中找到：1，2，3，4，5，6。

在我们的食谱中，我们在微调期间使用了一个简单的保留。使用记录的损失值，对于训练和验证数据集，绘制两者的曲线来分析过程的结果。根据配方中的设置，预期的行为是一个日志图，显示随着进程的进行，训练和验证损失值逐渐减小。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSjUWZKg9fxDud95eWicFfoYnnX7NZ6bJGs0GSSC7PGKiaLSSZQFM95JYRaE8sqVTic8yNYKNIqno5w/640?wx_fmt=png)

如果验证曲线开始上升，而训练曲线继续下降，那么模型就过拟合了，它的泛化能力不强。当这种情况发生时，可以尝试的替代方案有早停、验证数据集是否是训练数据集的统计显著等价物、数据增强、使用参数高效的微调或使用k折交叉验证来更好地调整超参数。

## 定性技术

****手动测试****

手动评估一个微调过的模型会根据FT目标和可用资源的不同而变化。在这里，我们提供了如何完成它的一般指导原则。

有了一个为微调准备的数据集，其中的一部分可以被分离出来作为一个手动测试子集，这个子集可以通过可能与特定用例相关的一般知识问题进一步增加。除了这些一般问题，我们还建议执行标准评估，并将结果与微调模型的基线进行比较。

为了评估结果，应该定义一个与所使用的数据集相关的明确的评估标准。示例标准可以是准确性、一致性和安全性。为每个标准创建一个评分标准，定义输出获得特定分数所需的条件。

有了这些指导原则，将测试问题分发给一组多样化的审查者，以便为每个问题获得多个数据点。有了每个问题的多个数据点和不同的标准，可以为每个查询计算出一个最终分数，允许根据最终模型的首选焦点对分数进行加权。

**####**集成指南****

## Code Llama

CodeLlama [https://about.fb.com/news/2023/08/code-llama-ai-for-coding/](https://about.fb.com/news/2023/08/code-llama-ai-for-coding/) 是基于Llama 2的开源LLMs家族，提供了在代码任务上的SOTA性能。它包括：

◦基础模型（Code Llama）

◦Python专业化（Code Llama - Python），以及

◦指令跟随模型（Code Llama - Instruct）有7B、13B和34B参数的每个模型。

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSjUWZKg9fxDud95eWicFfoKRwO6ibyianlgj2ia0mmnOr7tuStyHNNXSuTJRghzz8S9u49lwyTjg6sw/640?wx_fmt=png)
*微调的不同阶段用在训练过程中看到的令牌数量进行注释。*

尝试和集成Code Llama的最好方式之一是使用Hugging Face生态系统，按照博客（https://huggingface.co/blog/codellama），其中包括：

◦Code Llama 13B、13B-Instruct（聊天）和34B的演示链接。

◦用于代码完成的工作推理代码

◦用于在代码前缀和后缀之间填充代码的工作推理代码

◦用于在消费者GPU上加载32B模型的4位工作推理代码

◦关于如何为指令模型编写提示以进行多轮编码对话的指南

◦关于如何使用文本生成推理进行模型部署的指南

◦关于如何将代码自动完成作为VSCode扩展集成的指南

◦关于如何评估Code Llama模型的指南

如果模型在你的特定任务上表现不佳，例如，如果Code Llama的所有模型（7B/13B/34B）都不能为文本到SQL的任务生成正确的答案，那么应该考虑微调。这是一个完整的指南和笔记本

[https://github.com/samlhuillier/code-llama-fine-tune-notebook/blob/main/fine-tune-code-llama.ipynb](https://github.com/samlhuillier/code-llama-fine-tune-notebook/blob/main/fine-tune-code-llama.ipynb)，介绍如何使用Hugging Face上的7B模型微调Code Llama。

它使用LoRA微调方法，并可以在单个GPU上运行。如Code Llama参考资料

[https://www.snowflake.com/blog/meta-code-llama-testing/](https://www.snowflake.com/blog/meta-code-llama-testing/) 所示，微调提高了Code Llama在SQL代码生成上的性能，而且对于LLMs能够与结构化数据和SQL（访问结构化数据的主要方式）进行互操作是至关重要的——我们正在开发LangChain和RAG中的Llama 2演示应用来展示这一点。

## LangChain

LangChain（https://www.langchain.com/）是一个用于构建LLM驱动应用的开源框架。它实现了常见的抽象和高级API，使得应用构建过程更加简单，所以你不需要从头开始调用LLM。LangChain的主要构建块/API是：

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSjUWZKg9fxDud95eWicFfoFic9spWkTujbAvNqabO8BnkkH44ra96icc34JHfx6uCbCtG3jwst58BQ/640?wx_fmt=png)
![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSjUWZKg9fxDud95eWicFfod5RCL5xiaq8pTWYI3s7Qia2LxSwsPbaO5JQLp4tZjXlPbER1I9CcBJ7A/640?wx_fmt=png)

模型或LLMs API可以轻松连接到所有流行的LLMs，如Hugging Face或Replicate，这些平台上托管了所有类型的Llama 2模型。

◦Prompts API实现了有用的提示模板抽象，帮助您在构建复杂的LLM应用时轻松重用好的、通常长且详细的提示。还有许多内置的提示用于常见操作，如摘要或连接到SQL数据库以快速开发应用。提示还可以与解析器紧密合作，轻松从LLM输出中提取有用的信息。

◦Memory API可以用来保存对话历史，并将其与新问题一起提供给LLM，从而实现多轮自然对话聊天。

◦Chains API包括最基本的LLMChain，它将LLM与提示结合生成输出，以及更高级的链，让您以系统化的方式构建复杂的LLM应用。例如，第一个LLM链的输出可以是另一个链的输入/提示，或者一个链可以有多个输入和/或多个输出，这些都可以由提示的LLM输出预定义或动态决定。

◦Indexes API允许将LLM外部的文档保存下来，首先将其转换为嵌入，这是文档的数值意义表示，以向量形式存储到向量存储中。后来，当用户输入关于文档的问题时，文档的向量存储中存储的相关数据将被检索并发送，与查询一起，到LLM生成与文档相关的答案。以下流程显示了该过程：

![](https://mmbiz.qpic.cn/mmbiz_png/V08icaMk7MVYSjUWZKg9fxDud95eWicFfoyfRVNr3Pzafcmg1vCjI6shRM1WTovYxcOUPSoZiaD8zBUlia78a88Qxw/640?wx_fmt=png)

◦Agents API使用LLM作为推理引擎，并将其与其他数据源、第三方或自有工具、或API（如网络搜索或维基百科API）连接起来。根据用户的输入，代理可以决定调用哪个工具来处理输入。

LangChain可以作为一个强大的检索增强生成（RAG）工具，将内部数据或更近期的公共数据与LLM集成，进行QA或聊天。LangChain已经支持加载许多类型的非结构化和结构化数据。

要了解更多关于LangChain的信息，可以免费注册两个LangChain短期课程，网址为https://www.deeplearning.ai/short-courses。请注意，课程中的代码使用的是OpenAI ChatGPT LLM，但我们将发布使用LangChain和Llama 2的演示应用。

已经有一个笔记本，于Meta Connect 2023公开发布，公开可用：

[https://github.com/facebookresearch/llama-recipes/blob/main/examples/Getting_to_know_Llama.ipynb](https://github.com/facebookresearch/llama-recipes/blob/main/examples/Getting_to_know_Llama.ipynb)

## LlamaIndex

LlamaIndex是另一个用于构建LLM应用的流行开源框架。像LangChain一样，LlamaIndex也可以通过轻松集成非内置在LLM中的数据来构建RAG应用。LlamaIndex有三个关键工具：

◦连接数据：将任何类型的数据 - 结构化、非结构化或半结构化 - 连接到LLM

◦索引数据：索引和存储数据

◦查询LLM：将用户查询和检索的与查询相关的数据结合起来查询LLM并返回数据增强的答案

## 返回数据增强的答案

LlamaIndex主要是一个用于将私有或领域特定数据与LLMs连接的数据框架，因此它专注于智能数据存储和检索，而LangChain是一个更通用的框架，可以用来构建连接多个工具的代理。也可以将LangChain与LlamaIndex一起使用。此外，这两个框架和现在的VC-based创业公司都在快速发展，所以新的或改进的功能不断被添加以克服其限制 - 例如，最近在LlamaIndex中添加了数据代理，而LangChain已经支持了数十种数据加载器。

我们将很快发布使用LangChina和LlamaIndex与Llama 2的开源演示应用。

**####**社区支持和资源****

## 社区支持

如果您有任何功能请求、建议、错误报告，我们鼓励您在相应的github仓库中报告问题。如果您正在与Meta合作开发Llama 2，请请求访问Asana并使用Asana报告任何问题。

## 资源

**####**Github****

◦Llama2仓库

[https://github.com/facebookresearch/llama](https://github.com/facebookresearch/llama)：主要的Llama2仓库

◦Llama2食谱

[https://github.com/facebookresearch/llama-recipes](https://github.com/facebookresearch/llama-recipes)：示例和微调

◦代码Llama仓库

[https://github.com/facebookresearch/codellama](https://github.com/facebookresearch/codellama)：主要的代码Llama仓库

◦了解Llama2

[https://github.com/facebookresearch/llama-recipes/blob/main/examples/Getting_to_know_Llama.ipynb](https://github.com/facebookresearch/llama-recipes/blob/main/examples/Getting_to_know_Llama.ipynb) - Jupyter笔记本

◦代码Llama食谱

[https://github.com/facebookresearch/llama-recipes/tree/main/examples/code_llama](https://github.com/facebookresearch/llama-recipes/tree/main/examples/code_llama)：示例

**####**性能和延迟****

◦哈梅尔的博客 - 优化和测试LLMs的延迟

[https://hamel.dev/notes/llm/inference/03_inference.html](https://hamel.dev/notes/llm/inference/03_inference.html)

◦vLLM - 如何通过连续批处理在LLM推理中实现23倍的吞吐量同时降低p50延迟

[https://www.anyscale.com/blog/continuous-batching-llm-inference](https://www.anyscale.com/blog/continuous-batching-llm-inference)

◦论文 - 通过提示工程改善压缩LLMs的性能

[https://arxiv.org/pdf/2305.11186.pdf](https://arxiv.org/pdf/2305.11186.pdf)

◦Llama2与GPT 4的文本摘要成本比较

[https://www.anyscale.com/blog/llama-2-is-about-as-factually-accurate-as-gpt-4-for-summaries-and-is-30x-cheaper](https://www.anyscale.com/blog/llama-2-is-about-as-factually-accurate-as-gpt-4-for-summaries-and-is-30x-cheaper)

**####**微调****

◦Hugging Face PEFT

[https://github.com/huggingface/peft](https://github.com/huggingface/peft)

◦Llama食谱微调

[https://github.com/facebookresearch/llama-recipes/blob/main/docs/LLM_finetuning.md](https://github.com/facebookresearch/llama-recipes/blob/main/docs/LLM_finetuning.md)

◦微调数据集

[https://github.com/facebookresearch/llama-recipes/blob/main/docs/Dataset.md](https://github.com/facebookresearch/llama-recipes/blob/main/docs/Dataset.md)

◦GPT 3.5与Llama2微调

[https://ragntune.com/blog/gpt3.5-vs-llama2-finetuning](https://ragntune.com/blog/gpt3.5-vs-llama2-finetuning)

◦https://deci.ai/blog/fine-tune-llama-2-with-lora-for-question-answering/

◦https://www.databricks.com/blog/efficient-fine-tuning-lora-guide-llms

Code Llama

◦https://www.snowflake.com/blog/meta-code-llama-testing/

◦https://www.phind.com/blog/code-llama-beats-gpt4

◦https://news.ycombinator.com/item?id=37248494

****其他****

◦Hugging Face上的Llama

[https://huggingface.co/meta-llama](https://huggingface.co/meta-llama)

◦为生产构建LLM应用

[https://huyenchip.com/2023/04/11/llm-engineering.html](https://huyenchip.com/2023/04/11/llm-engineering.html)

◦提示技巧 [https://www.promptingguide.ai/](https://www.promptingguide.ai/)

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
