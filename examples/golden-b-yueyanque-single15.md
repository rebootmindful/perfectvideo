# 月檐阙 — AI 视频完整产物（快节奏多运镜版 v3 · 接续首帧版 · 可直接投喂模型）

> **模式：** Single15（A）· path.visual · 15s 一镜到底 · 16:9  
> **版本：** PerfectVideo 0.2.1 · bible 2026-08-07T09:02Z-v3 · 多段运镜序列 · **NextShot 接续首帧模式**  
> **用法：** 复制 §5「直接投喂区」整块；或按 §6 用 Seedance 版。  
> **本文件为运行时测试产物（golden-b v3 接续首帧版），非 SKILL.md。**  
> **v3 接续版变化：** P1 起始构图 = 旧视频最后一帧（神女侧面背影、廊柱框景、月在右、云海下方）；运镜序列承接老尾帧起飞，加速冲入推半身再拉远深俯瞰；**生成方式改为 MiniMax-H3 `first-frame` 首帧续接模式**（老尾帧作 `--first-frame`，无参考视频/音频）。

---

## 1. video_overview

| 字段 | 值 |
|------|-----|
| title | 月檐阙 |
| platform | generic（16:9，可切 bilibili/YT） |
| aspect_ratio | 16:9 |
| model_clip_budget_s | 15 |
| target_edit_duration_s | 15 |
| style | 唐风幻想 · 云上神域 · 电影级写实 |
| audience | 东方奇幻美学观众 |
| path | visual |
| no_cta | true |
| compile_plan | single |

---

## 2. 意图诊断

- 情绪核心：庄严 · 孤寂 · 神圣——宏大秩序下的微小驻足，但**视线被镜头牵着走**
- 视觉核心：矿物白×墨蓝×朱砂三色体系；超广角负空间；人殿比例悬殊
- 结构：**NextShot 接续**——从旧视频尾帧（侧面背影 + 廊柱框景）起飞，冲入读半身，再拉远深俯瞰
- 取舍：主花销 `motion`（运镜序列为绝对主角）；材质宪法保证奇观统一，人物保持微小
- 生成路径：MiniMax-H3 `--first-frame` 首帧续接模式（首帧 = 旧视频最后一帧）

---

## 3. Visual Bible / Lock（已冻结 · 跨镜焊接依据）

```text
【锁定域 · 禁止改写 · bible_version: 2026-08-07T08:58Z-v3】
人物：微小东亚成年女性，唐制素白长裙（矿物白基调，衣缘朱砂细纹克制），
      高髻，无帽饰，无手持道具；静立驻足于迎客松旁，目视远方，身体稳定。
人物道具：无（不持有任何物品）。
环境：云上神域——层叠宫阙悬于压缩云层；巨型云母石肋柱框景前景；
      重复长柱阵列通向消失点；朱红飞檐切入前景；巨月半隐上层神殿；
      云海切断所有路径；迎客松位于人物身侧近景。
      关键锚点（禁止摘要）：朱红飞檐、巨月、长柱阵列、云母石肋柱、迎客松。
材质宪法：电影级写实奇幻——真实石材/木构/丝绸与大气光学；
      矿物白为主，墨蓝层次，朱砂为唯一少量暖跳；
      纹饰简约克制，同一时空同一成像，无塑料感无动漫化。
氛围：庄严 · 孤寂 · 神圣；侧逆柔雾。
成像：16mm 极致超广角 · 超远景（可推至中景）· 偏轴低机位 · 强烈负空间 · 深景深。
光线基线：侧逆柔雾；天光冷白为主，巨月冷光为次，无直射硬光。
色彩：矿物白主 · 墨蓝次 · 朱砂唯一暖跳。
画幅：16:9
```

---

## 4. shotlist（多段运镜序列 · 每段单主运镜 · NextShot 接续首帧）

