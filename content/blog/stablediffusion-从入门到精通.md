---
title: "StableDiffusion：从入门到精通"
slug: "stablediffusion-从入门到精通"
description: "作者： 一码当先 来源： 一码当先 从最初的安装与配置，细至界面功能的详解，再至实战案例的制作，乃至高品质模型的下载，每一步骤皆有细致的指导，且以一个个生动的例子予以演示，不仅令诸位不再只是枯燥地观摩，更能让你们阅后即行，轻松创作出相似的绘画之作。 AI免费学习基地 https://xmgtoagi.feishu.cn/wiki/S9BwwRcXciCz8BkA4uoc..."
category: "ai-news"
tags: ["chatgpt", "AI", "AI聊天", "AI文本生成", "AI绘画", "AI编程", "AI电商"]
author: "AiBard123"
sourceUrl: "https://mp.weixin.qq.com/s/aygn9tDRWo7y-NobHzKpwA"
sourceName: "一码当先"
readingTime: "26 min"
createdAt: "2024-04-16T16:00:00.000Z"
publishedAt: "2024-04-16T16:00:00.000Z"
featured: false
---

作者： 一码当先  来源： [一码当先](https://mp.weixin.qq.com/s/aygn9tDRWo7y-NobHzKpwA)

从最初的安装与配置，细至界面功能的详解，再至实战案例的制作，乃至高品质模型的下载，每一步骤皆有细致的指导，且以一个个生动的例子予以演示，不仅令诸位不再只是枯燥地观摩，更能让你们阅后即行，轻松创作出相似的绘画之作。

**AI免费学习基地 [https://xmgtoagi.feishu.cn/wiki/S9BwwRcXciCz8BkA4uoc67UBnBf](https://xmgtoagi.feishu.cn/wiki/S9BwwRcXciCz8BkA4uoc67UBnBf)

同时，无论是安装包、庞大的模型，还是Lora，乃至关键词文件，均已妥善地打包，无需自行翻找，节省了不少心力。期望这篇教程能够让各位轻松掌握稳定扩散技术，只需阅读此文一篇，即可心满意足！

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsLwFRheP4VDQ9fBOnu43CMTe9icu3ibtGXtA4VJPW55bnDx7qsy2guSJQ/640?wx_fmt=png&from=appmsg)

****一、为什么要学习使用Stable Diffusion****

****1.1 Stable Diffusion能干嘛？它是有多强大？****

Stable Diffusion的应用领域包括：真人AI美女，生成头像、壁纸、绘画辅助
我相信各位在浏览视频时，多多少少已经见过许多由人工智能生成的艺术绘画作品。下面详细的分别介绍。

**1.1**真人AI美女/女友****

我们最常看到的就是这些真人AI美女的账号

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsP4Qwk3tlQJZKVMPkwNIjibEXPRSE3c2eVEk4fPv36yyswiaMxejEfWuQ/640?wx_fmt=png&from=appmsg)

**1.2**绘画辅助****

SD也可用于协助绘制动漫画、插画等作品，例如线稿上色或获取图画的线稿等。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsDF3pN1wUyvoVZKyP0diatGrF4jkjQIibLHiaENo5UfmWnoa94Sia4WKWOw/640?wx_fmt=png&from=appmsg)

**1.3**生成头像、壁纸****

过去，人们常常花费金钱请他人定制独特的头像或壁纸，而现在，SD可以用来制作个性化的二次元头像、盲盒模型或者定制壁纸。

****1.2 Stable Diffusion是什么？****

Stable Diffusion的定义：
简而言之，Stable Diffusion（简称SD）是一种人工智能生成图像的软件。通过输入文字描述，SD能够生成对应的图片，无需像以往那样需要手工"绘制"或"拍摄"照片。

有人可能会问，学习一个软件之前是否需要先了解其原理？我的回答是：不需要！

下方是我在网上保存的SD的原理图，能看懂吗？看不懂，我也看不懂。这会影响我们的使用吗？完全不会！

很多人想学习Stable Diffusion，在网上搜索后，大多数教程都会首先介绍SD的原理。然而，这一步骤却让很多人望而却步，不再继续学习。因为看起来似乎非常复杂和困难。

事实上，我们大多数人只需要能够熟练使用SD，而无需深入研究其原理。我们还有自己的学习和工作。因此，我们的目标是以更少的时间快速入门Stable Diffusion。当然，如果你有足够的时间和兴趣去深入了解SD的原理，那也是可以的。

我提及这些是为了告诉大家，学习SD真的非常简单！本文将通过一系列案例，实际操作生成各种照片。

相信当你阅读完本文并亲自尝试之后，你将能够快速上手Stable Diffusion！

接下来，我们将正式开始使用Stable Diffusion！

****二、3分钟教你快速部署Stable Diffusion****

****1.MacOS系统本地部署教程：****

Stable Diffusion搭建教程（MacOS）推荐：MacOS系统(M1/M2)安装AI绘画StableDiffusion保姆级教程

****2.Windows系统本地部署教程：****

****使用前提注意下：****

为了确保大家能顺利安装和使用Stable Diffusion（简称为"SD"），在正式安装之前，我建议大家先检查一下电脑的配置。请注意以下两点：

- 

电脑系统：确保你的电脑系统是Windows 10或Windows 11。

- 

为避免兼容性问题，不要选择更低版本的系统。你可以通过以下步骤查看电脑系统：

- 

在桌面上右键点击"我的电脑"或"This PC"

- 

选择"属性"，然后查看Windows版本信息

- 检查电脑性能：

最核心的关键点：看显卡、看内存、看硬盘、看CPU。其中最重要的是看显卡，显卡N卡（英伟达Nvida显卡，A卡用不了），最低10系起步，显存最低4G，6G及格；内存最低8G，16G及格；硬盘可用空间最好有个500G朝上，固态最佳，机械硬盘也没多大问题。CPU其实没太大要求，有好显卡的，CPU一般不会很差。

