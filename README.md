# PerfectVideo — AI 短片唯一带锁的导演 OS 🎬

> **别再让 AI 视频「下一镜就漂」了。**  
> PerfectVideo 是 AI 短片的艺术导演 + 摄影指导 + 连戏书记：从一句模糊感觉，产出**可连戏的视觉脚本契约**——概述、分镜表、材质/世界宪法、双时长预算、跨镜锁定、NextShot 链、25 条签名运镜、惊艳四件套（真声轨 / 首尾帧参考图 / 微动节拍 / 光相位）。

- **版本：** 0.2.1-scaffold（可发布）
- [![skills.sh](https://skills.sh/b/rebootmindful/perfectvideo)](https://skills.sh/b/rebootmindful/perfectvideo)
- **规格：** [`PERFECTVIDEO-SPEC.md`](PERFECTVIDEO-SPEC.md)
- **入口：** [`SKILL.md`](SKILL.md)（yao-meta-skill 形态）
- **金样：** [`examples/golden-a-single15.md`](examples/golden-a-single15.md) · [`golden-b-yueyanque-single15.md`](examples/golden-b-yueyanque-single15.md)
- **研究：** `research/`（00–09，含脚本专家审计与鲁班评测）

---

## 你什么时候需要它？

**场景 1 · 跨镜连戏漂移（最痛）**
> 「我做 AI 视频，第一镜人物是黑长直，第二镜就变棕发了；伞和帽子每次都换花样。」
>
> → PerfectVideo 把人物/衣帽/道具/环境**字面量焊接**进每一镜，加 @槽位 + 首尾帧双锚硬控制——连戏从 ~90% 提到 ~99%。

**场景 2 · 模型预算不懂，成片必炸**
> 「我让模型生成 60 秒视频，结果 15 秒后人物糊成一团。」
>
> → PerfectVideo 锁死**双时长**：`model_clip_budget_s`（单次生成上限）≠ `target_edit_duration_s`（成片目标），超了就拆 NextShot 链，绝不假装一条长提示词能搞定。

**场景 3 · 运镜平庸，怎么拍都像幻灯片**
> 「我的视频画面很美，但镜头就是不动，像 PPT。」
>
> → PerfectVideo 给 25 条**签名运镜**（每条带 ASCII 运动预览 + 可直贴的物理短语）+ 8 位名家矩阵 + 三档运镜意图——从「克制」到「子弹时间」任选。

---

## 它会交付什么？（可见产物）

每次对话结束，你拿到一份**可直接投喂模型的完整产物**：

| 块 | 内容 |
|----|------|
| `video_overview` | 标题/平台/画幅/双时长/风格/受众 |
| **素材准备清单** | 生成前告诉你准备几张参考图（@人物/@环境） |
| **Visual Bible / Lock** | 冻结的世界/材质/人物/环境锁定域 |
| `shotlist[]` | 到秒的分镜表（运镜/声画/风险） |
| `prompts.primary` | **自包含**中文主契约，整块复制直贴模型 |
| `prompts.by_tool` | Seedance / H3 / 可灵等适配（按需） |
| 惊艳四件套 | 真声轨 + 微动节拍 + 光相位 + 首尾帧（按模型能力启用） |
| QC + footer | 闸门检查 + 发布前复核提示 |

**真机示例：** `examples/golden-b-yueyanque-single15.md` 是「月檐阙」唐风神域片——已用 MiniMax-H3 真机生成 2K 15s 视频验证（见 `research/09-luban-review.md` 活体检查）。  
**Showcase 资产：** [`examples/showcase/`](examples/showcase/README.md)——4 个 WebP/GIF（v1 极缓推 vs v3 多运镜 vs 接缝连戏 vs 对比图），可复现命令都在 showcase README 里。

---

## 快速开始

```bash
# 方式一：npx 一键安装（需 skills CLI）
npx skills add rebootmindful/perfectvideo

# 方式二：复制到全局 skill 区
cp -r PerfectVideo ~/.workbuddy/skills/PerfectVideo
```

然后直接说：

> 「月檐阙，唐风幻想，云上神域，15 秒，16:9，我要惊艳一点的运镜」

Agent 会走 **约 7–8 个小问题**（同构 PerfectPhoto 体感）→ 出锁定卡 → 一键编译交付。

---

## 触发方式

| 你说 | 它做 |
|------|------|
| 帮我写个 15 秒 AI 视频提示词，两个人在雨夜车站对峙 | 走完整导演流程，出分镜 + 主契约 |
| 下一个镜头推到特写，保持人物衣服帽子一致 | NextShot 链：焊接 lock + 只改 delta |
| 用材质宪法做一套东方流体雕塑感的短片分镜 | 材质宪法 + 分镜表 |
| 按斯皮尔伯格运镜给我镜头建议 | 名家运镜建议卡 |
| 用真声轨写画面内声，配微动节拍和光相位推进 | 惊艳四件套全开 |
| 上一镜尾帧接下一镜，加人物参考图锁身份 | @槽位 + 首尾帧硬控制 |

---

## 它和同类有什么不同？

| | 普通视频 prompt 工具 | **PerfectVideo** |
|--|---------------------|------------------|
| 跨镜连戏 | 祈祷模型记性好 | **字面量焊接 + @槽位 + 首尾帧（99%）** |
| 时长 | 一条 prompt 硬撑 | **双时长物理预算**（切 NextShot 链） |
| 运镜 | 形容词堆砌 | **25 条签名运镜 + ASCII 预览 + 物理短语** |
| 声光动 | 不管 | **真声轨 / 微动节拍 / 光相位**（四件套） |
| 问数 | 10+ 步问卷或黑箱 | **约 7–8 问，选项化，静默代填** |

---

## 红线（不做）

- **不做** 爆款钩子 / 完播 CTA / 带货逼单文案（艺术导演不写增长脚本；用户自带文案可原样挂载）
- **不做** 生成 API 编排、URL 复刻、运镜词库堆砌
- **不做** 宣称「一键直贴任意厂商最优」——只保证 generic 主契约 + 已实现 by_tool

---

## 文件结构

```text
PerfectVideo/
├── SKILL.md                    # 入口（唯一被发现的 SKILL.md）
├── PERFECTVIDEO-SPEC.md        # 总规格
├── agents/interface.yaml       # 中立元数据
├── references/                 # 19 个细则（运镜/连戏/材质/四件套/素材清单…）
├── schemas/visual-bible-lock.md # Lock 字段契约
├── examples/                   # 金样（非 SKILL.md）
├── evals/trigger_cases.json    # 触发测试 17 用例
└── research/                   # 研究底稿 + 审计
```

---

## 验证与测试

- 触发面：`evals/trigger_cases.json`（17 用例，覆盖连戏/运镜/四件套/红线）
- 活体证据：月檐阙 2K 真机三部曲（`research/09-luban-review.md`）
- 审计：`research/06`（规格落实）· `research/08`（健康体检）· `research/09`（鲁班评测 82/100）

---

## 安全边界

- 不生成 CTA/钩子；不写营销三段式
- 参考图与素材仅在用户提供的范围内使用
- 生成前给出素材清单；无素材自动降级纯文生
- footer 提示用户复核：事实/广告/肖像/音乐版权/平台敏感词

---

*The map IS the terrain. The terrain IS the map.*
