# PerfectVideo 研究 02：样本架构 · 三家补缺 · NextShot · 名家运镜库

**日期：** 2026-08-06  
**立场：** 用户给的「东方神话·流体雕塑」**只是样板段落**，要学的是 **元素槽位与编排架构**，不是题材限定。  
**需求增量：**  
1. 学样本的 **元素/架构**  
2. 用三家 GitHub 方法论 **补缺**  
3. **分镜**（模型单段约 ≤15s）  
4. **NextShot** 兼容  
5. **名家导演镜头建议**（同构 PerfectPhoto）  

---

## 1. 样本只当架构，不当剧本

### 1.1 把「流体雕塑」还原为抽象槽位

| 样本章节（内容层） | 抽象槽位（架构层） | PerfectVideo 字段名 |
|--------------------|--------------------|---------------------|
| 世界观概述 | 世界一句话 + 物质本源隐喻 | `world.summary` |
| 世界元素 | 可复用场景砖 × N | `world.elements[]` |
| 世界法则 | 物理/因果/禁止项 | `world.laws[]` |
| 材质融合 | **材质宪法**（全片统一） | `material.constitution` |
| 动态关系 | 全片节奏元规则 | `rhythm.meta` |
| 画面构图 | 舞台/景层/留白/反合影 | `stage.composition` |
| 精准动态动作 | **时间码事件表**（焦点轮转） | `timeline.beats[]` |
| 连续材质转化 | **因果 morph 链** | `timeline.morph_chain` |
| 环境流体运动 | 世界驱动运动 | `world.environment_motion` |
| 运镜方式 | 运镜合同（一镜/分段路径） | `camera.contract` |
| 光影氛围 | 光时间线 | `lighting.timeline[]` |
| 节奏控制 | 铁律 + 禁止项 | `rhythm.rules` |
| 影视参数 | 可选技术背书 | `tech.spec`（可降权） |
| 负面提示词 | 场景风险包 | `negatives.pack` |

**关键判断：** PerfectVideo 生成任意题材（写实对话、产品、神话、武侠、赛博…）时，**走同一套槽位**；槽位可空，但不可乱序（先锁 world/material，再写 timeline）。

### 1.2 架构铁律（从样本抽离）

1. **先宪法，后动作** —— material + world.laws 冻结后，才写 beats  
2. **统一语言优先于逐人外貌** —— 共享材质/光/呼吸，降低多主体漂移  
3. **时间码 = 焦点接力** —— 每拍一个焦点主体 + 有限微动，不是人人同时大戏  
4. **世界可驱动运动** —— 环境/材质变化可作主运动，人物从之  
5. **运镜是合同** —— 一镜到底 vs 多镜硬切 二选一，不混合同  
6. **节奏有禁区** —— 写清「不要什么」和「允许什么」同权  

---

## 2. 三家方法论如何补缺（填到架构槽）

### 2.1 缺什么 → 从哪补

| 样本架构已有 | 仍缺 / 弱 | 补缺来源 | 落地模块 |
|--------------|-----------|----------|----------|
| 世界/材质/时间码体例 | 先诊断意图 | CyberJ 剧情诊断 | `S0 Intent Diagnosis` |
| — | Immutable/Mutable 分层声明 | ai-cinematic-pipeline | 每镜 prompt 头：`LOCK` / `DELTA` |
| 微动写法直觉 | 物理化表情公式、静止写法 | pipeline + CyberJ | `action.physical_only` |
| 构图直觉 | 米制 blocking / 谁遮谁 | pipeline spatial blocking | `stage.blocking[]` |
| 一长段 15s | **超 15s 拆条 + 连戏** | seedance sequence + FLF | NextShot / Continuity Ledger |
| 运镜路径 | 运镜动机 + 单主运镜 | CyberJ + seedance shot language | `camera.one_move` |
| — | **保真预算** | seedance allocation-model | `budget.primary` = world\|motion\|identity |
| — | 事件密度防火墙 | seedance event-density | `beats` 只装 `this_clip_only` |
| — | 字数/时长压缩 | CyberJ | `compile.modes`: full / compact / chain |
| 负面列表 | anti-slop 词禁 | CyberJ + seedance antislop | 禁 cinematic/epic/氛围感… |
| 缺声场 | 2–4 声音锚点 | CyberJ 声光最低标准 | `audio.anchors[]` |
| 缺参考图合同 | @图角色分离 | seedance reference-workflow | `refs.roles` |
| 缺大师味 | PerfectPhoto 8 人库太薄 | **本文名家库扩编** | `director.preset` |
| 材质 morph | 三家几乎没有 | **自建** Timed Morph | `morph_chain` schema |
| 材质宪法 | 三家几乎没有 | **自建** Material Constitution | `material.*` presets |

