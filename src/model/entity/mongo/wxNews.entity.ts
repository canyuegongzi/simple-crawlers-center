import { Column, Entity, Index, ManyToOne, ObjectID, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
export class WxNews {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  authorName: string;

  @Column()
  url: string;

  @Column({
    type: 'longtext',
  })
  pic: string;

  @Column({})
  @Index({unique: true})
  uniqueHashKey: string;
}
