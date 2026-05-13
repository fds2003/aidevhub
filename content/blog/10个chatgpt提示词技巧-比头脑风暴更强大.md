---
title: "10个ChatGPT提示词技巧：比头脑风暴更强大"
slug: "10个chatgpt提示词技巧-比头脑风暴更强大"
description: "作者： 我的AI力量 来源： 我的AI力量 我曾听过一个说法：所谓的创造力并不是原创的能力，而是把原有的节点以意想不到的方式连接起来。尽管 ChatGPT 头脑风暴的能力可能比不上人类天才，但它海量的训练数据能够在人类可能想不到的想法之间建立联系。 因此，我常常用 ChatGPT 帮我进行头脑风暴，它能迅速产生很多想法。在这篇文章中，我将分享 10 个我常用的 Cha..."
category: "prompts"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/EdlztXlXpKXcuaZE6S-sUA"
sourceName: "我的AI力量"
readingTime: "35 min"
createdAt: "2023-09-12T16:00:00.000Z"
publishedAt: "2023-09-12T16:00:00.000Z"
featured: false
updateNote2026: |
  以下为 **2026 年** 编辑部补充，**不替代**下文 10 条提示词技巧：

  - **模型与产品形态**：GPT-4o / 4.1、**o 系列推理**、Claude、Gemini 等在「长指令 + 工具调用」上差异明显；同一技巧在不同模型上需微调语气与约束粒度。
  - **Prompt 工程趋势**：**结构化输出（JSON schema）**、**few-shot 位置**、**角色—任务—格式** 三段式更主流；企业侧更强调 **prompt 版本库** 与 **回归用例**。
  - **成本与延迟**：**提示缓存（prompt caching）**、分段 system / developer 消息、减少重复上文，已成为长对话产品的必修课。

updatedAt: "2026-05-13T00:00:00.000Z"
---

