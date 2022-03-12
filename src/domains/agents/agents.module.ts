import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentEntity } from '@/entities/agent.entity';
import { AgentsController } from './controllers/agents/agents.controller';
import { AgentsService } from './services/agents/agents.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