### 2.2 PerfectVideo 主流程（补缺后）

```
S0  Intent Diagnosis          ← CyberJ
S1  World Constitution        ← 样本架构
S2  Material Constitution     ← 样本 + 自建
S3  Cast Cards + Identity    ← pipeline visual bible + seedance @Image
S4  Stage / Blocking          ← 样本构图 + pipeline 米制站位
S5  Budget Allocation         ← seedance（主花销只能 1）
S6  Mode: Single15 | MultiShot | NextShotChain
S7  Timeline Beats            ← 样本时间码 + CyberJ 微动作
S8  Morph / World Motion      ← 样本 morph + 自建
S9  Camera Contract            ← seedance shot language + 名家增强
S10 Lighting + Audio          ← 样本光时线 + CyberJ 声锚
S11 Compile + QC              ← 三家自检合并
S12 (optional) NextShot loop  ← PerfectPhoto NextShot 升维
```

### 2.3 三种输出模式（≤15s 现实）

| 模式 | 何时 | 产物 |
|------|------|------|
| **A. Single15** | 一事一空间 ≤15s | 一份完整 prompt（样本同构 11 层，可瘦身） |
| **B. MultiShot-in-one** | 同一次生成内 2–3 硬切 | `Shot 1/2/3` 或中文 `【时间轴】`（seedance multishot） |
| **C. NextShot Chain** | >15s 或要连戏 | 镜 N：尾帧图 prompt + 视频运动 prompt；锁域焊接；大师运镜 |

**合同分离（硬规则，来自 seedance）：**  
- A/C 的一镜到底：`single continuous take, no cuts` + 相位时间轴  
- B 的真切点：`Shot N:` 标签，**禁止**与 A 混写  

---

## 3. NextShot 在 PerfectVideo 中的位置

### 3.1 与 PerfectPhoto NextShot 的关系

| PerfectPhoto NextShot | PerfectVideo |
|-----------------------|--------------|
| 写真 8 步后可选桥接 | **一等公民**：S6 可选/默认链式 |
| Delta：景别/机位/运镜/动作 | 同 + **budget / material lock / world breath** |
| 运镜变换矩阵 | 继承 `transform-matrix`，再叠 `director.preset` |
| 双产物：尾帧图 + 视频运动 prompt | 同，且视频侧强制写 motion path / light change / speed curve |
| 锁定域字面量 | 扩展：`material.constitution` 与 `world.laws` 也进锁定域 |
| 桥接帧 delta 打分 | 保留 + 超 15s 强制建议拆条 |

### 3.2 NextShot 单镜最小 schema

```yaml
shot:
  index: N
  duration_s: 4-15
  budget_primary: identity | motion | world
  lock:  # 字面量
    world_summary_anchor: ...
    material_constitution: ...
    characters: ...
    lighting_base: ...
  delta:  # 白名单
    scene_size: ...
    angle: ...
    movement: ...
    action_focus: ...
    morph_step: ...   # 可选：本镜材质演化相位
  camera:
    support: locked|dolly|handheld|...
    move: one primary
    director_overlay: null | Hitchcock | ...
  video_prompt_blocks:
    - motion_path
    - light_change
    - speed_curve
    - world_breath
    - audio_anchors
  still_prompt: ...   # 尾帧图
  continuity:
    start_from: prev_last_frame | free
    end_profile: resolve | extension_anchor | hero_hold | reveal
```

