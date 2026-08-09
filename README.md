<sub>🌐 <b>中文</b></sub>

<div align="center">

# PerfectVideo — AI 短片唯一带锁的导演 OS 🎬

> *「别再让 AI 视频下一镜就漂了——这一镜的黑长直，下一镜变成棕发。」*

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-PerfectVideo-blueviolet)](SKILL.md)
[![skills.sh](https://skills.sh/b/rebootmindful/perfectvideo)](https://skills.sh/b/rebootmindful/perfectvideo)
[![版本](https://img.shields.io/badge/版本-0.2.9-scaffold-orange)](VERSION)

**一句话意图 → 可连戏的视觉脚本契约 → 真机成片：跨镜不漂、合同自洽、真机可验。**

[看效果](#效果示例) · [安装](#快速开始) · [触发方式](#触发方式) · [它和同类有什么不同](#它和同类有什么不同) · [安全边界](#安全边界)

</div>

---

**活体证明（2026-08-09 真机）：**

> 「江南水乡，古老上空出现深空机械巨物」→ 一句话 → **两镜 29 秒连戏成片**：
> 第一镜「唤醒共生」（H3 2K）→ 第二镜「入内相认」（seedance 首帧链承接尾帧），
> 人物/材质/光相位跨镜一致，拼接帧差异无跳变尖峰。
> 全部真实产物：`outputs/jiangnan_2shots_combined.mp4`（29.4s / 20.9MB）

---

## 它解决什么问题

事情是这样的——你让 AI 做视频，第一镜人物是黑长直，第二镜就变棕发了；伞和帽子每次都换花样。你让模型生成 60 秒，结果 15 秒后人物糊成一团。你写了"电影感、运镜华丽"，出来的画面像 PPT。

**普通提示词工具的问题是：它们卖"更好的词"，不卖"合同"。** 模型记性不好，你给它再漂亮的形容词，下一镜它照样自由发挥。

PerfectVideo 换了思路：**先锁世界，再动镜头。** 它把人物/衣帽/道具/环境/材质**字面量焊接**进每一镜，加 @槽位 + 首尾帧双锚硬控制——连戏从 ~90% 提到 ~99%；锁死**双时长**物理预算，超了就拆 NextShot 链，绝不假装一条长提示词能搞定；**出稿前跑七维逻辑审核**，导演合同自相矛盾（一镜到底却写三处切、机位瞬移、情绪无因反转）在提交前就被拦下。

## 效果示例

**输入一句话：**

> 「江南水乡，古老上空出现深空机械巨物，我要看它怎么被唤醒」

**输出（两镜连戏）：**

| 镜 | 成片 | 规格 |
|---|---|---|
| Shot1 唤醒共生 | `outputs/jiangnan_h3_v2/jiangnan_symbiosis_v2_final.mp4` | H3 单条 15s / 2K / 零接缝 |
| Shot2 入内相认 | `outputs/jiangnan_shot2_final.mp4` | seedance 15s / 首帧链承接 |
| **合片** | `outputs/jiangnan_2shots_combined.mp4` | **29.4s / xfade 丝滑拼接** |

**光相位实测（逐秒可查）**：Shot1 冷开场(0.82) → 巨物降临最冷(0.73) → 光柱绽放最暖(1.57) → 黎明落幅；Shot2 外部暖 → 内部冷(陌生) → 指触爆发最亮(1.38/亮度115)。**剧本的光相位被模型逐秒复刻**——这是七维审核闸门拦下"合同矛盾"后的直接结果。

**更多真机产物**（共 18 个 MP4 / 165MB）：cyberwuxia 赛博武侠 v3/v4、雨夜雀 29s、竹栏打斗 15s，均在 `outputs/`。

## 快速开始

```bash
# 方式一：npx 一键安装（需 skills CLI）
npx skills add rebootmindful/perfectvideo

# 方式二：复制到全局 skill 区
cp -r PerfectVideo ~/.workbuddy/skills/PerfectVideo
```

装完对 Agent 说：

```text
「月檐阙，唐风幻想，云上神域，15 秒，16:9，我要惊艳一点的运镜」
```

Agent 会走 **约 7–8 个小问题**（同构 PerfectPhoto 体感）→ **主角四问卡** → **3 个方向让你选** → 锁定卡 → 出稿前七维审核 → 编译交付。

## 触发方式

| 你说 | 它做 |
|------|------|
| 帮我写个 15 秒 AI 视频提示词，两个人在雨夜车站对峙 | 走完整导演流程：主角四问 → 3 方向 → 分镜 + 主契约 |
| 下一个镜头推到特写，保持人物衣服帽子一致 | NextShot 链：尾帧预检 → 3 个推进方向 → 焊接 lock |
| 用材质宪法做一套东方流体雕塑感的短片分镜 | 材质宪法 + 分镜表 |
| 按斯皮尔伯格运镜给我镜头建议 | 名家运镜建议卡 |
| 上一镜尾帧接下一镜，加人物参考图锁身份 | @槽位 + 首尾帧硬控制 |
| 出稿前帮我审核下这版提示词合不合逻辑 | 七维逻辑审核（合同/空间/情绪/尺度/声画/密度/一次看懂） |

## 能做什么 / 它会交付什么

| 能力 | 交付物 |
|---|---|
| 导演流程 | video_overview + 意图诊断 + 锁定卡 |
| 跨镜连戏 | Visual Bible / Lock（人物/衣帽/道具/环境/材质字符级焊接） |
| 分镜 | shotlist[] 到秒（运镜/声画/风险） |
| 提示词 | prompts.primary 自包含主契约（verbatim 打印件，禁蒸发）+ by_tool 适配 |
| 惊艳四件套 | 真声轨 + 微动节拍 + 光相位 + 首尾帧（按模型能力启用） |
| **审核闸门** | **出稿前七维审核报告**（合同一致性/空间拓扑/情绪因果/物理尺度/声画对齐/密度/一次看懂） |
| NextShot | 3 推进方向 + 尾帧预检 + 跨镜光相位桥 + 执行度对账 |
| QC | 七维评分 + diff 对齐 + 发布复核 footer |

## 它和同类有什么不同

| | 普通视频 prompt 工具 | **PerfectVideo** |
|--|---------------------|------------------|
| 跨镜连戏 | 祈祷模型记性好 | **字面量焊接 + @槽位 + 首尾帧（99%）** |
| 时长 | 一条 prompt 硬撑 | **双时长物理预算**（切 NextShot 链） |
| 运镜 | 形容词堆砌 | **25 条签名运镜 + ASCII 预览 + 物理短语** |
| 声光动 | 不管 | **真声轨 / 微动节拍 / 光相位**（四件套） |
| **出稿前审核** | **没有** | **七维逻辑审核：合同矛盾/机位瞬移/情绪断裂在提交前拦截** |
| 问数 | 10+ 步问卷或黑箱 | **约 7–8 问，选项化，静默代填** |

## 安全边界

- 不生成 CTA/钩子/带货逼单文案；不写营销三段式（艺术导演红线）
- 不宣称"一键直贴任意厂商最优"——只保证 generic 主契约 + 已实现 by_tool
- 不碰你的 API Key：skill 只产出脚本契约，生成走你已有的下游工具
- 参考图与素材仅在用户提供的范围内使用；生成前给素材清单，无素材自动降级纯文生
- footer 提示复核：事实/广告/肖像/音乐版权/平台敏感词

## 文件结构

```text
PerfectVideo/
├── SKILL.md                    # 入口（唯一被发现的 SKILL.md）
├── PERFECTVIDEO-SPEC.md        # 总规格
├── VERSION                     # 0.2.9-scaffold
├── agents/interface.yaml       # 中立元数据（含 pre_production_gate）
├── references/                 # 28 个细则（运镜/连戏/材质/四件套/叙事主轴/逻辑审核…）
├── schemas/visual-bible-lock.md # Lock 字段契约
├── examples/                   # 金样 2 个 + showcase 资产
├── evals/trigger_cases.json    # 触发测试 17 用例
└── research/                   # 11 份研究（00-11，含导演审计与鲁班打磨）
```

## 验证与测试

- 触发面：`evals/trigger_cases.json`（17 用例，覆盖连戏/运镜/四件套/红线/审核）
- 活体证据：18 个真机 MP4（`outputs/`）· 江南两镜 29s（2026-08-09）
- 审核报告：`research/10-director-audience-review.md`（大导演×大观众双视角，93/100）
- 打磨报告：`research/11-luban-polish-report.md`（鲁班工坊）

## 致谢

- 方法论渊源：`movie-development-skill`（15 拍骨架/主角四问/类型承诺）
- 姊妹系统：PerfectPhoto（静帧写真）· NextShotPhoto（分镜延伸）
- 同行参考：smixs/visual-skills · higgsfield-seedance2-jineng · zxz233301/image-prompts（见 research/11 附录）

## License

[CC BY 4.0](LICENSE)（可商用，保留署名）

---

<div align="center">

*The map IS the terrain. The terrain IS the map.*

</div>
