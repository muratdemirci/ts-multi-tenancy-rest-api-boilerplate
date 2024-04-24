import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('version_settings')
export class VersionSettings extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  changelog!: string;

  @Column({ type: 'varchar', length: 50 })
  versionNumber!: string;

  @Column({ type: 'date' })
  buildDate!: Date;

  @Column({ type: 'int' })
  buildNumber!: number;

  @Column({ type: 'int' })
  revision!: number;

  @Column({ default: false })
  isDeleted?: boolean;

  toJSON() {
    delete this.isDeleted;
    return this;
  }
}
