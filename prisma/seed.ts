import { Document } from '@core/domain/entities/value-object/document';
import { Email } from '@core/domain/entities/value-object/email';
import { User, UserRole } from '@modules/users/entities/user';
import { Category } from '@modules/categories/entities/category';
import { Setting } from '@modules/settings/entities/setting';
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository';
import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-respository';
import { settingsOptions } from '@shared/infra/database/data';
import { Bcrypt } from '@shared/infra/providers/hash/bcrypt';
import { prisma } from '@shared/infra/database/prisma';

async function seed() {
  const usersRepository = new PrismaUsersRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const hash = new Bcrypt();

  const document = new Document('09899291676', 'CPF').value;
  const email = new Email('bruno.clara@yahoo.com').value;

  const existsDocument = await usersRepository.findByDocument(document);
  const existsEmail = await usersRepository.findByEmail(email);

  if (!existsDocument && !existsEmail) {
    const passwordHashed = await hash.generate('algumaSenha123!');

    const user = User.create({
      name: 'Bruno Vilefort',
      document,
      email,
      phone: '+5511985644756',
      balance: 0,
      profilePicture: null,
      birthDate: new Date('1995-06-10'),
      password: passwordHashed,
      role: UserRole.ADMIN,
      status: 'active',
      settings: [],
    });

    user.settings = settingsOptions.map((option) => {
      return Setting.create({
        userId: user.id,
        fieldName: option.fieldName,
        isFieldEnable: option.isFieldEnable,
        isFieldRequired: option.isFieldRequired,
        title: option.title,
        description: option.description,
      });
    });

    await usersRepository.create(user);

    const category = Category.create({
      userId: user.id,
      name: 'padrão',
      type: 'padrão',
      model: 'padrão',
      categoryId: null,
      subcategory: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      user: null,
      categories: null,
      relatedCategories: [],
    });

    await categoriesRepository.create(category);

    console.log(`
User created with success 🎉

Username: 09899291676
Password: algumaSenha123!
    `);
  }
}

seed().then(() => {
  console.log('Database seed completed!');
  prisma.$disconnect();
});
