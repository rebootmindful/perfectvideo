# PerfectVideo — 产品规格说明书（SPEC）

| 字段 | 值 |
|------|-----|
| **版本** | 0.3.0-scaffold（可发布） |
| **日期** | 2026-08-09 |
| **状态** | 规格完备 · P0/P1/P1.5 文档级落实 · 四件套全链路接入 · 运行时待实测 |
| **成熟度** | `scaffold` → 目标 `production` |
| **包形态** | 符合 [yao-meta-skill](https://github.com/yaojingang/yao-meta-skill) |
| **血缘** | PerfectPhoto 同构升维 · NextShot 内建为主角 |
| **定位定调** | **艺术导演 OS**（视觉法律 + 可选旁白/字幕）· **不做** 增长向钩子/CTA 文案 |
| **工作区** | `D:\skills\PerfectVideo` |
| **审计来源** | `research/05-spec-audit-video-script-expert.md` |

---

## 0. 一句话定义与范围宣言

**PerfectVideo 是短视频/短片的「艺术导演 skill」：对话引导 + 世界/材质宪法 + 15s 模型切片预算 + 跨镜字面量连戏 + 名家运镜矩阵，输出可连戏的视觉脚本契约（概述 · 分镜表 · 多工具画面提示词 · 可选旁白/字幕 · Memory Pack）。**

| | 内容 |
|--|------|
| **是** | 艺术导演 + 摄影指导 + 连戏书记；制片法律系统（先锁世界，再合法动镜头） |
| **不是** | 词库、执行编排器（auvideo）、URL 复刻管线、**增长编导（钩子前置 / 完播 CTA / 带货话术主路径）** |

### 0.1 范围锁定（审计后强制 · 防角色漂移）

| 轨道 | 默认 | 说明 |
|------|------|------|
| 视觉轨（Bible / 时间码 / prompt / 连戏） | **必须** | 核心杀招 |
| 分镜表 shotlist | **必须** | 即使 Single15 也输出相位行表 |
| 视频概述 overview | **必须** | 标题/平台/画幅/双时长/风格/受众 |
| 多工具画面提示词 | **必须 generic**；by_tool 按需 | P0 保证通用中文主契约 + 结构槽；目标适配器可渐进 |
| 旁白 VO / 字幕 | **按 path 开启** | 用户需要解说时交付；纯视觉 path 显式 `N/A` |
| **钩子句 / 信息三段式 / 结尾 CTA** | **永不做** | 艺术导演不写增长脚本；用户自带文案可**原样挂载**到时间轴，本 skill 不改写成「留人公式」 |
| 真生成 API | 不做 | 下游 |

### 0.2 与「AI 视频脚本专家」契约对齐方式

专家默认交付中 **除「开头钩子 → 中段信息 → 结尾行动号召」文案结构外**，其余均纳入本 SPEC。  
旁白若存在：写**艺术解说/诗性旁白/纪录片式陈述**，标注情绪与节奏，**禁止**自动生成「你一定要看到最后」「点击关注」类 CTA。

---

## 1. Job / Intent / Boundaries（Skill IR 语义）

### 1.1 真实 Job

用户从模糊感觉（「东方神话流体感」「球鞋广告一镜推到鞋面」「两个角色车站对峙」）走到：

1. **video_overview**（标题 / 平台 / 画幅 / 双时长 / 风格 / 受众）  
2. 可执行的 **Visual Bible（锁定域）**  
3. **shotlist[]**（时间码到秒 + 画面 + 运镜 + 声画备注 + 可选 VO/字幕格）  
4. **compiled prompts**（generic 主契约必交；A0 单次全量版按需；可选 by_tool / 中英）
5. 可选 **NextShot 双产物** + Memory Pack  
6. 可选 **导演运镜建议卡**  
7. **QC 报告**  

### 1.2 主产出（Output Contract）— 硬契约

| 产物 | 格式 | 必须 |
|------|------|------|
| `video_overview` | 见 §1.2.1 | ✅ 每次交付 |
| 意图诊断卡 | 结构化短文 | ✅（可极短） |
| Visual Bible / Lock Pack | §5 + schema | ✅ 进时间轴前冻结 |
| `shotlist[]` | §1.2.2 | ✅（A 模式 ≥1 行相位表） |
| `prompts.primary` | generic 中文主契约（**自包含：锁定域全文展开，禁占位符**） | ✅ |
| `prompts.single_pass` | A0 单次全量编译（7 维信息无损，落盘 `*_single_pass.txt`） | 用户要求"一次过生成"时 ✅ 否则可选 |
| `prompts.by_tool[]` | 目标工具适配文本 | 按用户工具声明；未声明则跳过并注明 |
| `prompts.lang_en` | 英文画面提示词 | 用户要出海/MJ/英文模时 ✅ 否则可选 |
| Compact 版 prompt | 预算裁剪（仍含硬锁） | 可选 |
| Director's Bible（深度档） | Tableau/Kinetic 展开版（机制库产出，含类型视觉承诺 + 镜头机制检查表 + 主体驱动力，与 lock 分层互不污染） | 深度档升档时 ✅；默认关 |
| 诊断 Pass | 六大病症排查 + 7 维评分卡（锁档后强制，深度档必跑；lock 跑精简版） | 深度档 ✅；紧凑 lock 精简 ✅ |
| MultiShot 标签版 | `Shot N:` | 模式 B |
| NextShot 双产物 | 尾帧图 prompt + 视频运动 prompt | 模式 C |
| `voiceover[]` | 旁白 + 情绪/节奏标注 | path.vo 必须；path.visual = `N/A` |
| `subtitles[]` | 字幕 cues + 时间码 | path.vo 必须；path.visual = `N/A` 或与 VO 对齐可选 |
| Diff / QC 报告 | lock diff + 预算 + 风险 + 脚本层检查 | ✅ |
| 镜头建议卡 | 意图·预算·模式·导演·本镜一事·delta·风险 | 可选 |
| 交付 footer | 复核提示（事实/版权/广告） | ✅ |

#### 1.2.1 `video_overview` 字段

```yaml
title: string                 # 作品标题（艺术向，非标题党公式）
platform: douyin|kuaishou|shipinhao|bilibili|youtube|generic
aspect_ratio: "9:16"|"1:1"|"16:9"|"21:9"|string
model_clip_budget_s: number   # 单次生成硬上限，默认 15
target_edit_duration_s: number # 成片目标时长（可 > model；用模式 C 链）
style: string                 # 风格定位一句
audience: string              # 目标受众一句
path: visual | vo             # 纯视觉 | 含旁白字幕
no_cta: true                  # 恒 true；禁止生成钩子/CTA
```

**双时长铁律：**  
- `model_clip_budget_s` = 模型物理（切片）  
- `target_edit_duration_s` = 成片叙事  
- 若 target > model → **必须**模式 C（或 B 多次）并在 overview 写 `compile_plan: nextshot_chain`  
- **禁止**写一条 60s「单提示词搞定」 downstream 幻觉  

#### 1.2.2 `shotlist[]` 最小列

| 列 | 字段 | 说明 |
|----|------|------|
| 镜号/相位 | `id` | `S0` 或 `0:00-0:03` 相位名 / 模式 C 的 shot_index |
| 入点-出点 | `t_in` `t_out` | 秒，格式建议 `0:00`；总和校验 |
| 画面目的 | `purpose` | 艺术目的一句（非「钩子留人」） |
| 画面 | `visual` | 可见内容摘要 |
| 镜头运动 | `camera` | 景别/机位/运镜 |
| 声画锚 | `diegetic_audio` | 画面内声 |
| 旁白 | `vo` | 无则空或 N/A |
| 字幕 | `subtitle` | 无则空或 N/A |
| 风险 | `risk` | 可选 |

### 1.3 明确排除（Exclusions）

| 不做 | 原因 |
|------|------|
| 真调用 Seedance/Kling/Runway 批量跑片 | 下游执行 |
| URL→拆解→复刻 | autovidiocreator |
| 纯运镜形容词大全 | 反设计 |
| 静态写真 8 步主导 | PerfectPhoto |
| 中途静默改装/换脸/换景 | 协议禁止 |
| 无证据的「一键大片 / 直贴任意模型 100%」 | claim guard |
| **增长钩子 / 完播逼单 / 「关注点赞」类 CTA 生成** | **艺术导演红线** |
| 把用户艺术旁白擅自改写成营销三段式 | 红线 |

### 1.4 约束与标准

- 单次生成现实上限：以 `model_clip_budget_s` 为准（默认 ≤15s，可按平台/模型表覆盖）  
- **先宪法，后动作**  
- 锁定域字面量焊接，禁止「同上/略」  
- 一镜到底合同 **与** `Shot N:` **禁止混写**  
- 参考图 ≠ 细节锁  
- 商业绝对化用语克制；人物默认明确成年  
- 反 AI 油腻  
- 旁白/字幕与画面节拍**可对齐**，但不使用「钩子公式」驱动结构  
- 生成后 footer：请用户复核事实、广告话术、音乐与肖像版权  

---

## 2. 竞争定位与杀手锏

### 2.1 Thesis

> 同类卖「更好看的词」或「爆款脚本公式」；  
> PerfectVideo 卖 **艺术片场法律**：材质宪法 × Memory Pack × 模型切片预算 × 名家矩阵 ×（可选）诗性声画文案挂载。

### 2.2 四层杀手锏（必须叠焊）

| ID | 杀手锏 | 用户可感知价值 |
|----|--------|----------------|
| K1 | Material Constitution | 奇观/多人统一材质语言 |
| K2 | Memory Pack | 跨镜帽/道具/环境不漂 |
| K3 | 模型切片时间码 OS | 不炸 15s 仍有电影感 |
| K4 | 艺术导演交互 + 名家矩阵 | 跟艺术导演，不是许愿机/标题党 |

### 2.3 竞品边界

| 类型 | 姿态 |
|------|------|
| 词库/模板 pack | 绝不做 |
| 爆款钩子文案 skill | **绝不做**（红线） |
| 平台槽位编译器 | 输出可对接，不当核心 |
| ai-cinematic-pipeline / CyberJ / seedance 方法论 | 吸收规则，不整包复刻 |
| auvideo / 复刻管线 | 下游 |
| PerfectPhoto+NextShot | 同构升维血缘 |

### 2.4 自建原语

Material Constitution · World Breath · Timed Morph Chain · Ensemble Stage

---

## 3. 架构：样本 → 抽象槽位（题材无关）

「东方神话·流体雕塑」**仅作架构教材**，槽位可空，**顺序不可乱**。

| 样板章节 | 字段 | 冻结时机 |
|----------|------|----------|
| 世界观概述 | `world.summary` | S1 |
| 世界元素 | `world.elements[]` | S1 |
| 世界法则 | `world.laws[]` | S1 |
| 材质融合 | `material.constitution` | **S2 硬锁** |
| 动态关系 | `rhythm.meta` | S2–S4 |
| 画面构图/舞台 | `stage.composition` + `blocking[]` | S4 |
| 精准动态 | `timeline.beats[]` | S7 |
| 连续材质转化 | `timeline.morph_chain` | S8 |
| 环境运动 | `world.environment_motion` | S8 |
| 运镜 | `camera.contract` | S9 |
| 光时间线 | `lighting.timeline[]` | S10 |
| **画面内声** | `diegetic_audio.anchors[]` | S10 |
| **旁白轨** | `voiceover[]` | S10 若 path.vo |
| **字幕轨** | `subtitles[]` | S10 若 path.vo |
| 节奏铁律 | `rhythm.rules` | S10 |
| 影视参数 | `tech.spec`（可降权） | 编译时 |
| 负面 | `negatives.pack` | 编译时 |
| 概述/发行 | `video_overview.*` | S0 末冻结要点 |

### 3.1 架构铁律

1. 先宪法，后动作  
2. 统一材质语言优先于逐人长外貌  
3. 时间码 = 焦点接力  
4. 世界可驱动主运动  
5. 运镜合同不混  
6. 节奏禁区与允许项同权  
7. **声画三轨分离**：diegetic ≠ voiceover ≠ subtitles  
8. **双时长分离**：model_clip ≠ target_edit  

---

## 4. 工作流：用户 U 步（前台）+ S0–S12（后台）

### 4.0 问数契约（对齐 PerfectPhoto · 产品级）

| 路径 | 用户表态次数 | 说明 |
|------|--------------|------|
| 标准纯视觉 | **7～8** | 开场/U0 + U1–U6 + 冻结 |
| 快速模式 | **2～3** | 说满 → 锁定确认 → 交付 |
| path.vo | **+0～1** | 旁白半步 |
| NextShot 每镜 | **1～3** | 不重走 U0–U6 |
| 硬顶 | **首片强制提问 ≤10** | 超过则默认出锁定卡 |

**禁止**对用户逐步念 S0–S12。细则与开场话术：`references/user-facing-flow.md`。

### 4.0.1 用户可见 U 步

| U | 用户问题（1 问优先） | 后台写入 |
|---|----------------------|----------|
| U0 | 片子感觉 → 意图编译（不逐维确认） | S0 诊断 |
| **UG** | **方向规划门禁：主角四问卡（想/怕/压/错信，写满才出方向，答不出回 U0）→ 出 2–3 方向（故事主轴/开场↔终场对照/生成策略+成本/时长格式）→ 用户选 1 才继续** | 方向选定 → S1 |
| U1 | 平台+画幅+成片时长（+可选旁白）打包 | S0 overview |
| U2 | 材质世界预设一选 | S1+S2 |
| U3 | 人/衣/帽/道具（≤2 轮） | S3 |
| U4 | 舞台空间 | S4 |
| U5 | 1～3 个关键瞬间（非逐秒逼问） | S7 |
| U6 | 运镜 + 可选名家 | S9 |
| U✅ | 锁定卡确认 → **出稿前逻辑审核（七维：六维+一次看懂）** → 生成策略确认（模型/连贯性/成本） | bible 冻结 → S11 |
| U+ | 旁白半步（可选） | S10 vo |

**静默代填（不许单独成问）：** S5 预算 · S6 模式 · S8 morph · S10 光与 diegetic · negatives · QC

### 4.0.2 后台 S0–S12（内部）

```
S0  Intent + Overview      ← U0/U1
S1–S2 World + Material     ← U2
S3–S4 Cast + Stage         ← U3/U4
S5–S6 Budget + Mode        ← 静默
S7–S8 Beats + Morph        ← U5 / 静默 morph
S9–S10 Camera + Light/Audio← U6 / 静默光声 / U+
S11 Compile + QC           ← U✅ 后
S12 NextShot               ← 成片后
```

完整映射：`references/workflow-s0-s12.md`。

### 4.1 交互纪律

- **对用户：U 步 only**；每步优先 1 问 + 选项（同构 PerfectPhoto）  
- 先推断再确认；意图编译禁止 7 维勾选问卷  
- 用户改锁定域 → Invariant 拦截  
- 快速模式可跳 U1–U6 点选，仍须锁定确认 + 全套交付  
- **禁止**推销钩子/CTA；**禁止** S 步问卷化  

### 4.2 模式合同

| 模式 | 条件 | 产物合同 |
|------|------|----------|
| **A Single15** | target≤model 且一事一空间 | 相位时间轴 + 一镜到底；shotlist 为相位行 |
| **A0 SinglePass** | target≤model，用户要求"一次过生成" | shotlist 全量编译成连贯叙事 + 7 维信息无损 + 落盘 `*_single_pass.txt`（`compile-modes.md` §A0） |
| **A+ MultiClip 逐拍** | 运镜≥3 段/含签名（执行度优先） | 每拍独立 prompt + 尾帧接续 + xfade 拼接（`compile-modes.md`） |
| **B MultiShot-in-one** | 同次 2–3 真切 | 共用 lock + `Shot N:`；shotlist 每 Shot 一行 |
| **C NextShot Chain** | target>model 或硬连戏 | 每镜焊接 + 双产物 + **执行度对账**；shotlist 跨 clip 连续时间码（成片尺）可另注 clip 尺 |

### 4.3 路径卡片

| path | 用户 | 必交付增量 |
|------|------|------------|
| `visual` | 纯视觉艺术片 | overview + bible + shotlist + prompts + QC；VO/字幕 = N/A |
| `vo` | 需要解说/字幕 | 上 + voiceover[] + subtitles[]（艺术口吻，无 CTA） |

用户自带旁白：可 **mount** 到 beats，只做时间对齐与情绪标注，**不改写成营销结构**。

---

## 5. Visual Bible / Lock Schema

详见 `references/consistency-protocol.md`、`schemas/visual-bible-lock.md`。

### 5.1 锁定域字段（Invariant）

| 字段 | 要点 |
|------|------|
| `lock.characters[]` | 身份、成年、anchors |
| `lock.wardrobe[]` | 分件；**帽饰独立** |
| `lock.character_props[]` | **归属到人** |
| `lock.props[]` | 场景物外观 |
| `lock.spatial` | full_text + key_elements.anchor；禁摘要 |
| `lock.material` | 材质宪法全文 |
| `lock.atmosphere` | 氛围 |
| `lock.imaging` | 成像 |
| `lock.lighting` | 光基线 |
| `lock.color` | 色彩命题 |
| `lock.aspect_ratio` | 与 overview 一致，跨镜不改 |

### 5.2 五层叠甲

Bible 冻结 → 字面量焊接 → Delta 白名单 → 视觉双锚 → 出镜 QC  

### 5.3 外观 vs 状态

外观锁死；状态可动。

### 5.4 推导公式

```text
new_prompt = copy(lock 全文) + legal_delta(shot.*) + this_clip_action
```

---

## 6. 预算与事件密度

### 6.1 Allocation（主花销只能 1）

| 主花销 | 买到 | 牺牲 |
|--------|------|------|
| identity | 脸/衣/产品 | 大动作与密世界 |
| motion | 运镜/动作 | 特写细节 |
| scene_density | 密世界/群像 | 单人精度 |

### 6.2 Event density

- beat ≈ 2–3s  
- 每拍一焦点  
- morph 不与高速动作同拍堆满  
- 超预算 → 拒稿或拆 C  

### 6.3 声画预算（path.vo）

- 旁白密度不可挤爆画面信息：宁可减 VO 句量  
- 禁止用 CTA 填充「无话可说」的秒数  

---

## 7. 名家运镜（矩阵，非影评）

见 `references/master-cinematography.md`（8 完整卡 + 冲突表 + 短语模板）。  
**惊艳度主旋钮：** `references/camera-moves.md` —— 三档运镜意图（克制/电影感/签名惊艳）+ **25 条签名运镜（含 ASCII 运动预览）** + 预算联动。  
输出建议卡形态不变。

---

## 8. 编译、多工具与 QC

### 8.1 诚实措辞（P0）

> **P0 保证：** 输出 **模型中立 generic 主契约**（中文结构完整，可人工粘贴到多数视频模）。  
> **不保证：** 未经适配器的「一键 100% 直贴任意厂商最优」。  
> **P0/P1：** `prompts.by_tool[]` 按目标填充；未实现的 target 显式 `adapter: pending`。

### 8.2 `compile.target` 枚举

| target | 适配要点 | 状态 |
|--------|----------|------|
| `generic` | 11 层/合同结构中文主稿 | **P0 必须** |
| `seedance` / `kling` / 可灵 / 即梦 | 主体动作+场景+运镜+时长+参考槽习惯 | P0 轻适配文案 / P1 加深 |
| `cogvideox` | 主体动作+场景+镜头+风格+画质 | P1 |
| `midjourney_still` | 静帧；主体+光影+`--ar` 对齐 aspect | P0 模式 C 尾帧侧轻适配 |
| `sd_still` | 正负向分离 | P1 |

中英：`lang_zh` 默认；`lang_en` 在 MJ/英文模/用户要求时必须。

### 8.3 full / compact / chain

| 模式 | 行为 |
|------|------|
| full | 完整主契约 + shotlist + overview |
| compact | 压修辞；保留 lock 硬核 + 主 beat + overview 关键字段 |
| chain | lock 块 / delta 块 / motion 块分离 + 双产物 |

### 8.4 交付前硬闸

**画面/连戏：**

- [ ] Bible 冻结 + version  
- [ ] LOCK 字符级一致（非首镜）  
- [ ] 无「同上/略」  
- [ ] 无合同混写  
- [ ] 主花销唯一；beats 密度合格  
- [ ] 帽饰独立；道具归属  
- [ ] spatial anchors 在  
- [ ] diegetic_audio ≥2（可弱提示）  
- [ ] 负面包  
- [ ] anti-slop  

**脚本层（P0 新增）：**

- [ ] `video_overview` 字段齐全  
- [ ] `model_clip_budget_s` 与 `target_edit_duration_s` 均有且逻辑自洽  
- [ ] target>model 时未假装单条长提示词  
- [ ] `aspect_ratio` 与 prompt/锁一致  
- [ ] `shotlist` 存在；时间码可加总  
- [ ] path.visual 时 VO/字幕显式 N/A；path.vo 时非空  
- [ ] **无 CTA/钩子公式句**（关键词扫描：关注、点赞、看到最后、链接在等）  
- [ ] `prompts.primary` 非空
- [ ] 用户要求"一次过生成"时 `prompts.single_pass` 非空且 7 维信息无损
- [ ] footer 复核提示已附  

**出稿前逻辑审核（P0.5 新增 · 2026-08-09）：**

- [ ] 七维审核全 PASS：合同一致性（no cuts 与 cuts 不冲突）/ 空间拓扑（机位链可走通、无瞬移、机位不重复触发）/ 情绪因果（反应有可见触发）/ 物理尺度（比例与距离自洽）/ 声画对齐（声锚与动作逻辑匹配）/ 密度控制（单切片主事件 ≤5）/ **一次看懂（遮 prompt 复述故事 / 认知负载 ≤5 / 无自指依赖）**
- [ ] 观众视角搞笑排查（无瞬移/消失/情绪反转/尺度突变/重复机位/穿模/搞笑意象）
- [ ] 任一 FAIL 已修复并重审；审核报告随交付附上

---

## 9. 平台与画幅（发行规格 · 非钩子）

| platform | 默认画幅 | 成片常见时长意识 | 模型切片默认 |
|----------|----------|------------------|--------------|
| douyin / kuaishou | 9:16 | 15–60s 成片常见 | 15s clip 链 |
| shipinhao | 9:16 或 16:9 | 30s–3min | 15s 链 |
| bilibili | 16:9 | 3min+ 则长链 | 15s 链 |
| youtube | 16:9（短 9:16） | 按栏目 | 15s 链 |
| generic | 用户选 | 用户选 | 15s |

调性提示仅限**艺术介质**（诗意/纪实/奇观/产品审美），**不**写「怎么开头 3 秒留人」。

细则：`references/platform-and-overview.md`

---

## 10. 声画三轨定义（消灭 audio 歧义）

| 轨 | 字段 | 是什么 | 不是什么 |
|----|------|--------|----------|
| 画面内声 | `diegetic_audio.anchors[]` | 水波、脚步、琴弦、布料 | 旁白 |
| 旁白 | `voiceover[]` | 艺术解说/诗性/纪录片陈述 + 情绪标签 | 钩子/CTA |
| 字幕 | `subtitles[]` | 可烧录文本 + 时间码 | 自动营销花字口号 |

---

## 11. yao-meta-skill 包结构

```text
PerfectVideo/
├── SKILL.md
├── agents/interface.yaml
├── VERSION
├── README.md
├── PERFECTVIDEO-SPEC.md
├── references/
│   ├── user-facing-flow.md        # 对用户 7～8 问（主交互契约）
│   ├── architecture-slots.md
│   ├── workflow-s0-s12.md         # 后台 S 映射（勿逐步问用户）
│   ├── consistency-protocol.md
│   ├── compile-modes.md
│   ├── material-constitution.md   # 含 5 套全文金样
│   ├── master-cinematography.md   # 8 完整卡 + 冲突表 + 短语模板
│   ├── camera-moves.md            # 三档运镜意图 + 25 条签名运镜（含运动预览）
│   ├── boundaries-and-qc.md
│   ├── platform-and-overview.md
│   ├── model-constraints.md       # 模型/平台硬约束（P1 补）
│   ├── negative-packs.md          # 题材负面包 + anti-slop（P1 补）
│   ├── voiceover-sync.md          # VO 与画面同步细则（P1 补）
│   ├── native-audio.md            # 真声轨（C · H3/Kling3 native audio）
│   ├── frame-reference-contract.md# 首尾帧+多参考图+@槽位（B · 连戏硬控制）
│   ├── asset-checklist.md         # 素材准备清单（生成前交给用户）
│   ├── micro-motion.md            # 微动节拍（D · 惊艳藏在 0.5s）
│   ├── light-phase.md             # 光相位（E · 光线演一段戏）
│   ├── shot-scale.md              # 景别×情绪（镜头语言地基）
│   ├── post-shot-review.md        # 执行度对账（试片会 · 写拍改闭环）
│   ├── narrative-spine.md         # 叙事主轴方法论
│   ├── pre-submit-logic-audit.md  # 提交前逻辑审核
│   ├── cinematic-mechanism-library.md  # 电影机制库
│   ├── world-bible-depth.md       # 世界观深度档
│   ├── kinetic-fpv-depth.md       # 动能 FPV 深度档
│   ├── genre-visual-promise.md    # 类型视觉承诺
│   ├── post-delivery-impact-audit.md  # PIA 出稿后冲击力审计
│   ├── diagnose-repair.md         # 诊断修复
│   └── output-contract.md
├── scripts/compile-single-pass.js  # A0 SinglePass 编译器
├── schemas/visual-bible-lock.md
├── examples/golden-a-single15.md    # P0 金样（非 SKILL.md）
├── evals/trigger_cases.json
└── research/
```

| yao 规则 | 状态 |
|----------|------|
| 唯一 SKILL.md 入口 | ✅ |
| lean + references | ✅ |
| interface.yaml | ✅ |
| 一包一职（艺术导演） | ✅ |
| 不宣称 world-class | ✅ |
| golden 示例不叫 SKILL.md | ✅ |

---

## 12. 姊妹系统

| 系统 | 关系 |
|------|------|
| PerfectPhoto | 静帧导入 lock；字段映射见 schema bridge 注释 |
| NextShotPhoto | 升维为模式 C |
| cinema-dna | 思想引用 |
| auvideo | 下游执行 handoff（P2） |

---

## 13. 分阶段落地

### P0（本版规格必须写清 · 部分已文档完成）

1. ~~范围宣言~~ ✅ 艺术导演；禁钩子 CTA  
2. ~~Lock/Bible 契约~~ ✅  
3. ~~字面量焊接规则~~ ✅  
4. ~~材质预设框架~~ ✅  
5. ~~五模式编译（A/A0/A+/B/C）~~ ✅
6. ~~overview + shotlist + 双时长 + 三轨音频~~ ✅ 本版  
7. ~~generic 主契约措辞诚实化~~ ✅  
8. ~~golden A 示例~~ ✅ `examples/golden-a-single15.md`  
9. ~~用户问数契约~~ ✅ U0–U6 + 冻结 ≈ 7～8；禁 S 问卷化；熔断 ≤10  
10. SKILL 运行时按文档执行（agent 遵守）  

### P1（0.2.0 已文档级落实）

| 项 | 落点 | 状态 |
|----|------|------|
| negative 题材包 | `references/negative-packs.md` | ✅ |
| 模型/平台硬约束表 | `references/model-constraints.md` | ✅ |
| anti-slop 词表 | `references/negative-packs.md` §5 | ✅ |
| 材质宪法全文金样 | `references/material-constitution.md` 5 套 | ✅ |
| 名家 8 卡短语模板 + 状态行 | `references/master-cinematography.md` | ✅ |
| VO 与画面同步细则 | `references/voiceover-sync.md` | ✅ |
| bridge 导入（Photo→Video） | schema 注释级 + `workflow-s0-s12.md` | ⚠️ 半落（正式流程 P2） |
| by_tool 深适配金样 | compile-modes 轻适配 + golden | ⚠️ 半落（P2 加深） |

### P1.5（惊艳四件套 · 2026-08-07 新增）

| 项 | 落点 | 状态 |
|----|------|------|
| **C 真声轨**（H3/Kling3 native audio） | `references/native-audio.md` | ✅ |
| **B 首尾帧+多参考图**（连戏硬控制 90→99%） | `references/frame-reference-contract.md` | ✅ |
| **D 微动节拍**（发丝/衣袂/云裂/月晕） | `references/micro-motion.md` | ✅ |
| **E 光相位**（基线→变奏→落幅 单向演进） | `references/light-phase.md` | ✅ |
| **景别×情绪**（镜头语言地基） | `references/shot-scale.md` | ✅ |
| **执行度对账**（试片会 · 写拍改闭环） | `references/post-shot-review.md` | ✅ |
| **A+ MultiClip 逐拍**（执行度根治） | `references/compile-modes.md` A+ | ✅ |
| **A0 SinglePass**（一次过编译路径） | `references/compile-modes.md` A0 + `scripts/compile-single-pass.js` | ✅ |
| SKILL 核心原则/静默代填/Reference Map | 四件套焊入 | ✅ |

### P2（发布后迭代）

- scripts/diff、真链实测、auvideo handoff、bridge 正式导入流程、by_tool 深金样、拒稿话术库

### 装配顺序

```
连戏锁 → 材质宪法 → 切片编译 → overview/shotlist → NextShot → 名家
→ 真声轨 → 首尾帧/参考图 → 微动节拍 → 光相位 → 实测
```

---

## 14. 研究与证据索引

| 文档 | 内容 |
|------|------|
| research/00–04 | 方法与竞品 |
| research/05 | 脚本专家审计（本补丁来源） |
| research/06 | 规格落实审计（发布前复核） |
| examples/golden-a-single15.md | A 模式金样 |

**证据：** 方法已论证；运行时有效性 = `missing evidence`。

---

## 15. 终局判词

> 宪法锁死世界，双时长锁死物理，焊接锁死连戏，矩阵锁死怎么拍；  
> 概述与分镜表锁死可交接；旁白可挂载但**绝不降智成钩子**。  
> 提示词是艺术法律的打印件，不是带货话术的皮。

The map IS the terrain. The terrain IS the map.
