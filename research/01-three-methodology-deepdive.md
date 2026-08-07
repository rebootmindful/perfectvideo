# PerfectVideo 研究：三家「方法论」GitHub 深挖

**日期：** 2026-08-06  
**标的：** 能生成类似「东方神话·流体雕塑世界」这种**世界圣经级**视频提示词的 skill  
**排除：** 提示词大全 / 运镜词库堆砌 / 无状态模板库  

## 0. 先解剖你的目标样本（DNA）

你给的提示词不是「好看堆词」，而是 **11 层制片契约**：

| # | 层 | 样本里写了什么 | 在模型侧的作用 |
|---|----|----------------|----------------|
| 1 | 世界观概述 | 墨/云/金流如何构成世界 | 统一语义，抑制随机幻想 |
| 2 | 世界元素 | 水墨山河、流体丝绸、金流… | 可复用的「场景砖」 |
| 3 | 世界法则 | 流动与凝结、秩序平衡… | 禁止相矛盾的物理 |
| 4 | **材质融合** | 统一 3D 流体雕塑；瓷肤、液态发、无材质边界 | **跨主体一致性的真正锁** |
| 5 | 动态关系 | 同一种呼吸节奏 | 全场节奏元规则 |
| 6 | 画面构图 | 多层深度、九主体不拥挤、45% 留白 | 空间调度 + 反合影 |
| 7 | **精准动态动作** | 0-3 / 3-6… 按人物分时微动 | 时间码事件表 |
| 8 | **连续材质转化** | 动作后 0.2s 开始统一材料 morph | 事件因果链 + 统一方向速度 |
| 9 | 环境流体运动 | 波纹、烟云、禁止喷溅 | 环境承担视觉驱动 |
| 10 | 运镜 | ARRI + Cooke + 路径分段 / 螺旋上升 180° | 机位物理路径 |
| 11 | 光影时间线 + 节奏 + 影视参数 + 负面 | 分段光 + 节奏铁律 + 技术规格 | 每秒可读的光声质感 |

**样本真正的发明（对比普通 AI 视频 prompt）：**

1. **Material Constitution（材质宪法）** —— 全世界共用一种流体语言，比「角色锁定」高一层  
2. **Timed micro-action table** —— 15s 内每人只动一个子系统（眼/指/花瓣/头）  
3. **Causal material morph** —— 动作 → 固定延迟 → 统一速度的材质转化  
4. **World-driven motion** —— 人物微动，环境流体做主驱动力  
5. **Spatial ensemble law** —— 九主体「舞台」不是合影：深度层 + 独立站位 + 留白  

下面三家 GitHub **都不是**这种世界宪法的成品文库；它们是**生产这类文本的方法论引擎**。我们逐家对照「样本 DNA 哪一层它能造、哪一层它根本没发明」。

---

## 1. billpar / ai-cinematic-pipeline

- **Repo:** https://github.com/billpar/ai-cinematic-pipeline  
- **类型:** 工具无关的**真人叙事短片/剧集**生产方法论 + 模板包  
- **抓取日:** 2026-08-06  
- **核心 docs:** `01-pipeline-overview` · `03-prompt-writing-guide` · `04-consistency-techniques` · `templates/prompt-template.md`

### 1.1 方法骨架

```
Script breakdown
  → Character 7-panel turnaround（Visual Bible）
  → Setting plates / Prop plates / Voice assets
  → Shot planning（2–3s / beat）
  → One beat = one prompt（immutable vs mutable）
  → Generation + last-frame chaining
  → Audio post + edit
```

### 1.2 可直接盗用的硬规则

| 规则 | 原文要点 | 对流体雕塑类 prompt 的映射 |
|------|----------|---------------------------|
| **Direct, don't describe** | 禁止写情绪词，写微肌肉/身体 | 「睁眼、目光由下望远」优于「神性觉醒」 |
| **Immutable vs mutable** | 场景内角色/设定/光风永远不改写 | 材质宪法 + 世界法则 = immutable 全局块；动作时间码 = mutable |
| **Visual bible 先锁** | 生产中途**禁止**重生角色/场景板 | 对应「材质融合」必须先于任何动作时间码写出并冻结 |
| **Spatial blocking** | 多角色必须声明距离(m)、朝向、谁遮谁、机位相对关系 | 对应「九主体分散站位/不遮挡」——样本写得更艺术，缺物理距离时可补 |
| **Stillness as direction** | 「完全静止」要写清：无眨眼、无重心、无反应 | 样本每段「身体完全静止，仅 X 微动」= 教科书级 |
| **Frame chaining** | clip A 尾帧 → clip B 首帧 | 若 15s 放不下九人，拆段时最高杠杆 |
| **Beat = 2–3s** | 单次生成最小叙事单元 | 样本 0-3 / 3-6… 是 3s 节拍的扩写 |

