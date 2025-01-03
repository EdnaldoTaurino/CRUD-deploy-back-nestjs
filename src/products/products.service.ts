import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.products.create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Um produto com esse nome já existe',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new HttpException(
        'Erro ao tentar criar um novo produto',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.products.findMany();
      return products;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao tentar encontrar todos os itens',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.products.findUnique({
        where: { id },
      });
      if (!product) {
        throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new HttpException('erro na solicitação', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.products.update({
        where: { id },
        data: updateProductDto,
      });
      return product;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'O produto com esse nome já existe',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      console.log(error);
      throw new HttpException('Erro ao editar o item', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.products.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            'O item não existe ou já foi deletado',
            HttpStatus.NOT_FOUND,
          );
        }
      }
      console.log(error);
      throw new HttpException('erro ao deletar o item', HttpStatus.BAD_REQUEST);
    }
  }
}