> **承接图景（P1 起始 = 旧视频最后一帧）：** 低机位偏轴侧后视 · 神女背影站在石栏边 · 朱红飞檐作顶、廊柱作左右框景 · 迎客松在右中景 · 巨月在右上层 · 云海切断宫殿 · 矿物白/朱砂廊柱与墨蓝云层对比。

| id | t_in | t_out | purpose | visual | camera（运镜序列 · 接续起飞） | diegetic_audio | vo | subtitle | risk |
|----|------|-------|---------|--------|---------------------------------|----------------|----|----------|------|
| P1 | 0:00 | 0:03 | 起飞·冲入 | 承接旧尾帧构图，镜头**快速推近**，神女背影变大 | **快速推近**（从接续画面起飞，飞檐掠过前景） | 风过松针骤强、白鹭已掠空远去 | N/A | N/A | 飞檐掠过勿糊成色块 |
| P2 | 0:03 | 0:06 | 绕·靠近 | 镜头**绕到人物侧面**（侧后视→侧面侧视） | **侧推 + 缓升** | 风渐强、云海涌动 | N/A | N/A | 绕到侧面勿穿模 |
| P3 | 0:06 | 0:09 | **近读** | **人物半身中景**（侧面视角），衣缘朱砂细纹、高髻、侧脸可见 | **快速推进至半身中景**（dolly in to waist-up） | 风声紧、衣袂飘动 | N/A | N/A | 半身时勿磨皮、勿改五官 |
| P4 | 0:09 | 0:12 | 拉远·再变 | 半身 → 拉远升起，巨月显、神殿轮廓浮现 | **快速拉远 + 上升**（pull back + crane up） | 远处檐铃一声、风渐弱 | N/A | N/A | 拉远时人物勿飘 |
| P5 | 0:12 | 0:15 | 俯瞰深化 | 升至**比接续帧更高的俯瞰**——巨月更近更大，云海更广，人物越显微小 | **高角俯瞰 + 缓停**（higher overview） | 云海声回、余韵 | N/A | N/A | 保持一镜无切；月勿爆白 |

时间码总和 = 15s ✅ · 运镜序列：接续起飞（冲入）→ 侧推 + 升 → **推半身** → 拉远升 → 高俯瞰深化，每段单主运镜 ✅

---

## 5. 直接投喂区（generic · 自包含完整版 · 接续首帧模式）

> 无占位符，整块复制即可。**生成方式：** MiniMax-H3 用 `--first-frame 旧尾帧.jpg` 续接（无参考视频/音频；首尾帧模式自动 adaptive aspect）。

