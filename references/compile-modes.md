# 编译模式 · 多工具 · 诚实保证

## 保证边界（P0）

| 保证 | 不保证 |
|------|--------|
| `prompts.primary` generic 中文结构完整、含硬锁 | 一键 100% 贴合任意厂商隐式最优 |
| 合同合法（A/A0/A+/B/C 不混） | 未声明 target 的 by_tool 已写好 |
| shotlist + overview 与 prompt 时长/画幅一致 | 已渲染成片 |

未实现的适配器：`status: pending` + 仍给 generic。

## A · Single15

- 条件：`target_edit_duration_s <= model_clip_budget_s`，一事一空间  
- 结构：lock + 世界/材质要点 + 相位时间轴 + 运镜 + 光 + diegetic_audio +（可选 VO 对齐）+ 节奏/负面  
- 合同：`single continuous take, no cuts`  
- shotlist：相位行  
- **禁止** `Shot 1:` 真切标签  

## A0 · SinglePass（单次全量编译 · 2026-08-16 教训新增）

> **教训记录（2026-08-16 坠崖/特工场景）**：md 文件按 A+ 逐拍设计（10 拍独立 prompt），用户要求"一次过生成"时，agent 没有合规编译路径，**现场重写成英文叙事**提交——丢失 rack focus 路径、色温数值、@槽位、材质宪法 forbidden 列表、VFX 微细节、开场终场对照。违反"禁止现场重写"铁律。**根因：禁令没有对应的替代路径。修复：新增 A0 编译模式 + prompts.single_pass 产物段。**

### 条件

- `target_edit_duration_s <= model_clip_budget_s`，且用户要求"一次过生成"（不拆 clip）
- 模型支持单次生成 target 时长（如 Seedance 2.5 支持 10s 单次）

### 合同

`single continuous generation, no splits, no cuts`

### 编译规则（shotlist → single_pass prompt）

```text
输入：shotlist N 拍 + prompts.primary + 材质宪法 + 光相位 + 声锚
输出：一段完整的 single_pass prompt（落盘到 outputs/*_single_pass.txt）

编译步骤：
1. 头部声明（3-5 句）
   - 材质宪法压缩（核心约束 + forbidden 列表，逐字保留 forbidden）
   - @槽位绑定（角色/环境/道具锁定，含负面声明）
   - 全片风格关键词（电影写实、胶片颗粒等）

2. 时间线叙事（按 0:00 → 0:N 顺序编织）
   - 每拍编成 1-2 句：核心动作 + 运镜 + 速度 + 景别
   - rack focus 迁移路径 → 嵌入对应拍的动作描述（"焦点从X收束到Y"）
   - 光相位变化 → 嵌入叙事（色温数值保留）
   - 声锚 → 用 <> 嵌入对应动作（Hz 数值保留）
   - VFX 微细节 → 作为动作的延伸描述
   - 时间标记 [0:00-0:01] 分段，但叙事不断裂（不换行成独立段）

3. 尾部全局参数
   - 速度弧线一句话总结
   - 光相位一句话总结
   - 开场↔终场对照一句
```

### 铁律

1. **7 维信息无损**：时间码 / 机位链 / 声锚 / 微动节拍 / 光相位 / 材质宪法 / 开场终场对照——全部保留
2. **语言一致**：与 md 文件语言一致，不擅自切换（中文 md → 中文 prompt）
3. **禁止现场重写**：从 shotlist 逐字提取编译，不凭理解重写
4. **落盘后再提交**：编译产物写入 `outputs/*_single_pass.txt`，提交时读文件，不在命令行现场写
5. **优先用编译器脚本**（2026-08-16 新增）：`node scripts/compile-single-pass.js <md文件路径>` 自动从 prompts.primary 提取编译，消除手动编译的信息丢失风险。脚本失败（非标准格式）时回退手动编译，但必须在 diff 审计中标注"手动编译"

### 与 A / A0 / A+ 的关系

