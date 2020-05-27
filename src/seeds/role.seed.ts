import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateDefaultRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      await connection
        .getRepository('Role')
        .save([
          { name: 'admin' },
          { name: 'user' }
        ]);
    } catch (err) {
      console.error(' ## Error running seeds (role)', err);
      process.exit(0);
    }
  }
}