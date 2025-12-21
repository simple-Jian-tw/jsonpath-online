# JMESPath 在线工具 - 产品规格说明书 (PRD)

> **面向开发者**: 这是一份完整的产品规格文档。请基于您的技术专长实现所有功能。代码实现细节由您决定，本文档专注于产品需求、用户体验和业务目标。

---

## 📋 项目背景

### 当前状态
我们已经拥有一个成功的 **JSONPath Online** 工具网站 (jsonpath.online)，提供在线JSONPath查询、测试和代码生成功能。该网站采用Next.js框架，已部署在Cloudflare Pages。

### 市场机会
通过SEO关键词研究，我们发现**JMESPath**领域存在显著的市场机会：
- **核心关键词**: "jmespath" (1000月搜索量), "jmespath online" (20月搜索量)
- **金矿关键词**: "jmespath create csv" (1900月搜索量，竞争度仅7)
- **长尾关键词**: 100+个相关搜索词，大多竞争度低

### 关键洞察
经过深度市场研究，我们发现：
1. **技术Gap**: JMESPath本身不支持CSV输出，用户需要组合多个工具（jq, Python脚本等）才能完成JSON到CSV的转换
2. **AWS生态**: JMESPath是AWS CLI、Azure CLI、Ansible的核心查询语言，拥有庞大的开发者用户群
3. **竞品缺失**: 目前没有一个完善的JMESPath在线工具，提供查询测试、CSV导出和代码生成的一站式解决方案

### 业务目标
1. **SEO流量**: 3个月内获得"jmespath"相关关键词前3排名，预计月访问量3000+
2. **用户价值**: 成为开发者首选的JMESPath测试和学习平台
3. **品牌延伸**: 从"JSONPath Online"扩展为"JSON查询工具套件"
4. **交叉销售**: JSONPath和JMESPath用户相互引流

---

## 🎯 核心产品定位

### 产品愿景
打造**最易用的JMESPath在线工具**，让AWS开发者、DevOps工程师和数据分析师无需安装任何软件，即可完成JSON查询、CSV导出和代码生成。

### 目标用户画像

#### 主要用户群体 (70%)
**AWS/Azure CLI用户 - DevOps工程师**
- **痛点**: AWS CLI输出JSON格式，需要转CSV做报表/分析
- **现有方案**: 复杂的bash脚本 + jq + 手动处理
- **我们的价值**: 一键完成查询和导出，无需编程

**典型场景**:
```
需求：导出所有EC2实例的清单到Excel
现有方法：aws ec2 describe-instances | jq -r '... 复杂表达式 ...' | sed ... > output.csv
期望方法：在我们网站粘贴JSON → 写JMESPath → 点击"Export CSV"
```

#### 次要用户群体 (20%)
**Python/JavaScript开发者 - 后端工程师**
- **痛点**: 需要快速测试JMESPath表达式，验证API响应处理逻辑
- **现有方案**: 本地写测试代码，反复调试
- **我们的价值**: 实时在线测试 + 生成生产代码

#### 第三用户群体 (10%)
**数据分析师 - 非技术用户**
- **痛点**: 收到JSON格式的数据，需要在Excel中分析
- **现有方案**: 求助开发者或使用简陋的JSON转CSV工具（无法过滤和转换）
- **我们的价值**: 可视化操作界面 + 丰富的示例模板

---

## 🏗️ 产品架构

### 网站结构

```
jsonpath.online (现有网站)
├── / (JSONPath 主工具)
├── /docs
├── /integrations
└── /jmespath ← 【新增】JMESPath 工具套件
    ├── / (主工具页)
    ├── /create-csv (CSV转换专题页) ⭐ 核心页面
    ├── /python (Python集成指南)
    ├── /aws-cli (AWS CLI应用指南) ⭐ 核心页面
    ├── /examples (示例库)
    ├── /functions (函数文档)
    ├── /vs-jsonpath (对比JSONPath)
    └── /vs-jq (对比jq)
```

### 页面层级关系

**首页流量分配**:
- JSONPath主页 → "Looking for JMESPath?" CTA → JMESPath主页
- JMESPath主页 → 子页面导航 + 核心功能推荐

**SEO链接策略**:
- 每个页面底部推荐3-5个相关页面
- 工具页面链接到教程页面
- 教程页面链接回工具页面
- 所有页面都能在3次点击内到达

