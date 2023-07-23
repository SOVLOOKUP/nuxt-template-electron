FROM dockerproxy.com/library/node:alpine AS build-env

RUN mkdir -p /build

# 编译构建
COPY ./ /build
WORKDIR /build
RUN npm config set registry https://registry.npmmirror.com
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build


FROM dockerproxy.com/library/node:alpine

# 从 build 镜像中获取构建产物
RUN mkdir -p /app
COPY --from=build-env /build/.output /app

#移动工作目录到 /app
WORKDIR /app

# 暴露 3000 端口
EXPOSE 3000

#设置node环境变量为production
ENV NODE_ENV=production

#设置容器启动时执行的命令
ENTRYPOINT ["node","./server/index.mjs" ]