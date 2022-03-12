import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Lead' })
export class LeadEntity {
  @PrimaryColumn({
    type: 'char',
    length: 36,
  })
  id: string;

  @Column({
    type: 'bigint',
  })
  dataInsercao: number;

  @Column({
    type: 'char',
    length: 100,
  })
  nome: string;

  @Column({
    type: 'bigint',
  })
  telefone: number;

  @Column({
    type: 'char',
    length: 36,
    nullable: true,
  })
  agentId: string;
}