### 3.3 分镜建议引擎（非用户手写表）

Agent 在 S6 根据诊断自动建议：

| 触发 | 建议模式 | 切镜逻辑 |
|------|----------|----------|
| 单意图、单空间、微动 | Single15 | 一镜相位时间轴 |
| 需真切换景别/地点 | MultiShot-in-one（若 ≤15s 能装下） | Shot 标签 + 全程薄雾式连续约束 |
| 总叙事 >15s / 多高潮 | NextShot Chain | 2–3s 可到 6–15s/镜；尾帧链式 |
| 身份脆弱 + 大动作 | 拆镜：动作镜与特写镜分离 | allocation 硬规则 |
| 选了名家 | 运镜偏好 + 转场对齐 | 见 §4 |

---

## 4. 名家导演镜头库（研究版 · 可进 skill）

> 设计同构 PerfectPhoto `master-cinematography.md`：  
> **签名运镜 · 覆盖矩阵 · 冲突规则 · 签名转场 · 追加 prompt 短语 · 适用场景 · 来源**  
> 下列为 **镜头用法** 知识卡，非完整影评。

### 4.1 原 8 位（保留并硬化字段）

| ID | 导演 | 签名镜头 | 增强基运镜 | 签名转场 | 适用 | 预算偏置 |
|----|------|----------|------------|----------|------|----------|
| hitchcock | 希区柯克 | Dolly Zoom（推轨+反向变焦）；POV/偷窥轴线；视线匹配 | 推/拉复合为 dolly-zoom | 视线匹配 | 眩晕、发现恐惧、知情优越 | identity+偏心理 |
| spielberg | 斯皮尔伯格 | 半圆环绕 + 移焦；「斯脸」慢推；多人调度长镜头 | Orbit | 叠化 | 群像、揭示、奇迹感 | world 或 identity |
| mbay | 迈克尔·贝 | 低角广角环绕；英雄仰角；高能环绕收慢动作 | Orbit 低机位 | 闪摇 | 登场、高潮、广告英雄 | motion |
| nolan | 诺兰 | IMAX 感慢推；大画幅压迫；交叉时间感（剪辑向） | Push 极慢 | 匹配剪辑 | 对峙、规模、悬念时间 | world+identity |
| wkw | 王家卫 | 手持贴身；宽角近脸畸变；step-print/抽帧拖影；门框窥视 | Handheld | 跳切+叠化 | 都市、夜、情绪碎片 | identity（靠材质/色） |
| kubrick | 库布里克 | 单点透视走廊推；对称；锁定长轨 | Push 中轴 | 匹配剪辑 | 秩序、仪式、压迫 | identity+构图 |
| wes | 韦斯·安德森 | 90° 正对横移；居中对称；俯拍平面 | Track 横移 | 横移转场 | 展示、幽默、空间陈列 | world 平面 |
| jiangwen | 姜文 | 急推急拉；爆发变焦；跳切能量 | Push/Pull 极速 | 急切/跳切 | 喜剧爆点、突然转折 | motion |

**来源（抽样）：** Vertigo dolly zoom 公共电影史叙述；Doyle/王家卫 step-printing 技术讨论（Jump Cut / Taste of Cinema 等）；韦斯对称与横移 mainstream 分析；PerfectPhoto 既有矩阵。

### 4.2 扩编名家（联网补充 · 建议入库）

#### 组 A · 亚洲运镜（东方题材强相关，不限题材可用）