```text
【锁定域 · 禁止改写】
人物：微小东亚成年女性，唐制素白长裙（矿物白基调，衣缘朱砂细纹克制），高髻，无帽饰，无手持道具；正面/侧面/背影各视角身份锁定一致（同一人物不同视角身份不漂）。
环境：云上神域——层叠宫阙悬于压缩云层；巨型云母石肋柱框景前景；重复长柱阵列通向消失点；朱红飞檐切入前景；巨月半隐上层神殿；云海切断所有路径；迎客松位于人物身侧近景。关键锚点：朱红飞檐、巨月、长柱阵列、云母石肋柱、迎客松。
材质宪法：电影级写实奇幻——真实石材/木构/丝绸与大气光学；矿物白为主，墨蓝层次，朱砂为唯一少量暖跳；纹饰简约克制，同一时空同一成像，无塑料感无动漫化。
氛围：庄严、孤寂、神圣；侧逆柔雾。
成像：16mm 极致超广角，超远景（允许推进至中景），偏轴低机位，强烈负空间，深景深。
光线基线：侧逆柔雾；天光冷白为主，巨月冷光为次，无直射硬光。
色彩：矿物白主、墨蓝次、朱砂唯一暖跳。画幅 16:9。

【合同】single continuous take, no cuts, 15 seconds, 16:9

【起始承接】首帧构图承接上一镜尾帧——低机位偏轴侧后视，神女背影站在石栏边，朱红飞檐作顶，廊柱作左右框景，迎客松右中景，巨月右上层，云海下层；从此构图起飞开始演化。

【时间码 · 一镜到底 · 多段运镜序列】
0:00-0:03 承接首帧构图起飞，镜头快速推近（dolly in），神女背影变大，朱红飞檐掠过前景；白鹭已掠空远去，风骤强。
0:03-0:06 镜头从神女侧后视绕到侧面视角（lateral push + 慢升），云海在建筑下方涌动，柱列透视强化。
0:06-0:09 镜头快速推进至人物半身中景：衣缘朱砂细纹、高髻、侧脸可见，人物目视前方不看镜头，衣袂在风中明显飘动。
0:09-0:12 镜头快速拉远同时升起（pull back + crane up），巨月自上层神殿云层后更显明亮，冷光增强，神殿轮廓浮现，人物重新变小。
0:12-0:15 镜头升至比承接帧更高的俯瞰高角（higher overview），环绕缓停，朱红飞檐与云海从前景掠过，巨月比承接帧更近更大，人物在巨大建筑尺度下越显微小，负空间留白收尾。

【运镜】单主运镜序列（每段只执行一个运镜，时序串联，不叠加）：
0-3s 快速推近（从接续构图起飞）；3-6s 侧推+缓升（绕到侧面）；6-9s 快速推进至半身中景；
9-12s 快速拉远+升起；12-15s 高角俯瞰+缓停。
16mm 极致超广角、超远景至中景、偏轴低机位、强烈负空间、深景深；
无摇镜、无手持晃动、无转场切点、无推拉变焦、无 2 签名叠加。

【光 · 相位推进】（E 光相位）
0-5s 基线：侧逆柔雾冷白天光为主，孤寂
5-10s 变奏：巨月冷光渐强，神圣降临
10-15s 落幅：朱砂暖点 + 月晕扩散，情绪升华
全程无硬闪、无跳变；光相位单向推进不回退。

【画面内声 · 真声轨】（C native audio · H3/Kling3）
基底：云海低频涌动、风过松针沙沙
事件：白鹭振翅一声（已远去，0-3s）· 衣袂翻飞一声（6-9s）· 远处檐铃金属清响（9-12s）
情绪：风渐弱、静默一拍、余韵

【微动节拍】（D · 每拍 ≤1 事件型）
0-3s 微动：云海涌动（持续，慢）
3-6s 微动：柱列间尘埃光尘漂移
6-9s 微动：衣袂翻起一次 + 发丝轻扬（事件型，单次）
9-12s 微动：云层裂开一道光（事件型，单次）
12-15s 微动：月晕呼吸（持续，慢）

【节奏】快慢交替：0-3s 接续起飞+冲入 / 3-6s 侧推+升 / 6-9s 近读半身 / 9-12s 拉远再变 / 12-15s 俯瞰深化收束；
每相位一个运镜事件 + 一个微动（事件型不叠加）；人物微动但全程保持朝圣感；无加速、无急停、无随机旋转、无材质闪烁。

【影视参数（可降权）】电影级写实，真实石材/木构/丝绸质感，大气光学，轻微胶片颗粒；ARRI 系超广角成像感（如平台不识别可删）。

【负面】二维动画、平面插画、动漫脸、塑料质感、蜡像皮肤、磨皮美颜、人物漂移、五官变化、服装变化、视角跳变（人物身份不变，视角可变）、穿模、材质边界、随机喷溅、快速旋转、能量爆闪、赛博机械乱入、霓虹灯、文字乱码、水印logo、镜头跳切、曝光闪烁、过曝、死黑、色彩溢出、字幕乱入、构图截头。
```

---

## 6. Seedance 版（by_tool 轻适配 · 备用）

> 差异：更强调运镜物理路径、15s 硬约束、参考图角色分离。若用首尾帧/参考图：`@人物` 与 `@环境` 分开传，勿混。

