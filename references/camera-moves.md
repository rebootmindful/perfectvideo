# 运镜语言库（Camera Moves · 惊艳选择器）

> 用途：U6「镜头怎么动」的选项来源；编译时把签名运镜转成**可直贴模型的物理短语**。  
> 铁律：**单主运镜不破**——惊艳 = **1 个基础运镜 + 1 个签名运镜**（metricsmule 黄金规则），**不是**叠三条（模型预算会炸）。  
> 与预算联动：`motion` 主花销 → 可上强签名；`identity`/`scene_density` → 默认克制档（下方标 ⚠️ 的慎选）。  
> 来源：research/07-camera-moves-benchmark.md（Atlabs / vidau / cliptrend / kling3 / metricsmule / beverlyboy 对标）。

---

## 0. 三档运镜意图（U6 交互主选项）

| 档位 | 描述 | 适合 | 预算要求 |
|------|------|------|----------|
| **A 克制** | 固定 / 极缓推 / 微跟 | 庄严·纪实·产品稳定 | 任意 |
| **B 电影感** | 缓推+轻环绕+跟随+落幅 | 叙事·情绪·常规剧情 | motion 或 scene_density |
| **C 签名惊艳** | **1 基础 + 1 签名**（§2+§3 组合） | 奇观·MV·广告·神域 | **motion 主花销**（或轻量版） |

> U6 默认给三档 + 每档 2–4 个代表选项；用户选 C 时再给签名清单。

---

## 1. 基础运镜 + 增强手法（Foundational · 负责「执行可靠」）

| 基运镜 | 物理短语（可直贴） | 增强手法 |
|--------|---------------------|----------|
| 固定 | `static camera, no movement` | 前景入画出画 / 环境自运动 |
| 缓推 | `slow push-in toward {subject}` | 慢到「感觉不到推」 |
| 跟随 | `camera tracks alongside {subject}` | 地面速度一致 / 微领先半身 |
| 横移 | `lateral tracking, {subject} slides across frame` | 前景柱子/纱帘掠过（空间感倍增） |
| 环绕 | `camera orbits {subject}, {deg}° arc` | 45° 轻绕（电影感）/ 180°+ 环绕（惊艳） |
| 升降 | `camera rises {m} from {height} to {height}` | 从平视升到俯瞰（权力/神性） |
| 摇 | `pan from {A} to {B}` | 甩摇 whip pan 只在快节奏 |
| 手持 | `handheld, slight breathing motion` | 克制版：1–2cm 呼吸；剧烈版 ⚠️ |

**增强手法（加到任意基础运镜上，低成本提惊艳）：**

| 手法 | 物理短语 | 效果 |
|------|----------|------|
| 前景穿梭 | `camera passes behind {foreground}, revealing {subject}` | 纵深爆发 |
| 前景掠框 | `{silken/column/foliage} sweeps across foreground` | 空间流动感 |
| 推拉变焦 | `dolly in while zoom out, background stretches`（希区柯克） | 眩晕/压迫 |
| 相位停 | `camera holds still for {n}s, only {environment} moves` | 呼吸留白 |
| 落幅抬升 | `ending frame tilts up to reveal {sky/structure}` | 神性结尾 |
| **焦点引导** | `rack focus from {near} to {far}, attention shifts` | 低预算高质感（cliptrend 推荐） |

---

## 2. 黄金组合规则（★ 本版新增 · metricsmule）

> **每一镜 = 1 基础 + 1 签名。** 基础保证执行，签名负责惊艳。

```text
【运镜】单主运镜：{基础} + {签名}；
{基础物理短语}，然后 {签名物理短语}；
度数/高度/次数写死；15s 内 1 次完整路径。
```

合法组合示例：
- `slow dolly in` + `slow cinematic arc reveal`（叙事入场）
- `static` + `bullets-time orbit`（神域凝固瞬间）
- `lateral tracking` + `whip pan into subject`（动感转场）
- `crane up` + `top-down slow twist`（神性结尾）

**禁止**：2 个签名叠加（dolly zoom + bullet time 同镜 = 灾难）。

---

## 3. 签名惊艳运镜（Signature · WOW · 25 条）