| 模式 | 适用场景 | 产物形态 | 拼接 |
|------|---------|---------|------|
| A · Single15 | H3 单条 15s | 一段连续叙事 | 无 |
| **A0 · SinglePass** | **Seedance/通用 单次全量** | **一段连贯叙事（信息无损编译）** | **无** |
| A+ · MultiClip | 逐拍精修 | N 个独立 prompt | FLF 首帧链 xfade |

A/A0/A+ 三模式同源于 shotlist，编译时逐字搬运。md 文件可同时提供 `prompts.primary`（分拍）和 `prompts.single_pass`（单次），按用户选择的模式提交对应产物。

### 提交 diff 审计（A0 专用）

```text
□ 7 维信息无损：时间码/机位链/声锚/微动/光相位/材质宪法/开场终场对照全部可定位
□ 语言一致：single_pass 语言 == md 文件语言
□ 拍数覆盖：single_pass 覆盖 shotlist 全部 N 拍的核心动作
□ 锁定域一致：@槽位声明与 lock 字符级一致
□ forbidden 完整：材质宪法禁止清单逐字保留
□ 落盘提交：读 outputs/*_single_pass.txt 文件提交，非命令行现场写
任一 ✗ → 拦截，重编译
```

## A+ · MultiClip 逐拍（高执行度主路径 · 2026-08-07 同行评审新增）

> **模型执行度打折是物理现实**：真机验证「5 段运镜只执行 3 段」（research/09）。  
> 根治方案 = **一镜一拍**：15s 拆 5×3s 分拍，每拍单独生成（运镜 100% 执行），再 xfade 拼接。
> **Seedance 是 A+ 最佳宿主之一**（2026-08-15）：Seedance 甜区 5-10s + 强 FLF 首帧链 = 天然逐拍短切片。A+ 规则链中的 H3 15s 假设需泛化——Seedance 走 10s 切片时拍数对齐 10 拍（见 §6.1 拍数对齐铁则），单拍时长按实际 model_clip 调整。

- **条件**：target ≤ model 且**运镜 ≥3 段**或含签名运镜 → 优先逐拍；纯单主运镜仍可 A
- **结构**：
  1. 每拍 1 个独立 prompt（锁同 lock，只改本拍运镜/动作/微动）
  2. 拍 N 尾帧 → 拍 N+1 首帧（首帧续接，连戏 ~99%）
  3. xfade 交叉溶解拼接（1s，同构图）
- **铁律**：每拍单主运镜；总拍数 × 单拍时长 = target；拼接参数写死（`-pix_fmt yuv420p -profile:v high -movflags +faststart`）
- shotlist：每拍一行 + 拼接行
- **成本**：拍数 × 单条生成费（5 拍 ≈ 5× 单条）——执行度优先于成本

### 模式守门（2026-08-07 竹林教训 · 强制）

**触发 A+ 的硬条件（命中任一即禁止 A 单条）：**

| 条件 | 判定 |
|------|------|
| 节拍密度 | beats ≥ 2 动作/3s（如「1 秒一动作」→ 15s 15 动作 → **强制 A+**） |
| 运镜段数 | 运镜 ≥3 段（如缓推→环绕→甩摇→子弹时间 → **强制 A+**） |
| 含签名运镜 | 任一签名（Speed Ramp/Whip Pan/子弹时间…）→ 默认 A+（单签名+单主运镜可 A） |
| 用户多参考图诉求 | 用户要「首帧 + 多参考图」→ 映射为**逐拍多首帧**（每拍 first-frame 一张图），**禁止文字化丢图** |

**守门流程（编译前必跑）：**

```text
1. 数 beats 密度 + 运镜段数 → 命中硬条件？
2. 命中 → 声明「模式 = A+ 逐拍」，锁定卡展示一句
3. 禁止为省事改回 A 单条；禁止把用户参考图诉求降级为文字
4. 模型能力冲突（如 H3 首尾帧 vs 多参考图互斥）→ 亮方案给用户选，
   不擅自拍板（如「拍 N 用 first-frame=图N」即三图全用方案）
```

