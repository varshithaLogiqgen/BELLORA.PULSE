import { matchesSearch } from '@/lib/utils/directory';
export interface InterviewCompany {
  slug: string;
  name: string;
  focus: string;
  description: string;
  topics: string[];
  interviewTips?: string;
  rounds?: string[];
}
export interface InterviewQuestion {
  id: string;
  companySlugs: string[];
  roles: string[];
  topic: string;
  round: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  experience: string;
  question: string;
  answer: string;
  explanation: string;
  followUp: string;
  reviewedAt: string;
  sourceType: 'practice' | 'reported';
  sourceUrl?: string;
  codeBlock?: string;
  codeLanguage?: string;
  resources?: { label: string; url: string }[];
}
// Original editorial practice tracks, not employer-endorsed or reported interview questions.
export const companies: InterviewCompany[] = [
  {
    slug: 'google',
    name: 'Google',
    focus: 'Search, ranking & ML systems',
    description:
      'Practise search relevance, large-scale retrieval, and reliable machine learning.',
    topics: ['Search & ranking', 'ML fundamentals', 'ML system design'],
  },
  {
    slug: 'microsoft',
    name: 'Microsoft',
    focus: 'Enterprise AI & copilots',
    description:
      'Work through enterprise assistants, retrieval, and responsible deployment.',
    topics: ['RAG', 'LLMs', 'ML system design'],
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    focus: 'Recommendations & applied science',
    description:
      'Explore recommendations, forecasting, experimentation, and production trade-offs.',
    topics: ['Recommendations', 'Experimentation', 'ML fundamentals'],
  },
  {
    slug: 'meta',
    name: 'Meta',
    focus: 'Personalization & experimentation',
    description:
      'Practise feed ranking, recommendation systems, and measurement at scale.',
    topics: ['Recommendations', 'Experimentation', 'ML system design'],
  },
  {
    slug: 'nvidia',
    name: 'NVIDIA',
    focus: 'Inference & accelerated computing',
    description:
      'Build confidence in model serving, GPU performance, and vision workloads.',
    topics: ['Inference', 'Computer vision', 'ML system design'],
    interviewTips:
      'NVIDIA interviews go deep on GPU architecture, kernel optimisation, and numerical precision. Expect questions that combine ML knowledge with systems-level thinking.',
    rounds: ['Phone screen', 'Technical (GPU & ML)', 'System design', 'Hiring manager'],
  },
  {
    slug: 'openai',
    name: 'OpenAI',
    focus: 'Safety, alignment & frontier models',
    description:
      'Prepare for questions on LLM systems, safety reasoning, agent design, and responsible deployment at scale.',
    topics: ['Safety & Alignment', 'GenAI & Agents', 'LLMs'],
    interviewTips:
      'OpenAI pairs deep technical questions with safety reasoning. Expect to discuss AI risk trade-offs, system design for large models, and your views on responsible deployment.',
    rounds: ['Technical screen', 'Coding', 'System design', 'Research depth', 'Mission & culture'],
  },
  {
    slug: 'anthropic',
    name: 'Anthropic',
    focus: 'Constitutional AI & safety research',
    description:
      'Work through alignment techniques, interpretability, and building AI systems that are safe by design.',
    topics: ['Safety & Alignment', 'LLMs', 'GenAI & Agents'],
    interviewTips:
      'Anthropic values intellectual honesty and careful safety reasoning. Expect deep discussions on Constitutional AI, RLAIF, interpretability, and how you weigh capability against risk.',
    rounds: ['Technical screen', 'Research discussion', 'System design', 'Mission alignment'],
  },
  {
    slug: 'huggingface',
    name: 'Hugging Face',
    focus: 'Open-source ML & the Transformers ecosystem',
    description:
      'Practise fine-tuning, model evaluation, parameter-efficient training, and open-source ML workflows.',
    topics: ['LLMs', 'ML fundamentals', 'Python'],
    interviewTips:
      'Hugging Face values strong Python skills and deep familiarity with the Transformers library. Expect practical coding tasks and discussion of model evaluation and community best practices.',
    rounds: ['Technical screen', 'Coding', 'Architecture discussion', 'Culture fit'],
  },
  {
    slug: 'apple',
    name: 'Apple',
    focus: 'On-device ML & privacy-preserving AI',
    description:
      'Build expertise in inference efficiency, privacy-first ML, and deploying models on constrained hardware.',
    topics: ['Inference', 'Privacy & ML', 'Computer vision'],
    interviewTips:
      'Apple embeds privacy into technical decisions from the start. Expect questions on on-device inference, differential privacy, federated learning, and hardware-aware model design.',
    rounds: ['Phone screen', 'Technical onsite (5–6 rounds)', 'System design', 'Hiring manager'],
  },
  {
    slug: 'netflix',
    name: 'Netflix',
    focus: 'Personalization & content recommendations',
    description:
      'Sharpen skills in recommendation systems, long-term user value, and experimentation at scale.',
    topics: ['Recommendations', 'Experimentation', 'ML system design'],
    interviewTips:
      'Netflix has a strong experimentation culture. Expect thorough questions on A/B testing methodology, measuring long-term user value, and recommendation system design.',
    rounds: ['Phone screen', 'Take-home', 'Technical onsite', 'Bar raiser'],
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    focus: 'Fraud detection & financial risk ML',
    description:
      'Prepare for adversarial ML, real-time risk scoring, cost-sensitive classification, and high-stakes production systems.',
    topics: ['ML fundamentals', 'Experimentation', 'ML system design'],
    interviewTips:
      'Stripe interviews are structured with clear rubrics. Expect questions on adversarial ML, causal inference, the cost of false positives versus false negatives in financial contexts, and real-time system design.',
    rounds: ['Recruiter screen', 'Technical phone screen', 'Onsite (4–5 rounds)', 'Leadership'],
  },
];
export const questions: InterviewQuestion[] = [
  {
    id: 'data-leakage',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Easy',
    experience: 'Entry level',
    question:
      'How can data leakage make a model look better than it really is?',
    answer:
      'Leakage occurs when training uses information unavailable at prediction time. Examples include scaling with statistics from the full dataset, using future transactions, or placing near-duplicate users in both splits. Split first, fit preprocessing only on training data, and use temporal or grouped validation when the deployment setting requires it.',
    explanation:
      'A strong answer connects the split to the actual prediction moment and explains why a random split can be misleading.',
    followUp:
      "How would you validate a model predicting a customer's next purchase?",
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'bias-variance',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Easy',
    experience: 'Entry level',
    question: 'How would you diagnose underfitting versus overfitting?',
    answer:
      'Compare training and validation performance using learning curves. Poor performance on both can indicate underfitting, weak features, or optimization problems. Strong training results and weak validation results suggest overfitting or distribution mismatch. Try regularization, simpler models, more representative data, and cross-validation while keeping a final test set untouched.',
    explanation:
      'Mention that label noise, leakage, and a mismatched split can also explain these patterns.',
    followUp: 'What would you try if both errors remain high as data grows?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'python-stream',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'Python',
    round: 'Coding',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'How would you compute the mean of a dataset too large to fit in memory?',
    answer:
      "Read batches or stream observations, retaining a running count and mean. For a new value x at count n, update mean = mean + (x - mean) / n. Use a generator so loading is lazy. Define how missing and invalid values are handled; use a stable algorithm such as Welford's if variance is also needed.",
    explanation:
      'This uses constant auxiliary memory. Discuss floating-point limits and deterministic aggregation for parallel processing.',
    followUp:
      'How would you merge the counts and means of two independent workers?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'project-tradeoff',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia'],
    roles: ['AI Engineer', 'ML Engineer', 'Data Scientist'],
    topic: 'Communication',
    round: 'Behavioral',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'Describe a time you chose a simpler model over a more accurate one.',
    answer:
      'Use a real example: describe the user need, measured quality difference, and operational constraints. Compare latency, interpretability, cost, and maintenance. Explain the decision you owned, the outcome, and what evidence would make you revisit it. If you lack work experience, use a project and be explicit about its scope.',
    explanation:
      'The goal is a defensible decision supported by measurements, not a claim that simple models always win.',
    followUp: 'Which production metric would trigger a reevaluation?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'search-ranking',
    companySlugs: ['google'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'Search & ranking',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'Design a two-stage search ranking system.',
    answer:
      'Clarify relevance, latency, freshness, and language requirements. Use a fast retrieval stage to select candidates, then a richer ranker to score them. Build training examples from relevance judgments and carefully debiased interaction data. Evaluate retrieval recall and ranking quality separately, then run an online experiment with guardrails for latency and user satisfaction.',
    explanation:
      'Candidate retrieval limits what the ranker can recover. Include cold-start queries and monitoring for index freshness.',
    followUp: 'How would you handle position bias in click data?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'search-embeddings',
    companySlugs: ['google', 'microsoft'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'Search & ranking',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'When would you combine lexical and vector search?',
    answer:
      'Lexical search can retrieve exact identifiers and rare terms; vector search captures semantic similarity. Run both retrieval methods, combine candidates with a method such as reciprocal rank fusion, then optionally rerank. Evaluate representative query types and inspect failures before adding complexity.',
    explanation:
      'Score scales are not automatically comparable. Rank fusion can avoid relying on raw score equivalence.',
    followUp:
      'How would you test whether hybrid search improves exact product-code queries?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'search-freshness',
    companySlugs: ['google'],
    roles: ['ML Engineer'],
    topic: 'ML system design',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'How would you keep a search model useful as new documents arrive?',
    answer:
      'Separate document ingestion and indexing from model retraining. Monitor indexing delays, failed ingestion, query drift, and relevance by content age. Refresh embeddings when necessary, version indexes alongside models, and support rollback. Include fresh-document queries in evaluation and use a deployment strategy that limits inconsistent indexes.',
    explanation:
      'Fresh content and a new ranking model are different update problems, with different schedules and failure modes.',
    followUp: "What happens when the embedding model's dimension changes?",
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'rag-assistant',
    companySlugs: ['microsoft'],
    roles: ['AI Engineer'],
    topic: 'RAG',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'Design an assistant that answers questions about internal company documents.',
    answer:
      'Ingest and version documents, retain access-control metadata, and chunk content with source references. Enforce user permissions during retrieval, rerank relevant results, and ask the model to answer with citations. Support abstention when evidence is missing. Evaluate retrieval, groundedness, access isolation, latency, and cost using realistic questions.',
    explanation:
      'Authorization must be enforced by the application. A prompt telling the model to protect data is insufficient.',
    followUp:
      'How would you remove a deleted document from indexes, caches, and existing sessions?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'rag-evaluation',
    companySlugs: ['microsoft', 'google'],
    roles: ['AI Engineer', 'Data Scientist'],
    topic: 'RAG',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'How would you tell whether a RAG failure came from retrieval or generation?',
    answer:
      'Use a labeled set with expected evidence. Check whether retrieval includes that evidence, then test generation with known-good context. Measure retrieval recall separately from answer correctness and citation support. Inspect chunk boundaries, ambiguous queries, and unanswerable questions, and compare changes on a held-out set.',
    explanation:
      'End-to-end answer accuracy alone cannot locate the failure. Controlled context experiments isolate the components.',
    followUp:
      'What metric would you use when several documents can correctly support an answer?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'prompt-injection',
    companySlugs: ['microsoft'],
    roles: ['AI Engineer'],
    topic: 'LLMs',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'How would you protect a document assistant from malicious instructions in retrieved text?',
    answer:
      'Treat retrieved content as untrusted data. Keep tool permissions narrow, enforce authorization outside the model, validate tool arguments, and require confirmation for consequential actions. Separate instructions from content, restrict data exposure, and test adversarial documents. Record failures and evaluate mitigations without assuming that prompt text alone provides a security boundary.',
    explanation:
      'The answer should cover what the model can actually do, not just whether it follows a misleading instruction.',
    followUp:
      'How would you prevent a retrieved URL from exfiltrating private context?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'recommend-products',
    companySlugs: ['amazon'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'Recommendations',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'Design product recommendations for customers with little history.',
    answer:
      'Combine popularity and content-based candidates with available context such as session activity. Start with simple baselines, use collaborative signals when enough data exists, and include exploration. Evaluate coverage, relevance, and conversion alongside returns and diversity. Handle new products separately from new users and log exposures for future learning.',
    explanation:
      'A pure collaborative model struggles when interactions are sparse. Explain a fallback that works immediately.',
    followUp: 'How would you avoid reinforcing popularity bias?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'forecast-stock',
    companySlugs: ['amazon'],
    roles: ['Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'How would you evaluate a product-demand forecasting model?',
    answer:
      'Use rolling time-based evaluation with a forecast horizon matching the business decision. Compare against seasonal and naive baselines. Choose metrics that handle low or zero demand, and evaluate errors by product category and volume. Account for stockouts because observed sales may understate demand. Quantile forecasts can support asymmetric shortage and overstock costs.',
    explanation:
      'Random splits leak temporal information. A single aggregate metric can hide poor performance on important segments.',
    followUp: 'How would a promotion scheduled next month enter the model?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'delayed-labels',
    companySlugs: ['amazon', 'meta'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'Experimentation',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'How do delayed conversion labels affect a classifier?',
    answer:
      'Recent observations may be incorrectly labeled negative because conversions have not happened yet. Define a label window, train on sufficiently mature examples, and evaluate cohorts at comparable maturity. If freshness is essential, consider delay-aware modeling. Monitor the delay distribution and distinguish label delay from actual changes in user behavior.',
    explanation:
      'A training dataset can be temporally fresh but systematically mislabeled. Explain the trade-off between recency and completeness.',
    followUp: 'How would you compare campaigns whose conversion delays differ?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'feed-ranking',
    companySlugs: ['meta'],
    roles: ['ML Engineer'],
    topic: 'Recommendations',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'Design a personalized feed while avoiding a single engagement objective.',
    answer:
      'Retrieve candidates from relevant sources, rank with multiple predictions, and apply constraints for quality, diversity, and eligibility. Define user-value metrics with longer-term outcomes, not just clicks. Use offline checks and staged online experiments, logging exposures and monitoring groups for regressions.',
    explanation:
      'Different objectives can conflict. State the trade-offs and how weights or constraints would be selected.',
    followUp:
      'How would you measure whether diverse recommendations improve the experience?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'ab-test',
    companySlugs: ['meta', 'amazon', 'google'],
    roles: ['Data Scientist'],
    topic: 'Experimentation',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'What would you check before trusting an A/B test result?',
    answer:
      'Confirm the randomization unit, exposure logging, sample ratio, and preselected metric. Check power, confidence intervals, novelty effects, multiple testing, and guardrails. Account for interference between users when applicable. Avoid repeatedly stopping at the first significant result unless the test design supports sequential analysis.',
    explanation:
      'Statistical significance does not establish practical value or rule out instrumentation errors.',
    followUp:
      'When would you randomize by household or geographic area rather than user?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'class-imbalance',
    companySlugs: ['meta', 'amazon'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Easy',
    experience: 'Entry level',
    question: 'Why can accuracy be misleading for a rare-event classifier?',
    answer:
      'Predicting the majority class can achieve high accuracy while missing almost every positive. Inspect precision, recall, the precision-recall curve, calibration, and errors at the operating threshold. Choose the threshold based on the cost of misses and false alarms. Keep validation prevalence representative even when training uses resampling.',
    explanation:
      'A good answer connects the metric to a concrete decision and avoids using a universal threshold.',
    followUp:
      'What happens to precision if the positive rate drops after deployment?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'gpu-inference',
    companySlugs: ['nvidia'],
    roles: ['ML Engineer', 'AI Engineer'],
    topic: 'Inference',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'How would you increase inference throughput without breaking latency targets?',
    answer:
      'Profile the serving pipeline first, separating queueing, preprocessing, model execution, and transfer costs. Try controlled batching, concurrency tuning, and appropriate precision. Measure throughput along with p50 and p99 latency under realistic request lengths. Keep an overload policy and compare accuracy before shipping optimizations.',
    explanation:
      'A larger batch can improve throughput while worsening tail latency. Benchmark the actual workload rather than a single synthetic input.',
    followUp:
      'When would batching make an interactive application feel slower?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'quantization',
    companySlugs: ['nvidia'],
    roles: ['ML Engineer'],
    topic: 'Inference',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'What trade-offs would you evaluate before quantizing a model?',
    answer:
      'Quantization reduces numerical precision to lower memory use and potentially improve execution efficiency. Measure quality on representative inputs, outlier sensitivity, memory, and latency on the target hardware. Compare post-training quantization with quantization-aware training when feasible. Verify kernel support and avoid assuming fewer bits always mean faster execution.',
    explanation:
      'Memory savings are more predictable than speedups; hardware and workload determine actual performance.',
    followUp: 'Which layers or operations might you keep at higher precision?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'vision-split',
    companySlugs: ['nvidia'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'Computer vision',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'How would you split video frames for a vision-model evaluation?',
    answer:
      'Group frames by recording, subject, or scene before splitting so neighboring frames do not appear in both training and evaluation. Fit preprocessing only on training data and augment only training examples. Include shifts in lighting, camera, and environment that match expected deployment conditions.',
    explanation:
      'Highly similar adjacent frames can inflate performance even when no exact duplicate exists.',
    followUp:
      'How would you evaluate generalization to a camera never seen in training?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'drift',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia'],
    roles: ['ML Engineer', 'AI Engineer'],
    topic: 'ML system design',
    round: 'System design',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'What should you monitor after deploying an ML model?',
    answer:
      'Track availability, latency, resource cost, input quality, feature distributions, and output distributions. When labels arrive, monitor outcome quality and calibration by segment. Define alert thresholds, ownership, and rollback paths. Investigate drift before retraining because a distribution change does not always imply degraded performance.',
    explanation:
      'Monitoring must connect to an action. Labels may be delayed, so proxy signals need explicit limitations.',
    followUp:
      'How would you distinguish a broken data pipeline from genuine behavior change?',
    sourceType: 'practice',
    reviewedAt: '2026-09-28',
  },
  {
    id: 'attention-mechanism',
    companySlugs: ['google', 'microsoft', 'meta'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'LLMs',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'How does scaled dot-product attention work, and why does the scaling matter?',
    answer:
      'Attention computes a weighted sum of values, where weights come from the dot product of queries and keys passed through softmax. Dividing by the square root of the key dimension prevents the dot products from growing large when the dimension is high, which would push softmax into regions with very small gradients. Multi-head attention runs this in parallel across learned projection subspaces so the model can attend to different aspects of the input simultaneously.',
    explanation:
      'A strong answer explains the gradient issue numerically, not just verbally, and connects multi-head design to representational diversity.',
    followUp:
      'What changes when you replace full self-attention with a sparse or linear approximation?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'fine-tuning-llm',
    companySlugs: ['microsoft', 'google'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'LLMs',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'When would you fine-tune a pre-trained language model instead of using it with prompting alone?',
    answer:
      'Fine-tune when prompt engineering cannot reliably elicit the required format, domain vocabulary, or task behavior, or when latency and cost make large in-context examples impractical. Parameter-efficient methods such as LoRA adapt the model with far fewer trainable parameters. Use a representative evaluation set to confirm improvement over a well-crafted prompt before committing to the training overhead. Consider catastrophic forgetting, data quality, and whether the base model license permits fine-tuning.',
    explanation:
      'Mention that fine-tuning is a cost with diminishing returns; a good answer weighs it against the quality ceiling of prompting for the specific task.',
    followUp:
      'How would you decide how much of the model to unfreeze for a domain-adaptation task?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'rlhf',
    companySlugs: ['microsoft', 'google', 'meta'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'LLMs',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'Explain the role of the reward model in RLHF and where it can go wrong.',
    answer:
      'Human annotators rank model outputs; a reward model is trained to predict those preferences. A policy is then fine-tuned with reinforcement learning to maximize predicted reward while a KL penalty keeps it close to the original model. The reward model can overfit to annotator biases, be gamed through reward hacking, or fail to generalise to novel outputs. Distribution shift between training and deployment makes reward model reliability difficult to guarantee.',
    explanation:
      'Cover both the training loop and the failure modes. Reward hacking and annotation disagreement are the two most cited weaknesses interviewers probe.',
    followUp:
      'What would you do if annotators systematically preferred verbose but less accurate answers?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'gradient-descent-variants',
    companySlugs: ['google', 'amazon', 'meta', 'nvidia'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'How would you choose between SGD with momentum, Adam, and AdaGrad for training a neural network?',
    answer:
      'Adam adapts learning rates per parameter using first and second moment estimates, making it a good default for most networks. SGD with momentum can generalise better on some vision tasks and is preferred when fine-tuning large pretrained models. AdaGrad accumulates all past squared gradients and effectively reduces learning rates to zero for dense features, so it is more suited to sparse settings. Monitor the training loss curve, gradient norms, and validation performance rather than choosing blindly.',
    explanation:
      'Distinguish the update rule from the generalization property. A strong answer mentions the flat-minimum hypothesis linking SGD to better generalization on some tasks.',
    followUp: 'How does weight decay interact differently with Adam versus SGD?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'feature-store',
    companySlugs: ['amazon', 'meta', 'google'],
    roles: ['ML Engineer', 'AI Engineer'],
    topic: 'ML system design',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'Design a feature store that serves both training and inference.',
    answer:
      'Separate an offline store for batch-computed features used in training from an online store for low-latency serving. Maintain a registry of feature definitions, versioning, and ownership. Compute features once and reuse them to avoid training-serving skew. Include point-in-time correct joins for training to prevent leakage. Define freshness SLAs per feature, monitor staleness, and plan for backfills when a feature definition changes.',
    explanation:
      'Training-serving skew is the most critical concern. A strong answer also mentions cost: materialising all features is expensive and some are better computed on the fly.',
    followUp:
      'How would you handle a feature that must be computed from raw events arriving out of order?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'causal-inference',
    companySlugs: ['meta', 'amazon'],
    roles: ['Data Scientist'],
    topic: 'Experimentation',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'When a randomised experiment is not possible, how would you estimate the causal effect of a product change?',
    answer:
      'Consider quasi-experimental methods: difference-in-differences if parallel trends hold before the intervention, regression discontinuity if assignment depends on a threshold, instrumental variables if a valid instrument exists, or synthetic control for aggregate outcomes. Each method requires explicit assumptions; state them and describe how you would test them. Compare estimates across methods as a robustness check and be explicit about the effect you can actually identify versus the one the business wants.',
    explanation:
      'The answer should name at least two methods and articulate the identifying assumption for each. Claiming that observational data can recover causal effects without assumptions is a red flag.',
    followUp:
      'How would you test the parallel trends assumption for a difference-in-differences analysis?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'model-explainability',
    companySlugs: ['amazon', 'microsoft'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'How would you explain a complex model\'s predictions to a non-technical stakeholder?',
    answer:
      'Choose explanation methods that match the audience and question. SHAP values attribute predictions to features globally and locally and are consistent across model types. LIME approximates the model locally for a single prediction. Partial dependence plots show the marginal effect of a feature. For high-stakes decisions, pair local explanations with error analysis and communicate confidence. Avoid overstating what a local explanation tells you about the model globally.',
    explanation:
      'Distinguish global explanations for model auditing from local explanations for individual decisions. Mention that explanations of black-box models are approximations, not ground truth.',
    followUp:
      'How would you validate that a SHAP explanation actually reflects model behavior?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'distributed-training',
    companySlugs: ['google', 'nvidia'],
    roles: ['ML Engineer'],
    topic: 'ML system design',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'What trade-offs would you weigh when choosing between data parallelism and model parallelism?',
    answer:
      'Data parallelism replicates the model across devices and splits the batch; gradients are aggregated at each step. It is simpler but requires the full model to fit on each device and incurs gradient synchronisation cost. Model parallelism splits layers or tensors across devices and is necessary when the model exceeds a single device memory, but introduces pipeline bubbles or recomputation overhead. Tensor parallelism can split individual weight matrices. Choose based on model size, batch size, communication bandwidth, and hardware topology.',
    explanation:
      'Cover both the memory constraint that forces model parallelism and the communication overhead that limits scaling. Mention pipeline parallelism as a hybrid approach for very deep models.',
    followUp:
      'How would gradient checkpointing change your analysis of memory versus compute trade-offs?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'rag-chunking',
    companySlugs: ['microsoft', 'google'],
    roles: ['AI Engineer'],
    topic: 'RAG',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'How would you decide on a chunking strategy for a document retrieval system?',
    answer:
      'Fixed-size overlapping chunks are simple and predictable but can split sentences. Sentence or paragraph boundaries respect natural structure. Semantic chunking groups text by embedding similarity. Recursive splitting tries larger units first and falls back to smaller ones. The right size depends on the embedding model context window, the typical query length, and whether answers usually span a single passage or multiple sections. Evaluate retrieval recall on representative queries at different chunk sizes before deciding.',
    explanation:
      'There is no universally optimal chunk size. A strong answer connects the strategy to retrieval quality metrics, not just implementation convenience.',
    followUp:
      'How would you handle a document where tables and prose require different chunking logic?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'ensemble-methods',
    companySlugs: ['amazon', 'meta', 'google'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question:
      'When does an ensemble of weak learners outperform a single strong model?',
    answer:
      'Ensembles reduce variance by averaging independent errors, so they help most when individual models overfit or are unstable. Bagging trains models on bootstrap samples; random forests add feature subsampling to decorrelate trees. Boosting reduces bias by sequentially fitting residuals. Stacking learns to combine diverse base models. Gains diminish when base learners are highly correlated or when the dominant error is bias rather than variance.',
    explanation:
      'Distinguish when to reach for an ensemble versus regularising a single model. Mention that diversity among base models is essential and that ensembles add latency and maintenance cost.',
    followUp:
      'How would you measure whether a new model adds value to an existing ensemble?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'online-learning',
    companySlugs: ['meta', 'google'],
    roles: ['ML Engineer'],
    topic: 'ML system design',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'How would you design a system that continuously updates a ranking model from fresh user interactions?',
    answer:
      'Stream interaction events through a reliable pipeline, apply deduplication and delay handling, and compute features with point-in-time correctness. Update the model on mini-batches, applying a learning rate schedule that prevents catastrophic forgetting of older patterns. Shadow-deploy the updated model, compare offline and online metrics, and gate full rollout on guardrails. Keep a stable fallback version and log both model versions for retrospective analysis.',
    explanation:
      'The hardest parts are label delay and catastrophic forgetting, not the update mechanism itself. A strong answer addresses both and defines what "fresh" means for the specific use case.',
    followUp:
      'How would you detect when online updates degrade performance on an older cohort of users?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'regularization',
    companySlugs: ['google', 'amazon', 'meta', 'microsoft', 'nvidia'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Easy',
    experience: 'Entry level',
    question:
      'What is the difference between L1 and L2 regularization, and when would you use each?',
    answer:
      'L2 adds the sum of squared weights to the loss, shrinking all weights toward zero proportionally. L1 adds the sum of absolute weights and can set some weights exactly to zero, producing sparse models. Use L2 when you believe most features contribute and want smooth shrinkage. Use L1 when you expect many irrelevant features and want automatic feature selection. Elastic net combines both. Regularization strength is a hyperparameter tuned by cross-validation.',
    explanation:
      'The key distinction is sparsity: L1 produces it, L2 does not. Explain why in terms of the geometry of the constraint region.',
    followUp:
      'Why might L1 regularization still leave many small but non-zero weights in practice?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'object-detection',
    companySlugs: ['nvidia'],
    roles: ['ML Engineer'],
    topic: 'Computer vision',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question:
      'How would you choose between a single-stage and two-stage object detector for a production use case?',
    answer:
      'Two-stage detectors such as Faster R-CNN propose regions then classify them, offering higher accuracy especially on small or densely packed objects. Single-stage detectors such as YOLO perform detection in one pass, offering lower latency. Choose based on latency budget, accuracy requirements on the target object size distribution, and hardware constraints. Benchmark on data representative of the deployment environment because published benchmarks rarely match production conditions. Include both speed and accuracy metrics in the evaluation, and consider anchor-free variants if class imbalance is a challenge.',
    explanation:
      'Avoid choosing based solely on benchmark numbers. Mention that the latency gap has narrowed with modern architectures and that quantization and pruning can shift the trade-off further.',
    followUp:
      'How would you handle a detector that performs well on the test set but struggles on edge-case lighting conditions in production?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'python-generators',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'Python',
    round: 'Coding',
    difficulty: 'Easy',
    experience: 'Entry level',
    question:
      'What is the difference between a Python generator and a list comprehension, and when would you use each?',
    answer:
      'A list comprehension evaluates immediately and stores all values in memory. A generator expression or generator function uses yield to produce values one at a time and holds only the current state in memory. Use a generator when the sequence is large, infinite, or expensive to compute, and you only need to iterate once. Use a list when you need random access, repeated iteration, or the full collection for operations such as sorting or length checks.',
    explanation:
      'The core concept is lazy evaluation. Mention that generators are exhausted after one pass, which is a common source of bugs when the same generator is iterated twice.',
    followUp:
      'How would you implement a generator that yields batches of rows from a large CSV file?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'feature-selection',
    companySlugs: ['google', 'amazon'],
    roles: ['Data Scientist', 'ML Engineer'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Easy',
    experience: 'Entry level',
    question:
      'What approaches would you use to select features before training a model?',
    answer:
      'Filter methods rank features by a statistical criterion such as mutual information, correlation, or variance and are fast but ignore feature interactions. Wrapper methods such as recursive feature elimination use model performance to select subsets and are more powerful but expensive. Embedded methods such as L1 regularization and tree-based importance select during training. Start with a fast filter to remove clearly irrelevant features, then use embedded importance for the remaining set. Validate any selection on a held-out set to avoid optimistic estimates.',
    explanation:
      'Mention that importance from a tree trained on correlated features distributes arbitrarily across them, and that permutation importance or SHAP can be more reliable.',
    followUp:
      'How would you handle two highly correlated features where domain knowledge says both matter?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Behavioral ───────────────────────────────────────────────────
  {
    id: 'behavioral-disagreement',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia', 'openai', 'anthropic', 'huggingface', 'apple', 'netflix', 'stripe'],
    roles: ['ML Engineer', 'AI Engineer', 'Data Scientist'],
    topic: 'Behavioral',
    round: 'Behavioral',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'Describe a time you disagreed with a technical decision made by your team or manager.',
    answer:
      'Use the STAR format: describe the context and the decision you disagreed with, the specific concern you raised and how you raised it (data, an experiment, or a clear argument), the outcome, and what you would do differently. Show that you can advocate for your position while remaining constructive, and that you can commit to a decision once it has been made even when you disagree.',
    explanation:
      'The goal is to show technical judgment and professional communication, not to relitigate old grievances. Avoid framing the story as you versus them. A strong answer includes evidence you used to make your case.',
    followUp:
      'What would you do if the team made the same decision again and the outcome was worse than you predicted?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'behavioral-failure',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia', 'openai', 'anthropic', 'huggingface', 'apple', 'netflix', 'stripe'],
    roles: ['ML Engineer', 'AI Engineer', 'Data Scientist'],
    topic: 'Behavioral',
    round: 'Behavioral',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'Tell me about an ML project that did not deliver the expected results.',
    answer:
      'Use STAR: explain the project goal, what you built, what happened, and what you did next. Own your share of the failure rather than attributing it entirely to data, compute, or other constraints. Name a specific technical mistake — a leaky split, a flawed evaluation metric, a mislabeled dataset — not a vague sense that the model was wrong. Describe what you learned and how you applied it on a subsequent project.',
    explanation:
      'A strong answer names a specific technical root cause, not bad luck or insufficient time. The retrospective action matters as much as the failure itself.',
    followUp:
      'What would be the first thing you would investigate if you had three days to debug the same project now?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'behavioral-ambiguity',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia', 'openai', 'anthropic', 'apple', 'netflix', 'stripe'],
    roles: ['ML Engineer', 'AI Engineer', 'Data Scientist'],
    topic: 'Behavioral',
    round: 'Behavioral',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'Tell me about a time you had to make a technical decision with incomplete information.',
    answer:
      'Use STAR: describe the decision, what information was missing, what assumptions you made and why, how you documented those assumptions, and what you did to limit downside risk. Show that you can move forward without perfect information while keeping the team informed about your uncertainty and the conditions that would change your decision.',
    explanation:
      'This tests judgment and risk management. A strong answer distinguishes between uncertainty that is worth waiting to resolve and uncertainty you can safely assume away for now.',
    followUp:
      'How did you decide what additional information was worth waiting for versus what you could assume away?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'behavioral-stakeholder',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia', 'openai', 'anthropic', 'apple', 'netflix', 'stripe'],
    roles: ['ML Engineer', 'AI Engineer', 'Data Scientist'],
    topic: 'Behavioral',
    round: 'Behavioral',
    difficulty: 'Easy',
    experience: 'Entry level',
    question: 'Describe a time you had to explain a model failure or unexpected result to a non-technical stakeholder.',
    answer:
      'Use STAR: set the scene, describe the failure and how you found it, and explain how you communicated it. Lead with the business impact first, then explain the cause at a level the audience can act on. Show that you gave them what they needed to make a decision rather than a full technical post-mortem. Include what you proposed to fix and what the outcome was.',
    explanation:
      'The best answers show empathy for what the stakeholder needs to know, not just what you know. Avoid jargon without explanation and avoid false reassurance about a fix that is not yet validated.',
    followUp:
      'How would you set up a review process to catch similar issues before they reach stakeholders?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'behavioral-ownership',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'nvidia', 'openai', 'anthropic', 'apple', 'netflix', 'stripe'],
    roles: ['ML Engineer', 'AI Engineer', 'Data Scientist'],
    topic: 'Behavioral',
    round: 'Behavioral',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: "Tell me about a time you took ownership of a problem that was outside your formal responsibilities.",
    answer:
      'Use STAR: describe the problem you noticed, why it was not clearly owned, what you chose to do, how you involved or informed the right people, and the outcome. Show judgment about when to escalate versus act, and demonstrate that you understood the constraints and worked within or around them thoughtfully rather than bypassing important processes.',
    explanation:
      "This tests initiative and judgment. Interviewers probe whether you involved the right people at the right time. A strong answer shows you didn't silently take over someone else's work.",
    followUp:
      "How did you decide this was your problem to solve rather than someone else's?",
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Coding with code ─────────────────────────────────────────────
  {
    id: 'cosine-similarity-code',
    companySlugs: ['google', 'microsoft', 'amazon', 'meta', 'openai', 'huggingface'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'Python',
    round: 'Coding',
    difficulty: 'Easy',
    experience: 'Entry level',
    question: 'Implement a function that computes cosine similarity between two vectors without using a math library.',
    answer:
      'Compute the dot product of the two vectors divided by the product of their L2 norms. Handle the zero-norm edge case by returning 0.0 to avoid division by zero. Raise a ValueError if the vectors have different lengths.',
    codeBlock: `def cosine_similarity(a: list[float], b: list[float]) -> float:
    if len(a) != len(b):
        raise ValueError("Vectors must have equal length")
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x ** 2 for x in a) ** 0.5
    norm_b = sum(x ** 2 for x in b) ** 0.5
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot / (norm_a * norm_b)`,
    codeLanguage: 'python',
    explanation:
      'The implementation should handle equal-length validation and the zero-norm case without importing math. Mention that floating-point precision can push results slightly outside [-1, 1] for normalised vectors.',
    followUp:
      'How would you adapt this to compute all pairwise similarities for a matrix of N embeddings efficiently?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'running-stats-code',
    companySlugs: ['google', 'amazon', 'meta', 'nvidia', 'openai'],
    roles: ['AI Engineer', 'ML Engineer', 'Data Scientist'],
    topic: 'Python',
    round: 'Coding',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: "Implement a class that maintains a running mean and variance as values are streamed in, using constant memory.",
    answer:
      "Use Welford's online algorithm, which updates the mean and the sum of squared deviations incrementally without storing all values. The variance property returns the population variance; divide by n-1 for sample variance.",
    codeBlock: `class RunningStats:
    def __init__(self) -> None:
        self._n = 0
        self._mean = 0.0
        self._M2 = 0.0   # sum of squared deviations from current mean

    def update(self, x: float) -> None:
        self._n += 1
        delta = x - self._mean
        self._mean += delta / self._n
        self._M2 += delta * (x - self._mean)  # uses updated mean

    @property
    def mean(self) -> float:
        return self._mean

    @property
    def variance(self) -> float:          # population variance
        return self._M2 / self._n if self._n > 0 else 0.0

    @property
    def count(self) -> int:
        return self._n`,
    codeLanguage: 'python',
    explanation:
      "Welford's algorithm is numerically stable and O(1) in memory. The key is using the updated mean in the M2 accumulation step. Mention that two RunningStats instances can be merged by combining their n, mean, and M2 fields.",
    followUp:
      'How would you merge the running statistics from two independent workers processing different data shards?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'sql-retention-code',
    companySlugs: ['meta', 'amazon', 'stripe', 'netflix'],
    roles: ['Data Scientist', 'ML Engineer'],
    topic: 'SQL',
    round: 'Coding',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'Write a SQL query that computes 30-day retention for each weekly cohort of users, given a table of daily login events.',
    answer:
      'Find each user\'s first-seen date, group users into weekly cohorts, then count how many returned within 30 days. Divide retained users by cohort size to get the retention rate.',
    codeBlock: `-- Table: events(user_id BIGINT, event_date DATE)
WITH first_seen AS (
    SELECT user_id, MIN(event_date) AS cohort_date
    FROM events
    GROUP BY user_id
),
cohort_size AS (
    SELECT
        DATE_TRUNC('week', cohort_date) AS cohort_week,
        COUNT(DISTINCT user_id)          AS total_users
    FROM first_seen
    GROUP BY 1
),
retained AS (
    SELECT
        DATE_TRUNC('week', f.cohort_date) AS cohort_week,
        COUNT(DISTINCT e.user_id)          AS retained_users
    FROM first_seen f
    JOIN events e
      ON  e.user_id    = f.user_id
      AND e.event_date >  f.cohort_date
      AND e.event_date <= f.cohort_date + INTERVAL '30 days'
    GROUP BY 1
)
SELECT
    c.cohort_week,
    c.total_users,
    COALESCE(r.retained_users, 0)                                    AS retained_users,
    ROUND(COALESCE(r.retained_users, 0)::numeric / c.total_users, 3) AS retention_rate
FROM cohort_size  c
LEFT JOIN retained r USING (cohort_week)
ORDER BY c.cohort_week;`,
    codeLanguage: 'sql',
    explanation:
      "COALESCE handles cohorts with zero retention. The strict inequality on event_date excludes the sign-up day itself from the retained count. Clarify with the interviewer whether returning on the same day should count.",
    followUp:
      'How would you extend this to compute 7-day, 30-day, and 90-day retention in a single query?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── GenAI & Agents ───────────────────────────────────────────────
  {
    id: 'agent-loop-design',
    companySlugs: ['openai', 'anthropic', 'google', 'microsoft'],
    roles: ['AI Engineer'],
    topic: 'GenAI & Agents',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'How would you design a reliable agent loop that calls external tools to complete a multi-step task?',
    answer:
      'Give the model a clear task description, a typed tool schema, and instructions to emit structured calls. Validate tool arguments before executing them and return structured results including errors. Limit the number of steps and total tokens consumed. Separate the loop controller from the model to enable retries, logging, and policy enforcement. Keep tools idempotent where possible and require explicit confirmation before irreversible actions.',
    explanation:
      'Reliability comes from the system around the model, not the model itself. Non-determinism makes it hard to guarantee a specific execution path, so monitoring and graceful failure matter more than forcing a fixed sequence.',
    followUp:
      'How would you prevent an agent from entering an infinite loop when a tool keeps failing?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'agent-evaluation',
    companySlugs: ['openai', 'anthropic', 'google', 'microsoft'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'GenAI & Agents',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'How would you evaluate whether a multi-step AI agent is improving across versions?',
    answer:
      'Define tasks with known correct outcomes or verifiable end states. Measure task completion rate, number of steps, cost, and latency. Where ground truth is hard to define, use a judge model or a rubric to rate intermediate steps and final outputs. Curate a diverse evaluation set including edge cases and adversarial examples. Run evaluations deterministically using fixed seeds and mocked external calls, and track regressions across versions.',
    explanation:
      'End-to-end task completion is the primary signal but can be noisy. Per-step quality metrics help locate where a version regressed. Mention that judge models have their own biases and should be calibrated against human ratings.',
    followUp:
      'How would you build an evaluation set for a task where correct answers are inherently open-ended?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'context-overflow',
    companySlugs: ['openai', 'anthropic', 'microsoft', 'google'],
    roles: ['AI Engineer'],
    topic: 'GenAI & Agents',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: "How would you handle a conversation or document that exceeds the model's context window?",
    answer:
      'Decide which content is essential for the current query. For conversations, keep the system prompt, the most recent turns, and a compressed summary of older turns. For documents, retrieve relevant chunks rather than passing the full text. Always inform the model which information has been omitted. Monitor how often truncation occurs and whether query quality degrades — that signals the retrieval or summarisation step needs improvement.',
    explanation:
      'Different strategies suit different use cases: retrieval for document QA, summarisation for long conversations. Truncating silently is usually worse than explicit omission with a note to the model.',
    followUp:
      'How would you decide how much conversation history to summarise versus pass verbatim?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'tool-calling-security',
    companySlugs: ['openai', 'anthropic', 'microsoft'],
    roles: ['AI Engineer'],
    topic: 'GenAI & Agents',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'What security boundaries would you enforce in a system where an LLM can call external tools?',
    answer:
      'Enforce tool permissions outside the model: the model requests an action, the controller decides whether to execute it. Apply the principle of least privilege to each tool. Validate and sanitise all arguments before execution. Require human confirmation for high-impact or irreversible actions. Log every tool call with its arguments and result. Rate-limit calls and apply a token budget. Treat retrieved content as untrusted data and test for prompt injection in tool outputs.',
    explanation:
      'The model cannot be trusted to self-enforce safety boundaries. The system architecture must assume the model can be manipulated and enforce constraints in code, not prompts.',
    followUp:
      'How would you prevent a retrieved web page from hijacking the agent with an injected instruction?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── MLOps ────────────────────────────────────────────────────────
  {
    id: 'ml-pipeline-cicd',
    companySlugs: ['google', 'amazon', 'microsoft', 'meta'],
    roles: ['ML Engineer', 'AI Engineer'],
    topic: 'MLOps',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'How would you design a CI/CD pipeline for an ML model that runs in production?',
    answer:
      'Separate data validation, training, evaluation, and deployment into distinct reproducible stages. Gate each stage: fail if data quality checks fail, if evaluation metrics fall below a threshold, or if the model regresses on a golden dataset. Version models, datasets, and configurations together. Use a model registry to promote from staging to production. Run integration tests against a staging environment before promoting, and support rollback by keeping the previous version active alongside the new one.',
    explanation:
      'An ML CI/CD pipeline is more complex than software CI/CD because training is non-deterministic and evaluation requires agreement on what "better" means. Mention the need to test code changes and data changes as separate triggers.',
    followUp:
      'How would you handle a training run that is too expensive to run on every commit?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'model-rollback',
    companySlugs: ['google', 'amazon', 'microsoft', 'meta'],
    roles: ['ML Engineer', 'AI Engineer'],
    topic: 'MLOps',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'How would you design a rollback strategy for a model that degrades after deployment?',
    answer:
      'Keep the previous model version live and route a small traffic slice to it even after promoting the new version. Define alert thresholds on business metrics, error rates, and output distributions that trigger rollback or human review. Store model artifacts, preprocessing code, and feature definitions together so a rollback is fully reproducible. After rolling back, diagnose the regression on offline data before redeploying.',
    explanation:
      'A rollback that restores the model but not the feature store or preprocessing logic often reproduces the same problem. Everything the model depends on must be versioned together.',
    followUp:
      'What single metric would you monitor to decide within 30 minutes whether a new model needs to be rolled back?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'shadow-canary',
    companySlugs: ['google', 'amazon', 'meta'],
    roles: ['ML Engineer'],
    topic: 'MLOps',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'What is the difference between shadow deployment and canary deployment for ML models, and when would you use each?',
    answer:
      "Shadow deployment routes a copy of live traffic to the new model but only the existing model's predictions reach users. Canary deployment serves a small percentage of users with the new model's actual predictions. Use shadow deployment to validate predictions and latency with zero user risk. Use canary deployment once shadow results are acceptable and you need to measure business metrics that require real user responses. Both require careful traffic allocation to avoid biasing the evaluation.",
    explanation:
      "Shadow deployment cannot measure user behaviour effects because it never changes the response. Mention that shadow deployment adds latency overhead on the mirrored path, and that canary deployment requires guarding against novelty effects.",
    followUp:
      'How would you decide when to ramp a canary from 1% to 10% of production traffic?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Safety & Alignment ───────────────────────────────────────────
  {
    id: 'red-teaming-llm',
    companySlugs: ['openai', 'anthropic'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'Safety & Alignment',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'How would you systematically red-team a language model before releasing it?',
    answer:
      'Define harm categories relevant to the deployment context: misinformation, toxic content, dangerous instructions, privacy leakage. Use both manual red-teamers and automated adversarial prompts. Test jailbreak patterns such as role-playing, hypothetical framing, and continuation prompts; test multi-turn strategies and long-context attacks. Score responses against a rubric and track which categories the model fails most. Feed failures back into training or build a deployment-time classifier. Document what was tested and what was not.',
    explanation:
      'Red-teaming is not complete coverage; it is a structured way to discover the most exploitable weaknesses before release. Automated tools find breadth; manual testers find creative depth. A strong answer covers both.',
    followUp:
      'How would you measure whether a safety fix for one vulnerability improved or regressed a related capability?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'constitutional-ai',
    companySlugs: ['anthropic', 'openai'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'Safety & Alignment',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'What is Constitutional AI and how does RLAIF differ from standard RLHF?',
    answer:
      'Constitutional AI uses a set of written principles to guide both supervised fine-tuning and reward modelling. In the SL-CAI stage, the model critiques and revises its own outputs according to the principles, generating training data without per-example human annotation. In the RLAIF stage, a model rather than human raters evaluates responses against the constitution to produce preference labels. This makes the process more scalable and the evaluation criteria more explicit than standard RLHF, whose human judgments remain implicit.',
    explanation:
      'The key distinction is that RLAIF replaces or supplements human raters with a model, and the criteria are made explicit in a document. Mention that this introduces a new source of bias: the model used for evaluation can have its own undesirable preferences.',
    followUp:
      'What could go wrong if the model generating RLAIF preference labels has its own systematic biases?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'model-cards',
    companySlugs: ['openai', 'anthropic', 'google', 'microsoft', 'huggingface'],
    roles: ['AI Engineer', 'ML Engineer', 'Data Scientist'],
    topic: 'Safety & Alignment',
    round: 'Technical',
    difficulty: 'Easy',
    experience: 'Entry level',
    question: 'What should a model card include, and why does it matter for responsible deployment?',
    answer:
      'A model card describes: the intended use cases and explicitly out-of-scope uses, training data sources and known biases, evaluation metrics broken down by relevant subgroups, known limitations and failure modes, and recommendations for monitoring. It matters because downstream users make deployment decisions based on it — an incomplete card leads to misuse in contexts the model was not designed for. Include both what the model does well and where it is known to struggle.',
    explanation:
      'Subgroup-disaggregated evaluation is often the most critical section because aggregate accuracy can hide serious performance gaps on important demographics. A strong answer explains why omitting this is not just an oversight but a risk.',
    followUp:
      'How would you keep a model card accurate and current as you retrain the model on new data?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Privacy & on-device ──────────────────────────────────────────
  {
    id: 'federated-learning',
    companySlugs: ['apple'],
    roles: ['ML Engineer', 'AI Engineer'],
    topic: 'Privacy & ML',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'What are the key trade-offs in federated learning compared to centralised training?',
    answer:
      'Federated learning keeps training data on device, reducing privacy risk and regulatory exposure. The trade-offs are communication cost (many rounds of gradient exchange), statistical heterogeneity (non-IID data across devices), systems heterogeneity (varying compute and availability), and difficulty debugging without access to individual examples. Gradients can still leak information through reconstruction attacks, so combining federated learning with differential privacy or secure aggregation adds protection at the cost of some model accuracy.',
    explanation:
      'Federated learning does not automatically guarantee privacy — it reduces the attack surface but gradient leakage is a real threat. The central tension is between stronger privacy guarantees and model quality.',
    followUp:
      'How would you validate that a federally trained model generalises well across heterogeneous device populations?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'on-device-inference',
    companySlugs: ['apple', 'nvidia'],
    roles: ['ML Engineer'],
    topic: 'Inference',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'What constraints shape model design and deployment when the model must run on a mobile device?',
    answer:
      'Primary constraints are model size (flash and RAM), inference latency, battery impact, and thermal limits. Techniques: use smaller architectures, apply quantisation and pruning, use hardware-specific kernels (Core ML on Apple, NNAPI on Android), and avoid dynamic shapes that prevent graph compilation. Test on actual devices at the target battery level and thermal state, not only on simulators. Design the feature pipeline to work without a network request.',
    explanation:
      "Thermal throttling is often overlooked: a device that has been running a demanding app may execute the model significantly slower than benchmarks suggest. Server-side numbers don't translate directly to device performance even for the same architecture.",
    followUp:
      'How would you decide whether to run inference on-device or on a server for a new feature?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Netflix ──────────────────────────────────────────────────────
  {
    id: 'long-term-value',
    companySlugs: ['netflix', 'meta', 'amazon'],
    roles: ['Data Scientist', 'ML Engineer'],
    topic: 'Recommendations',
    round: 'Technical',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'How would you design a recommendation objective that maximises long-term user value rather than short-term engagement?',
    answer:
      'Define a proxy for long-term value: subscription retention, weekly active days, content satisfaction ratings, or a composite. Train a model to predict this metric rather than next-click engagement. Use offline simulation to check that optimising the proxy actually changes the long-term outcome, and run online experiments with a measurement window long enough to observe retention effects. Instrument the system to log counterfactuals so you can estimate long-term effects from historical data.',
    explanation:
      'Short-term engagement optimises for what is clickable, which can surface addictive or low-quality content. The hardest part is defining and measuring long-term value before you can optimise for it.',
    followUp:
      'How would you measure whether a recommendation change improved long-term satisfaction in an A/B test that must conclude in two weeks?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'content-cold-start',
    companySlugs: ['netflix'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'Recommendations',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'How would you surface newly released content to users before it has accumulated watch history?',
    answer:
      'Use content-based features: genre, cast, director, themes, and description embeddings, matched against content the user has watched. Allocate a small exploration fraction of impressions to new titles using upper confidence bound or Thompson sampling, balancing exposure with early quality signals such as completion rate and ratings as they accumulate. Retire the cold-start treatment once the item has enough interaction data for the collaborative model.',
    explanation:
      'The exploration fraction is a business decision: too little and new content is never discovered; too much and user experience degrades. Mention that the cold-start problem for new users and new items are separate problems with different solutions.',
    followUp:
      'How would you decide when a title has accumulated enough watch history to graduate from cold-start treatment?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Stripe ───────────────────────────────────────────────────────
  {
    id: 'fraud-adversarial',
    companySlugs: ['stripe'],
    roles: ['ML Engineer', 'Data Scientist'],
    topic: 'ML system design',
    round: 'System design',
    difficulty: 'Hard',
    experience: 'Senior',
    question: 'How would you keep a fraud detection model effective as fraudsters adapt to it?',
    answer:
      "Treat fraud as an adversarial game: monitor shifts in the feature distribution of flagged and cleared transactions, look for novel patterns in cases the model missed, and schedule regular retraining on fresh labeled data. Avoid publishing feature details that help adversaries circumvent the model. Favour features that are harder to forge — device fingerprints, behavioural biometrics — alongside easier-to-game fields. Run red-team exercises with your fraud operations team and test against known evasion techniques.",
    explanation:
      'A deployed fraud model leaks information about itself through its decisions, so adversaries can probe it systematically. A strong answer mentions the tension between transparency (for users challenging false positives) and opacity (to prevent gaming).',
    followUp:
      'How would you detect that fraudsters have already adapted to and are systematically evading your current model?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'fraud-threshold',
    companySlugs: ['stripe', 'amazon'],
    roles: ['Data Scientist', 'ML Engineer'],
    topic: 'ML fundamentals',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'How would you set the decision threshold for a fraud classifier when false positives and false negatives carry very different costs?',
    answer:
      'Model the costs explicitly: estimate the average loss per missed fraud and the cost of a false positive (refund overhead, customer friction, account closure). Compute the expected cost at each threshold on a calibrated validation set and choose the threshold that minimises total cost. Validate on a time-based holdout and monitor threshold performance in production separately from the model\'s ranking quality (AUC). Revisit the threshold when the cost structure or base fraud rate changes.',
    explanation:
      'There is no universally optimal threshold; it is a business decision informed by a cost model. Distinguish threshold selection from model quality: you can have a well-ranked model with a poorly set threshold.',
    followUp:
      'How would you handle a situation where the fraud rate drops significantly after deployment, changing the optimal threshold?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },

  // ── Hugging Face / LLMs ──────────────────────────────────────────
  {
    id: 'lora-vs-full-finetune',
    companySlugs: ['huggingface', 'google', 'microsoft'],
    roles: ['AI Engineer', 'ML Engineer'],
    topic: 'LLMs',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'What is the difference between full fine-tuning, LoRA, and prompt tuning, and when would you choose each?',
    answer:
      'Full fine-tuning updates all model weights: highest quality ceiling, highest compute and memory cost. LoRA freezes the base model and adds small trainable rank-decomposition matrices to attention layers, reducing trainable parameters by 10–100× while recovering most of the quality gain. Prompt tuning adds learnable input tokens and trains only those, but generally underperforms LoRA on complex tasks. Choose full fine-tuning when quality is critical and compute is available. Choose LoRA when you need multiple adapters on the same base model or must train efficiently at scale. Choose prompt tuning when even LoRA is too expensive.',
    explanation:
      'The three approaches form a spectrum of parameter efficiency versus quality. A significant operational advantage of LoRA is that adapters are small, composable, and easy to swap at inference time, enabling personalisation at scale.',
    followUp:
      'How would you choose the rank hyperparameter r in LoRA for a new task with no prior experiments?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
  {
    id: 'benchmark-contamination',
    companySlugs: ['huggingface', 'openai', 'anthropic', 'google'],
    roles: ['AI Engineer', 'ML Engineer', 'Data Scientist'],
    topic: 'LLMs',
    round: 'Technical',
    difficulty: 'Medium',
    experience: 'Mid level',
    question: 'Why can standard benchmarks be misleading when evaluating language model improvements?',
    answer:
      'Common issues: benchmark contamination (training data contains benchmark examples), saturation (models already score near ceiling, leaving no signal), narrow coverage (a benchmark captures only a slice of real-world use), and metric mismatch (BLEU or accuracy does not reflect the quality users care about). Use task-specific evaluations on held-out data not in training, human preference studies for open-ended outputs, and red-teaming for safety properties. Track metrics that correspond to deployment objectives.',
    explanation:
      'Benchmark contamination is the most frequently underestimated problem: even accidental inclusion of benchmark data in pretraining can inflate scores significantly and makes fair comparison between models trained on different data very difficult.',
    followUp:
      'How would you design an evaluation suite for a customer-support LLM that could not be gamed by training on public benchmarks?',
    sourceType: 'practice',
    reviewedAt: '2026-10-07',
  },
];
export const practiceNotice =
  'Original practice questions organized into suggested company tracks. These are not confirmed interview questions or employer-endorsed preparation guides.';
export function filterQuestions(
  items: InterviewQuestion[],
  filters: {
    search: string;
    role: string;
    topic: string;
    round: string;
    difficulty: string;
    experience: string;
  },
) {
  return items.filter(
    (item) =>
      matchesSearch(filters.search, [
        item.question,
        item.topic,
        ...item.roles,
      ]) &&
      (!filters.role || item.roles.includes(filters.role)) &&
      (!filters.topic || item.topic === filters.topic) &&
      (!filters.round || item.round === filters.round) &&
      (!filters.difficulty || item.difficulty === filters.difficulty) &&
      (!filters.experience || item.experience === filters.experience),
  );
}
export function preparationHref(company: string) {
  const track = companies.find(
    (item) => item.name.toLowerCase() === company.trim().toLowerCase(),
  );
  return track ? '/interviews/' + track.slug : '/interviews';
}
