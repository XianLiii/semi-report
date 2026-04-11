
// ================================================================
// Semiconductor Weekly — W15
// Generated from data.mjs via generate-pdf-typst.mjs
// ================================================================

#set document(title: "MATCH Act 冲击波，设备股剧烈震荡")
#set page(
  paper: "a4",
  margin: (top: 22mm, bottom: 22mm, left: 22mm, right: 22mm),
  header: context {
    if counter(page).get().first() > 1 [
      #block(spacing: 0pt)[
        #set text(size: 6.5pt, fill: rgb("#999"), font: ("Helvetica Neue", "PingFang SC"))
        #grid(
          columns: (1fr, auto),
          align(left)[SEMICONDUCTOR WEEKLY],
          align(right)[2026.04.07 — 04.09]
        )
        #v(3pt)
        #line(length: 100%, stroke: 0.3pt + rgb("#141414"))
      ]
    ]
  },
  footer: context {
    if counter(page).get().first() > 1 [
      #block(spacing: 0pt)[
        #line(length: 100%, stroke: 0.3pt + rgb("#e0e0e0"))
        #v(3pt)
        #set text(size: 6.5pt, fill: rgb("#999"), font: ("Menlo", "Courier New"))
        #grid(
          columns: (1fr, auto),
          align(left)[Confidential],
          align(right)[#counter(page).display() / 12]
        )
      ]
    ]
  },
)

#set text(
  font: ("PingFang SC", "Helvetica Neue", "Arial"),
  size: 10pt,
  lang: "zh",
  fill: rgb("#333333"),
)
#set par(justify: false, leading: 0.7em)

// ---- Helper functions ----

#let sectionHead(num, titleCn, titleEn) = [
  #block(above: 0pt, below: 8pt)[
    #text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo")[#num]
    #v(2pt)
    #text(size: 18pt, weight: "bold", fill: rgb("#141414"))[#titleCn]
    #v(1pt)
    #text(size: 7pt, fill: rgb("#999"), font: "Menlo")[#upper(titleEn)]
  ]
]

#let srcLink(name, url: none) = {
  if url != none {
    box[
      #link(url)[
        #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#name]
      ]
    ]
  } else {
    box[
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#name]
    ]
  }
}

// Render a list of sources as a row of clickable links
#let srcList(sources) = {
  if sources == none or sources.len() == 0 {
    []
  } else {
    sources.map(s => srcLink(s.name, url: s.url)).join("  ")
  }
}

#let tag(label, bg: "#f5f5f3", color: "#666666") = {
  box(
    fill: rgb(bg),
    inset: (x: 4pt, y: 1.5pt),
    radius: 2pt,
  )[
    #text(size: 6.5pt, fill: rgb(color), font: "Menlo")[#label]
  ]
}

#let digestItem(num, tagLabel, content) = [
  #block(
    below: 5pt,
    stroke: (bottom: 0.3pt + rgb("#efefef")),
    inset: (bottom: 5pt),
  )[
    #grid(
      columns: (6mm, 16mm, 1fr),
      column-gutter: 3mm,
      align: (left + top, left + top, left + top),
      text(size: 7.5pt, fill: rgb("#999"), font: "Menlo")[#num],
      tag(tagLabel),
      text(size: 10pt, weight: "medium", fill: rgb("#1a1a1a"))[#content]
    )
  ]
]

#let stockCard(ticker, name, price, change, isUp, note) = {
  let changeColor = if isUp { "#16a34a" } else { "#dc2626" }
  let arrow = if isUp { "▲" } else { "▼" }
  box(
    stroke: 0.3pt + rgb("#e0e0e0"),
    inset: (x: 5mm, y: 4mm),
    width: 100%,
  )[
    #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#ticker] \
    #text(size: 8pt, weight: "medium", fill: rgb("#1a1a1a"))[#name] \
    #v(2mm)
    #text(size: 16pt, weight: "medium", fill: rgb("#141414"), font: "Menlo")[#price] \
    #v(1mm)
    #text(size: 8pt, fill: rgb(changeColor), font: "Menlo")[#arrow #change] \
    #v(1.5mm)
    #text(size: 7pt, fill: rgb("#999"))[#note]
  ]
}