> ⚠️ 教训记录（2026-08-07 竹林打斗）：规划 A+ 5×3s，执行时私自降级 A 单条 15s——15 个动作只执行 3 幕主体（男侠丢失），且用户要求的三参考图被「文字化」未真传。**根因：省事。修复：以上守门强制化。**  
> ⚠️ 教训记录 2（2026-08-07）：**提交 ≠ 规划**——规划是 A+ 逐拍 5 拍，实际提交给 H3 的 prompt 是 agent 现场重写的单条 15s 版本（拍数/节拍/运镜段数全变）。**根因：提交时凭理解重写而非从产物逐字搬运。修复：提交 diff 对齐强制化（见下）。**

### 提交 diff 对齐（提交前必跑 · 教训 2 修复）

**铁律：提交给模型的 prompt = 规划产物（shotlist / prompts.primary / 各拍）的逐字搬运，禁止现场重写。**

```text
提交前审计（每一条真实提交都必须过）：
□ 模式一致：提交声明的模式（A/A0/A+/B/C）== 规划模式
□ 拍数一致：逐拍时提交条数 == shotlist 拍数（5 拍 = 5 条，不合并）
□ 节拍一致：提交内容覆盖全部 beats（1 秒一动作 = 15 个微节拍都在）
□ 运镜一致：运镜段数/顺序 == 规划（缓推→环绕→甩摇→子弹时间不得缺段）
□ 锁定域一致：@人物/@环境/服装/道具逐字保留（与 lock 字符级一致）
□ 参考图一致：用户要的参考图数量 == 实际传入数量（首帧+参考图不得少传）
任一 ✗ → 拦截，回规划产物重取，禁止提交
```

**实施要点：**
- A+ 逐拍：**逐拍生成 = 逐条提交**——每拍 1 条独立 prompt（锁同 lock 前缀），禁止把多拍合并成一条长 prompt
- A0 单次：编译产物落盘 `outputs/*_single_pass.txt`，提交时读文件——**不在命令行现场写 prompt**
- 生成前把规划产物落成 `outputs/*_prompt.txt` 文件，提交时 `--prompt-file` 直接读文件——**不在命令行现场写 prompt**
- 提交后留痕（2026-08-16 强化）：本地任务状态文件 `tasks/{task_id}.json` 的 `prompt` 字段**必须记录完整 prompt 文本**或指向 `outputs/*_prompt.txt` / `outputs/*_single_pass.txt` 文件路径——**禁止只写摘要**（如"Agent rooftop ritual - original PIA prompt"）。摘要无法回溯 diff，等于无留痕。

### A+ 独立规则链（2026-08-09 新增 · 与 A/C 同规则，消除模式断层）

> 审核发现：A（单条）与 C（NextShot 链）都有完整规则链，A+ 只有守门+diff，缺审核链。补齐：
> **A+ = 多段 A 的串行执行**，每段独立走 FirstShot 规则，段间靠尾帧链物理承接。

```text
A+ 每段（拍）规则链：
1. 段内 lock：同一 lock 前缀 + 本段 delta（运镜/动作/微动），禁改锁定域
2. 诊断 Pass：每段锁档后跑 7 维（任一 <1 或总分 <10 必修）
3. 完整性铁律：每段 15 拍段内时间码/机位/声锚/微动/光相位/材质宪法 verbatim 进本段 prompt
4. 出稿前逻辑审核：每段独立七维（六维合同自洽 + 一次看懂）+ 观众搞笑（FAIL 禁提交本段）
5. 跨段光相位桥：段 N+1 开场色温/亮度 == 段 N 终场（xfade 拼接才不跳变）
6. 生成策略确认：段 N 尾帧 = 段 N+1 首帧 + 成本明示（拍数 × 单条费）
7. 执行度对账：每段生成后逐拍核对（写拍改闭环）
8. diff 闸门：段内 lock 与规划一致，段间 lock 字符级一致

拼接（全部段生成后）：
- 统一分辨率/fps/编码（-pix_fmt yuv420p -profile:v high -movflags +faststart）
- xfade 交叉溶解（1s，同构图）；offset = Σ(前段时长) − xfade_duration
- acrossfade 音频同步
- 拼接后整体 MAD 检查：衔接窗帧差异无 >25 尖峰（跳变 → 重看相邻段尾帧/首帧构图）
```

