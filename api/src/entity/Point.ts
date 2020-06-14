import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ name: 'whatsapp', length: 20 })
  whatsapp: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ name: 'city', length: 50 })
  city: string;

  @Column('char', { length: 2 })
  uf: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Point;