---

## 🎨 功能需求规格

### 1. JMESPath 主工具页 (/jmespath)

#### 1.1 页面目标
- **功能**: 提供在线JMESPath表达式测试环境
- **SEO**: 目标关键词 "jmespath online", "jmespath tester", "jmespath playground"
- **转化**: 引导用户到CSV导出页或相关教程

#### 1.2 核心组件

**A. 表达式输入区**
- 输入框占位符示例: `people[?age > \`30\`].name`
- 实时语法验证，错误高亮显示
- 无需`$`前缀（这是JMESPath与JSONPath的区别）
- Debounce 300ms后执行查询

**B. JSON输入编辑器**
- 默认加载示例数据（结构化的用户列表数据，包含嵌套对象和数组）
- Monaco编辑器（桌面端）或Textarea（移动端）
- 语法高亮和自动格式化
- "Format JSON"按钮
- 错误提示（如果JSON无效）

**C. 结果输出区**
- 显示查询结果的JSON格式
- 只读编辑器，语法高亮
- "Copy Result"按钮
- 空结果时显示友好提示："No matches found. Try adjusting your query."

**D. 代码生成器**
- 6个语言标签: Python, JavaScript, Go, Java, PHP, C#
- 生成可直接运行的代码示例
- 包含库安装说明的注释
- "Copy Code"按钮
- 默认选中Python（因为AWS CLI用户常用Python）

**E. 快速示例按钮**
- 提供8-10个常用JMESPath模式
- 点击后自动填充JSON和表达式
- 示例分类：
  - 基础选择 (e.g., `people[*].name`)
  - 过滤条件 (e.g., `people[?age > \`30\`]`)
  - 投影转换 (e.g., `people[*].{Name: name, Age: age}`)
  - 函数使用 (e.g., `length(people)`, `sort_by(people, &age)`)
  - 数组扁平化 (e.g., `people[*].skills[]`)

#### 1.3 页面内容

**Hero区域**:
- H1: "JMESPath Online Tester & Evaluator"
- 副标题: "Test and validate JMESPath queries in real-time. JMESPath is a query language for JSON, used extensively in AWS CLI, Ansible, and many other tools."
- 标签云: [Python JMESPath] [AWS CLI JMESPath] [Examples] [vs JSONPath]

**工具下方内容区**:
- "What is JMESPath?" 介绍段落 (200-300字)
- 关键特性列表 (Filtering, Projections, Functions, Pipe Expressions)
- 常见用例 (AWS CLI, Ansible, API response parsing)
- "JMESPath vs JSONPath" 简要对比 + 链接到详细对比页

**CSV功能推广区** (高亮展示):
```
╔══════════════════════════════════════════╗
║ 📊 NEW: Export to CSV                   ║
║ ────────────────────────────────────────║
║ Query JSON data with JMESPath and       ║
║ instantly download results as CSV.       ║
║ Perfect for AWS CLI outputs.             ║
║                                          ║
║ [Learn More →]                           ║
╚══════════════════════════════════════════╝
```

**FAQ区域**:
- 至少6个常见问题
- 涵盖：基础使用、AWS CLI集成、与其他工具对比、学习资源等

**SEO优化**:
- Title: "JMESPath Online Tester & Evaluator | Test JMESPath Queries"
- Meta Description: "Free online JMESPath tester and evaluator. Test JMESPath queries in real-time with syntax highlighting, error detection, and code generation for Python, JavaScript, Go, and more."
- JSON-LD结构化数据: SoftwareApplication类型

---

### 2. CSV转换专题页 (/jmespath/create-csv) ⭐ 最高优先级

#### 2.1 页面目标
- **功能**: 解决"jmespath create csv"搜索需求，提供一站式CSV导出解决方案
- **SEO**: 目标关键词 "jmespath create csv" (1900月搜索量)
- **转化**: 吸引AWS用户成为网站常客，建立品牌信任

#### 2.2 独特价值主张

**核心信息** (需在页面多处强调):
> "JMESPath doesn't natively support CSV output. This tool bridges that gap - query with JMESPath, get CSV automatically. No jq, no scripts, no complexity."

#### 2.3 页面布局结构

