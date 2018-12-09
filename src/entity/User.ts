import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfile } from './UserProfile';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  public userProfile: UserProfile;
}