```text
15 seconds, single continuous take, 16:9, cinematic photorealistic fantasy.
A tiny East Asian woman in a restrained white Tang-style long dress (mineral white base, subtle cinnabar trim), hair in a high bun, stands still beside a gnarled pine, gazing into the distance.
She is small against a floating celestial palace complex suspended over compressed cloud layers: giant mica stone ribbed columns framing the foreground, repeated long columns receding to a vanishing point, a cinnabar-red eave cutting into the foreground frame, a huge pale moon half-hidden behind the upper temple, sea of clouds severing all paths.
Real stone, timber, silk, atmospheric optics; mineral white dominant, ink blue secondary, cinnabar as the only warm accent; restrained ornamentation; consistent photorealism, no plastic or anime look.
Side-back soft mist lighting; cold daylight key, cold moonlight secondary; no hard direct light.
16mm extreme wide angle, low off-axis angle, strong negative space, deep focus.
Camera sequence (one move per segment, chained in time, no stacking):
**First frame inherits previous shot's last frame** (low off-axis side-back view, woman standing at stone railing, cinnabar eave as top frame, mica stone columns left/right, pine right mid-ground, huge moon upper-right, sea of clouds below). Camera lifts off from this composition.
0-3s: fast dolly-in from inherited frame; cinnabar eave sweeps past foreground; wind surges; the egret has already flown past.
3-6s: lateral push + slow crane up, orbiting from side-back to side view of the woman; clouds churn below, column array deepens perspective.
6-9s: camera dollies in fast to a waist-up medium shot of the woman in side view; cinnabar trim on her dress and high bun visible; she keeps gazing away, dress hem stirs clearly in wind.
9-12s: camera pulls back fast while craning up; the huge moon emerges more brightly behind the upper temple, cold light intensifies, the woman shrinks back into scale.
12-15s: camera rises to a higher overview than the inherited frame, settles; cinnabar eave and sea of clouds sweep past foreground; the moon looks larger and closer than in the inherited frame; negative space closes the piece.
No pan, no handheld shake, no cuts, no dolly zoom, no stacked signature moves.
Sound: wind through pine needles; one egret wingbeat; distant wind chime; low cloud rumble.
Pacing: alternating fast and slow; still in the first 3s, approaching 3-6s, medium close 6-9s, pull-back reveal 9-12s, high-angle resolve 12-15s; only one camera event per phase; no speed bursts.
Negative: anime, plastic, wax skin, morphing features, cloth changes, text, watermark, lens jumps, flicker, overexposure, neon sci-fi, energy explosions.
```

---

## 7. voiceover / subtitles

**N/A**（path.visual）

---

## 8. QC 报告

| 闸门 | 结果 |
|------|------|
| Bible 冻结 + version（v3 · 接续首帧） | ✅ |
| **P1 起始构图 = 旧视频尾帧**（廊柱框景 / 神女背影 / 月在右） | ✅ |
| LOCK 全文展开无占位符 | ✅ |
| 合同合法（single，无 Shot 混写） | ✅ |
| 主花销唯一 motion | ✅ |
| 运镜：多段序列，**每段单主运镜**（无叠加、无 2 签名） | ✅ |
| 节奏加快：5 拍×3s，快慢交替 | ✅ |
| **P3 直推半身中景** + P4 再变化（拉远升） | ✅ |
| 写死：推进/拉远/升起各 1 次 | ✅ |
| 时间码与运镜分段对齐 | ✅ |
| 无危险组合（无 pan+tilt+dolly 同镜头） | ✅ |
| beats 密度合理 | ✅ |
| 帽饰/道具（无帽、无手持） | ✅ |
| 环境 anchors 保留 | ✅ |
| diegetic_audio 4 锚 | ✅ |
| negative 包 = 基础+奇幻 | ✅ |
| anti-slop / CTA 扫描 | ✅ |

---

## 9. footer

```text
请发布前自行复核：事实准确性、广告合规、肖像与音乐版权、平台敏感词。
本 skill 不生成增长钩子/完播 CTA；不替代法律与平台审核。
```
