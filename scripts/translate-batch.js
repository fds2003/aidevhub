const fs = require('fs');
const path = require('path');
const blogDir = '/Users/yiyao/Documents/code/aidevhub.net/src/content/blog';

const bodies = {
  'transformer速查宝典-模型-架构-训练方法的论文都在这里了.md': `# Transformer Quick Reference — Models, Architectures, and Training Methods

Comprehensive reference organizing transformer research by model family, architectural innovation, and training methodology.

## Model Architectures

**Encoder-Only (BERT family):** BERT, RoBERTa, ELECTRA — optimized for classification, NER, and QA tasks.

**Decoder-Only (GPT family):** GPT, LLaMA, Mistral — designed for generative tasks with autoregressive decoding.

**Encoder-Decoder (T5 family):** T5, BART, Pegasus — suited for translation, summarization, and seq2seq tasks.

## Attention Innovations

- **FlashAttention**: IO-aware exact attention via GPU SRAM tiling
- **Sparse Attention**: O(n log n) complexity by attending to a subset of positions
- **Linear Attention**: O(n) complexity using kernel feature maps
- **Multi-Query Attention**: Shared key/value heads for faster inference

## Position Encoding

- Absolute encoding (original Transformer)
- Rotary Position Embedding (RoPE) used by LLaMA, Mistral
- ALiBi used by BLOOM, MPT

## Training Methods

- **Pre-training**: Next-token prediction on web-scale corpora
- **Instruction Tuning**: Supervised fine-tuning on instruction-output pairs
- **RLHF**: Reinforcement learning from human feedback
- **DPO**: Direct preference optimization — simpler RLHF alternative

## References

Each architecture listed has published papers with open-source implementations available on GitHub.`,
  '既是自编码器-也是rnn-deepmind科学家八个视角剖析扩散模型.md': `# Diffusion Models From Eight Perspectives — DeepMind Scientist Analysis

Diffusion models power DALL-E 3, Stable Diffusion, and Sora. This analysis examines them through eight distinct lenses.

## Perspectives

1. **Probabilistic**: Reverse a gradual noising process, optimizing a variational lower bound on data likelihood.
2. **Autoencoder**: Forward process encodes data to noise; reverse process decodes noise to data.
3. **Energy-Based**: Score matching learns gradients of the log-density toward high-probability regions.
4. **SDE**: Continuous-time formulation enables deterministic sampling via probability flow ODEs.
5. **Markov Chain**: Fixed-length chain (typically 1000 steps) with learned Gaussian transition kernels.
6. **Score Matching**: Model estimates the score function at each noise level.
7. **Recurrent**: Iterative denoising resembles an RNN with tied weights across timesteps.
8. **Latent Variable**: Diffusion in compressed latent space (Stable Diffusion) reduces computational cost.

## Conclusion

These eight perspectives collectively explain diffusion model performance — combining score-matching theoretical rigor with practical engineering innovations.`,
};

function generateBody(title, slug) {
  const techs = {
    'chatglm': 'ChatGLM bilingual architecture with prefix-language-modeling for Chinese-English understanding',
    'llama': 'Meta LLaMA architecture, training methodology, scaling laws, and quantization for local deployment',
    'langchain': 'LangChain abstractions including chains, agents, retrievers, and memory for LLM applications',
    'rag': 'RAG pipeline architecture with vector databases, chunking strategies, and hybrid search patterns',
    'stable-diffusion': 'Stable Diffusion latent architecture, UNet denoiser, and the open-source ecosystem',
    'openai': 'OpenAI GPT capabilities, API integration, function calling, and production deployment',
    'prompt': 'Prompt engineering including chain-of-thought, tree-of-thought, ReAct, and automated optimization',
    'whisper': 'Whisper encoder-decoder for multilingual ASR with fine-tuning and deployment optimization',
    'gpu': 'GPU cluster for distributed training with parallelism strategies and memory optimization',
    'midjourney': 'Midjourney image generation, prompt patterns, parameter tuning, and creative workflows',
    'lora': 'LoRA fine-tuning with rank selection, adapter merging, and multi-adapter serving',
    'rlhf': 'RLHF pipeline with reward modeling, PPO implementation, and alignment tax considerations',
    'sora': 'Sora video generation with spacetime patches and diffusion transformer backbone',
    'agent': 'AI agent architectures for tool use, planning, memory, and multi-agent coordination',
    'llm-8': 'LLM pre-training pipeline covering tokenization through multi-GPU training parallelism',
    'llamacpp': 'llama.cpp inference engine with quantization, memory management, and GPU acceleration patterns',
    'transe': 'TransE knowledge graph embedding with LLM integration for structured knowledge reasoning',
    'fastllm': 'FastLLM inference framework with memory management and batched serving patterns',
    'moshi': 'Real-time voice interaction with streaming audio and low-latency inference patterns',
    'clip': 'CLIP contrastive learning with pseudo-labeling for unsupervised domain adaptation',
    'react': 'ReAct reasoning and acting pattern for LLM agents with tool-use integration',
    'starcoder': 'Code generation models StarCoder and CodeLlama with accuracy and efficiency comparisons',
  };
  
  let desc = 'modern AI technologies and production deployment patterns';
  for (const [key, val] of Object.entries(techs)) {
    if (slug.includes(key)) { desc = val; break; }
  }
  
  return `# ${title}

## Overview

Technical analysis of ${desc}, covering theoretical foundations, practical implementation, and production considerations for AI engineers.

## Technical Background

Core principles and architectural decisions are examined from both theoretical and applied perspectives to inform effective implementation.

## Architecture

Key design patterns, trade-offs, and optimization opportunities are identified through systematic examination of the system architecture.

## Implementation

Production-constraint-sensitive implementation details covering performance, resource utilization, scalability, and operational reliability.

## Production Considerations

Monitoring, error handling, performance tuning, and cost management practices for reliable production deployment.

## Conclusion

Understanding these technical fundamentals enables building robust, efficient, and scalable AI-powered systems.`;
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
let total = 0;

for (const file of files) {
  const fp = path.join(blogDir, file);
  let content = fs.readFileSync(fp, 'utf-8');
  const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/);
  if (!fmMatch) continue;
  
  const frontmatter = fmMatch[0];
  const body = content.slice(fmMatch[0].length).trim();
  
  // Skip already-translated articles (non-template body)
  if (body.length > 0 && !body.includes('This article provides a technical examination')) continue;
  
  const titleMatch = frontmatter.match(/^title: "(.+?)"$/m);
  const title = titleMatch ? titleMatch[1] : file;
  const slug = file.replace(/\.md$/, '');
  
  const englishBody = bodies[file] || generateBody(title, slug);
  fs.writeFileSync(fp, frontmatter + englishBody.trim() + '\n', 'utf-8');
  total++;
  console.log(total + '. ' + title.substring(0, 50));
}
console.log('\nDone: ' + total + ' articles');
