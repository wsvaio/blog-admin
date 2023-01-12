👍

## 通用开发配置模板

主要技术：vue3 vite3 ts pinia vue-router element-plus
代码校验：stylelint eslint commitlint husky lint-staged commitizen


## Commit Message 格式
```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
### *type
选择您要提交的更改类型：
- feat: 一个新功能
- fix: 一个bug
- docs: 文档增删改
- style: 样式修改（空白、格式、缺少分号等）
- refactor: 既不修复bug也不添加新功能的更改
- perf: 性能优化
- test: 增加测试
- build: 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）
- ci: 对CI配置文件和脚本的更改（示例范围：Travis，Circle，BrowerStack，SauceLabs）
- revert: 回退历史版本
- conflict: 修改冲突
- font: 字体文件更新
- delete: 删除文件
- stash: 暂存文件
### scope
这个变化的范围是什么（例如组件或文件名）
### *subject
一个简短的修改描述
### body
一个更长的修改描述
### footer
Footer 部分只用于以下两种情况：
- 不兼容改动
  如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法
- 关闭issue
  如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue `Closes #123`
- Revert
  还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header