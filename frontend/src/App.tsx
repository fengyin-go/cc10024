import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Overview from './views/Overview'
import OdsLayerView from './views/ods_layer'
import DwdCleanView from './views/dwd_clean'
import DimTableView from './views/dim_table'
import FactTableView from './views/fact_table'
import EtlPipelineView from './views/etl_pipeline'
import PartitionSchemeView from './views/partition_scheme'
import QualityCheckView from './views/quality_check'
import LineageGraphView from './views/lineage_graph'
import BackfillTaskView from './views/backfill_task'
import DataMerchantView from './views/data_merchant'
import StorageTierView from './views/storage_tier'
import MetaCatalogView from './views/meta_catalog'
import IncrSyncView from './views/incr_sync'
import AuditLogView from './views/audit_log'
import DataMaskView from './views/data_mask'
import AggMartView from './views/agg_mart'

const navItems = [{ label: "运营概览", path: "/" }, { label: "贴源层接入", path: "/ods_layer" }, { label: "明细层清洗", path: "/dwd_clean" }, { label: "维度表建模", path: "/dim_table" }, { label: "事实表建模", path: "/fact_table" }, { label: "ETL管线", path: "/etl_pipeline" }, { label: "分区策略", path: "/partition_scheme" }, { label: "质量监控", path: "/quality_check" }, { label: "血缘图谱", path: "/lineage_graph" }, { label: "历史补数", path: "/backfill_task" }, { label: "数据商户", path: "/data_merchant" }, { label: "存储分层", path: "/storage_tier" }, { label: "元数据目录", path: "/meta_catalog" }, { label: "增量同步", path: "/incr_sync" }, { label: "操作审计", path: "/audit_log" }, { label: "数据脱敏", path: "/data_mask" }, { label: "汇总集市", path: "/agg_mart" }]

export default function App() {
  const [operator] = useState('值班管理员')

  return (
    <div className="app-shell">
      <aside className="app-side">
        <h1 className="app-title">企业数据仓库治理平台</h1>
        <nav className="nav-list">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-item">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <header className="app-head">
          <span className="head-desc">面向企业级数据仓库的分层建模、ETL编排、质量监控、血缘追踪与数据治理的开发运营平台。</span>
          <span className="head-user">当前值班：{operator}</span>
        </header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/ods_layer" element={<OdsLayerView />} />
          <Route path="/dwd_clean" element={<DwdCleanView />} />
          <Route path="/dim_table" element={<DimTableView />} />
          <Route path="/fact_table" element={<FactTableView />} />
          <Route path="/etl_pipeline" element={<EtlPipelineView />} />
          <Route path="/partition_scheme" element={<PartitionSchemeView />} />
          <Route path="/quality_check" element={<QualityCheckView />} />
          <Route path="/lineage_graph" element={<LineageGraphView />} />
          <Route path="/backfill_task" element={<BackfillTaskView />} />
          <Route path="/data_merchant" element={<DataMerchantView />} />
          <Route path="/storage_tier" element={<StorageTierView />} />
          <Route path="/meta_catalog" element={<MetaCatalogView />} />
          <Route path="/incr_sync" element={<IncrSyncView />} />
          <Route path="/audit_log" element={<AuditLogView />} />
          <Route path="/data_mask" element={<DataMaskView />} />
          <Route path="/agg_mart" element={<AggMartView />} />
        </Routes>
      </main>
    </div>
  )
}