- 这是用来确定你的电脑配置是否足以支持SD（Stable Diffusion）的运行。

- 

右键点击任务栏底部的空白区域，选择"任务管理器"

- 

在任务管理器中，切换到"性能"选项卡

查看"内存"部分，这里显示的是运行内存（RAM），而不是存储内存（硬盘空间）。
注意关注标记处的数值，例如16GB表示你的内存配置可以正常使用；8GB表示勉强满足最低要求；32GB左右则意味着你的内存配置非常适合SD的运行。

- 

检查"GPU"（显卡）：

首先查看右上角的显卡名称或型号。确保是"NVIDIA"，代表使用的是英伟达（Nvidia）的显卡。
只有在使用"NVIDIA"显卡的情况下才能进行下一步操作。

然后，注意下划线标记的专用显存（GPU内存）数值。如果电脑的显存约为4GB，说明勉强能够运行SD，但生成图片的时间可能较长。
如果显存约为6GB，你每张图片的生成时间将在20-50秒之间，并且可以使用SD的大部分功能。
如果显存约为8GB，你每张图片的生成时间将在5-20秒之间，并且几乎可以使用SD的所有功能。

****本地部署正式开始：****

小白解压即用

电脑配置能支持SD运行的朋友们，接下来我会手把手教你安装SD的本地部署，这里我们用到的是B站秋叶分享的整合包，小白直接下载整合包可以避免很多困难。整合包点开链接就能下载保存啦

****下载链接****

[https://pan.quark.cn/s/2750beda9269](https://pan.quark.cn/s/2750beda9269)

①请点击上述链接，下载并保存到你的电脑本地。

②打开你保存的文件夹，在文件夹中找到《整合包主包》=》《1.秋叶整合包主包》，右键点击该文件，然后选择"解压文件"。

③选择将文件解压到D盘或E盘，注意不要占满C盘！点击"确定"。

⑤解压完成后，安装启动器的依赖环境.net core 6.0。点击"安装"。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsLIJaHicQfT0BTOiaRHMV60mSibmTndzOlIRqqBr3Njm4Coz8mmoQ1j4lA/640?wx_fmt=png&from=appmsg)
⑥打开刚刚解压的SD根目录，找到启动器文件。右键点击启动器，选择"发送到"，然后选择"桌面快捷方式"。
这样下次就可以直接从桌面双击启动器进入，无需每次都去文件夹中寻找。
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsEOyU1A423ic7PWCr3VcCNNX8iaF3Hn8oEUsOyu1njjew66ANydyPewNw/640?wx_fmt=png&from=appmsg)
⑦双击启动器，等待更新完成。然后点击左侧的"高级选项"，在"显存优化"中根据你的显存选择（即上面查看的专用GPU内存），
选择与你的电脑显存相对应的选项。

⑧返回到第一个一键启动界面，点击右下角的"一键启动"按钮。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsCUehY8bz615HIuxSX0ibqHRydwia81UEIUpGcop6Av019SGpsZmxDl1Q/640?wx_fmt=png&from=appmsg)

如果出现代码页面，请不用理会，稍等片刻！SD的主界面将自动在浏览器中弹出。

如果在上述页面出现错误，请返回初始界面，点击左侧的"疑难解答"，然后点击右侧的"开始扫描"。
最后点击"修复"按钮。

下方是SD的主页面。不要被这个复杂的界面吓到，实际上，我们在基础使用中并不需要使用所有的功能。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGssbaGGTQGt3ufbOjPUN4kAES9871QZ2FRZ4KJwNfVPFMUO5h4NrxjGw/640?wx_fmt=png&from=appmsg)

****3.云端白嫖部署玩法：****

AI绘画StableDiffusion：云端在线版免费使用笔记分享（Kaggle版）

免费2：https://www.liblibai.com/

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsQnZI0BfvtpASqDzfG050iaKYsX7xlHlhJzc8SQwBiab7wQgmLsW5lOSA/640?wx_fmt=png&from=appmsg)

****4.低配置电脑的云端玩法：****

对于那些发现自己电脑配置可能无法胜任SD的朋友们，不用担心，通过云平台，我们仍然可以尽情享受SD的乐趣，创作出精美的图片。

云平台就好比我们远程控制配置更好的电脑，在别人的电脑上使用SD生成照片。这里推荐的是"青椒云"平台，如果大家知道其他更好用的平台，也欢迎分享！点击下面的链接即可下载青椒云：

[https://account.qingjiaocloud.com/signin](https://account.qingjiaocloud.com/signin)

以下是云平台的使用方法：

- 

点击上述链接，注册一个账号。

- 

下载并安装青椒云后，使用刚刚注册的账户登录。

- 

点击右上角的个人中心进行实名认证。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGszEgCCmYiaE24OqzUHEVesfia2SVXVKIF6HaoulQqbdICKUzaacMA75wQ/640?wx_fmt=png&from=appmsg)

- 完成实名认证后返回主界面，点击"新增云桌面"。如果你想使用Stable Diffusion，可以选择"AIGC尝鲜"，一般新注册的用户会有优惠券可免费试用。你可以先试用一下，觉得好用再决定是否付费。（大多数云平台的费用通常是每小时2-3元）

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsfAzkpLbCc9EoHkXpFUpbrHySRvibqCGTHN1GP9cW76nqCibEmyF3P6aw/640?wx_fmt=png&from=appmsg)

- 在弹出的框框中点击"开机"按钮，稍等片刻后点击"进入桌面"。
进入桌面后，可以关闭弹出的所有框框。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs75EY2Hr6AofvjUrHhmELqkt0ribibGnflHVhR08SD6JFBw1W64NthFGw/640?wx_fmt=png&from=appmsg)

- 点击打开的桌面上的"此电脑"，然后在C盘中找到SD的根目录，并点击"A启动器.exe"。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsR5K55tiadmsSpW8uv55IbKQSyibFot9uqNIagJTFhzceL4VwOSB6dnfg/640?wx_fmt=png&from=appmsg)