**Part 1: Hero区域**
- H1: "JMESPath to CSV Converter"
- 副标题: "Query JSON data with JMESPath and instantly export results to CSV format."
- 三个价值点:
  - ⚡ Instant Export - Query and download CSV in one click
  - 🔧 AWS CLI Ready - Perfect for EC2, S3, Lambda outputs
  - 📊 Excel Compatible - Open directly in Excel or Google Sheets

**Part 2: 交互式工具**
- 复用主工具页的完整功能
- **额外增加CSV导出按钮**:
  - 按钮文案: "📊 Export to CSV"
  - 样式: 绿色渐变，视觉上最突出
  - 位置: 与"Copy Result"并列，但更显眼
  - 禁用状态: 当有错误或无结果时禁用，显示提示

**Part 3: CSV导出选项** (可折叠的高级选项面板)
- **基础功能** (默认行为):
  - 自动提取列名
  - 自动处理特殊字符转义
  - 下载为 `jmespath-result.csv`

- **CSV预览** (导出前预览):
  - 显示CSV的前5行
  - 格式化表格展示
  - "看起来正确？点击下载" 引导语

- **自定义选项** (可选):
  - 分隔符: 逗号(默认) / 制表符 / 分号 / 自定义
  - 文件名: 可编辑文本框
  - 编码: UTF-8(默认) / UTF-8 BOM / GBK
  - 引号风格: 仅特殊字符 / 全部字段 / 不使用引号

**Part 4: "为什么需要这个工具？"**
- 标题: "Why This Tool Exists"
- 内容要点:
  1. **问题**: JMESPath is a query language, not a formatting tool
  2. **现状**: AWS CLI's --output option doesn't include CSV
  3. **传统方案**: Requires multiple tools (jq, Python scripts, bash magic)
  4. **我们的解决方案**: Bridge the gap with one simple tool

**Part 5: 方法对比** (视觉化对比表格)

```
传统方法 ❌                          我们的方法 ✅
────────────────────────────────────────────────
Step 1: Run AWS CLI                 Step 1: Paste AWS CLI output
Step 2: Install jq                  Step 2: Write JMESPath query
Step 3: Complex piping              Step 3: Click "Export to CSV"
Step 4: Debug syntax errors         Done! ✨
Step 5: Manual file saving
```

**Part 6: AWS CLI 实战场景** (最重要的内容部分)

**要求**: 提供10个真实的AWS CLI使用场景，每个场景包含：

1. **场景名称和图标**
2. **AWS CLI命令**
3. **真实的JSON输出示例** (可折叠，避免页面过长)
4. **JMESPath查询表达式** (带注释说明)
5. **期望的CSV结果预览** (表格形式)
6. **"Try This Example"按钮** (点击后自动填充到工具)

**必须包含的场景**:
- EC2实例清单 (InstanceId, Type, State, LaunchTime, PrivateIP)
- S3存储桶列表 (Name, CreationDate, Region)
- Lambda函数清单 (FunctionName, Runtime, MemorySize, Timeout, LastModified)
- IAM用户列表 (UserName, CreateDate, PasswordLastUsed)
- RDS数据库实例 (DBInstanceIdentifier, Engine, Status, AllocatedStorage)
- CloudFormation栈 (StackName, Status, CreationTime)
- ECS任务 (TaskArn, ClusterArn, LastStatus)
- VPC列表 (VpcId, CidrBlock, State, Tags)
- Security Groups (GroupId, GroupName, VpcId, InboundRules)
- CloudWatch告警 (AlarmName, StateValue, MetricName)

每个场景的JSON输出必须是真实的AWS CLI格式，不要简化。

**Part 7: 使用教程**
- H2: "How to Create CSV from JSON using JMESPath"
- 三步法:
  1. Paste Your JSON Data (说明可以来自哪些来源)
  2. Write Your JMESPath Query (常用模式列表)
  3. Export to CSV (CSV功能说明)

**Part 8: 技巧和最佳实践**

**Do's** (绿色卡片):
- Use multi-select hash `{key: value}` for consistent columns
- Filter data before exporting to reduce file size
- Use descriptive column names
- Test your query before exporting

**Don'ts** (红色卡片):
- Avoid deeply nested objects (flatten them first)
- Avoid very large arrays (filter or paginate)
- Don't use special characters in column names
- Avoid inconsistent data structures

