# 编译模式 · 多工具 · 诚实保证

## 保证边界（P0）

| 保证 | 不保证 |
|------|--------|
| `prompts.primary` generic 中文结构完整、含硬锁 | 一键 100% 贴合任意厂商隐式最优 |
| 合同合法（A/B/C 不混） | 未声明 target 的 by_tool 已写好 |
| shotlist + overview 与 prompt 时长/画幅一致 | 已渲染成片 |

未实现的适配器：`status: pending` + 仍给 generic。

## A · Single15

- 条件：`target_edit_duration_s <= model_clip_budget_s`，一事一空间  
- 结构：lock + 世界/材质要点 + 相位时间轴 + 运镜 + 光 + diegetic_audio +（可选 VO 对齐）+ 节奏/负面  
- 合同：`single continuous take, no cuts`  
- shotlist：相位行  
- **禁止** `Shot 1:` 真切标签  

## B · MultiShot-in-one

- 同次 2–3 真切；**同一 lock 前缀**  
- 标签 `Shot N:`  
- **禁止**「一镜到底」  
- shotlist：每 Shot 一行  

## C · NextShot Chain

每镜：

1. 尾帧静帧 prompt（图模 / MJ still）  
2. 视频运动 prompt（视频模）  
3. 更新 shotlist（成片尺连续；注明 clip 序号）  

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
| seedance / kling / 可灵 / 即梦 | 动作具体、运镜单主、时长秒、参考图角色分开写 |
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

## 中英

- 默认 `lang_zh`  
- `lang_en`：用户要求 / MJ / 英文模 → 必须；可与 zh 对照附录  

## 与旁白

- path.vo：画面 prompt **不**把整段旁白塞进视觉描述（防画面烧字混乱）；旁白走独立轨  
- 需要烧字幕时在 subtitles 声明，不在 visual 里默认大字报  
