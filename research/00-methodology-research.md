# PerfectVideo 方法论研究笔记

> 日期：2026-08-06  
> 阶段：先拆 PerfectPhoto 地基，再扫 GitHub 视频生成方法论，最后倒推 PerfectVideo 该学什么、该舍什么。  
> 工作区：`D:\skills\PerfectVideo`

---

## 1. PerfectPhoto 是怎么做的（地基解剖）

### 1.1 一句话定位

**不是 prompt 翻译器，是摄影导演。**  
输出不是「好看的美女」许愿池，而是一份有现场感的「拍摄小抄」。

- 本地全局 skill：`C:\Users\hooji\.workbuddy\skills\PerfectPhoto`
- 源仓库活体：`D:\skills\PerfectPhoto`（与全局副本可能不同步，以全局已装版本 + intro 为准）
- 方法论根：南鸢上千张写真实战 + cinema-dna 反油腻/构图思想 + NextShotPhoto 分镜延伸

### 1.2 认知架构（这才是可复用的「产品 DNA」）

```
模糊感觉
  → 意图编译（7 维推断，不是 7 个问卷）
  →（可选）视觉风格对齐（大师/电影 50 选 1）
  → 8 步受控交互（每次 1–2 问 + 选项）
  → 组装拍摄小抄
  → 人物锁定字面量焊接
  →（可选）批量变体 / 诊断模式
  →（可选）桥接到 NextShotPhoto 做分镜尾帧
```

### 1.3 意图编译 7 维

从用户一句话推断（不是逐项追问）：年代 / 色调 / 光影 / 道具 / 情绪 / 氛围 / 人物气质。  
作为后续步骤的裁切底色。

### 1.4 8 步（写真域完整覆盖）

| 步 | 层 | 核心问题 |
|----|----|----------|
| 1 | 创作 | 画面为什么成立（场景/光/妆/镜头/动作/综合） |
| 2 | 硬件 | 成像方式 + 胶片/传感器语言 |
| 3 | 空间 | 前景 / 人物位置 / 背景 三层密度 |
| 4 | 人物 | 妆容锚点（一句话说清） |
| 5 | 人物 | 服装与场景咬合 |
| 6 | 人物 | 动作骨架（给身体逻辑，不写死姿势） |
| 7 | 光影 | 光从哪来 / 落哪 / 什么效果 + 7.5 色彩命题 |
| 8 | 拍摄 | 景别焦段机位 + 构图压力 + 视线流量 + 随机变量 |

### 1.5 已内建的视频桥：NextShotPhoto

PerfectPhoto **不是纯静帧 skill**。组装 + 人物锁定后可桥接分镜：

- **只问 Delta**：景别 / 机位 / 运镜 / 动作
- **运镜变换矩阵**（硬编码字段变换，不靠模型瞎推理）
- **大师运镜库**（希区柯克…姜文，管「怎么拍」）
- **每镜双产物**：尾帧图片 prompt + 视频生成提示词（运动路径/光线变化/速度曲线/质感/叙事定位）
- **三重锁死**：字面量焊接 / 变体白名单 / 首尾帧视觉锚
- **实战坑**：背景细节禁止简化；参考图≠细节锁；道具归属与人物空间位置必须锁到人

### 1.6 PerfectPhoto 可原样继承给 PerfectVideo 的铁律

1. **Direct, don't describe** —— 可见事实 > 空泛形容词  
2. **元素互相认识** —— 服装/场景/光/色同世界  
3. **锁定 vs 可变严格分域** —— 字面量焊接，不靠上下文记忆  
4. **意图编译先于问卷** —— 从用户话里推断，少逼问  
5. **选项 + 案例** 降决策负担  
6. **反 AI 油腻 / 减法原则**  
7. **用途前置** —— 一行锁死平台比五句风格有用  
8. **诊断模式** —— 拆解用户烂 prompt，打分 + 改写  
9. **过程中检查 + 步骤联动表** —— 回改不毁一致性  
10. **快速模式阈值** —— 信息够就跳步  

---

## 2. 本地已有「视频血亲」盘点（避免重复发明）

| 资产 | 路径 | 和 PerfectVideo 的关系 |
|------|------|------------------------|
| **cinema-dna-21x9x3** | `D:\skills\cinema-dna-21x9x3-1.2.2` | 构图压力、视线流量、色彩命题、反 CG 的「镜头判断层」源头；PerfectPhoto 已部分吸入 |
| **NextShotPhoto** | PerfectPhoto 子 skill / SPEC | 多镜一致性 + 运镜矩阵 + 视频 prompt 块，最接近 PerfectVideo 内核 |
| **auvideo** | `~/.workbuddy/skills/auvideo` | 生产管线（creative→generate→assemble→publish），脚本骨架，不是交互导演方法论 |
| **autovidiocreator** | 全局 skill | URL→拆解→复刻管线，偏工程复刻 |
| **handdrawvideo / davatar / kbcut** | 全局 skills | 特定成片形态，不是通用方法论 skill |

