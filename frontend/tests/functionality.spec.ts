import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

type ModuleCase = {
  key: string
  fields: string[]
  actions: string[]
  actionTargets: string[]
}

const modules: ModuleCase[] = [
  {
    "key": "ods_layer",
    "fields": [
      "原始集编号",
      "来源系统",
      "落地路径",
      "文件格式",
      "分区字段",
      "接收周期",
      "保留天数",
      "校验表达式"
    ],
    "actions": [
      "字段验证",
      "确认接入",
      "归档数据集"
    ],
    "actionTargets": [
      "待验证",
      "已接入",
      "已归档"
    ]
  },
  {
    "key": "dwd_clean",
    "fields": [
      "清洗编号",
      "来源原始集",
      "空值策略",
      "异常阈值",
      "格式规约",
      "类型转换",
      "过滤条件",
      "输出明细集"
    ],
    "actions": [
      "规则验证",
      "激活任务",
      "废弃任务"
    ],
    "actionTargets": [
      "待验证",
      "已生效",
      "已废弃"
    ]
  },
  {
    "key": "dim_table",
    "fields": [
      "维度编号",
      "维度名称",
      "自然键列",
      "代理键列",
      "缓慢变化策略",
      "生效日期",
      "失效日期",
      "刷新周期"
    ],
    "actions": [
      "模型验证",
      "发布维度",
      "冻结维度"
    ],
    "actionTargets": [
      "待验证",
      "已发布",
      "已冻结"
    ]
  },
  {
    "key": "fact_table",
    "fields": [
      "事实编号",
      "事实名称",
      "粒度声明",
      "关联维度",
      "度量集合",
      "时间字段",
      "主键组合",
      "增量标记"
    ],
    "actions": [
      "模型验证",
      "发布事实",
      "冻结事实"
    ],
    "actionTargets": [
      "待验证",
      "已发布",
      "已冻结"
    ]
  },
  {
    "key": "etl_pipeline",
    "fields": [
      "管线编号",
      "上游数据集",
      "下游数据集",
      "转换脚本",
      "依赖管线",
      "调度周期",
      "失败策略",
      "并发上限"
    ],
    "actions": [
      "语法验证",
      "部署管线",
      "停用管线"
    ],
    "actionTargets": [
      "待验证",
      "已部署",
      "已停用"
    ]
  },
  {
    "key": "partition_scheme",
    "fields": [
      "方案编号",
      "目标表名",
      "分区键",
      "分区粒度",
      "保留天数",
      "冷热分界",
      "预建天数",
      "存储路径"
    ],
    "actions": [
      "策略验证",
      "应用策略",
      "撤销策略"
    ],
    "actionTargets": [
      "待验证",
      "已应用",
      "已撤销"
    ]
  },
  {
    "key": "quality_check",
    "fields": [
      "规则编号",
      "校验数据集",
      "目标字段",
      "校验类型",
      "期望阈值",
      "告警级别",
      "阻断标志",
      "采样比例"
    ],
    "actions": [
      "规则验证",
      "启用规则",
      "停用规则"
    ],
    "actionTargets": [
      "待验证",
      "已启用",
      "已停用"
    ]
  },
  {
    "key": "lineage_graph",
    "fields": [
      "关系编号",
      "上游节点",
      "下游节点",
      "源字段",
      "目标字段",
      "转换类型",
      "记录批次",
      "关系版本"
    ],
    "actions": [
      "路径验证",
      "确认生效",
      "标记过时"
    ],
    "actionTargets": [
      "已验证",
      "已生效",
      "已过时"
    ]
  },
  {
    "key": "backfill_task",
    "fields": [
      "补数编号",
      "目标数据集",
      "开始日期",
      "截止日期",
      "并行度",
      "覆盖模式",
      "完成水位",
      "失败区间"
    ],
    "actions": [
      "提交补数",
      "执行补数",
      "终止补数"
    ],
    "actionTargets": [
      "待执行",
      "执行中",
      "已完成"
    ]
  },
  {
    "key": "data_merchant",
    "fields": [
      "商品编号",
      "数据集名称",
      "字段清单",
      "访问方式",
      "刷新频率",
      "缓存时长",
      "调用上限",
      "负责人"
    ],
    "actions": [
      "提交审批",
      "上架商品",
      "下架商品"
    ],
    "actionTargets": [
      "待审批",
      "已上架",
      "已下架"
    ]
  },
  {
    "key": "storage_tier",
    "fields": [
      "配置编号",
      "目标表名",
      "当前层级",
      "迁移条件",
      "目标层级",
      "迁移周期",
      "压缩算法",
      "归档路径"
    ],
    "actions": [
      "条件验证",
      "执行分层",
      "撤销配置"
    ],
    "actionTargets": [
      "待验证",
      "已生效",
      "已撤销"
    ]
  },
  {
    "key": "meta_catalog",
    "fields": [
      "目录编号",
      "数据对象",
      "字段名称",
      "字段类型",
      "业务含义",
      "技术负责人",
      "更新时间",
      "标签集合"
    ],
    "actions": [
      "提交审核",
      "发布元数据",
      "废弃条目"
    ],
    "actionTargets": [
      "待审核",
      "已发布",
      "已废弃"
    ]
  },
  {
    "key": "incr_sync",
    "fields": [
      "同步编号",
      "源表名",
      "目标表",
      "增量字段",
      "上次水位",
      "批次大小",
      "数据校验",
      "故障恢复"
    ],
    "actions": [
      "验证水位",
      "启用同步",
      "停用同步"
    ],
    "actionTargets": [
      "待验证",
      "已启用",
      "已停用"
    ]
  },
  {
    "key": "audit_log",
    "fields": [
      "审计编号",
      "操作对象",
      "操作类型",
      "操作人",
      "操作时间",
      "变更摘要",
      "影响行数",
      "回滚标识"
    ],
    "actions": [
      "查看详情",
      "归档记录"
    ],
    "actionTargets": [
      "已归档",
      "已过期"
    ]
  },
  {
    "key": "data_mask",
    "fields": [
      "规则编号",
      "目标字段",
      "脱敏算法",
      "掩码格式",
      "保留长度",
      "适用角色",
      "生效日期",
      "到期日期"
    ],
    "actions": [
      "效果验证",
      "启用脱敏",
      "停用脱敏"
    ],
    "actionTargets": [
      "待验证",
      "已启用",
      "已停用"
    ]
  },
  {
    "key": "agg_mart",
    "fields": [
      "模型编号",
      "模型名称",
      "来源数据集",
      "聚合维度",
      "度量指标",
      "时间粒度",
      "预计算策略",
      "刷新周期"
    ],
    "actions": [
      "模型验证",
      "发布模型",
      "冻结模型"
    ],
    "actionTargets": [
      "待验证",
      "已发布",
      "已冻结"
    ]
  }
]
const repoKind = 'fullstack'