### 1.3 他们的 one-beat 模板（结构）

```
[TIMESTAMP]
[SHOT TYPE], [LENS]mm, [APERTURE]
[CAMERA BEHAVIOR]
@[Character] [physical action + position + micro-muscle expression]
[dialogue if any]
[Audio ambient line]
@[Setting]
```

### 1.4 相对你样本的能力边界

| 样本层 | 覆盖度 | 说明 |
|--------|--------|------|
| 世界观/法则/元素 | ★☆☆ | 只到 setting tag + 地点板，**没有「材质宪法」层级** |
| 材质统一律 | ★☆☆ | 提到 prop/身份锁定，无「全世界无材质边界」规则 |
| 多角色空间舞台 | ★★★ | 物理 blocking 最强；但偏对话戏，非奇观舞台 |
| 时间码微动 | ★★☆ | 有 timestamp + stillness，但默认 2–3s 单 beat，非 15s 多主体接力 |
| 材质 morph 因果 | ☆☆☆ | **无**连续材质转化方法论 |
| 运镜/光路径 | ★★☆ | 有机位 + 情绪匹配，无螺旋上升+路径分段语法 |
| 负面/反油腻 | ★☆☆ | 明确写「No negative prompts」——与即梦/可灵中文社区实践冲突 |

**一句话：** 这是 **真人剧现实主义** 导演语法。帮你写「静止+微表情+多角色站位」一流；帮你写「流体神话世界宪法」不够。

---

## 2. CyberJ0605 / cinematic-video-prompt-engineer-skill

- **Repo:** https://github.com/CyberJ0605/cinematic-video-prompt-engineer-skill  
- **类型:** 可移植「电影感视频提示词工程师」**完整 skill 规则**（`PROMPT_VERSION.md` v1.4.3）  
- **不是**词库；是**诊断 → 改写 → 参考图 → 最终时间轴**工程

### 2.1 方法骨架

```
用户剧情
  → 输出模式路由（完整打磨 / 精简 / 方向确认 / 连续短片）
  → 【剧情诊断】情绪核心 · 视觉核心 · 结构 · 时长 · 取舍
  → 【电影化改写策略】
  → 【建议先生成的参考图】（按问题选，不机械全出）
  → 【最终视频提示词】基础概括 + 时间轴分镜 + 声光 + 负面
  → 续写：故事状态优先，尾帧可选
```

### 2.2 对「流体雕塑样本」最有用的规则簇

#### A. 抽样范围控制（先收窄再写）

- 具体性：抽象 → 可见证据（动作/质感/反射/时间变化）  
- 非矛盾性：清理不能同真的物理与光指令  
- 正面描述优先于负面堆砌  
- 避免过度指定 → 过载则拆条  

**映射：** 「东方神话·流体」里**先写世界+材质宪法**，就是把模型猜测范围锁死再进入时间码。

#### B. 首帧可重建 / 终帧锁定 / 单核心动作

- 最终 prompt 必须能重建**第一帧从哪开始**  
- 每镜头优先：**一个主动作路径 + 一个主运镜**  
- 复杂运镜必须分阶段写触发、方向、停靠  
- 终帧状态要写清（姿态/焦点/构图）  

**映射：** 样本的「精准动态 + 运镜分段路径」完全符合；运镜里同时写「推进-平移-升高-环绕」+「螺旋上升 180°」——按本规则应拆成**两个运镜合同**或标主次。

#### C. 时长与字数预算（中文可用）

- 单条 ≤30s；不默认 30s  
- 最终提示词：简单 500–800 · 默认 800–1300 · 复杂 10–15s 到 2000 · 16–30s 到 3000  
- 压缩阶梯：先删重复风格词与装饰，**不删**因果、关键动作、空间方向、结尾余韵  

**映射：** 你这份样本偏 **2000+ 字世界观厚文**——对 Seedance/即梦长提示友好；对部分模型需做「宪法块 + 时间轴块」可拆装。

#### D. 多人一镜 / 渐进揭示阶梯

