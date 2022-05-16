import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm"
import { Episode } from "./Episode"


export enum StatusData {
  ACTIVE= "Active",
  DEAD = "Dead",
  UNKNOWN =  "Unknown"
}

export enum GenderData {
  MALE= "Male",
  FEMALE = "Female"
}

@Entity("character")
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number
  
  @Column({
    type: "varchar",
    length: 30
  })
  first_name!: string
  
  @Column({
    type: "varchar",
    length: 30
  })
  last_name!: string 

  @Column({
    type: "enum",
    enum: GenderData,
    default: GenderData.MALE,
})
  gender!: GenderData

  @Column({
    type: "enum",
    enum: StatusData,
    default: StatusData.ACTIVE,
})
  status!: StatusData 

  @Column({
    type: "varchar",
    length: 30,
    nullable: true
  })
  state_of_origin!: string

  @Column({
    type: "varchar",
    length: 30,
    nullable: true
  })
  location!: string

  @ManyToOne(() => Episode, (episode) => episode.characters,{
    onDelete: 'CASCADE',
  })
  @JoinColumn({
		name: 'episode_id',
	})
  episode!: Episode

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at!: Date

}