| ID | 导演 | 签名镜头用法 | Prompt 可写硬描述 | 增强/冲突 | 转场 | 来源级 |
|----|------|--------------|-------------------|-----------|------|--------|
| zhangym | 张艺谋 | **色块剧场**：场次/序列被单一主色域统治；大场面 tableau 调度；环境色与叙事真伪绑定（《英雄》色段） | 「整段主色域锁死为[色]，环境与服装不跳出此域；人物在色场中呈雕塑式站位」 | 增强：构图/色彩命题；与写实随机光冲突 | 硬切色场 | 影史共识 + 作品《英雄》色结构公共论述 |
| kurosawa | 黑泽明 | **天气作演员**；轴向剪辑速度；多机位动作覆盖；画幅内群像横移 | 「风雨/烟尘贯穿；动作沿银幕方向保持轴线；多体运动可读」 | 增强：环境运动；忌无动机杂乱摇 | 轴向匹配切 | 影史常识 |
| ozu | 小津安二郎 | **榻榻米视角**固定；低机位；极少运镜；Tatami shot | 「机位约坐姿眼高，固定，正对；几乎无运镜，靠出入画调度」 | 与 Michael Bay/手持冲突 → 劝阻 | 硬切「帘幕」 | 影史常识 |
| bong | 奉俊昊 | **垂直权力**：仰/俯系统化；楼梯作为阶级运镜 | 「机位高度编码权力：上层仰视/下层俯视；纵向移动=阶层位移」 | 增强：升降/俯仰 | 硬切层级 | 《寄生虫》垂直性公共分析 |
| doyle | 杜可风（摄影指导） | 超广角贴脸；手持即兴；欠曝/霓虹；与王家卫绑定但可独立调用 | 「6–18mm 级贴近面部广角畸变；手持穿行狭廊；霓虹溢光」 | 与库布里克对称冲突 | 跳切 | HKFA/技术分析文章 |

#### 组 B · 长镜头 / 动能

| ID | 导演 | 签名镜头用法 | Prompt 硬描述 | 增强 | 转场 | 来源级 |
|----|------|--------------|---------------|------|------|--------|
| scorsese | 马丁·斯科塞斯 | 成熟 **长跟踪** 入场；流行乐节奏剪；偶尔定格 | 「一镜穿过空间建立场域，跟随主体连续路径不切」 | 跟镜头/一镜到底 | 音乐卡点切 | Goodfellas 入场公共认知 |
| cuaron | 阿方索·卡隆 | **长镜头浸没**；侧向跟随混乱空间；自然光感（Lubezki 系） | 「连续长镜头穿过[空间]，前景障碍掠过；光源以环境实际光源为主」 | 跟/穿梭；忌频闪切 | 极少切 | Gravity/Children of Men 公共论述 |
| pta | 保罗·托马斯·安德森 | **动能长镜头**；推入；**whip pan** 藏切/提速 | 「稳定器长镜头穿场；必要时用甩镜衔接注意力」 | Track/Push；甩镜 | 甩镜转场 | FilmFreeway 等 2025 风格综述 |
| inarritu | 伊纳里图 | 伪一镜（Birdman 式）广角贴身环形 | 「看似一镜的连续运动，广角，走廊内 360 可行路径」 | 一镜；路径必须物理可行 | 隐藏剪 | Birdman 制作公共叙述 |

#### 组 C · 精准 / 类型

