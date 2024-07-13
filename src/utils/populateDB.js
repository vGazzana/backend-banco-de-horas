import { PrismaClient } from "@prisma/client";
import { generateHash } from "./crypto.js";

const prisma = new PrismaClient();

// Função para popular o banco de dados
const populateDatabase = async () => {
  try {
    // Criar dois usuários com senhas hashadas
    await prisma.users.createMany({
      data: [
        {
          name: "ADM TESTE",
          email: `adm@adm.com`,
          password: generateHash("admin"),
          type: "ADMINISTRATOR",
        },
        {
          name: "NORMAL TESTE",
          email: `normal@normal.com`,
          password: generateHash("normal"),
          type: "NORMAL",
        },
      ],
    });

    console.log("Usuários criados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  }
};

// Execute a função para popular o banco de dados ao chamar o script
populateDatabase()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
