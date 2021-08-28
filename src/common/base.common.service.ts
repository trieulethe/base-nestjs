import * as _ from 'lodash';
import { Op } from 'sequelize';
import { FindAllServiceDto, FindOne } from './base.common.dto';

export class BaseCommonService {
  protected _model;

  async create(dataCreate: any, transaction?) {
    let newInstance = new this._model();
    newInstance = { ...dataCreate };
    return this._model.create(newInstance, {
      transaction,
    });
  }

  findAll(params: FindAllServiceDto) {
    const offset = (params.page - 1) * params.pageSize || 0;
    const limit = params.pageSize || 50;
    const sortBy = params && params.sortByField ? params.sortByField : 'id';
    const sort = params && params.sort ? params.sort : 'DESC';
    const distinct = params && params.distinct ? params.distinct : true;
    const include = params && params.relations ? params.relations : [];
    const where = params && params.where ? params.where : {};
    if (params && params.fromDate && params.toDate) {
      where['createdAt'] = {
        [Op.between]: [params.fromDate, params.toDate],
      };
    }
    const query = {
      include: include,
      where: where,
      order: [[sortBy, sort]],
      distinct: distinct,
      offset: offset,
      limit: limit,
    };
    console.log('query:', query);
    console.log('query:', query.where);
    return this._model.findAndCountAll(query);
  }

  findOne(params: FindOne) {
    return this._model.findByPk(params.id, {
      include: params && params.relations ? params.relations : [],
    });
  }

  async update(id: number, updateData, transaction?: any) {
    const updateValue = _.omitBy(updateData, _.isNil);
    const result = await this._model.update(updateValue, {
      where: {
        id,
      },
      returning: true,
      transaction,
    });
    if (result[0] === 1) {
      return result[1][0];
    }
    return result[0];
  }

  remove(id: number, transaction?: any) {
    return this._model.destroy({
      where: {
        id,
      },
      transaction,
    });
  }
}
