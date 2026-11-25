# 校园首页 AI 重建图

工具：内置 image_gen（非 CLI）。
最终资产：src/experience/assets/jingshan-campus-ai-hd.png，1672 × 941，PNG。
参考图：src/experience/assets/jingshan-campus-panorama.jpg。

用途：依据真实学校照片重建更清晰的首页视觉，不作为建筑测绘或现场实拍证据。保留原参考图，网页注明 AI 重建。


实际文件核验：2,667,647 B，SHA-256 `d9096f96cc190b080a7e5b94fe8ec8f571dd20c9cfa64333f18d470c3bed6f01`。提示词中的 ideally 3840×2160 是生成目标，实际输出为 1672×941；不得标注为 4K、原生 3840×2160 或未编辑的现场实拍。网页全幅显示与图片文件分辨率是两件事。

## 最终提示词

Use case: precise-object-edit. Asset type: ultra-clear full-bleed 16:9 landscape website hero, ideally 3840x2160. Image 1 is the actual Beijing Jingshan School Jingxi Experimental School campus reference and the edit target. Create a very high-resolution photorealistic reconstruction of THIS EXACT photograph, improving fine texture detail and clarity, not redesigning the campus. Preserve the recognizable red brick school facade with its white square clock tower and dark pitched roof on the left, preserve the actual building massing, window rows and architectural proportions, blue running track, green striped football field with white goalposts, basketball foreground right, stepped grey stone courtyard foreground left, railing geometry, distant residential towers and green Beijing western mountains under natural light cloud/mist. Keep the same high viewpoint and orientation. Crisp, physically believable brick, window glass, metal rails, sports turf and paving; restrained natural color, professional architectural documentary photography, no exaggerated HDR, no artificial oversharpening halos. Lift exposure slightly to recover shadow detail while keeping natural overcast atmospheric light. Extend the framing subtly to 16:9 if necessary without adding buildings or changing the existing layout. No sci-fi architecture, no holograms, no invented school signs or text, no added people, no interface, no logos, no decorative borders. Prioritize fidelity to the reference and natural realism over invention. This is an AI reconstruction of an existing campus photograph.