> 每条含：**物理短语模板**（直贴 prompt）、**运动预览**（ASCII 路径图，直观看到镜头怎么走）、预算偏置、适合题材、冲突。  
> 借鉴：video-shotcraft 的 106 卡 + 161 运动预览；我们做「可直贴 + 可预览」双语。

### 预览图例

```text
俯视（顶视平面）：  ○=主体   ▲=镜头起点   →=镜头路径   ⊙=落幅位置
侧视（立面）：      ═地面   │=镜头高度   ⤴/⤵=升降
```

### C1 · 螺旋升巡（神域/奇观）
```text
camera starts at {low, side} view, slowly spirals up {m} while orbiting {deg}°
around {subject}, ending in high-angle {overview}, foreground {mist/columns} streaming past
```
**预览：**
```text
俯视：   ▲→→→→→⊙   （绕 ○ 一圈半，落幅转高处）
         ○
侧视：   ⤴⤴⤴ ══════   （低机位→升到俯瞰）
```
- 预算：motion（高）· 适合：奇观/神域/宏大 · 冲突：小津固定
- 月檐阙可直接用：`螺旋上升 1.5m + 环绕 180° + 落幅俯瞰 + 云海/飞檐前景掠过`

### C2 · 推拉变焦压迫（紧张/凝视 · 希区柯克 Vertigo）
```text
camera dollies toward {subject} while lens counter-zooms,
background compresses, {subject} scale holds, one continuous take
```
**预览：**
```text
侧视：  ▲────→ ○   （镜头前推，焦距反拉，背景拉伸主体不变）
```
- 预算：motion · 适合：对峙/悬念/入侵感 · 注意：负面包加「no lens distortion jump」

### C3 · 前景穿梭揭示（叙事反转/入境）
```text
camera glides behind {foreground layer}, {subject} hidden then revealed
as {foreground} parts, depth separates layers
```
**预览：**
```text
俯视：  ▲→∥→ ○     （∥=前景幕，镜头穿过后露出 ○）
```
- 预算：motion 或 scene_density · 适合：入戏/揭幕/广告产品

### C4 · 环景升降 + 顶视慢旋（上帝视角）
```text
camera ascends {m} from eye-level to {overhead}, world expands,
then rotates slowly {deg}° while looking straight down, {subject} shrinks into scale
```
**预览：**
```text
侧视：  ▲─╱       俯视（落幅）： ○ 中心，镜头绕 ○ 慢旋
        ╱
       ╱══════
```
- 预算：motion · 适合：世界展示/孤寂感放大/结尾

### C5 · 悬浮漂移（梦境/水墨）
```text
camera drifts weightlessly, no ground reference,
slight floating bobbing, {environment} flows around {subject}
```
**预览：**
```text
侧视：  ~ ~ ~ ○ ~ ~ ~   （无地面参考，漂浮摆动）
```
- 预算：scene_density · 适合：梦境/神域/抽象 · 慎用：写实叙事

### C6 · 一镜穿越（空间连续 · Through-Object）
```text
camera travels through {opening} — {doorway/arch/cloud gap/wall},
passing {interior→exterior}, space unfolds continuously
```
**预览：**
```text
侧视：  ▲→[门]→ █→○    （穿过门洞/云隙进入新空间）
```
- 预算：motion（高）· 适合：进入新空间/转场 · 冲突：15s 内只可 1 次

### C7 · 慢升格抽帧（时间感/王家卫）
```text
slight step-printing, motion stutters at {n} fps feel,
{subject} moves in slow lingering beats, handheld breath
```
**预览：**
```text
时间轴： ●·●·●·●    （抽帧断续，像老胶片步进）
```
- 预算：identity/motion · 适合：情绪/回忆/霓虹 · 慎用：动作戏

### C8 · 环绕凝视 + 前景掠（广告/产品/神女）
```text
camera arcs {deg}° around {subject} at {height}, 
{foreground detail} passes close to lens between, focus stays on {subject}
```
**预览：**
```text
俯视：     ▲→
          ╱  ╲
         ○ ── ⊙   （绕 ○ 弧线 120°，前景掠过）
```
- 预算：motion · 适合：产品/人物展示 · 广告常用