- 先 CU 建身份 → 前景遮挡 → 横移揭示第二人 → Pull-Back 展开站位  
- 10–15s 通常只揭示 2–4 关键人物，其余背景剪影  

**与样本的张力（重要）：**  
样本要 **九主体 + 全场舞台 + 15s 接力焦点**。本 skill 会判定「过载」并建议拆分或只聚焦 2–4 人。  
**PerfectVideo 必须显式扩展：** *ensemble world-stage mode*（多主体同时在场但**每 3s 只激活一个焦点**，其余微呼吸）——样本已示范，本仓库未命名该方法。

#### E. 声音与光影最低标准

- 可信主光源 + 2–4 具体声音锚点  
- 声光三级：全局基线 / 分镜局部变化 / 结尾【整体声音与光影】统一  

**映射：** 样本光时间线极强，**声场几乎空**——落地时应用本规则补「琴弦、墨水流动、极低频呼吸、无配乐」一类锚点。

#### F. 活人感 / 微表情 / 心理阶段时间轴

- 情绪 → 微肌肉；30s 可按心理任务分段（追问→认命→放手）  
- 强情绪链：内在冲突 → 生理反应 → 微表情 → 贯穿动作锚点 → 决定性行为  

**映射：** 神话奇观少用心理阶段，但「每 3s 一个可验证微动作」= 同一时间轴技术的奇观版。

### 2.3 相对样本边界

| 样本层 | 覆盖度 | 说明 |
|--------|--------|------|
| 世界观宪法 | ★★☆ | 有场景参考图与连续性，**无材质统一语法** |
| 材质 morph | ★☆☆ | 有道具状态因果，无流体材料转化链 |
| 时间码编排 | ★★★ | 最强：时间轴 + 微表情 + 字数预算 + 结构选型 |
| 运镜动机 | ★★★ | 戏剧功能选运镜 + 一镜到底调度 |
| 参考图策略 | ★★★ | 按生产问题出图，禁止单人参考写进第二人 |
| 奇观 CG 流体 | ★☆☆ | 偏写实电影；神话流体需自行补「材质宪法」模块 |

**一句话：** 这是 **「如何把故事工程化成时间轴提示词」** 的大脑。最适合作为 PerfectVideo 的 **诊断+时间轴+声光** 内核；缺 **世界材质宪法** 与 **奇观保真预算**。

---

## 3. Emily2040 / seedance-2.0

- **Repo:** https://github.com/Emily2040/seedance-2.0  
- **类型:** Seedance 专用 **Skill OS**（导演读片 + 状态化连戏 + 保真预算 + 首尾帧 + 多镜语法）  
- **关键 references:** `directing-engine` · `directors-read` · `allocation-model` · `multishot-grammar` · `first-last-frame-guide` · `event-density` · `sequence-project-state`

### 3.1 哲学一击

> **Direct the model, do not micro-manage the frame.**  
> **one intention, and every instrument plays the same note.**

「电影感 / epic / beautiful」= 愿望不是导演。  
先一句意图 → 机位/光/调度/表演/声/剪 全部回答「因为意图是 X」。

**映射到样本：**  
一句意图可以是：  
「让观众感到一个由同一流体语言构成的东方神话世界，在 15 秒里从人物微呼吸过渡到世界呼吸。」  
然后所有仪器（微动接力、材质 morph、环境流体、克制运镜、分段光、留白舞台）服务这句。

### 3.2 对样本最关键的四块理论

#### A. Allocation Model（保真预算）——解释样本为什么敢写满

单次生成预算三角互斥：

| Spend | 买到什么 | 挤掉什么 |
|-------|----------|----------|
| **Identity** | 脸/产品/服装稳定 | 大动作范围 |
| **Motion** | 大胆动作/物理 | 特写细节、手脸 |
| **Scene density** | 人群/层级环境/天气/道具 | 单主体精度 |

规则：

1. **主花销只能一个**，次花销一个，其余故意节制  
2. 身份用 `@Image` 卸文本负担  
3. 密场景 → hero 要大、要少  
4. 答案若是「三者全要」→ **拆镜头/拆生成**

**直接解释你的样本策略（天才点）：**

