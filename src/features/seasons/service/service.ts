import { ObjectId } from '@/types';
import { SeasonModel } from '../model';
import { SeasonService as ISeasonService } from './types';

// ! don't return the value for private methods to clients or admins it's for internal usage only.
// ! only return the value for public methods.

export class SeasonService implements ISeasonService {
  private readonly Season: SeasonModel;

  constructor(_SeasonModel: SeasonModel) {
    this.Season = _SeasonModel;
  }

  /**
   * @access public dashboard
   */
  public addSeason: ISeasonService['addSeason'] = async (season) => {
    let newSeason = await new this.Season(season).save();
    return newSeason;
  };

  /**
   * @access public dashboard
   */
  public editSeason: ISeasonService['editSeason'] = async (_id, season) => {
    let editedSeason = await this.Season.findOneAndUpdate(
      { _id },
      {
        $set: season,
      },
      { new: true },
    );

    return editedSeason;
  };

  /**
   * @access public dashboard
   */
  public deleteSeason: ISeasonService['deleteSeason'] = async (_id) => {
    let deletedSeason = await this.Season.findByIdAndDelete({ _id });
    return deletedSeason;
  };

  /**
   * @access public dashboard
   */
  public deleteVideoSeasons: ISeasonService['deleteVideoSeasons'] = async (
    videoId,
  ) => {
    await this.Season.deleteMany({ videoId });
  };

  /**
   * @access public dashboard
   */
  public getSeasons: ISeasonService['getSeasons'] = async () => {
    let seasons = await this.Season.aggregate([{ $match: {} }]);
    return seasons;
  };
}