**Part 9: 自动化代码生成**
- H2: "Want to Automate This?"
- 提供Python和Bash的完整代码示例
- 代码应该：
  - 可直接运行
  - 包含安装依赖说明
  - 有注释
  - 涵盖错误处理

**Part 10: FAQ**
- 至少8个问题，针对CSV导出场景
- 必须回答的问题：
  - "Can I use this for large JSON files?"
  - "How do I handle nested arrays in CSV?"
  - "Can I automate this process?"
  - "Is the CSV format compatible with Excel?"
  - "What if my JSON has inconsistent structure?"
  - "Can I export multiple files at once?"

**Part 11: 替代工具对比**
- 对比: JMESPath + 我们的工具 vs. jq vs. Python pandas vs. Online converters
- 表格展示各自的优劣势

**Part 12: CTA区域**
- 蓝色渐变背景
- H2: "Ready to Convert Your JSON to CSV?"
- 引导文案 + "Start Converting →" 锚点链接到页面顶部工具

#### 2.4 SEO优化要求
- Title: "JMESPath Create CSV - Convert JSON to CSV Online | Free Tool"
- Meta Description: "Use JMESPath to query JSON data and export results to CSV format. Perfect for AWS CLI outputs, API responses, and JSON data analysis. Free online tool with instant download."
- 关键词密度:
  - "jmespath create csv": 5-8次自然出现
  - "jmespath to csv": 3-5次
  - "aws cli csv": 3-5次
  - "json to csv jmespath": 2-3次
- 内容长度: 2500-3000字
- 内部链接: 至少链接到5个相关页面

---

### 3. AWS CLI 应用指南页 (/jmespath/aws-cli)

#### 3.1 页面目标
- **教育**: 教会AWS用户如何高效使用JMESPath
- **SEO**: "aws cli jmespath", "jmespath aws", "aws jmespath query"
- **转化**: 建立权威性，吸引回访

#### 3.2 页面结构

**Part 1: 介绍**
- AWS CLI与JMESPath的关系
- --query参数的作用
- 为什么AWS选择JMESPath而不是JSONPath

**Part 2: 基础语法快速入门**
- 5-10个渐进式示例
- 从最简单的 `Reservations[0]` 到复杂的过滤和投影
- 每个示例可点击"Try Online"跳转到主工具

**Part 3: 常用AWS服务JMESPath模式**

**必须包含的服务** (每个提供3-5个真实场景):
- EC2: 实例查询、状态过滤、标签提取
- S3: 存储桶列表、大小计算、权限检查
- Lambda: 函数列表、运行时过滤、内存排序
- IAM: 用户/角色/策略查询
- RDS: 数据库实例、快照、参数组
- CloudFormation: 栈状态、资源列表、输出值
- CloudWatch: 指标查询、告警状态
- VPC: 网络资源、安全组、路由表

**Part 4: 高级技巧**
- Pipe表达式的使用
- 多条件过滤
- 嵌套投影
- 函数组合
- 性能优化建议

**Part 5: 故障排查**
- 常见错误信息解读
- 调试方法
- "使用我们的在线工具测试" CTA

**Part 6: 与CSV导出集成**
- 如何设计JMESPath查询以便导出CSV
- 最佳实践
- 链接到 /create-csv 页面

#### 3.3 SEO优化
- 2000字以上内容
- 丰富的代码示例
- 实际可运行的AWS CLI命令
- FAQ部分

---

### 4. Python集成指南页 (/jmespath/python)

#### 4.1 页面目标
- **教育**: 教会Python开发者使用jmespath库
- **SEO**: "jmespath python", "python jmespath", "jmespath.search"
- **转化**: 提供代码模板，建立开发者信任

#### 4.2 核心内容

**Part 1: 快速开始**
- 安装: `pip install jmespath`
- 第一个示例
- 基本API介绍

**Part 2: 常用模式**
- 10个实用Python代码示例
- 涵盖: API响应处理、文件读取、数据转换、错误处理
- 每个示例完整可运行

**Part 3: 高级用法**
- 编译表达式 (性能优化)
- 自定义函数
- 类型检查
- 调试技巧

**Part 4: 实战项目**
- AWS SDK集成
- Web API数据处理
- 日志分析
- 配置文件解析

**Part 5: 与pandas集成**
- 如何将JMESPath结果转为DataFrame
- CSV导出完整示例

