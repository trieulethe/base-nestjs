import { Sequelize } from 'sequelize-typescript';
import { UserModel } from 'src/model/user.entity';
import { DATABASE } from 'src/shared/helper/config';

const models = [UserModel];

const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      await initDatabase();
    },
  },
];

const sequelize = new Sequelize({
  ...DATABASE,
});

async function initDatabase() {
  // sequelize model
  sequelize.addModels(models);

  return await sequelize.sync().then(async () => {
    console.log('generate database done');
  });
}

export { databaseProviders, models, initDatabase, sequelize };
