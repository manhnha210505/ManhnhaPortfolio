# Projects Section

## Purpose
Primary proof point — see `profiles/TechLead.md` and `profiles/HiringManager.md`: honesty about team context + real numbers + framing (Problem → Approach → Impact, per `branding/Storytelling.md`) is what makes this section credible under scrutiny.

## Project 1: Image Captioning

**Card / preview copy:**
> An image captioning system combining a Vision Transformer encoder with a Transformer decoder — generating natural-language descriptions of images end to end.

**Meta:** Team project (4 members) · Role: Team Lead · Computer Vision course, HUFLIT · [GitHub →](https://github.com/manhnha210505/image_captioning)

**Case study body:**

*Problem*
Recent progress in multi-modal deep learning (VQA, text-to-image, NLVR — DALL·E being the clearest example) motivated the team to explore the reverse direction: image-to-text. The goal was a model that generates accurate natural-language captions from images, useful for content search and accessibility use cases. Vision Transformer's shift from convolution to self-attention — learning global relationships from the earliest layers instead of only in deep layers — made it a strong fit for a task that requires understanding context and spatial relationships between objects, not just detecting them individually.

*Approach*
An encoder-decoder architecture: ViT as the encoder producing image embeddings, paired with a Transformer decoder generating the caption sequence. Trained and evaluated on Flickr8k.

*Impact*
BLEU-4 of 0.1883, outperforming CNN+LSTM baselines.

> ⚠️ Khi có số liệu training chi tiết hơn (dataset split, epoch, learning rate schedule — đã có sẵn trong README repo) và các failure mode đã ghi nhận (nhầm giới tính, lặp từ), nên đưa thêm vào để tăng độ tin cậy với persona TechLead (`profiles/TechLead.md`) — hiện case study này đang ở mức tóm tắt.

## Project 2: Spam Classification with k-Nearest Neighbors

**Card / preview copy:**
> A spam email classifier built on k-NN with TF-IDF feature vectors, comparing four distance metrics to find the most effective similarity measure.

**Meta:** Team project (3 members) · Role: Team Lead · Machine Learning course, HUFLIT · [GitHub →](https://github.com/manhnha210505/classify_spam_using_k_nearest_neighbors)

**Case study body:**

*Problem*
Spam filtering needs to keep adapting as spam content evolves — traditional rule-based filtering falls behind, exposing users to phishing and malware risk. This motivated applying a machine learning approach that classifies based on similarity to previously labeled examples rather than fixed rules.

*Approach*
Emails vectorized with TF-IDF (term importance weighting), classified via k-NN majority vote across the k nearest neighbors, comparing Cosine, Euclidean, Manhattan, and Minkowski distance metrics.

*Impact*
At k=5 — Accuracy 96%, Precision 97.3%, Recall 93.5%.

## Layout notes
Both projects use identical card structure (per `design/ComponentGuidelines.md` consistency rule) — Problem/Approach/Impact should be visually distinguishable (e.g. small labels), not a wall of undifferentiated text. Reveal-on-scroll per `motion/MicroInteractions.md` (image reveal + staggered text).
