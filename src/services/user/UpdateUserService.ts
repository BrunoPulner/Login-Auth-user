import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
  endereco: string;
}

class UpdateUserService {
  async execute({ user_id, name, endereco }: UserRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("Usuario não existe!");
      }
      const userUpdate = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          endereco,
        },
        select: {
          name: true,
          email: true,
          endereco: true,
        },
      });

      return userUpdate;
    } catch (error) {
      console.log(error);
      throw new Error("Error ao atualizar o usuario!");
    }
  }
}

export { UpdateUserService };