#### 4.3 SEO优化
- 1500字以上
- 可复制的代码块
- 链接到在线工具进行测试

---

### 5. 示例库页 (/jmespath/examples)

#### 5.1 页面目标
- **教育**: 提供全面的JMESPath学习资源
- **SEO**: "jmespath examples", "jmespath query examples"
- **用户体验**: 快速查找所需的查询模式

#### 5.2 示例组织结构

**分类体系**:
1. **基础选择** (10个示例)
   - 字段访问、数组索引、切片等

2. **过滤与条件** (15个示例)
   - 比较运算符、逻辑运算、exists检查等

3. **投影与转换** (12个示例)
   - 数组投影、对象投影、多选哈希等

4. **函数应用** (20个示例)
   - 分类列出所有JMESPath函数的使用示例

5. **复杂查询** (10个示例)
   - 管道表达式、嵌套查询、多步转换等

6. **实际场景** (15个示例)
   - AWS CLI、API响应、配置文件等真实用例

**每个示例包含**:
- 标题和简短描述
- 输入JSON (可折叠)
- JMESPath表达式 (高亮显示)
- 输出结果 (格式化JSON)
- 解释说明
- "Try It Online" 按钮

#### 5.3 交互功能
- 搜索框: 搜索示例标题和标签
- 过滤器: 按分类筛选
- 复制按钮: 一键复制表达式
- 收藏功能: 标记常用示例 (localStorage)

---

### 6. 函数文档页 (/jmespath/functions)

#### 6.1 页面目标
- **参考**: 成为JMESPath函数的权威参考
- **SEO**: "jmespath functions", "jmespath [specific function name]"
- **完整性**: 涵盖所有官方函数

#### 6.2 内容结构

**函数分类**:
1. **数组函数**: length, sort, sort_by, reverse, max, min, sum, avg, etc.
2. **字符串函数**: contains, starts_with, ends_with, join, split, etc.
3. **对象函数**: keys, values, merge, to_array, etc.
4. **类型函数**: type, to_string, to_number, etc.
5. **通用函数**: not_null, map, etc.

**每个函数的文档格式**:
- 函数签名
- 参数说明
- 返回值类型
- 3-5个使用示例 (从简单到复杂)
- 常见陷阱和注意事项
- "Try in Playground" 链接

#### 6.3 导航设计
- 左侧边栏: 函数列表 (按分类)
- 右侧边栏: 当前页面的函数目录
- 顶部搜索: 快速查找函数

---

### 7. JMESPath vs JSONPath 对比页 (/jmespath/vs-jsonpath)

#### 7.1 页面目标
- **教育**: 帮助用户选择合适的查询语言
- **SEO**: "jmespath vs jsonpath", "jsonpath vs jmespath"
- **引流**: 从JSONPath用户吸引到JMESPath

#### 7.2 对比维度

**对比表格**:
| 特性 | JMESPath | JSONPath | 说明 |
|------|----------|----------|------|
| 标准化 | ✅ RFC规范 | ❌ 非正式规范 | ... |
| 过滤能力 | ✅ 强大的过滤表达式 | ⚠️ 有限的过滤 | ... |
| 函数支持 | ✅ 20+内置函数 | ❌ 无函数 | ... |
| 投影 | ✅ 数组和对象投影 | ⚠️ 仅数组 | ... |
| AWS CLI支持 | ✅ 原生支持 | ❌ 不支持 | ... |
| 学习曲线 | ⚠️ 中等 | ✅ 较简单 | ... |
| 社区支持 | ✅ AWS生态 | ✅ JavaScript生态 | ... |

**实际对比示例**:
提供5个相同的查询需求，分别展示JMESPath和JSONPath的实现方式，对比代码长度和可读性。

**使用建议**:
- 什么时候用JMESPath
- 什么时候用JSONPath
- 能否混用

---

### 8. JMESPath vs jq 对比页 (/jmespath/vs-jq)

#### 8.1 页面目标
- **教育**: 澄清JMESPath和jq的适用场景
- **SEO**: "jmespath vs jq", "jq vs jmespath"

#### 8.2 核心对比

**定位差异**:
- JMESPath: 嵌入式查询语言，设计用于编程语言集成
- jq: 独立的命令行工具，更强大但更复杂