- 点击右下角的"一键启动"按钮，就可以进入SD啦！

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsbX5EU1POUI8dv7pzYGyumgF78gIrjqciaOLL0ayIny4prYdUyzqopQQ/640?wx_fmt=png&from=appmsg)

- 使用完云平台后，记得关机哦，否则会持续计费。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsy9a1adibOvqBmLPH19iciaco0G5arOib3JnVdicAW6cl7pD4j31aM4jicNWA/640?wx_fmt=png&from=appmsg)

这样，即使你的电脑配置有限，你仍然可以通过云平台畅玩Stable Diffusion，创作出惊艳的作品。祝大家玩得开心！

****三、小白快速上手Stable Diffusion****

****1.模型用对，出来的照片才对味儿****

在使用Stable Diffusion之前，我们需要确定我们想要生成的照片风格

例如二次元动漫、三次元现实照片或盲盒模型等。

**根据不同的照片风格，我们需要切换不同的**大模型** 。**

在SD界面的左上角，可以找到"Stable Diffusion模型"选项。如下图：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsUbyVQtiaPicgmqWrFLfeWnRyicqwmHPmuHjf1ulhdSsHFapiaoHicqaIVsg/640?wx_fmt=png&from=appmsg)

假如现在我想生成一个真人AI小姐姐，那就选用chilloutmix的大模型

那么问题来了，我们这些模型从哪来呢？下载的模型放在哪里呢？

在我分享给大家的链接里面，有部分比较常用的大模型

除了C站，还有一些国内比较好用的模型推荐给大家：【AI绘画模型汇总】分享5个国内实用的AI绘画模型网站-C站AI模型平替网站

大家可以根据文件夹名称找到需要的模型。

另外，这篇文章的第三部分会跟大家详细介绍去哪里下载模型，模型存放的位置，所以一定要看到最后！

****2.写好关键词Prompt，让你事半功倍****

输入关键词（prompt）是生成照片的关键步骤。关键词告诉SD我们希望生成的照片内容。输入的关键词越准确，生成的照片就越接近我们想象中的画面。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsLXEVhMWAo3WAxYl6PLReyjVzfial9JvftvicpSqbwTl2dichC16xrF86w/640?wx_fmt=png&from=appmsg)

****(1) 正面关键词：****

其实要生成一张照片，最重要的就是关键词，

关键词里写的就是你希望照片里会出现的内容

输入的关键词越准确，出来的照片就会越接近自己脑海里的画面！

那怎么写关键词呢？

可以按照以下公式编写关键词：画质+主体+主体细节+人物服装+其他（背景、天气、构图等）。

写关键词的时候，可以先考虑照片质量的词语，例如"最高质量"、“超高清画质”、“大师的杰作”、“8k画质"等。然后写出照片的内容，包括主体和细节描述，如人物外貌特征、服装、配饰等。

比如说我现在想要生成一个漂亮的小姐姐站在大街上

那我就可以写成：1女孩，漂亮，站着，大街

或者是：1漂亮女孩，站在大街上

又或者我直接写一个句子：1个漂亮女孩站在大街上

**上面三种**单词、词组、短句** 的方式都可以，**

**我们比较常用的就是直接输入一个个单词，然后这些**单词用英文状态下的逗号隔开****

**注意：**SD只能识别英语** ，但我们也不用担心，直接用翻译就可以啦！**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsDQoOKYDFYxhicp5SxQYiaiaicgkcXOEB5xU8TIjwzVaFzeHeD0bgJLZHoQ/640?wx_fmt=png&from=appmsg)

接下去点击生成：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsu8cfs7mXSrhRsHnibwZiaPf1JIEj7czVmy51vlC7GewJy3z54T7xSAwA/640?wx_fmt=png&from=appmsg)

稍等一会，在你在SD的第一张图就出来啦！

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGshoyFEibtV4MrzZhqQ8x5hFVibeABdkVkiafF4drPIKnNyNvA0sicnicx90w/640?wx_fmt=png&from=appmsg)

是不是很多小伙伴已经按捺不住去试了试呢，出来的照片是不是有点不尽人意！

那是因为我们上面输入的关键词太过于简略啦

这里是我上面这张图输入的关键词

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGssy7VNh6psZyt1agPXnjiciaP5icd6ysicTr3ta7vM1kibA9oPibLg9gFjdBg/640?wx_fmt=png&from=appmsg)

**看到这一大串英文千万别害怕！**写关键词也是有模板的** ！**

模板如下：画质+主体+主体细节+人物服装+其他（背景、天气、构图等）。

首先上面第一行的关键词可以先不看，那是我们等一下要学到的lora模型

****画质：****

**在写跟我们照片有关的关键词之前，我们可以先写一些**照片质量** 的词语，这样出来的照片会更加精致**

比如说我们可以写：最高质量，超高清画质，大师的杰作，8k画质等等…

翻译成对应的英文就是：Highest quality, ultra-high definition, masterpieces, 8k quality,

****主体内容：****

写完质量词，接着就是我们照片的内容

先写的就是**照片的主体** ，和对主体的细节描写**

比如我们是要生成一个女孩，就要写出来一个女孩，以及这个女孩长什么样也可以写出来

也就是：一个女孩，非常精致的五官，极具细节的眼睛和嘴巴，长发，卷发，细腻的皮肤，大眼睛

翻译成英文就是：1girl, very delicate features, very detailed eyes and mouth, long hair, curly hair, delicate skin, big eyes,

这些照片内容大家都是可以随意改的，但是像精致的五官、细节的眼睛这类词语，大家可以都加上去

写完五官之后，我们就可以想一下让照片的人物穿什么衣服，裤子，或者加上帽子之类的配饰

像裙子、毛衣、牛仔裤、比基尼都可以，还可以写上衣服的颜色

比如：白色的毛衣、项链（white sweater, necklace,）

