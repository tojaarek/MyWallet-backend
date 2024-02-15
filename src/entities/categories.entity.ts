import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'categories' })
@Unique(['id'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
