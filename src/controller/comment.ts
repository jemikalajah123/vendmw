import { Router, Response, Request } from "express";
import { createQueryBuilder } from 'typeorm';
import { Comment } from '../entities/Comment'; // import service

export class CommentController {
  public router: Router;

  constructor(){
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const comments = await createQueryBuilder(
      'comment'
    )
      .select(['comment.ip_address_location','comment.created_at'])
      .from(Comment, 'comment')
        .orderBy('comment.created_at', 'DESC')
      .getMany();
  
    return res.json(comments);
  } 

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('', this.index);

  }
}