最后我们就可以写上其他乱七八糟的东西，比如背景、天气、照片姿势、构图等等

比如说：在街上，阳光，上半身照片（street, Sunshine, upper body photos,）

好啦，这样一套下来，我们的关键词就写的差不多了

推荐大家像我这样一行一行分开类型去写关键词，这样后面想要改词更好找

**但一定要注意**每一行的最后要加上英文逗号** ，否则它就会跟下一个单词连起来变成一个新单词**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsPXg2lMJmUJ5K3Zvse29ibu5YDMlhbwgwsnvq4rcAHVg3CNdHZhRapyg/640?wx_fmt=png&from=appmsg)

最后在总结下关键词公式，加深下印象：

****画质+主体+主体细节+人物服装+其他（背景、天气、构图等）****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs9FwqjFnjl6On1tj54nFnRnjWxAOHTa5OjcaxsKGOLTHVVn5iagXKOuw/640?wx_fmt=png&from=appmsg)

好，现在我们新生成了一张照片，但是发现她并没有我关键词里的卷发，

那我怎样才能让“卷发（curly hair）”引起Stable Diffusion的注意呢？

那就是给关键词加权重，加权重的方法有两种：

****1.直接用括号把关键词括起来** ：（curly hair）**

这样括号一次就是1.1倍权重，那括两次((curly hair))就是1.1×1.1=1.21倍，以此类推

**注意：这里的括号也是**英文状态下的括号****

可以加权重，那我们也可以减权重

减权重就是用”[]“把单词括起来，如：[curly hair]

****2.（关键词:数值):(curly hair:1.6)****

这就是在第一种的基础上加上数值，直接一个curly hair是1，大于1就是加权重，小于1就是减权重

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsW9Y0XD8lP1XicAtWotZbfatYbP7jfTz5979ia0ZROqvBJVH4fBpnah8g/640?wx_fmt=png&from=appmsg)
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsSiawtIvmWtQ4ugJic7kxmYz33jhicjryq7hBBJtib4hE8btOzZKXicCNqww/640?wx_fmt=png&from=appmsg)

****(2) 负面关键词：****

如果你不希望照片中出现某些内容，可以使用负面关键词告诉SD。例如不希望出现低质量、多余的手指、不好看的脸等。

****新手小白可以直接抄！** （文章最后有关键词链接，里面可以直接复制）**

模板1：

(worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), bad anatomy,DeepNegative, skin spots, acnes, skin blemishes,(fat:1.2),facing away, looking away,tilted head, lowres,bad anatomy,bad hands, missing fingers,extra digit, fewer digits,bad feet,poorly drawn hands,poorly drawn face,mutation,deformed,extra fingers,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands,polar lowres,bad body,bad proportions,gross proportions,missing arms,missing legs,extra digit, extra arms, extra leg, extra foot,teethcroppe,signature, watermark, username,blurry,cropped,jpeg artifacts,text,error,

模板2：

paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), cloth, underwear, bra, low-res, normal quality, ((monochrome)), ((grayscale)), skin spots, acne, skin blemishes, age spots, glans, bad nipples, long nipples, bad vagina, extra fingers,fewer fingers,strange fingers,bad hand, ng_deepnegative_v1_75t, bad-picture-chill-75v,Six fingers, deformed hands,

当然你如果还有什么不想出现在照片上的东西，也可以自己加上去

**到这里关键词所有的内容就讲完啦，**分享的链接里还有常用的关键词分类** ，**

****3.两分钟打造你的专属女友****

通过输入关键词，我们已经能够生成稍微好看一点的照片了。

但是如果你想生成多张相同的脸庞的照片怎么办？这时就要用到Lora模型了。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs2fWrRtVEibIEae6lXfvMEEsP31WoGwdaqq0RiaJD3Xibv8ibDg9viaVzfwQ/640?wx_fmt=png&from=appmsg)

- 利用Lora模型定制个性化角色

**简单来说，**Lora可以固定我们照片的特征：人物特征、动作特征、还有照片风格****

点击“生成”下面的的第三个按钮，就会弹出新的选项框

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsCmQcA9ArtmN8LnxuiaUScibO0sEwXaoJz59eFQu9ZuZ4Hia7JyXYbZKsQ/640?wx_fmt=png&from=appmsg)
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsn1icvsnblMKYMXBXrnYpyUAnrLiadkZicWibx93PcFORmt6OsGiaSz87jeg/640?wx_fmt=png&from=appmsg)

点击我们要用的Lora，就会自动添加到关键词的文本框里面

**前面那四张照片用到的就是这三个Lora，由此可见，我们的**Lora是可以叠加使用的****

但是建议新手不要使用太多lora，

因为这样照片出问题了，你也不知道是哪个Lora有问题

**另外，Lora之间一样**用英文逗号隔开****

每个Lora后面都有数字，这是用来调整这个Lora的权重的，

正常情况下是1，我们一般只会去降低权重，因为增加权重照片可能就会变得奇奇怪怪

每个Lora设置的权重不一样，出来的照片就会不一样

想要生成一个好看的小姐姐，就要多去尝试不同的权重组合

现在问题又来了，我们怎么选择Lora呢？

这个问题就要回归到你最开始想要生成什么样的照片

你想生成真人模特，你在最开始用了真人的大模型，对应的我们的Lora也要选用真人模特，

这样出来的照片效果才更好！

一些比较好看的Lora已经打包好了放在文章的末尾

后续挖掘到更好看的Lora也会分享给大家！

大家可以通过添加不同的Lora，调整权重，

生成你独一无二的小姐姐！

****4.为什么你生成的图跟别人不一样****

当使用相同的大模型、关键词、Lora模型和其他参数时，生成的图像可能与他人不同，其中一个影响因素是随机数种子（Seed）。

随机数种子控制了图像生成的底层形状，类似于画画时最开始的线稿。它决定了图像的基础轮廓，包括人物的外形轮廓、姿势和站位等。