| 样本写法 | 预算含义 |
|----------|----------|
| 人物「仅局部微动」 | 把 **Motion 预算压到极低**，把额度留给 **Scene density + Identity** |
| 「环境流体承担主要视觉驱动」 | Motion 花在 **世界** 而非每人复杂动作 |
| 统一材质语言 | 把九人的 Identity 成本变成 **一次材质锁**，而不是九次独立身份 |
| 九人分散 + 留白 | 控制密度：深空间而非堆叠特写 |
| 每 3s 只强调一人微动 | 同一时刻 identity 主焦点 ≈1 |

**PerfectVideo 必须把 allocation 做成交互步骤：**  
「这镜主花销是世界 / 运动 / 身份？」——用户选世界，再自动裁切动作复杂度。

#### B. Event Density —— 一条生成装多少

- 一生成通常只带 **一个可见 beat + 改变了的 endpoint**  
- 桶：`already_happened` / `this_clip_only` / `reserved_for_later` / `do_not_show_yet`  
- 分裂触发：多完成动作、多地点、多轮对话、复杂接触、超过平台时长  

**映射：** 样本的 5 段微动 + 材质转化 + 环境流体，在 event-density 视角是 **「一个 beat：世界开始呼吸；内部是同一意图的微相位」**。  
写法关键：在「节奏控制」层声明 **单一高潮意图 + 渐进传导**，避免模型拆成五个互斥事件。

#### C. Multi-shot grammar vs 一镜到底

- 真切点用 `Shot N:`；每 shot 一动作+一运镜+声；约 4–6s/shot  
- 中文表面常用 `【时间轴】0-3s…`  
- 一镜到底要显式写 `single continuous take, no cuts`  
- **不要**混用「多镜头标签合同」与「连续阶段合同」

**映射：** 样本是 **连续阶段合同**（一镜到底 + 时间轴相位），不是 Shot1/2/3 硬切。运镜写路径时要声明「一镜到底」。

#### D. First/Last Frame

- 首帧定起点，尾帧定目标；prompt 只写过渡逻辑  
- 变形要找 **carrier**（贯穿不变元素，如金轮/圆环）隐藏 intermediate weirdness  

**映射：**  
若落地到 FLF2V：  
- 首帧：九人静态东方舞台  
- 尾帧：材质已充分流体化、金轮仍转  
- carrier：巨大流体圆环 + 金辉圣女  
- 中间由样本时间码填充  

### 3.3 Directing Engine 与「材质宪法」的空缺

引擎很强：**意图 → 仪器表 → 声线 → 连贯六检**。  
类型库含特效/转化场景：

- 转化/特效：锁机或受控机位让变化可读；**一因一果**；主体响应变化  
- 脆弱性检查：复杂度撑不住脸/手则 **简化运动，让光或环境承载变化**  

**接近样本，但仍缺：**

| 需要 | seedance-2.0 现状 |
|------|-------------------|
| 世界级材质统一律 | 无专门 Material Constitution 模块；风格技能偏安全 look |
| 全场共享呼吸节奏 | 有节奏趋势字段，无「world breath」原语 |
| 动作后固定延迟的材质 morph | 无 0.2s delay 级事件因果模板 |
| 九体奇观舞台 vs 合影 | 多主体纪律 = 「一人焦点，其余微动」——与样本一致，但**无构图留白/层深模板** |

### 3.4 相对样本边界

| 样本层 | 覆盖度 | 说明 |
|--------|--------|------|
| 单一意图+反油腻 | ★★★ | 导演引擎本职 |
| 保真预算解释「为何微动」 | ★★★ | allocation-model 是钥匙 |
| 一镜到底时间轴 | ★★★ | multishot + single-take + 中文时间轴 |
| 状态化长片连戏 | ★★★ | project state / continuity ledger |
| 材质世界宪法 | ★☆☆ | **缺口最大**，需 PerfectVideo 自建 |
| 东方留白舞台构图 | ★★☆ | cinema 语言有，东方留白需补 |
| 参数拼盘（PBR/GI/8K…） | ★☆☆ | 偏意图；参数表可作可选「渲染背书」块 |

**一句话：** 这是 **「模型如何花预算、如何连戏、如何一镜到底」** 的操作系统。解释并约束样本写法最科学；不负责发明「东方流体神话圣经」。

---

## 4. 三家对照总表（能否生成目标样本？）