#let companyBlock(name, ticker, events, highlight: none) = [
  #block(
    below: 6mm,
    stroke: (bottom: 0.3pt + rgb("#efefef")),
    inset: (bottom: 5mm),
  )[
    #grid(
      columns: (1fr, auto),
      text(size: 11pt, weight: "bold", fill: rgb("#141414"))[#name],
      text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#ticker]
    )
    #v(2mm)

    #if highlight != none [
      #block(
        fill: rgb("#fdf8f7"),
        stroke: (left: 2pt + rgb("#c0392b")),
        inset: (x: 3mm, y: 2mm),
        below: 3mm,
        width: 100%,
      )[
        #text(size: 9pt, weight: "medium", fill: rgb("#1a1a1a"))[#highlight]
      ]
    ]

    #for evt in events [
      #grid(
        columns: (12mm, 1fr),
        column-gutter: 3mm,
        align: (left + top, left + top),
        text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#evt.at(0)],
        text(size: 9pt, fill: rgb("#333"))[#evt.at(1)]
      )
      #v(1.5mm)
    ]
  ]
]

#let item(title, content) = [
  #block(
    below: 5mm,
    stroke: (bottom: 0.3pt + rgb("#efefef")),
    inset: (bottom: 4mm),
  )[
    #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[#title]
    #v(1.5mm)
    #text(size: 9pt, fill: rgb("#333"))[#content]
  ]
]

#let hlBox(label, content) = {
  block(
    fill: rgb("#f5f5f3"),
    stroke: (left: 2pt + rgb("#141414")),
    inset: (x: 5mm, y: 4mm),
    below: 4mm,
    width: 100%,
  )[
    #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#upper(label)]
    #v(1.5mm)
    #text(size: 9pt, fill: rgb("#333"))[#content]
  ]
}

// ==================== PAGE 1: COVER ====================
#block(spacing: 0pt, height: 100%)[
  // Top bar
  #grid(
    columns: (1fr, auto),
    text(size: 8pt, weight: "semibold", fill: rgb("#666"), tracking: 1.5pt)[SEMICONDUCTOR WEEKLY],
    align(right)[
      #text(size: 7.5pt, fill: rgb("#999"), font: "Menlo")[Vol.01 / No.15 \ 2026.04.07 — 04.09]
    ]
  )
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + rgb("#141414"))

  #v(1fr)

  // Middle
  #text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo", tracking: 1pt)[WEEKLY BRIEFING]
  #v(8mm)
  #text(size: 28pt, weight: "black", fill: rgb("#141414"))[MATCH Act 冲击波，\
设备股剧烈震荡]
  #v(10mm)
  #block(
    stroke: (left: 2pt + rgb("#e0e0e0")),
    inset: (left: 5mm),
    width: 130mm,
  )[
    #text(size: 11pt, weight: "light", fill: rgb("#666"))[美国国会推出新芯片设备出口管制法案，ASML 单日跌近 5%；AMAT 发布两款 GAA 2nm 沉积系统，股价反弹 8%；中国设备厂商在 SEMICON China 密集发布新品。]
  ]

  #v(1fr)

  #line(length: 100%, stroke: 0.3pt + rgb("#e0e0e0"))
  #v(4pt)
  #grid(
    columns: (1fr, auto),
    text(size: 7.5pt, fill: rgb("#999"))[半导体工艺装备行业追踪 \ 内部参考 · 每周一刊],
    box(
      stroke: 0.3pt + rgb("#e0e0e0"),
      inset: (x: 10pt, y: 4pt),
    )[
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo", tracking: 1pt)[CONFIDENTIAL]
    ]
  )
]

#pagebreak()

// ==================== PAGE 2: DIGEST + MARKET (merged) ====================
#sectionHead("01", "本周速览", "Weekly Digest")

