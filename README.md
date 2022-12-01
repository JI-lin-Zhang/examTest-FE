# 开发知识测试项目
    这是一个在线问卷答题测试项目，为了方便企业或者个人进行人员初筛、问卷调查以及在线做题等服务。

# 安装
    npm install

# 打包
    npm run build

# 运行
    npm run start

# eslint
    npm run lint -- --fix

# problem
     引入antd.css报错，原因是因为使用的react-script 5.0.0的版本 引入的css包 换成 antd.min.css 解决
# Reusing styles by `@apply` directive
For example.
```
@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
```

You can add a new class under `.btn-primary`, like `.container`.
```
@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
  .container {
    @apply flex flex-col items-center;
  }
}
```