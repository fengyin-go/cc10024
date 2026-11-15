"""接口出入参模型：列表分页、动作结果与各模块的明细结构。"""
from __future__ import annotations

from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class PageResult(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int = 1
    size: int = 20


class ActionResult(BaseModel):
    ok: bool
    message: str
    entry: dict[str, Any] | None = None


class EntryPayload(BaseModel):
    """登记或修改一条业务记录时提交的字段集合。"""

    values: dict[str, Any] = Field(default_factory=dict)
    remark: str | None = None


class ActionPayload(BaseModel):
    """状态动作使用独立契约，避免与登记的 values 载荷混用。"""

    action: str
    remark: str | None = None



class OdsLayerEntry(BaseModel):
    """原始集明细结构。"""

    field_0: str | None = None  # 原始集编号
    field_1: str | None = None  # 来源系统
    field_2: str | None = None  # 落地路径
    field_3: str | None = None  # 文件格式
    field_4: str | None = None  # 分区字段
    field_5: str | None = None  # 接收周期
    field_6: str | None = None  # 保留天数
    field_7: str | None = None  # 校验表达式

class DwdCleanEntry(BaseModel):
    """清洗任务明细结构。"""

    field_0: str | None = None  # 清洗编号
    field_1: str | None = None  # 来源原始集
    field_2: str | None = None  # 空值策略
    field_3: str | None = None  # 异常阈值
    field_4: str | None = None  # 格式规约
    field_5: str | None = None  # 类型转换
    field_6: str | None = None  # 过滤条件
    field_7: str | None = None  # 输出明细集

class DimTableEntry(BaseModel):
    """维度表明细结构。"""

    field_0: str | None = None  # 维度编号
    field_1: str | None = None  # 维度名称
    field_2: str | None = None  # 自然键列
    field_3: str | None = None  # 代理键列
    field_4: str | None = None  # 缓慢变化策略
    field_5: str | None = None  # 生效日期
    field_6: str | None = None  # 失效日期
    field_7: str | None = None  # 刷新周期

class FactTableEntry(BaseModel):
    """事实表明细结构。"""

    field_0: str | None = None  # 事实编号
    field_1: str | None = None  # 事实名称
    field_2: str | None = None  # 粒度声明
    field_3: str | None = None  # 关联维度
    field_4: str | None = None  # 度量集合
    field_5: str | None = None  # 时间字段
    field_6: str | None = None  # 主键组合
    field_7: str | None = None  # 增量标记

class EtlPipelineEntry(BaseModel):
    """处理管线明细结构。"""

    field_0: str | None = None  # 管线编号
    field_1: str | None = None  # 上游数据集
    field_2: str | None = None  # 下游数据集
    field_3: str | None = None  # 转换脚本
    field_4: str | None = None  # 依赖管线
    field_5: str | None = None  # 调度周期
    field_6: str | None = None  # 失败策略
    field_7: str | None = None  # 并发上限

class PartitionSchemeEntry(BaseModel):
    """分区方案明细结构。"""

    field_0: str | None = None  # 方案编号
    field_1: str | None = None  # 目标表名
    field_2: str | None = None  # 分区键
    field_3: str | None = None  # 分区粒度
    field_4: str | None = None  # 保留天数
    field_5: str | None = None  # 冷热分界
    field_6: str | None = None  # 预建天数
    field_7: str | None = None  # 存储路径

class QualityCheckEntry(BaseModel):
    """质量规则明细结构。"""

    field_0: str | None = None  # 规则编号
    field_1: str | None = None  # 校验数据集
    field_2: str | None = None  # 目标字段
    field_3: str | None = None  # 校验类型
    field_4: str | None = None  # 期望阈值
    field_5: str | None = None  # 告警级别
    field_6: str | None = None  # 阻断标志
    field_7: str | None = None  # 采样比例

class LineageGraphEntry(BaseModel):
    """血缘关系明细结构。"""

    field_0: str | None = None  # 关系编号
    field_1: str | None = None  # 上游节点
    field_2: str | None = None  # 下游节点
    field_3: str | None = None  # 源字段
    field_4: str | None = None  # 目标字段
    field_5: str | None = None  # 转换类型
    field_6: str | None = None  # 记录批次
    field_7: str | None = None  # 关系版本

class BackfillTaskEntry(BaseModel):
    """补数任务明细结构。"""

    field_0: str | None = None  # 补数编号
    field_1: str | None = None  # 目标数据集
    field_2: str | None = None  # 开始日期
    field_3: str | None = None  # 截止日期
    field_4: str | None = None  # 并行度
    field_5: str | None = None  # 覆盖模式
    field_6: str | None = None  # 完成水位
    field_7: str | None = None  # 失败区间

class DataMerchantEntry(BaseModel):
    """数据商品明细结构。"""

    field_0: str | None = None  # 商品编号
    field_1: str | None = None  # 数据集名称
    field_2: str | None = None  # 字段清单
    field_3: str | None = None  # 访问方式
    field_4: str | None = None  # 刷新频率
    field_5: str | None = None  # 缓存时长
    field_6: str | None = None  # 调用上限
    field_7: str | None = None  # 负责人

class StorageTierEntry(BaseModel):
    """分层配置明细结构。"""

    field_0: str | None = None  # 配置编号
    field_1: str | None = None  # 目标表名
    field_2: str | None = None  # 当前层级
    field_3: str | None = None  # 迁移条件
    field_4: str | None = None  # 目标层级
    field_5: str | None = None  # 迁移周期
    field_6: str | None = None  # 压缩算法
    field_7: str | None = None  # 归档路径

class MetaCatalogEntry(BaseModel):
    """元数据项明细结构。"""

    field_0: str | None = None  # 目录编号
    field_1: str | None = None  # 数据对象
    field_2: str | None = None  # 字段名称
    field_3: str | None = None  # 字段类型
    field_4: str | None = None  # 业务含义
    field_5: str | None = None  # 技术负责人
    field_6: str | None = None  # 更新时间
    field_7: str | None = None  # 标签集合

class IncrSyncEntry(BaseModel):
    """同步配置明细结构。"""

    field_0: str | None = None  # 同步编号
    field_1: str | None = None  # 源表名
    field_2: str | None = None  # 目标表
    field_3: str | None = None  # 增量字段
    field_4: str | None = None  # 上次水位
    field_5: str | None = None  # 批次大小
    field_6: str | None = None  # 数据校验
    field_7: str | None = None  # 故障恢复

class AuditLogEntry(BaseModel):
    """审计记录明细结构。"""

    field_0: str | None = None  # 审计编号
    field_1: str | None = None  # 操作对象
    field_2: str | None = None  # 操作类型
    field_3: str | None = None  # 操作人
    field_4: str | None = None  # 操作时间
    field_5: str | None = None  # 变更摘要
    field_6: str | None = None  # 影响行数
    field_7: str | None = None  # 回滚标识

class DataMaskEntry(BaseModel):
    """脱敏规则明细结构。"""

    field_0: str | None = None  # 规则编号
    field_1: str | None = None  # 目标字段
    field_2: str | None = None  # 脱敏算法
    field_3: str | None = None  # 掩码格式
    field_4: str | None = None  # 保留长度
    field_5: str | None = None  # 适用角色
    field_6: str | None = None  # 生效日期
    field_7: str | None = None  # 到期日期

class AggMartEntry(BaseModel):
    """汇总模型明细结构。"""

    field_0: str | None = None  # 模型编号
    field_1: str | None = None  # 模型名称
    field_2: str | None = None  # 来源数据集
    field_3: str | None = None  # 聚合维度
    field_4: str | None = None  # 度量指标
    field_5: str | None = None  # 时间粒度
    field_6: str | None = None  # 预计算策略
    field_7: str | None = None  # 刷新周期