| 能力 | ai-cinematic-pipeline | cinematic-video-prompt-engineer | seedance-2.0 |
|------|----------------------|----------------------------------|--------------|
| 先诊断再写 | 弱 | **强** | **强**（Director's Read） |
| Visual Bible / 锁资产 | **强** | 强（参考图） | **强**（@角色分离） |
| 物理 micro-action | **强** | **强** | 强 |
| 时间轴 0-Ns | 中 | **强** | **强** |
| 多角色不重合成影 | **强**（米制 blocking） | 中（2–4 人揭示） | 强（一人焦点） |
| 运镜动机与分段 | 中 | **强** | **强** |
| 声光最低标准 | 中 | **强** | 强 |
| 字数/时长预算 | 弱 | **强** | 中 |
| 首尾帧连戏 | **强** | 中（故事状态优先） | **强** |
| 保真预算（identity/motion/density） | 弱 | 弱 | **最强** |
| **材质统一世界宪法** | 无 | 无 | 无 |
| **连续材质转化因果** | 无 | 无 | 弱（转化类型） |
| **世界呼吸驱动运动** | 无 | 无 | 弱（环境可承载变化） |
| 神话流体奇观调性 | 弱（写实） | 中 | 中 |

**结论（thesis）：**

> 三家加起来，能把样本 **「怎样写才像导演、怎样不炸保真」** 工程化；  
> **没有任何一家**自带「东方流体雕塑世界」那类 **Material Constitution + Timed Morph Chain**。  
> PerfectVideo 的差异化不在再抄一个运镜库，而在：**世界宪法层 + 保真预算交互 + 时间码编排 + 平台编译**。

---

## 5. 从样本反推 PerfectVideo 应有的「生成栈」

把目标 prompt 当成编译产物，生成栈应对齐：

```
S0 意图编译（类型/节奏/单一意图一句话）
S1 世界观宪法（元素 + 法则）—— 用户 1 次确认后冻结
S2 材质宪法（统一系统 + 禁止边界 + 共享光）—— 冻结，字面量每镜焊接
S3 角色卡（每人：外形锚点 + 默认静止子系统 + 可动子系统上限 1）
S4 空间舞台（景层、站位规则、留白%、反合影约束）
S5 保真预算选择（主：World | Motion | Identity）
S6 时间码编排（每段：焦点角色 · 仅允许的微动 · 环境任务 · 光相位）
S7 材质/世界 morph 链（触发：动作后 Δt · 统一方向/速度 · carrier 贯穿物）
S8 运镜合同（一镜到底 vs 分镜；路径阶段；机位设备可选）
S9 声场（2–4 锚点）+ 节奏铁律 + 负面场景风险包
S10 编译输出（完整版 / 瘦身平台版 / 分镜链式版）
S11 自检（allocation · event-density · 非矛盾 · 首帧可重建 · 材质锁定 diff）
```

### 与 PerfectPhoto 同构点

| PerfectPhoto | PerfectVideo 对应 |
|--------------|-------------------|
| 意图编译 7 维 | 意图 + 世界类型 + 节奏意图 |
| 视觉风格预设 | 材质宪法预设（流体雕塑 / 水墨 / 金属机械…） |
| 成像方式 | 摄像机 + 胶片/CG 参数（可选层） |
| 三层空间 | 舞台景层 + 留白 + 主体站位律 |
| 动作骨架不写死 | 微动白名单 + 禁止子系统 |
| 色彩命题 | 世界元素色律（墨/金/唯一暖跳点） |
| 人物锁定焊接 | 材质宪法 + 角色卡字面量焊接 |
| 负面反油腻 | 视频负面 + anti-slop + 节奏禁止项 |
| NextShot 运镜矩阵 | S6–S8 时间码+运镜合同（升维为主流程） |

### 必须自建、GitHub 偷不来的模块

1. **Material Constitution Schema**（材质宪法数据结构）  
2. **World Breath Protocol**（环境为主驱、人物为从）  
3. **Timed Morph Chain**（动作 → delay → 统一 morph）  
4. **Ensemble Stage Grammar**（多体不合影：层深/间距/焦点接力）  
5. **东方留白与「舞台 vs 合影」否决检查**  

### 可直接引用实现的模块（标注来源）

| 模块 | 来源 |
|------|------|
| Immutable vs mutable 分层 | ai-cinematic-pipeline |
| 物理微动作 / 静止写法 | ai-cinematic-pipeline + CyberJ |
| 剧情诊断 4 段输出 | CyberJ |
| 字数/时长压缩阶梯 | CyberJ |
| 运镜动机与一镜到底弧 | CyberJ + seedance directing-engine |
| Allocation 三花销 | seedance allocation-model |
| Event density / 拆条触发 | seedance event-density |
| Single-take vs Shot-N 合同分离 | seedance multishot-grammar |
| FLF + carrier 变形 | seedance first-last-frame |
| 参考图按问题分流 | CyberJ + seedance reference-workflow |

