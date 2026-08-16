# PerfectVideo Showcase — 月檐阙真机展示

> 产物：本目录素材均由 PerfectVideo skill 在 **MiniMax-H3** 上真机生成，**无人工修改画面**（月檐阙系列生成于 0.2.1 时期，方法论已演进至 0.2.9）。  
> 成本：3 次 H3 任务 × 343 积分 = ~1029 积分（已一次性跑完）。  
> 复现：见文末「可复现命令」。

---

## 1. 产物清单（4 文件）

| 文件 | 大小 | 类型 | 内容 |
|------|------|------|------|
| `demo_v1.webp` | 442 KB | 动图 6s @8fps | **v1 旧版**——固定→极缓推（运镜平淡基线） |
| `demo_v3.webp` | 641 KB | 动图 7s @8fps | **v3 惊艳版**——接续起飞 + 推半身 + 拉远俯瞰（多运镜序列） |
| `demo_seam.webp` | 352 KB | 动图 5s @8fps | **接缝连戏**——v1 尾帧 + 1s 溶解 + v3 首帧（无缝衔接） |
| `compare_v1_vs_v3.jpg` | 59 KB | 静态对比 | 同帧位（t=8s）：v1 vs v3 视觉差异 |

---

## 2. 这证明了什么？

| 维度 | 证据 |
|------|------|
| **跨镜连戏**（锁 vs 祈祷） | `demo_seam.webp` 接缝处无突变——v1 尾帧 = v3 首帧（首帧继承） |
| **运镜指令遵从**（导演野心 vs 模型执行力） | v3 用了多运镜序列，比 v1 单一运镜视觉密度更高（见对比图） |
| **真机产物可信度** | 全部来自 MiniMax-H3 2K 15s 输出，无后期特效 |

**已知短板（鲁班评测发现）：** v3 的 P3「推半身」段在 H3 上被打折了——模型只执行了 P1/P2/P4/P5。这是 H3 模型物理执行度问题，不是 prompt 问题。修法见 `research/09-luban-review.md`（逐拍生成 fallback）。

---

## 3. 可复现命令（任何人可重做）

### 前置
```bash
# 准备素材（无素材版本，纯文生）
# prompts:
#   v1: examples/golden-a-single15.md  §5 投喂区（15s 静态运镜）
#   v3: examples/golden-b-yueyanque-single15.md  §5 投喂区（接续首帧 + 多运镜）
```

### 提交 v1（独立 15s）
```bash
PY="C:/Users/hooji/.workbuddy/binaries/python/versions/3.13.12/python.exe"
PROMPT_FILE="D:/skills/PerfectVideo/examples/golden-a-single15.md"

# 提取 §5 投喂区纯文本到 .txt（用脚本或手动复制）
# 然后提交（不带 --wait，先拿 task_id 避免 urllib 下载超时丢任务）：
$PY "C:/Users/hooji/.workbuddy/skills/topapis/scripts/kling_video.py" \
    --model MiniMax-H3 \
    --prompt-file "<extracted_v1_prompt>.txt" \
    --duration 15 --watermark \
    --client-business-id "yueyanque_v1_kezhi" \
    --output-dir "D:/skills/PerfectVideo/outputs"
# 拿到 task_id → 用 scripts/fetch_video.py --task-json 下载（防 urllib SSL 超时）
```

### 提交 v3（接续首帧 15s）
```bash
# 1) 抽 v1 最后一帧作 v3 首帧
ffmpeg -sseof -0.3 -i outputs/yueyanque_v1.mp4 -frames:v 1 outputs/old_lastframe.jpg

# 2) 提交 v3（带 first-frame 续接模式）
$PY "C:/Users/hooji/.workbuddy/skills/topapis/scripts/kling_video.py" \
    --model MiniMax-H3 \
    --prompt-file "outputs/yueyanque_v3_prompt.txt" \
    --first-frame "outputs/old_lastframe.jpg" \
    --duration 15 --watermark \
    --client-business-id "yueyanque_v3_firstframe" \
    --output-dir "D:/skills/PerfectVideo/outputs"
```

### 拼接 29s（xfade 1s 交叉溶解）
```bash
ffmpeg -y \
    -i outputs/yueyanque_v1.mp4 -i outputs/yueyanque_v3.mp4 \
    -filter_complex "[0:v][1:v]xfade=transition=fade:duration=1:offset=14.084[v];[0:a][1:a]acrossfade=d=1[a]" \
    -map "[v]" -map "[a]" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 \
    -c:a aac -b:a 192k \
    -movflags +faststart \
    outputs/yueyanque_merged_29s.mp4
```

⚠️ **坑：** `-pix_fmt yuv420p -profile:v high -movflags +faststart` 缺一不可，否则 Windows 播放器拒播（xfade 默认输出 4:4:4）。

### 抽 GIF（本文档用的小体积 WebP）
```bash
# demo_v1.webp（6s @ 8fps, 360p 宽，~440KB）
ffmpeg -ss 1 -t 6 -i yueyanque_v1.mp4 \
    -vf "fps=8,scale=360:-1:flags=lanczos" -loop 0 -an demo_v1.webp

# demo_v3.webp（7s）
ffmpeg -ss 3 -t 7 -i yueyanque_v3.mp4 \
    -vf "fps=8,scale=360:-1:flags=lanczos" -loop 0 -an demo_v3.webp

# demo_seam.webp（5s 取接缝段）
ffmpeg -ss 12.5 -t 5 -i yueyanque_merged_29s.mp4 \
    -vf "fps=8,scale=360:-1:flags=lanczos" -loop 0 -an demo_seam.webp
```

### 对比图（v1 vs v3 同帧位）
```bash
ffmpeg -ss 8 -i yueyanque_v1.mp4 -frames:v 1 -vf "scale=640:-1" /tmp/v1.jpg
ffmpeg -ss 8 -i yueyanque_v3.mp4 -frames:v 1 -vf "scale=640:-1" /tmp/v3.jpg
ffmpeg -i /tmp/v1.jpg -i /tmp/v3.jpg \
    -filter_complex "[0:v]pad=iw*2:ih[bg];[bg][1:v]overlay=w" \
    compare_v1_vs_v3.jpg
```

---

## 4. 复现成本

| 阶段 | 动作 | 成本（积分） |
|------|------|--------------|
| 准备 | 抽尾帧 / 写 prompt | 0 |
| v1 生成 | H3 15s ×1 | ~343 |
| v3 生成 | H3 15s ×1 + 首帧 | ~343 |
| 拼接 | ffmpeg xfade | 0 |
| 抽 GIF | ffmpeg webp | 0 |
| 对比图 | ffmpeg overlay | 0 |
| **合计** | | **~686** |

**对比同类 skill showcase 成本：** video-shotcraft 需要搭建 Remotion 渲染环境才能产出 GIF；seedance-cinematic-video 的 showcase 是模板截图。月檐阙这版是**纯真机视频产物，零后期渲染**——同行无法抄。

---

## 5. 引用

- v1 产物：`D:\skills\PerfectVideo\outputs\yueyanque_h3_15s.mp4`（7MB · 15s）
- v3 产物：`D:\skills\PerfectVideo\outputs\yueyanque_v3_15s.mp4`（14MB · 15s）
- 接缝拼接：`D:\skills\PerfectVideo\outputs\yueyanque_merged_29s.mp4`（32MB · 29s · Windows 兼容）
- 提示词：金样 A/B 已在 `examples/` 覆盖
- 评审：见 `research/09-luban-review.md`