当随机数为“-1”的时候，SD就会随机给你的照片生成一个种子，这个种子就理解成不一样的线稿就可以

你可以在生成的图像下方查看英文字符串中的seed值，以了解当前生成图像所使用的随机数种子。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGskjeR1ZrnXSVuW6C7vOzVwOIsZZHT1ePuVvhyM5H8hYicqQDajtic1waQ/640?wx_fmt=png&from=appmsg)

要生成与他人相似的图像，需要确保所有参数（包括随机数种子）与他人完全相同。只有当所有参数都相同时，我们才能生成与他人接近的图像。

****5.一分钟生成自己的二次元造型****

大家有没有试过花二三十块钱，把自己的照片发给别人，让人家帮自己生成一张二次元画风的照片拿来当头像

然后别人含泪血赚19.9，还有一毛钱是电费

今天看到这篇文章你就省钱啦！

Stable Diffusion不用一分钟，不管你是要2.5D还是2D的照片，它都能生成！

这里我们用到的是图生图里面的功能

我们是要用自己的照片生成一张二次元的照片

一定要记得换大模型！！选一个能生成二次元照片的大模型就可以

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsz0cf8G0UoANIVJ32ibxqr1dLLkT8dGaPxhl4ewR60fAyMPkBD1uf3Ag/640?wx_fmt=png&from=appmsg)

至于正面关键词呢

我们只要输入照片质量和主体内容相关的关键词就可以

比如我这里输入的就是：高质量，高清画质，大师杰作，极致的细节，8k，主体就是一个女孩

负面关键词我们就复制前面给大家的就可以啦

接着我们就在这个空白的地方点击上传自己需要生成的照片

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs5YPN13A5WjWOaKKyGCrRcLTXepDSfetp5DdMzBf4vzPoPS2Uq1KEiag/640?wx_fmt=png&from=appmsg)

接着鼠标往下移，找到“重绘幅度”

重绘幅度的意思就是你要改变你原来照片的程度

当你的重绘幅度拉到1，这时候就相当于要完全改变你的照片，生成出来的照片就跟原先的照片毫无关系了

这里如果大家是要生成二次元照片的，把重绘幅度拉到0.6~0.8就差不多了，

大家可以多试试几个参数

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsynqzG7nMGl0JJ5URbL2cLebYiccM8mibXickKia4STVYR44de5ZEyesQcg/640?wx_fmt=png&from=appmsg)

****6.怎么给二次元老婆换衣服****

假如我现在有一张非常好看的照片，唯独我觉得她的衣服不好看，

那我要怎么在不改变其它地方的情况下，给她换上更好看的衣服呢？

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGseemX8iaG0HLwdXnfKtu63dBcR69DCvtBicRekibXWbVkk0xg8EsP5XNAQ/640?wx_fmt=png&from=appmsg)

点击右边的画笔可以调整大小，把人物衣服部分全部涂黑

接着输入关键词，先输入质量词（如：高质量，高清画质，8k等）

然后描写一下你想要生成什么样的衣服

比如我这里输入的就是：粉色汉服，精致的裙子，极具细节的服装

负面关键词就直接复制我们前面用的

点击生成就可以啦！

同样的道理，我们还可以用这个功能来换脸，

只是我们涂黑的部分就变成了脸，输入的关键词就是描写脸部、五官的单词。

上面的方法用来换衣服只能整体去换，

如果我想指定衣服的颜色就只能在关键词里面告诉SD要怎么调整

假如现在我想指定服装的颜色，比如：蓝色的衣袖，粉色的衣服，还要有黄色的花纹

这时候我们只靠关键词是不行的，出来的照片也不一定准确

那我们就可以用到一个新的功能——“涂鸦重绘”

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs8ngYCjiaFtvBbQ5CXeEESJvrR9HBNiczJfKlv3OvZbFbGmIm9B1BEaJA/640?wx_fmt=png&from=appmsg)

导入照片之后，在右边调整画笔大小和颜色，然后就可以自己设计衣服的颜色啦

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsQ044oXmNiavpT3w6ficoBDKGDsAXSQVSbYMib6x6ZEeX2hNy3v2IbRiaaA/640?wx_fmt=png&from=appmsg)

关键词就像前面说的那样输入就可以啦，

每次点击生成都能出来不一样的衣服

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsic9rP2wGWrVrrr1NxrHlu64L5w9Mj8tcVkS9yPgsP01uNuaicUVia3oLg/640?wx_fmt=png&from=appmsg)

****7.两步轻松搞定模糊的照片****

SD除了生成新的照片外，还可以用来修复我们比较糊的照片

出来的效果比大多数软件都要好！

这个恢复画质的功能在SD里叫“附加功能”，点击下面空白的地方上传图片

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsWhNlXQhXN5FGmcvOuaDK81JglATAn3pictWiadsaY9N1b54xzHwiayibeg/640?wx_fmt=png&from=appmsg)

接着我们看到下面这个“Upscaler 1”，也就是放大器

****修复二次元动漫的照片就选“R-ESRGAN 4x+Anime68”****

****其他实物照片就选“R-ESRGAN 4x+”****

其他放大器出来的效果都没有这两个好

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGso82lib2jucotFqhvMKaosbnS54u3g0BVQeEeCVWrr426xaOib3gkAzAQ/640?wx_fmt=png&from=appmsg)

修复人脸：“GFPGAN强度”

这个是专门用来修复人脸的，把参数拉满（1）就行

****8. 三秒教你获取大神的咒语****

在网上经常看到别的大佬的图觉得很好看，想要复制却复制不出来

但其实SD里面就有这样一个功能

把照片导进去，它就能识别出来这张照片用到的咒语或者关键词

****方式一：“图片信息”****

把照片导进去，右边就会自动弹出照片的信息，包括正面关键词、负面关键词，还有其他种子、大模型等信息

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGskhgxaycVyU86x39uunn9CL3S4kZ5IUic7NKesNcvFMD42Lyiajn9AW7A/640?wx_fmt=png&from=appmsg)

