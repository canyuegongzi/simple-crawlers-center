import { Column, Entity, Index, ManyToOne, ObjectID, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
export class News {
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

  // @ManyToOne(type => NewsCategory, newsCategory => newsCategory.id)
  @Column()
  newsCategory: string;

  @Column({})
  @Index({unique: true})
  uniqueHashKey: string;
}