| ID | 导演 | 签名镜头用法 | Prompt 硬描述 | 增强 | 转场 | 来源级 |
|----|------|--------------|---------------|------|------|--------|
| fincher | 大卫·芬奇 | 去饱和冷静；**精密可重复运镜**；暗部层次 | 「运镜机械般匀速；色调低饱和；阴影干净不脏手持」 | 锁定/精密 push | 硬切干净 | 主流风格指南 |
| villeneuve | 丹尼斯·维伦纽瓦 | 大气慢烧；巨大负空间；缓推规模 | 「大面积负空间；主体相对渺小；极慢推近或静持」 | Push 极慢/静 | 长叠化 | 主流风格指南 |
| tarantino | 昆汀·塔伦蒂诺 | **后备箱仰角**；长对白后突发暴力；章节感 | 「从封闭低点仰拍站立人物；对话机位稳定」 | 低角特写关系 | 硬切章节 | 后备箱镜头公共编译 |
| wright | 埃德加·赖特 | **快切特写蒙太奇**（装备/门锁/细节） | 「3–8 个极特细节硬切，动作对准剪辑点」 | 仅 MultiShot；单镜禁用 | 节奏硬切 | 其本人采访/教学流传 |
| welles | 奥逊·威尔斯 | **极端低角**权力；景深纵深同时可读 | 「机位低于腰线仰拍；前中后景同时清晰叙事」 | 低角+深焦感 | 硬切 | 《公民凯恩》公共电影史 |
| lynch | 大卫·林奇 | 锁定超现实；红色帷幕式空间；声音大于画面逻辑 | 「固定机位；超现实空间元件；表演克制诡异」 | 锁定；忌炫技环绕 | 声音桥 | 主流风格指南（慎用于写实） |

### 4.3 名家 × 基运镜 覆盖矩阵（Agent 用）

| 基运镜 | 默认增强导演 | 冲突导演（建议替换） |
|--------|--------------|----------------------|
| 推 Push | Nolan 慢 / Hitchcock dolly-zoom 变体 / Fincher 精 | Ozu（应固定） |
| 拉 Pull | Nolan 揭示 / Spielberg 事后脸 | Bay 英雄环绕语境 |
| 环绕 Orbit | Spielberg 半圆移焦 / Bay 低角 | Kubrick / Ozu / Fincher 精密脸 |
| 手持 Handheld | WKW·Doyle / 部分 Scorsese | Wes 对称 / Kubrick |
| 横移 Track | Wes 90° / Kurosawa 群像 | Hitch dolly-zoom |
| 升降 Crane | Bong 垂直权力 / Villeneuve 规模 | 对话特写高密度 |
| 固定 Locked | Ozu / Lynch / 产品 identity | Bay 高能 |
| 甩 Whip | PTA / Bay 能量 | 情绪微表情戏 |
| 长跟踪 Oner | Cuarón / Scorsese / PTA | Wright 快切 |
| 主观 POV | Hitchcock | Wes 第四面墙陈列 |

### 4.4 名家追加短语模板（写入视频 prompt）

```
【名家运镜叠加 · {Director}】
签名合同：{signature_contract}
基运镜：{base_move} → 增强为：{enhanced_move_desc}
机位/镜头：{height_lens}
稳定性：{support}
禁止混用：{forbidden_combos}
转场偏好：{transition}
一句话意图服务：{how_it_serves_intention}
```

**示例 · 王家卫：**
```
签名合同：手持贴身 + 记忆拖影，不完美=情绪真实
基运镜：手持 → 慢门/抽帧感运动拖尾，霓虹边缘溢色
机位/镜头：近距离广角，门框/玻璃前景遮挡
稳定性：呼吸手持，禁止三脚架广告感
禁止混用：不得叠加库布里克中轴对称推 + 手持
转场偏好：跳切或慢叠化
意图服务：把「说不出口」外化为模糊与窥视
```

### 4.5 名家选择交互（同构 PerfectPhoto）

```
🎬 选一位导演跟拍（可选）：

西式心理/精密：希区柯克 · 芬奇 · 诺兰 · 库布里克
动能/长镜头：斯皮尔伯格 · PTA · 卡隆 · 斯科塞斯
类型能量：迈克尔·贝 · 塔伦蒂诺 · 埃德加·赖特 · 姜文
东方/色域/垂直：王家卫·杜可风 · 张艺谋 · 黑泽明 · 小津 · 奉俊昊
史诗疏离：维伦纽瓦 · 威尔斯

不选 → 标准运镜矩阵
选了 → 增强签名运镜 + 自动对齐转场 + 冲突检查
```

