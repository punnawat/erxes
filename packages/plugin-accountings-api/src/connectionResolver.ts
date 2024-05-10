import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';
import * as mongoose from 'mongoose';
import {
  IAccountCategoryModel,
  loadAccountCategoryClass,
} from './models/AccountCategories';
import {
  IAccountModel,
  loadAccountClass,
} from './models/Accounts';
import {
  IAccountingConfigModel,
  loadAccountingConfigClass,
} from './models/Configs';
import {
  ITransactionModel,
  loadTransactionClass,
} from './models/Transactions';
import {
  IAccountDocument,
} from './models/definitions/account';
import {
  IAccountCategoryDocument,
} from './models/definitions/accountCategory';
import { IAccountingConfigDocument } from './models/definitions/config';
import {
  ITransactionDocument,
} from './models/definitions/transaction';
import { IVatRowDocument } from './models/definitions/vatRow';
import { ICtaxRowDocument } from './models/definitions/ctaxRow';
import { IVatRowModel, loadVatRowClass } from './models/VatRows';
import { ICtaxRowModel, loadCtaxRowClass } from './models/CtaxRows';

export interface IModels {
  Configs: IAccountingConfigModel;
  Accounts: IAccountModel;
  Transactions: ITransactionModel;
  AccountCategories: IAccountCategoryModel;
  AccountingConfigs: IAccountingConfigModel;
  VatRows: IVatRowModel;
  CtaxRows: ICtaxRowModel;
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
    'accounts',
    loadAccountClass(models, subdomain),
  );
  models.AccountingConfigs = db.model<
    IAccountingConfigDocument,
    IAccountingConfigModel
  >('accounting_configs', loadAccountingConfigClass(models));

  models.AccountCategories = db.model<
    IAccountCategoryDocument,
    IAccountCategoryModel
  >('account_categories', loadAccountCategoryClass(models));

  models.Transactions = db.model<ITransactionDocument, ITransactionModel>(
    'accountings_transactions',
    loadTransactionClass(models, subdomain),
  );

  models.VatRows = db.model<IVatRowDocument, IVatRowModel>(
    'vat_rows',
    loadVatRowClass(models, subdomain),
  );
  models.CtaxRows = db.model<ICtaxRowDocument, ICtaxRowModel>(
    'ctax_rows',
    loadCtaxRowClass(models, subdomain),
  );

  return models;
};

export const generateModels = createGenerateModels<IModels>(loadClasses);
