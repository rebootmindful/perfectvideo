# 输出契约（艺术导演）

每次完整交付至少包含下列块。顺序建议如下。

## 0. 素材准备清单（必须 · 最先给）

生成前告诉用户准备什么（有 @槽位时）：见 `references/asset-checklist.md`。

```text
【素材准备清单】
□ @人物 1 张：{描述}
□ @环境 1 张：{描述}（画幅对齐 {aspect}）
□ 首帧 1 张（NextShot 链）：上一镜尾帧
□ 无素材？→ 纯文生降级（连戏靠文字锁）
```

## 1. video_overview（必须）

```yaml
title: 
platform: douyin|kuaishou|shipinhao|bilibili|youtube|generic
aspect_ratio: "9:16"|"16:9"|"1:1"|"21:9"
model_clip_budget_s: 15
target_edit_duration_s: 
style: 
audience: 
path: visual|vo
no_cta: true
compile_plan: single|single_pass|multishot|nextshot_chain
```

## 2. 意图诊断（必须，可短）

情绪核心 / 视觉核心 / 结构 / 取舍（**不写**钩子策略）。

## 3. Visual Bible / Lock（必须）

冻结后的焊接文本块或结构化字段（见 schema）。

## 4. shotlist（必须）

| id | t_in | t_out | purpose | visual | camera | diegetic_audio | vo | subtitle | risk |
|----|------|-------|---------|--------|--------|----------------|----|----------|------|

- A 模式：相位行（如 0:00–0:03 …）  
- 时间码单位秒；可加总校验  
- path.visual：vo/subtitle 列填 `N/A`  

## 5. prompts（必须 primary）

### prompts.primary（generic 中文主契约）

**铁律（2026-08-07 实测）：prompts.primary 必须自包含——锁定域全文直接展开，禁止「粘贴 §3 全文」类占位符。用户要能整块复制直贴模型。**

推荐章节序（可合同压缩，不可缺硬锁）：

1. 锁定域全文  
2. 世界/材质（若未全进 lock 则重复要点）  
3. 舞台/构图  
4. 时间码动作 / Shot N  
5. morph / 环境运动（若有）  
6. 运镜合同（基础+签名 / 多段序列）  
7. **光相位**（base→variation→resolve）  
8. **真声轨**（native 三幕，H3/Kling3）或 diegetic 文字锚（老模型）  
9. **微动节拍**（每拍 ≤1 事件）  
10. 节奏与禁止项  
11. tech（可降权）  
12. negatives  

**惊艳四件套：** native-audio / frame-reference / micro-motion / light-phase 四段，按模型能力与题材启用；  
**首尾帧/参考图方案**在 by_tool 声明（`--first-frame` / `@人物 @环境`）。

**诚实声明：** generic 可人工粘贴多数视频模；非通用最优保证。

### prompts.single_pass（A0 单次全量编译 · 用户要求"一次过生成"时必出）

> 编译模式：A0 · SinglePass（见 `compile-modes.md` §A0）
> 规则：从 shotlist 逐字提取 → 按时间线编织成连贯叙事 → 7 维信息无损（时间码/机位链/声锚/微动/光相位/材质宪法/开场终场对照）
> 语言：与 md 文件一致，不擅自切换
> 落盘：`outputs/*_single_pass.txt`，提交时读文件，不在命令行现场写

结构：材质宪法压缩 + @槽位绑定 → 时间线叙事（每拍 1-2 句，嵌入 rack focus/光相位/声锚/VFX 微细节）→ 尾部全局参数（速度弧线/光相位/开场终场对照）

### prompts.by_tool[]（可选）

```yaml
- target: seedance|kling|midjourney_still|cogvideox|sd_still|...
  status: ready|pending
  text: |
```

### prompts.lang_en（按需）

MJ / 英文模 / 用户要求时必须。

## 6. voiceover / subtitles

| path | 要求 |
|------|------|
| visual | 两节均输出 `N/A` |
| vo | 必须有；情绪/节奏标签；**禁止 CTA/钩子句** |

用户自带文案：`source: user_mounted`，只对齐时间，不改写营销化。

## 7. QC 报告（必须）

画面闸门 + 脚本层闸门（见 `boundaries-and-qc.md`）。  
含：是否无 CTA 扫描通过。

## 8. footer（必须）

```text
请发布前自行复核：事实准确性、广告合规、肖像与音乐版权、平台敏感词。
本 skill 不生成增长钩子/完播 CTA；不替代法律与平台审核。
```

## 明确不交付

- 钩子 / 三段式完播文案 / 关注点赞逼单  
- 已渲染 MP4（除非宿主另接执行链）  
