FROM cypress/included:10.3.0
WORKDIR /e2e

COPY . .
RUN npm install

ENTRYPOINT ["./scripts/entrypoint.sh"]