import { Column, Entity, Index, ManyToOne, ObjectID, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
export class Day {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column({
    type: 'longtext',
  })
  content: string;

  @Column({})
  @Index({unique: true})
  uniqueHashKey: string;
}