然后点击“生成”按钮下面的第一个小按钮，SD就会自动帮你把信息分配到合适的地方，用上一样的效果和模型

这时候点击生成，就能得到一张差不多一样的照片（前提是有一样的大模型和Lora）

图片信息没出来？试试下面的方式二吧。

****方式二：标签器（Tagger）****

有时候我们把照片导入进去之后，发现右边并没有照片生成的信息

那就说明这张照片不是直接从SD下载下来的PNG格式的照片

那我们就没法用这个功能

但是我们可以用后面这个“标签器（Tagger）”

它可以帮助我们生成照片的关键词

通过以上两种方法，我们就可以获取到好看的照片的重要信息！

****以下介绍都是和ControlNet有关。****

ControlNet资料下载：https://pan.quark.cn/s/47bc8c79892a

****9.一招让你自由指定女神/女友的姿势****

现在我们已经能够生成美女的照片了，可以定制出独一无二的脸，换上更好看的衣服。

但是，我们如何让照片中的人物摆出特定的姿势呢？尽管我们可以通过关键词来描述动作，但生成的照片可能不太准确。

另一方面，使用图生成图的方法可能会导致人脸发生变化。

为了解决这个问题，我们可以使用"ControlNet"功能，中文翻译为控制网络。

简单来说，它可以用来控制照片中的线条，例如人物的动作和建筑物的线条等。通过这个功能，我们可以更精确地控制生成照片的姿势。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsOpDmapdrRBp5PhtiaibIHVRToy4p3kClyuMqTbvczGva50PT3tOUwiahg/640?wx_fmt=png&from=appmsg)

首先要确保是否安装ControlNet插件，没有安装，在插件里面搜索并安装

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsBiaq2zulqh6xpcjfygfSSSQ7QHCE6MgtWpZibhlUVhSicwOMZfBrpVZBg/640?wx_fmt=png&from=appmsg)

详细的实操步骤如下：

首先，大模型和关键词我们还是正常的填写

生成一张我们我们想要的小姐姐的照片

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs3OKro08F6A9mVdBrBADIqgqO5hDlgIU0LUJ0uP52Fib6ib3OD0Jibr6nA/640?wx_fmt=png&from=appmsg)

正面关键词

masterpiece, highres, 1girl,blush,(seductive smile:0.8),star-shaped pupils,china hanfu,hair ornament,necklace, jewelry,Beautiful face,upon_body, tyndall effect,photorealistic, dark studio, rim lighting, two tone lighting,(high detailed skin:1.1), 8k uhd, dslr, soft lighting, high quality, volumetric lighting, candid, Photograph,

high resolution | best quality

负面关键词：

(((simple background))),monochrome ,lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, lowres, bad anatomy, bad hands, text, error, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, ugly,pregnant,vore,duplicate,morbid,mut ilated,tran nsexual, hermaphrodite,long neck,mutated hands,poorly drawn hands,poorly drawn face,mutation,deformed,blurry,bad anatomy,bad proportions,malformed limbs,extra limbs,cloned face,disfigured,gross proportions, (((missing arms))),(((missing legs))), (((extra arms))),(((extra legs))),pubic hair, plump,bad legs,error legs,username,blurry,bad feet

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGs7SicHiamp5r0KyOJpSgb6IDMUkVOJ67JpdjHILCMqicicSfvOks9CxpOjw/640?wx_fmt=png&from=appmsg)
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGscydoYXycctFFjr12KE4weGrUMSa9CQkkeyzduibRGHMuT0d8SVYNRlA/640?wx_fmt=png&from=appmsg)

点击预处理的爆炸按钮就可以看到，模特的姿势被提取成了一个火柴人

里面的小圆点就是人体的重要关节节点

看看生成出来的照片，模特的姿势就几乎完全复刻出来了

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsJHVJ1ZwYoQefjzlTGicT1d8oKUKmWoM6nb00dhbcGakcJsLKOucLAAg/640?wx_fmt=png&from=appmsg)

**10.**插画师的福音，线稿秒上色****

随着AI绘画的普及，人们纷纷预测未来的画师可能会因此受到职业威胁。

然而，我们应该意识到，掌握AI绘画技能的画师将会比那些不熟悉这项技术的同行具有明显优势。

试想一下，当其他人仍在为给线稿上色而花费大量时间时，掌握AI绘画技术的你却可以在一分钟内完成一张质量上乘的作品。

仅就工作效率来说，这已经让你领先许多。

以下是我在网上找到的一张线稿图，我使用了“ControlNet”功能和SD的上色技术，使其变成了一张彩色照片。

接下来，我将详细介绍如何操作"ControlNet”：

首先，我们需要打开"ControlNet"的控制面板：
1.在面板的空白区域上传你的线稿图。
2.点击“启用”按钮。
3.点击“反转输出颜色”。
4.在模型选项中选择“canny”模型。
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsuDCQB3etjIdgicB0LnXypEp2bfC2TXHAdm4oeX7rqtN8J5DLAAgOzCw/640?wx_fmt=png&from=appmsg)
接下来，我们需要对之前的设置进行调整：
1.选择一个合适的大模型。如果你像我一样希望生成二次元风格的图像，就需要选择相应的模型。
2.添加关键词。这和我们写文章的关键词选择类似，首先你需要写出图片质量的关键词，例如“最高质量”或“大师级杰作”等。然后，我们就可以指定想要的颜色了，比如，我输入的是：“1可爱女孩，五官精致，精致眼睛和嘴巴，银色长发，白皙的皮肤，水汪汪的大眼睛”。在最后，我还添加了一个简单的背景。如果你想让色彩更加细致，可以通过输入更多的关键词来控制图片的细节。
3.复制前面的关键词作为负面关键词。

如此操作，无论线稿多么复杂，在SD中都可以快速地进行上色，实现效率和质量的双重提升。

