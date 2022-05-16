import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne,CreateDateColumn, JoinColumn } from "typeorm"
import { Episode } from "./Episode"


//comment
@Entity("comment")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: "varchar",
    length: 250
  })
  comment!: string
  
  @Column({
    type: "varchar",
    length: 100
  })
  ip_address_location!: string 

  @ManyToOne(() => Episode, (episode) => episode.comments,{
    onDelete: 'CASCADE',
  })
  @JoinColumn({
		name: 'episode_id',
	})
  episode!: Episode
  
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at!: Date
}