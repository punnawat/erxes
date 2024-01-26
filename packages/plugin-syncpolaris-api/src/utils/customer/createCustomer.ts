import { IModels } from '../../connectionResolver';
import { customFieldToObject, setCustomerCode, fetchPolaris } from '../utils';
import { IPolarisCustomer } from './types';
import { validateObject } from './validator';

export const createCustomer = async (subdomain: string, params) => {
  const customer = params.updatedDocument || params.object;

  const data = await customFieldToObject(
    subdomain,
    'contacts:customer',
    customer,
  );

  let sendData: IPolarisCustomer = {
    lastName: data.lastName ?? '',
    firstName: data.firstName ?? '',
    familyName: data.familyName ?? '',
    email: data.email ?? '',
    mobile: data.mobile ?? '',
    birthDate: data.birthDate ?? '',

    custSegCode: '81',
    isVatPayer: data.isVatPayer ?? 1,
    sexCode: data.sexCode ?? '',
    taxExemption: data.taxExemption ?? '',
    status: '1',
    noCompany: data.noCompany ?? '',
    isCompanyCustomer: data.isCompanyCustomer ?? '',
    industryId: data.industryId ?? '',
    birthPlaceId: data.birthPlaceId ?? '',
    shortName: data.shortName ?? '',
    registerMaskCode: '3',
    registerCode: data.registerCode ?? '',
    countryCode: '496',
    industryName: data.industryName ?? '',
    catId: data.catId ?? '',
    ethnicGroupId: data.ethnicGroupId ?? '',
    langCode: data.langCode ?? '',
    maritalStatus: data.maritalStatus ?? '',
    birthPlaceName: data.birthPlaceName ?? '',
    birthPlaceDetail: data.birthPlaceDetail ?? '',
    phone: data.phone ?? '',
    fax: data.fax ?? '',
    isBl: data.isBl ?? '',
    isPolitical: data.isPolitical ?? '',
  };

  await validateObject(sendData);

  const customerCode = await fetchPolaris({
    subdomain,
    op: '13610313',
    data: [sendData],
  });

  if (typeof customerCode === 'string') {
    await setCustomerCode(subdomain, customer._id, customerCode);
  }
};
