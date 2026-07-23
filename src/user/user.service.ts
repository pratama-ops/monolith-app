import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; email: string }) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { orders: true }, // <-- ini yang cuma bisa dilakuin di monolith (JOIN langsung)
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}