import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column('text')
  public username: string;

  @Column('text')
  public firstName: string;

  @Column('text')
  public lastName: string;

  @Column({ default: false })
  public emailConfirmed: boolean;
}
