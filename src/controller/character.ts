import { Router, Response, Request } from "express";
import { createQueryBuilder } from 'typeorm';
import { Character } from '../entities/Character';
import { Episode } from "../entities/Episode";

export class CharacterController {
  public router: Router;

  constructor(){

    this.router = Router();
    this.routes();
  }

  public filter = async (req: Request, res: Response) => {
    console.log(req)
    let { gender,status,location } = req.body;
    const characters = await createQueryBuilder(
      'character'
    )
      .select('character')
      .from(Character, 'character')
          .orWhere('character.gender = :gender', {
        gender: gender,
      })
          .orWhere('character.status = :status', {
        status: status,
      })
          .orWhere('character.location = :location', {
        location: location && location.toLowerCase(),
      })
      .getMany();
  
    return res.json(characters);
  } 

  public sort = async (req: Request, res: Response) => {
    const { sortBy,orderBy} = req.body;
    const characters = await createQueryBuilder(
      'character'
    )
      .select('character')
      .from(Character, 'character')
          .orderBy('character.'+sortBy, orderBy.toUpperCase())
      .getMany();
  
    return res.json(characters);
  }

  public episodeFullView = async (req: Request, res: Response) => {
    const episodes = await createQueryBuilder(
      'episode'
    )
      .select('episode')
      .from(Episode, 'episode')
      .leftJoinAndSelect(
        'episode.comments',
        'comment'
      )
      .leftJoinAndSelect(
        'episode.characters',
        'character'
      )
      .orderBy('episode.release_date', 'ASC')
      .getMany();
  
    return res.json(episodes);
  } 
 

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/filter', this.filter);
    this.router.get('/sort', this.sort);
    this.router.get('', this.episodeFullView);
  
  }
}