最终效果如下：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGspQBej2tkaqHrfTdmpsIiaIlRDmibD6NBoMl2psiacHVkJMJC8pajX6ianQ/640?wx_fmt=png&from=appmsg)

**11.**小白也能进行室内设计****

ControlNet的另一个非常好用的模型MLSD：这个模型只能识别直线，所以只适合拿来做房子的设计

1.首先点开“ControlNet”的状态栏：
2.上传你想要进行设计的房间的照片。
3.点击“启用”按钮。
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsibrlDLou1Yjb68xP3MG85IjGia4uNfPtiaNAiamwVSqON0ap3P0Mpq08vg/640?wx_fmt=png&from=appmsg)

在预处理器和模型的选择中，我们选取“msld”，这是一个专门用于计算房屋线条的模型。

接下来，我们需要切换到一个现实照片的大模型。首先，我们要输入的是照片质量的关键词，然后输入照片的主题，比如，一个客厅。

最后一步，点击生成。

生成的照片既保留了原有房屋的基本结构，又展示了新的室内装修风格！通过这样的方式，我们可以轻松预览和调整我们的室内设计方案，即使是室内设计的新手，也可以轻松掌握。

****四、Stable Diffusion知识详解****

**12.**VAE：可变自动编码器****

主要作用：为照片添加滤镜和微调
作为新手，我们不必深究VAE的工作原理，只需知道它的作用是为照片添加滤镜和微调。

下图展示了添加和未添加VAE效果的区别。未添加VAE的照片看起来有些模糊。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsLBSXpueVlg3ZVCYpaXd0Giam3Fkxa0yoYTQ2hoBc0mFyIFD8PwJib7yQ/640?wx_fmt=png&from=appmsg)

但在一般情况下，如果我们对照片的色彩没有特别要求的时候，只选定一个VAE来使用就可以。

下面这个就是我比较常用的VAE

通常情况下，如果对照片的色彩没有特别要求，只需选择一个VAE模型即可。下面是我经常使用的VAE模型。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGscnBWANUuLcxORWIUQW126boWcW4rY5WH0ChoWbEyQ5xknDKviaaA9NQ/640?wx_fmt=png&from=appmsg)

**13.**STEPS：迭代步数****

简单来说，我们可以将SD生成图片的过程视为绘画。每增加一步迭代，都会给AI更多的机会去比对提示和当前结果，并进行调整。更高的迭代步数需要更多的计算时间。但高步数并不一定意味着更好的结果。当然，如果迭代步数太少，会降低生成图像的质量。

一般而言，将参数设置在20到30之间较为合适。

20步以下的图像质量较低。

但并不是迭代步数越多越好，超过30步后，部分电脑可能无法处理，无法生成照片。

因此，配置较低的电脑建议将步数设置在20到25之间。

配置较好的电脑可以将步数设置在25到30之间。

**14.**Sample：采样方法****

不同的采样方法相当于我们绘画的方式不同。

选择哪种采样方法呢？首先，我们可以参考他人使用的好看照片中所用的采样方法。如果不确定该选择哪种，我经过测试，下面圈出来的几种采样方法生成的照片质量较高且速度较快。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsk8AE4fvJ7YE11WyBibDcc7Jqtr4u05nuIFicyTg2Fg8LZ7mxZyNcQ3Ow/640?wx_fmt=png&from=appmsg)

**15.**面部修复+高分辨率修复****

这两个功能没有太多讲解，直接使用即可。

注意点如下：

- 

面部修复适用于生成真人照片。

- 

高分辨率修复需要较好的电脑配置，配置较低的电脑不建议使用，否则可能无法生成照片。

16.** 图片分辨率（图片大小）**

这里的宽度和高度用于调整照片的大小。
一般情况下：

- 

生成正方形照片：宽度512，高度512。

生成长方形照片：宽度512，高度768。
对于配置稍差的电脑，不要听信网上的设置如1024或2048，因为一般的电脑可能无法处理。

**17.**生成多图****

通过调整下面这两个参数，可以让我们一次生成多个图

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGslGoLZkCMOAOzRMFqxhcgfOJiaVicOibkXgKuJFfGfBaIslfrFicJkvMnXA/640?wx_fmt=png&from=appmsg)

假如我们把两个参数都设置成2

总批次数的意思就是生成两批

单批数量的意思就是一批生成两张照片

所以一共就会生成4张照片

在我们日常使用需要生成多张照片的

**我们**只调整“生成次数”** 就可以啦，这意味着我们照片是一张一张生成的**

****注意：单批数量就意味着同时生成多张照片，这对我们的显卡是有一定要求的，所以这个不要用！！****

**18.**用脚本进行照片对比****

当我们生成照片时，输入了许多关键词。那么我们如何才能比较不同关键词输入所生成的照片有什么区别？或者比较加入某个关键词和不加的区别呢？

这时我们可以使用脚本中的"提示词矩阵"，只需点击即可。

接着来到关键词的文本框

我们前面一直说在写关键词之前，先写照片的质量词

那我们就以这张照片为例子，

看看加上最高质量（the best quality）和不加有什么区别

书写格式：将需要对比的关键词放在最后，用"|“将关键词和前面的关键词分隔开，即：关键词|需要对比的关键词。

如下面截图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsMgRBrKNpoHKDWuxwOZFI40hI2uzXLqrmo4H0zpRnSpeXibzAKKRibMxA/640?wx_fmt=png&from=appmsg)

点击生成，就会生成两张照片并拼在一起。我们可以看到加上"最高质量（the best quality）“的照片更清晰。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsTp9ylsPvrLeT49YIwAfC5zHS84yjgfibbcXz5sfF8WwHJahCohEojrA/640?wx_fmt=png&from=appmsg)

如果现在想要比较不同采样方法下，不同迭代步数所生成的照片有何区别，该怎么操作呢？

这时就需要使用脚本中的"X/Y/Z图表"功能。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsUd3rtib6ibtLb0UcTsuUZ5eOpw78D7hHSb9dVMlPaNBadG9uHL1ho4yA/640?wx_fmt=png&from=appmsg)

