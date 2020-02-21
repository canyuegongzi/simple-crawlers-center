import { Column, Entity, Index, ManyToOne, ObjectID, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
export class Joke {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: string;

  @Column({
    type: 'longtext',
  })
  content: string;

  @Column({ name: 'post_url_hash' })
  @Index({ unique: true })
  uniqueHashKey: string;
}
