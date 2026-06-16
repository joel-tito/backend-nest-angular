import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
