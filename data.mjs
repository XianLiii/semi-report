// ============================================================
// 报告数据源 — 所有版本共用
// ============================================================

export const meta = {
  title: 'MATCH Act 冲击波，设备股剧烈震荡',
  subtitle: '美国国会推出新芯片设备出口管制法案，ASML 单日跌近 5%；AMAT 发布两款 GAA 2nm 沉积系统，股价反弹 8%；中国设备厂商在 SEMICON China 密集发布新品。',
  brand: 'Semiconductor Weekly',
  vol: 'Vol.01 / No.15',
  dateRange: '2026.04.07 — 04.09',
  confidential: 'Confidential',
};

export const digest = [
  {
    tag: 'POLICY',
    text: '美国众议院推出 MATCH Act，拟封堵 ASML DUV 对华出口通道，ASML 单日跌 4.7%',
    sources: [{ name: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2026-04-02/us-lawmakers-propose-crackdown-on-sales-of-chip-tools-to-china' }],
  },
  {
    tag: 'AMAT',
    text: 'Applied Materials 发布两款面向 GAA 2nm 的沉积系统，股价当日涨 8%',
    sources: [{ name: 'StockTitan', url: 'https://www.stocktitan.net/news/AMAT/applied-materials-introduces-deposition-systems-for-angstrom-era-7v0938tplllx.html' }],
  },
  {
    tag: 'SEMI',
    text: 'SEMI 发布数据：2025 全球半导体设备销售 $1,351 亿，预计 2027 年达 $1,560 亿创新高',
    sources: [{ name: 'SEMI', url: 'https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027' }],
  },
  {
    tag: 'CHINA',
    text: '北方华创、中微公司在 SEMICON China 2026 密集发布新品，北方华创 2026 年订单目标 600 亿',
    sources: [{ name: '36Kr', url: 'https://36kr.com/p/3739559184039940' }],
  },
  {
    tag: 'HIGH-NA',
    text: 'Imec 接收 ASML EXE:5200 High-NA EUV 系统，预计 Q4 完成验证',
    sources: [{ name: 'Imec', url: 'https://www.imec-int.com/en/press/imec-receives-worlds-most-advanced-high-na-euv-system' }],
  },
];

export const market = {
  sox: { value: '7,877', high52w: '8,498', offPeak: '-7.3%' },
  stocks: [
    { ticker: 'AMAT', name: 'Applied Materials', price: '$352.62', change: '+8.0%', date: 'Apr 8', up: true, note: 'GAA 新品发布提振' },
    { ticker: 'LRCX', name: 'Lam Research', price: '$235.00', change: '+9.5%', date: 'Apr 8', up: true, note: 'YTD +37.6%，连续四季超预期' },
    { ticker: 'ASML', name: 'ASML Holding', price: '$1,317', change: '-4.7%', date: 'Apr 7', up: false, note: 'MATCH Act 冲击，中国营收占 29%' },
    { ticker: 'KLAC', name: 'KLA Corporation', price: '$1,661', change: '+7.4%', date: 'Apr 8', up: true, note: 'YTD +30.3%，$70 亿回购计划' },
  ],
};

// Equipment events: [date, text, sources?]
// sources is optional array of { name, url }
export const equipment = [
  {
    name: 'Applied Materials', ticker: 'NASDAQ: AMAT',
    highlight: '4 月 8 日发布 Precision Selective Nitride PECVD 和 Trillium ALD 两款沉积系统，面向 GAA 2nm 及以下节点的原子级精度制造。',
    highlightSources: [{ name: 'StockTitan', url: 'https://www.stocktitan.net/news/AMAT/applied-materials-introduces-deposition-systems-for-angstrom-era-7v0938tplllx.html' }],
    events: [
      ['Apr 8', '新品发布后股价当日大涨约 8%，市场反应积极', [{ name: 'SeekingAlpha', url: 'https://seekingalpha.com/news/4573357-applied-materials-surges-as-it-unveils-new-chipmaking-systems' }]],
      ['Q1', 'Q1 FY2026 EPS $2.38（超预期 $0.17），营收 $70.1 亿', [{ name: 'TrendForce', url: 'https://www.trendforce.com/news/2026/02/13/news-applied-materials-guides-april-quarter-above-estimates-sees-20-semi-growth-in-2026-dram-leads/' }]],
      ['展望', '管理层预计 2026 年半导体行业增长 20%+，DRAM 领涨'],
    ],
  },
  {
    name: 'Lam Research', ticker: 'NASDAQ: LRCX',
    highlight: '连续四个季度超预期，Q2 FY2026 营收 $53.4 亿（同比 +22%），Q3 指引 $57 亿显示持续加速。',
    highlightSources: [{ name: 'Zacks', url: 'https://www.zacks.com/commentary/2895120/bull-of-the-day-lam-research-lrcx' }],
    events: [
      ['Apr 7', 'Morgan Stanley 上调目标价至 $260', [{ name: 'Yahoo Finance', url: 'https://finance.yahoo.com/markets/stocks/articles/dear-lam-research-investors-mark-154010553.html' }]],
      ['Apr 22', '即将发布 Q3 财报，关注 GAA 节奏及中国收入占比'],
    ],
  },
  {
    name: 'ASML Holding', ticker: 'EURONEXT: ASML',
    highlight: 'MATCH Act 冲击下股价单日跌 4.7%，但随后因美伊停火反弹 6.35%。High-NA EUV 进入商用部署阶段。',
    highlightSources: [{ name: 'CNBC', url: 'https://www.cnbc.com/2026/04/07/asml-shares-today-us-chip-export-curbs-china.html' }],
    events: [
      ['订单', 'SK Hynix 承诺 $80 亿采购 ~30 台 EUV；Samsung 计划 $40 亿采购 ~20 台', [{ name: '24/7 Wall St', url: 'https://247wallst.com/investing/2026/04/06/asml-revenue-is-about-to-explode-higher-again/' }]],
      ['High-NA', '首批商用 EXE:5200B 已交付 Intel，2026 预计出货 5-10 台', [{ name: "Tom's Hardware", url: 'https://www.tomshardware.com/tech-industry/semiconductors/intel-installs-industrys-first-commercial-high-na-euv-lithography-tool-asml-twinscan-exe-5200b-sets-the-stage-for-14a' }]],
      ['Apr 15', 'Q1 财报发布 | 指引：2026 净销售额 340-390 亿欧元'],
    ],
  },
  {
    name: 'Tokyo Electron / KLA', ticker: 'TSE: 8035 / NASDAQ: KLAC',
    highlight: null,
    events: [
      ['TEL', '先进芯片设备占比提升至 40%，资本支出增 48% 至 2400 亿日元创新高', [{ name: 'TrendForce', url: 'https://www.trendforce.com/news/2026/01/09/news-tokyo-electron-reportedly-raises-fy26-capex-48-to-record-high-bets-on-dram-etching-demand/' }]],
      ['KLA', '宣布 $70 亿回购计划，连续第 17 年提高股息', [{ name: 'StockStory', url: 'https://stockstory.org/us/stocks/nasdaq/klac/news/why-up-down/why-is-kla-corporation-klac-stock-soaring-today-3' }]],
    ],
  },
];

export const techFrontier = [
  {
    title: 'GAA 与背面供电进入量产倒计时',
    text: 'TSMC N2P（2nm + 背面供电）计划 2026 下半年投产；A16（1.6nm + Super Power Rail）紧随其后。背面供电可降低电压降和供电噪声，但与 GAA 集成带来应力管理挑战。',
    sources: [
      { name: 'SemiEngineering', url: 'https://semiengineering.com/backside-power-delivery-nears-production/' },
      { name: 'Lam Research', url: 'https://newsroom.lamresearch.com/transistor-channel-stress-backside-power-delivery-networks' },
    ],
  },
  {
    title: 'High-NA EUV 从研发走向量产',
    text: 'Imec 接收 EXE:5200 系统（3 月 18 日），Q4 完成验证。Intel 安装商用 EXE:5200B 用于 14A 节点。2026 年预计交付 5-10 台，2028 年增至 20+ 台。',
    sources: [
      { name: 'Imec', url: 'https://www.imec-int.com/en/press/imec-receives-worlds-most-advanced-high-na-euv-system' },
      { name: 'IBM Research', url: 'https://research.ibm.com/blog/spie-2026-below-2-nm' },
      { name: "Tom's Hardware", url: 'https://www.tomshardware.com/tech-industry/semiconductors/intel-installs-industrys-first-commercial-high-na-euv-lithography-tool-asml-twinscan-exe-5200b-sets-the-stage-for-14a' },
    ],
  },
  {
    title: 'SEMI 全球设备支出展望',
    text: '300mm 设备支出预计 2026 年增长 18% 至 $1,330 亿，2027 年增长 14% 至 $1,510 亿。AI、先进逻辑、存储及先进封装为主要驱动力。',
    sources: [{ name: 'SEMI', url: 'https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027' }],
  },
];

export const chinaSection = {
  companies: [
    {
      name: '北方华创', ticker: '002371.SZ',
      highlight: 'SEMICON China 2026 发布三款重磅设备，2026 年订单目标 600 亿元，有望跻身全球设备商前五。',
      highlightSources: [{ name: '36Kr', url: 'https://36kr.com/p/3739559184039940' }],
      events: [
        ['新品', '12 英寸 NMC612H ICP 刻蚀、Qomola HPD30 混合键合、Ausip T830 TSV 电镀', [{ name: '新浪财经', url: 'https://finance.sina.com.cn/stock/bxjj/2026-03-30/doc-inhsuknu9640085.shtml' }]],
        ['验证', '刻蚀设备已在 SMIC 7nm 产线测试', [{ name: 'SCMP', url: 'https://www.scmp.com/tech/big-tech/article/3348044/chinas-top-chip-foundry-smic-unveils-action-plan-seizing-new-growth-opportunities' }]],
      ],
    },
    {
      name: '中微公司', ticker: '688012.SH', highlight: null,
      events: [['新品', 'Primo Angnova ICP 刻蚀、Primo Domingo 高选择性刻蚀、Smart RF Match、Preciomo Udx Micro LED MOCVD', [{ name: '快科技', url: 'https://news.mydrivers.com/1/1111/1111592.htm' }]]],
    },
    {
      name: '新凯来', ticker: '深圳国资', highlight: null,
      events: [['新品', 'SEMICON China 发布 EPI、ALD、PVD、ETCH、CVD 五款设备，对标 5nm', [{ name: '东方财富', url: 'https://caifuhao.eastmoney.com/news/20260324152840990924010' }]]],
    },
    {
      name: '盛合晶微半导体', ticker: 'IPO', highlight: null,
      events: [['Apr 9', '科创板 IPO，发行价 19.68 元/股']],
    },
  ],
  outlook: '中国要求新建产能使用不低于 50% 国产设备，目标 2030 年半导体自给率达 80%（现约 33%）。SMIC 发布 2026 行动计划聚焦供应链本土化。2025 年中国 WFE 预计同比 -13%，2026 年回升 +5%。',
  outlookSources: [
    { name: 'Electronics Weekly', url: 'https://www.electronicsweekly.com/news/business/china-makes-new-plan-for-semiconductor-self-sufficiency-2026-03/' },
    { name: 'Astute Group', url: 'https://www.astutegroup.com/news/general/china-accelerates-semiconductor-self-sufficiency-with-mandatory-local-equipment-use/' },
  ],
};

export const academic = [
  {
    title: 'Imec 120 层 Si/SiGe 外延堆叠突破 3D DRAM 瓶颈',
    text: 'Imec 联合根特大学在 300mm 晶圆上成功堆叠 120 层交替 Si/SiGe 双层（共 241 子层），发表于 Journal of Applied Physics。',
    sources: [
      { name: "Tom's Hardware", url: 'https://www.tomshardware.com/tech-industry/next-generation-3d-dram-approaches-reality-as-scientists-achieve-120-layer-stack-using-advanced-deposition-techniques' },
      { name: 'SemiEngineering', url: 'https://semiengineering.com/epitaxial-growth-of-up-to-120-si-sige-bilayers-in-view-of-3d-dram-applications-imec-ghent-univ/' },
    ],
  },
  {
    title: 'Nature Electronics: 碳纳米管晶体管突破 1 THz',
    text: '基于对齐碳纳米管薄膜的 MOSFET 实现截止频率超 1 THz，栅极长度 80nm，载流子迁移率超 3,000 cm²/V·s。',
    sources: [{ name: 'Nature Electronics', url: 'https://www.nature.com/articles/s41928-025-01463-6' }],
  },
  {
    title: 'Imec + Diraq: 工厂制造硅量子比特达 99%+ 保真度',
    text: '在标准半导体产线上制造的硅量子比特一致性超过 99% 精度，发表于 Nature。',
    sources: [{ name: 'Nature', url: 'https://www.nature.com/articles/s41586-025-09531-9' }],
  },
  {
    title: 'CFET（互补 FET）路线图加速',
    text: 'Imec 推进 CFET 单片集成与顺序集成方案。全芯片评估显示 CFET 相比 Nanosheet FET 可实现面积缩减 ~55%、功耗降低 ~29%。',
    sources: [
      { name: 'Imec', url: 'https://www.imec-int.com/en/articles/imec-puts-complementary-fet-cfet-logic-technology-roadmap' },
      { name: 'SemiEngineering', url: 'https://semiengineering.com/knowledge_centers/integrated-circuit/transistors/3d/cfet/' },
    ],
  },
];

export const aiSmart = [
  {
    title: 'Intel 将 AI 嵌入晶圆厂核心流程',
    text: 'AI 缺陷检测精度已超人工检测员，NVIDIA NV-DINOv2 视觉模型达 98.5% die 级缺陷分类精度。先进逻辑晶圆厂每 1% 良率提升 ≈ $1.5 亿利润。',
    sources: [
      { name: 'EE Times', url: 'https://www.eetimes.com/from-defect-images-to-die-prediction-how-intel-is-scaling-ai-in-advanced-manufacturing/' },
      { name: 'NVIDIA', url: 'https://developer.nvidia.com/blog/optimizing-semiconductor-defect-classification-with-generative-ai-and-vision-foundation-models/' },
    ],
  },
  {
    title: 'EDA 进入 Agent 时代',
    text: 'Cadence 发布 ChipStack AI Agent（10x 生产力），Synopsys 推出 AgentEngineer。NVIDIA 投资 $20 亿入股 Synopsys。新锐 Cognichip 融资 $6,000 万。',
    sources: [
      { name: 'The Register', url: 'https://www.theregister.com/2026/02/10/cadences_agentic_chip_design_tool/' },
      { name: 'TechCrunch', url: 'https://techcrunch.com/2026/04/01/cognichip-wants-ai-to-design-the-chips-that-power-ai-and-just-raised-60m-to-try/' },
    ],
  },
  {
    title: 'AI 芯片新品密集发布',
    text: 'Samsung 出货首批商用 HBM4（11.7 Gbps）；Microsoft Maia 200 推理加速器（TSMC 3nm）；韩国 Rebellions 完成 $4 亿 Pre-IPO；华为 950PR 推理芯片获字节、阿里大单。',
    sources: [
      { name: 'Samsung', url: 'https://news.samsung.com/global/samsung-ships-industry-first-commercial-hbm4-with-ultimate-performance-for-ai-computing' },
      { name: 'Microsoft', url: 'https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/' },
      { name: 'TechCrunch', url: 'https://techcrunch.com/2026/03/30/ai-chip-startup-rebellions-raises-400-million-at-2-3b-valuation-in-pre-ipo-round/' },
    ],
  },
  {
    title: 'RISC-V 进入量产汽车',
    text: 'Bosch、Infineon、Nordic、NXP、Qualcomm 五家成立德国合资公司聚焦车规 RISC-V。零跑 LingXin01 SoC 用于 ADAS；长城紫荆 M100 MCU 已搭载新车型。',
    sources: [
      { name: 'EE Times', url: 'https://www.eetimes.com/automotive-industry-charts-new-course-with-risc-v/' },
      { name: 'Yole Group', url: 'https://www.yolegroup.com/strategy-insights/will-risc-v-reduce-auto-mcus-future-risk/' },
    ],
  },
];

export const designTrends = [
  {
    title: 'Cadence ChipStack AI Super Agent：EDA 从菜单交互走向意图对话',
    text: 'Cadence 发布 ChipStack AI Super Agent（2 月 10 日），让工程师用自然语言描述意图，由多智能体自动生成 RTL、测试平台和验证方案。早期客户 NVIDIA、Qualcomm、Altera、Tenstorrent 反馈生产力提升 10x。这是 EDA 工具 UX 从"工具操作"到"意图对话"的历史性转向。',
    sources: [
      { name: 'Cadence', url: 'https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2026/cadence-unleashes-chipstack-ai-super-agent-pioneering-a-new.html' },
      { name: 'EE Times', url: 'https://www.eetimes.com/cadence-unveils-chipstack-ai-agent-for-agentic-chip-design-and-verification/' },
    ],
  },
  {
    title: 'NVIDIA Vera Rubin：从芯片到机架的"极致协同设计"语言',
    text: 'NVIDIA 在 CES 和 GTC 2026 发布 Vera Rubin 平台——6 颗芯片（Vera CPU、Rubin GPU、NVLink 6、ConnectX-9、BlueField-4、Spectrum-6）协同设计为一个统一的 AI 超级计算机机架，不再是独立芯片的简单组合。这标志着 AI 硬件发布的新视觉语言：整机架即产品。',
    sources: [
      { name: 'NVIDIA', url: 'https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer' },
      { name: 'NVIDIA Dev Blog', url: 'https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/' },
    ],
  },
  {
    title: 'Siemens Digital Twin Composer：HMI 从仪表盘走向可导航虚拟孪生',
    text: 'Siemens 在 CES 2026 发布 Digital Twin Composer，基于 NVIDIA Omniverse 将 2D/3D 数字孪生数据与实时遥测统一到一个场景中。"一个模型贯穿设计、仿真、运行"的理念，把晶圆厂操作员 HMI 从平面仪表盘重塑为可导航的虚拟孪生空间。2026 年中上线 Siemens Xcelerator 市场。',
    sources: [
      { name: 'Siemens', url: 'https://news.siemens.com/en-us/digital-twin-composer-ces-2026/' },
      { name: 'Metrology News', url: 'https://metrology.news/siemens-digital-twin-composer-brings-real-time-intelligence-to-the-factory-digital-twin/' },
    ],
  },
  {
    title: 'Intel 18A 首秀：Core Ultra Series 3 的工业设计宣言',
    text: 'Intel 在 CES 2026 发布首款 Intel 18A 量产消费平台 Core Ultra Series 3，把"美国制造"作为工业设计语言的核心叙事，将芯片封装与品牌视觉绑定到 CEO 林本坚领导下的 Intel Foundry 复兴故事。',
    sources: [
      { name: 'Intel', url: 'https://www.intc.com/news-events/press-releases/detail/1757/ces-2026-intel-core-ultra-series-3-debuts-as-first-built' },
    ],
  },
  {
    title: 'Agentic UX 进入半导体制造：工程师工作流的新底层',
    text: 'NVIDIA 宣布与 TSMC、SK 海力士、三星、联发科等全球工业软件巨头合作，将 Agentic AI 嵌入设计、工程和制造软件。原本依赖人工操作的复杂工作流，正被长时间运行的 AI Agent 接管，半导体制造 UX 迎来新的交互底层。',
    sources: [
      { name: 'NVIDIA IR', url: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-and-Global-Industrial-Software-Giants-Bring-Design-Engineering-and-Manufacturing-Into-the-AI-Era/default.aspx' },
    ],
  },
];

export const policy = [
  {
    tag: 'U.S. Congress',
    title: 'MATCH Act：封堵 DUV 对华出口',
    text: '4 月 2 日众议院推出 MATCH Act，目标收紧 ASML DUV 光刻机对华出口，施压荷兰、日本盟友全面对齐美国管制标准。JPMorgan 估计若实施，ASML EPS 可能下降 10%。',
    sources: [
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2026-04-02/us-lawmakers-propose-crackdown-on-sales-of-chip-tools-to-china' },
      { name: 'SeekingAlpha', url: 'https://seekingalpha.com/news/4573005-asml-other-semi-equipment-makers-dip-after-match-act-reaches-us-congress' },
    ],
  },
  {
    tag: 'U.S. Tariff',
    title: 'Section 232 半导体关税生效',
    text: '1 月 15 日起对特定先进芯片征收 25% 关税（涵盖 Nvidia H200、AMD MI325X 等），但豁免数据中心、研发等场景。7 月 1 日将评估是否扩大范围。',
    sources: [{ name: 'White & Case', url: 'https://www.whitecase.com/insight-alert/president-trump-orders-narrowly-targeted-25-section-232-tariff-certain-advanced' }],
  },
  {
    tag: 'CHIPS Act',
    title: 'CHIPS Act 税收优惠面临到期',
    text: 'TSMC 宣布追加 $1,000 亿美国投资。但 Section 48D 先进制造投资税收抵免将于 2026 年到期，续期前景不明。',
    sources: [
      { name: 'Conference Board', url: 'https://www.conference-board.org/research/ced-policy-backgrounders/the-future-of-the-CHIPS-and-Science-Act' },
      { name: 'Manufacturing Dive', url: 'https://www.manufacturingdive.com/news/chips-and-science-act-tracker-semiconductor-manufacturing/734039/' },
    ],
  },
];

export const landscape = {
  text: 'TSMC 亚利桑那规模扩大至最多 12 座晶圆厂 + 4 座先进封装厂；台湾同步推进 10 座新厂。全球 2025 年新开工 18 个晶圆厂项目（3 座 200mm + 15 座 300mm），美洲和日本各 4 个领跑。',
  sources: [
    { name: 'TrendForce', url: 'https://www.trendforce.com/news/2026/02/23/news-tsmc-speeds-up-expansion-in-taiwan-up-to-10-fabs-reportedly-under-construction-or-starting-in-2026/' },
    { name: 'SEMI', url: 'https://www.semi.org/en/semi-press-release/eighteen-new-semiconductor-fabs-to-start-construction-in-2025-semi-reports' },
  ],
};

export const reading = [
  {
    title: 'SEMI: Global 300mm Fab Equipment Spending to Reach $151B by 2027',
    source: 'SEMI.org · Apr 8, 2026',
    desc: 'SEMI 最新预测报告，详细拆解各地区、各环节设备投资趋势。',
    url: 'https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027',
  },
  {
    title: 'Backside Power Delivery Nears Production',
    source: 'SemiEngineering · Mar 2026',
    desc: '深度解析背面供电技术的量产挑战，涵盖 TSMC、Intel、Samsung 的不同技术路线。',
    url: 'https://semiengineering.com/backside-power-delivery-nears-production/',
  },
  {
    title: 'THz Carbon Nanotube Transistors — Nature Electronics',
    source: 'Nature Electronics · 2026',
    desc: '碳纳米管 MOSFET 截止频率突破 1 THz，后硅时代高频器件里程碑。',
    url: 'https://www.nature.com/articles/s41928-025-01463-6',
  },
  {
    title: 'MATCH Act: What It Means for Semiconductor Equipment Exports',
    source: 'Bloomberg · Apr 2, 2026',
    desc: '法案全文解读与影响分析，重点关注对 ASML DUV 业务及日荷盟友的连锁反应。',
    url: 'https://www.bloomberg.com/news/articles/2026-04-02/us-lawmakers-propose-crackdown-on-sales-of-chip-tools-to-china',
  },
];

export const calendar = [
  { date: 'Apr 15', event: 'ASML Q1 2026 财报发布' },
  { date: 'Apr 22', event: 'Lam Research Q3 FY2026 财报发布' },
  { date: 'Apr 22', event: 'ASML 年度股东大会' },
  { date: 'Apr 24', event: 'ASML 每股 2.70 欧元现金股息' },
  { date: 'Apr 29', event: 'KLA Q3 FY2026 财报发布' },
  { date: 'Apr 30', event: 'Tokyo Electron 全年财报发布' },
  { date: 'Jun 14', event: 'VLSI Symposium 2026 檀香山' },
];