### C9 · 子弹时间冻结环绕（Bullet Time）
```text
{subject} frozen in a moment, camera orbits {deg}° around them,
world stays suspended, time feels stopped, ultra smooth
```
**预览：**
```text
俯视：     ╭─▲─╮
          │  ○  │  （○ 冻结，镜头绕整圈，时间停）
          ╰───╯
```
- 预算：motion（高）· 适合：神域凝固/高潮定格/奇观 · 神女踏浪瞬间神器

### C10 · Snorricam 主观眩晕（主体锁死世界转）
```text
camera locked to {subject}'s body, world spins around them,
{environment} rotates while {subject} stays centered, disorienting
```
**预览：**
```text
俯视：  ○(固定)  ⤵环境绕转      （主体钉在画面中心，世界旋转）
```
- 预算：motion · 适合：梦境/醉酒/崩塌感 · ⚠️ 慎用（易晕），写实叙事禁

### C11 · Crash Zoom 急推（快节奏强调）
```text
fast crash zoom onto {detail/face}, sudden impact,
then settle on {subject}, punchy emphasis
```
**预览：**
```text
侧视：  ▲─⚡─→ ●   （突然急推怼脸/细节，停住）
```
- 预算：motion · 适合：惊悚/喜剧/动作节拍 · 注意：15s 内 1 次，做满不做多

### C12 · 焦点引导 Rack Focus（低预算高质感）
```text
rack focus from {foreground object} to {background subject},
attention shifts, depth separates, camera minimal
```
**预览：**
```text
对焦：  [前虚→后实]      （镜头不动，焦点从近物移到远主体）
```
- 预算：任意（最省）· 适合：叙事/产品/双主体切换 · 可与任意基础运镜叠加

### C13 · 速度斜坡 Speed Ramp（动作戏）
```text
speed ramps from {slow} to {fast} as {action} intensifies,
then snaps back to {slow} on {beat}, rhythmic energy
```
**预览：**
```text
速度：  ──╱╲──        （慢→快→骤停，节奏感）
```
- 预算：motion · 适合：动作/舞蹈/情绪爆发 · 慎用：庄严题材

### C14 · 甩摇转场 Whip Pan（★ 扩充 · 快节奏连接）
```text
fast whip pan from {A} to {B}, motion blur streaks,
land on {B}, energy transfer
```
**预览：**
```text
俯视：  ▲→(模糊甩)→○2   （A 甩到 B，运动模糊连接）
```
- 预算：motion · 适合：快节奏转场/双主体连接 · 注意：单次，勿连甩

### C15 · 第一人称 POV 走（★ 扩充 · 沉浸）
```text
first-person view, camera moves like {subject}'s eyes,
walking through {space}, head-level sway, immersive
```
**预览：**
```text
视角：  [POV]──→      （镜头=人物眼睛，平视走位）
```
- 预算：motion · 适合：探索/密室/代入感 · 慎用：庄严人物特写

### C16 · 过肩漂移 OTS（★ 扩充 · 对话/窥视）
```text
over-the-shoulder drift, camera mounted behind {subject A}
framing {subject B}, subtle forward push, intimacy
```
**预览：**
```text
构图：  A的肩─▲→ B      （肩后探出，轻推对 B）
```
- 预算：identity · 适合：对话/对峙/监视感 · 慎用：单人展示

### C17 · 低角英雄升（★ 扩充 · 权力感）
```text
low-angle hero rise, camera below {subject}, tilting up
as {subject} stands/rises, power grows, epic
```
**预览：**
```text
侧视：  ▲╱        （镜头贴地仰拍，随起身抬升）
       ○╱
```
- 预算：motion · 适合：登场/觉醒/威严 · 冲突：小津榻榻米

### C18 · 顶视天眼慢旋（★ 扩充 · 神性/操控）
```text
top-down god's eye, camera straight down over {scene},
slow twist {deg}°, patterns emerge, omniscient
```
**预览：**
```text
俯视：  ⤾ 慢旋俯瞰全场景   （正上方俯视，缓慢旋转）
```
- 预算：scene_density · 适合：布阵/仪式/操纵感 · 慎用：近景

### C19 · 水下/流体穿梭（★ 扩充 · 流动感）
```text
camera glides through {fluid/water/cloud}, bubbles/particles stream past,
weightless, {subject} emerges ahead
```
**预览：**
```text
侧视：  ▲≈≈≈→ ○    （穿过流体，粒子掠过，主体浮现）
```
- 预算：scene_density · 适合：水中/云中/梦境 · 慎用：硬质写实

