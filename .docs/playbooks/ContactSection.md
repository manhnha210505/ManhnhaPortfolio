# Contact Section

## Purpose
Low-friction path to reach out — see `architecture/DataFlow.md` for the technical flow (form → server action → Supabase `contacts` table).

## Content
**Heading (draft):** "Let's talk" / "Get in touch"
**Sub-copy (draft):**
> Open to full-time opportunities in Data Science and Machine Learning. Feel free to reach out — I read everything myself.

> ⚠️ Câu trên giả định bạn đang mở cho cơ hội full-time DS/ML nói chung (Mục 2 chưa điền cụ thể) — sửa lại khi bạn xác định rõ hơn hướng đi.

**Direct channels shown alongside the form:**
- Email: manhnha210505@gmail.com
- GitHub: https://github.com/manhnha210505
- LinkedIn: *(chưa có — thêm khi có link)*

**Not shown publicly:** phone number (per your decision — keep off-site, share directly when needed).

## Form fields
Name, Email, Message (minimal — don't add fields that create friction). Client-side validation first, then server-side (see `architecture/DataFlow.md`).

## States
Success/error feedback via motion-appropriate micro-interaction (`motion/MicroInteractions.md`) — never rely on color alone (`engineering/Accessibility.md`).