### 逐拍提交段 · 4 默认维度 + 动作 tempo 谱（对齐 Seedance 标杆 · 2026-08-08）

> 对照 `awesome-seedance-prompts` 的 Best 级武侠范例（`Bamboo Run: Duel at Dusk`）发现：提交 lock 的逐拍段在 4 个维度偏薄——**节奏谱 / rack-focus 景深 / 画面内声锚 / 高潮 VFX 微细节**。深度档 Bible 的"状态改变/升级"思考此前卡在分层里未回流 lock。现强制补齐。

**每拍提交段必须包含（4 默认维度，落到文本不是只心里有）：**

| # | 维度 | 写法示例 |
|---|------|----------|
| 1 | **景别 shot size** | 广角建景 / 中景 / 中近景 · 浅景深 |
| 2 | **rack-focus / 景深** | 焦点在剑格与飞溅雾珠间变焦切换 |
| 3 | **diegetic 声锚** | 环境声：仅余峰风与剑啸，压迫肃杀 |
| 4 | **高潮 VFX 微细节** | 剑气震开的环形雾浪 + 被剑风削断的竹叶 |

**动作戏（搏斗/追逐/冲击）强制 tempo 谱：**

- 每动作拍必写速度变化：**常态疾速 → 爆点切超慢动作（slow-mo 展示能量/碎裂/位移）→ 常态速度复位**。
- 慢动作爆点必须落在"状态改变"时刻（如双剑相格、落地、转折），与 Bible 镜头机制检查表的"状态改变"对齐。
- 例：「节奏：常态疾速 → 双剑相格瞬间切超慢动作，清晰呈现剑气震开的环形雾浪与被剑风削断的竹叶 → 常态速度复位两人背向落地」。

**深度洞察回流铁则：**

- Bible（深度档）的"升级/转折/状态改变"**不是只给人看**——编译提交段时，将其提炼为该拍的 **tempo 谱 + 高潮 VFX** 写回提交 prompt。
- 分层含义 = "不把整份 Bible 塞给便宜模型"，**不等于**"lock 逐拍永远是干瘪一句"。提交段允许吸收节奏与景深维度的精华。
- 与"提交 diff 对齐"不冲突：回流的是从 Bible 蒸馏的结构化维度，仍逐字搬运、不现场自由重写。
- 完整性铁律见 **§6**（primary 逐字承载导演决策，禁蒸发；长度限制走 compact_emergency）。

## 6. 提交提示词完整性铁律（2026-08-09 新增）

> `prompts.primary` 是导演合同的 **verbatim 打印件**，不是摘要、不是梗概、不是信达雅翻译。

### 6.1 禁止蒸发的导演决策

以下元素必须全部进入 `prompts.primary`（中文）及其 `lang_en` 版本：

