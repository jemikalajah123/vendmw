import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm"
import { Comment } from "./Comment";
import { Character } from "./Character";

//episodes
@Entity("episode")
export class Episode extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: "varchar",
    length: 50
  })
  name!: string
  
  @Column({
    type: "timestamp",
  })
  release_date!: Date 

  @Column(
    {
      type: "varchar",
      length: 30
    }
  )
  episode_code!: string 

  @OneToMany(() => Character, (character) => character.episode)
  characters!: Character[]

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments!: Comment[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at!: Date
}

