import {
  getConfig,
  getCustomer,
  getSavingProduct,
  fetchPolaris,
  getBranch,
  getDepositAccount,
} from '../utils';

export const createSaving = async (subdomain: string, params) => {
  const savingContract = params.object;

  const savingProduct = await getSavingProduct(
    subdomain,
    savingContract.contractTypeId,
  );

  const customer = await getCustomer(subdomain, savingContract.customerId);

  const branch = await getBranch(subdomain, savingContract.branchId);

  const deposit = await getDepositAccount(subdomain, savingContract.customerId);

  let sendData = {};
  sendData = [
    {
      prodCode: savingProduct.code,
      slevel: 1,
      capMethod: savingContract.interestCalcType,
      capAcntCode:
        savingContract.depositAccount === 'depositAccount' ? deposit.code : '',
      capAcntSysNo: '', // savingContract.storeInterestInterval,
      startDate: savingContract.startDate,
      maturityOption: savingContract.closeOrExtendConfig,
      rcvAcntCode:
        savingContract.depositAccount === 'depositAccount'
          ? savingContract.depositAccount
          : '',
      brchCode: branch.code,
      curCode: savingContract.currency,
      name: savingContract.contractType.name,
      name2: savingContract.contractType.name,
      termLen: savingContract.duration,
      maturityDate: savingContract.endDate,
      custCode: customer.code,
      segCode: '81',
      jointOrSingle: 'S',
      statusCustom: '',
      statusDate: '',
      casaAcntCode: '',
      closedBy: '',
      closedDate: '',
      lastCtDate: '',
      lastDtDate: '',
    },
  ];

  fetchPolaris({
    op: '13610120',
    data: sendData,
    subdomain,
  });
};

export const getSavingAcntTransaction = async (subdomain, params) => {
  const config = await getConfig(subdomain, 'POLARIS', {});
  const savingTransactionParams = params.updatedDocument || params.object;
  let sendData = {};

  sendData = [
    {
      acntCode: savingTransactionParams.acntCode,
      startDate: savingTransactionParams.startDate,
      endDate: savingTransactionParams.endDate,
      orderBy: savingTransactionParams.orderBy,
      seeNotFinancial: savingTransactionParams.seeNotFinancial,
      seeCorr: savingTransactionParams.seeCorr,
      seeReverse: savingTransactionParams.seeReverse,
      startPagingPosition: savingTransactionParams.startPagingPosition,
      PageRowCount: savingTransactionParams.PageRowCount,
    },
  ];
  fetchPolaris({
    op: '13610101',
    data: sendData,
    subdomain,
  });
};