**判断：** PerfectVideo 不该再做一个 auvideo 式编排器，也不该只做 NextShot 的别名。它应是 **PerfectPhoto 同构的「视频导演 skill」**：交互引导 + 方法论锁死 + 平台适配提示词，可选桥接到现有生成管线。

---

## 3. GitHub 相关方法论扫描（2026-08-06）

### 3.1 高价值仓库对照

| 仓库 | 类型 | 核心方法论 | 对 PerfectVideo 的可采点 |
|------|------|------------|--------------------------|
| [billpar/ai-cinematic-pipeline](https://github.com/billpar/ai-cinematic-pipeline) | 全片生产方法论 | 剧本拆解→角色/场景/道具资产圣经→2–3s beat→immutable/mutable 分域→**尾帧接首帧**→音频分轨；哲学：**Direct don't describe / 先锁 visual bible / 静止也是调度** | 资产圣经前置；immutable vs mutable；frame chaining；工具无关分层 |
| [CyberJ0605/cinematic-video-prompt-engineer-skill](https://github.com/CyberJ0605/cinematic-video-prompt-engineer-skill) | Codex skill | **先诊断**（情绪核心/视觉核心/结构/时长）→电影化改写→建议参考图→最终时间轴提示词；微表情/对白双轨/声光最低标准 | 与 PerfectPhoto「意图编译」同构；短片 6–30s 自适应；声音层 |
| [JOZUJIOJIO/cinematic-prompts](https://github.com/JOZUJIOJIO/cinematic-prompts) | Seedance 专属 skill | **@槽位系统**；六层：角色+场景+镜头+光影+音频+约束；4–15s 硬上限；素材清单 | 平台硬约束写进 skill；角色=变量；音频层进 prompt |
| [Eric-Lautanen/seamless-ai-video-prompt-template](https://github.com/Eric-Lautanen/seamless-ai-video-prompt-template) | LLM 模板三档 | **Last Frame Workflow**；**Dual Image**（参考图+上一镜尾帧）；180°/Match on Action/Eye Trace；每 clip 重复角色描述防 attention drift | 多 clip 链式标准；边界锁定；token 高效版可借鉴 |
| [Emily2040/seedance-2.0](https://github.com/Emily2040/seedance-2.0) | Skill OS / 导演操作系统 | Director's Read 强制；first-last-frame；**continuity ledger / project state**；单变量重拍；成片观测优先于原始 prompt | 最大体系；可偷状态机与台账思想，不宜整包复制 |
| [ai9app/AI-Cinematic-Prompt-Director](https://github.com/ai9app/AI-Cinematic-Prompt-Director) | 词库框架 | 250+ 摄影词汇表 + 分场景矩阵 | 作 references 词表，不作主流程 |
| Neural4D / lobehub video-prompt-engineering 等 | 博客/skill 清单 | **5 柱**：Camera / Lighting / Subject / Environment / Style；平台分形（Sora 叙事段 / Runway 结构化 / Kling 动作序列） | 单镜提示词骨架；平台适配表 |

### 3.2 跨仓库收敛出的「视频方法论公约」

行业共识几乎收敛到同一张骨架（与 PerfectPhoto + NextShot 惊人同构）：

```
1. 先锁 Visual Bible（人物/场景/道具/色板）再生成
2. 先诊断意图（情绪/视觉/结构/时长）再写镜头
3. 每镜：Immutable 字面量 + Mutable 只改白名单字段
4. 视频 prompt ≠ 图片 prompt —— 必须写：运动路径、速度曲线、光过渡、声场
5. 多镜靠：尾帧→下一镜首帧 + 角色参考图双锚 + 文本锁定三保险
6. 平台硬约束（时长/参考槽位/参考类型）写进编译器，不当成事后补丁
7. 静音/静止/空场也是导演语言
8. 反 slop：删 cinematic/beautiful/epic，换成可观察物理事实
```

---

## 4. PerfectPhoto → PerfectVideo 同构映射

| PerfectPhoto | PerfectVideo 对应物 | 备注 |
|--------------|---------------------|------|
| 意图编译 7 维 | 剧情/短片诊断：情绪核心·视觉核心·结构·时长·声场 | 对齐 CyberJ / seedance directors-read |
| 可选视觉风格 | 导演运镜风格 + 成像风格 | 已有 master-cinematography + visual-styles |
| 步骤1 画面成立点 | 本片成立点：情绪 / 空间 / 动作 / 对白 / 产品 | 视频多「时间轴成立」 |
| 步骤2 成像 | 摄影机语言 + 帧率/快门角 + 胶片 | 加时间维 |
| 步骤3 三层空间 | 场景资产 + spatial layout 锁定全文 | 禁简化（NextShot 坑） |
| 步骤4–5 妆服 | 角色身份证 + 服装锁定 | 字面量 + 可选 reference 图槽 |
| 步骤6 动作骨架 | **表演/阻塞 + 速度曲线** | 视频核心增量 |
| 步骤7 光线 + 色彩命题 | 光线变化路径 + 全片色彩命题 | 静态→动态 |
| 步骤8 构图压力/视线流量 | 分镜表 + 每镜流量 + 剪辑关系（180°/Match on Action） | cinema-dna 已有 |
| 人物锁定 | Character sheet + @槽 / 参考图角色 | 图+文双锁 |
| 批量变体 | 多 take / 受控变体机位 |  |
| 诊断模式 | 诊断烂视频 prompt / 失败 take | retake protocol 思想 |
| NextShot 状态机 | PerfectVideo 主循环（应内建，不是可选尾巴） | 视频 skill 应以时间轴为主角 |

---

## 5. PerfectVideo 产品 thesis（可推翻）

**Thesis：**  
PerfectVideo 应是 **「短视频/短片导演 skill」**，同构 PerfectPhoto 的交互体验：从模糊想法 → 意图诊断 → 资产圣经 → 分镜台账 → 每镜（图片锚 + 视频运动 prompt）→ 平台编译输出。  
它**不是**生成执行器（那是 auvideo / topapis / ImageGen+VideoGen），**不是**纯复刻管线（autovidiocreator），**不是** cinema-dna 静帧三联的简单加长。

**可推翻条件：**
- 若用户只想一键出片不管提示词质量 → 应走 auvideo，不必另起 PerfectVideo  
- 若只要 Seedance 六层模板 → cinematic-prompts 已够，不必造 skill  
- 若验证后发现「静帧锁定 + 尾帧接首帧」对目标模型无效 → 改以 reference slot / 多模态角色资产为主

**最便宜验证点：**  
拿 PerfectPhoto 已有方案 + NextShot 出 3 镜，喂 Seedance/HappyHorse 各跑一轮，记录漂移字段清单，作为 PerfectVideo 锁定域白名单的实测来源。

---

## 6. 建议的 PerfectVideo 能力分层（设计草图，未实现）

```
L0  交互人格：视频导演（同构摄影导演）
L1  意图诊断：情绪/视觉/结构/时长/声场
L2  Visual Bible：角色·场景·道具·色板·成像（字面量+可选参考图路径）
L3  分镜台账：shot list + continuity ledger（immutable/mutable）
L4  单镜编译：
      · 静态锚 prompt（可复用 PerfectPhoto 组装逻辑）
      · 动态视频 prompt（运动路径/速度/光变/声场/叙事位）
L5  平台适配器：Seedance / Kling / DashScope / 通用
L6  可选执行桥：调用已有 VideoGen / auvideo / topapis（不内嵌引擎）
```

**交互节奏建议（对齐 PerfectPhoto 品味）：**  
开场流程预览 → 意图诊断确认 → 可选导演风格 → 5–7 个主问题（不是 20 问制片表）→ 组装分镜表 → 每镜可「做下一镜」Delta 模式 → 诊断/重拍模式。

---

## 7. 下一批研究动作（未做）

1. 精读 `cinema-dna` 全文 anti-AI + full-spec，抽出可视频化条款  
2. 精读 NextShot `transform-matrix` / `master-cinematography` / `negative-constraints` 是否升格为 PerfectVideo references 正本  
3. 用 codeload 拉取 1–2 个开源 skill 全文做对照摘录（CyberJ + seamless template）  
4. 对照 Seedance / DashScope 当前 API 约束写「平台适配表」  
5. 再写 `01-product-spec-draft.md`（skill 范围、不做清单、与 NextShot/auvideo 边界）

---

## 8. 一句话收束

> **PerfectPhoto 证明：方法 > 模型。视频侧 GitHub 共识再证明：锁圣经 + 分不变/可变 + 运动/声光写进 prompt + 尾帧链式 = 电影感的最小完备集。**  
> PerfectVideo 的机会不是再堆一套运镜词库，而是把这套公约做成 **和 PerfectPhoto 一样好用的受控导演对话**。
