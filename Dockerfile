# Baseado na imagem oficial do Node.js, versão 14.15.4, versão slim para reduzir o tamanho da imagem
FROM node:14.15.4-slim

# Define o usuário do container como "node"
USER node

# Define o diretório de trabalho para o app
WORKDIR /home/node/app

# Comando padrão (pode ser alterado para rodar sua aplicação)
CMD ["sh", "-c", "npm install && tail -f /dev/null"]