### C20 · 微距推进（★ 扩充 · 细节暴力）
```text
macro push-in, extreme close-up on {detail},
surface texture fills frame, {subject} revealed at distance
```
**预览：**
```text
景深：  [纹路特写]──→[拉出主体]   （微距推入，再揭示全貌）
```
- 预算：identity · 适合：产品细节/眼神/材质 · 慎用：快节奏

### C21 · 环绕升落（★ 扩充 · 立体弧线）
```text
camera orbits {subject} while rising then descending,
vertical sine path around {subject}, 3D flow
```
**预览：**
```text
俯视：   ╭─▲─╮
        │  ○  │  （绕行 + 升落 = 三维正弦轨迹）
        ╰───╯
```
- 预算：motion（高）· 适合：纪念碑/雕像/高塔 · 冲突：手持

### C22 · 镜像/倒转漂移（★ 扩充 · 超现实）
```text
camera drifts across {reflective surface}, world mirrored,
perspective inverts briefly, surreal
```
**预览：**
```text
画面：  ▓▓▓▓▓   （掠过镜面，上下倒置一瞬）
        ○↕
```
- 预算：scene_density · 适合：水面/镜面/超现实 · ⚠️ 慎用（易出戏）

### C23 · 追尾跟拍（★ 扩充 · 旅程感）
```text
camera follows {subject} from behind at {distance},
steady tracking, environment passes, journey feel
```
**预览：**
```text
俯视：  ▲→→ ○   （跟在主体身后，稳定同速）
```
- 预算：motion · 适合：行走/追逐/旅程 · 慎用：静止主体

### C24 · 甩镜后拉（★ 扩充 · 出戏余韵）
```text
camera yanks back suddenly from {close detail},
revealing full {scene}, breath of space
```
**预览：**
```text
侧视：  ●─⚡─→▲▲▲   （贴脸瞬间猛拉远，空间炸开）
```
- 预算：motion · 适合：震惊揭示/段落收束 · 注意：单次

### C25 · 升降门框（★ 扩充 · 仪式感）
```text
camera rises through {doorway/arch frame},
frame gates the view, {subject} centered as camera clears
```
**预览：**
```text
侧视：  ══[框]══    （升过门框，框景渐开露出主体）
        ▲╱
```
- 预算：motion · 适合：仪式/入门/揭幕 · 慎用：低机位场景

---

## 4. 运镜 × 情感映射（★ 本版新增 · Atlabs）

> 用户说不出要什么运镜时，按情感反推：

| 情感 | 推荐运镜 |
|------|----------|
| 亲密 Intimacy | dolly in / tracking / 近距 orbit |
| 史诗 Epic | crane up / wide orbit / dolly out |
| 紧张 Tension | handheld / crash zoom / 推拉变焦 |
| 揭示 Reveal | tilt / crane up / dolly out / 前景穿梭 |
| 动作 Action | whip pan / POV / tracking |

---

## 5. 速度修饰词体系（★ 本版新增 · kling3 + Atlabs）

| 修饰 | 用法 | 例 |
|------|------|-----|
| `slow` | 默认抒情 | `slow push-in over 5 seconds` |
| `gentle` | 极柔 | `gentle tracking, barely moving` |
| `fast` | 动作/转场 | `fast crash zoom onto the eye` |
| `smooth` | 稳定 | `smooth orbit, no shake` |
| 秒数绑定 | 节奏 | `slow dolly in over 5 seconds` |

**禁止**：无速度词的 `camera moves`（模型不知道多快）。

---

## 6. 安全 / 危险组合表（★ 本版新增 · cliptrend）

| ✅ 安全组合 | ❌ 危险组合 |
|-------------|-------------|
| dolly push-in + 轻 tilt up | fast orbit + zoom + 主体转身 |
| locked-off + 主体动 | tracking + 背景变形 |
| slow zoom + 柔光动 | pan + tilt + dolly 同镜头 |
| 小 orbit + 无主体动 | handheld 怼脸/产品 |
| rack focus + 微推 | 360° orbit 用单张平面图 |

---

## 7. 编译规则（写入 prompt 的方式）

```text
【运镜】单主运镜：{基础} + {签名}；
{物理短语，度数/高度/秒数写死}；无摇镜/无环绕/无手持晃动（若签名不含）；
15s 内只执行一次完整路径；{控制词：slow/smooth/stable/keep unchanged}
```

