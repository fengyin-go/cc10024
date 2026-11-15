"""业务模块路由汇总。

这里统一按别名导入再暴露 ROUTERS：模块名有可能和内置名撞车（某个业务模块就叫 dict、list
这种名字时），按名字直接 import 会把内置类型覆盖掉，函数注解在运行时求值就会报
'module' object is not subscriptable。
"""
from __future__ import annotations

from app.routers import ods_layer as router_ods_layer
from app.routers import dwd_clean as router_dwd_clean
from app.routers import dim_table as router_dim_table
from app.routers import fact_table as router_fact_table
from app.routers import etl_pipeline as router_etl_pipeline
from app.routers import partition_scheme as router_partition_scheme
from app.routers import quality_check as router_quality_check
from app.routers import lineage_graph as router_lineage_graph
from app.routers import backfill_task as router_backfill_task
from app.routers import data_merchant as router_data_merchant
from app.routers import storage_tier as router_storage_tier
from app.routers import meta_catalog as router_meta_catalog
from app.routers import incr_sync as router_incr_sync
from app.routers import audit_log as router_audit_log
from app.routers import data_mask as router_data_mask
from app.routers import agg_mart as router_agg_mart

ROUTERS = [router_ods_layer, router_dwd_clean, router_dim_table, router_fact_table, router_etl_pipeline, router_partition_scheme, router_quality_check, router_lineage_graph, router_backfill_task, router_data_merchant, router_storage_tier, router_meta_catalog, router_incr_sync, router_audit_log, router_data_mask, router_agg_mart]