#digestItem("01", "POLICY", [美国众议院推出 MATCH Act，拟封堵 ASML DUV 对华出口通道，ASML 单日跌 4.7% #link("https://www.bloomberg.com/news/articles/2026-04-02/us-lawmakers-propose-crackdown-on-sales-of-chip-tools-to-china")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Bloomberg]]])
#digestItem("02", "AMAT", [Applied Materials 发布两款面向 GAA 2nm 的沉积系统，股价当日涨 8% #link("https://www.stocktitan.net/news/AMAT/applied-materials-introduces-deposition-systems-for-angstrom-era-7v0938tplllx.html")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[StockTitan]]])
#digestItem("03", "SEMI", [SEMI 发布数据：2025 全球半导体设备销售 \$1,351 亿，预计 2027 年达 \$1,560 亿创新高 #link("https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SEMI]]])
#digestItem("04", "CHINA", [北方华创、中微公司在 SEMICON China 2026 密集发布新品，北方华创 2026 年订单目标 600 亿 #link("https://36kr.com/p/3739559184039940")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[36Kr]]])
#digestItem("05", "HIGH-NA", [Imec 接收 ASML EXE:5200 High-NA EUV 系统，预计 Q4 完成验证 #link("https://www.imec-int.com/en/press/imec-receives-worlds-most-advanced-high-na-euv-system")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Imec]]])

#v(6mm)

#sectionHead("02", "市场脉搏", "Market Pulse")

#block(
  fill: rgb("#f5f5f3"),
  stroke: (left: 2pt + rgb("#141414")),
  inset: (x: 5mm, y: 3mm),
  below: 4mm,
  width: 100%,
)[
  #grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    text(size: 9pt, fill: rgb("#666"))[*SOX* 费城半导体指数],
    [
      #text(size: 14pt, weight: "medium", fill: rgb("#141414"), font: "Menlo")[7,877] \
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[52W High: 8,498 · -7.3% off peak]
    ]
  )
]

#grid(
  columns: (1fr, 1fr),
  column-gutter: 3mm,
  row-gutter: 3mm,
  stockCard("AMAT", "Applied Materials", "$352.62", "+8.0% (Apr 8)", true, "GAA 新品发布提振"),
  stockCard("LRCX", "Lam Research", "$235.00", "+9.5% (Apr 8)", true, "YTD +37.6%，连续四季超预期"),
  stockCard("ASML", "ASML Holding", "$1,317", "-4.7% (Apr 7)", false, "MATCH Act 冲击，中国营收占 29%"),
  stockCard("KLAC", "KLA Corporation", "$1,661", "+7.4% (Apr 8)", true, "YTD +30.3%，$70 亿回购计划")
)

#pagebreak()

// ==================== PAGE 3: EQUIPMENT GIANTS (all 4 on one page) ====================
#sectionHead("03", "设备巨头动态", "Equipment Giants")