**功能对比**:
- CSV输出: jq原生支持 `@csv`，JMESPath需要外部工具
- 学习曲线: JMESPath更简单
- 性能: 各有优势
- 生态系统: jq更成熟，JMESPath有AWS背书

**何时选择谁**:
- AWS CLI场景 → JMESPath (别无选择)
- 复杂命令行数据处理 → jq
- 应用程序内查询 → JMESPath
- 需要CSV输出 → 组合使用或使用我们的工具

---

## 🎯 用户体验要求

### 设计原则
1. **一致性**: 所有JMESPath页面的设计风格必须与现有JSONPath页面保持一致
2. **易用性**: 工具必须零学习成本，新用户能在30秒内开始使用
3. **性能**: 查询响应时间 < 100ms，页面加载 < 2s
4. **可访问性**: 支持键盘导航，屏幕阅读器友好

### 响应式设计
- **桌面端** (>768px): 双栏布局，Monaco编辑器，完整功能
- **平板端** (768px-1024px): 单栏布局，保留Monaco编辑器
- **移动端** (<768px): 单栏布局，使用Textarea替代Monaco，简化界面

### 深色模式
- 必须完美支持深色模式
- 所有文本、边框、背景都要有深色变体
- 代码编辑器也要支持深色主题

### 加载状态
- 查询执行时显示加载指示器
- CSV导出时显示进度提示
- 页面切换时平滑过渡

### 错误处理
- JSON解析错误: 明确指出错误行号
- JMESPath语法错误: 友好的错误消息，提供修复建议
- CSV导出错误: 说明原因和解决方法

### 成功反馈
- 操作成功时显示Toast通知
- CSV下载成功后给予确认
- 复制操作后显示"Copied!"提示

---

## 📊 SEO优化策略

### 页面SEO清单

**每个页面必须包含**:
- ✅ 唯一的、优化的 `<title>` 标签 (50-60字符)
- ✅ 吸引人的 Meta Description (150-160字符)
- ✅ H1标签包含主关键词 (每页仅一个H1)
- ✅ H2、H3层级结构清晰，包含长尾关键词
- ✅ 至少3-5个内部链接到相关页面
- ✅ JSON-LD结构化数据 (SoftwareApplication或Article类型)
- ✅ 语义化HTML (nav, article, section等)
- ✅ 图片alt属性 (如有图片)

### 内容SEO要求

**内容质量标准**:
- 主工具页: 1000-1500字
- CSV专题页: 2500-3000字
- 教程页: 1500-2000字
- 对比页: 1200-1500字
- 示例库: 800-1000字 + 丰富的代码示例

**关键词使用原则**:
- 主关键词密度: 1-2%
- 长尾关键词: 自然融入内容
- 避免关键词堆砌
- 使用同义词和LSI关键词

**内容结构**:
- 开头100字内出现主关键词
- 使用项目符号和编号列表
- 代码块清晰标注
- 表格用于数据对比
- 引用和链接到权威来源

### 技术SEO

**URL结构**:
- 简洁、语义化: `/jmespath/create-csv` 而非 `/jmespath-create-csv-tool`
- 小写字母 + 连字符
- 避免参数和哈希

**站内链接策略**:
- 首页到所有核心页面的链接
- 相关页面间的交叉链接
- 面包屑导航
- Footer的站点地图链接

**性能优化**:
- 静态生成所有页面 (Next.js SSG)
- 图片优化和lazy loading
- 代码分割和按需加载
- CDN分发 (Cloudflare Pages)

**sitemap.xml**:
- 包含所有JMESPath页面
- 设置优先级: 主工具页 (1.0), CSV页 (0.9), 其他 (0.7-0.8)
- 每周更新频率

### 结构化数据

**SoftwareApplication (主工具页)**:
```json
{
  "@type": "SoftwareApplication",
  "name": "JMESPath Online Evaluator",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "Any"
}
```

**Article (教程和对比页)**:
```json
{
  "@type": "Article",
  "headline": "...",
  "datePublished": "2025-12-21",
  "author": {
    "@type": "Organization",
    "name": "JSONPath Online"
  }
}
```