- **运镜词放 prompt 开头或时间码首句**（模型对早期 token 权重更高 — Atlabs）
- 用 `starts / then / as` 串联（= 镜头内编辑点）
- 角度/高度/度数/秒数必须写死（`180°` `1.5m` `5 seconds`）
- 一个签名内**最多 1 次**完整路径；重复 = 预算浪费
- 控制词清单：`slow / smooth / gentle / subtle / locked-off / centered / stable / keep unchanged / end on a clean frame`
- 弱词必须配物理动作才有效：`cinematic / epic` 单独出现 = anti-slop

---

## 8. 与预算联动（QC 硬闸）

| 预算主花销 | 运镜上限 | 拦截 |
|-----------|----------|------|
| `motion` | C1-C13 任意 + 大师 | 无 |
| `scene_density` | A 克制 / B 电影感 / C3-C5 C9 轻量 | C1/C2/C6/C10/C11 全量 → 降级或提示 |
| `identity` | A / B / C12 | C 档其余 → 拦截「会抢人物细节，改 B 或调预算」 |

**QC 新增闸门：**「签名运镜是否写死度数/高度/次数」；「是否违反单主运镜」；「是否 2 签名叠加」；「C 档是否匹配 motion 预算」；「是否有无速度词的裸运镜词」。

---

## 9. 快速档位（不展开签名库时）

用户只说「要惊艳一点」→ 导演按题材+情感自动挑一个 C 档签名（奇观→C1、紧张→C2、产品→C8、凝固→C9），
锁定卡上展示一句「签名运镜：螺旋升巡 180°」让用户确认，不额外追问。

---

## 10. 真实感视角库（非电影感 · 抖音流量赛道 · 2026-08-15 新增）

> 用途：抖音/快手流量赛道的"伪纪录片/监控/偷拍"视角，与 §1-§3 电影感运镜平行。
> 调用条件：用户明示"要抖音爆款感 / 偷拍感 / 监控感 / found footage"，或题材选"荒诞/猎奇/伪纪实"赛道。
> 铁律不变：单主运镜；真实感视角 = 基础运镜 + 真实感增强，不叠签名运镜。

| 视角 | 物理短语（可直贴） | 适用场景 | 增强手法 |
|---|---|---|---|
| 手机偷拍 | `phone camera, vertical grip, slight hand tremor` | 街拍/偶遇/荒诞 | 竖画幅 9:16 + 偶发失焦 |
| 行车记录仪 | `dashcam footage, wide-angle distortion, timestamp overlay` | 路遇奇观/UFO/巨物 | 4:3 画幅 + 右下角时间戳 |
| CCTV 监控 | `CCTV security camera, top-angle, fixed, low-res, timestamp` | 监控灵异/无人场景 | 黑白/低帧率/扫描线噪点 |
| 无人机航拍 | `drone aerial shot, high altitude, slow descent` | 巨物/地形奇观 | 俯视比例反差 |
| 采访/直播 | `handheld interview cam, zoom breathing, autofocus hunting` | 伪采访/突发直播 | 偶发变焦拉风箱 |
| found footage | `shaky cam, VHS grain, date stamp, degraded tape` | 恐怖/悬疑/伪纪录片 | 信号干扰 + 画幅抖动 |

**真实感增强词清单**（加在 prompt 末尾，制造"非专业拍摄"质感）：
`amateur footage, vertical phone video, slight motion blur, imperfect framing, natural lighting, no color grading, timestamp: 2026-08-15 23:47, low-light noise`

**赛道速配**（抖音爆款逻辑 · 参考 wengzige 库）：
- 伪纪录片感 → CCTV 监控 / 行车记录仪
- 视觉反差 → 手机偷拍 + 巨物/超现实主体
- 土味赛博 → 无人机航拍 + 乡土场景 + 科技物
- 荒诞搞笑 → 采访/直播 + 反差台词

> ⚠️ 注意：真实感视角与 PerfectVideo 红线（禁 CTA/钩子/标题党）不冲突——视角是运镜选择，红线管的是内容欺诈。用真实感视角拍艺术短片完全合规；用它做"假装监控拍到大事件"的流量欺诈仍触红线。
