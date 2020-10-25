# e-commerce-visualization

使用Vue全家桶+ECharts+Koa2+WebSocket搭建的可视化电商平台实时监控系统

# 后台项目

**后台项目目标**

- 计算服务器处理请求的总耗时
- 在响应头根据UR;上加上响应内容的mime类型
- 根据URL读取指定目录下的文件内容

**后台项目的实现步骤**

- 项目准备
- 总耗时中间件
- 响应头中间件
- 业务逻辑中间件
- 允许跨域

## 接口总览

- 商家销量：/api/seller
- 预算开销：/api/budget
- 库存信息：/api/stock
- 销量趋势：/api/trend
- 销量排行：/api/rank
- 商家分布：/api/map
- 热销商品：/api/hotproduct