**FAQPage (所有包含FAQ的页面)**:
```json
{
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

---

## 📱 移动端体验

### 移动端特殊考虑

**编辑器体验**:
- 使用原生 `<textarea>` 替代Monaco编辑器
- 保留语法错误提示
- 优化虚拟键盘体验

**触摸优化**:
- 所有按钮最小触摸区域 44x44px
- 足够的间距避免误触
- 支持滑动手势（如左右切换代码语言标签）

**布局调整**:
- 单栏布局
- 折叠高级选项
- 示例按钮横向滚动
- 固定工具栏在顶部

---

## 🎨 视觉设计要求

### 品牌一致性
- 颜色方案必须与现有JSONPath网站一致
- 使用相同的字体家族
- 按钮样式、圆角、阴影等保持统一

### 配色方案
**浅色模式**:
- 背景: `bg-white/40`, `bg-white/70`
- 边框: `border-black/10`
- 文本: `text-black/80`, `text-black/70`
- 强调: `bg-blue-600`, `bg-green-600`

**深色模式**:
- 背景: `bg-black/20`, `bg-black/40`
- 边框: `border-white/10`
- 文本: `text-white/80`, `text-white/70`
- 强调: `bg-blue-500`, `bg-green-500`

### 特殊元素样式

**CSV功能推广区**:
- 绿色渐变背景: `from-green-50 to-emerald-50` (浅色) / `from-green-950/20 to-emerald-950/20` (深色)
- 边框: 2px绿色
- 醒目的"NEW"标签

**代码块**:
- 背景略深于页面背景
- 等宽字体
- 语法高亮
- 复制按钮悬浮在右上角

**示例按钮**:
- 圆角胶囊形状
- 淡色背景，深色文字
- Hover效果
- 激活状态不同颜色

---

## 🔗 交叉引流策略

### JSONPath → JMESPath

**在JSONPath主页添加**:
- 底部推广区: "Looking for JMESPath?" + 卡片介绍 + CTA按钮
- 导航栏: 添加"JMESPath"链接
- FAQ中添加: "JMESPath和JSONPath有什么区别？" + 链接

### JMESPath → JSONPath

**在JMESPath主页添加**:
- "Also try our JSONPath Online tool" 侧边栏推荐
- 对比页中链接到JSONPath工具

### 内部链接网络

**每个页面底部添加 "Related Tools" 区域**:
- 3-5个相关页面的链接卡片
- 包括：其他JMESPath页面 + JSONPath主页
- 样式与主内容区分开

---

## 📈 分析和监控

### 需要追踪的指标

**用户行为**:
- 页面访问量（每个页面）
- 工具使用次数（查询执行次数）
- CSV导出次数
- 代码复制次数
- 示例点击次数

**参与度**:
- 平均会话时长
- 页面停留时间
- 跳出率
- 页面深度

**转化**:
- 从首页到工具页的转化率
- 从工具页到CSV页的转化率
- 内部链接点击率

**SEO**:
- 自然搜索流量
- 关键词排名变化
- Featured snippet获取情况

### 实现方式
- 使用现有的分析工具（如Google Analytics）
- 保护用户隐私，不收集JSON数据内容
- 所有处理在客户端进行

---

## ⚠️ 注意事项和约束

### 技术约束
1. **必须静态导出**: 所有页面必须能通过 `next build` 导出为静态HTML
2. **无服务端依赖**: JMESPath查询、CSV生成等都在客户端完成
3. **兼容现有构建流程**: 不要修改现有的build配置，除非绝对必要
4. **依赖最小化**: 只添加必需的npm包（jmespath库）

### 内容约束
1. **准确性**: 所有JMESPath语法和示例必须准确无误
2. **AWS CLI数据真实性**: AWS示例必须使用真实的AWS CLI输出格式
3. **SEO合规**: 不使用黑帽SEO技术，内容必须对用户有价值
4. **版权**: 代码示例可以参考官方文档，但要改写，不要直接复制

### 用户体验约束
1. **无需注册**: 所有功能完全免费，无需用户注册或登录
2. **隐私保护**: 不上传用户的JSON数据到服务器
3. **无广告**: 工具区域不显示广告（页面底部可以有sponsor链接）
4. **浏览器兼容性**: 支持Chrome、Firefox、Safari、Edge最新两个版本

### 设计约束
1. **一致性优先**: 与现有JSONPath页面保持视觉一致性
2. **无自定义CSS**: 只使用Tailwind CSS类，不添加自定义CSS文件
3. **深色模式强制**: 所有新组件必须支持深色模式
4. **可访问性**: WCAG 2.1 AA级标准

---

## 🚀 成功标准

### 3个月目标 (MVP上线后)

**SEO目标**:
- "jmespath online" 排名前5
- "jmespath create csv" 排名前3
- "jmespath tester" 排名前10
- 至少5个长尾词排名前3

**流量目标**:
- 月访问量 3000+ UV
- 月查询执行 5000+ 次
- CSV导出 1000+ 次

**用户体验目标**:
- 跳出率 < 60%
- 平均会话时长 > 2分钟
- 移动端访问占比 > 30%

### 6个月目标

**SEO目标**:
- "jmespath" 主词排名前10
- 获得至少1个Featured Snippet
- 10个以上关键词排名前10

**流量目标**:
- 月访问量 8000+ UV
- 成为Google搜索"jmespath"的第一页结果

**品牌目标**:
- 被至少5个技术博客/文章引用
- Stack Overflow答案中被推荐
- AWS论坛/Reddit中被提及

---

## 📋 交付清单

### 页面交付
- [ ] /jmespath 主工具页
- [ ] /jmespath/create-csv CSV专题页
- [ ] /jmespath/python Python指南页
- [ ] /jmespath/aws-cli AWS CLI指南页
- [ ] /jmespath/examples 示例库页
- [ ] /jmespath/functions 函数文档页
- [ ] /jmespath/vs-jsonpath 对比页
- [ ] /jmespath/vs-jq 对比页

### 功能交付
- [ ] JMESPath查询引擎（客户端）
- [ ] CSV导出功能（基础 + 预览 + 自定义选项）
- [ ] 代码生成器（6种语言）
- [ ] 快速示例系统
- [ ] 错误处理和用户反馈

### 内容交付
- [ ] 10个真实AWS CLI场景（带完整JSON输出）
- [ ] 60+个JMESPath示例（分类整理）
- [ ] 所有JMESPath函数的文档
- [ ] 每页的FAQ内容
- [ ] SEO优化的meta信息

### 集成交付
- [ ] 导航栏更新（添加JMESPath链接）
- [ ] 首页交叉引流区域
- [ ] sitemap.xml更新
- [ ] robots.txt检查
- [ ] 内部链接网络建立

### 质量检查
- [ ] 所有页面能成功静态导出
- [ ] 深色模式完美支持
- [ ] 移动端响应式正常
- [ ] 所有链接有效（无404）
- [ ] SEO meta标签完整
- [ ] JSON-LD数据验证通过
- [ ] 浏览器兼容性测试通过
- [ ] 性能测试通过（Lighthouse >90分）

---

## 💡 开发提示

### 复用现有资源
- JsonPathPlayground组件可以作为JmesPathPlayground的模板
- useJsonPath hook可以参考创建useJmesPath
- 现有的codegen.ts可以扩展为jmespath-codegen.ts
- SyntaxTable组件可以复制为JmesPathSyntaxTable

### AWS CLI数据获取
如果需要真实的AWS CLI输出示例，可以使用以下命令（需要AWS账号）:
```bash
aws ec2 describe-instances --region us-east-1
aws s3api list-buckets
aws lambda list-functions
aws iam list-users
# 等等
```

或者使用AWS官方文档中的示例输出。

### JMESPath规范参考
- 官方网站: https://jmespath.org/
- 规范: https://jmespath.org/specification.html
- 示例: https://jmespath.org/examples.html
- 教程: https://jmespath.org/tutorial.html

### 测试JMESPath表达式
在开发过程中可以使用 https://jmespath.org/ 官方工具测试表达式的正确性。

---

## 🎯 最后的话

这是一个**高价值、低竞争**的SEO机会。核心成功因素是：

1. **真正解决用户痛点**: JMESPath确实不支持CSV，我们填补了这个空白
2. **提供实际可用的工具**: 不只是文章，而是真正的在线工具
3. **内容质量**: 真实的AWS示例、完整的教程、清晰的文档
4. **用户体验**: 简单易用、零学习成本、即时反馈

请将产品思维贯穿整个开发过程。每个功能、每个文案、每个示例都要问：**这对用户有价值吗？这能解决他们的问题吗？**

祝开发顺利！🚀