在X轴类型中选择"迭代步数”，然后在右侧的X轴值中输入要比较的步数。

在Y轴类型中选择"采样器”，然后点击右侧的笔记本图标。这样所有采样器的名称都会显示在框内，可以自行选择删除。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsItqIfrNfon4874BuYdJCSvB9XUupe9PUKxGXLZ4Topr90Mm9wRKEibw/640?wx_fmt=png&from=appmsg)

点击"生成"，就会生成一张大图。我们可以看到在不同采样方法下，迭代步数为25时生成的照片都差不多。通过此对比，我们可以选择自己更喜欢的采样方法和迭代步数。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsjqXLF3mlVuCNZpG638ZSQsGauy4cyJaxntCBz1sEaVVSBQ0175l65Q/640?wx_fmt=png&from=appmsg)

**19.**ControlNet的作用****

1.黑白线稿上色

2.控制人物姿势

3.恢复画质

4.动漫变真人

****五、大神的模型从哪来****

****1.模型在哪下载****

除了链接里面给大家分享的模型，大家肯定还想去找更多更好看的模型

而大多数的模型都是在Civitai（C站）这个网站里面https://civitai.com/

除了C站，国内可以使用的网站推荐：

【AI绘画模型汇总】分享5个国内实用的AI绘画模型网站-C站AI模型平替网站

自己整理的常用的模型网盘下载链接：https://pan.quark.cn/s/2750beda9269

C站的使用方法：

1.魔法上网：这个没法教，只能自己想办法。

2.点击右上角的筛选按钮，在框框里面找到自己需要的模型类型

Checkpoint=大模型

LoRA=Lora

常用的就是这两个

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsnPibmgqMSsnLc5uuEu3QcpbM9gI6QdpYIsfWa5UhHnIRr9zVkicWEO9Q/640?wx_fmt=png&from=appmsg)

3.看照片，看到感兴趣的就点进去

点击右边的“Download”，也就是下载，保存到电脑本地，

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsYwUwAPk8e7gr9t9qrPjibLKc56oXndFPMdMvdc4qyeR3bibugvtiblTKg/640?wx_fmt=png&from=appmsg)

文件保存到哪里在这一节的第2部分

另外，我们还可以点击左上角的“Images”

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsJ84rRWnXUT5TAgKRrpwaMZp68ZeKiaD2kkWEKw6hb7yTFkB381OTgBg/640?wx_fmt=png&from=appmsg)

这里就是看别人已经做好的图片，找到喜欢的点进去

点进去之后的页面我们就可以看到这张图的全部信息

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsnt40lrqn9BDkos0wNaUwQmyiavgIogVTIWia5mBibON2XpOanDYQUZYDw/640?wx_fmt=png&from=appmsg)

直接点击Lora和大模型，可以直接跳转到下载页面

下面的就是照片关键词和其他信息

点击最下面的“Copy…Data”就可以复制图片的所有信息

回到SD，粘贴到关键词的文本框，点击右边的按钮

这些信息就会自动分配

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsfZZj3O5qgGNfSlvKWyZrLHplpPL96gc6fVy8WDpS6nJEEkbRTX24qQ/640?wx_fmt=png&from=appmsg)

要注意的就是，大模型是需要我们手动去换的！

这样我们就可以生成出跟大神几乎一样的照片了！（电脑网络配置的不同，出来的照片有细微差别）

****2.模型下载到哪里****

下面截图演示下电脑存放的位置。

1.大模型存放目录novelai-webui-aki-v3\models\Stable-diffusion

这里的SD根目录：novelai-webui-aki-v3 就是大家在下载时，存放SD的那个文件夹

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsNVEw6nloToEwElx5R8Vm3whlbcE6vYJHSYjnsiaAiaF8ibuuvqChP9WQw/640?wx_fmt=png&from=appmsg)

2.Lora存放目录novelai-webui-aki-v3\models\Lora

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsu0LJSufADM5tB8zaypBFvKyzExjLfJhzBCL6kIvfe5T8nd7uNXCKJQ/640?wx_fmt=png&from=appmsg)

3.VAE存放目录：novelai-webui-aki-v3\models\VAE

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGscsc0pibE3nMm7kibpmjNhzxs6sC5mwrgV5zYicRYU1MeYL5RNlsDqib0GQ/640?wx_fmt=png&from=appmsg)

****3.如何分辨模型****

如果我们下载了一个模型，但不知道它是哪个类型的，不知道要放到哪个文件夹

我们就可以用到这个秋叶的模型解析工具 [https://spell.novelai.dev/](https://spell.novelai.dev/)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGswtQPM6ljSLxekJ78truRWHQYssWOVmZBbpna9oH8LjAosicfUtlhcGQ/640?wx_fmt=png&from=appmsg)

把模型拖动到空白处

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYEh7fhI1CGpqfayrpAiaXYGsviaUkD9U3oPtL3icEy8XbrhUjUa8Qj8L5R4O6R8yCyAQPX53R0iaGkiahw/640?wx_fmt=png&from=appmsg)

接着就会自动弹出模型的信息

在模型种类里面就可以看到是什么模型啦！

**AI免费学习基地 [https://xmgtoagi.feishu.cn/wiki/S9BwwRcXciCz8BkA4uoc67UBnBf](https://xmgtoagi.feishu.cn/wiki/S9BwwRcXciCz8BkA4uoc67UBnBf)

**扫码备注“**绘画** ”，进入AI绘画交流群**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibIHS8hEXicYH0RCe7l0RPJP0G9ChKeU5OibtPzZeO0s3jPvuWhn8g0JZMn5icQJG3hI2k22D3DCu7kwBica36lPuVA/640?wx_fmt=png&from=appmsg)
更多AI工具，参考[Github-AiBard123](https://aibard123.com/)，[国内AiBard123](https://aibard123.com/)