function parseCsv(text: string): string[][] {
  const records: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  const input = text.replace(/^\uFEFF/, '')
  for (let index = 0; index < input.length; index++) {
    const char = input[index]
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') {
        cell += '"'
        index++
      } else if (char === '"') {
        quoted = false
      } else {
        cell += char
      }
    } else if (char === '"' && cell === '') {
      quoted = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell.replace(/\r$/, ''))
      if (row.some((value) => value !== '')) records.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }
  row.push(cell.replace(/\r$/, ''))
  if (row.some((value) => value !== '')) records.push(row)
  return records
}

test('所有模块的查询、登记、动作、导出和指标均可用', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', (error) => browserErrors.push(error.message))
  page.on('response', (response) => {
    if (response.url().includes('/api/') && response.status() >= 400) {
      browserErrors.push(`${response.status()} ${response.url()}`)
    }
  })

  for (const module of modules) {
    await page.goto(`/${module.key}`)
    const bodyRows = page.locator('tbody tr[data-testid^="row-"]')
    await expect(bodyRows).toHaveCount(3)
    const firstValue = await bodyRows.nth(0).locator('td').nth(0).innerText()
    const secondValue = await bodyRows.nth(1).locator('td').nth(0).innerText()

    // 正向查询必须只保留命中行，导出也必须遵循同一筛选条件。
    await page.getByTestId(`filter-${module.fields[0]}`).fill(firstValue)
    await page.getByTestId('query').click()
    await expect(bodyRows).toHaveCount(1)
    await expect(bodyRows.first()).toContainText(firstValue)
    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${module.key}.csv`)
    const downloadPath = await download.path()
    expect(downloadPath).not.toBeNull()
    const csv = parseCsv(await readFile(downloadPath as string, 'utf-8'))
    expect(csv[0]).toEqual(['id', ...module.fields, 'status'])
    expect(csv).toHaveLength(2)
    expect(csv[1][1]).toBe(firstValue)
    expect(csv[1][1]).not.toBe(secondValue)

    // 无结果和重置也必须真实改变页面，而非仅发起一个被后端忽略的请求。
    await page.getByTestId(`filter-${module.fields[0]}`).fill('__必定无结果__')
    await page.getByTestId('query').click()
    await expect(bodyRows).toHaveCount(0)
    await expect(page.locator('tbody')).toContainText('暂无')
    await page.getByTestId('reset').click()
    await expect(bodyRows).toHaveCount(3)

    if (repoKind === 'fullstack') {
      const invalidCreate = await page.request.post(`/api/${module.key}`, { data: {} })
      expect(invalidCreate.ok()).toBe(true)
      expect((await invalidCreate.json()).ok).toBe(false)
    }

    const createdValues = module.fields.map((field, index) => `验收-${module.key}-${index + 1}`)
    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [index, field] of module.fields.entries()) {
      await page.getByTestId(`create-${field}`).fill(createdValues[index])
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
    await expect(bodyRows).toHaveCount(4)
    const createdRow = page.locator('tbody tr').filter({ hasText: createdValues[0] })
    await expect(createdRow).toHaveCount(1)
    await expect(page.locator('.stat-value').first()).toHaveText('4')

    if (repoKind === 'frontend-only') {
      await page.reload()
      await expect(page.locator('tbody tr').filter({ hasText: createdValues[0] })).toHaveCount(1)
    }

    for (const [index, action] of module.actions.entries()) {
      await createdRow.getByRole('button', { name: action, exact: true }).click()
      await expect(createdRow).toHaveAttribute('data-status', module.actionTargets[index])
    }
  }

  // 所有模块各新增一条后，概览必须汇总到 72；本地形态另点一次重新统计。
  await page.goto('/')
  await expect(page.locator('.stat-value').nth(1)).toHaveText(String(modules.length * 4))
  if (repoKind === 'frontend-only') {
    await page.getByRole('button', { name: '重新统计', exact: true }).click()
    await expect(page.locator('.stat-value').nth(1)).toHaveText(String(modules.length * 4))
  }
  expect(browserErrors).toEqual([])
})