**冲突检查示例：** 用户选小津 + 运镜「低角高速环绕」→ 拦截：「小津合同=固定低机位；环绕会破坏签名。改固定，或换贝/斯皮尔伯格。」

---

## 5. 合并后的「镜头建议」服务（给用户的话术形态）

不只给导演名，要给 **可执行建议包**：

```
🎥 镜头建议
· 本镜意图：{one_intention}
· 保真主花销：{budget}（故建议 {motion_level}）
· 推荐模式：Single15 / MultiShot / NextShot
· 推荐导演：{A}（主）/ {B}（备）
· 为什么：{1 句}
· 基运镜：{move}
· 名家增强后：{enhanced}
· 景别序列建议：{e.g. MS→MCU 或 固定全景}
· 本镜只做：{one action}
· 下一镜可接：{next delta}
· 风险：{allocation / 轴线 / 材质}
```

---

## 6. 编译产物形态（学样本架构，不锁内容）

### 6.1 Full（样本同构）

按 §1.1 槽位顺序输出 Markdown 章节。题材可变，骨架不变。

### 6.2 Compact（平台喂模）

```
【锁】世界锚 + 材质宪法摘要 + 角色锚
【意图】一句话
【预算】primary=...
【时间轴】0-as ...
【运镜】...
【光/声】...
【负面】...
```

### 6.3 Chain-NextShot

每镜：`Still Prompt` + `Video Prompt` + `End Profile` + `Director Overlay`

---

## 7. QC 清单（三家 + 样本）

交付前 Agent 默检：

- [ ] 材质/世界是否出现在动作之前（顺序）  
- [ ] LOCK 与 DELTA 分离  
- [ ] budget.primary 唯一  
- [ ] 单镜单一主动作 + 单主运镜（或显式分阶段一镜）  
- [ ] 一镜合同 vs Shot-N 合同未混用  
- [ ] 每拍焦点人数可控（默认 1，ensemble 其余微呼吸）  
- [ ] 有 2–4 声音锚点  
- [ ] 无空泛词：cinematic / 氛围感 / 高级感 / epic  
- [ ] 名家与运镜无冲突  
- [ ] 时长 ≤15s 或已建议拆条  
- [ ] NextShot 时 lock.material 字面量与上镜 diff 一致  

---

## 8. 与 PerfectPhoto 同构地图

| PerfectPhoto | PerfectVideo |
|--------------|--------------|
| 意图编译 | S0 Intent Diagnosis |
| 视觉风格 50 | Material + Director + World preset 库 |
| 8 步拍摄 | S1–S10 导演栈（可快速模式） |
| 人物锁定 | Cast + Material constitution 焊接 |
| 诊断模式 | 对用户丢来的视频 prompt 拆槽位打分 |
| 大师 8 | 名家库 ≥16，可继续长 |
| NextShot 可选 | S6/S12 一等公民 |
| 反油腻 | anti-slop + allocation + 物理动作 |

---

## 9. 研究结论（给产品）

1. **样本 = 架构教材**：11 槽位可泛化到任何题材。  
2. **三家补缺主航道**：诊断、预算、连戏、声光、immutable、字数——**不补材质宪法与 morph（自建）**。  
3. **≤15s → 三模式**：Single15 / MultiShot / NextShotChain。  
4. **名家库**：在 PerfectPhoto 8 人上扩亚洲与长镜头系，字段要可驱动 transform-matrix，不是影评散文。  
5. **下一步工程：**  
   - 写 `03-skill-spec.md` / 未来 `SKILL.md`  
   - 落 `references/material-presets.md`  
   - 落 `references/master-cinematography.md`（本文 §4 扩写版）  
   - 落 `references/transform-matrix.md`（继承 PerfectPhoto + 名家覆盖表）  

**一句判断：**  
PerfectVideo 不是「更会写神话的 GPT」，而是 **Constitution → Budget → Timeline → Director Overlay → 15s 编译/链式** 的导演系统；样本教骨架，三家教纪律，名家教口味。
