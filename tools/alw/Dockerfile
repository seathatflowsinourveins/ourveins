FROM node:22-alpine
WORKDIR /app

# Install Python + uv for MCP client bridge (angles call MCP servers via python_mcp_helper.py)
RUN apk add --no-cache python3 py3-pip && \
    pip3 install --break-system-packages uv && \
    uv pip install --system agent-framework

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY tools/ tools/
COPY .mcp.json ./

# Override bridge Python path for Alpine (not Z:/venvs/claude)
ENV MAF_PYTHON_BIN=/usr/bin/python3
ENV ALW_TICK_INTERVAL_MS=21600000
ENV ALW_HEALTH_PORT=9090
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD node -e "fetch('http://localhost:9090/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "tools/alw/headless-runner.mjs"]
