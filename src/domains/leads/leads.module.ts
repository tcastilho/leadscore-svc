import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LeadEntity } from '@/entities/lead.entity';
import { AgentsModule } from '../agents/agents.module';
import { LeadsController } from './controllers/leads/leads.controller';
import { LeadsService } from './services/leads/leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity]), AgentsModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
