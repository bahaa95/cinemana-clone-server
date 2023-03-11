import { EpisodeDocument, EpisodeModel } from '../model';
import { EpisodeService as IEpisodeService } from './types';

// ! don't return the value for private methods to clients or admins it's for internal usage only.
// ! only return the value for public methods.

export class EpisodeService implements IEpisodeService {
  private readonly Episode: EpisodeModel;

  constructor(_EpisodeModel: EpisodeModel) {
    this.Episode = _EpisodeModel;
  }

  /**
   * @access public dashboard
   */
  public addEpisode: IEpisodeService['addEpisode'] = async (episode) => {
    let newEpisode = await new this.Episode(episode).save();
    return newEpisode;
  };

  /**
   * @access public dashboard
   */
  public editEpisode: IEpisodeService['editEpisode'] = async (_id, episode) => {
    let editedEpisode = await this.Episode.findOneAndUpdate(
      { _id },
      {
        $set: episode,
      },
      { new: true },
    );

    return editedEpisode;
  };

  /**
   * @access public dashboard
   */
  public deleteEpisode: IEpisodeService['deleteEpisode'] = async (_id) => {
    let deletedEpisode = await this.Episode.findOneAndDelete({ _id });
    return deletedEpisode;
  };

  /**
   * @access public dashboard
   */
  public deleteSeasonEpisodes: IEpisodeService['deleteSeasonEpisodes'] = async (
    seasonId,
  ) => {
    // get episodes before deleting
    let episodes = await this.Episode.aggregate<EpisodeDocument>([
      { $match: { seasonId } },
    ]);

    // delete episodes
    await this.Episode.deleteMany({ seasonId });

    return episodes;
  };

  /**
   * @access public dashboard
   */
  public deleteVideoEpisodes: IEpisodeService['deleteVideoEpisodes'] = async (
    videoId,
  ) => {
    // get episodes before deleting
    let episodes = await this.Episode.aggregate<EpisodeDocument>([
      { $match: { videoId } },
    ]);

    // delete episodes
    await this.Episode.deleteMany({ videoId });

    return episodes;
  };

  /**
   * @access private
   */
  public getEpisodeById: IEpisodeService['getEpisodeById'] = async (_id) => {
    let episode = await this.Episode.findOne({ _id });
    return episode;
  };
}
