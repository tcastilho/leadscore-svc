import { TypeOrmModule } from '@nestjs/typeorm';

export const typeORMConnection = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env['MYSQL_HOST_NAME'],
  port: Number(process.env['MYSQL_HOST_PORT']),
  username: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: 'Leadscore',
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  keepConnectionAlive: true,
  synchronize: false,
});
