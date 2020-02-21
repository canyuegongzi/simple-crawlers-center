import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SystemConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  desc: string;

  @Column( {select: false} )
  email: string;

  @Column()
  userId: string;

  @Column({
    type: 'longtext',
  })
  config: string;

  @Column({
    type: 'longtext',
  })
  configTemplate: string;
}
