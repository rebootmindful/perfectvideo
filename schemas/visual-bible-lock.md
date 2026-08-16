# Schema · Visual Bible / Lock Pack / Script delivers

v0.3.0 — JSON 目标形态；本文为 agent 契约。

## Root

```yaml
bible_version: string
project_id: string?
video_overview:
  title: string
  platform: douyin|kuaishou|shipinhao|bilibili|youtube|generic
  aspect_ratio: string
  model_clip_budget_s: number
  target_edit_duration_s: number
  style: string
  audience: string
  path: visual|vo
  no_cta: true
  compile_plan: single|single_pass|multishot|nextshot_chain
mode_default: single15|single_pass|multi_clip|multishot|nextshot
budget_primary: identity|motion|scene_density
material:
  id: string?
  constitution: string
  forbidden: [string]
  morph_allowed: boolean
lock:
  characters: [Character]
  wardrobe: [WardrobeItem]
  character_props: [BoundProp]
  props: [Prop]
  spatial:
    full_text: string
    key_elements:
      - name: string
        anchor: boolean
  atmosphere: string
  imaging: string
  lighting: string
  color: string
  material: string
  aspect_ratio: string
world:
  summary: string
  elements: [string]
  laws: [string]
  environment_motion: string?
stage:
  composition: string
  blocking: [string]
diegetic_audio:
  anchors: [string]      # 文字锚（老模型）
  native_scene: [string] # 真声轨·基底（H3/Kling3）
  native_event: [string] # 真声轨·事件（单次，与节拍对齐）
  native_emotion: [string] # 真声轨·情绪（收尾声）
light_phase:
  base: string           # 基线光（0-1/3）
  variation: string      # 变奏光（1/3-2/3）
  resolve: string        # 落幅光（2/3-1）
micro_motion:
  beats:
    - t_in: string
      event: string      # 每拍 ≤1 事件型微动（物理化）
      kind: ordinary|morph
frame_ref:
  scheme: none|first_last|multi_ref
  first_frame: string?   # 上镜尾帧（NextShot）
  last_frame: string?
  ref_images:
    - role: character|prop|environment
      note: string
voiceover: [VoiceLine]   # empty if path=visual
subtitles: [SubtitleCue] # empty if path=visual
shotlist: [ShotlistRow]
negatives: [string]
history: [ShotRecord]
```

## VoiceLine

```yaml
t_in: string   # 0:00
t_out: string
text: string
emotion: string
rhythm: string
source: generated|user_mounted
# text must not contain CTA/hook formulas
```

## SubtitleCue

```yaml
t_in: string
t_out: string
text: string
```

## ShotlistRow

```yaml
id: string
t_in: string
t_out: string
purpose: string
visual: string
camera: string
diegetic_audio: string
vo: string        # or N/A
subtitle: string  # or N/A
risk: string?
clip_index: int?  # for chain
```

## Character / Wardrobe / BoundProp

同 v0.1：成年；帽独立 slot；道具 owner_character_id。

## ShotRecord（NextShot）

```yaml
shot_index: int
prompt_still: string?
prompt_video: string?
delta:
  scale: string?
  angle: string?
  move: string?
  action: string?
image_path: string?
director_id: string?
```

## Bridge · PerfectPhoto → PerfectVideo（注释级）

| Photo 域 | Video 域 |
|----------|----------|
| 人物锁定 | lock.characters + wardrobe |
| scene | lock.spatial.full_text |
| lighting/atmosphere/imaging | 同名字段 |
| 无 | material / timeline / diegetic / overview |

## Illegal

- 改写 lock 无 bible_update  
- same as previous  
- 混合同  
- target>model 仍 single 超长 prompt  
- voiceover 含 CTA/钩子  
