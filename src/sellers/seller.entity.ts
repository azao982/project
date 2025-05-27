import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telephone: string;
}
