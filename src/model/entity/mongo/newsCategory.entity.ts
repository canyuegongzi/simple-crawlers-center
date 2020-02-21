import { Column, Entity, Index, ObjectID, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
export class NewsCategory {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  flag: number;

  @Column()
  code: string;
}