---

## 6. 用三家规则「校验」你的样本（审片式）

### 通过项（优秀）

- ✅ 静止显式 + 单子系统微动（pipeline + CyberJ）  
- ✅ 0-3s 时间轴相位清晰（CyberJ / 中文时间轴惯例）  
- ✅ 材质宪法把九人 identity 成本合并（allocation 最优花法）  
- ✅ 环境承担运动（directing-engine 脆弱性检查：让环境承载变化）  
- ✅ 单一节奏意图贯穿（one intention）  
- ✅ 负面明确打击二维/动漫/漂移/跳切  

### 风险项（按方法论会建议改）

| 风险 | 哪家规则 | 建议 |
|------|----------|------|
| 九主体同时高清可读 | allocation + event-density | 接受「远层剪影」或拆段；或强调「焦点在当前 3s 人物，其余降采样微呼吸」 |
| 运镜路径过多段 | CyberJ 单核心运镜 | 主路径一条 + 可选第二段螺旋标为 climax 合同 |
| 声场缺失 | CyberJ 最低声光 | 补 2–4 锚点（琴弦、墨池波纹、极低频风、无 BGM） |
| 世界块过长挤掉动作 | CyberJ 字数预算 | 编译器输出「宪法短锚 + 时间轴」瘦身版给短上下文模型 |
| 无 @参考图合同 | seedance / CyberJ | 生产时补：世界材质板、主角板、圆环 carrier 板 |

---

## 7. PerfectVideo 产品判定（基于三家，不再猜）

**做：**  
交互式 **World-Constitution Video Director** —— 产出与样本同构的 **可复制完整提示词**（+ 可选瘦身/链式版）。

**不做：**  
- auvideo 式生成/发布编排  
- 纯提示词站 / 词库 skill  
- 只教「推拉摇移」的说明书  

**MVP 成功标准：**  
用户从模糊想法出发，经若干选择题后，产出具备至少：  
世界观冻结块 · 材质宪法 · 1 句意图 · 时间码表（≥3 相位）· 运镜合同 · 节奏与负面 ——  
且通过 allocation/非矛盾/首帧可重建三项自检。

---

## 8. 源链接速查

| 项目 | URL |
|------|-----|
| ai-cinematic-pipeline | https://github.com/billpar/ai-cinematic-pipeline |
| docs/01 overview | https://github.com/billpar/ai-cinematic-pipeline/blob/main/docs/01-pipeline-overview.md |
| docs/03 prompt | https://github.com/billpar/ai-cinematic-pipeline/blob/main/docs/03-prompt-writing-guide.md |
| docs/04 consistency | https://github.com/billpar/ai-cinematic-pipeline/blob/main/docs/04-consistency-techniques.md |
| cinematic-video-prompt-engineer | https://github.com/CyberJ0605/cinematic-video-prompt-engineer-skill |
| PROMPT_VERSION.md | https://github.com/CyberJ0605/cinematic-video-prompt-engineer-skill/blob/main/PROMPT_VERSION.md |
| seedance-2.0 | https://github.com/Emily2040/seedance-2.0 |
| allocation-model | https://github.com/Emily2040/seedance-2.0/blob/main/references/allocation-model.md |
| directing-engine | https://github.com/Emily2040/seedance-2.0/blob/main/references/directing-engine.md |
| multishot-grammar | https://github.com/Emily2040/seedance-2.0/blob/main/references/multishot-grammar.md |
| first-last-frame | https://github.com/Emily2040/seedance-2.0/blob/main/references/first-last-frame-guide.md |

---

## 9. 下一步建议

1. **写 `02-perfectvideo-spec.md`**：锁定 S0–S11 交互与输出模板（对齐样本 11 层）  
2. **建 Material Constitution 预设库**（首批 3–5 个：东方流体雕塑 / 水墨世界 / 青铜神器 / 霓虹液金…）  
3. **从样本反编译一份「schema 填空版」** —— 证明编译器能吐出同结构产物  

**核心判断句：**  
> 能写出「东方神话·流体雕塑」的，不是更会堆形容词的模型，而是 **先锁世界材质宪法、再按保真预算写时间码** 的导演系统——GitHub 上有大脑与预算理论，宪法层得我们自己写。
