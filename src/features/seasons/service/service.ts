import { SeasonModel } from '../model';
import { SeasonService as ISeasonService } from './types';

export class SeasonService implements ISeasonService {
  private readonly Season: SeasonModel;

  constructor(_SeasonModel: SeasonModel) {
    this.Season = _SeasonModel;
  }

  /**
   * @public
   */
  public addSeason: ISeasonService['addSeason'] = async (season) => {
    let newSeason = await new this.Season(season).save();
    return newSeason;
  };

  /**
   * @public
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
   * @public
   */
  public deleteSeason: ISeasonService['deleteSeason'] = async (_id) => {
    let deletedSeason = await this.Season.findByIdAndDelete({ _id });
    return deletedSeason;
  };

  /**
   * @public
   */
  public getSeasons: ISeasonService['getSeasons'] = async () => {
    let seasons = await this.Season.aggregate([{ $match: {} }]);
    return seasons;
  };
}