| 决策维度 | 必须出现的内容 | 示例 |
|---|---|---|
| 15 拍时间码 | 每拍 `0:00–0:01` 到 `0:14–0:15` 的锚点 | "0:00–0:01: ..." |
| 机位链 | 焦距 + 机位 + 运动轨迹 | "18mm low-angle water-level tracking behind the boat, then tilting up to the sky" |
| 声锚 | 每阶段 diegetic 声音 | "0:00–0:03: oar 80Hz, water 200Hz, distant dog bark" |
| 微动节拍 | 具体身体动作 + 惯性/延迟 | "0:07–0:08: her fingers freeze 0.5s above the strings, then take a deep breath" |
| 光相位 | 每阶段色温 + 光向 + 质感 | "0:00–0:03: 3200K dusk mist, lanterns 2200K, water dark green" |
| 材质宪法 | 全片统一材质语法 + 禁止清单 | "wet-black ink-wash tiles, oxidized steel, organic flowing gold; no plastic metal, no anime faces" |
| 开场↔终场对照 | 首秒 vs 末秒的视觉差异 | "opening: she looks down at water; ending: she stands looking levelly forward" |

**拍数对齐铁则（2026-08-15 新增）：** 拍数 = `model_clip_budget_s` 实际秒数，不是固定 15。Seedance 默认 10s → 10 拍；H3 15s → 15 拍。禁止给 10s 切片写满 15 拍（短时长塞超量节拍 → 节奏崩溃）。

**Seedance + 参考视频例外（2026-08-15 新增）：** by_tool.seedance 走参考视频（`@视频1 用于动作/运镜`）时，Seedance 官方原则"只需说明继承哪些，不必逐动作复述"——此时拍数减负：只写 delta（本镜与参考视频的差异 + 关键瞬间），不全塞 N 拍。参考视频已准确给动作时，逐拍复述反而和素材冲突。

### 6.2 双档输出

| 产物 | 用途 | 规则 |
|---|---|---|
| `prompts.primary` | 默认提交稿 | **完整，不蒸发** |
| `prompts.compact_emergency` | 模型明确报长度限制时 | 按优先级压缩：① 砍影视参数肥料块 → ② 砍重复材质词（保留首次）→ ③ 砍声锚 Hz 数值 → ④ 仍不能砍时间码/机位链/微动节拍/光相位/材质宪法 |

### 6.3 提交 diff 审计新增项

```text
□ 15 拍时间码全部在 prompt 中可定位
□ 机位链（焦距+机位+运动）连续出现，无断点
□ 声锚/diegetic audio 至少出现 3 处以上
□ 微动节拍（停顿/呼吸/惯性）至少出现 2 处
□ 光相位（色温/光向）至少出现 3 阶段
□ 材质宪法首句 + 禁止清单完整
□ 开场↔终场对照 explicit
任一 ✗ → 拦截，回规划产物重取完整版
```

## B · MultiShot-in-one

- 同次 2–3 真切；**同一 lock 前缀**  
- 标签 `Shot N:`  
- **禁止**「一镜到底」  
- shotlist：每 Shot 一行  

## C · NextShot Chain

**规则与 FirstShot 全链一致（2026-08-09 对齐）**：除「场景/舞台变换」是唯一合法 Delta 外，材质宪法/人物锁/光相位/声锚全部字符级继承，且每镜独立跑 诊断 Pass → 完整性铁律 → 出稿前逻辑审核（七维：六维+一次看懂） → 生成策略确认 → 执行度对账，一项不减。

每镜：

1. **Delta intake**（≤2 轮）：场景变换点 + 本镜关键瞬间
2. 焊接 lock：`copy(lock) + legal_delta(场景) + action`；锁定域字符级一致，新场景 full_text
3. **出稿前逻辑审核**（`pre-submit-logic-audit.md` 七维：六维+一次看懂，FAIL 禁提交——新场景尤其查空间拓扑/物理尺度）
4. 尾帧静帧 prompt（图模 / MJ still）
5. 视频运动 prompt（视频模）
6. 更新 shotlist（成片尺连续；注明 clip 序号）
7. 生成策略确认：上镜尾帧 = 本镜首帧 + 成本明示
8. **每镜跑完强制「执行度对账」**（`post-shot-review.md`）
9. diff 闸门：LOCK 与上一镜不等 → BLOCK

- 上镜尾帧 → 本镜 start 锚
- identity 定期 re-anchor  

## full / compact / chain

