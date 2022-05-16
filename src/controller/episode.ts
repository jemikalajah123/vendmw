import { Router, Response, Request } from "express";
import { Episode } from '../entities/Episode';
import { createQueryBuilder } from 'typeorm';
import { Comment } from '../entities/Comment'; // import service

export class EpisodeController {
  public router: Router;

  constructor(){
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const episodes = await createQueryBuilder(
      'episode'
    )
      .select('episode')
      .from(Episode, 'episode')
      .leftJoin(
        'episode.comments',
        'comment'
      )
      .loadRelationCountAndMap('episode.commentsCount','episode.comments')
      .orderBy('episode.release_date', 'ASC')
      .getMany();
  
    return res.json(episodes);
  } 

  public create = async (req: Request, res: Response) => {
    const { episodeId } = req.params;

		const { comment, ip_address_location } = req.body;

		const episode = await Episode.findOne(
			parseInt(episodeId)
		);

		if (!episode) {
			return res.json({
				msg: 'episode not found',
			});
		}

		const newcomment = await Comment.create({
			comment,
			ip_address_location,
			episode,
		});

		await newcomment.save();
	
		await episode.save();

		return res.json(newcomment);
  }

  public getEpisode = async (req: Request, res: Response) => {
    const { episodeId } = req.params;
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
      .where('episode.id = :episodeId', {
        episodeId: episodeId,
      })
      .getOne();

    return res.json(episodes);
  }


  public searchEpisodes = async (req: Request, res: Response) => {
    const { characterId } = req.params;
    const episodes = await createQueryBuilder(
      'episode'
    )
      .select('episode')
      .from(Episode, 'episode')
      .leftJoinAndSelect(
        'episode.characters',
        'character'
      )
      .where('character.id = :characterId', {
        characterId: characterId,
      })
      .getMany();
  
    return res.json(episodes);
  } 

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('', this.index);
    this.router.post('/:episodeId/comment', this.create);
    this.router.get('/:episodeId', this.getEpisode);
    this.router.get('/search/:characterId', this.searchEpisodes)
  }
}