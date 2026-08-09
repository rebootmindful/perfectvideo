# 后台工作流 S0–S12（内部）

> **对用户不可见。** 用户只走 U0–U6 + 冻结，见 `user-facing-flow.md`。  
> 本文件供 agent 填槽与 QC，禁止按 S 序号逐步盘问用户。

## 总览

```
S0  Intent + Overview 草稿     ← U0 编译 + U1
S1  World Constitution         ← U2（与材质合并推断）
S2  Material Constitution      ← U2
S3  Cast + Identity            ← U3
S4  Stage / Blocking           ← U4
S5  Budget Allocation          ← 静默
S6  Mode A|B|C                 ← 静默（target>model → C）
S7  Timeline Beats → shotlist  ← U5 展开
S8  Morph / World Motion       ← 静默（题材需要时）
S9  Camera (+ 名家)            ← U6
S10 Light + diegetic + VO?     ← 静默光/声；U+ 若 vo
S11 Compile + QC + footer      ← U✅ 后立即
S12 NextShot loop              ← 成片后
```

## U → S 速查

| 用户步 | 内部 S |
|--------|--------|
| 开场预告 | — |
| U0 感觉+编译 | S0 部分 |
| U1 规格 | S0 overview |
| U2 材质世界 | S1+S2 |
| U3 人与物 | S3 |
| U4 舞台 | S4 |
| U5 时间轴 | S7（+S8） |
| U6 镜头 | S9 |
| U✅ 冻结 | 写 bible_version，触 S11 |
| U+ 旁白 | S10 vo/subs |
| （无 U） | S5 S6 S10 光声 S8 |

## S 段职责（内部）

### S0
从 U0/U1 写 overview：platform、aspect、双时长、path、style、audience、title 草案。  
禁止问钩子。

### S1–S2
world + material 硬锁；来自 U2 一选。

### S3–S4
cast/衣帽/道具归属；stage。来自 U3/U4。

### S5–S6
主花销唯一；mode。**永不单独成问。**

### S7–S8
beats 物理化；shotlist 时间码；morph 按需静默。

### S9–S10
运镜（`camera-moves.md`）；**惊艳四件套**（静默代填，不单独成问）：
- **真声轨**：native audio 模型（H3/Kling3）→ native_scene/event/emotion 三幕声场（`native-audio.md`）；老模型 → diegetic 文字锚
- **首尾帧/参考图**：按模型能力声明 frame_ref scheme（`frame-reference-contract.md`）；NextShot 链上镜尾帧 = 本镜首帧
- **微动节拍**：每拍 ≤1 事件型微动（`micro-motion.md`）
- **光相位**：base→variation→resolve 单向演进（`light-phase.md`）
- diegetic≥2；path.vo 时旁白字幕 + CTA 扫描。

### S11
交付：overview + bible + shotlist + primary + QC + footer。  
见 `output-contract.md`。

### S12
图片链检查（提示不阻塞）→ Delta（≤2 轮）→ 焊接 → 双产物 → diff。  
不重跑 U0–U6。

## 快速模式

用户一次给满 → 内部一次跑完 S0–S10 草案 → 只展示锁定卡（U✅）→ S11。

## 问数熔断

首片交付前，agent 累计「等待用户回答的提问轮」若将超过 **10**，必须停止追问，用合理默认出锁定卡并编译。
