import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Vendedor' })
export class AgentEntity {
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
    type: 'char',
    length: 6,
  })
  nivel: string;

  @Column({
    type: 'float',
  })
  multiplicador: number;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  ultimoLead: number;
}
