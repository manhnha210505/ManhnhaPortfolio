# Personal Profile — Source of Truth

> Đây là dữ liệu gốc về ManhNha, dùng làm nguồn duy nhất khi viết nội dung cho `content/` (copy hiển thị trên site) và `docs/playbooks/` (bố cục từng section). Không sửa thông tin cá nhân ở bất kỳ file nào khác trong `docs/knowledge/` hoặc `docs/profiles/` — luôn sửa ở đây trước.

## 1. Thông tin cá nhân
- Họ tên đầy đủ: Trần Đăng Mạnh
- Nickname/tên hiển thị: manhnha
- Ngày sinh: 21/05/2005
- Địa điểm hiện tại: Biên Hòa, Đồng Nai
- Email liên hệ: manhnha210505@gmail.com
- Số điện thoại: *(không public trên site — chỉ dùng nội bộ khi liên hệ trực tiếp)*
- LinkedIn: *(chưa có — cần bổ sung nếu muốn link)*
- GitHub: https://github.com/manhnha210505
- Các mạng xã hội khác muốn public: *(chưa có)*
- Ngôn ngữ giao tiếp: Tiếng Việt, English

## 2. Mục tiêu nghề nghiệp
- Vị trí đang tìm (full-time): *(chưa điền)*
- Ngành/lĩnh vực ưu tiên: *(chưa điền — có thể để ngỏ)*
- Định hướng ngắn hạn (1-2 năm): *(chưa điền)*
- Định hướng dài hạn: *(chưa điền)*
- Loại công ty mong muốn: *(chưa điền)*

## 3. Học vấn
- Trường: Trường Đại học Ngoại ngữ - Tin học TP. Hồ Chí Minh (HUFLIT)
- Chuyên ngành: Khoa học dữ liệu
- Thời gian: 2023 - 2027
- GPA / xếp loại: 3.4/4.0
- Môn học/đồ án nổi bật: *(chưa điền)*

## 4. Kỹ năng
**Data Science / Statistics:**
- Phân tích & tiền xử lý dữ liệu (EDA, feature engineering)
- Thống kê ứng dụng (distance metrics, đánh giá mô hình: precision/recall/F1)
- Xử lý dữ liệu văn bản (NLP tiền xử lý, tokenization)

**Machine Learning:**
- Thuật toán cổ điển: k-NN, Naive Bayes, Decision Tree, Gradient Descent, Logistic Regression, K-Means Clustering
- Deep Learning: CNN, RNN/LSTM, Transformer, Vision Transformer (ViT)
- Computer Vision: image captioning, encoder-decoder architecture
- Đánh giá mô hình: BLEU score, cross-validation

**Data Visualization:**
- Matplotlib, Seaborn, Plotly
- Trực quan hóa cho báo cáo học thuật (biểu đồ so sánh baseline)

**MLOps:**
- Quản lý experiment
- Model deployment cơ bản
- CI/CD cơ bản

**Backend Development:**
- Next.js API routes / server actions
- Supabase (database, auth)
- RESTful API design

**Cloud Technologies:**
- Cloudflare (Pages/Workers, DNS)
- Supabase (BaaS)
- Vercel

**Ngôn ngữ lập trình:** Python (chính cho DS/ML), TypeScript/JavaScript, SQL

**Framework/Thư viện:**
- ML/DS: scikit-learn, PyTorch/TensorFlow, pandas, NumPy
- Web: Next.js, React, Tailwind CSS, shadcn/ui, Framer Motion

**Công cụ khác:** Git/GitHub, Jupyter Notebook, Docker, Tailscale

## 5. Kinh nghiệm làm việc
*(chưa có — chưa từng đi làm/thực tập chính thức, hoặc chưa điền)*

## 6. Dự án (Projects)

### Dự án 1: Image Captioning
- Link: https://github.com/manhnha210505/image_captioning
- Loại: Dự án nhóm (4 người) — môn Computer Vision, HUFLIT
- Vai trò: **Team Leader**
- Problem: Lấy cảm hứng từ các bước tiến trong multi-modal deep learning (VQA, text-to-image, NLVR — ví dụ DALL-E), nhóm hướng tới xây dựng hệ thống Image-to-text sinh chú thích ảnh tự động, cải thiện khả năng tìm kiếm nội dung dựa trên hiểu biết ngữ nghĩa hình ảnh. Sự xuất hiện của Vision Transformer (ViT) — thay tầng tích chập bằng self-attention, học được quan hệ toàn cục ngay từ đầu — mở ra hướng tiếp cận mới phù hợp với bài toán vốn cần hiểu ngữ cảnh và quan hệ không gian giữa các đối tượng trong ảnh.
- Approach: Kết hợp ViT làm encoder (sinh image embeddings) với Transformer decoder để sinh mô tả ngôn ngữ tự nhiên, huấn luyện trên Flickr8k.
- Impact: BLEU-4 đạt 0.1883, vượt baseline CNN+LSTM.

### Dự án 2: Phân loại thư rác bằng K-Nearest Neighbors
- Link: https://github.com/manhnha210505/classify_spam_using_k_nearest_neighbors
- Loại: Dự án nhóm (3 người) — môn Machine Learning, HUFLIT
- Vai trò: **Team Leader**
- Problem: Lọc thư rác truyền thống không theo kịp thư rác biến đổi liên tục, dẫn tới rủi ro lừa đảo/malware; cần áp dụng ML để thích nghi tốt hơn.
- Approach: k-NN kết hợp TF-IDF để vector hóa email có trọng số, so sánh 4 loại khoảng cách (Cosine, Euclidean, Manhattan, Minkowski) để phân loại theo đa số phiếu của k hàng xóm gần nhất.
- Impact: Với k=5 — Accuracy 96%, Precision 97.3%, Recall 93.5%.

## 7. Chứng chỉ (Certificates)
*(chưa có)*

## 8. Hoạt động (Activities)
*(chưa có)*

## 9. Danh hiệu và giải thưởng (Awards)
*(chưa có)*

## 10. Sở thích (Hobbies)
- Sở thích cá nhân: Đam mê tìm hiểu công nghệ AI mới; có thể ngồi hàng giờ để code; thích nấu ăn; thích làm quen, kết nối với nhiều người.
- Hiển thị công khai: *(chưa quyết định — gợi ý: đưa 1-2 dòng ngắn vào About, không tách thành section riêng)*
