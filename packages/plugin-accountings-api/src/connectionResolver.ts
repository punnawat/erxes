import * as mongoose from 'mongoose';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import {
  IAccountCategoryModel,
  IAccountModel,
  loadAccountCategoryClass,
  loadAccountClass,
} from './models/Accounts';
import {
  IAccountCategoryDocument,
  IAccountDocument,
} from './models/definitions/accounts';
import { IAccountingsConfigDocument } from './models/definitions/configs';
import {
  IAccountingsConfigModel,
  loadAccountingsConfigClass,
} from './models/Configs';
import { createGenerateModels } from '@erxes/api-utils/src/core';
export interface IModels {
  Accounts: IAccountModel;
  AccountCategories: IAccountCategoryModel;
  AccountingsConfigs: IAccountingsConfigModel;
}
export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export const loadClasses = (
  db: mongoose.Connection,
  subdomain: string,
): IModels => {
  const models = {} as IModels;

  models.Accounts = db.model<IAccountDocument, IAccountModel>(
    'accountings',
    loadAccountClass(models, subdomain),
  );
  models.AccountingsConfigs = db.model<
    IAccountingsConfigDocument,
    IAccountingsConfigModel
  >('accountings_configs', loadAccountingsConfigClass(models));
  models.AccountCategories = db.model<
    IAccountCategoryDocument,
    IAccountCategoryModel
  >('accounting_categories', loadAccountCategoryClass(models));

  return models;
};

export const generateModels = createGenerateModels<IModels>(loadClasses);