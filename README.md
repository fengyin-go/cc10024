# 企业数据仓库治理平台

面向企业级数据仓库的分层建模、ETL编排、质量监控、血缘追踪与数据治理的开发运营平台。

这是一个前后端分离的管理平台：前端 React + Vite + TypeScript，后端 FastAPI（Python）。
两边各自独立启动，前端 dev server 已关掉自动打开页面，启动后按终端打印的地址手工打开。

## 目录结构

```text
.
├── frontend/                 React + Vite + TypeScript 前端
│   ├── src/views/            每个业务模块一个页面
│   ├── src/api/              统一请求封装
│   ├── src/stores/           会话与筛选状态
│   └── vite.config.ts        dev server 配置（open: false）
├── backend/                  FastAPI（Python） 后端
│   ├── app/routers/          每个业务模块一组接口
│   ├── app/services/         业务规则与状态流转
│   └── app/store.py          内存数据仓库与示例数据
├── .gitignore
└── docker-compose.yml
```

## 启动

### 后端

```bash
cd backend
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
./run.sh
```

健康检查：`curl http://127.0.0.1:8000/api/health`

### 前端

```bash
cd frontend
npm ci
npm run dev
```

前端默认监听 `http://127.0.0.1:5173/`，dev server 不会自动打开浏览器，
需要自己访问。`/api` 由 vite 代理到后端 `http://127.0.0.1:8000`。

## 业务模块

| 模块 | 目录 | 业务对象 | 主要字段 |
| --- | --- | --- | --- |
| 贴源层接入 | `ods_layer` | 原始集 | 原始集编号、来源系统、落地路径 |
| 明细层清洗 | `dwd_clean` | 清洗任务 | 清洗编号、来源原始集、空值策略 |
| 维度表建模 | `dim_table` | 维度表 | 维度编号、维度名称、自然键列 |
| 事实表建模 | `fact_table` | 事实表 | 事实编号、事实名称、粒度声明 |
| ETL管线 | `etl_pipeline` | 处理管线 | 管线编号、上游数据集、下游数据集 |
| 分区策略 | `partition_scheme` | 分区方案 | 方案编号、目标表名、分区键 |
| 质量监控 | `quality_check` | 质量规则 | 规则编号、校验数据集、目标字段 |
| 血缘图谱 | `lineage_graph` | 血缘关系 | 关系编号、上游节点、下游节点 |
| 历史补数 | `backfill_task` | 补数任务 | 补数编号、目标数据集、开始日期 |
| 数据商户 | `data_merchant` | 数据商品 | 商品编号、数据集名称、字段清单 |
| 存储分层 | `storage_tier` | 分层配置 | 配置编号、目标表名、当前层级 |
| 元数据目录 | `meta_catalog` | 元数据项 | 目录编号、数据对象、字段名称 |
| 增量同步 | `incr_sync` | 同步配置 | 同步编号、源表名、目标表 |
| 操作审计 | `audit_log` | 审计记录 | 审计编号、操作对象、操作类型 |
| 数据脱敏 | `data_mask` | 脱敏规则 | 规则编号、目标字段、脱敏算法 |
| 汇总集市 | `agg_mart` | 汇总模型 | 模型编号、模型名称、来源数据集 |

## 约定

- 每个模块的前端页面在 `frontend/src/views/<模块>/index.vue`，后端接口在
  `backend/app/routers/<模块>.py`，业务规则在 `backend/app/services/<模块>.py`。
- 列表接口统一返回 `{ items, total, page, size }`，动作接口统一返回 `{ ok, message }`。
- 状态流转只允许在 `app/services` 里改，路由层不做业务判断。

领域：数据工程
子方向：数仓与数据湖
