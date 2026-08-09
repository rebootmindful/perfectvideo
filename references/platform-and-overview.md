# 平台 · 概述 · 双时长

## 双时长（P0 铁律）

| 字段 | 含义 | 例 |
|------|------|-----|
| `model_clip_budget_s` | 单次生成模型硬上限 | 15 |
| `target_edit_duration_s` | 成片目标 | 45、180 |

规则：

- 两者 S0 必须落地（推断或一问）  
- `target > model` → `compile_plan: nextshot_chain`（模式 C），**禁止**单条超长提示词幻觉  
- shotlist 成片尺与 clip 尺可分注：`t_in_edit` / `t_in_clip`（P1 可选；P0 至少在 overview 声明 plan）  

## 平台默认

| platform | 默认 aspect | 成片时长意识 | 备注 |
|----------|-------------|--------------|------|
| douyin | 9:16 | 15–60s 常见 | 切片链 |
| kuaishou | 9:16 | 15–60s | 同左 |
| shipinhao | 9:16 或 16:9 | 30s–3min | 中长用 C |
| bilibili | 16:9 | 常 3min+ | 长链 |
| youtube | 16:9（Shorts 9:16） | 按栏目 | 长链 |
| generic | 用户选 | 用户选 | — |

## 画幅

- 写入 `video_overview.aspect_ratio` 与 `lock.aspect_ratio`  
- 跨镜不变；MJ still 侧映射 `--ar`（如 9:16 → `--ar 9:16`）  

## 调性（艺术向 · 非钩子）

只提示介质气质：诗意、纪实、奇观、产品审美、舞台感等。  
**禁止**写：黄金 3 秒留人、完播率话术、标题党公式。

## overview 与受众

`audience` 一句即可（如「东方奇观审美观众」「独立动画爱好者」），用于风格裁剪，**不是**投放获客文案。