| | full | compact |
|--|------|---------|
| 保留 | 全 lock + 全 beats + overview + shotlist | 硬锁 + 主 beat + overview 关键 + shotlist 缩行 |
| 可砍 | 次要修辞 | 诗性环境句 |

## by_tool 轻适配要点

| target | 要点 |
|--------|------|
| generic | 完整中文主契约 |
| seedance | **默认 10s**（甜区 5-10s，15s 上限边缘易漂）；运镜强度节制（剧烈运动敏感）；**FLF 首尾帧链优先于单条长生成**；@人物/@环境 参考图角色分离 |
| kling / 可灵 / 即梦 | 动作具体、运镜单主、时长秒、参考图角色分开写 |
| midjourney_still | 单帧可绘；`--ar`；少视频动词堆砌 |
| cogvideox | 主体+动作+场景+镜头运动+风格+画质 |
| sd_still | 正向主描述 + 负向包分离 |

## 惊艳四件套的 by_tool 映射

| 模型 | 真声轨 | 首尾帧 | 多参考图 | 编译写法 |
|------|--------|--------|----------|----------|
| MiniMax-H3 | ✅ native | ✅ 可单独 | ✅ ≤9 张（互斥首尾帧） | 三幕声场进 prompt；`--first-frame` 或 `--image @人物/@环境` 二选一 |
| Kling 3.0 | ✅ native | ✅ 首帧+元素参考并存 | ✅（强于 H3） | `--first-frame` + `@Element` |
| Kling 2.x / Seedance | ❌ | 部分 | ✅ | 真声轨退文字锚 + 标注「需宿主配音」 |
| Veo / Runway | 视版本 | 视版本 | ✅ | 按官方能力降级 |

铁律：`native-audio.md` · `frame-reference-contract.md` · `micro-motion.md` · `light-phase.md` 四段按模型能力启用，能力缺失即降级，不伪造能力。

## Seedance 原生语法适配（2026-08-15 新增 · by_tool.seedance 专属）

> Seedance 2.0+ 有原生符号与语法，自然语言描述会被忽略。by_tool.seedance 编译时必须转成原生语法。

### 符号映射（声音 → Seedance 符号）

| 内容 | Seedance 符号 | PerfectVideo 来源 | 编译写法 |
|---|---|---|---|
| 音乐 | `()` | native-audio 非声场轨 | `(背景播放舒缓节奏的钢琴乐)` |
| 音效 | `<>` | diegetic audio anchors | `<远处传来钟声>` |
| 台词 | `{}` | VO 对白（path.vo） | `{你好，欢迎回来}` |
| 字幕 | `【】` | subtitles | `【第一章：启程】` |

**台词语言控制**（Seedance 原生公式）：`台词语言 + 地区变体/口音 + 表达方式 + 说话人 + {台词内容}`
- 例：`台词语言：美式英语。女孩用自然口语化的美式英语说：{I thought you weren't coming.}`
- 声音控制：`无背景音乐，只保留人物对白、环境声和动作音效。不要字幕。`

### 时长/画幅移出 prompt

Seedance 官方明确：**分辨率、时长不写进提示词，在生成页面/接口设置**。by_tool.seedance 编译时：
- `15 seconds, 16:9` 等参数 → 移到接口参数段（`--duration` / `--aspect`），不进 prompt 文本
- prompt 只留主体/动作/场景/运镜/声音/风格

### 参考视频继承

用参考视频时，Seedance 官方原则"只需说明继承哪些，不必逐动作复述"——与完整性铁律的冲突见 §6.1 拍数对齐铁则的例外条。

## 中英

- 默认 `lang_zh`  
- `lang_en`：用户要求 / MJ / 英文模 → 必须；可与 zh 对照附录  

## 与旁白

- path.vo：画面 prompt **不**把整段旁白塞进视觉描述（防画面烧字混乱）；旁白走独立轨  
- 需要烧字幕时在 subtitles 声明，不在 visual 里默认大字报  