作者： 我的AI力量  来源： [我的AI力量](https://mp.weixin.qq.com/s/EdlztXlXpKXcuaZE6S-sUA)

![](https://mmbiz.qpic.cn/mmbiz_png/YRyw2PSSLbZTeibnuZLCoWzMgt1RvUZwfybl29OnGvltWrxwYJ51bQI69E2mVMlK0bVH3NOv1uwkyhp9O5kwe3g/640?wx_fmt=png)

我曾听过一个说法：所谓的创造力并不是原创的能力，而是把原有的节点以意想不到的方式连接起来。尽管 ChatGPT 头脑风暴的能力可能比不上人类天才，但它海量的训练数据能够在人类可能想不到的想法之间建立联系。

因此，我常常用 ChatGPT 帮我进行头脑风暴，它能迅速产生很多想法。在这篇文章中，我将分享 10 个我常用的 ChatGPT prompt技巧，这些技巧可以超越 ChatGPT 的头脑风暴能力。不管你是面临决策困境、遭遇瓶颈难题，还是单纯想寻找新的视角，希望这些prompt技巧都能帮助你从更广阔的角度看问题，发掘隐藏的机会。

让我们开始这个思维的盛宴，给想象力加满油吧!

## # 1️⃣ 思维导图 (Mind Map)：将相关概念通过可视化联系在一起

人类是视觉的动物，通过上万年的进化，我们识别图像并从中获取关键信息的能力比任何大语言模型都强。当你头脑风暴时，不妨要求 ChatGPT 用思维导图的方式系统地链接你的不同想法。这在项目规划、学术研究、个人发展或解决问题等场景中特别有用。通过清晰地展示这些联系，思维导图可以帮助你了解全局、确定任务的优先级、识别潜在的陷阱，甚至产生新的想法。

Prompt: I’m looking to make healthier lifestyle choices. Can you help me with a markdown mind map that connects food choices, exercise routines, and mental health practices? Including headers, emoji icons, and color coding. (我想选择更健康的生活方式。你能帮我绘制一张思维导图，将食物选择、运动习惯和心理健康实践联系起来吗？包括标题、表情图标和颜色编码。)

我把 ChatGPT 生成的 Markdown 粘贴到这个编辑器 ([https://markmap.js.org/repl](https://markmap.js.org/repl)) 里面，就生成了下图所示的思维导图。

![](https://mmbiz.qpic.cn/mmbiz_png/YRyw2PSSLbZTeibnuZLCoWzMgt1RvUZwfIrVkZqfyJf7g99BttrtIfwGMibCLfic4YOlGWFQriaJFec57iajnTIibtQA/640?wx_fmt=png)

👉 [所有人都可以用 ChatGPT 创建高颜值「思维导图」啦](http://mp.weixin.qq.com/s?__biz=Mzk0NTUwOTg0Mw==&mid=2247484344&idx=1&sn=6015e37e943af78dbf1d653e55f7a291&chksm=c3150704f4628e12b85d30010d140b01f66cbfce89684b6f343e6cac0ddd239e4a312a5d55c4&scene=21#wechat_redirect)

## # 2️⃣ 猜测 (Speculate)：对某一话题进行有根据的猜测或假设

这个prompt技巧可以对特定主题进行前瞻性思考和分析推理。它可以让 ChatGPT 对未来趋势、潜在影响或某些事件的发展进行有根据的猜测或假设。这对于规划、决策或仅仅是深化对某个主题的理解来说，都非常有用。无论你是在考虑职业发展、投资策略还是社会变革，基于推测的问题都能产生既深刻又广泛的见解，让你获得更细致入微的看法，从而更好地指导你的行动。

Prompt: Speculate on the job market trends for software developers in the next 5 years considering the growth of automation and remote work. (考虑到自动化和远程工作的增长，预测未来 5 年软件开发人员的就业市场趋势。)

因为 Claude 2 比 ChatGPT 的训练数据更新，所以这个prompt交给 Claude 2 来完成，以下是它的回答：

有几个关键因素可能会影响软件开发人员未来 5 年的就业趋势：

- 

需求持续增长–随着技术在各行各业的不断扩展和发展，软件开发职位可能会保持高需求。人工智能、机器学习、物联网等新兴领域将需要构建新的应用程序/软件。

- 

自动化程度不断提高–低代码/无代码工具和人工智能可将一些基本的编码工作自动化，从而减少对入门级开发人员的需求。但价值较高的复杂开发工作仍然需要熟练的开发人员。自动化可能会取代一些工作，但总体需求仍将保持强劲。

- 

远程工作的灵活性–科技行业已经开始接受远程工作，这将扩大公司的人才库。一些人预测，以自由职业者/承包商身份工作的开发人员也会越来越多。完全远程工作可能会变得更加普遍。

- 

经济条件 - 如果企业缩减投资，经济大幅下滑可能会减缓招聘速度。但是，即使在经济衰退时期，科技领域也被视为一个增长领域。

- 

离岸外包和全球竞争–企业可能会将更多的基础/维护编码工作离岸外包到成本较低的地区。但关键的工程工作仍可能保留在科技中心。

总体而言，对于专注于前沿技术或专业领域创新的熟练软件开发人员来说，未来 5 年的前景是乐观的。掌握最新技能和远程工作的灵活性将成为就业市场的关键优势。但初级职位的竞争可能会更加激烈。

![](https://mmbiz.qpic.cn/mmbiz_png/YRyw2PSSLbZTeibnuZLCoWzMgt1RvUZwfWGgWGiaXPdjvN17AxbwNwKF9k0D7usY26ibmAETXLgVMNM7sDRuC0f9w/640?wx_fmt=png)

你还可以把这个prompt技术应用到其他各个领域：

- 

Speculate on the real estate market’s viability as an investment opportunity over the next decade, particularly focusing on suburban areas versus urban centers. (推测未来十年房地产市场作为投资机会的可行性，尤其关注郊区与城市中心的对比)

- 

Can you speculate on how online education platforms might change traditional classroom settings in post-secondary institutions over the next 10 years? (您能否推测未来 10 年在线教育平台将如何改变大专院校的传统课堂设置)

- 

Speculate on the potential impact of telemedicine on general healthcare costs and accessibility in rural areas for the coming years. (推测未来几年远程医疗对农村地区一般医疗成本和可及性的潜在影响)

- 

With the rise of electric vehicles, can you speculate on how the automotive job market might shift, especially for mechanical engineers specializing in internal combustion engines? (随着电动汽车的兴起，您能否推测汽车就业市场可能会发生怎样的变化，尤其是对内燃机专业的机械工程师而言？)

- 

Speculate on how the growth of renewable energy sources like solar and wind will impact the job market and economic structures of oil-dependent countries. (推测太阳能和风能等可再生能源的增长将如何影响石油依赖国家的就业市场和经济结构)

- 

Can you speculate on how the increasing popularity of streaming services might affect traditional cable companies and local broadcasting channels in the next few years? (你能推测流媒体服务的日益普及在未来几年会如何影响传统有线电视公司和本地广播频道吗)

- 

With the increasing trend of online grocery shopping, speculate on how this shift might impact small grocery stores and local farmers’ markets. (随着网购杂货的趋势越来越明显，请推测这种转变可能会对小型杂货店和当地农贸市场产生怎样的影响)

- 

Speculate on how the normalization of remote work will impact office dynamics, including things like promotions, team cohesion, and employee well-being. (推测远程工作的常态化将如何影响办公室动态，包括晋升、团队凝聚力和员工福利等)

- 

Considering the volatile nature of cryptocurrencies, can you speculate on how they might impact traditional investment strategies like mutual funds and stock portfolios over the next 5-10 years? (考虑到加密货币的不稳定性，你能否推测一下加密货币在未来 5-10 年内会对共同基金和股票投资组合等传统投资策略产生怎样的影响)

## # 3️⃣ 创新 (Innovate)：思考新颖的方法或解决方案

这个prompt技巧可以突破传统思维的界限，激发真正的原创性想法。非常适合那些希望改变现状、引入新视角的人，它为我们打开了一扇通往以前未曾探索过的可能性的大门。

Prompt: I work a 9-5 job and have two young kids. It’s really hard to find time to exercise. What are some creative solutions to incorporate more physical activity into my daily routine? (我朝九晚五地工作，还有两个年幼的孩子。很难抽出时间锻炼身体。有什么有创意的办法能让我在日常工作中增加体育锻炼)

ChatGPT 的解决方案让我耳目一新。作为一个运动达人，此前从未了解过还有这么多种锻炼方式：

平衡朝九晚五的工作、家庭责任和个人健康是一项艰巨的任务。以下是一些将体育锻炼融入日常生活的创新方法：

## 在家

**1.**早晨伸展** ：每天早上花几分钟时间做伸展运动或瑜伽。**

**2.**高能量游戏时间** ：与孩子们一起做跑步、跳跃和跳舞的游戏。**

**3.**厨房锻炼** ：利用做饭或等东西微波的时间做一些迷你锻炼，如深蹲、长腿或壁坐。**

**4.**电视锻炼** ：在看电视的时间，你可以做一些简单的运动，比如仰卧起坐、俯卧撑，或者在广告时间原地慢跑。**

**5.**边打扫卫生边跳舞** ：放点音乐，边打扫屋子边跳舞。**

**6.**爬楼梯** ：如果家里有楼梯，多上下几趟。**

**7.**家庭散步** ：晚饭后与家人一起散散步。**

**8.**运动型电子游戏** ：选择需要身体运动的电子游戏作为家庭游戏时间。**

**9.**后院运动** ：利用花园或后院开展小型体育活动，如飞盘、足球或羽毛球。**

## 工作中

**1.**办公桌锻炼** ：在办公桌上使用阻力带或小重量。**

**2.**步行会谈** ：如果可行，建议步行开会。**

**3.**楼梯间休息** ：利用休息时间上下楼梯。**

**4.**午餐时间** ：用一半的午休时间四处走走，或快速锻炼身体。**

**5.**站立式办公桌** ：考虑使用站立式办公桌或可调节的坐立式办公桌，坐立交替。**

## 外出活动

**1.**把车停在远处** ：去商店购物时，把车停在离入口较远的地方，这样你就不得不多走几步路。**

**2.**积极跑腿** ：考虑步行或骑自行车去完成附近的差事，而不是开车。**

**3.**活动约会** ：计划与配偶的活动约会，比如远足或逛公园，而不是吃晚饭看电影。**

**4.**社交运动** ：参加当地的娱乐体育联盟，投入少但活动量大。**

**5.**携带小重量** ：如果你外出散步，可以携带小的手部负重或佩戴脚踝负重，以增加阻力。**

**6.**等待时间** ：利用等待时间（比如等着接孩子的时候）在车里做一些小运动，比如等长运动或手部握力运动。**

## 应用程序和技术

**1.**健身应用程序** ：使用专为快速、高强度锻炼设计的健身应用程序，你可以在任何地方进行锻炼。**

**2.**健身追踪器** ：记录您的步数并设定每日目标。**

**3.**在线课程** ：利用适合你时间安排的在线健身课程。**

将这些小型锻炼融入你的一天，你就更有可能在不影响工作或家庭时间的情况下实现健身目标。

![](https://mmbiz.qpic.cn/mmbiz_png/YRyw2PSSLbZTeibnuZLCoWzMgt1RvUZwfPiaMPfpRquicEO7BGAzs8lJAibs2xbYnBFFnZsb5Cqoe7rXXl8jMZdx5g/640?wx_fmt=png)

如果你对这个prompt技术感兴趣，不妨从以下prompt中找到更多灵感：

- 

Groceries are getting expensive. We’re a family of four with a $600 monthly budget for groceries, and it’s becoming difficult to stay within that limit. Can you think of innovative ways to stretch our budget? (日用品越来越贵。我们是四口之家，每月的食品日用品预算是 600 美元，现在已经很难控制在这个限额内了。您能想出一些创新的方法来扩大我们的预算吗？)

- 

I’ve noticed that productivity has dipped significantly among my remote employees over the last few months. They’re all using the traditional 9-5 work schedule. What are some novel approaches to reinvigorate their workdays and increase productivity? (我注意到，在过去几个月里，我的远程员工的工作效率明显下降。他们都在使用传统的朝九晚五工作制。有什么新颖的方法可以提升他们工作日的工作效率？)

- 

As a city planner, I’ve noticed that despite having a decent public transportation system, people still prefer to use their own cars. How can we make public transport more appealing through innovative solutions? (作为一名城市规划者，我注意到，尽管我们拥有完善的公共交通系统，但人们仍然更喜欢使用自己的汽车。我们怎样才能通过创新解决方案使公共交通更具吸引力)

- 

My kids are addicted to their tablets. They spend at least 4 hours a day on them. Do you have any novel ideas to reduce their screen time without causing a household revolt? (我的孩子们沉迷于平板电脑。他们每天至少要花 4 个小时在平板电脑上。你有什么新奇的主意，可以在不引起家庭反抗的情况下减少他们的屏幕时间？)

- 

I’m a college professor, and I’ve been struggling to keep my students engaged during online lectures. What are some unconventional ways to boost engagement in a virtual classroom setting? (我是一名大学教授，我一直在努力让我的学生参与到在线讲座中来。有什么非常规的方法可以提高虚拟课堂的参与度？)

- 

I live in a small apartment in the city, and I want to live more sustainably. The traditional advice like growing your own food doesn’t apply here. Can you suggest some innovative methods? (我住在城市的一个小公寓里，我想让生活更可持续。自己种菜等传统建议在这里并不适用。您能推荐一些创新方法吗？)

- 

I’m extremely stressed at work but can’t take a vacation for the next six months due to project commitments. What are some inventive ways to lower my stress levels? (我的工作压力非常大，但由于项目任务，我在未来六个月内都不能休假。有什么新颖的方法可以减轻我的压力)

- 

My spouse and I used to go out for date nights, but with a newborn at home, it’s nearly impossible to leave. How can we have an innovative and romantic date night experience at home? (我和我的配偶过去经常外出约会，但家里有一个新生儿，几乎不可能离开。我们怎样才能在家里度过一个新颖而浪漫的约会之夜呢)

- 

I feel like I’m spending too much time on household chores during weekends, especially cleaning and laundry, which eats into my leisure time. Do you have any groundbreaking tips to streamline these tasks? (我觉得周末花在家务上的时间太多了，尤其是打扫卫生和洗衣服，这侵占了我的休闲时间。你有什么精简这些工作的突破性建议吗)

## # 4️⃣ 确定优先次序 (Prioritize)：按重要性或可行性列出想法或解决方案

这个prompt技巧用于按照重要性或可行性的顺序组织各种任务、目标或方案。在这个时间和资源往往都很有限的世界里，能够有效地确定优先顺序，对于实现预期成果会有很大的帮助。无论您是忙于工作任务，还是希望改善个人生活或做出商业决策，它都能帮助你将繁杂的选择提炼成易于管理和可操作的列表。

Prompt: As a new parent, I’m overwhelmed with advice on what to focus on for my child’s development: potty training, language acquisition, social skills, physical activities, and emotional intelligence. Can you prioritize these developmental aspects based on their age-appropriate significance? (作为一名新手父母，我对孩子的发展建议不知所措：如厕训练、语言习得、社交技能、体育活动和情商。您能根据孩子的年龄特点，为他们的发展排出优先顺序吗)

提交这个prompt时，我激活了一个可以生成图表的插件，ChatGPT 就为了生成了一个时间表。

![](https://mmbiz.qpic.cn/mmbiz_png/YRyw2PSSLbZTeibnuZLCoWzMgt1RvUZwfIm0DRHl7A8f8e1eJRElXsV0sWUsY6rDjrXMibxA1fUndBA2DPwnpwwQ/640?wx_fmt=png)

👉[ChatGPT两种方式无代码生成流程图甘特图等图表](http://mp.weixin.qq.com/s?__biz=Mzk0NTUwOTg0Mw==&mid=2247483898&idx=1&sn=71b47b045a50568d5fd5d69fd537ffa0&chksm=c3150546f4628c50d2c07677cbdcf088ac5e9ae7875b2980fc09b710d7bf2116db5dc4ea7525&scene=21#wechat_redirect)

你可以从以下prompt中获得灵感：

- 

I’m overwhelmed with work tasks this week. I need to complete a project report, attend three meetings, reply to urgent emails, finish a presentation, and prepare a performance review. Can you help me prioritize these tasks? (我本周的工作任务太多了。我需要完成一份项目报告，参加三次会议，回复紧急邮件，完成一次演讲，准备一次绩效评估。您能帮我确定这些任务的优先次序吗)

- 

My house needs a lot of maintenance work. The options are fixing the leaking roof, painting the exterior, repairing the broken fence, servicing the HVAC system, and unclogging the kitchen sink. Can you prioritize these repairs for me based on urgency and cost-effectiveness? (我的房子需要大量维修工作。可以选择修理漏水的屋顶、粉刷外墙、修补破损的栅栏、维修暖通空调系统和疏通厨房水槽。您能否根据紧急程度和成本效益为我安排这些维修工作的优先顺序)

- 

I want to advance in my career and I’ve identified several skills that could be beneficial: learning Python, improving my public speaking, understanding project management, gaining sales techniques, and mastering Excel. Can you prioritize these skills based on their impact on career growth in a corporate setting? (我想在我的职业生涯中有所发展，我已经确定了几项对我有帮助的技能：学习 Python、提高我的公众演讲能力、了解项目管理、掌握销售技巧以及熟练掌握 Excel。您能否根据这些技能在企业环境中对职业发展的影响，对其进行优先排序)

- 

It’s the weekend and I have limited time to do chores. I need to vacuum the house, do the laundry, clean the windows, organize the garage, and go grocery shopping. Can you prioritize these tasks based on their immediate necessity and time consumption? (今天是周末，我做家务的时间有限。我需要用吸尘器打扫房间、洗衣服、擦窗户、整理车库和去杂货店购物。您能根据这些任务的紧迫性和耗时长短排出它们的优先次序吗)

- 

I’m looking to improve my health and have several goals in mind: losing weight, increasing muscle mass, improving cardio health, bettering my sleep, and eating a balanced diet. Can you help prioritize these goals based on their overall impact on my well-being? (我想改善自己的健康状况，有几个目标：减肥、增加肌肉量、改善心血管健康、改善睡眠和均衡饮食。您能根据这些目标对我健康的总体影响，帮助我确定它们的优先顺序吗)

- 

My business is doing well, and I’m thinking of expanding. The options are launching an online store, opening a second location, investing in marketing, partnering with influencers, and diversifying the product range. Can you prioritize these options based on potential ROI and feasibility? (我的生意做得很好，我想扩大规模。可供选择的方案有：开设网店、开设第二家分店、投资营销、与有影响力的人合作以及丰富产品种类。您能否根据潜在的投资回报率和可行性对这些方案进行优先排序)

- 

I’m trying to enrich my life outside of work and am considering various hobbies: learning to play guitar, writing a blog, gardening, painting, and cooking. Can you prioritize these hobbies based on their emotional and intellectual benefits? (我想丰富工作以外的生活，正在考虑各种爱好：学弹吉他、写博客、园艺、绘画和烹饪。您能根据这些爱好对情感和智力的益处，对其进行优先排序吗)

- 

I want to improve my financial situation and have several goals: paying off student loans, building an emergency fund, investing in the stock market, buying a house, and saving for retirement. Can you prioritize these financial goals based on long-term impact and immediate urgency? (我想改善自己的财务状况，有几个目标：偿还学生贷款、建立应急基金、投资股票市场、买房和为退休储蓄。你能根据长期影响和当下紧迫性来确定这些财务目标的优先次序吗)

## # 5️⃣ 查询 (Query)：针对特定主题提出需要回答的问题

要获得一个好答案，首先要有一个好问题。用头脑风暴可能会产生大杂烩式的想法之前，不妨让 ChatGPT 帮你生成某个话题相关的问题。这些问题可以作为深入研究、规划或决策的基础。比如说转行是一个慎重的决定，不妨让 ChatGPT 生成一些问题，看看做这个决定之前有没有考虑过这些问题。

我：

Generate questions that should be answered when considering a career change in my mid-30s. (在我 生成30 岁左右考虑转行时应该回答的问题。)

ChatGPT:

在 30 多岁时考虑转行既令人兴奋，又令人生畏。为了让自己的决定尽可能明智和有目的性，可以考虑问自己以下问题：

## 自我评估：

- 

我的核心优势和技能是什么？

- 

我热衷于什么？

- 

我的价值观是什么？

- 

我的长期职业目标是什么？

- 

我是否有与职业相关的尚未开发的技能或兴趣？

- 

我考虑转行的主要动机是什么？

## 行业和工作评估：

- 

我对哪些行业或领域感兴趣？

- 

这些行业的稳定性如何？

- 

新领域的就业前景如何？

- 

与我目前的职业相比，新职业的收入潜力如何？

- 

与我目前的工作相比，新领域的工作与生活平衡如何？

- 

进入这一新领域有哪些要求（如教育、技能、认证）？

## 财务考虑：

- 

我现在有能力改变职业吗？

- 

我是否有足够的积蓄在过渡期内养活自己？

- 

再培训或获取新资格证书的相关费用是多少？

- 

最初是否需要减薪？如果需要，减薪多久？

## 时间和承诺：

- 

完全过渡到新职业需要多长时间？

- 

获得所需技能或资格需要投入多少时间？

- 

我能否逐步过渡，还是全盘否定？

## 情感方面：

- 

职业变化会如何影响我的家庭和个人生活？

- 

在一个新的领域从较低的职位做起，我感觉如何？

- 

我是否做好了再次成为初学者的准备？

- 

我对做出这种改变有哪些焦虑，如何减轻这些焦虑？

## 建立联系和导师关系：

- 

我是否认识新领域中可以提供建议或指导的人呢？

- 

我怎样才能建立有效的人际网络，使过渡更加顺利？

- 

我应该加入哪些专业组织？

## 风险与应急：

- 

如果事情不顺利，我的 B 计划是什么？

- 

如果有必要，我怎样才能轻松地重返目前的职业？

- 

涉及哪些风险，我是否能承受？

## 人生目标：

- 

这一职业变化如何与我的总体人生目标保持一致？

- 

我是在寻求短期改变还是长期承诺？

- 

新职业是否提供晋升和发展的机会？

## 杂项：

- 

新工作需要我搬迁吗？

- 

这种变化会对我的退休计划产生什么影响？

- 

转行会带来哪些其他非金钱方面的好处（或坏处）？

花时间深思熟虑地回答这些问题，可以帮助您做出明智的决定，并为迎接 30 岁左右转行带来的挑战和机遇做好准备。以下的prompt可以作为参考：

- 

Come up with questions that need answering for creating a personal finance budget. (想出一些需要回答的问题来制定个人财务预算)

- 

What are some questions I should have answered before starting a home renovation project? (在开始房屋翻新项目之前，我应该回答哪些问题)

- 

What questions need answering to successfully transition from an office job to full-time remote work? (要想成功地从办公室工作过渡到全职远程工作，需要回答哪些问题)

- 

What are key questions to consider when trying to improve my social skills and build meaningful relationships? (在努力提高社交技能和建立有意义的人际关系时，需要考虑哪些关键问题)

- 

What questions should be on my checklist when considering launching a new business? (在考虑创办一家新企业时，我的清单上应该有哪些问题)

- 

What questions should I be asking to evaluate and improve my mental health? (我应该问些什么问题来评估和改善我的心理健康)

## # 6️⃣ 详细说明某个行动或决策可能出现的情况 (Map Scenarios)

这个prompt技巧可以探索特定决策或行动可能产生的多个结果或影响。可以帮助个人和团队在采取关键步骤之前更全面地权衡利弊。无论你是在考虑跳槽、重大投资还是改变生活方式，它能让你考虑一系列可能性，从最好的情况到最坏的情况，以及可能影响每一种结果的因素。这种透彻的分析可以指导你做出更有信心的决定。

我：

Map scenarios for quitting my full-time job to pursue freelance work. (如果我辞去全职工作去从事自由职业，可能会发生哪些情况)

ChatGPT:

从全职工作转为自由职业者是一个重要的决定，它会影响你的职业生涯、财务稳定性和整体幸福感。为了帮助你做出更明智的决定，我们来规划一下你可能会遇到的各种情况。

## 场景一：平稳过渡。

****优点：****

- 

你已经攒够了至少6-12个月的生活费。

- 

你有几个自由职业客户在排队，他们可以提供持续的工作。

- 

你的技能需求很高，更容易找到新客户。

****缺点：****

- 

你可能会面临独自工作的孤立。

- 

你的收入可能不稳定，特别是在一开始。

****采取的步骤：** 1.从存足够的钱来缓冲过渡开始。**

2.在还在工作的时候开始兼职，以建立客户基础。

3.制定财务计划和商业模式。

4.当你在经济上和情感上都准备好的时候，就跳起来。

## 场景二：艰难开局。

****优点：****

- 

你有一些积蓄，但不够一整年的开支。

- 

你有一两个客户，但他们不能提供一致的工作。

- 

你的技能有点小众，限制了你的客户基础。

****缺点：****

- 

收入不稳定造成的财务压力。

- 

在管理时间和最后期限方面遇到困难。

****采取的步骤：****

1.考虑一份兼职工作或其他收入来源，以补充你的自由职业。

2.努力拓宽你的技能，以吸引更多的客户。

3.建立广泛的网络，考虑低成本的营销选择。

4.做好必要时调整生活方式以减少开支的准备。

## 场景三：起步错误

****优点：****

- 你对自由职业充满热情。

****缺点：** 。**

- 

储蓄甚至不足以支付短期费用。

- 

没有客户排队。

- 

你的技能要么太笼统，要么太小众，很难找到工作。

****采取的步骤：** 。**

1.评估现在是否进行过渡的适当时机。

2.如果你仍想继续，考虑搬回家或大幅减少开支。3.积极建立关系网，可能会承担建立投资组合的公益工作。

## # 4.投资于技能发展。

## 场景四：慢而稳。

****优点：****

- 

有足够的储蓄来支付3-6个月的生活费。

- 

一些客户排队，但不足以取代你的全职收入。

- 

需求适中的技能。

****缺点：****

- 

增速缓慢。

- 

一定程度的金融不稳定。

****采取的步骤：** 1.在不辞掉工作的情况下开始兼职。**

2.制定具有增长里程碑的财务计划。

3.与潜在客户建立网络，并要求推荐。

4.考虑共处空间或社交活动，以对抗孤立感。

## 场景五：副业

****优点：****

- 你在兼职的同时保持你的全职工作。

****缺点：****

- 

工作和生活的平衡可能会变得具有挑战性。

- 

与你的全职工作存在潜在的利益冲突。

****采取的步骤：****

1.确保你的雇佣合同允许兼职自由职业者。

2.精心安排你的时间。

3.每季度评估一次，以决定是时候完全过渡到自由职业了，还是边干边干就够了。记住，每个人的自由职业经历都是独一无二的，你的旅程可能会包含各种场景的元素。关键是尽可能周密地计划，并为不确定因素做好准备。

还有一些prompt可以参考下：

- 

Map scenarios for what could happen if I accept the job offer from Company A, which is a startup, instead of staying at my current job at Company B, a well-established corporation. (.设想一下，如果我接受初创公司A的工作邀请，而不是留在B公司的现有工作，会发生什么情况。B公司是一家历史悠久的公司)

- 

Map scenarios for what might happen if my company decides to continue remote work indefinitely. (设想如果我的公司决定无限期地继续远程工作可能会发生的情况)

- 

Map scenarios for what could happen if I invest 20% of my savings in cryptocurrency. (设想如果我将20%的储蓄投资于加密货币可能会发生的情况)

- 

Map scenarios for relocating to City X for a job opportunity, compared to staying in my hometown. (将搬到X市寻找工作机会与留在家乡的情景进行比较)

- 

Map scenarios that could unfold if our team adopts new project management software. (设想如果我们的团队采用新的项目管理软件可能会出现的场景)

- 

Map scenarios for what could happen if I take a gap year before starting college. (设想一下，如果我在上大学前休学一年，可能会发生什么)

## # 7️⃣ 针对流行或被广泛接受的想法提出反对观点 (Devil’s Advocate)

这个prompt技巧通过提出反对的论点来挑战被广泛接受的信仰或传统智慧。To play the devil’s advocate 字面意思是扮演魔鬼的代言人，实际是指为了帮助同事或朋友对某个问题考虑得更周到，堵塞漏洞而故意提出不同意见。它鼓励批判性思维，促使你考虑普遍接受的想法的潜在缺点或局限性，从而使你拥有一个全面的视角。这种方法在小组讨论、决策过程以及任何需要批判性思维和透彻分析的情况下都特别有用。

prompt举例：

ChatGPT, can you play Devil’s Advocate and provide arguments against the idea that maintaining a work-life balance is always good? (ChatGPT，你能否扮演 “魔鬼代言人 “的角色，提出反对 “保持工作与生活的平衡总是好的 “这一观点的论据)

ChatGPT:

当然，扮演魔鬼的代言人可以通过展示不同的观点来更全面地探索一个主题。重要的是要注意，这些不一定是我自己的观点，但它们是一些人可能会提出的论点，反对保持工作和生活平衡总是好的想法。

**1.**机会成本** ：关注工作和生活的平衡可能意味着牺牲需要全身心投入和长时间工作的职业机会。这可能会在竞争激烈的领域产生影响。**

**2.**财务考虑** ：在某些情况下，工作更多时间或为事业投入更多时间可以带来更大的财务保障或向上流动。对于一些人来说，这样做的好处可能超过了个人时间的成本。**

**3.**激情计划** ：有些人对工作充满激情，对他们来说，工作和生活之间的界限变得模糊了。这些人可能会发现他们的工作很有成就感，不会觉得花更多的时间去做工作是一种负担。**

**4.**经济必要性** ：在某些情况下，由于经济压力，人们无法奢侈地维持工作和生活的平衡。多份工作或长时间工作可能是生存所必需的，平衡的概念变得次要于眼前的需求。******

**5.**创业文化** ：在创业的世界里，这种文化往往包括长时间工作和全身心投入到项目中。这可能会带来业务增长或重大创新等成功结果。******

**6.**社会贡献** ：医疗保健、急救服务等高责任工作有时需要一个不平衡的工作和生活结构。可以提出的论点是，为了更大的利益，牺牲个人平衡是值得的。******

**7.**时间因素** ：在一个生命周期内，平衡的概念可能不同。例如，年轻人可能更喜欢把重点放在职业发展上，而那些接近退休的人可能想要转向更多的休闲和家庭时间。在这个观点中，“平衡”不是一个静态的概念，而是随着生活环境的变化而变化的。******

**8.**文化差异** ：一些文化更加强调工作是身份和价值的来源。在这种情况下，工作与生活的平衡可能不会得到同样的重视，甚至可能被视为缺乏奉献。******

**9.**个人成就感** ：一些人从他们的工作中获得巨大的个人满足感和使命感，以至于其他生活活动可能看起来不那么有成就感。对于这些人来说，不平衡的工作和生活实际上可能会改善他们的整体幸福感。******

**10.**天生倾向** ：有些人是天生的工作狂，在高压环境中茁壮成长。对他们来说，围绕工作和生活平衡的传统智慧可能不适用，没有平衡，他们可能会过得更好。**

同样，这些观点只是为了讨论而提出的反驳观点，并不一定反映我个人或任何特定个人或团体的观点。

你还可以从以下prompt中获得一些灵感：

- 

Many people believe that earning a college degree is crucial for success in today’s job market. Can you argue against this widely accepted notion? (许多人认为，获得大学学位是在当今就业市场取得成功的关键。你能反驳这一广为接受的观点吗)

- 

The open-office layout is often championed for fostering collaboration and enhancing productivity. Can you make the case against it? (开放式办公室的布局通常是为了促进合作和提高生产率。你能提出反对它的理由吗)

- 

The phrase “the customer is always right” is considered a standard in customer service. What arguments can be made against this approach? (“客户永远是对的”这句话被认为是客户服务的标准。有什么理由反对这种做法)

- 

The prevailing wisdom suggests that the more exercise you do, the healthier you are. Can you argue against this idea? (流行的观点认为，你锻炼得越多，你就越健康。你能反驳这个想法吗)

- 

Remote work is often touted as the future of employment, offering greater flexibility and work-life balance. Can you provide counterarguments to this? (远程工作经常被吹捧为就业的未来，它提供了更大的灵活性和工作与生活的平衡。你能对此提出反驳吗)

- 

It’s a popular belief that multitasking can help you get more done in less time. Can you provide arguments against the efficacy of multitasking? (人们普遍认为，同时处理多项任务可以帮助你在更短的时间内完成更多工作。你能给出反对同时处理多项任务的有效性的理由吗)

- 

The advice to “follow your passion” is frequently given to those looking to choose a career or make a life change. Can you make the case against this popular sentiment? (那些想要选择职业或改变生活的人经常会得到这样的建议：“追随你的激情”。你能反驳这种普遍的情绪吗)

## # 8️⃣ 层层构思，从基本概念开始，增加复杂性 (Scaffold)

Sacffold 的意思是脚手架，它形象地说明这个prompt技巧从一个基本的想法或概念开始，然后系统地叠加更多、更复杂的元素。它在解决问题、规划或学习场景中特别有用，可以帮助我们从基础出发，然后步步为营，构建起解决问题的方案。

Prompt: Scaffold a three-month fitness routine for beginners (为初学者制定为期三个月的健身计划，从简单到复杂，步步为营)

提交了这个prompt之后，ChatGPT就为我生成了一个非常系统的健身计划。

## 第一个月：夯实基础

*****第1-2周：简介****

`* 有氧：步行或慢跑20分钟，每周3次。

* 力量：基本的体重练习，如下蹲、俯卧撑和平板支撑，每周2次。

* 灵活性：伸展或瑜伽10分钟，每周2次。
`

*****第3-4周：强度增加****

`* 有氧：增加到30分钟，每周3次。

* 力量：增加轻微的哑铃练习，每周2次。

* 灵活性：将伸展运动或瑜伽增加到15分钟，每周2次。
`
## 第二个月：持之以恒

*****第1-2周：持之以恒****

`* 有氧：30分钟，每周4次。

* 力量：引入更多的复合练习，如举重和仰卧撑，每周3次。

* 灵活性：每周3次，20分钟伸展或瑜伽。
`

*****第3-4周：变化****

`* 有氧：介绍骑自行车或游泳，每周4次。

* 力量：增加更多的套装或代表，每周3次。

* 灵活性：引入动态伸展，每周3次。
`
## 第三个月：强度和专业化

*****第1-2周：强度****

`* 有氧：40分钟，每周4次。

* 优势：引入更先进的技术，如超级组，每周3次。

* 灵活性：25分钟伸展或瑜伽，每周3次。
`

*****第3-4周：专业化认证** 。**

`* 有氧：高强度间歇训练(HIIT)，每周2次。

* 力量：专注于薄弱部位或肌肉群，每周3次。

* 灵活性：专门的瑜伽或普拉提课程，每周3次。
`

然后我用 ChatGPT 帮我做了一张流程图。

![](https://mmbiz.qpic.cn/mmbiz_png/YRyw2PSSLbZTeibnuZLCoWzMgt1RvUZwfXF6tOcyKcnahtuN3hHkrDib10qbiaUKcPVNj0F8XbTPzSd3fyiaYo6G5Q/640?wx_fmt=png)

下面还有一些示例：

- 

Scaffold a plan for a two-week family vacation, beginning with selecting a destination and then layering in activities, accommodations, and a packing list. (制定一个为期两周的家庭度假计划，从选择目的地开始，然后层层安排活动、住宿和装箱单)

- 

Scaffold ways to improve office productivity. (逐步系统化地提高办公室工作效率的方法)

- 

I want to learn cooking. Scaffold a learning plan that starts with mastering basic techniques and then layers in more complex recipes and eventually international cuisines. (我想学烹饪。建立一个学习计划，从掌握基本技术开始，然后层层掌握更复杂的食谱，最后是国际菜肴)

- 

Scaffold a plan for improving my public speaking skills. (制定一个提高我公共演讲能力的计划。从基本的练习开始，让你在镜子前自如地讲话，然后增加几个层次，比如观众参与技巧和掌握视觉辅助工具的使用)

- 

Scaffold steps for creating an emergency preparedness plan for a household. (为家庭创建应急准备计划。从确定可能的紧急情况等基本步骤开始，然后逐步加入更复杂的元素，如资源分配和沟通策略。)

## # 9️⃣ 产生尽可能多的开箱即用的想法，无论多么不切实际 (Freewheel)

这个prompt技巧鼓励产生既独特又非传统的想法来发挥无限的创造力。典型的头脑风暴可能会优先考虑可行性或实用性，但这个方法故意把这些放在一边，转而专注于突破可能的界限–甚至是想象力的边界。其目的是在不受现实主义限制的情况下，让广泛的想法浮出水面，从而潜在地发现新的解决方案或观点。

Prompt: I have a high-stress job and typical stress management techniques aren’t cutting it for me. Freewheel some wildly unconventional methods to help me manage or even eliminate stress. (我的工作压力很大，典型的压力管理方法对我来说并不奏效。Freewheel 一些非常规的方法可以帮助我管理甚至消除压力)

来看看 ChatGPT 脑洞打开的回答：

**1.**金属音乐声浴** ：想象躺在地上，周围是扬声器在播放Metallica (重金属摇滚)或Slayer。不是每个人的菜，但一些人发现这种喧闹、狂热的经历是一种很好的压力释放方式。**

**2.**泥浆摔跤** ：虽然这可能不是常规的，但在泥坑里摔跤可能就是你需要的宣泄体验。体力消耗和泥浆的触觉相结合可以缓解紧张。******

**3.**养一只羊驼** ：动物辅助疗并不新鲜，尽管如此，花时间和这种古怪的动物在一起纯粹是一种新鲜感，可能会缓解压力。******

**4.**尖叫** ：拉一群好友前往偏僻的地方。我数到三，每个人都大声尖叫。这是一种解脱，可能还能缓解压力。******

**5.**倒车日** ：在某天把所有事情倒着做。例如倒着走，先吃餐后甜点等等。它的新鲜感会迫使你身临其境，可能会暂时缓解你的压力。******

**6.**夜间森林沐浴** ：日本人的“森林沐浴”可以让人平静下来。试着在晚上做这件事，增加一层额外的神秘和平静。******

**7.**边玩边冷冻疗法** ：你可能听说过寒冷暴露的好处。在摆弄一些豆袋的同时尝试一下快速冷冻治疗怎么样？认知挑战和寒冷结合在一起可能会帮助你的大脑重新启动。**

**8.**维京战斧投掷** ：与你内心的勇士取得联系。成功地投掷斧头所需的注意力可以作为一种积极的冥想形式。**

**9.**虚拟现实销毁** ：使用VR进入一个满是物品的虚拟房间，然后进行销毁。这一切都是虚拟的，所以没有坏处，但它可能有助于缓解一些压力。******

**10.**黏液疗法** ：使用 “粘液 “成分自制一个压力球，然后将其挤压和拉伸。加入一些香薰气味，让你更加放松。******

**11.**垃圾邮件折纸** ：与其回收垃圾邮件，不如把它变成折纸雕塑。你会如此专注于褶皱，以至于你可能会忘记你的担忧。******

**12.**水下编篮** ：不，这不只是电影里的笑话。这门手艺需要如此多的注意力，以至于你可能会发现很难考虑其他事情。**

**13.**自发跳舞** ：在一天中随机选择一个时刻开始跳舞。如果可能的话，让陌生人参与进来。情况越有趣越好。******

**14.**月亮嚎叫** ：说真的，对着月亮嚎叫。这是释放我们祖先可能用过的压力的最基本的方式。******

**15.**寻宝** ：在你的工作场所或家中为自己设置一个寻宝活动。**

## # 🔟 假设 (Hypothesize)：创建测试以验证或证伪

这个prompt技巧鼓励 ChatGPT 生成经过深思熟虑的猜测或假设，这些猜测或假设可以被测试和评估其有效性。ChatGPT 还可以生成测试这些假设的方法。

我：

Prompt: Our small bakery has seen a decline in sales over the last quarter. Hypothesize what factors might be leading to this decrease and create testable statements to confirm or disprove these hypotheses. (我们的小型面包店在上个季度的销售额有所下降。请推测可能导致销售额下降的因素，并创建可检验的陈述来证实或反驳这些假设)

ChatGPT:

当然，可能有多种因素导致你的面包店销售额下降。以下是一些假设以及用于验证或使其无效的可测试语句：

## 假设

## 1.区域内客流量减少

**假设 ：该地区客流量减少可能是导致销售额下降的原因之一。**测试陈述** ：统计一天中不同时间段走过面包店的人数，并与去年同期的类似计数进行比较。
## 2.产品质量变化。

**假设 ：烘焙食品质量的变化可能会让顾客望而却步。**可测试声明** ：使用新旧食谱（如果有任何改动）对忠实顾客进行盲测，以了解他们的偏好。
## 3.竞争加剧

**假设 ：该地区的新面包店或食品企业可能正在抢走顾客。**测试陈述** ：调查客户，询问他们为什么选择您的面包店而不是其他面包店，以及他们多久光顾竞争对手一次。
## 4.经济下行

**假设 ：糟糕的经济环境可能导致消费者支出减少。**测试陈述** ：将销售数据与失业率或消费者支出指数等地方或国家经济指标进行比较。
## 5.季节变化

**假设 ：季节变化可能会影响人们想要购买的烘焙食品的类型。**测试陈述** ：分析特定季节产品的销售数据，看看是否存在与季节相关的模式。
## 6.价格变化

**假设 ：最近价格的变化可能会让客户望而却步。**测试陈述** ：A/B测试不同的定价策略，看看哪种策略的销售额更高。
## 7.降低营销力度

**假设 ：广告或促销减少可能导致知名度下降。**测试陈述** ：分析促销活动前后的网站和社交媒体流量，以评估影响。
## 8.员工绩效

**假设 ：糟糕的客户服务或较慢的服务可能会影响销售。**测试陈述** ：进行秘密顾客访问，评估员工表现和客户服务。
## 9.更改营业时间

**假设 ：改变营业时间可能会给老客户带来不便。**测试陈述** ：调查客户当前的商店时间是否与他们喜欢的购物时间一致。
## 10.产品上市

**假设 ：热门商品经常缺货可能会让顾客感到沮丧。**测试陈述** ：跟踪热门商品的库存水平，并与客户投诉或反馈相关联。
## 如何测试

1.**数据收集** ：根据每个假设的可测试语句收集相关数据。这可能包括销售数据、客户调查、客流量统计等。2.**分析** ：使用统计工具分析数据，得出哪些假设最有可能成立的结论。3.**行动和重新测试** ：根据经过验证的假设进行更改，并衡量其对销售的影响。通过系统地测试这些假设，您可以更全面地了解影响您的销售额下降的因素，并制定有针对性的改进策略。

如果你想把这个方法应用到其他场景，可以从下面的prompt中得到启发：

- 

Hypothesize on why our last digital marketing campaign didn’t increase web traffic as expected, and provide testable statements that we could use for future campaigns to validate or invalidate these hypotheses. (假设我们上一次的数字营销活动为什么没有像预期的那样增加网络流量，并提供可测试的声明，我们可以在未来的活动中使用这些声明来验证或推翻这些假设。)

- 

I’ve noticed that my productivity tends to dip in the afternoon when working from home. Hypothesize why this may be the case and offer testable statements to help me investigate this further. (我注意到，我在家工作的时候，下午的工作效率往往会下降。假设为什么会这样，并提供可测试的陈述来帮助我进一步调查这一点)

- 

I’ve been on several job interviews lately but haven’t received any offers. Hypothesize possible reasons why I’m not landing the job and suggest testable statements that I can use to validate or invalidate these theories. (我最近参加了几次求职面试，但没有收到任何录用通知。假设我没有得到这份工作的可能原因，并建议我可以用来验证或推翻这些理论的可测试的陈述)

- 

My partner and I have been arguing more frequently. Hypothesize potential root causes and give me some testable statements to validate these possible reasons. (我和我的伴侣争吵得更频繁了。假设潜在的根本原因，并给我一些可测试的陈述来验证这些可能的原因)

- 

My posts on social media platforms are getting fewer likes and shares than before. Hypothesize reasons behind this drop in engagement and provide testable statements that can help me improve. (我在社交媒体平台上的帖子获得的赞和分享比以前少了。假设参与度下降背后的原因，并提供可测试的声明，以帮助我提高)

- 

We’ve had a higher employee turnover rate this year compared to previous years. Hypothesize the potential reasons for this increase in turnover and suggest testable statements to confirm or refute these hypotheses. (与往年相比，我们今年的员工流失率较高。假设营业额增加的潜在原因，并提出可验证的陈述来证实或驳斥这些假设)

## # 结语

以上的prompt仅供参考，要让 ChatGPT 真正为你的独特需求提供可操作的建议，最好在prompts中提供详细的背景和目标。当你得到一个比较满意的答案，不妨发挥创造力优化一下。请记住，你的独特见解仍然是最宝贵的资产。

最后，喜欢本文的话，不妨点个【在看】分享给更多的人🤗

更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
