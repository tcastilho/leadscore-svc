import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { typeORMConnection } from './extensions/typeorm.extension';

import { AgentsModule } from './domains/agents/agents.module';
import { LeadsModule } from './domains/leads/leads.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    typeORMConnection,
    AgentsModule,
    LeadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
