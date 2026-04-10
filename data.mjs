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
  { tag: 'POLICY', text: '美国众议院推出 MATCH Act，拟封堵 ASML DUV 对华出口通道，ASML 单日跌 4.7%' },
  { tag: 'AMAT', text: 'Applied Materials 发布两款面向 GAA 2nm 的沉积系统，股价当日涨 8%' },
  { tag: 'SEMI', text: 'SEMI 发布数据：2025 全球半导体设备销售 $1,351 亿，预计 2027 年达 $1,560 亿创新高' },
  { tag: 'CHINA', text: '北方华创、中微公司在 SEMICON China 2026 密集发布新品，北方华创 2026 年订单目标 600 亿' },
  { tag: 'HIGH-NA', text: 'Imec 接收 ASML EXE:5200 High-NA EUV 系统，预计 Q4 完成验证' },
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

export const equipment = [
  {
    name: 'Applied Materials', ticker: 'NASDAQ: AMAT',
    highlight: '4 月 8 日发布 Precision Selective Nitride PECVD 和 Trillium ALD 两款沉积系统，面向 GAA 2nm 及以下节点的原子级精度制造。',
    events: [
      ['Apr 8', '新品发布后股价当日大涨约 8%，市场反应积极'],
      ['Q1', 'Q1 FY2026 EPS $2.38（超预期 $0.17），营收 $70.1 亿'],
      ['展望', '管理层预计 2026 年半导体行业增长 20%+，DRAM 领涨'],
    ],
  },
  {
    name: 'Lam Research', ticker: 'NASDAQ: LRCX',
    highlight: '连续四个季度超预期，Q2 FY2026 营收 $53.4 亿（同比 +22%），Q3 指引 $57 亿显示持续加速。',
    events: [
      ['Apr 7', 'Morgan Stanley 上调目标价至 $260'],
      ['Apr 22', '即将发布 Q3 财报，关注 GAA 节奏及中国收入占比'],
    ],
  },
  {
    name: 'ASML Holding', ticker: 'EURONEXT: ASML',
    highlight: 'MATCH Act 冲击下股价单日跌 4.7%，但随后因美伊停火反弹 6.35%。High-NA EUV 进入商用部署阶段。',
    events: [
      ['订单', 'SK Hynix 承诺 $80 亿采购 ~30 台 EUV；Samsung 计划 $40 亿采购 ~20 台'],
      ['High-NA', '首批商用 EXE:5200B 已交付 Intel，2026 预计出货 5-10 台'],
      ['Apr 15', 'Q1 财报发布 | 指引：2026 净销售额 340-390 亿欧元'],
    ],
  },
  {
    name: 'Tokyo Electron / KLA', ticker: 'TSE: 8035 / NASDAQ: KLAC',
    highlight: null,
    events: [
      ['TEL', '先进芯片设备占比提升至 40%，资本支出增 48% 至 2400 亿日元创新高'],
      ['KLA', '宣布 $70 亿回购计划，连续第 17 年提高股息'],
    ],
  },
];

export const techFrontier = [
  { title: 'GAA 与背面供电进入量产倒计时', text: 'TSMC N2P（2nm + 背面供电）计划 2026 下半年投产；A16（1.6nm + Super Power Rail）紧随其后。背面供电可降低电压降和供电噪声，但与 GAA 集成带来应力管理挑战。' },
  { title: 'High-NA EUV 从研发走向量产', text: 'Imec 接收 EXE:5200 系统（3 月 18 日），Q4 完成验证。Intel 安装商用 EXE:5200B 用于 14A 节点。2026 年预计交付 5-10 台，2028 年增至 20+ 台。' },
  { title: 'SEMI 全球设备支出展望', text: '300mm 设备支出预计 2026 年增长 18% 至 $1,330 亿，2027 年增长 14% 至 $1,510 亿。AI、先进逻辑、存储及先进封装为主要驱动力。' },
];

export const chinaSection = {
  companies: [
    { name: '北方华创', ticker: '002371.SZ', highlight: 'SEMICON China 2026 发布三款重磅设备，2026 年订单目标 600 亿元，有望跻身全球设备商前五。', events: [['新品', '12 英寸 NMC612H ICP 刻蚀、Qomola HPD30 混合键合、Ausip T830 TSV 电镀'], ['验证', '刻蚀设备已在 SMIC 7nm 产线测试']] },
    { name: '中微公司', ticker: '688012.SH', highlight: null, events: [['新品', 'Primo Angnova ICP 刻蚀、Primo Domingo 高选择性刻蚀、Smart RF Match、Preciomo Udx Micro LED MOCVD']] },
    { name: '新凯来', ticker: '深圳国资', highlight: null, events: [['新品', 'SEMICON China 发布 EPI、ALD、PVD、ETCH、CVD 五款设备，对标 5nm']] },
    { name: '盛合晶微半导体', ticker: 'IPO', highlight: null, events: [['Apr 9', '科创板 IPO，发行价 19.68 元/股']] },
  ],
  outlook: '中国要求新建产能使用不低于 50% 国产设备，目标 2030 年半导体自给率达 80%（现约 33%）。SMIC 发布 2026 行动计划聚焦供应链本土化。2025 年中国 WFE 预计同比 -13%，2026 年回升 +5%。',
};