#companyBlock(
  "Applied Materials",
  "NASDAQ: AMAT",
  (
    ("Apr 8", [新品发布后股价当日大涨约 8%，市场反应积极 #link("https://seekingalpha.com/news/4573357-applied-materials-surges-as-it-unveils-new-chipmaking-systems")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SeekingAlpha]]]),
    ("Q1", [Q1 FY2026 EPS \$2.38（超预期 \$0.17），营收 \$70.1 亿 #link("https://www.trendforce.com/news/2026/02/13/news-applied-materials-guides-april-quarter-above-estimates-sees-20-semi-growth-in-2026-dram-leads/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[TrendForce]]]),
    ("展望", [管理层预计 2026 年半导体行业增长 20%+，DRAM 领涨]),
  ),
  highlight: [4 月 8 日发布 Precision Selective Nitride PECVD 和 Trillium ALD 两款沉积系统，面向 GAA 2nm 及以下节点的原子级精度制造。 #link("https://www.stocktitan.net/news/AMAT/applied-materials-introduces-deposition-systems-for-angstrom-era-7v0938tplllx.html")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[StockTitan]]]
)

#companyBlock(
  "Lam Research",
  "NASDAQ: LRCX",
  (
    ("Apr 7", [Morgan Stanley 上调目标价至 \$260 #link("https://finance.yahoo.com/markets/stocks/articles/dear-lam-research-investors-mark-154010553.html")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Yahoo Finance]]]),
    ("Apr 22", [即将发布 Q3 财报，关注 GAA 节奏及中国收入占比]),
  ),
  highlight: [连续四个季度超预期，Q2 FY2026 营收 \$53.4 亿（同比 +22%），Q3 指引 \$57 亿显示持续加速。 #link("https://www.zacks.com/commentary/2895120/bull-of-the-day-lam-research-lrcx")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Zacks]]]
)

#companyBlock(
  "ASML Holding",
  "EURONEXT: ASML",
  (
    ("订单", [SK Hynix 承诺 \$80 亿采购 ~30 台 EUV；Samsung 计划 \$40 亿采购 ~20 台 #link("https://247wallst.com/investing/2026/04/06/asml-revenue-is-about-to-explode-higher-again/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[24/7 Wall St]]]),
    ("High-NA", [首批商用 EXE:5200B 已交付 Intel，2026 预计出货 5-10 台 #link("https://www.tomshardware.com/tech-industry/semiconductors/intel-installs-industrys-first-commercial-high-na-euv-lithography-tool-asml-twinscan-exe-5200b-sets-the-stage-for-14a")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Tom's Hardware]]]),
    ("Apr 15", [Q1 财报发布 | 指引：2026 净销售额 340-390 亿欧元]),
  ),
  highlight: [MATCH Act 冲击下股价单日跌 4.7%，但随后因美伊停火反弹 6.35%。High-NA EUV 进入商用部署阶段。 #link("https://www.cnbc.com/2026/04/07/asml-shares-today-us-chip-export-curbs-china.html")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[CNBC]]]
)

#companyBlock(
  "Tokyo Electron / KLA",
  "TSE: 8035 / NASDAQ: KLAC",
  (
    ("TEL", [先进芯片设备占比提升至 40%，资本支出增 48% 至 2400 亿日元创新高 #link("https://www.trendforce.com/news/2026/01/09/news-tokyo-electron-reportedly-raises-fy26-capex-48-to-record-high-bets-on-dram-etching-demand/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[TrendForce]]]),
    ("KLA", [宣布 \$70 亿回购计划，连续第 17 年提高股息 #link("https://stockstory.org/us/stocks/nasdaq/klac/news/why-up-down/why-is-kla-corporation-klac-stock-soaring-today-3")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[StockStory]]]),
  ),
  highlight: none
)

#pagebreak()

// ==================== PAGE 5: CHINA ====================
#sectionHead("05", "中国半导体动态", "China Semiconductor")


#companyBlock(
  "北方华创",
  "002371.SZ",
  (
    ("新品", [12 英寸 NMC612H ICP 刻蚀、Qomola HPD30 混合键合、Ausip T830 TSV 电镀 #link("https://finance.sina.com.cn/stock/bxjj/2026-03-30/doc-inhsuknu9640085.shtml")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[新浪财经]]]),
    ("验证", [刻蚀设备已在 SMIC 7nm 产线测试 #link("https://www.scmp.com/tech/big-tech/article/3348044/chinas-top-chip-foundry-smic-unveils-action-plan-seizing-new-growth-opportunities")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SCMP]]]),
  ),
  highlight: [SEMICON China 2026 发布三款重磅设备，2026 年订单目标 600 亿元，有望跻身全球设备商前五。 #link("https://36kr.com/p/3739559184039940")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[36Kr]]]
)

#companyBlock(
  "中微公司",
  "688012.SH",
  (
    ("新品", [Primo Angnova ICP 刻蚀、Primo Domingo 高选择性刻蚀、Smart RF Match、Preciomo Udx Micro LED MOCVD #link("https://news.mydrivers.com/1/1111/1111592.htm")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[快科技]]]),
  ),
  highlight: none
)

#companyBlock(
  "新凯来",
  "深圳国资",
  (
    ("新品", [SEMICON China 发布 EPI、ALD、PVD、ETCH、CVD 五款设备，对标 5nm #link("https://caifuhao.eastmoney.com/news/20260324152840990924010")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[东方财富]]]),
  ),
  highlight: none
)

#companyBlock(
  "盛合晶微半导体",
  "IPO",
  (
    ("Apr 9", [科创板 IPO，发行价 19.68 元/股]),
  ),
  highlight: none
)

#hlBox("Policy & Outlook", [中国要求新建产能使用不低于 50% 国产设备，目标 2030 年半导体自给率达 80%（现约 33%）。SMIC 发布 2026 行动计划聚焦供应链本土化。2025 年中国 WFE 预计同比 -13%，2026 年回升 +5%。 #link("https://www.electronicsweekly.com/news/business/china-makes-new-plan-for-semiconductor-self-sufficiency-2026-03/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Electronics Weekly]]  #link("https://www.astutegroup.com/news/general/china-accelerates-semiconductor-self-sufficiency-with-mandatory-local-equipment-use/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Astute Group]]])

#pagebreak()

// ==================== PAGE: TECH FRONTIER + ACADEMIC (merged) ====================
#sectionHead("04", "前沿技术", "Tech Frontier")

#item([GAA 与背面供电进入量产倒计时], [TSMC N2P（2nm + 背面供电）计划 2026 下半年投产；A16（1.6nm + Super Power Rail）紧随其后。背面供电可降低电压降和供电噪声，但与 GAA 集成带来应力管理挑战。 #link("https://semiengineering.com/backside-power-delivery-nears-production/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SemiEngineering]]  #link("https://newsroom.lamresearch.com/transistor-channel-stress-backside-power-delivery-networks")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Lam Research]]])
#item([High-NA EUV 从研发走向量产], [Imec 接收 EXE:5200 系统（3 月 18 日），Q4 完成验证。Intel 安装商用 EXE:5200B 用于 14A 节点。2026 年预计交付 5-10 台，2028 年增至 20+ 台。 #link("https://www.imec-int.com/en/press/imec-receives-worlds-most-advanced-high-na-euv-system")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Imec]]  #link("https://research.ibm.com/blog/spie-2026-below-2-nm")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[IBM Research]]  #link("https://www.tomshardware.com/tech-industry/semiconductors/intel-installs-industrys-first-commercial-high-na-euv-lithography-tool-asml-twinscan-exe-5200b-sets-the-stage-for-14a")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Tom's Hardware]]])
#item([SEMI 全球设备支出展望], [300mm 设备支出预计 2026 年增长 18% 至 \$1,330 亿，2027 年增长 14% 至 \$1,510 亿。AI、先进逻辑、存储及先进封装为主要驱动力。 #link("https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SEMI]]])

#v(6mm)

#sectionHead("06", "学术研究", "Academic Research")

#item([Imec 120 层 Si/SiGe 外延堆叠突破 3D DRAM 瓶颈], [Imec 联合根特大学在 300mm 晶圆上成功堆叠 120 层交替 Si/SiGe 双层（共 241 子层），发表于 Journal of Applied Physics。 #link("https://www.tomshardware.com/tech-industry/next-generation-3d-dram-approaches-reality-as-scientists-achieve-120-layer-stack-using-advanced-deposition-techniques")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Tom's Hardware]]  #link("https://semiengineering.com/epitaxial-growth-of-up-to-120-si-sige-bilayers-in-view-of-3d-dram-applications-imec-ghent-univ/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SemiEngineering]]])
#item([Nature Electronics: 碳纳米管晶体管突破 1 THz], [基于对齐碳纳米管薄膜的 MOSFET 实现截止频率超 1 THz，栅极长度 80nm，载流子迁移率超 3,000 cm²/V·s。 #link("https://www.nature.com/articles/s41928-025-01463-6")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Nature Electronics]]])
#item([Imec + Diraq: 工厂制造硅量子比特达 99%+ 保真度], [在标准半导体产线上制造的硅量子比特一致性超过 99% 精度，发表于 Nature。 #link("https://www.nature.com/articles/s41586-025-09531-9")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Nature]]])
#item([CFET（互补 FET）路线图加速], [Imec 推进 CFET 单片集成与顺序集成方案。全芯片评估显示 CFET 相比 Nanosheet FET 可实现面积缩减 ~55%、功耗降低 ~29%。 #link("https://www.imec-int.com/en/articles/imec-puts-complementary-fet-cfet-logic-technology-roadmap")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Imec]]  #link("https://semiengineering.com/knowledge_centers/integrated-circuit/transistors/3d/cfet/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SemiEngineering]]])

#pagebreak()

// ==================== PAGE 9: AI & SMART ====================
#sectionHead("07", "AI 与智能化", "AI & Smart Manufacturing")

#item([Intel 将 AI 嵌入晶圆厂核心流程], [AI 缺陷检测精度已超人工检测员，NVIDIA NV-DINOv2 视觉模型达 98.5% die 级缺陷分类精度。先进逻辑晶圆厂每 1% 良率提升 ≈ \$1.5 亿利润。 #link("https://www.eetimes.com/from-defect-images-to-die-prediction-how-intel-is-scaling-ai-in-advanced-manufacturing/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[EE Times]]  #link("https://developer.nvidia.com/blog/optimizing-semiconductor-defect-classification-with-generative-ai-and-vision-foundation-models/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[NVIDIA]]])
#item([EDA 进入 Agent 时代], [Cadence 发布 ChipStack AI Agent（10x 生产力），Synopsys 推出 AgentEngineer。NVIDIA 投资 \$20 亿入股 Synopsys。新锐 Cognichip 融资 \$6,000 万。 #link("https://www.theregister.com/2026/02/10/cadences_agentic_chip_design_tool/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[The Register]]  #link("https://techcrunch.com/2026/04/01/cognichip-wants-ai-to-design-the-chips-that-power-ai-and-just-raised-60m-to-try/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[TechCrunch]]])
#item([AI 芯片新品密集发布], [Samsung 出货首批商用 HBM4（11.7 Gbps）；Microsoft Maia 200 推理加速器（TSMC 3nm）；韩国 Rebellions 完成 \$4 亿 Pre-IPO；华为 950PR 推理芯片获字节、阿里大单。 #link("https://news.samsung.com/global/samsung-ships-industry-first-commercial-hbm4-with-ultimate-performance-for-ai-computing")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Samsung]]  #link("https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Microsoft]]  #link("https://techcrunch.com/2026/03/30/ai-chip-startup-rebellions-raises-400-million-at-2-3b-valuation-in-pre-ipo-round/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[TechCrunch]]])
#item([RISC-V 进入量产汽车], [Bosch、Infineon、Nordic、NXP、Qualcomm 五家成立德国合资公司聚焦车规 RISC-V。零跑 LingXin01 SoC 用于 ADAS；长城紫荆 M100 MCU 已搭载新车型。 #link("https://www.eetimes.com/automotive-industry-charts-new-course-with-risc-v/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[EE Times]]  #link("https://www.yolegroup.com/strategy-insights/will-risc-v-reduce-auto-mcus-future-risk/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Yole Group]]])

#pagebreak()

// ==================== PAGE 10: DESIGN TRENDS ====================
#sectionHead("08", "产品与体验设计", "Product & Experience Design")

#item([Cadence ChipStack AI Super Agent：EDA 从菜单交互走向意图对话], [Cadence 发布 ChipStack AI Super Agent（2 月 10 日），让工程师用自然语言描述意图，由多智能体自动生成 RTL、测试平台和验证方案。早期客户 NVIDIA、Qualcomm、Altera、Tenstorrent 反馈生产力提升 10x。这是 EDA 工具 UX 从"工具操作"到"意图对话"的历史性转向。 #link("https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2026/cadence-unleashes-chipstack-ai-super-agent-pioneering-a-new.html")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Cadence]]  #link("https://www.eetimes.com/cadence-unveils-chipstack-ai-agent-for-agentic-chip-design-and-verification/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[EE Times]]])
#item([NVIDIA Vera Rubin：从芯片到机架的"极致协同设计"语言], [NVIDIA 在 CES 和 GTC 2026 发布 Vera Rubin 平台——6 颗芯片（Vera CPU、Rubin GPU、NVLink 6、ConnectX-9、BlueField-4、Spectrum-6）协同设计为一个统一的 AI 超级计算机机架，不再是独立芯片的简单组合。这标志着 AI 硬件发布的新视觉语言：整机架即产品。 #link("https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[NVIDIA]]  #link("https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[NVIDIA Dev Blog]]])
#item([Siemens Digital Twin Composer：HMI 从仪表盘走向可导航虚拟孪生], [Siemens 在 CES 2026 发布 Digital Twin Composer，基于 NVIDIA Omniverse 将 2D/3D 数字孪生数据与实时遥测统一到一个场景中。"一个模型贯穿设计、仿真、运行"的理念，把晶圆厂操作员 HMI 从平面仪表盘重塑为可导航的虚拟孪生空间。2026 年中上线 Siemens Xcelerator 市场。 #link("https://news.siemens.com/en-us/digital-twin-composer-ces-2026/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Siemens]]  #link("https://metrology.news/siemens-digital-twin-composer-brings-real-time-intelligence-to-the-factory-digital-twin/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Metrology News]]])
#item([Intel 18A 首秀：Core Ultra Series 3 的工业设计宣言], [Intel 在 CES 2026 发布首款 Intel 18A 量产消费平台 Core Ultra Series 3，把"美国制造"作为工业设计语言的核心叙事，将芯片封装与品牌视觉绑定到 CEO 林本坚领导下的 Intel Foundry 复兴故事。 #link("https://www.intc.com/news-events/press-releases/detail/1757/ces-2026-intel-core-ultra-series-3-debuts-as-first-built")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Intel]]])
#item([Agentic UX 进入半导体制造：工程师工作流的新底层], [NVIDIA 宣布与 TSMC、SK 海力士、三星、联发科等全球工业软件巨头合作，将 Agentic AI 嵌入设计、工程和制造软件。原本依赖人工操作的复杂工作流，正被长时间运行的 AI Agent 接管，半导体制造 UX 迎来新的交互底层。 #link("https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-and-Global-Industrial-Software-Giants-Bring-Design-Engineering-and-Manufacturing-Into-the-AI-Era/default.aspx")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[NVIDIA IR]]])

#pagebreak()

// ==================== PAGE 11: POLICY + LANDSCAPE ====================
#sectionHead("09", "政策与地缘", "Policy & Geopolitics")


#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #box(fill: rgb("#eff6ff"), inset: (x: 4pt, y: 1.5pt), radius: 2pt)[
    #text(size: 6pt, fill: rgb("#1e40af"), font: "Menlo", tracking: 0.3pt)[#upper("U.S. Congress")]
  ]
  #v(2mm)
  #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[MATCH Act：封堵 DUV 对华出口]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[4 月 2 日众议院推出 MATCH Act，目标收紧 ASML DUV 光刻机对华出口，施压荷兰、日本盟友全面对齐美国管制标准。JPMorgan 估计若实施，ASML EPS 可能下降 10%。 #link("https://www.bloomberg.com/news/articles/2026-04-02/us-lawmakers-propose-crackdown-on-sales-of-chip-tools-to-china")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Bloomberg]]  #link("https://seekingalpha.com/news/4573005-asml-other-semi-equipment-makers-dip-after-match-act-reaches-us-congress")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SeekingAlpha]]]
]

#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #box(fill: rgb("#eff6ff"), inset: (x: 4pt, y: 1.5pt), radius: 2pt)[
    #text(size: 6pt, fill: rgb("#1e40af"), font: "Menlo", tracking: 0.3pt)[#upper("U.S. Tariff")]
  ]
  #v(2mm)
  #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[Section 232 半导体关税生效]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[1 月 15 日起对特定先进芯片征收 25% 关税（涵盖 Nvidia H200、AMD MI325X 等），但豁免数据中心、研发等场景。7 月 1 日将评估是否扩大范围。 #link("https://www.whitecase.com/insight-alert/president-trump-orders-narrowly-targeted-25-section-232-tariff-certain-advanced")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[White & Case]]]
]

#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #box(fill: rgb("#eff6ff"), inset: (x: 4pt, y: 1.5pt), radius: 2pt)[
    #text(size: 6pt, fill: rgb("#1e40af"), font: "Menlo", tracking: 0.3pt)[#upper("CHIPS Act")]
  ]
  #v(2mm)
  #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[CHIPS Act 税收优惠面临到期]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[TSMC 宣布追加 \$1,000 亿美国投资。但 Section 48D 先进制造投资税收抵免将于 2026 年到期，续期前景不明。 #link("https://www.conference-board.org/research/ced-policy-backgrounders/the-future-of-the-CHIPS-and-Science-Act")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Conference Board]]  #link("https://www.manufacturingdive.com/news/chips-and-science-act-tracker-semiconductor-manufacturing/734039/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Manufacturing Dive]]]
]

#v(6mm)

#text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo")[10]
#v(1pt)
#text(size: 14pt, weight: "bold", fill: rgb("#141414"))[产业格局]
#v(1pt)
#text(size: 7pt, fill: rgb("#999"), font: "Menlo")[INDUSTRY LANDSCAPE]
#v(4mm)

#hlBox("Fab Expansion", [TSMC 亚利桑那规模扩大至最多 12 座晶圆厂 + 4 座先进封装厂；台湾同步推进 10 座新厂。全球 2025 年新开工 18 个晶圆厂项目（3 座 200mm + 15 座 300mm），美洲和日本各 4 个领跑。 #link("https://www.trendforce.com/news/2026/02/23/news-tsmc-speeds-up-expansion-in-taiwan-up-to-10-fabs-reportedly-under-construction-or-starting-in-2026/")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[TrendForce]]  #link("https://www.semi.org/en/semi-press-release/eighteen-new-semiconductor-fabs-to-start-construction-in-2025-semi-reports")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SEMI]]])

#pagebreak()

// ==================== PAGE 12: READING + CALENDAR ====================
#sectionHead("11", "值得一读", "Worth Reading")


#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #grid(
    columns: (10mm, 1fr),
    align: (left + top, left + top),
    text(size: 14pt, fill: rgb("#e0e0e0"), font: "Menlo")[01],
    [
      #link("https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027")[#text(size: 9pt, weight: "semibold", fill: rgb("#1a1a1a"))[SEMI: Global 300mm Fab Equipment Spending to Reach \$151B by 2027]] \
      #v(1mm)
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SEMI.org · Apr 8, 2026] \
      #v(1mm)
      #text(size: 8pt, fill: rgb("#666"))[SEMI 最新预测报告，详细拆解各地区、各环节设备投资趋势。]
    ]
  )
]

#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #grid(
    columns: (10mm, 1fr),
    align: (left + top, left + top),
    text(size: 14pt, fill: rgb("#e0e0e0"), font: "Menlo")[02],
    [
      #link("https://semiengineering.com/backside-power-delivery-nears-production/")[#text(size: 9pt, weight: "semibold", fill: rgb("#1a1a1a"))[Backside Power Delivery Nears Production]] \
      #v(1mm)
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[SemiEngineering · Mar 2026] \
      #v(1mm)
      #text(size: 8pt, fill: rgb("#666"))[深度解析背面供电技术的量产挑战，涵盖 TSMC、Intel、Samsung 的不同技术路线。]
    ]
  )
]

#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #grid(
    columns: (10mm, 1fr),
    align: (left + top, left + top),
    text(size: 14pt, fill: rgb("#e0e0e0"), font: "Menlo")[03],
    [
      #link("https://www.nature.com/articles/s41928-025-01463-6")[#text(size: 9pt, weight: "semibold", fill: rgb("#1a1a1a"))[THz Carbon Nanotube Transistors — Nature Electronics]] \
      #v(1mm)
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[Nature Electronics · 2026] \
      #v(1mm)
      #text(size: 8pt, fill: rgb("#666"))[碳纳米管 MOSFET 截止频率突破 1 THz，后硅时代高频器件里程碑。]
    ]
  )
]

#v(6mm)

#text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo")[12]
#v(1pt)
#text(size: 14pt, weight: "bold", fill: rgb("#141414"))[关键日程]
#v(1pt)
#text(size: 7pt, fill: rgb("#999"), font: "Menlo")[UPCOMING EVENTS]
#v(4mm)

#table(
  columns: (20mm, 1fr),
  inset: (x: 0mm, y: 2.5mm),
  stroke: (x, y) => (bottom: 0.3pt + rgb("#efefef"), right: if x == 0 { 0.3pt + rgb("#efefef") } else { none }),
  align: (left + horizon, left + horizon),
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Apr 15], text(size: 9pt, fill: rgb("#333"))[ASML Q1 2026 财报发布],
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Apr 22], text(size: 9pt, fill: rgb("#333"))[Lam Research Q3 FY2026 财报发布],
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Apr 22], text(size: 9pt, fill: rgb("#333"))[ASML 年度股东大会],
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Apr 24], text(size: 9pt, fill: rgb("#333"))[ASML 每股 2.70 欧元现金股息],
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Apr 29], text(size: 9pt, fill: rgb("#333"))[KLA Q3 FY2026 财报发布],
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Apr 30], text(size: 9pt, fill: rgb("#333"))[Tokyo Electron 全年财报发布],
  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[Jun 14], text(size: 9pt, fill: rgb("#333"))[VLSI Symposium 2026 檀香山]
)