export const academic = [
  { title: 'Imec 120 层 Si/SiGe 外延堆叠突破 3D DRAM 瓶颈', text: 'Imec 联合根特大学在 300mm 晶圆上成功堆叠 120 层交替 Si/SiGe 双层（共 241 子层），发表于 Journal of Applied Physics。' },
  { title: 'Nature Electronics: 碳纳米管晶体管突破 1 THz', text: '基于对齐碳纳米管薄膜的 MOSFET 实现截止频率超 1 THz，栅极长度 80nm，载流子迁移率超 3,000 cm²/V·s。' },
  { title: 'Imec + Diraq: 工厂制造硅量子比特达 99%+ 保真度', text: '在标准半导体产线上制造的硅量子比特一致性超过 99% 精度，发表于 Nature。' },
  { title: 'CFET（互补 FET）路线图加速', text: 'Imec 推进 CFET 单片集成与顺序集成方案。全芯片评估显示 CFET 相比 Nanosheet FET 可实现面积缩减 ~55%、功耗降低 ~29%。' },
];

export const aiSmart = [
  { title: 'Intel 将 AI 嵌入晶圆厂核心流程', text: 'AI 缺陷检测精度已超人工检测员，NVIDIA NV-DINOv2 视觉模型达 98.5% die 级缺陷分类精度。先进逻辑晶圆厂每 1% 良率提升 ≈ $1.5 亿利润。' },
  { title: 'EDA 进入 Agent 时代', text: 'Cadence 发布 ChipStack AI Agent（10x 生产力），Synopsys 推出 AgentEngineer。NVIDIA 投资 $20 亿入股 Synopsys。新锐 Cognichip 融资 $6,000 万。' },
  { title: 'AI 芯片新品密集发布', text: 'Samsung 出货首批商用 HBM4（11.7 Gbps）；Microsoft Maia 200 推理加速器（TSMC 3nm）；韩国 Rebellions 完成 $4 亿 Pre-IPO；华为 950PR 推理芯片获字节、阿里大单。' },
  { title: 'RISC-V 进入量产汽车', text: 'Bosch、Infineon、Nordic、NXP、Qualcomm 五家成立德国合资公司聚焦车规 RISC-V。零跑 LingXin01 SoC 用于 ADAS；长城紫荆 M100 MCU 已搭载新车型。' },
];

export const policy = [
  { tag: 'U.S. Congress', title: 'MATCH Act：封堵 DUV 对华出口', text: '4 月 2 日众议院推出 MATCH Act，目标收紧 ASML DUV 光刻机对华出口，施压荷兰、日本盟友全面对齐美国管制标准。JPMorgan 估计若实施，ASML EPS 可能下降 10%。' },
  { tag: 'U.S. Tariff', title: 'Section 232 半导体关税生效', text: '1 月 15 日起对特定先进芯片征收 25% 关税（涵盖 Nvidia H200、AMD MI325X 等），但豁免数据中心、研发等场景。7 月 1 日将评估是否扩大范围。' },
  { tag: 'CHIPS Act', title: 'CHIPS Act 税收优惠面临到期', text: 'TSMC 宣布追加 $1,000 亿美国投资。但 Section 48D 先进制造投资税收抵免将于 2026 年到期，续期前景不明。' },
];

export const landscape = 'TSMC 亚利桑那规模扩大至最多 12 座晶圆厂 + 4 座先进封装厂；台湾同步推进 10 座新厂。全球 2025 年新开工 18 个晶圆厂项目（3 座 200mm + 15 座 300mm），美洲和日本各 4 个领跑。';

export const reading = [
  { title: 'SEMI: Global 300mm Fab Equipment Spending to Reach $151B by 2027', source: 'SEMI.org · Apr 8, 2026', desc: 'SEMI 最新预测报告，详细拆解各地区、各环节设备投资趋势。' },
  { title: 'Backside Power Delivery Nears Production', source: 'SemiEngineering · Mar 2026', desc: '深度解析背面供电技术的量产挑战，涵盖 TSMC、Intel、Samsung 的不同技术路线。' },
  { title: 'THz Carbon Nanotube Transistors — Nature Electronics', source: 'Nature Electronics · 2026', desc: '碳纳米管 MOSFET 截止频率突破 1 THz，后硅时代高频器件里程碑。' },
  { title: 'MATCH Act: What It Means for Semiconductor Equipment Exports', source: 'Bloomberg · Apr 2, 2026', desc: '法案全文解读与影响分析，重点关注对 ASML DUV 业务及日荷盟友的连锁反应。' },
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
